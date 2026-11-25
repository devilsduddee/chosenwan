const PRIVATE_IP_PATTERNS = [
  /^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
  /^192\.168\.\d{1,3}\.\d{1,3}$/,
  /^169\.254\.\d{1,3}\.\d{1,3}$/,
  /^172\.(1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3}$/,
]

const BLOCKED_HOSTNAMES = new Set([
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "::1",
  "[::1]",
  "169.254.169.254",
])

/**
 * Memeriksa apakah hostname menunjuk ke jaringan internal, loopback, atau link-local.
 */
export function isPrivateOrReservedHost(hostname: string): boolean {
  const host = hostname.toLowerCase().trim()
  if (!host || BLOCKED_HOSTNAMES.has(host)) return true
  if (host.endsWith(".local") || host.endsWith(".internal") || host.endsWith(".localhost")) {
    return true
  }
  return PRIVATE_IP_PATTERNS.some((pattern) => pattern.test(host))
}

/**
 * Memvalidasi bahwa URL menggunakan protokol http(s) dan tidak mengarah ke host privat/internal.
 */
export function isSafeHttpUrl(url?: string | null): boolean {
  if (!url) return false
  try {
    const parsed = new URL(url.trim())
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return false
    if (isPrivateOrReservedHost(parsed.hostname)) return false
    return true
  } catch {
    return false
  }
}

export const SAFE_RASTER_DATA_URL_REGEX = /^data:image\/(png|jpeg|jpg|webp);base64,[a-z0-9+/=]+$/i

/**
 * Memvalidasi sumber poster aman (base64 raster data URL atau tautan http(s) publik).
 */
export function isSafePosterSrc(src?: string | null): boolean {
  if (!src) return false
  const trimmed = src.trim()
  if (SAFE_RASTER_DATA_URL_REGEX.test(trimmed)) return true
  return isSafeHttpUrl(trimmed)
}
