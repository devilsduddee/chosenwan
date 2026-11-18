"use client"

import React from "react"

interface DaySelectorStripProps {
  selectedDay: number // 1 (Senin) - 6 (Sabtu)
  onSelectDay: (day: number) => void
  classCounts?: Record<number, number>
}

export function DaySelectorStrip({
  selectedDay,
  onSelectDay,
  classCounts,
}: DaySelectorStripProps) {
  const days = [
    { dayNumber: 1, label: "Sen", full: "Senin" },
    { dayNumber: 2, label: "Sel", full: "Selasa" },
    { dayNumber: 3, label: "Rab", full: "Rabu" },
    { dayNumber: 4, label: "Kam", full: "Kamis" },
    { dayNumber: 5, label: "Jum", full: "Jumat" },
    { dayNumber: 6, label: "Sab", full: "Sabtu" },
  ]

  return (
    <div className="flex items-center justify-between gap-1 bg-white p-1.5 rounded-3xl border border-[#E4E7F0] shadow-xs">
      {days.map((d) => {
        const isActive = selectedDay === d.dayNumber

        return (
          <button
            key={d.dayNumber}
            type="button"
            onClick={() => onSelectDay(d.dayNumber)}
            aria-label={`Pilih hari ${d.full}`}
            className={`flex-1 min-h-[52px] py-2 px-0.5 rounded-2xl flex flex-col items-center justify-between transition-all duration-150 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111318] active:scale-95 ${
              isActive
                ? "bg-[#111318] text-white shadow-xs font-bold"
                : "text-[#6E7485] hover:text-[#111318] hover:bg-[#EEF1F6]"
            }`}
          >
            <span
              className={`text-[9px] uppercase font-bold tracking-wider leading-none ${
                isActive ? "text-white/80" : "text-[#6E7485]"
              }`}
            >
              {d.label}
            </span>
            <span
              className={`text-xs sm:text-sm font-extrabold leading-none mt-1 ${
                isActive ? "text-white" : "text-[#111318]"
              }`}
            >
              0{d.dayNumber}
            </span>
            <span
              className={`w-1.5 h-1.5 rounded-full mt-1 transition-colors ${
                isActive
                  ? "bg-[#F6C866]"
                  : (classCounts?.[d.dayNumber] ?? 0) > 0
                  ? "bg-[#A8C0FF]"
                  : "bg-transparent"
              }`}
            />
          </button>
        )
      })}
    </div>
  )
}
