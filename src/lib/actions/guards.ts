import { eq } from "drizzle-orm"
import { db } from "@/db"
import { courses } from "@/db/schema"
import { getSession, type SessionPayload } from "@/lib/auth"
import { entityIdSchema } from "@/lib/validations"

/**
 * Memastikan pemanggil terautentikasi sebagai publisher (`pj` atau `ketua_kelas`).
 */
export async function requirePublisherSession(errorMessage: string): Promise<SessionPayload> {
  const session = await getSession()
  if (!session || (session.role !== "pj" && session.role !== "ketua_kelas")) {
    throw new Error(errorMessage)
  }
  return session
}

/**
 * Memvalidasi parameter ID entitas di batas Server Action.
 */
export function parseEntityId(id: string, label = "ID"): string {
  const parsed = entityIdSchema.safeParse(id)
  if (!parsed.success) {
    throw new Error(`${label} tidak valid.`)
  }
  return parsed.data
}

/**
 * Memastikan mata kuliah yang dirujuk tersedia di database sebelum mutasi foreign key.
 */
export async function assertCourseExists(courseId: string): Promise<void> {
  const found = await db
    .select({ id: courses.id })
    .from(courses)
    .where(eq(courses.id, courseId))
    .get()

  if (!found) {
    throw new Error("Mata kuliah tidak ditemukan.")
  }
}
