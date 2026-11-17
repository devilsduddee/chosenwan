"use client"

import React from "react"
import { Task } from "@/types"
import { useMockStore } from "@/lib/mock-store"
import { useCurrentTime } from "@/lib/use-current-time"
import { formatIndonesianDate, formatIndonesianTime } from "@/lib/date-utils"
import { Calendar, Link2, ChevronRight } from "lucide-react"

interface TaskCardProps {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  const { setSelectedTaskForDetail } = useMockStore()
  const { now, mounted } = useCurrentTime()

  const dueDate = new Date(task.due_date)
  const isPast = mounted && now > 0 ? dueDate.getTime() < now : false
  const diffHours = mounted && now > 0 ? Math.round((dueDate.getTime() - now) / (1000 * 3600)) : 48
  const isUrgent = !isPast && diffHours <= 24

  // Status Badge Logic
  let statusBadge = (
    <span className="text-[10px] font-bold bg-[#4CD98B] text-[#111318] px-2 py-0.5 rounded-full">
      Aman
    </span>
  )

  if (isPast) {
    statusBadge = (
      <span className="text-[10px] font-semibold bg-[#EEF1F6] text-[#6E7485] px-2 py-0.5 rounded-full">
        Tenggat Lewat
      </span>
    )
  } else if (isUrgent) {
    statusBadge = (
      <span className="text-[10px] font-bold bg-[#F05252] text-white px-2 py-0.5 rounded-full shadow-xs">
        Mendesak
      </span>
    )
  }

  // Format date: "Kam, 20 Nov • 23:59"
  const formattedDate = formatIndonesianDate(dueDate, {
    showDayName: true,
    shortDayName: true,
    shortMonth: true,
  })
  const formattedTime = formatIndonesianTime(dueDate)

  return (
    <div
      onClick={() => setSelectedTaskForDetail(task)}
      className="bg-white rounded-2xl p-4 border border-[#E4E7F0] shadow-xs hover:border-[#111318]/40 transition-all cursor-pointer active:scale-[0.99] group"
    >
      {/* Top Header Row */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-bold bg-[#A8C0FF] text-[#111318] px-2 py-0.5 rounded-full">
            {task.course?.code || "MK"}
          </span>
          {task.week_number && (
            <span className="text-[11px] font-medium text-[#6E7485]">
              Mgg {task.week_number}
            </span>
          )}
        </div>
        {statusBadge}
      </div>

      {/* Task Title */}
      <h4 className="text-sm font-bold text-[#111318] leading-snug line-clamp-2">
        {task.title}
      </h4>

      {/* Instructions snippet */}
      <p className="text-xs text-[#6E7485] mt-1 line-clamp-2 leading-relaxed">
        {task.instructions}
      </p>

      {/* Card Footer: Deadline & Link Indicator */}
      <div className="mt-3 pt-2.5 border-t border-[#E4E7F0]/70 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-[#6E7485]">
          <Calendar className="w-3.5 h-3.5" strokeWidth={1.75} />
          <span className="font-medium text-[11px]" suppressHydrationWarning>
            {formattedDate} • {formattedTime} WIB
          </span>
        </div>

        <div className="flex items-center gap-1 text-[#6E7485] group-hover:text-[#111318] transition-colors">
          {task.submission_url && (
            <span className="inline-flex items-center gap-0.5 text-[10px] bg-[#EEF1F6] text-[#111318] px-1.5 py-0.5 rounded-md font-medium">
              <Link2 className="w-2.5 h-2.5" /> Ada Link
            </span>
          )}
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </div>
  )
}
