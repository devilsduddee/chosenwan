import test from "node:test"
import assert from "node:assert/strict"
import { deriveCourseCode } from "../course-utils"

test("deriveCourseCode generates unique codes for all 3IA01 courses without collisions", () => {
  const courses = [
    "Pemrograman Web",
    "Sistem Keamanan Komputer",
    "Kecerdasan Artificial",
    "Grafik Komputer",
    "Sistem Basis Data 1",
    "Interaksi Manusia & Komputer",
    "Perancangan & Analisis Algoritma",
    "Jaringan Komputer",
  ]

  const codes = courses.map(deriveCourseCode)
  const uniqueCodes = new Set(codes)

  assert.equal(uniqueCodes.size, courses.length)
  assert.equal(deriveCourseCode("Interaksi Manusia & Komputer"), "IMK")
  assert.equal(deriveCourseCode("Sistem Basis Data 1"), "SBD1")
  assert.equal(deriveCourseCode("Sistem Keamanan Komputer"), "SKK")
})
