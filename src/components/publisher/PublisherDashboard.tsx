"use client"

import React, { useState } from "react"
import { usePortalStore } from "@/lib/portal-store"
import { Task, Announcement } from "@/types"
import { PublisherContentItem } from "@/components/publisher/PublisherContentItem"
import { DeleteConfirmDialog } from "@/components/publisher/DeleteConfirmDialog"
import { AdminManageSheet } from "@/components/publisher/AdminManageSheet"
import { Plus, Inbox, RotateCcw, LogOut, Settings2 } from "lucide-react"
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
    refreshData,
  } = usePortalStore()

  const [activeSegment, setActiveSegment] = useState<"PUBLISHED" | "DRAFT">("PUBLISHED")
  const [typeFilter, setTypeFilter] = useState<"ALL" | "TASK" | "ANNOUNCEMENT">("ALL")
  const [isAdminOpen, setIsAdminOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const [deleteTarget, setDeleteTarget] = useState<{
    type: "task" | "announcement"
    item: Task | Announcement
  } | null>(null)

  const filteredTasks = tasks.filter((t) => t.status === activeSegment)
  const filteredAnnouncements = announcements.filter((a) => a.status === activeSegment)

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

  const handleDeleteConfirm = async () => {
    if (!deleteTarget || isDeleting) return
    setIsDeleting(true)
    try {
      if (deleteTarget.type === "task") {
        await deleteTask(deleteTarget.item.id)
      } else {
        await deleteAnnouncement(deleteTarget.item.id)
      }
      setDeleteTarget(null)
    } catch {
      // Error toast ditangani oleh portal-store; dialog tetap terbuka
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Page Greeting Header */}
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-[#111318] tracking-tight">Kelola Konten</h2>
        <p className="text-xs text-[#6E7485] leading-relaxed">
          Buat tugas atau pengumuman baru, simpan sebagai draft, atau langsung terbitkan.
        </p>
      </div>

      {/* Overview Card */}
      <div className="bg-white rounded-[22px] p-4 sm:p-5 border border-[#E4E7F0] shadow-2xs space-y-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6E7485]">
              Ruang Publisher
            </span>
            <h2 className="text-base font-extrabold text-[#111318] truncate">
              {currentUser.full_name || currentUser.name}
            </h2>
            <p className="text-[11px] text-[#6E7485] mt-0.5">
              {userRole === "ketua_kelas"
                ? "Ketua Kelas · Bisa kelola semua postingan, jadwal, matkul & akun"
                : "PJ Matkul · Kelola postingan sendiri dan jadwal"}
            </p>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={async () => {
                await refreshData()
                toast.success("Data berhasil diperbarui dari database")
              }}
              className="w-11 h-11 rounded-xl text-[#6E7485] hover:text-[#111318] hover:bg-[#EEF1F6] flex items-center justify-center transition-colors cursor-pointer"
              title="Perbarui Data Database"
              aria-label="Perbarui Data Database"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => logoutPublisher()}
              className="min-h-[44px] px-3 rounded-xl text-[11px] font-bold text-[#6E7485] hover:text-[#F05252] hover:bg-[#F05252]/10 inline-flex items-center gap-1 transition-colors cursor-pointer"
              title="Keluar Sesi"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-3">
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

          <div className="flex flex-col sm:flex-row gap-2 shrink-0">
            {userRole === "ketua_kelas" && (
              <button
                type="button"
                onClick={() => setIsAdminOpen(true)}
                className="w-full sm:w-auto px-4 min-h-[44px] rounded-full bg-[#EEF1F6] hover:bg-[#E4E7F0] border border-[#E4E7F0] text-[#111318] font-bold text-xs flex items-center justify-center gap-1.5 transition-transform active:scale-[0.98] cursor-pointer"
              >
                <Settings2 className="w-4 h-4" strokeWidth={2} />
                <span>Matkul & Akun</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setEditingContent(null)
                setIsEditorOpen(true)
              }}
              className="w-full sm:w-auto sm:px-6 min-h-[44px] rounded-full bg-[#111318] hover:bg-[#111318]/90 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-[0.98] cursor-pointer"
            >
              <Plus className="w-4 h-4" strokeWidth={2} />
              <span>Buat Konten Baru</span>
            </button>
          </div>
        </div>
      </div>

      {/* Controls Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2.5">
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-white rounded-2xl border border-[#E4E7F0] shadow-2xs md:w-72">
          <button
            type="button"
            onClick={() => setActiveSegment("PUBLISHED")}
            className={`min-h-[44px] rounded-xl text-xs font-bold transition-colors cursor-pointer ${
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
            className={`min-h-[44px] rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeSegment === "DRAFT"
                ? "bg-[#111318] text-white shadow-2xs"
                : "text-[#6E7485] hover:text-[#111318]"
            }`}
          >
            Draft ({totalDrafts})
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          {(["ALL", "TASK", "ANNOUNCEMENT"] as const).map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setTypeFilter(filter)}
              className={`min-h-[44px] md:min-h-[38px] px-3.5 rounded-full text-[11px] font-semibold transition-colors cursor-pointer ${
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
            <h4 className="text-sm font-bold text-[#111318]">Tidak Ada Konten</h4>
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
        isDeleting={isDeleting}
      />

      {/* Admin Course & Account Management */}
      {userRole === "ketua_kelas" && (
        <AdminManageSheet isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
      )}
    </div>
  )
}
