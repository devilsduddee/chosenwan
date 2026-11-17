"use client"

import React, { useState } from "react"
import { useMockStore } from "@/lib/mock-store"
import { useCurrentTime } from "@/lib/use-current-time"
import { DaySelectorStrip } from "@/components/schedule/DaySelectorStrip"
import { ScheduleSlotCard } from "@/components/schedule/ScheduleSlotCard"
import { Calendar, Coffee } from "lucide-react"

export function ScheduleTimeline() {
  const { schedules } = useMockStore()
  const { currentDay } = useCurrentTime()

  // If user hasn't manually selected a day, default to currentDay
  const [userSelectedDay, setUserSelectedDay] = useState<number | null>(null)
  const selectedDay = userSelectedDay ?? currentDay

  const dayNames = ["", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]

  // Filter schedules for the selected day and sort by start_time
  const daySchedules = schedules
    .filter((s) => s.day_of_week === selectedDay)
    .sort((a, b) => a.start_time.localeCompare(b.start_time))

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-lg font-extrabold text-[#111318] tracking-tight">
          Jadwal Kuliah Statis
        </h2>
        <p className="text-xs text-[#6E7485] leading-relaxed">
          Jadwal tetap perkuliahan per semester. Perubahan ruangan/jam insidental tampil di tab Info.
        </p>
      </div>

      {/* Horizontal Day Selector */}
      <DaySelectorStrip selectedDay={selectedDay} onSelectDay={setUserSelectedDay} />

      {/* Active Day Title & Count */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-bold text-[#111318] flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          Hari {dayNames[selectedDay]}
        </span>
        <span className="text-[11px] text-[#6E7485] font-medium">
          {daySchedules.length} Kelas Terjadwal
        </span>
      </div>

      {/* Schedule Cards */}
      <div className="space-y-3">
        {daySchedules.length > 0 ? (
          daySchedules.map((slot) => (
            <ScheduleSlotCard key={slot.id} schedule={slot} />
          ))
        ) : (
          <div className="bg-white rounded-3xl p-8 border border-[#E4E7F0] text-center space-y-2.5 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#EEF1F6] text-[#6E7485] flex items-center justify-center mx-auto">
              <Coffee className="w-6 h-6 text-[#F6C866]" strokeWidth={2} />
            </div>
            <h4 className="text-sm font-bold text-[#111318]">
              Tidak Ada Perkuliahan
            </h4>
            <p className="text-xs text-[#6E7485] max-w-xs mx-auto leading-relaxed">
              Hari {dayNames[selectedDay]} tidak memiliki kelas terjadwal. Waktunya mengerjakan tugas atau istirahat!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
