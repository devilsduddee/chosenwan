"use client"

import React from "react"
import { Task, Announcement } from "@/types"
import { formatIndonesianDate } from "@/lib/date-utils"
import { Edit3, Trash2, BookOpen, Megaphone } from "lucide-react"

interface PublisherContentItemProps {
  type: "task" | "announcement"
  item: Task | Announcement
  onEdit: () => void
  onDelete: () => void
}

export function PublisherContentItem({
  type,
  item,
  onEdit,
  onDelete,
}: PublisherContentItemProps) {
  const isTask = type === "task"
  const task = isTask ? (item as Task) : null
  const announcement = !isTask ? (item as Announcement) : null

  const isDraft = item.status === "DRAFT"

  const createdDate = formatIndonesianDate(item.created_at, {
    shortMonth: true,
  })

  return (
    <div className="bg-white rounded-2xl p-4 border border-[#E4E7F0] shadow-xs hover:border-[#111318]/30 transition-all space-y-2.5">
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

      {/* Footer: Date & Actions */}
      <div className="pt-2 border-t border-[#E4E7F0]/60 flex items-center justify-between">
        <span className="text-[11px] text-[#6E7485]" suppressHydrationWarning>
          Dibuat: {createdDate}
        </span>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onEdit}
            className="p-1.5 rounded-lg text-[#6E7485] hover:text-[#111318] hover:bg-[#EEF1F6] transition-colors cursor-pointer"
            title="Edit Konten"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="p-1.5 rounded-lg text-[#6E7485] hover:text-[#F05252] hover:bg-[#F05252]/10 transition-colors cursor-pointer"
            title="Hapus Konten"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
