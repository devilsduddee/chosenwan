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
    <div className="space-y-2.5">
      {/* Search Input & Course Selector */}
      <div className="flex items-center gap-2">
        {/* Search Field */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#6E7485] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul tugas..."
            className="w-full h-10 pl-9 pr-8 rounded-2xl bg-white border border-[#E4E7F0] text-xs text-[#111318] placeholder:text-[#6E7485] focus:outline-none focus:border-[#111318] transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6E7485] hover:text-[#111318]"
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
            className="h-10 px-3 rounded-2xl bg-white border border-[#E4E7F0] text-xs font-semibold text-[#111318] focus:outline-none focus:border-[#111318] transition-colors cursor-pointer"
          >
            <option value="ALL">Semua Matkul</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.code}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Quick Status Pills: Semua | Mendatang | Tenggat Lewat */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        <button
          type="button"
          onClick={() => setStatusFilter("ALL")}
          className={`h-7 px-3 rounded-full text-[11px] font-semibold transition-all shrink-0 cursor-pointer ${
            statusFilter === "ALL"
              ? "bg-[#111318] text-white shadow-xs"
              : "bg-white text-[#6E7485] border border-[#E4E7F0] hover:text-[#111318]"
          }`}
        >
          Semua
        </button>
        <button
          type="button"
          onClick={() => setStatusFilter("UPCOMING")}
          className={`h-7 px-3 rounded-full text-[11px] font-semibold transition-all shrink-0 cursor-pointer ${
            statusFilter === "UPCOMING"
              ? "bg-[#111318] text-white shadow-xs"
              : "bg-white text-[#6E7485] border border-[#E4E7F0] hover:text-[#111318]"
          }`}
        >
          Aktif & Mendatang
        </button>
        <button
          type="button"
          onClick={() => setStatusFilter("PAST")}
          className={`h-7 px-3 rounded-full text-[11px] font-semibold transition-all shrink-0 cursor-pointer ${
            statusFilter === "PAST"
              ? "bg-[#111318] text-white shadow-xs"
              : "bg-white text-[#6E7485] border border-[#E4E7F0] hover:text-[#111318]"
          }`}
        >
          Tenggat Terlewat
        </button>
      </div>
    </div>
  )
}
