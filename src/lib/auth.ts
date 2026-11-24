import { LocalProtocol } from "paseto"
import { DecryptFactory, EncryptFactory, LocalKeyFromCryptoKey, type LocalKey } from "paseto/v3/local"
import { jwtVerify } from "jose"
import { cookies } from "next/headers"
import { UserRole } from "@/types"

const SESSION_COOKIE_NAME = "chosenwan_session"
const RAW_SECRET =
  process.env.SESSION_SECRET ||
  process.env.JWT_SECRET ||
  "chosenwan-dev-secret-key-32-characters-minimum!"

const JWT_SECRET_KEY = new TextEncoder().encode(RAW_SECRET)

export interface SessionPayload {
  userId: string
  name: string
  role: UserRole
}

const pasetoProtocol = new LocalProtocol(EncryptFactory, DecryptFactory)
let cachedPasetoKey: LocalKey | null = null

async function getPasetoKey(): Promise<LocalKey> {
  if (cachedPasetoKey) return cachedPasetoKey
  const rawKey = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(RAW_SECRET))
  const cryptoKey = await crypto.subtle.importKey("raw", rawKey, "HKDF", false, ["deriveBits"])
  cachedPasetoKey = LocalKeyFromCryptoKey(cryptoKey)
  return cachedPasetoKey
}

/**
 * Membuat token sesi terenkripsi PASETO (v3.local) dan menyimpannya di HTTP-only cookie.
 */
export async function createSession(payload: SessionPayload) {
  const key = await getPasetoKey()
  const token = await pasetoProtocol.Encrypt(key, { ...payload }, {
    expiresIn: 7 * 24 * 60 * 60, // 7 hari dalam detik
  })

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
 * Membaca dan mendekripsi sesi aktif dari HTTP-only cookie.
 * Mendukung token PASETO v3.local dan fallback kompatibilitas token JWT lama.
 */
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value

  if (!token) return null

  // 1. Verifikasi utama menggunakan PASETO (v3.local terenkripsi)
  if (token.startsWith("v3.local.")) {
    try {
      const key = await getPasetoKey()
      const { claims } = await pasetoProtocol.Decrypt(key, token)
      return {
        userId: claims.userId as string,
        name: claims.name as string,
        role: claims.role as UserRole,
      }
    } catch {
      return null
    }
  }

  // 2. Fallback kompatibilitas sesi JWT lama jika pengguna masih memiliki cookie JWT
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET_KEY)
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
