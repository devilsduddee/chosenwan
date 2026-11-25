import { Announcement } from "@/types"
import { isSafeHttpUrl } from "@/lib/url-safety"

export { isSafeHttpUrl }

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
