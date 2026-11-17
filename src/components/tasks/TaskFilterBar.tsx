"use client"

import React from "react"
import { useMockStore } from "@/lib/mock-store"
import { Search, X } from "lucide-react"

interface TaskFilterBarProps {
  statusFilter: "ALL" | "UPCOMING" | "PAST"
  setStatusFilter: (filter: "ALL" | "UPCOMING" | "PAST") => void
}

export function TaskFilterBar({ statusFilter, setStatusFilter }: TaskFilterBarProps) {
  const {
    courses,
    searchQuery,
    setSearchQuery,
    selectedCourseFilter,
    setSelectedCourseFilter,
  } = useMockStore()

  return (
    <div className="space-y-3">
      {/* Search Input & Course Selector */}
      <div className="flex items-center gap-2">
        {/* Search Field */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#6E7485] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul atau mata kuliah..."
            className="w-full h-11 pl-10 pr-9 rounded-2xl bg-white border border-[#E4E7F0] text-xs text-[#111318] placeholder:text-[#6E7485] focus:outline-none focus:border-[#111318] transition-colors shadow-xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6E7485] hover:text-[#111318] p-1"
              aria-label="Hapus pencarian"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Course Filter Dropdown */}
        <div className="shrink-0">
          <select
            value={selectedCourseFilter}
            onChange={(e) => setSelectedCourseFilter(e.target.value)}
            aria-label="Filter berdasarkan mata kuliah"
            className="h-11 px-3.5 rounded-2xl bg-[#EEF1F6] border border-[#E4E7F0] text-xs font-bold text-[#111318] focus:outline-none focus:border-[#111318] transition-colors cursor-pointer shadow-xs"
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

      {/* Quick Status Pills: Semua | Mendatang | Tenggat Lewat */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
        <button
          type="button"
          onClick={() => setStatusFilter("ALL")}
          className={`min-h-[38px] px-4 py-2 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer ${
            statusFilter === "ALL"
              ? "bg-[#111318] text-white shadow-xs font-bold"
              : "bg-white text-[#6E7485] border border-[#E4E7F0] hover:text-[#111318] hover:bg-[#EEF1F6] active:scale-95"
          }`}
        >
          Semua
        </button>
        <button
          type="button"
          onClick={() => setStatusFilter("UPCOMING")}
          className={`min-h-[38px] px-4 py-2 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer ${
            statusFilter === "UPCOMING"
              ? "bg-[#111318] text-white shadow-xs font-bold"
              : "bg-white text-[#6E7485] border border-[#E4E7F0] hover:text-[#111318] hover:bg-[#EEF1F6] active:scale-95"
          }`}
        >
          Aktif & Mendatang
        </button>
        <button
          type="button"
          onClick={() => setStatusFilter("PAST")}
          className={`min-h-[38px] px-4 py-2 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer ${
            statusFilter === "PAST"
              ? "bg-[#111318] text-white shadow-xs font-bold"
              : "bg-white text-[#6E7485] border border-[#E4E7F0] hover:text-[#111318] hover:bg-[#EEF1F6] active:scale-95"
          }`}
        >
          Tenggat Terlewat
        </button>
      </div>
    </div>
  )
}
