"use client"

import React from "react"
import { useMockStore } from "@/lib/mock-store"
import { ActiveTab } from "@/types"
import { CheckSquare, Megaphone, Calendar, SlidersHorizontal } from "lucide-react"

export function BottomNavigationBar() {
  const { activeTab, setActiveTab, userRole } = useMockStore()

  const navItems: { id: ActiveTab; label: string; icon: React.ElementType }[] = [
    { id: "tasks", label: "Tugas", icon: CheckSquare },
    { id: "info", label: "Info", icon: Megaphone },
    { id: "schedule", label: "Jadwal", icon: Calendar },
  ]

  if (userRole !== "guest") {
    navItems.push({ id: "publisher", label: "Kelola", icon: SlidersHorizontal })
  }

  return (
    <nav
      aria-label="Navigasi Utama"
      className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[430px] z-50 pointer-events-auto"
    >
      <div className="bg-white/95 backdrop-blur-lg border border-[#E4E7F0] shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-full p-1.5 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`min-h-[44px] min-w-[44px] flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111318] ${
                isActive
                  ? "bg-[#111318] text-white shadow-sm scale-[1.02]"
                  : "text-[#6E7485] hover:text-[#111318] hover:bg-[#EEF1F6]/70 active:scale-95"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" strokeWidth={1.75} />
              <span className="leading-none">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
