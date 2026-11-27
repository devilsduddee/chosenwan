"use server"

import { db } from "@/db"
import { events } from "@/db/schema"
import { eq } from "drizzle-orm"
import { assertCourseExists, parseEntityId, requirePublisherSession } from "@/lib/actions/guards"
import {
  uploadPosterToImageKit,
  deletePosterFromImageKit,
  isImageKitConfigured,
} from "@/lib/imagekit"
import { serverEventCreateSchema, serverEventUpdateSchema } from "@/lib/validations"

const MAX_LOCAL_DATA_URL_LENGTH = 512_000

async function resolvePosterUpdate(
  incomingPosterUrl: string | null | undefined,
  existingPosterUrl: string | null,
  existingPosterFileId: string | null
): Promise<{ posterUrl: string | null; posterFileId: string | null }> {
  // Tidak ada perubahan field poster
  if (incomingPosterUrl === undefined) {
    return { posterUrl: existingPosterUrl, posterFileId: existingPosterFileId }
  }

  const trimmed = incomingPosterUrl?.trim() || ""

  // Poster dihapus oleh publisher
  if (!trimmed) {
    if (existingPosterFileId) {
      await deletePosterFromImageKit(existingPosterFileId)
    }
    return { posterUrl: null, posterFileId: null }
  }

  // Upload poster baru dalam format data URL base64
  if (trimmed.startsWith("data:image/")) {
    if (isImageKitConfigured()) {
      const uploaded = await uploadPosterToImageKit(trimmed, "poster")
      if (!uploaded) {
        throw new Error("Gagal mengunggah poster ke CDN ImageKit. Silakan coba lagi.")
      }
      if (existingPosterFileId) {
        await deletePosterFromImageKit(existingPosterFileId)
      }
      return { posterUrl: uploaded.url, posterFileId: uploaded.fileId }
    }

    if (process.env.NODE_ENV === "production") {
      throw new Error("Layanan CDN poster belum dikonfigurasi. Gunakan tautan gambar https://.")
    }

    if (trimmed.length > MAX_LOCAL_DATA_URL_LENGTH) {
      throw new Error("Ukuran poster lokal terlalu besar tanpa CDN. Gunakan gambar lebih kecil.")
    }

    return { posterUrl: trimmed, posterFileId: null }
  }

  // Diganti dengan tautan URL eksternal baru
  if (trimmed !== existingPosterUrl && existingPosterFileId) {
    await deletePosterFromImageKit(existingPosterFileId)
  }
  return {
    posterUrl: trimmed,
    posterFileId: trimmed === existingPosterUrl ? existingPosterFileId : null,
  }
}

export async function createEventAction(data: {
  category: "ACADEMIC" | "CAMPUS_NEWS" | "COMPETITION"
  title: string
  content: string
  course_id?: string | null
  event_date?: string
  source_url?: string | null
  poster_url?: string | null
  poster_file_id?: string | null
  is_pinned?: boolean
  status: "DRAFT" | "PUBLISHED"
}) {
  const session = await requirePublisherSession(
    "Hanya publisher yang dapat membuat pengumuman/event."
  )

  const parsed = serverEventCreateSchema.safeParse(data)
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message || "Data pengumuman tidak valid.")
  }

  const valid = parsed.data
  if (valid.course_id) {
    await assertCourseExists(valid.course_id)
  }
  const resolvedPoster = await resolvePosterUpdate(valid.poster_url, null, null)

  const [inserted] = await db
    .insert(events)
    .values({
      idAcc: session.userId,
      idCourse: valid.course_id || null,
      category: valid.category,
      title: valid.title,
      description: valid.content,
      eventDate: valid.event_date || new Date().toISOString().split("T")[0],
      sourceUrl: valid.source_url || null,
      posterUrl: resolvedPoster.posterUrl,
      posterFileId: resolvedPoster.posterFileId,
      isPinned: Boolean(valid.is_pinned),
      status: valid.status,
    })
    .returning()

  return inserted
}

export async function updateEventAction(
  id: string,
  data: Partial<{
    category: "ACADEMIC" | "CAMPUS_NEWS" | "COMPETITION"
    title: string
    content: string
    course_id?: string | null
    event_date?: string
    source_url?: string | null
    poster_url?: string | null
    poster_file_id?: string | null
    is_pinned?: boolean
    status: "DRAFT" | "PUBLISHED"
  }>
) {
  const session = await requirePublisherSession("Hanya publisher yang berhak mengubah event.")
  const validId = parseEntityId(id, "ID pengumuman")

  const parsed = serverEventUpdateSchema.safeParse(data)
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message || "Pembaruan pengumuman tidak valid.")
  }

  const existing = await db.select().from(events).where(eq(events.id, validId)).get()
  if (!existing) throw new Error("Event tidak ditemukan.")

  if (session.role !== "ketua_kelas" && existing.idAcc !== session.userId) {
    throw new Error("Anda hanya dapat mengedit event yang Anda buat sendiri.")
  }

  const valid = parsed.data
  if (valid.course_id) {
    await assertCourseExists(valid.course_id)
  }
  const resolvedPoster = await resolvePosterUpdate(
    valid.poster_url,
    existing.posterUrl,
    existing.posterFileId
  )

  const [updated] = await db
    .update(events)
    .set({
      category: valid.category ?? existing.category,
      title: valid.title ?? existing.title,
      description: valid.content ?? existing.description,
      idCourse: valid.course_id !== undefined ? valid.course_id || null : existing.idCourse,
      eventDate: valid.event_date ?? existing.eventDate,
      sourceUrl: valid.source_url !== undefined ? valid.source_url || null : existing.sourceUrl,
      posterUrl: resolvedPoster.posterUrl,
      posterFileId: resolvedPoster.posterFileId,
      isPinned: valid.is_pinned !== undefined ? Boolean(valid.is_pinned) : existing.isPinned,
      status: valid.status ?? existing.status,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(events.id, validId))
    .returning()

  return updated
}

export async function togglePinEventAction(id: string) {
  const session = await requirePublisherSession(
    "Hanya publisher (PJ atau Ketua Kelas) yang dapat menyematkan info."
  )
  const validId = parseEntityId(id, "ID pengumuman")

  const existing = await db.select().from(events).where(eq(events.id, validId)).get()
  if (!existing) throw new Error("Pengumuman tidak ditemukan.")

  if (session.role !== "ketua_kelas" && existing.idAcc !== session.userId) {
    throw new Error("Anda hanya dapat menyematkan pengumuman yang Anda buat sendiri.")
  }

  const newPinState = !existing.isPinned
  const [updated] = await db
    .update(events)
    .set({
      isPinned: newPinState,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(events.id, validId))
    .returning()

  return updated
}

export async function deleteEventAction(id: string) {
  const session = await requirePublisherSession("Hanya publisher yang berhak menghapus event.")
  const validId = parseEntityId(id, "ID pengumuman")

  const existing = await db.select().from(events).where(eq(events.id, validId)).get()
  if (!existing) return

  if (session.role !== "ketua_kelas" && existing.idAcc !== session.userId) {
    throw new Error("Anda hanya dapat menghapus event yang Anda buat sendiri.")
  }

  if (existing.posterFileId) {
    await deletePosterFromImageKit(existing.posterFileId)
  }

  await db.delete(events).where(eq(events.id, validId))
}
