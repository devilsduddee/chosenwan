export interface RateLimitOptions {
  limit: number
  windowMs: number
}

export interface RateLimitResult {
  allowed: boolean
  limit: number
  remaining: number
  resetAt: number
  retryAfterSeconds: number
}

interface BucketEntry {
  count: number
  resetAt: number
}

const MAX_TRACKED_KEYS = 5000
const store = new Map<string, BucketEntry>()
let lastCleanupAt = 0

function pruneExpiredBuckets(now: number): void {
  if (now - lastCleanupAt < 30_000 && store.size < MAX_TRACKED_KEYS) {
    return
  }
  lastCleanupAt = now

  for (const [key, entry] of store.entries()) {
    if (entry.resetAt <= now) {
      store.delete(key)
    }
  }

  // Hard cap to prevent unbounded memory growth under randomized IP floods
  while (store.size >= MAX_TRACKED_KEYS) {
    const oldestKey = store.keys().next().value
    if (!oldestKey) break
    store.delete(oldestKey)
  }
}

/**
 * Extracts the client IP from Vercel / standard proxy headers.
 */
export function extractClientIp(headers: Headers): string {
  const vercelForwarded = headers.get("x-vercel-forwarded-for")
  if (vercelForwarded) {
    const first = vercelForwarded.split(",")[0]?.trim()
    if (first) return first
  }

  const realIp = headers.get("x-real-ip")?.trim()
  if (realIp) return realIp

  const forwardedFor = headers.get("x-forwarded-for")
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim()
    if (first) return first
  }

  return "unknown"
}

/**
 * Fixed-window per-instance rate limiter with bounded memory.
 */
export function checkRateLimit(key: string, options: RateLimitOptions): RateLimitResult {
  const now = Date.now()
  pruneExpiredBuckets(now)

  const existing = store.get(key)
  if (!existing || existing.resetAt <= now) {
    const resetAt = now + options.windowMs
    store.set(key, { count: 1, resetAt })
    return {
      allowed: true,
      limit: options.limit,
      remaining: Math.max(0, options.limit - 1),
      resetAt,
      retryAfterSeconds: Math.ceil(options.windowMs / 1000),
    }
  }

  existing.count += 1
  const allowed = existing.count <= options.limit
  const remaining = Math.max(0, options.limit - existing.count)
  const retryAfterSeconds = Math.max(1, Math.ceil((existing.resetAt - now) / 1000))

  return {
    allowed,
    limit: options.limit,
    remaining,
    resetAt: existing.resetAt,
    retryAfterSeconds,
  }
}
