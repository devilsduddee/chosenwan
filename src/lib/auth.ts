import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { UserRole } from "@/types"

const SESSION_COOKIE_NAME = "chosenwan_session"
const SECRET_KEY = new TextEncoder().encode(
  process.env.SESSION_SECRET ||
    process.env.JWT_SECRET ||
    "chosenwan-dev-secret-key-32-characters-minimum!"
)

export interface SessionPayload {
  userId: string
  name: string
  role: UserRole
}

/**
 * Membuat token sesi JWT terenkripsi dan menyimpannya di HTTP-only cookie.
 */
export async function createSession(payload: SessionPayload) {
  const token = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET_KEY)

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 hari
  })

  return token
}

/**
 * Membaca dan memverifikasi sesi aktif dari HTTP-only cookie.
 */
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value

  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY)
    return {
      userId: payload.userId as string,
      name: payload.name as string,
      role: payload.role as UserRole,
    }
  } catch {
    return null
  }
}

/**
 * Menghapus cookie sesi saat logout.
 */
export async function destroySession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}
