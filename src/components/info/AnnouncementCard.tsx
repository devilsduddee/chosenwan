"use client"

import React, { useState } from "react"
import { Announcement } from "@/types"
import { ExternalLink, Share2, Check, Calendar } from "lucide-react"
import { toast } from "sonner"

interface AnnouncementCardProps {
  announcement: Announcement
}

export function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  const [copied, setCopied] = useState(false)

  const createdDate = new Date(announcement.created_at)
  const formattedDate = createdDate.toLocaleDateString("id-ID", {
    weekday: "short",
    day: "numeric",
    month: "short",
  })

  // Category Configuration
  const getCategoryMeta = (cat: string) => {
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
          label: "Peluang Lomba",
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

  const categoryMeta = getCategoryMeta(announcement.category_type)

  const handleShare = () => {
    const text = `📢 *INFO KELAS: ${announcement.title}*\n` +
      `🏷 *Kategori:* ${categoryMeta.label}\n` +
      `\n${announcement.content}\n` +
      (announcement.source_url ? `\n🔗 *Sumber Resmi:* ${announcement.source_url}\n` : "") +
      `\n_Info via Chosenwan Portal_`

    navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success("Info berhasil disalin untuk WhatsApp!")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white rounded-3xl p-5 border border-[#E4E7F0] shadow-xs space-y-3">
      {/* Header Row: Category Badge & Date */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span
            className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${categoryMeta.bgClass} ${categoryMeta.textColor}`}
          >
            {categoryMeta.label}
          </span>
          {announcement.course && (
            <span className="text-[11px] font-semibold text-[#6E7485] bg-[#EEF1F6] px-2 py-0.5 rounded-full">
              {announcement.course.code}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-[11px] text-[#6E7485]">
          <Calendar className="w-3 h-3" />
          <span>{formattedDate}</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-base font-bold text-[#111318] leading-snug">
        {announcement.title}
      </h3>

      {/* Content */}
      <p className="text-xs text-[#111318]/90 leading-relaxed whitespace-pre-line bg-[#F6F7FB] p-3.5 rounded-2xl border border-[#E4E7F0]/60">
        {announcement.content}
      </p>

      {/* Footer Actions */}
      <div className="pt-2 flex items-center justify-between gap-2 border-t border-[#E4E7F0]/60">
        {announcement.source_url ? (
          <a
            href={announcement.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#111318] hover:underline"
          >
            <span>Buka Sumber Resmi</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#6E7485]" strokeWidth={2} />
          </a>
        ) : (
          <span className="text-[11px] text-[#6E7485]">Sumber terverifikasi kelas</span>
        )}

        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#6E7485] hover:text-[#111318] p-1.5 rounded-lg hover:bg-[#EEF1F6] transition-colors cursor-pointer"
          title="Salin info untuk WA"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-[#4CD98B]" />
          ) : (
            <Share2 className="w-3.5 h-3.5" />
          )}
          <span className="text-[11px]">{copied ? "Disalin" : "Bagi ke WA"}</span>
        </button>
      </div>
    </div>
  )
}
