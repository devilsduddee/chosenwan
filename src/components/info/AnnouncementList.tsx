"use client"

import React, { useMemo, useState } from "react"
import { Announcement } from "@/types"
import { useMockStore } from "@/lib/mock-store"
import { CategoryFilterPills } from "@/components/info/CategoryFilterPills"
import { AnnouncementCard } from "@/components/info/AnnouncementCard"
import { AnnouncementDetailSheet } from "@/components/info/AnnouncementDetailSheet"
import { Inbox } from "lucide-react"

export function AnnouncementList() {
  const { announcements, selectedCategoryFilter } = useMockStore()
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null)

  const filtered = useMemo(() => {
    return announcements
      .filter((a) => {
        if (a.status !== "PUBLISHED") return false
        if (selectedCategoryFilter === "ALL") return true
        return a.category_type === selectedCategoryFilter
      })
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  }, [announcements, selectedCategoryFilter])

  return (
    <div className="space-y-4">
      {/* Intro Header */}
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-[#111318] tracking-tight">
          Info & Kampus
        </h2>
        <p className="text-xs text-[#6E7485] leading-relaxed">
          Pengumuman dosen, info pindah ruangan, berita kampus, dan info lomba.
        </p>
      </div>

      {/* Category Filter Pills */}
      <CategoryFilterPills />

      {/* Announcement Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-3.5 pt-1">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <AnnouncementCard
              key={item.id}
              announcement={item}
              onSelect={setSelectedAnnouncement}
            />
          ))
        ) : (
          <div className="md:col-span-2 bg-white rounded-[22px] p-8 border border-[#E4E7F0] text-center space-y-2.5 shadow-2xs">
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

      {/* Announcement Detail Popup Sheet */}
      <AnnouncementDetailSheet
        announcement={selectedAnnouncement}
        onClose={() => setSelectedAnnouncement(null)}
      />
    </div>
  )
}
