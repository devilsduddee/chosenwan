"use client"

import React from "react"
import { useMockStore } from "@/lib/mock-store"
import { useCurrentTime } from "@/lib/use-current-time"
import { CheckSquare, AlertCircle, Megaphone, Trophy, ArrowUpRight } from "lucide-react"

export function BentoSummaryGrid() {
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
    <div className="grid grid-cols-2 gap-3">
      {/* Tile 1: Total Tugas Aktif */}
      <div className="bg-[#EEF1F6] p-4 rounded-3xl border border-[#E4E7F0] flex flex-col justify-between transition-transform active:scale-[0.98] select-none">
        <div className="flex items-center justify-between">
          <div className="w-9 h-9 rounded-2xl bg-white text-[#111318] flex items-center justify-center shadow-xs">
            <CheckSquare className="w-4 h-4" strokeWidth={2} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6E7485] bg-white/70 px-2 py-0.5 rounded-full">
            Tugas
          </span>
        </div>
        <div className="mt-3">
          <p className="text-[11px] font-semibold text-[#6E7485]">Semua Tugas</p>
          <p className="text-2xl font-black text-[#111318] tracking-tight">{publishedTasks.length}</p>
        </div>
      </div>

      {/* Tile 2: Tugas Mendesak (Hari Ini) */}
      <div className="bg-[#F6C866] p-4 rounded-3xl border border-[#E4E7F0] flex flex-col justify-between transition-transform active:scale-[0.98] select-none text-[#111318]">
        <div className="flex items-center justify-between">
          <div className="w-9 h-9 rounded-2xl bg-[#111318] text-white flex items-center justify-center shadow-xs">
            <AlertCircle className="w-4 h-4 text-[#F6C866]" strokeWidth={2.2} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-[#111318] text-white px-2 py-0.5 rounded-full">
            Hari Ini
          </span>
        </div>
        <div className="mt-3">
          <p className="text-[11px] font-bold text-[#111318]/80">Mendesak</p>
          <p className="text-2xl font-black text-[#111318] tracking-tight" suppressHydrationWarning>
            {urgentTasksCount}
          </p>
        </div>
      </div>

      {/* Tile 3: Berita Kampus */}
      <button
        type="button"
        onClick={() => {
          setSelectedCategoryFilter("CAMPUS_NEWS")
          setActiveTab("info")
        }}
        className="bg-white p-4 rounded-3xl border border-[#E4E7F0] hover:border-[#111318]/30 flex flex-col justify-between text-left transition-all active:scale-[0.98] cursor-pointer group shadow-xs"
      >
        <div className="flex items-center justify-between">
          <div className="w-9 h-9 rounded-2xl bg-[#F6C866] text-[#111318] flex items-center justify-center shadow-xs">
            <Megaphone className="w-4 h-4" strokeWidth={2} />
          </div>
          <ArrowUpRight className="w-4 h-4 text-[#6E7485] group-hover:text-[#111318] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
        <div className="mt-3">
          <p className="text-[11px] font-semibold text-[#6E7485]">Berita Kampus</p>
          <p className="text-2xl font-black text-[#111318] tracking-tight">{campusNewsCount}</p>
        </div>
      </button>

      {/* Tile 4: Info Lomba */}
      <button
        type="button"
        onClick={() => {
          setSelectedCategoryFilter("COMPETITION")
          setActiveTab("info")
        }}
        className="bg-white p-4 rounded-3xl border border-[#E4E7F0] hover:border-[#111318]/30 flex flex-col justify-between text-left transition-all active:scale-[0.98] cursor-pointer group shadow-xs"
      >
        <div className="flex items-center justify-between">
          <div className="w-9 h-9 rounded-2xl bg-[#EA9DFB] text-[#111318] flex items-center justify-center shadow-xs">
            <Trophy className="w-4 h-4" strokeWidth={2} />
          </div>
          <ArrowUpRight className="w-4 h-4 text-[#6E7485] group-hover:text-[#111318] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
        <div className="mt-3">
          <p className="text-[11px] font-semibold text-[#6E7485]">Peluang Lomba</p>
          <p className="text-2xl font-black text-[#111318] tracking-tight">{competitionCount}</p>
        </div>
      </button>
    </div>
  )
}
