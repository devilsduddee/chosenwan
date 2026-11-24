"use server"

import { db } from "@/db"
import { events } from "@/db/schema"
import { eq } from "drizzle-orm"
import { getSession } from "@/lib/auth"
import { uploadPosterToImageKit, deletePosterFromImageKit } from "@/lib/imagekit"

export async function createEventAction(data: {
  category: "ACADEMIC" | "CAMPUS_NEWS" | "COMPETITION"
  title: string
  content: string
  course_id?: string | null
  source_url?: string | null
  poster_url?: string | null
  poster_file_id?: string | null
  is_pinned?: boolean
  status: "DRAFT" | "PUBLISHED"
}) {
  const session = await getSession()
  if (!session || (session.role !== "pj" && session.role !== "ketua_kelas")) {
    throw new Error("Hanya publisher yang dapat membuat pengumuman/event.")
  }

  let finalPosterUrl = data.poster_url || null
  let finalPosterFileId = data.poster_file_id || null

  if (finalPosterUrl && finalPosterUrl.startsWith("data:image/")) {
    const uploaded = await uploadPosterToImageKit(finalPosterUrl, "poster")
    if (uploaded) {
      finalPosterUrl = uploaded.url
      finalPosterFileId = uploaded.fileId
    }
  }

  const [inserted] = await db
    .insert(events)
    .values({
      idAcc: session.userId,
      idCourse: data.course_id || null,
      category: data.category,
      title: data.title,
      description: data.content,
      eventDate: new Date().toISOString().split("T")[0],
      sourceUrl: data.source_url || null,
      posterUrl: finalPosterUrl,
      posterFileId: finalPosterFileId,
      isPinned: Boolean(data.is_pinned),
      status: data.status,
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
    source_url?: string | null
    poster_url?: string | null
    poster_file_id?: string | null
    is_pinned?: boolean
    status: "DRAFT" | "PUBLISHED"
  }>
) {
  const session = await getSession()
  if (!session || (session.role !== "pj" && session.role !== "ketua_kelas")) {
    throw new Error("Hanya publisher yang berhak mengubah event.")
  }

  const existing = await db.select().from(events).where(eq(events.id, id)).get()
  if (!existing) throw new Error("Event tidak ditemukan.")

  if (session.role !== "ketua_kelas" && existing.idAcc !== session.userId) {
    throw new Error("Anda hanya dapat mengedit event yang Anda buat sendiri.")
  }

  let finalPosterUrl = data.poster_url !== undefined ? data.poster_url : existing.posterUrl
  let finalPosterFileId =
    data.poster_file_id !== undefined ? data.poster_file_id : existing.posterFileId

  if (data.poster_url && data.poster_url.startsWith("data:image/")) {
    if (existing.posterFileId) {
      await deletePosterFromImageKit(existing.posterFileId)
    }
    const uploaded = await uploadPosterToImageKit(data.poster_url, "poster")
    if (uploaded) {
      finalPosterUrl = uploaded.url
      finalPosterFileId = uploaded.fileId
    }
  }

  const [updated] = await db
    .update(events)
    .set({
      category: data.category ?? existing.category,
      title: data.title ?? existing.title,
      description: data.content ?? existing.description,
      idCourse: data.course_id !== undefined ? data.course_id : existing.idCourse,
      sourceUrl: data.source_url !== undefined ? data.source_url : existing.sourceUrl,
      posterUrl: finalPosterUrl,
      posterFileId: finalPosterFileId,
      isPinned: data.is_pinned !== undefined ? Boolean(data.is_pinned) : existing.isPinned,
      status: data.status ?? existing.status,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(events.id, id))
    .returning()

  return updated
}

export async function togglePinEventAction(id: string) {
  const session = await getSession()
  if (!session || (session.role !== "pj" && session.role !== "ketua_kelas")) {
    throw new Error("Hanya publisher (PJ atau Ketua Kelas) yang dapat menyematkan info.")
  }

  const existing = await db.select().from(events).where(eq(events.id, id)).get()
  if (!existing) throw new Error("Pengumuman tidak ditemukan.")

  const newPinState = !existing.isPinned
  const [updated] = await db
    .update(events)
    .set({
      isPinned: newPinState,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(events.id, id))
    .returning()

  return updated
}

export async function deleteEventAction(id: string) {
  const session = await getSession()
  if (!session || (session.role !== "pj" && session.role !== "ketua_kelas")) {
    throw new Error("Hanya publisher yang berhak menghapus event.")
  }

  const existing = await db.select().from(events).where(eq(events.id, id)).get()
  if (!existing) return

  if (session.role !== "ketua_kelas" && existing.idAcc !== session.userId) {
    throw new Error("Anda hanya dapat menghapus event yang Anda buat sendiri.")
  }

  if (existing.posterFileId) {
    await deletePosterFromImageKit(existing.posterFileId)
  }

  await db.delete(events).where(eq(events.id, id))
}
