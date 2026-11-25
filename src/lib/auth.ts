import { cookies } from "next/headers"
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
 * Membaca dan mendekripsi sesi aktif PASETO v3.local dari HTTP-only cookie.
 */
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value
  return decryptSessionToken(token)
}

/**
 * Menghapus cookie sesi saat logout.
 */
export async function destroySession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}
