"use client"

import React from "react"
import { Task } from "@/types"
import { useMockStore } from "@/lib/mock-store"
import { useCurrentTime } from "@/lib/use-current-time"
import { formatIndonesianTime } from "@/lib/date-utils"
import { Clock, ArrowRight } from "lucide-react"

interface UrgentTaskCardProps {
  task: Task
}

export function UrgentTaskCard({ task }: UrgentTaskCardProps) {
  const { setSelectedTaskForDetail } = useMockStore()
  const { now, mounted } = useCurrentTime()

  // Calculate remaining hours
  const dueDate = new Date(task.due_date)
  const currentTime = mounted && now > 0 ? now : dueDate.getTime() - 5 * 3600 * 1000
  const diffHours = Math.round((dueDate.getTime() - currentTime) / (1000 * 3600))

  const countdownText =
    diffHours <= 0
      ? "Hari Ini"
      : diffHours === 1
      ? "1 Jam Lagi"
      : `~${diffHours} Jam Lagi`

  return (
    <button
      type="button"
      onClick={() => setSelectedTaskForDetail(task)}
      className="w-full text-left bg-[#111318] text-white rounded-3xl p-4.5 sm:p-5 border border-[#111318] shadow-md relative overflow-hidden transition-all active:scale-[0.98] cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6C866] focus-visible:ring-offset-2"
    >
      {/* Top Header Row */}
      <div className="flex items-center justify-between gap-2 flex-wrap mb-2.5">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[11px] font-bold bg-[#A8C0FF] text-[#111318] px-2.5 py-0.5 rounded-full shrink-0">
            {task.course?.code || "TUGAS"}
          </span>
          {task.week_number && (
            <span className="text-[11px] font-medium text-white/70">
              Minggu {task.week_number}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 bg-[#F05252] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs shrink-0">
          <Clock className="w-3 h-3 animate-pulse shrink-0" strokeWidth={2.5} />
          <span suppressHydrationWarning>{countdownText}</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-base font-bold text-white leading-snug line-clamp-2 group-hover:text-[#F6C866] transition-colors">
        {task.title}
      </h3>

      {/* Short Instructions preview */}
      <p className="text-xs text-white/70 mt-1.5 line-clamp-2 leading-relaxed">
        {task.instructions}
      </p>

      {/* Card Footer */}
      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
        <div className="text-[11px] text-white/60">
          <span>Tenggat: </span>
          <span className="text-white font-medium" suppressHydrationWarning>
            {formatIndonesianTime(dueDate)} WIB
          </span>
        </div>

        <div className="inline-flex items-center gap-1 text-xs font-semibold text-[#F6C866] group-hover:translate-x-0.5 transition-transform">
          <span>Buka Detail</span>
          <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
        </div>
      </div>
    </button>
  )
}
