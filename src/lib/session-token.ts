import { LocalProtocol } from "paseto"
import { DecryptFactory, EncryptFactory, LocalKeyFromCryptoKey, type LocalKey } from "paseto/v3/local"
import { z } from "zod"
import { UserRole } from "@/types"

const DEV_FALLBACK_SECRET = "chosenwan-dev-secret-key-32-characters-minimum!"

export const SessionPayloadSchema = z.object({
  userId: z.string().min(1),
  name: z.string().min(1),
  role: z.enum(["member", "pj", "ketua_kelas"]),
})

export interface SessionPayload {
  userId: string
  name: string
  role: Extract<UserRole, "member" | "pj" | "ketua_kelas">
}

const pasetoProtocol = new LocalProtocol(EncryptFactory, DecryptFactory)
let cachedSecretValue: string | null = null
let cachedPasetoKey: LocalKey | null = null

export function resolveSessionSecret(): string {
  const configured = (process.env.SESSION_SECRET || process.env.JWT_SECRET || "").trim()
  if (configured.length >= 32) {
    return configured
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "SESSION_SECRET wajib dikonfigurasi minimal 32 karakter pada environment production."
    )
  }

  return DEV_FALLBACK_SECRET
}

async function getPasetoKey(): Promise<LocalKey> {
  const secret = resolveSessionSecret()
  if (cachedPasetoKey && cachedSecretValue === secret) {
    return cachedPasetoKey
  }
  const rawKey = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(secret))
  const cryptoKey = await crypto.subtle.importKey("raw", rawKey, "HKDF", false, ["deriveBits"])
  cachedPasetoKey = LocalKeyFromCryptoKey(cryptoKey)
  cachedSecretValue = secret
  return cachedPasetoKey
}

/**
 * Mengenkripsi payload sesi menjadi token PASETO v3.local berdurasi 7 hari.
 */
export async function encryptSessionToken(payload: SessionPayload): Promise<string> {
  const validPayload = SessionPayloadSchema.parse(payload)
  const key = await getPasetoKey()
  return pasetoProtocol.Encrypt(key, { ...validPayload }, {
    expiresIn: 7 * 24 * 60 * 60,
  })
}

/**
 * Mendekripsi dan memvalidasi token sesi PASETO v3.local.
 */
export async function decryptSessionToken(token?: string | null): Promise<SessionPayload | null> {
  if (!token || !token.startsWith("v3.local.")) return null

  try {
    const key = await getPasetoKey()
    const { claims } = await pasetoProtocol.Decrypt(key, token)
    const parsed = SessionPayloadSchema.safeParse(claims)
    if (!parsed.success) return null
    return parsed.data
  } catch {
    return null
  }
}
