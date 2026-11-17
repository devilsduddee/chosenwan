"use client"

import React, { useState } from "react"
import { useMockStore } from "@/lib/mock-store"
import { useCurrentTime } from "@/lib/use-current-time"
import { BentoSummaryGrid } from "@/components/tasks/BentoSummaryGrid"
import { UrgentTaskCard } from "@/components/tasks/UrgentTaskCard"
import { TaskFilterBar } from "@/components/tasks/TaskFilterBar"
import { TaskCard } from "@/components/tasks/TaskCard"
import { TaskDetailSheet } from "@/components/tasks/TaskDetailSheet"
import { CheckCircle2, Sparkles } from "lucide-react"

export function TaskList() {
  const { tasks, searchQuery, selectedCourseFilter } = useMockStore()
  const { now, mounted } = useCurrentTime()
  const [statusFilter, setStatusFilter] = useState<"ALL" | "UPCOMING" | "PAST">("ALL")

  // Only show published tasks for public view
  const publishedTasks = tasks.filter((t) => t.status === "PUBLISHED")

  // Filter by search query
  let filtered = publishedTasks.filter((t) => {
    const matchQuery =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.instructions.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.course?.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.course?.name.toLowerCase().includes(searchQuery.toLowerCase())

    const matchCourse =
      selectedCourseFilter === "ALL" || t.course_id === selectedCourseFilter

    return matchQuery && matchCourse
  })

  // Filter by status (Upcoming vs Past) when mounted
  if (mounted && now > 0) {
    if (statusFilter === "UPCOMING") {
      filtered = filtered.filter((t) => new Date(t.due_date).getTime() >= now)
    } else if (statusFilter === "PAST") {
      filtered = filtered.filter((t) => new Date(t.due_date).getTime() < now)
    }
  }

  // Sort: upcoming tasks earliest due first
  filtered.sort((a, b) => {
    return new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
  })

  // Urgent Task Anchor (first upcoming task with due date within 24 hours)
  const urgentTask = mounted && now > 0
    ? publishedTasks.find((t) => {
        const diff = new Date(t.due_date).getTime() - now
        return diff > 0 && diff <= 24 * 3600 * 1000
      })
    : publishedTasks[0]

  return (
    <div className="space-y-4">
      {/* Page Greeting Header */}
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-[#111318] tracking-tight">
          Tugas Kelas
        </h2>
        <p className="text-xs text-[#6E7485] leading-relaxed">
          Pantau batas waktu tugas kuliah, rincian instruksi, dan link pengumpulan.
        </p>
      </div>

      {/* 2x2 Bento Summary Grid */}
      <BentoSummaryGrid onSelectStatusFilter={setStatusFilter} />

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
      <div className="space-y-2.5 pt-1">
        {filtered.length > 0 ? (
          filtered.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          <div className="bg-white rounded-3xl p-8 border border-[#E4E7F0] text-center space-y-2.5 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#EEF1F6] text-[#6E7485] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6 text-[#4CD98B]" strokeWidth={2} />
            </div>
            <h4 className="text-sm font-bold text-[#111318]">
              Tidak Ada Tugas Ditemukan
            </h4>
            <p className="text-xs text-[#6E7485] max-w-xs mx-auto leading-relaxed">
              Tidak ada tugas yang cocok dengan filter yang dipilih. Santai sejenak atau ubah kata kunci pencarian.
            </p>
          </div>
        )}
      </div>

      {/* Detail Bottom Sheet */}
      <TaskDetailSheet />
    </div>
  )
}
