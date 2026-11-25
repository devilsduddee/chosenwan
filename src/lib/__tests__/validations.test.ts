import test from "node:test"
import assert from "node:assert/strict"
import {
  serverTaskCreateSchema,
  serverEventCreateSchema,
  serverScheduleCreateSchema,
  loginFormSchema,
} from "../validations"
import { isSafeHttpUrl, isSafePosterSrc } from "../url-safety"

test("url-safety blocks javascript:, loopback, and cloud metadata SSRF targets", () => {
  assert.equal(isSafeHttpUrl("https://drive.google.com/drive/folders/abc"), true)
  assert.equal(isSafeHttpUrl("javascript:alert(1)"), false)
  assert.equal(isSafeHttpUrl("http://127.0.0.1:3000/admin"), false)
  assert.equal(isSafeHttpUrl("http://169.254.169.254/latest/meta-data/"), false)
  assert.equal(isSafeHttpUrl("http://192.168.1.1"), false)
  assert.equal(isSafePosterSrc("data:image/svg+xml;base64,PHN2Zz4="), false)
  assert.equal(isSafePosterSrc("data:image/jpeg;base64,/9j/4AAQ"), true)
})

test("serverTaskCreateSchema rejects unsafe URLs and empty fields", () => {
  const valid = serverTaskCreateSchema.safeParse({
    course_id: "course-1",
    title: "Tugas 1 IMK",
    instructions: "Kerjakan wireframe mobile",
    due_date: "2026-11-30T23:59:00.000Z",
    submission_url: "https://classroom.google.com/c/123",
    status: "PUBLISHED",
  })
  assert.equal(valid.success, true)

  const invalidUrl = serverTaskCreateSchema.safeParse({
    course_id: "course-1",
    title: "Tugas 1 IMK",
    instructions: "Kerjakan wireframe mobile",
    due_date: "2026-11-30T23:59:00.000Z",
    submission_url: "javascript:alert(1)",
    status: "PUBLISHED",
  })
  assert.equal(invalidUrl.success, false)
})

test("serverScheduleCreateSchema enforces valid day range and end_time > start_time", () => {
  const ok = serverScheduleCreateSchema.safeParse({
    course_id: "c1",
    day_of_week: 6,
    start_time: "08:00",
    end_time: "10:30",
    room: "D132",
  })
  assert.equal(ok.success, true)

  const invalidDay = serverScheduleCreateSchema.safeParse({
    course_id: "c1",
    day_of_week: 7,
    start_time: "08:00",
    end_time: "10:30",
    room: "D132",
  })
  assert.equal(invalidDay.success, false)

  const invalidTime = serverScheduleCreateSchema.safeParse({
    course_id: "c1",
    day_of_week: 1,
    start_time: "12:00",
    end_time: "10:00",
    room: "D132",
  })
  assert.equal(invalidTime.success, false)
})

test("serverEventCreateSchema and loginFormSchema validate boundaries", () => {
  const validEvent = serverEventCreateSchema.safeParse({
    category: "ACADEMIC",
    title: "Jadwal UTS",
    content: "Ujian dimulai minggu depan di ruang D132.",
    event_date: "2026-12-01",
    status: "PUBLISHED",
  })
  assert.equal(validEvent.success, true)

  const shortLogin = loginFormSchema.safeParse({ name: "a", password: "123" })
  assert.equal(shortLogin.success, false)
})
