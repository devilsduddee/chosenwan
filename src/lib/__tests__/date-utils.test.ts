import test from "node:test"
import assert from "node:assert/strict"
import {
  formatDateTimeLocalInput,
  formatDateInputValue,
  formatIndonesianDate,
  formatIndonesianTime,
  isTaskUrgent,
  isTaskPast,
  URGENT_WINDOW_MS,
} from "../date-utils"

test("formatDateTimeLocalInput preserves local wall-clock time without UTC shift", () => {
  const localDate = new Date(2026, 10, 25, 23, 59, 0) // 25 Nov 2026 23:59 local
  assert.equal(formatDateTimeLocalInput(localDate), "2026-11-25T23:59")
  assert.equal(formatDateInputValue(localDate), "2026-11-25")
})

test("formatIndonesianDate and Time output expected Indonesian labels", () => {
  const localDate = new Date(2026, 10, 25, 8, 5, 0) // Rabu, 25 Nov 2026 08:05
  assert.equal(
    formatIndonesianDate(localDate, { showDayName: true, shortDayName: true, shortMonth: true }),
    "Rab, 25 Nov"
  )
  assert.equal(formatIndonesianTime(localDate), "08:05")
})

test("isTaskUrgent and isTaskPast respect 24-hour boundary accurately", () => {
  const now = new Date("2026-11-25T10:00:00.000Z").getTime()
  const dueIn2Hours = new Date(now + 2 * 3600 * 1000).toISOString()
  const dueExactly24Hours = new Date(now + URGENT_WINDOW_MS).toISOString()
  const dueIn30Hours = new Date(now + 30 * 3600 * 1000).toISOString()
  const due1HourAgo = new Date(now - 3600 * 1000).toISOString()

  assert.equal(isTaskUrgent(dueIn2Hours, now), true)
  assert.equal(isTaskUrgent(dueExactly24Hours, now), true)
  assert.equal(isTaskUrgent(dueIn30Hours, now), false)
  assert.equal(isTaskUrgent(due1HourAgo, now), false)

  assert.equal(isTaskPast(due1HourAgo, now), true)
  assert.equal(isTaskPast(dueIn2Hours, now), false)
})
