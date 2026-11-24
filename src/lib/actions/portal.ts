"use server"

import { db } from "@/db"
import { courses, schedules, tasks, events } from "@/db/schema"
import { eq, desc } from "drizzle-orm"
import { getSession } from "@/lib/auth"
import { Task, Announcement, Course, Schedule, UserProfile } from "@/types"

export interface InitialPortalPayload {
  currentUser: UserProfile
  courses: Course[]
  schedules: Schedule[]
  announcements: Announcement[]
  tasks: Task[]
  isTasksGated: boolean
}

/**
 * Mengambil data portal awal secara aman berdasarkan sesi login pengguna.
 * - Jadwal & Event: Publik (status PUBLISHED).
 * - Tugas: PRIVAT. Hanya dikirim jika pengguna memiliki sesi login (member, pj, ketua_kelas).
 */
export async function getInitialPortalData(): Promise<InitialPortalPayload> {
  const session = await getSession()
  const isMemberOrPublisher =
    session &&
    (session.role === "member" || session.role === "pj" || session.role === "ketua_kelas")
  const isPublisher = session && (session.role === "pj" || session.role === "ketua_kelas")

  // 1. Ambil Master Mata Kuliah
  const dbCourses = await db.select().from(courses).all()
  const courseMap = new Map(dbCourses.map((c) => [c.id, c]))

  const mappedCourses: Course[] = dbCourses.map((c) => ({
    id: c.id,
    name: c.name,
    lecturer: c.lecturer,
    lecturer_name: c.lecturer,
    code: c.name.slice(0, 3).toUpperCase(),
  }))

  // 2. Ambil Jadwal Kuliah Statis
  const dbSchedules = await db.select().from(schedules).all()
  const mappedSchedules: Schedule[] = dbSchedules.map((s) => {
    const c = courseMap.get(s.idCourse)
    return {
      id: s.id,
      course_id: s.idCourse,
      id_course: s.idCourse,
      id_acc: s.idAcc,
      updated_by: s.idAcc || "Sistem",
      day_of_week: s.dayOfWeek,
      start_time: s.startTime,
      end_time: s.endTime,
      room: s.room,
      lecturer_name: c?.lecturer || undefined,
      course: c
        ? {
            id: c.id,
            name: c.name,
            lecturer: c.lecturer,
            code: c.name.slice(0, 3).toUpperCase(),
          }
        : undefined,
    }
  })

  // 3. Ambil Event / Pengumuman
  let dbEvents
  if (isPublisher) {
    dbEvents = await db.select().from(events).orderBy(desc(events.createdAt)).all()
  } else {
    dbEvents = await db
      .select()
      .from(events)
      .where(eq(events.status, "PUBLISHED"))
      .orderBy(desc(events.createdAt))
      .all()
  }

  const mappedAnnouncements: Announcement[] = dbEvents.map((e) => {
    const c = e.idCourse ? courseMap.get(e.idCourse) : undefined
    return {
      id: e.id,
      course_id: e.idCourse,
      id_course: e.idCourse,
      id_acc: e.idAcc,
      created_by: e.idAcc || "Publisher",
      title: e.title,
      category_type: e.category,
      content: e.description,
      source_url: e.sourceUrl,
      poster_url: e.posterUrl,
      poster_file_id: e.posterFileId,
      is_pinned: Boolean(e.isPinned),
      event_date: e.eventDate,
      status: e.status,
      created_at: e.createdAt,
      updated_at: e.updatedAt,
      course: c
        ? {
            id: c.id,
            name: c.name,
            lecturer: c.lecturer,
            code: c.name.slice(0, 3).toUpperCase(),
          }
        : undefined,
    }
  })

  // 4. Ambil Tugas (TASK) — GATED PRIVAT
  let mappedTasks: Task[] = []
  let isTasksGated = true

  if (isMemberOrPublisher) {
    isTasksGated = false
    let dbTasks
    if (isPublisher) {
      dbTasks = await db.select().from(tasks).orderBy(desc(tasks.createdAt)).all()
    } else {
      dbTasks = await db
        .select()
        .from(tasks)
        .where(eq(tasks.status, "PUBLISHED"))
        .orderBy(desc(tasks.createdAt))
        .all()
    }

    mappedTasks = dbTasks.map((t) => {
      const c = courseMap.get(t.idCourse)
      return {
        id: t.id,
        course_id: t.idCourse,
        id_course: t.idCourse,
        id_acc: t.idAcc,
        created_by: t.idAcc || "Publisher",
        title: t.title,
        instructions: t.description,
        description: t.description,
        due_date: t.dueDate,
        submission_url: t.submissionUrl,
        status: t.status,
        created_at: t.createdAt,
        updated_at: t.updatedAt,
        course: c
          ? {
              id: c.id,
              name: c.name,
              lecturer: c.lecturer,
              code: c.name.slice(0, 3).toUpperCase(),
            }
          : undefined,
      }
    })
  }

  const currentUser: UserProfile = session
    ? {
        id: session.userId,
        name: session.name,
        full_name: session.name,
        role: session.role,
      }
    : {
        id: "guest-user",
        name: "Pengunjung",
        full_name: "Pengunjung",
        role: "guest",
      }

  return {
    currentUser,
    courses: mappedCourses,
    schedules: mappedSchedules,
    announcements: mappedAnnouncements,
    tasks: mappedTasks,
    isTasksGated,
  }
}
