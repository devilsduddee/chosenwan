"use client"

import React from "react"
import { useMockStore } from "@/lib/mock-store"
import { CategoryFilterPills } from "@/components/info/CategoryFilterPills"
import { AnnouncementCard } from "@/components/info/AnnouncementCard"
import { Megaphone, Inbox } from "lucide-react"

export function AnnouncementList() {
  const { announcements, selectedCategoryFilter } = useMockStore()

  // Only published items for public view
  const publishedAnnouncements = announcements.filter((a) => a.status === "PUBLISHED")

  // Filter by category pill
  const filtered = publishedAnnouncements.filter((a) => {
    if (selectedCategoryFilter === "ALL") return true
    return a.category_type === selectedCategoryFilter
  })

  // Sort by created_at newest first
  filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  return (
    <div className="space-y-4">
      {/* Intro Header */}
      <div className="space-y-1">
        <h2 className="text-lg font-extrabold text-[#111318] tracking-tight">
          Info & Pengumuman Kampus
        </h2>
        <p className="text-xs text-[#6E7485] leading-relaxed">
          Pengumuman dosen, perubahan jadwal, berita kampus, dan info lomba tanpa misscom.
        </p>
      </div>

      {/* Category Filter Pills */}
      <CategoryFilterPills />

      {/* Announcement Items */}
      <div className="space-y-3 pt-1">
        {filtered.length > 0 ? (
          filtered.map((item) => <AnnouncementCard key={item.id} announcement={item} />)
        ) : (
          <div className="bg-white rounded-3xl p-8 border border-[#E4E7F0] text-center space-y-2.5 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#EEF1F6] text-[#6E7485] flex items-center justify-center mx-auto">
              <Inbox className="w-6 h-6 text-[#6E7485]" strokeWidth={1.75} />
            </div>
            <h4 className="text-sm font-bold text-[#111318]">
              Belum Ada Pengumuman
            </h4>
            <p className="text-xs text-[#6E7485] max-w-xs mx-auto leading-relaxed">
              Belum ada informasi pada kategori ini. Silakan periksa kategori lain.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
