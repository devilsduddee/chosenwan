"use server"

import bcrypt from "bcryptjs"
import { db } from "@/db"
import { accounts } from "@/db/schema"
import { eq } from "drizzle-orm"
import { createSession, destroySession, getSession } from "@/lib/auth"
import { checkRateLimit, resetRateLimit } from "@/lib/rate-limit"
import { loginFormSchema } from "@/lib/validations"
import { UserProfile } from "@/types"

// Dummy bcrypt hash untuk menyamakan biaya waktu saat username tidak ditemukan (anti-enumeration)
const DUMMY_BCRYPT_HASH = "$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy"

export async function loginAction(
  name: string,
  passwordRaw: string
): Promise<{ ok: boolean; error?: string; user?: UserProfile }> {
  try {
    const parsed = loginFormSchema.safeParse({ name, password: passwordRaw })
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Nama pengguna dan kata sandi wajib diisi."
      return { ok: false, error: firstError }
    }

    const trimmedName = parsed.data.name
    const throttle = checkRateLimit(`login-account:${trimmedName.toLowerCase()}`, {
      limit: 10,
      windowMs: 15 * 60_000,
    })

    if (!throttle.allowed) {
      return {
        ok: false,
        error: `Terlalu banyak percobaan login gagal. Coba lagi dalam ${Math.ceil(throttle.retryAfterSeconds / 60)} menit.`,
      }
    }

    const account = await db
      .select()
      .from(accounts)
      .where(eq(accounts.name, trimmedName))
      .get()

    const candidateHash = account ? account.password : DUMMY_BCRYPT_HASH
    const isValid = await bcrypt.compare(parsed.data.password, candidateHash)

    if (!account || !isValid) {
      return { ok: false, error: "Nama pengguna atau kata sandi salah." }
    }

    resetRateLimit(`login-account:${trimmedName.toLowerCase()}`)

    await createSession({
      userId: account.id,
      name: account.name,
      role: account.role,
    })

    return {
      ok: true,
      user: {
        id: account.id,
        name: account.name,
        role: account.role,
      },
    }
  } catch (err) {
    console.error("Login action error:", err)
    return { ok: false, error: "Terjadi kesalahan server saat login." }
  }
}

export async function logoutAction(): Promise<{ ok: boolean }> {
  await destroySession()
  return { ok: true }
}

export async function getCurrentUserAction(): Promise<UserProfile | null> {
  const session = await getSession()
  if (!session) return null
  return {
    id: session.userId,
    name: session.name,
    role: session.role,
  }
}
