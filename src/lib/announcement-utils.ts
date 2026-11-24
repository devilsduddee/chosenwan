import { Announcement } from "@/types"

export function getAnnouncementCategoryMeta(cat: string) {
  switch (cat) {
    case "ACADEMIC":
      return {
        label: "Akademik / Jadwal",
        bgClass: "bg-[#A8C0FF]",
        textColor: "text-[#111318]",
      }
    case "CAMPUS_NEWS":
      return {
        label: "Berita Kampus",
        bgClass: "bg-[#F6C866]",
        textColor: "text-[#111318]",
      }
    case "COMPETITION":
      return {
        label: "Info Lomba",
        bgClass: "bg-[#EA9DFB]",
        textColor: "text-[#111318]",
      }
    default:
      return {
        label: "Pengumuman",
        bgClass: "bg-[#EEF1F6]",
        textColor: "text-[#111318]",
      }
  }
}

function isPrivateOrReservedHost(hostname: string): boolean {
  const host = hostname.toLowerCase().trim()
  if (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "0.0.0.0" ||
    host === "::1" ||
    host === "169.254.169.254" ||
    host.endsWith(".local") ||
    host.endsWith(".internal") ||
    host.endsWith(".localhost")
  ) {
    return true
  }
  if (/^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(host)) return true
  if (/^192\.168\.\d{1,3}\.\d{1,3}$/.test(host)) return true
  if (/^169\.254\.\d{1,3}\.\d{1,3}$/.test(host)) return true
  if (/^172\.(1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3}$/.test(host)) return true
  return false
}

export function isSafeHttpUrl(url?: string | null): boolean {
  if (!url) return false
  try {
    const parsed = new URL(url)
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return false
    if (isPrivateOrReservedHost(parsed.hostname)) return false
    return true
  } catch {
    return false
  }
}

export function buildAnnouncementWhatsAppText(announcement: Announcement): string {
  const categoryMeta = getAnnouncementCategoryMeta(announcement.category_type)
  return (
    `📢 *INFO KELAS: ${announcement.title}*\n` +
    `🏷 *Kategori:* ${categoryMeta.label}\n` +
    (announcement.course ? `📚 *Mata Kuliah:* ${announcement.course.code} · ${announcement.course.name}\n` : "") +
    `\n${announcement.content}\n` +
    (announcement.source_url ? `\n🔗 *Sumber Resmi:* ${announcement.source_url}\n` : "") +
    `\n_Info via Chosenwan Portal_`
  )
}
