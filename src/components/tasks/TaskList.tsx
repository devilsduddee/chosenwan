"use client"

import React, { useMemo, useState } from "react"
import { useMockStore } from "@/lib/mock-store"
import { useCurrentTime } from "@/lib/use-current-time"
import { isTaskPast, isTaskUrgent } from "@/lib/date-utils"
import { TaskStatusFilter } from "@/types"
import { BentoSummaryGrid } from "@/components/tasks/BentoSummaryGrid"
import { UrgentTaskCard } from "@/components/tasks/UrgentTaskCard"
import { TaskFilterBar } from "@/components/tasks/TaskFilterBar"
import { TaskCard } from "@/components/tasks/TaskCard"
import { TaskDetailSheet } from "@/components/tasks/TaskDetailSheet"
import { CheckCircle2, Sparkles } from "lucide-react"

export function TaskList() {
  const { tasks, searchQuery, selectedCourseFilter } = useMockStore()
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
        t.course?.code.toLowerCase().includes(query) ||
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

  return (
    <div className="space-y-4">
      {/* Page Greeting Header */}
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-[#111318] tracking-tight">
          Tugas Kelas
        </h2>
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
            <h4 className="text-sm font-bold text-[#111318]">
              Tidak Ada Tugas Ditemukan
            </h4>
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
