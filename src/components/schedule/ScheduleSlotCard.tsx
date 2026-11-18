"use client"

import React from "react"
import { Schedule } from "@/types"
import { Clock, MapPin, User, Edit3, Trash2 } from "lucide-react"

interface ScheduleSlotCardProps {
  schedule: Schedule
  canManage?: boolean
  onEdit?: () => void
  onDelete?: () => void
}

export function ScheduleSlotCard({
  schedule,
  canManage = false,
  onEdit,
  onDelete,
}: ScheduleSlotCardProps) {
  return (
    <div className="bg-white rounded-[22px] p-4 sm:p-5 border border-[#E4E7F0] shadow-2xs hover:border-[#111318]/30 transition-all h-full flex flex-col justify-between gap-3">
      <div className="space-y-3">
        {/* Top Row: Time Range & Room Badge */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="inline-flex items-center gap-1.5 bg-[#EEF1F6] text-[#111318] text-xs font-bold px-3 py-1 rounded-full shrink-0">
            <Clock className="w-3.5 h-3.5 text-[#6E7485]" strokeWidth={2} />
            <span>
              {schedule.start_time} - {schedule.end_time} WIB
            </span>
          </div>

          <div className="inline-flex items-center gap-1 text-[11px] font-bold bg-[#A8C0FF] text-[#111318] px-2.5 py-1 rounded-full shrink-0 max-w-[160px]">
            <MapPin className="w-3 h-3 text-[#111318] shrink-0" strokeWidth={2} />
            <span className="truncate">{schedule.room}</span>
          </div>
        </div>

        {/* Middle Row: Course Name */}
        <div className="space-y-0.5">
          <span className="text-[10px] font-bold tracking-wider text-[#6E7485] uppercase">
            {schedule.course?.code}
          </span>
          <h4 className="text-sm font-bold text-[#111318] leading-tight">
            {schedule.course?.name}
          </h4>
        </div>
      </div>

      {/* Bottom Row: Lecturer Name & Publisher Controls */}
      {(schedule.lecturer_name || canManage) && (
        <div className="pt-2.5 border-t border-[#E4E7F0]/60 flex items-center justify-between gap-2 text-xs text-[#6E7485]">
          {schedule.lecturer_name ? (
            <div className="flex items-start gap-1.5 min-w-0">
              <User className="w-3.5 h-3.5 shrink-0 mt-0.5" strokeWidth={1.75} />
              <span className="text-[11px] font-medium leading-snug break-words">
                {schedule.lecturer_name}
              </span>
            </div>
          ) : (
            <span />
          )}

          {canManage && (
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={onEdit}
                className="p-1.5 rounded-lg text-[#6E7485] hover:text-[#111318] hover:bg-[#EEF1F6] transition-colors cursor-pointer"
                title="Edit Slot Jadwal"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={onDelete}
                className="p-1.5 rounded-lg text-[#6E7485] hover:text-[#F05252] hover:bg-[#F05252]/10 transition-colors cursor-pointer"
                title="Hapus Slot Jadwal"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
