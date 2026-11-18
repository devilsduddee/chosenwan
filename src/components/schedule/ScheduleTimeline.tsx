"use client"

import React, { useState } from "react"
import { useMockStore } from "@/lib/mock-store"
import { useCurrentTime } from "@/lib/use-current-time"
import { Schedule } from "@/types"
import { DaySelectorStrip } from "@/components/schedule/DaySelectorStrip"
import { ScheduleSlotCard } from "@/components/schedule/ScheduleSlotCard"
import { ScheduleEditorDialog } from "@/components/schedule/ScheduleEditorDialog"
import { DeleteConfirmDialog } from "@/components/publisher/DeleteConfirmDialog"
import { Calendar, Coffee, Plus } from "lucide-react"
import { toast } from "sonner"

export function ScheduleTimeline() {
  const { schedules, userRole, deleteSchedule } = useMockStore()
  const { currentDay } = useCurrentTime()

  // If user hasn't manually selected a day, default to currentDay
  const [userSelectedDay, setUserSelectedDay] = useState<number | null>(null)
  const selectedDay = userSelectedDay ?? currentDay

  const [isScheduleEditorOpen, setIsScheduleEditorOpen] = useState(false)
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Schedule | null>(null)

  const canManageSchedule = userRole !== "guest"

  const dayNames = ["", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]

  // Filter schedules for the selected day and sort by start_time
  const daySchedules = schedules
    .filter((s) => s.day_of_week === selectedDay)
    .sort((a, b) => a.start_time.localeCompare(b.start_time))

  const handleOpenCreate = () => {
    setEditingSchedule(null)
    setIsScheduleEditorOpen(true)
  }

  const handleOpenEdit = (slot: Schedule) => {
    setEditingSchedule(slot)
    setIsScheduleEditorOpen(true)
  }

  const handleConfirmDelete = () => {
    if (!deleteTarget) return
    deleteSchedule(deleteTarget.id)
    toast.success("Slot jadwal berhasil dihapus")
    setDeleteTarget(null)
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-[#111318] tracking-tight">
            Jadwal Kuliah
          </h2>
          <p className="text-xs text-[#6E7485] leading-relaxed">
            Jadwal tetap perkuliahan per semester. Perubahan ruangan atau jam tampil di tab Info.
          </p>
        </div>

        {canManageSchedule && (
          <button
            type="button"
            onClick={handleOpenCreate}
            className="min-h-[38px] px-3.5 rounded-full bg-[#111318] hover:bg-[#111318]/90 text-white text-xs font-bold inline-flex items-center gap-1.5 shrink-0 transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" strokeWidth={2} />
            <span>Tambah Jadwal</span>
          </button>
        )}
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-3.5">
        {daySchedules.length > 0 ? (
          daySchedules.map((slot) => (
            <ScheduleSlotCard
              key={slot.id}
              schedule={slot}
              canManage={canManageSchedule}
              onEdit={() => handleOpenEdit(slot)}
              onDelete={() => setDeleteTarget(slot)}
            />
          ))
        ) : (
          <div className="md:col-span-2 bg-white rounded-[22px] p-8 border border-[#E4E7F0] text-center space-y-2.5 shadow-2xs">
            <div className="w-12 h-12 rounded-2xl bg-[#EEF1F6] text-[#6E7485] flex items-center justify-center mx-auto">
              <Coffee className="w-6 h-6 text-[#F6C866]" strokeWidth={2} />
            </div>
            <h4 className="text-sm font-bold text-[#111318]">
              Tidak Ada Perkuliahan
            </h4>
            <p className="text-xs text-[#6E7485] max-w-xs mx-auto leading-relaxed">
              Tidak ada mata kuliah terjadwal pada hari {dayNames[selectedDay]}.
            </p>
          </div>
        )}
      </div>

      {/* Schedule Editor Sheet */}
      <ScheduleEditorDialog
        isOpen={isScheduleEditorOpen}
        onClose={() => setIsScheduleEditorOpen(false)}
        defaultDay={selectedDay}
        editingSchedule={editingSchedule}
      />

      {/* Delete Schedule Confirmation */}
      <DeleteConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        title={deleteTarget?.course?.name || "Slot Jadwal"}
        itemType="jadwal"
      />
    </div>
  )
}
