import test from "node:test"
import assert from "node:assert/strict"
import { encryptSessionToken, decryptSessionToken, resolveSessionSecret } from "../session-token"

test("PASETO v3.local session token round-trip succeeds and rejects tampering", async () => {
  const token = await encryptSessionToken({
    userId: "user-123",
    name: "ketua",
    role: "ketua_kelas",
  })

  assert.equal(token.startsWith("v3.local."), true)

  const decoded = await decryptSessionToken(token)
  assert.deepEqual(decoded, {
    userId: "user-123",
    name: "ketua",
    role: "ketua_kelas",
  })

  const tampered = token.slice(0, -4) + "AAAA"
  assert.equal(await decryptSessionToken(tampered), null)
  assert.equal(await decryptSessionToken("eyJhbGciOiJIUzI1NiJ9.legacy.jwt"), null)
  assert.equal(await decryptSessionToken(null), null)
})

test("resolveSessionSecret fails closed in production when secret is missing or short", () => {
  const env = process.env as Record<string, string | undefined>
  const origEnv = env.NODE_ENV
  const origSession = env.SESSION_SECRET
  const origJwt = env.JWT_SECRET

  try {
    env.NODE_ENV = "production"
    env.SESSION_SECRET = "too-short"
    env.JWT_SECRET = ""

    assert.throws(() => resolveSessionSecret(), /SESSION_SECRET/)
  } finally {
    if (origEnv === undefined) delete env.NODE_ENV
    else env.NODE_ENV = origEnv
    if (origSession === undefined) delete env.SESSION_SECRET
    else env.SESSION_SECRET = origSession
    if (origJwt === undefined) delete env.JWT_SECRET
    else env.JWT_SECRET = origJwt
  }
})
