import test from "node:test"
import assert from "node:assert/strict"
import { checkRateLimit, extractClientIp } from "../rate-limit"

test("checkRateLimit enforces limit within window and decrements remaining", () => {
  const key = `test-rate-${Date.now()}`
  const r1 = checkRateLimit(key, { limit: 2, windowMs: 60_000 })
  const r2 = checkRateLimit(key, { limit: 2, windowMs: 60_000 })
  const r3 = checkRateLimit(key, { limit: 2, windowMs: 60_000 })

  assert.equal(r1.allowed, true)
  assert.equal(r1.remaining, 1)
  assert.equal(r2.allowed, true)
  assert.equal(r2.remaining, 0)
  assert.equal(r3.allowed, false)
  assert.equal(r3.remaining, 0)
})

test("extractClientIp prioritizes Vercel and proxy headers", () => {
  const h = new Headers({
    "x-vercel-forwarded-for": "203.0.113.10, 10.0.0.1",
    "x-real-ip": "198.51.100.5",
  })
  assert.equal(extractClientIp(h), "203.0.113.10")
})
