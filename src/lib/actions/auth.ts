"use server"

import bcrypt from "bcryptjs"
import { db } from "@/db"
import { accounts } from "@/db/schema"
import { eq } from "drizzle-orm"
import { createSession, destroySession, getSession } from "@/lib/auth"
import { UserProfile } from "@/types"

export async function loginAction(
  name: string,
  passwordRaw: string
): Promise<{ ok: boolean; error?: string; user?: UserProfile }> {
  try {
    const trimmedName = name.trim()
    if (!trimmedName || !passwordRaw) {
      return { ok: false, error: "Nama pengguna dan kata sandi wajib diisi." }
    }

    const account = await db
      .select()
      .from(accounts)
      .where(eq(accounts.name, trimmedName))
      .get()

    if (!account) {
      return { ok: false, error: "Nama pengguna atau kata sandi salah." }
    }

    const isValid = await bcrypt.compare(passwordRaw, account.password)
    if (!isValid) {
      return { ok: false, error: "Nama pengguna atau kata sandi salah." }
    }

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
