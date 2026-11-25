"use client"

import React from "react"
import { usePortalStore } from "@/lib/portal-store"
import { ActiveTab } from "@/types"
import { CheckSquare, Megaphone, Calendar, SlidersHorizontal } from "lucide-react"

export function BottomNavigationBar() {
  const { activeTab, setActiveTab, userRole } = usePortalStore()

  const navItems: { id: ActiveTab; label: string; icon: React.ElementType }[] = [
    { id: "tasks", label: "Tugas", icon: CheckSquare },
    { id: "info", label: "Info", icon: Megaphone },
    { id: "schedule", label: "Jadwal", icon: Calendar },
  ]

  if (userRole === "ketua_kelas" || userRole === "pj") {
    navItems.push({ id: "publisher", label: "Kelola", icon: SlidersHorizontal })
  }

  return (
    <nav
      aria-label="Navigasi Utama"
      className="md:hidden fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] left-1/2 -translate-x-1/2 w-[calc(100%-1.5rem)] max-w-[430px] z-50 pointer-events-auto"
    >
      <div className="bg-white/95 backdrop-blur-lg border border-[#E4E7F0] shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-full p-1 flex items-center justify-between gap-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`flex-1 min-w-0 min-h-[44px] h-[44px] flex items-center justify-center gap-1 sm:gap-1.5 px-2 py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-[background-color,color,transform] duration-150 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111318] ${
                isActive
                  ? "bg-[#111318] text-white shadow-xs"
                  : "text-[#6E7485] hover:text-[#111318] hover:bg-[#EEF1F6]/80 active:scale-95"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" strokeWidth={1.75} />
              <span className="leading-none truncate">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
