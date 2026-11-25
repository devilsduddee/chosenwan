"use client"

import React, { useState } from "react"
import { Announcement } from "@/types"
import { formatIndonesianDate } from "@/lib/date-utils"
import { isSafePosterSrc } from "@/lib/image-utils"
import { getAnnouncementCategoryMeta, isSafeHttpUrl } from "@/lib/announcement-utils"
import { Calendar, ChevronRight, Image as ImageIcon, Link2, Pin } from "lucide-react"

interface AnnouncementCardProps {
  announcement: Announcement
  onSelect: (announcement: Announcement) => void
}

export function AnnouncementCard({ announcement, onSelect }: AnnouncementCardProps) {
  const [posterFailed, setPosterFailed] = useState(false)

  const posterSrc =
    !posterFailed && isSafePosterSrc(announcement.poster_url)
      ? announcement.poster_url
      : null

  const formattedDate = formatIndonesianDate(announcement.created_at, {
    showDayName: true,
    shortDayName: true,
    shortMonth: true,
  })

  const categoryMeta = getAnnouncementCategoryMeta(announcement.category_type)
  const hasSourceUrl = isSafeHttpUrl(announcement.source_url)

  return (
    <button
      type="button"
      onClick={() => onSelect(announcement)}
      className={`w-full h-full flex flex-col justify-between text-left bg-white rounded-[22px] p-4 sm:p-5 border shadow-2xs transition-[transform,border-color] duration-150 cursor-pointer active:scale-[0.98] group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111318] ${
        announcement.is_pinned
          ? "border-[#111318] ring-1 ring-[#111318]/10"
          : "border-[#E4E7F0] hover:border-[#111318]/30"
      }`}
    >
      <div className="w-full space-y-3">
        {/* Header Row: Category Badge, Pin Badge & Date */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            {announcement.is_pinned && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#111318] text-white">
                <Pin className="w-2.5 h-2.5 fill-white" /> Dipin
              </span>
            )}
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

          <div className="flex items-center gap-1 text-[11px] text-[#6E7485] shrink-0">
            <Calendar className="w-3 h-3" />
            <span suppressHydrationWarning>{formattedDate}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-sm sm:text-base font-bold text-[#111318] leading-snug line-clamp-2">
          {announcement.title}
        </h3>

        {/* Poster Thumbnail Preview */}
        {posterSrc && (
          <div className="w-full rounded-2xl overflow-hidden border border-[#E4E7F0] bg-[#F6F7FB]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={posterSrc}
              alt={`Poster ${announcement.title}`}
              onError={() => setPosterFailed(true)}
              className="w-full max-h-44 object-cover object-top"
            />
          </div>
        )}

        {/* Snippet */}
        <p className="text-xs text-[#6E7485] leading-relaxed line-clamp-3">
          {announcement.content}
        </p>
      </div>

      {/* Card Footer */}
      <div className="w-full mt-3 pt-2.5 border-t border-[#E4E7F0]/60 flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 text-[#6E7485] flex-wrap">
          {posterSrc && (
            <span className="inline-flex items-center gap-1 text-[10px] bg-[#EA9DFB]/40 text-[#111318] px-2 py-0.5 rounded-md font-semibold">
              <ImageIcon className="w-2.5 h-2.5" /> Poster
            </span>
          )}
          {hasSourceUrl && (
            <span className="inline-flex items-center gap-1 text-[10px] bg-[#EEF1F6] text-[#111318] px-2 py-0.5 rounded-md font-medium">
              <Link2 className="w-2.5 h-2.5" /> Sumber Resmi
            </span>
          )}
          {!posterSrc && !hasSourceUrl && (
            <span className="text-[11px]">Ketuk untuk detail</span>
          )}
        </div>

        <div className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-[#6E7485] group-hover:text-[#111318] transition-colors shrink-0">
          <span>Detail</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </button>
  )
}
