"use client"

import React from "react"
import { Task, Announcement } from "@/types"
import { formatIndonesianDate } from "@/lib/date-utils"
import { Edit3, Trash2, BookOpen, Megaphone, Lock, Image as ImageIcon, Pin } from "lucide-react"
import { usePortalStore } from "@/lib/portal-store"

interface PublisherContentItemProps {
  type: "task" | "announcement"
  item: Task | Announcement
  canManage?: boolean
  onEdit: () => void
  onDelete: () => void
}

export function PublisherContentItem({
  type,
  item,
  canManage = true,
  onEdit,
  onDelete,
}: PublisherContentItemProps) {
  const { togglePinAnnouncement } = usePortalStore()
  const isTask = type === "task"
  const task = isTask ? (item as Task) : null
  const announcement = !isTask ? (item as Announcement) : null

  const isDraft = item.status === "DRAFT"

  const createdDate = formatIndonesianDate(item.created_at, {
    shortMonth: true,
  })

  return (
    <div className="bg-white rounded-[22px] p-4 sm:p-5 border border-[#E4E7F0] shadow-2xs hover:border-[#111318]/30 transition-[border-color] duration-150 h-full flex flex-col justify-between gap-3">
      <div className="space-y-2.5">
        {/* Top Header */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#EEF1F6] text-[#111318] px-2 py-0.5 rounded-full flex items-center gap-1">
              {isTask ? (
                <BookOpen className="w-2.5 h-2.5" />
              ) : (
                <Megaphone className="w-2.5 h-2.5" />
              )}
              <span>{isTask ? "Tugas" : "Info"}</span>
            </span>

            {item.course && (
              <span className="text-[10px] font-bold bg-[#A8C0FF] text-[#111318] px-2 py-0.5 rounded-full">
                {item.course.code}
              </span>
            )}

            {announcement && !announcement.course && (
              <span className="text-[10px] font-bold bg-[#F6C866] text-[#111318] px-2 py-0.5 rounded-full">
                {announcement.category_type === "CAMPUS_NEWS"
                  ? "Berita"
                  : announcement.category_type === "COMPETITION"
                  ? "Lomba"
                  : "Akademik"}
              </span>
            )}

            {announcement?.is_pinned && (
              <span className="text-[10px] font-bold bg-[#111318] text-white px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                <Pin className="w-2.5 h-2.5 fill-white" />
                <span>Dipin</span>
              </span>
            )}

            {announcement?.poster_url && (
              <span className="text-[10px] font-semibold bg-[#EA9DFB]/50 text-[#111318] px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                <ImageIcon className="w-2.5 h-2.5" />
                <span>Poster</span>
              </span>
            )}
          </div>

          {/* Status Pill */}
          {isDraft ? (
            <span className="text-[10px] font-bold bg-[#F6C866] text-[#111318] px-2 py-0.5 rounded-full">
              Draft
            </span>
          ) : (
            <span className="text-[10px] font-bold bg-[#4CD98B] text-[#111318] px-2 py-0.5 rounded-full">
              Tayang
            </span>
          )}
        </div>

        {/* Title */}
        <h4 className="text-sm font-bold text-[#111318] leading-tight line-clamp-1">
          {item.title}
        </h4>

        {/* Snippet */}
        <p className="text-xs text-[#6E7485] line-clamp-2 leading-relaxed">
          {isTask ? task?.instructions : announcement?.content}
        </p>
      </div>

      {/* Footer: Date & Actions */}
      <div className="pt-2 border-t border-[#E4E7F0]/60 flex items-center justify-between">
        <span className="text-[11px] text-[#6E7485]" suppressHydrationWarning>
          Dibuat: {createdDate}
        </span>

        {canManage ? (
          <div className="flex items-center gap-0.5">
            {!isTask && announcement && (
              <button
                type="button"
                onClick={() => togglePinAnnouncement(announcement.id)}
                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
                  announcement.is_pinned
                    ? "text-[#111318] bg-[#EEF1F6]"
                    : "text-[#6E7485] hover:text-[#111318] hover:bg-[#EEF1F6]"
                }`}
                title={announcement.is_pinned ? "Lepas Sematan (Unpin)" : "Sematkan di Atas (Pin)"}
                aria-label={announcement.is_pinned ? "Lepas Sematan" : "Sematkan di Atas"}
              >
                <Pin
                  className={`w-4 h-4 ${
                    announcement.is_pinned ? "fill-[#111318]" : ""
                  }`}
                />
              </button>
            )}
            <button
              type="button"
              onClick={onEdit}
              className="w-11 h-11 rounded-xl flex items-center justify-center text-[#6E7485] hover:text-[#111318] hover:bg-[#EEF1F6] transition-colors cursor-pointer"
              title="Edit Konten"
              aria-label="Edit Konten"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onDelete}
              className="w-11 h-11 rounded-xl flex items-center justify-center text-[#6E7485] hover:text-[#F05252] hover:bg-[#F05252]/10 transition-colors cursor-pointer"
              title="Hapus Konten"
              aria-label="Hapus Konten"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#6E7485] bg-[#EEF1F6] px-2.5 py-1 rounded-full">
            <Lock className="w-3 h-3" />
            <span>Publisher Lain</span>
          </span>
        )}
      </div>
    </div>
  )
}
