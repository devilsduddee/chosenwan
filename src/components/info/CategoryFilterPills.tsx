"use client"

import React from "react"
import { useMockStore } from "@/lib/mock-store"
import { Sparkles, BookOpen, Megaphone, Trophy } from "lucide-react"

export function CategoryFilterPills() {
  const { selectedCategoryFilter, setSelectedCategoryFilter } = useMockStore()

  const categories = [
    { id: "ALL", label: "Semua Info", icon: Sparkles },
    { id: "ACADEMIC", label: "Akademik & Dosen", icon: BookOpen },
    { id: "CAMPUS_NEWS", label: "Berita Kampus", icon: Megaphone },
    { id: "COMPETITION", label: "Info Lomba", icon: Trophy },
  ]

  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
      {categories.map((cat) => {
        const Icon = cat.icon
        const isActive = selectedCategoryFilter === cat.id

        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategoryFilter(cat.id)}
            className={`min-h-[38px] px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-all select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111318] ${
              isActive
                ? "bg-[#111318] text-white shadow-xs font-bold"
                : "bg-white text-[#6E7485] border border-[#E4E7F0] hover:text-[#111318] hover:border-[#111318]/30 active:scale-95"
            }`}
          >
            <Icon className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} />
            <span>{cat.label}</span>
          </button>
        )
      })}
    </div>
  )
}
