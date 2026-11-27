"use server"

import { db } from "@/db"
import { tasks } from "@/db/schema"
import { eq } from "drizzle-orm"
import { assertCourseExists, parseEntityId, requirePublisherSession } from "@/lib/actions/guards"
import { serverTaskCreateSchema, serverTaskUpdateSchema } from "@/lib/validations"

export async function createTaskAction(data: {
  course_id: string
  title: string
  instructions: string
  due_date: string
  submission_url?: string | null
  status: "DRAFT" | "PUBLISHED"
}) {
  const session = await requirePublisherSession(
    "Hanya publisher (PJ atau Ketua Kelas) yang dapat membuat tugas."
  )

  const parsed = serverTaskCreateSchema.safeParse(data)
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message || "Data tugas tidak valid.")
  }

  const valid = parsed.data
  await assertCourseExists(valid.course_id)
  const [inserted] = await db
    .insert(tasks)
    .values({
      idCourse: valid.course_id,
      idAcc: session.userId,
      title: valid.title,
      description: valid.instructions,
      dueDate: valid.due_date,
      submissionUrl: valid.submission_url || null,
      status: valid.status,
    })
    .returning()

  return inserted
}

export async function updateTaskAction(
  id: string,
  data: Partial<{
    course_id: string
    title: string
    instructions: string
    due_date: string
    submission_url?: string | null
    status: "DRAFT" | "PUBLISHED"
  }>
) {
  const session = await requirePublisherSession("Hanya publisher yang berhak memperbarui tugas.")
  const validId = parseEntityId(id, "ID tugas")

  const parsed = serverTaskUpdateSchema.safeParse(data)
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message || "Pembaruan tugas tidak valid.")
  }

  const existing = await db.select().from(tasks).where(eq(tasks.id, validId)).get()
  if (!existing) throw new Error("Tugas tidak ditemukan.")

  if (session.role !== "ketua_kelas" && existing.idAcc !== session.userId) {
    throw new Error("Anda hanya dapat mengedit tugas yang Anda buat sendiri.")
  }

  const valid = parsed.data
  if (valid.course_id) {
    await assertCourseExists(valid.course_id)
  }

  const [updated] = await db
    .update(tasks)
    .set({
      idCourse: valid.course_id ?? existing.idCourse,
      title: valid.title ?? existing.title,
      description: valid.instructions ?? existing.description,
      dueDate: valid.due_date ?? existing.dueDate,
      submissionUrl:
        valid.submission_url !== undefined ? valid.submission_url || null : existing.submissionUrl,
      status: valid.status ?? existing.status,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(tasks.id, validId))
    .returning()

  return updated
}

export async function deleteTaskAction(id: string) {
  const session = await requirePublisherSession("Hanya publisher yang berhak menghapus tugas.")
  const validId = parseEntityId(id, "ID tugas")

  const existing = await db.select().from(tasks).where(eq(tasks.id, validId)).get()
  if (!existing) return

  if (session.role !== "ketua_kelas" && existing.idAcc !== session.userId) {
    throw new Error("Anda hanya dapat menghapus tugas yang Anda buat sendiri.")
  }

  await db.delete(tasks).where(eq(tasks.id, validId))
}
