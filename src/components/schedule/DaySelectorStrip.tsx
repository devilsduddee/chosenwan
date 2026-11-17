"use client"

import React from "react"

interface DaySelectorStripProps {
  selectedDay: number // 1 (Senin) - 6 (Sabtu)
  onSelectDay: (day: number) => void
}

export function DaySelectorStrip({ selectedDay, onSelectDay }: DaySelectorStripProps) {
  const days = [
    { dayNumber: 1, label: "Sen", full: "Senin" },
    { dayNumber: 2, label: "Sel", full: "Selasa" },
    { dayNumber: 3, label: "Rab", full: "Rabu" },
    { dayNumber: 4, label: "Kam", full: "Kamis" },
    { dayNumber: 5, label: "Jum", full: "Jumat" },
    { dayNumber: 6, label: "Sab", full: "Sabtu" },
  ]

  return (
    <div className="flex items-center justify-between gap-1.5 bg-white p-1.5 rounded-2xl border border-[#E4E7F0] shadow-xs">
      {days.map((d) => {
        const isActive = selectedDay === d.dayNumber

        return (
          <button
            key={d.dayNumber}
            type="button"
            onClick={() => onSelectDay(d.dayNumber)}
            className={`flex-1 min-h-[44px] py-1.5 px-1 rounded-xl flex flex-col items-center justify-center transition-all select-none cursor-pointer ${
              isActive
                ? "bg-[#111318] text-white shadow-xs font-bold scale-[1.02]"
                : "text-[#6E7485] hover:text-[#111318] hover:bg-[#EEF1F6] font-medium"
            }`}
          >
            <span className="text-xs leading-none">{d.label}</span>
          </button>
        )
      })}
    </div>
  )
}
