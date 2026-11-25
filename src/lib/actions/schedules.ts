"use server"

import { db } from "@/db"
import { schedules } from "@/db/schema"
import { eq } from "drizzle-orm"
import { getSession } from "@/lib/auth"
import { serverScheduleCreateSchema, serverScheduleUpdateSchema } from "@/lib/validations"

export async function createScheduleAction(data: {
  course_id: string
  day_of_week: number
  start_time: string
  end_time: string
  room: string
}) {
  const session = await getSession()
  if (!session || (session.role !== "ketua_kelas" && session.role !== "pj")) {
    throw new Error("Hanya Ketua Kelas atau PJ yang berhak menambah jadwal kuliah.")
  }

  const parsed = serverScheduleCreateSchema.safeParse(data)
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message || "Data jadwal tidak valid.")
  }

  const valid = parsed.data
  const [inserted] = await db
    .insert(schedules)
    .values({
      idCourse: valid.course_id,
      dayOfWeek: valid.day_of_week,
      startTime: valid.start_time,
      endTime: valid.end_time,
      room: valid.room,
      idAcc: session.userId,
      updatedAt: new Date().toISOString(),
    })
    .returning()

  return inserted
}

export async function updateScheduleAction(
  id: string,
  data: {
    course_id: string
    day_of_week: number
    start_time: string
    end_time: string
    room: string
  }
) {
  const session = await getSession()
  if (!session || (session.role !== "ketua_kelas" && session.role !== "pj")) {
    throw new Error("Hanya Ketua Kelas atau PJ yang berhak memperbarui jadwal kuliah statis.")
  }

  const parsed = serverScheduleUpdateSchema.safeParse(data)
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message || "Pembaruan jadwal tidak valid.")
  }

  const valid = parsed.data
  const [updated] = await db
    .update(schedules)
    .set({
      idCourse: valid.course_id,
      dayOfWeek: valid.day_of_week,
      startTime: valid.start_time,
      endTime: valid.end_time,
      room: valid.room,
      idAcc: session.userId,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(schedules.id, id))
    .returning()

  return updated
}

export async function deleteScheduleAction(id: string) {
  const session = await getSession()
  if (!session || (session.role !== "ketua_kelas" && session.role !== "pj")) {
    throw new Error("Hanya Ketua Kelas atau PJ yang berhak menghapus slot jadwal.")
  }

  await db.delete(schedules).where(eq(schedules.id, id))
  return { success: true }
}
