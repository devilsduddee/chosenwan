"use client"

import React from "react"
import { useMockStore } from "@/lib/mock-store"
import { useCurrentTime } from "@/lib/use-current-time"
import { CheckSquare, AlertCircle, Megaphone, Trophy, ArrowUpRight } from "lucide-react"

interface BentoSummaryGridProps {
  onSelectStatusFilter?: (status: "ALL" | "UPCOMING" | "PAST") => void
}

export function BentoSummaryGrid({ onSelectStatusFilter }: BentoSummaryGridProps) {
  const { tasks, announcements, setActiveTab, setSelectedCategoryFilter } = useMockStore()
  const { now, mounted } = useCurrentTime()

  // Calculate statistics from published items
  const publishedTasks = tasks.filter((t) => t.status === "PUBLISHED")
  const urgentTasksCount = mounted && now > 0
    ? publishedTasks.filter((t) => {
        const diff = new Date(t.due_date).getTime() - now
        return diff > 0 && diff < 24 * 3600 * 1000
      }).length
    : 1

  const campusNewsCount = announcements.filter(
    (a) => a.status === "PUBLISHED" && a.category_type === "CAMPUS_NEWS"
  ).length

  const competitionCount = announcements.filter(
    (a) => a.status === "PUBLISHED" && a.category_type === "COMPETITION"
  ).length

  return (
    <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
      {/* Tile 1: Total Tugas Aktif */}
      <button
        type="button"
        onClick={() => onSelectStatusFilter?.("ALL")}
        className="bg-[#EEF1F6] p-3.5 rounded-3xl border border-[#E4E7F0] hover:border-[#111318]/20 flex flex-col justify-between text-left transition-all active:scale-[0.98] cursor-pointer group min-h-[106px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111318]"
      >
        <div className="flex items-center justify-between gap-1">
          <div className="w-8 h-8 rounded-xl bg-white text-[#111318] flex items-center justify-center shadow-xs shrink-0">
            <CheckSquare className="w-4 h-4" strokeWidth={2} />
          </div>
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#6E7485] bg-white/80 px-2 py-0.5 rounded-full shrink-0">
            Semua
          </span>
        </div>
        <div className="mt-2.5">
          <p className="text-[11px] font-semibold text-[#6E7485] truncate">Semua Tugas</p>
          <p className="text-2xl sm:text-[28px] font-extrabold text-[#111318] tracking-tight leading-none mt-0.5 tabular-nums">
            {publishedTasks.length}
          </p>
        </div>
      </button>

      {/* Tile 2: Tugas Mendesak (Hari Ini) */}
      <button
        type="button"
        onClick={() => onSelectStatusFilter?.("UPCOMING")}
        className="bg-[#F6C866] p-3.5 rounded-3xl border border-[#F6C866]/60 hover:border-[#111318]/30 flex flex-col justify-between text-left transition-all active:scale-[0.98] cursor-pointer group min-h-[106px] text-[#111318] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111318]"
      >
        <div className="flex items-center justify-between gap-1">
          <div className="w-8 h-8 rounded-xl bg-[#111318] text-white flex items-center justify-center shadow-xs shrink-0">
            <AlertCircle className="w-4 h-4 text-[#F6C866]" strokeWidth={2.2} />
          </div>
          <span className="text-[9px] font-bold uppercase tracking-wider bg-[#111318] text-white px-2 py-0.5 rounded-full shrink-0">
            Hari Ini
          </span>
        </div>
        <div className="mt-2.5">
          <p className="text-[11px] font-bold text-[#111318]/90 truncate">Mendesak</p>
          <p
            className="text-2xl sm:text-[28px] font-extrabold text-[#111318] tracking-tight leading-none mt-0.5 tabular-nums"
            suppressHydrationWarning
          >
            {urgentTasksCount}
          </p>
        </div>
      </button>

      {/* Tile 3: Berita Kampus */}
      <button
        type="button"
        onClick={() => {
          setSelectedCategoryFilter("CAMPUS_NEWS")
          setActiveTab("info")
        }}
        className="bg-[#A8C0FF] p-3.5 rounded-3xl border border-[#A8C0FF]/60 hover:border-[#111318]/30 flex flex-col justify-between text-left transition-all active:scale-[0.98] cursor-pointer group min-h-[106px] text-[#111318] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111318]"
      >
        <div className="flex items-center justify-between gap-1">
          <div className="w-8 h-8 rounded-xl bg-white text-[#111318] flex items-center justify-center shadow-xs shrink-0">
            <Megaphone className="w-4 h-4" strokeWidth={2} />
          </div>
          <ArrowUpRight className="w-4 h-4 text-[#111318]/70 group-hover:text-[#111318] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
        </div>
        <div className="mt-2.5">
          <p className="text-[11px] font-bold text-[#111318]/85 truncate">Berita Kampus</p>
          <p className="text-2xl sm:text-[28px] font-extrabold text-[#111318] tracking-tight leading-none mt-0.5 tabular-nums">
            {campusNewsCount}
          </p>
        </div>
      </button>

      {/* Tile 4: Info Lomba */}
      <button
        type="button"
        onClick={() => {
          setSelectedCategoryFilter("COMPETITION")
          setActiveTab("info")
        }}
        className="bg-[#EA9DFB] p-3.5 rounded-3xl border border-[#EA9DFB]/60 hover:border-[#111318]/30 flex flex-col justify-between text-left transition-all active:scale-[0.98] cursor-pointer group min-h-[106px] text-[#111318] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111318]"
      >
        <div className="flex items-center justify-between gap-1">
          <div className="w-8 h-8 rounded-xl bg-white text-[#111318] flex items-center justify-center shadow-xs shrink-0">
            <Trophy className="w-4 h-4" strokeWidth={2} />
          </div>
          <ArrowUpRight className="w-4 h-4 text-[#111318]/70 group-hover:text-[#111318] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
        </div>
        <div className="mt-2.5">
          <p className="text-[11px] font-bold text-[#111318]/85 truncate">Peluang Lomba</p>
          <p className="text-2xl sm:text-[28px] font-extrabold text-[#111318] tracking-tight leading-none mt-0.5 tabular-nums">
            {competitionCount}
          </p>
        </div>
      </button>
    </div>
  )
}
