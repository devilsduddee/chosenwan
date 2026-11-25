const STOP_WORDS = new Set(["&", "dan", "di", "ke", "pada", "untuk", "atau"])

/**
 * Menghasilkan kode singkatan mata kuliah yang unik dan deterministik dari nama mata kuliah.
 * Contoh: "Sistem Basis Data 1" -> "SBD1", "Sistem Keamanan Komputer" -> "SKK".
 */
export function deriveCourseCode(name: string): string {
  const words = name
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0 && !STOP_WORDS.has(w.toLowerCase()))

  if (words.length === 0) return "MK"
  if (words.length === 1) return words[0].slice(0, 4).toUpperCase()

  return words
    .map((word) => {
      if (/^\d+$/.test(word)) return word
      return word[0].toUpperCase()
    })
    .join("")
    .slice(0, 6)
}
