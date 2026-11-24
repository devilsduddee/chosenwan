"use server"

import { db } from "@/db"
import { schedules } from "@/db/schema"
import { eq } from "drizzle-orm"
import { getSession } from "@/lib/auth"

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
  if (!session || session.role !== "ketua_kelas") {
    throw new Error("Hanya Ketua Kelas yang berhak memperbarui jadwal kuliah statis.")
  }

  const [updated] = await db
    .update(schedules)
    .set({
      idCourse: data.course_id,
      dayOfWeek: data.day_of_week,
      startTime: data.start_time,
      endTime: data.end_time,
      room: data.room,
      idAcc: session.userId,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(schedules.id, id))
    .returning()

  return updated
}
