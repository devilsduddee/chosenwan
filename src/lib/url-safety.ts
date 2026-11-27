function isPrivateOrReservedIpv4Octets(o1: number, o2: number, o3: number, o4: number): boolean {
  if ([o1, o2, o3, o4].some((n) => !Number.isInteger(n) || n < 0 || n > 255)) {
    return true
  }

  if (o1 === 0) return true // 0.0.0.0/8 ("This" network)
  if (o1 === 10) return true // 10.0.0.0/8 (RFC1918)
  if (o1 === 100 && o2 >= 64 && o2 <= 127) return true // 100.64.0.0/10 (CGNAT)
  if (o1 === 127) return true // 127.0.0.0/8 (Loopback)
  if (o1 === 169 && o2 === 254) return true // 169.254.0.0/16 (Link-local & Cloud IMDS)
  if (o1 === 172 && o2 >= 16 && o2 <= 31) return true // 172.16.0.0/12 (RFC1918)
  if (o1 === 192 && o2 === 0 && o3 === 0) return true // 192.0.0.0/24 (IETF Protocol)
  if (o1 === 192 && o2 === 168) return true // 192.168.0.0/16 (RFC1918)
  if (o1 === 198 && (o2 === 18 || o2 === 19)) return true // 198.18.0.0/15 (Benchmark)
  if (o1 >= 224) return true // Multicast (224.0.0.0/4) & Reserved (240.0.0.0/4)

  return false
}

function parseDottedIpv4(host: string): [number, number, number, number] | null {
  const match = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/)
  if (!match) return null
  return [Number(match[1]), Number(match[2]), Number(match[3]), Number(match[4])]
}

function isPrivateOrReservedIpv6(rawHost: string): boolean {
  const withoutBrackets = rawHost.replace(/^\[|\]$/g, "")
  const zoneIndex = withoutBrackets.indexOf("%")
  const addr = (zoneIndex >= 0 ? withoutBrackets.slice(0, zoneIndex) : withoutBrackets).toLowerCase()

  if (!addr) return true
  if (addr === "::" || addr === "::1" || /^0+(:0+){7}$/.test(addr) || /^0+(:0+){6}:0*1$/.test(addr)) {
    return true
  }

  // Unique local (fc00::/7), link-local (fe80::/10), multicast (ff00::/8)
  if (/^f[cd][0-9a-f]{0,2}:/.test(addr) || /^fe[89ab][0-9a-f]?:/.test(addr) || /^ff[0-9a-f]{0,2}:/.test(addr)) {
    return true
  }

  // IPv4-mapped IPv6 in dotted form (e.g. ::ffff:127.0.0.1) or normalized hex form (e.g. ::ffff:7f00:1)
  const v4MappedMatch = addr.match(/^(?:::ffff:|0:0:0:0:0:ffff:)(.+)$/)
  if (v4MappedMatch) {
    const suffix = v4MappedMatch[1]
    const dotted = parseDottedIpv4(suffix)
    if (dotted) {
      return isPrivateOrReservedIpv4Octets(...dotted)
    }

    const hexMatch = suffix.match(/^([0-9a-f]{1,4}):([0-9a-f]{1,4})$/)
    if (hexMatch) {
      const high = parseInt(hexMatch[1], 16)
      const low = parseInt(hexMatch[2], 16)
      return isPrivateOrReservedIpv4Octets(
        (high >> 8) & 0xff,
        high & 0xff,
        (low >> 8) & 0xff,
        low & 0xff
      )
    }
    return true
  }

  return false
}

const BLOCKED_HOSTNAMES = new Set(["localhost", "metadata.google.internal"])

/**
 * Memeriksa apakah hostname menunjuk ke jaringan internal, loopback, link-local, atau IP privat.
 */
export function isPrivateOrReservedHost(hostname: string): boolean {
  const host = hostname.toLowerCase().trim()
  if (!host || BLOCKED_HOSTNAMES.has(host)) return true

  if (
    host.endsWith(".local") ||
    host.endsWith(".internal") ||
    host.endsWith(".localhost") ||
    host.endsWith(".arpa")
  ) {
    return true
  }

  const ipv4 = parseDottedIpv4(host)
  if (ipv4) {
    return isPrivateOrReservedIpv4Octets(...ipv4)
  }

  if (host.includes(":")) {
    return isPrivateOrReservedIpv6(host)
  }

  return false
}

/**
 * Memvalidasi bahwa URL menggunakan protokol http(s), tanpa kredensial tertanam,
 * dan tidak mengarah ke host privat/internal.
 */
export function isSafeHttpUrl(url?: string | null): boolean {
  if (!url) return false
  try {
    const parsed = new URL(url.trim())
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return false
    if (parsed.username || parsed.password) return false
    if (isPrivateOrReservedHost(parsed.hostname)) return false
    return true
  } catch {
    return false
  }
}

export const SAFE_RASTER_DATA_URL_REGEX = /^data:image\/(png|jpeg|jpg|webp);base64,[a-z0-9+/=]+$/i
export const MAX_POSTER_DATA_URL_LENGTH = 2_000_000

/**
 * Memvalidasi sumber poster aman (base64 raster data URL terbatas ukuran atau tautan http(s) publik).
 */
export function isSafePosterSrc(src?: string | null): boolean {
  if (!src) return false
  const trimmed = src.trim()
  if (SAFE_RASTER_DATA_URL_REGEX.test(trimmed)) {
    return trimmed.length <= MAX_POSTER_DATA_URL_LENGTH
  }
  return isSafeHttpUrl(trimmed)
}
