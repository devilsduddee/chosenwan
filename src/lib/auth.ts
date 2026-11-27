import { cookies } from "next/headers"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { accounts } from "@/db/schema"
import {
  encryptSessionToken,
  decryptSessionToken,
  type SessionPayload,
} from "@/lib/session-token"

export type { SessionPayload }

const SESSION_COOKIE_NAME = "chosenwan_session"

/**
 * Membuat token sesi terenkripsi PASETO (v3.local) dan menyimpannya di HTTP-only cookie.
 */
export async function createSession(payload: SessionPayload) {
  const token = await encryptSessionToken(payload)

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  })

  return token
}

/**
 * Membaca, mendekripsi, dan menyinkronkan sesi aktif PASETO v3.local terhadap tabel akun.
 * Memastikan penghapusan akun atau perubahan role langsung berlaku tanpa menunggu token kadaluarsa.
 */
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value
  const payload = await decryptSessionToken(token)
  if (!payload) return null

  const liveAccount = await db
    .select({
      id: accounts.id,
      name: accounts.name,
      role: accounts.role,
    })
    .from(accounts)
    .where(eq(accounts.id, payload.userId))
    .get()

  if (!liveAccount) return null

  return {
    userId: liveAccount.id,
    name: liveAccount.name,
    role: liveAccount.role,
  }
}

/**
 * Menghapus cookie sesi saat logout.
 */
export async function destroySession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}
