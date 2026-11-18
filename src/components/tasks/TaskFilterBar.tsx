"use client"

import React from "react"
import { useMockStore } from "@/lib/mock-store"
import { TaskStatusFilter } from "@/types"
import { Search, X } from "lucide-react"

interface TaskFilterBarProps {
  statusFilter: TaskStatusFilter
  setStatusFilter: (filter: TaskStatusFilter) => void
}

const STATUS_PILLS: { id: TaskStatusFilter; label: string }[] = [
  { id: "ALL", label: "Semua" },
  { id: "URGENT", label: "Mendesak" },
  { id: "UPCOMING", label: "Aktif & Mendatang" },
  { id: "PAST", label: "Tenggat Terlewat" },
]

export function TaskFilterBar({ statusFilter, setStatusFilter }: TaskFilterBarProps) {
  const {
    courses,
    searchQuery,
    setSearchQuery,
    selectedCourseFilter,
    setSelectedCourseFilter,
  } = useMockStore()

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2.5 sm:gap-3">
      {/* Search Input & Course Selector */}
      <div className="flex items-center gap-2 md:flex-1 md:max-w-md">
        <div className="relative flex-1 min-w-0">
          <Search className="w-4 h-4 text-[#6E7485] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            enterKeyHint="search"
            autoComplete="off"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari tugas atau MK..."
            className="w-full h-11 pl-10 pr-8 rounded-[14px] bg-white border border-[#E4E7F0] text-sm sm:text-xs text-[#111318] placeholder:text-[#6E7485] focus:outline-none focus:border-[#111318] transition-colors shadow-2xs [&::-webkit-search-cancel-button]:hidden"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6E7485] hover:text-[#111318] p-1"
              aria-label="Hapus pencarian"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="shrink-0">
          <select
            value={selectedCourseFilter}
            onChange={(e) => setSelectedCourseFilter(e.target.value)}
            aria-label="Filter berdasarkan mata kuliah"
            className="h-11 px-3 rounded-[14px] bg-[#EEF1F6] border border-[#E4E7F0] text-xs font-bold text-[#111318] focus:outline-none focus:border-[#111318] transition-colors cursor-pointer shadow-2xs"
          >
            <option value="ALL">Semua MK</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.code}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Quick Status Pills */}
      <div className="flex items-center gap-2 overflow-x-auto overscroll-x-contain no-scrollbar py-0.5 md:shrink-0">
        {STATUS_PILLS.map((pill) => (
          <button
            key={pill.id}
            type="button"
            onClick={() => setStatusFilter(pill.id)}
            className={`min-h-[38px] px-4 py-2 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer ${
              statusFilter === pill.id
                ? "bg-[#111318] text-white shadow-xs font-bold"
                : "bg-white text-[#6E7485] border border-[#E4E7F0] hover:text-[#111318] hover:bg-[#EEF1F6] active:scale-95"
            }`}
          >
            {pill.label}
          </button>
        ))}
      </div>
    </div>
  )
}
