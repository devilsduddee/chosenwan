import type { MetadataRoute } from "next"

const BLOCKED_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "CCBot",
  "ClaudeBot",
  "anthropic-ai",
  "Bytespider",
  "AhrefsBot",
  "SemrushBot",
  "MJ12bot",
  "DotBot",
  "PetalBot",
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...BLOCKED_CRAWLERS.map((userAgent) => ({
        userAgent,
        disallow: "/",
      })),
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/login", "/api/", "/_next/"],
      },
    ],
  }
}
