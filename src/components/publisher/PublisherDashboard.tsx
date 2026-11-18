"use client"

import React, { useState } from "react"
import { useMockStore } from "@/lib/mock-store"
import { Task, Announcement } from "@/types"
import { PublisherContentItem } from "@/components/publisher/PublisherContentItem"
import { DeleteConfirmDialog } from "@/components/publisher/DeleteConfirmDialog"
import { Plus, Inbox, RotateCcw, LogOut } from "lucide-react"
import { toast } from "sonner"

export function PublisherDashboard() {
  const {
    tasks,
    announcements,
    currentUser,
    userRole,
    canManageContent,
    logoutPublisher,
    setIsEditorOpen,
    setEditingContent,
    deleteTask,
    deleteAnnouncement,
    resetToDefaults,
  } = useMockStore()

  const [activeSegment, setActiveSegment] = useState<"PUBLISHED" | "DRAFT">("PUBLISHED")
  const [typeFilter, setTypeFilter] = useState<"ALL" | "TASK" | "ANNOUNCEMENT">("ALL")

  // Delete Dialog state
  const [deleteTarget, setDeleteTarget] = useState<{
    type: "task" | "announcement"
    item: Task | Announcement
  } | null>(null)

  // Filter tasks & announcements by status (PUBLISHED vs DRAFT)
  const filteredTasks = tasks.filter((t) => t.status === activeSegment)
  const filteredAnnouncements = announcements.filter((a) => a.status === activeSegment)

  // Combine items for display
  type CombinedItem = {
    type: "task" | "announcement"
    item: Task | Announcement
    created_at: string
  }

  const combinedItems: CombinedItem[] = []

  if (typeFilter === "ALL" || typeFilter === "TASK") {
    filteredTasks.forEach((t) => combinedItems.push({ type: "task", item: t, created_at: t.created_at }))
  }

  if (typeFilter === "ALL" || typeFilter === "ANNOUNCEMENT") {
    filteredAnnouncements.forEach((a) =>
      combinedItems.push({ type: "announcement", item: a, created_at: a.created_at })
    )
  }

  combinedItems.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  // Stats
  const totalPublished =
    tasks.filter((t) => t.status === "PUBLISHED").length +
    announcements.filter((a) => a.status === "PUBLISHED").length
  const totalDrafts =
    tasks.filter((t) => t.status === "DRAFT").length +
    announcements.filter((a) => a.status === "DRAFT").length

  const handleEdit = (type: "task" | "announcement", item: Task | Announcement) => {
    setEditingContent({ type, data: item })
    setIsEditorOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return
    if (deleteTarget.type === "task") {
      deleteTask(deleteTarget.item.id)
      toast.success("Tugas berhasil dihapus")
    } else {
      deleteAnnouncement(deleteTarget.item.id)
      toast.success("Pengumuman berhasil dihapus")
    }
    setDeleteTarget(null)
  }

  return (
    <div className="space-y-4">
      {/* Page Greeting Header */}
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-[#111318] tracking-tight">
          Kelola Konten
        </h2>
        <p className="text-xs text-[#6E7485] leading-relaxed">
          Buat tugas atau pengumuman baru, simpan sebagai draft, atau langsung terbitkan.
        </p>
      </div>

      {/* Overview Card */}
      <div className="bg-white rounded-[22px] p-5 border border-[#E4E7F0] shadow-2xs space-y-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6E7485]">
              Ruang Publisher
            </span>
            <h2 className="text-base font-extrabold text-[#111318]">
              {currentUser.full_name}
            </h2>
            <p className="text-[11px] text-[#6E7485] mt-0.5">
              {userRole === "ketua_kelas"
                ? "Ketua Kelas · Bisa kelola semua postingan dan jadwal"
                : "PJ Matkul · Kelola postingan sendiri dan jadwal"}
            </p>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => {
                resetToDefaults()
                toast.info("Data dikembalikan ke sampel default")
              }}
              className="p-2 rounded-xl text-[#6E7485] hover:text-[#111318] hover:bg-[#EEF1F6] transition-colors cursor-pointer"
              title="Reset Data Sampel"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                logoutPublisher()
                toast.info("Berhasil keluar dari sesi publisher")
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-bold text-[#6E7485] hover:text-[#F05252] hover:bg-[#F05252]/10 transition-colors cursor-pointer"
              title="Keluar Sesi"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-3">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-2.5 flex-1">
            <div className="bg-[#EEF1F6] p-3.5 rounded-2xl">
              <span className="text-[10px] font-semibold text-[#6E7485]">Sudah Terbit</span>
              <p className="text-xl font-black text-[#111318] tabular-nums">{totalPublished}</p>
            </div>
            <div className="bg-[#F6C866]/35 p-3.5 rounded-2xl">
              <span className="text-[10px] font-semibold text-[#111318]/80">Draft</span>
              <p className="text-xl font-black text-[#111318] tabular-nums">{totalDrafts}</p>
            </div>
          </div>

          {/* Primary Action Button */}
          <button
            type="button"
            onClick={() => {
              setEditingContent(null)
              setIsEditorOpen(true)
            }}
            className="w-full md:w-auto md:px-6 min-h-[44px] rounded-full bg-[#111318] hover:bg-[#111318]/90 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" strokeWidth={2} />
            <span>Buat Konten Baru</span>
          </button>
        </div>
      </div>

      {/* Controls Toolbar: Segmented Control + Type Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2.5">
        {/* Segmented Control: Published vs Draft */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-white rounded-2xl border border-[#E4E7F0] shadow-2xs md:w-72">
          <button
            type="button"
            onClick={() => setActiveSegment("PUBLISHED")}
            className={`min-h-[38px] rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSegment === "PUBLISHED"
                ? "bg-[#111318] text-white shadow-2xs"
                : "text-[#6E7485] hover:text-[#111318]"
            }`}
          >
            Tayang ({totalPublished})
          </button>
          <button
            type="button"
            onClick={() => setActiveSegment("DRAFT")}
            className={`min-h-[38px] rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSegment === "DRAFT"
                ? "bg-[#111318] text-white shadow-2xs"
                : "text-[#6E7485] hover:text-[#111318]"
            }`}
          >
            Draft ({totalDrafts})
          </button>
        </div>

        {/* Type Filter Pills */}
        <div className="flex items-center gap-1.5">
          {(["ALL", "TASK", "ANNOUNCEMENT"] as const).map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setTypeFilter(filter)}
              className={`min-h-[34px] px-3.5 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                typeFilter === filter
                  ? "bg-[#111318] text-white"
                  : "bg-white text-[#6E7485] border border-[#E4E7F0] hover:text-[#111318]"
              }`}
            >
              {filter === "ALL" ? "Semua Tipe" : filter === "TASK" ? "Tugas Saja" : "Info Saja"}
            </button>
          ))}
        </div>
      </div>

      {/* Items List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-3.5">
        {combinedItems.length > 0 ? (
          combinedItems.map((ci) => (
            <PublisherContentItem
              key={ci.item.id}
              type={ci.type}
              item={ci.item}
              canManage={canManageContent(ci.item.created_by)}
              onEdit={() => handleEdit(ci.type, ci.item)}
              onDelete={() => setDeleteTarget(ci)}
            />
          ))
        ) : (
          <div className="md:col-span-2 bg-white rounded-[22px] p-8 border border-[#E4E7F0] text-center space-y-2.5 shadow-2xs">
            <div className="w-12 h-12 rounded-2xl bg-[#EEF1F6] text-[#6E7485] flex items-center justify-center mx-auto">
              <Inbox className="w-6 h-6" strokeWidth={1.75} />
            </div>
            <h4 className="text-sm font-bold text-[#111318]">
              Tidak Ada Konten
            </h4>
            <p className="text-xs text-[#6E7485] max-w-xs mx-auto leading-relaxed">
              Tidak ada konten berstatus {activeSegment === "PUBLISHED" ? "Tayang" : "Draft"}.
            </p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        title={deleteTarget?.item.title || ""}
        itemType={deleteTarget?.type === "task" ? "tugas" : "pengumuman"}
      />
    </div>
  )
}
