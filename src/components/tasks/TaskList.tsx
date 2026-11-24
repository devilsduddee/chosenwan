"use client"

import React, { useMemo, useState } from "react"
import Link from "next/link"
import { useMockStore } from "@/lib/mock-store"
import { useCurrentTime } from "@/lib/use-current-time"
import { isTaskPast, isTaskUrgent } from "@/lib/date-utils"
import { TaskStatusFilter } from "@/types"
import { BentoSummaryGrid } from "@/components/tasks/BentoSummaryGrid"
import { UrgentTaskCard } from "@/components/tasks/UrgentTaskCard"
import { TaskFilterBar } from "@/components/tasks/TaskFilterBar"
import { TaskCard } from "@/components/tasks/TaskCard"
import { TaskDetailSheet } from "@/components/tasks/TaskDetailSheet"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Lock, ArrowRight, Sparkles, Calendar, Megaphone } from "lucide-react"

export function TaskList() {
  const { tasks, searchQuery, selectedCourseFilter, userRole, isTasksGated, setActiveTab } =
    useMockStore()
  const { now, mounted } = useCurrentTime()
  const [statusFilter, setStatusFilter] = useState<TaskStatusFilter>("ALL")

  // Sorted published tasks (earliest deadline first) so urgent selection is deterministic
  const publishedSorted = useMemo(() => {
    return tasks
      .filter((t) => t.status === "PUBLISHED")
      .sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime())
  }, [tasks])

  const filtered = useMemo(() => {
    const query = searchQuery.toLowerCase()
    return publishedSorted.filter((t) => {
      const matchQuery =
        !query ||
        t.title.toLowerCase().includes(query) ||
        t.instructions.toLowerCase().includes(query) ||
        t.course?.code?.toLowerCase().includes(query) ||
        t.course?.name.toLowerCase().includes(query)

      const matchCourse =
        selectedCourseFilter === "ALL" || t.course_id === selectedCourseFilter

      if (!matchQuery || !matchCourse) return false

      if (mounted && now > 0) {
        if (statusFilter === "URGENT") return isTaskUrgent(t.due_date, now)
        if (statusFilter === "UPCOMING") return !isTaskPast(t.due_date, now)
        if (statusFilter === "PAST") return isTaskPast(t.due_date, now)
      }
      return true
    })
  }, [publishedSorted, searchQuery, selectedCourseFilter, mounted, now, statusFilter])

  // Earliest upcoming task within 24 hours
  const urgentTask = useMemo(() => {
    if (mounted && now > 0) {
      return publishedSorted.find((t) => isTaskUrgent(t.due_date, now))
    }
    return publishedSorted[0]
  }, [publishedSorted, mounted, now])

  // Gated Task View for Guests (FR-01 Privacy Guard)
  if (userRole === "guest" || isTasksGated) {
    return (
      <div className="space-y-4 py-2">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-[#111318] tracking-tight">Tugas Kelas</h2>
          <p className="text-xs text-[#6E7485] leading-relaxed">
            Daftar tugas kuliah dan link pengumpulan Google Drive.
          </p>
        </div>

        <div className="bg-white rounded-[26px] p-6 sm:p-8 border border-[#E4E7F0] shadow-[0_12px_36px_rgba(17,19,24,0.04)] text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#EEF1F6] text-[#111318] flex items-center justify-center mx-auto shadow-2xs">
            <Lock className="w-7 h-7 text-[#111318]" strokeWidth={2} />
          </div>

          <div className="space-y-1.5 max-w-sm mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A8C0FF]/25 text-[#111318] text-[11px] font-bold">
              <span>Privasi Kelas Terlindungi</span>
            </div>
            <h3 className="text-lg font-extrabold text-[#111318] tracking-tight">
              Tugas Khusus Anggota Kelas
            </h3>
            <p className="text-xs text-[#6E7485] leading-relaxed">
              Untuk menjaga kerahasiaan tugas dan tautan pengumpulan (Google Drive / LMS) kelas dari
              pihak luar, silakan masuk terlebih dahulu menggunakan akun kelas.
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-2 max-w-xs mx-auto">
            <Link href="/login" className="w-full">
              <Button className="w-full min-h-[44px] rounded-full bg-[#111318] hover:bg-[#111318]/90 text-white text-xs font-bold cursor-pointer shadow-xs active:scale-95 transition-all">
                <span>Masuk Akun Kelas</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>

            <div className="grid grid-cols-2 gap-2 w-full">
              <Button
                type="button"
                variant="outline"
                onClick={() => setActiveTab("schedule")}
                className="w-full min-h-[42px] rounded-full border-[#E4E7F0] bg-[#F6F7FB] hover:bg-[#EEF1F6] text-[11px] font-bold text-[#111318] cursor-pointer active:scale-95 transition-all px-2"
              >
                <Calendar className="w-3 h-3 mr-1 text-[#6E7485] shrink-0" />
                <span className="truncate">Jadwal Kuliah</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => setActiveTab("info")}
                className="w-full min-h-[42px] rounded-full border-[#E4E7F0] bg-[#F6F7FB] hover:bg-[#EEF1F6] text-[11px] font-bold text-[#111318] cursor-pointer active:scale-95 transition-all px-2"
              >
                <Megaphone className="w-3 h-3 mr-1 text-[#6E7485] shrink-0" />
                <span className="truncate">Info Kampus</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Page Greeting Header */}
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-[#111318] tracking-tight">Tugas Kelas</h2>
        <p className="text-xs text-[#6E7485] leading-relaxed">
          Cek deadline tugas, instruksi dosen, dan link pengumpulan.
        </p>
      </div>

      {/* Bento Summary Grid */}
      <BentoSummaryGrid currentStatusFilter={statusFilter} onSelectStatusFilter={setStatusFilter} />

      {/* Urgent Dark Anchor Card */}
      {urgentTask && statusFilter !== "PAST" && !searchQuery && selectedCourseFilter === "ALL" && (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 px-1">
            <Sparkles className="w-3.5 h-3.5 text-[#111318]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#111318]">
              Prioritas Mendesak
            </h3>
          </div>
          <UrgentTaskCard task={urgentTask} />
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="pt-1">
        <TaskFilterBar statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
      </div>

      {/* Task List Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-3.5 pt-1">
        {filtered.length > 0 ? (
          filtered.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          <div className="md:col-span-2 bg-white rounded-[22px] p-8 border border-[#E4E7F0] text-center space-y-2.5 shadow-2xs">
            <div className="w-12 h-12 rounded-2xl bg-[#EEF1F6] text-[#6E7485] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6 text-[#4CD98B]" strokeWidth={2} />
            </div>
            <h4 className="text-sm font-bold text-[#111318]">Tidak Ada Tugas Ditemukan</h4>
            <p className="text-xs text-[#6E7485] max-w-xs mx-auto leading-relaxed">
              Tidak ada tugas yang cocok dengan filter atau kata kunci ini. Coba ganti pilihan
              filter.
            </p>
          </div>
        )}
      </div>

      {/* Detail Bottom Sheet */}
      <TaskDetailSheet />
    </div>
  )
}
