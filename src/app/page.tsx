"use client"

import React from "react"
import { useMockStore } from "@/lib/mock-store"
import { TaskList } from "@/components/tasks/TaskList"
import { AnnouncementList } from "@/components/info/AnnouncementList"
import { ScheduleTimeline } from "@/components/schedule/ScheduleTimeline"
import { SlidersHorizontal, ArrowRight, Plus } from "lucide-react"

export default function HomePage() {
  const { activeTab, setActiveTab, userRole, setIsEditorOpen } = useMockStore()

  // Switch between tabs
  if (activeTab === "info") {
    return <AnnouncementList />
  }

  if (activeTab === "schedule") {
    return <ScheduleTimeline />
  }

  if (activeTab === "publisher") {
    return (
      <div className="space-y-4">
        <div className="bg-white rounded-3xl p-6 border border-[#E4E7F0] shadow-sm text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#EEF1F6] text-[#111318] flex items-center justify-center mx-auto">
            <SlidersHorizontal className="w-6 h-6" strokeWidth={2} />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#111318]">
              Dashboard Publisher
            </h3>
            <p className="text-xs text-[#6E7485] mt-1 max-w-xs mx-auto leading-relaxed">
              Mode kelola konten aktif ({userRole === "ketua_kelas" ? "Ketua Kelas" : "PJ Matkul"}). Siap untuk Phase 3 (Form editor & manajemen status draft/published).
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsEditorOpen(true)}
            className="w-full min-h-[44px] rounded-full bg-[#111318] hover:bg-[#111318]/90 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] cursor-pointer"
          >
            <Plus className="w-4 h-4" strokeWidth={2} />
            <span>Buka Form Posting</span>
          </button>
        </div>
      </div>
    )
  }

  // Default view: Tab Tugas
  return <TaskList />
}
