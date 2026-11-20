"use client"

import React, { useState } from "react"
import { Announcement } from "@/types"
import { formatIndonesianDate } from "@/lib/date-utils"
import { isSafePosterSrc } from "@/lib/image-utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ExternalLink, Share2, Check, Calendar, Maximize2 } from "lucide-react"
import { toast } from "sonner"

interface AnnouncementCardProps {
  announcement: Announcement
}

export function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  const [copied, setCopied] = useState(false)
  const [isPosterOpen, setIsPosterOpen] = useState(false)
  const [posterFailed, setPosterFailed] = useState(false)

  const posterSrc =
    !posterFailed && isSafePosterSrc(announcement.poster_url)
      ? announcement.poster_url
      : null

  const createdDate = new Date(announcement.created_at)
  const formattedDate = formatIndonesianDate(createdDate, {
    showDayName: true,
    shortDayName: true,
    shortMonth: true,
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
    <div className="bg-white rounded-[22px] p-5 border border-[#E4E7F0] shadow-2xs h-full flex flex-col justify-between gap-3">
      <div className="space-y-3">
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
            <span suppressHydrationWarning>{formattedDate}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-[#111318] leading-snug">
          {announcement.title}
        </h3>

        {/* Poster Preview (when attached, clickable to zoom) */}
        {posterSrc && (
          <button
            type="button"
            onClick={() => setIsPosterOpen(true)}
            aria-label={`Perbesar poster ${announcement.title}`}
            className="relative w-full rounded-2xl overflow-hidden border border-[#E4E7F0] bg-[#F6F7FB] group cursor-pointer active:scale-[0.99] transition-transform block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111318]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={posterSrc}
              alt={`Poster ${announcement.title}`}
              onError={() => setPosterFailed(true)}
              className="w-full max-h-60 object-cover object-top"
            />
            <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 rounded-full bg-[#111318]/85 text-white text-[10px] font-bold px-2.5 py-1 shadow-xs">
              <Maximize2 className="w-3 h-3" strokeWidth={2} />
              <span>Lihat Poster</span>
            </span>
          </button>
        )}

        {/* Content */}
        <p className="text-xs text-[#111318]/90 leading-relaxed whitespace-pre-line bg-[#F6F7FB] p-3.5 rounded-2xl border border-[#E4E7F0]/60">
          {announcement.content}
        </p>
      </div>

      {/* Fullscreen Poster Viewer Dialog */}
      {posterSrc && (
        <Dialog open={isPosterOpen} onOpenChange={setIsPosterOpen}>
          <DialogContent className="max-w-lg w-[calc(100%-1.5rem)] mx-auto rounded-[24px] p-4 sm:p-5 bg-white border border-[#E4E7F0] shadow-2xl max-h-[90dvh] overflow-y-auto overscroll-contain">
            <DialogHeader className="text-left pr-8">
              <DialogTitle className="text-sm font-extrabold text-[#111318] leading-snug">
                {announcement.title}
              </DialogTitle>
            </DialogHeader>
            <div className="rounded-2xl overflow-hidden bg-[#F6F7FB] border border-[#E4E7F0]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={posterSrc}
                alt={`Poster penuh ${announcement.title}`}
                className="w-full max-h-[72dvh] object-contain mx-auto"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Footer Actions */}
      <div className="pt-2.5 flex items-center justify-between gap-2 border-t border-[#E4E7F0]/60">
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
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#111318] bg-[#EEF1F6] hover:bg-[#E4E7F0] px-3 py-1.5 rounded-full transition-all cursor-pointer active:scale-95"
          title="Salin info untuk WA"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-[#4CD98B]" />
          ) : (
            <Share2 className="w-3.5 h-3.5" />
          )}
          <span className="text-[11px] font-semibold">{copied ? "Tersalin" : "Bagi ke WA"}</span>
        </button>
      </div>
    </div>
  )
}
