"use server"

import { db } from "@/db"
import { tasks } from "@/db/schema"
import { eq } from "drizzle-orm"
import { getSession } from "@/lib/auth"

export async function createTaskAction(data: {
  course_id: string
  title: string
  instructions: string
  due_date: string
  submission_url?: string | null
  status: "DRAFT" | "PUBLISHED"
}) {
  const session = await getSession()
  if (!session || (session.role !== "pj" && session.role !== "ketua_kelas")) {
    throw new Error("Hanya publisher (PJ atau Ketua Kelas) yang dapat membuat tugas.")
  }

  const [inserted] = await db
    .insert(tasks)
    .values({
      idCourse: data.course_id,
      idAcc: session.userId,
      title: data.title,
      description: data.instructions,
      dueDate: data.due_date,
      submissionUrl: data.submission_url || null,
      status: data.status,
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
  const session = await getSession()
  if (!session || (session.role !== "pj" && session.role !== "ketua_kelas")) {
    throw new Error("Hanya publisher yang berhak memperbarui tugas.")
  }

  const existing = await db.select().from(tasks).where(eq(tasks.id, id)).get()
  if (!existing) throw new Error("Tugas tidak ditemukan.")

  if (session.role !== "ketua_kelas" && existing.idAcc !== session.userId) {
    throw new Error("Anda hanya dapat mengedit tugas yang Anda buat sendiri.")
  }

  const [updated] = await db
    .update(tasks)
    .set({
      idCourse: data.course_id ?? existing.idCourse,
      title: data.title ?? existing.title,
      description: data.instructions ?? existing.description,
      dueDate: data.due_date ?? existing.dueDate,
      submissionUrl: data.submission_url !== undefined ? data.submission_url : existing.submissionUrl,
      status: data.status ?? existing.status,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(tasks.id, id))
    .returning()

  return updated
}

export async function deleteTaskAction(id: string) {
  const session = await getSession()
  if (!session || (session.role !== "pj" && session.role !== "ketua_kelas")) {
    throw new Error("Hanya publisher yang berhak menghapus tugas.")
  }

  const existing = await db.select().from(tasks).where(eq(tasks.id, id)).get()
  if (!existing) return

  if (session.role !== "ketua_kelas" && existing.idAcc !== session.userId) {
    throw new Error("Anda hanya dapat menghapus tugas yang Anda buat sendiri.")
  }

  await db.delete(tasks).where(eq(tasks.id, id))
}
