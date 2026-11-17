/**
 * Deterministic date and time formatting utilities in Indonesian locale.
 * Avoids Node.js SSR vs Browser ICU discrepancies (dots vs colons, narrow spaces, etc.)
 */

const DAY_NAMES = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
const SHORT_DAY_NAMES = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"]

const MONTH_NAMES = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
]

const SHORT_MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
]

interface FormatDateOptions {
  showDayName?: boolean
  shortDayName?: boolean
  shortMonth?: boolean
  showYear?: boolean
}

export function formatIndonesianDate(
  dateInput: string | Date | number,
  options: FormatDateOptions = {}
): string {
  const d =
    typeof dateInput === "string" || typeof dateInput === "number"
      ? new Date(dateInput)
      : dateInput

  if (!d || isNaN(d.getTime())) return ""

  const dayIndex = d.getDay()
  const dateNum = d.getDate()
  const monthIndex = d.getMonth()
  const year = d.getFullYear()

  let dayPart = ""
  if (options.showDayName) {
    dayPart = options.shortDayName
      ? `${SHORT_DAY_NAMES[dayIndex]}, `
      : `${DAY_NAMES[dayIndex]}, `
  }

  const monthPart = options.shortMonth
    ? SHORT_MONTH_NAMES[monthIndex]
    : MONTH_NAMES[monthIndex]

  const yearPart = options.showYear ? ` ${year}` : ""

  return `${dayPart}${dateNum} ${monthPart}${yearPart}`.trim()
}

export function formatIndonesianTime(dateInput: string | Date | number): string {
  const d =
    typeof dateInput === "string" || typeof dateInput === "number"
      ? new Date(dateInput)
      : dateInput

  if (!d || isNaN(d.getTime())) return ""

  const hours = String(d.getHours()).padStart(2, "0")
  const minutes = String(d.getMinutes()).padStart(2, "0")
  return `${hours}:${minutes}`
}
