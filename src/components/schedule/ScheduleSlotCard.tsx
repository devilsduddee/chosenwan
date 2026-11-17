"use client"

import React from "react"
import { Schedule } from "@/types"
import { Clock, MapPin, User } from "lucide-react"

interface ScheduleSlotCardProps {
  schedule: Schedule
}

export function ScheduleSlotCard({ schedule }: ScheduleSlotCardProps) {
  return (
    <div className="bg-white rounded-3xl p-4.5 border border-[#E4E7F0] shadow-xs hover:border-[#111318]/30 transition-all flex flex-col gap-3">
      {/* Top Row: Time Range & Room Badge */}
      <div className="flex items-center justify-between gap-2">
        <div className="inline-flex items-center gap-1.5 bg-[#EEF1F6] text-[#111318] text-xs font-bold px-3 py-1 rounded-full">
          <Clock className="w-3.5 h-3.5 text-[#6E7485]" strokeWidth={2} />
          <span>
            {schedule.start_time} - {schedule.end_time} WIB
          </span>
        </div>

        <div className="inline-flex items-center gap-1 text-[11px] font-bold bg-[#A8C0FF] text-[#111318] px-3 py-1 rounded-full">
          <MapPin className="w-3 h-3 text-[#111318]" strokeWidth={2} />
          <span>{schedule.room}</span>
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

      {/* Bottom Row: Lecturer Name */}
      {schedule.lecturer_name && (
        <div className="pt-2 border-t border-[#E4E7F0]/60 flex items-center gap-1.5 text-xs text-[#6E7485]">
          <User className="w-3.5 h-3.5" strokeWidth={1.75} />
          <span className="text-[11px] font-medium">{schedule.lecturer_name}</span>
        </div>
      )}
    </div>
  )
}
