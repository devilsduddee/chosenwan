"use server"

import { db } from "@/db"
import { schedules } from "@/db/schema"
import { eq } from "drizzle-orm"
import { assertCourseExists, parseEntityId, requirePublisherSession } from "@/lib/actions/guards"
import { serverScheduleCreateSchema, serverScheduleUpdateSchema } from "@/lib/validations"

export async function createScheduleAction(data: {
  course_id: string
  day_of_week: number
  start_time: string
  end_time: string
  room: string
}) {
  const session = await requirePublisherSession(
    "Hanya Ketua Kelas atau PJ yang berhak menambah jadwal kuliah."
  )

  const parsed = serverScheduleCreateSchema.safeParse(data)
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message || "Data jadwal tidak valid.")
  }

  const valid = parsed.data
  await assertCourseExists(valid.course_id)

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
  const session = await requirePublisherSession(
    "Hanya Ketua Kelas atau PJ yang berhak memperbarui jadwal kuliah statis."
  )
  const validId = parseEntityId(id, "ID jadwal")

  const parsed = serverScheduleUpdateSchema.safeParse(data)
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message || "Pembaruan jadwal tidak valid.")
  }

  const valid = parsed.data
  await assertCourseExists(valid.course_id)

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
    .where(eq(schedules.id, validId))
    .returning()

  if (!updated) throw new Error("Jadwal tidak ditemukan.")
  return updated
}

export async function deleteScheduleAction(id: string) {
  await requirePublisherSession("Hanya Ketua Kelas atau PJ yang berhak menghapus slot jadwal.")
  const validId = parseEntityId(id, "ID jadwal")

  const existing = await db.select({ id: schedules.id }).from(schedules).where(eq(schedules.id, validId)).get()
  if (!existing) throw new Error("Jadwal tidak ditemukan.")

  await db.delete(schedules).where(eq(schedules.id, validId))
  return { success: true }
}
