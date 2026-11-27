"use server"

import bcrypt from "bcryptjs"
import { z } from "zod"
import { db } from "@/db"
import { accounts, courses } from "@/db/schema"
import { eq } from "drizzle-orm"
import { getSession } from "@/lib/auth"
import { parseEntityId } from "@/lib/actions/guards"
import { entityIdSchema } from "@/lib/validations"

const CourseAdminSchema = z.object({
  name: z.string().trim().min(2, "Nama mata kuliah minimal 2 karakter").max(120),
  lecturer: z.string().trim().max(150).optional().nullable(),
})

const CreateAccountSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Username minimal 2 karakter")
    .max(64)
    .regex(/^[a-zA-Z0-9._-]+$/, "Username hanya boleh berisi huruf, angka, titik, atau garis bawah"),
  password: z.string().min(6, "Kata sandi minimal 6 karakter").max(128),
  role: z.enum(["member", "pj"]),
})

const ResetPasswordSchema = z.object({
  accountId: entityIdSchema,
  newPassword: z.string().min(6, "Kata sandi baru minimal 6 karakter").max(128),
})

async function requireKetuaKelas() {
  const session = await getSession()
  if (!session || session.role !== "ketua_kelas") {
    throw new Error("Akses ditolak. Fitur ini khusus Ketua Kelas.")
  }
  return session
}

export async function listClassAccountsAction() {
  await requireKetuaKelas()
  return db
    .select({
      id: accounts.id,
      name: accounts.name,
      role: accounts.role,
      createdAt: accounts.createdAt,
    })
    .from(accounts)
    .all()
}

export async function upsertCourseAction(input: { id?: string; name: string; lecturer?: string | null }) {
  await requireKetuaKelas()
  const parsed = CourseAdminSchema.safeParse(input)
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message || "Data mata kuliah tidak valid.")
  }

  const cleanLecturer = parsed.data.lecturer?.trim() || null
  if (input.id) {
    const validId = parseEntityId(input.id, "ID mata kuliah")
    const [updated] = await db
      .update(courses)
      .set({ name: parsed.data.name, lecturer: cleanLecturer })
      .where(eq(courses.id, validId))
      .returning()
    if (!updated) throw new Error("Mata kuliah tidak ditemukan.")
    return updated
  }

  const existing = await db.select().from(courses).where(eq(courses.name, parsed.data.name)).get()
  if (existing) {
    throw new Error("Mata kuliah dengan nama ini sudah terdaftar.")
  }

  const [inserted] = await db
    .insert(courses)
    .values({ name: parsed.data.name, lecturer: cleanLecturer })
    .returning()
  return inserted
}

export async function createClassAccountAction(input: {
  name: string
  password: string
  role: "member" | "pj"
}) {
  await requireKetuaKelas()
  const parsed = CreateAccountSchema.safeParse(input)
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message || "Data akun tidak valid.")
  }

  const existing = await db.select().from(accounts).where(eq(accounts.name, parsed.data.name)).get()
  if (existing) {
    throw new Error("Username sudah digunakan. Pilih nama lain.")
  }

  const hashedPassword = await bcrypt.hash(parsed.data.password, 12)
  const [inserted] = await db
    .insert(accounts)
    .values({
      name: parsed.data.name,
      password: hashedPassword,
      role: parsed.data.role,
    })
    .returning({
      id: accounts.id,
      name: accounts.name,
      role: accounts.role,
      createdAt: accounts.createdAt,
    })

  return inserted
}

export async function resetClassAccountPasswordAction(input: {
  accountId: string
  newPassword: string
}) {
  await requireKetuaKelas()
  const parsed = ResetPasswordSchema.safeParse(input)
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message || "Kata sandi baru tidak valid.")
  }

  const hashedPassword = await bcrypt.hash(parsed.data.newPassword, 12)
  const [updated] = await db
    .update(accounts)
    .set({ password: hashedPassword })
    .where(eq(accounts.id, parsed.data.accountId))
    .returning({ id: accounts.id, name: accounts.name })

  if (!updated) throw new Error("Akun tidak ditemukan.")
  return updated
}
