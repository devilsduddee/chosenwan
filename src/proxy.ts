import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { checkRateLimit, extractClientIp } from "@/lib/rate-limit"

const SCANNER_PATH_PATTERNS = [
  /^\/wp-/i,
  /^\/xmlrpc\.php/i,
  /^\/\.env/i,
  /^\/\.git/i,
  /^\/phpmyadmin/i,
  /^\/cgi-bin/i,
  /^\/vendor\/phpunit/i,
  /\.php$/i,
]

const BLOCKED_BOT_AGENTS = [
  "gptbot",
  "chatgpt-user",
  "ccbot",
  "claudebot",
  "anthropic-ai",
  "bytespider",
  "ahrefsbot",
  "semrushbot",
  "mj12bot",
  "dotbot",
  "petalbot",
  "scrapy",
  "python-requests",
  "go-http-client",
  "nikto",
  "sqlmap",
  "masscan",
  "zgrab",
]

function resolveLimitPolicy(pathname: string): { bucket: string; limit: number; windowMs: number } {
  if (pathname.startsWith("/api/")) {
    return { bucket: "api", limit: 20, windowMs: 60_000 }
  }
  return { bucket: "login", limit: 15, windowMs: 60_000 }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. Drop automated vulnerability scanners immediately with minimal payload
  if (SCANNER_PATH_PATTERNS.some((pattern) => pattern.test(pathname))) {
    return new NextResponse(null, {
      status: 403,
      headers: {
        "Cache-Control": "public, max-age=3600",
      },
    })
  }

  // 2. Reject empty/suspicious short User-Agents & aggressive scrapers on guarded routes
  const userAgent = (request.headers.get("user-agent") || "").trim().toLowerCase()
  if (
    userAgent.length < 5 ||
    BLOCKED_BOT_AGENTS.some((bot) => userAgent.includes(bot))
  ) {
    return new NextResponse("Forbidden", {
      status: 403,
      headers: {
        "Cache-Control": "public, max-age=3600",
      },
    })
  }

  // 3. Apply per-IP rate limiting on auth/API routes (static routes /, /portal stay cached on CDN)
  const ip = extractClientIp(request.headers)
  const policy = resolveLimitPolicy(pathname)
  const result = checkRateLimit(`${policy.bucket}:${ip}`, {
    limit: policy.limit,
    windowMs: policy.windowMs,
  })

  const rateHeaders = {
    "X-RateLimit-Limit": String(result.limit),
    "X-RateLimit-Remaining": String(result.remaining),
    "X-RateLimit-Reset": String(Math.ceil(result.resetAt / 1000)),
  }

  if (!result.allowed) {
    return NextResponse.json(
      { error: "Terlalu banyak permintaan. Coba lagi sebentar." },
      {
        status: 429,
        headers: {
          ...rateHeaders,
          "Retry-After": String(result.retryAfterSeconds),
          "Cache-Control": "no-store",
        },
      }
    )
  }

  const response = NextResponse.next()
  Object.entries(rateHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  return response
}

// Keep static pages (/, /portal) on Vercel Edge CDN without proxy compute; guard auth, API, & scanner probes
export const config = {
  matcher: [
    "/api/:path*",
    "/login",
    "/wp-:path*",
    "/xmlrpc.php",
    "/.env:path*",
    "/.git:path*",
    "/phpmyadmin:path*",
    "/cgi-bin/:path*",
    "/vendor/:path*",
    "/:path*.php",
  ],
}
