"use client"

import React, { useState, useEffect } from "react"
import { useMockStore } from "@/lib/mock-store"
import { CheckSquare, Megaphone, Calendar, SlidersHorizontal, ArrowRight } from "lucide-react"

export default function HomePage() {
  const { activeTab, userRole, setActiveTab, tasks, announcements } = useMockStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const publishedTasks = tasks.filter((t) => t.status === "PUBLISHED")
  const urgentTasksCount = mounted
    ? publishedTasks.filter((t) => new Date(t.due_date).getTime() > Date.now()).length
    : publishedTasks.length

  const publishedAnnouncements = announcements.filter((a) => a.status === "PUBLISHED")

  return (
    <div className="space-y-4">
      {/* Shell Ready Greeting Banner */}
      <div className="bg-white rounded-3xl p-5 border border-[#E4E7F0] shadow-sm">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A8C0FF] text-[#111318] text-xs font-bold mb-3">
          <span>Phase 1: Shell & Foundations Ready</span>
        </div>
        <h2 className="text-xl font-extrabold text-[#111318] tracking-tight leading-snug">
          Hai Mahasiswa! 👋
        </h2>
        <p className="text-xs text-[#6E7485] mt-1 leading-relaxed">
          Portal kelas Chosenwan siap menyajikan informasi tugas, jadwal tetap, dan info kampus tanpa ribet menggali chat WA.
        </p>

        <div className="mt-4 pt-3 border-t border-[#E4E7F0] flex items-center justify-between text-xs text-[#6E7485]">
          <span>Role Aktif: <strong className="text-[#111318] capitalize">{userRole.replace("_", " ")}</strong></span>
          <span>Tab Aktif: <strong className="text-[#111318] uppercase">{activeTab}</strong></span>
        </div>
      </div>

      {/* Quick Status Bento Cards Preview for Shell Check */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setActiveTab("tasks")}
          className="bg-white p-4 rounded-2xl border border-[#E4E7F0] text-left hover:border-[#111318]/30 transition-all cursor-pointer group active:scale-95"
        >
          <div className="w-8 h-8 rounded-xl bg-[#A8C0FF] text-[#111318] flex items-center justify-center mb-3">
            <CheckSquare className="w-4 h-4" strokeWidth={2} />
          </div>
          <p className="text-[11px] font-semibold text-[#6E7485]">Tugas Aktif</p>
          <div className="flex items-baseline justify-between mt-0.5">
            <span className="text-2xl font-extrabold text-[#111318]">
              {urgentTasksCount}
            </span>
            <ArrowRight className="w-4 h-4 text-[#6E7485] group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("info")}
          className="bg-white p-4 rounded-2xl border border-[#E4E7F0] text-left hover:border-[#111318]/30 transition-all cursor-pointer group active:scale-95"
        >
          <div className="w-8 h-8 rounded-xl bg-[#F6C866] text-[#111318] flex items-center justify-center mb-3">
            <Megaphone className="w-4 h-4" strokeWidth={2} />
          </div>
          <p className="text-[11px] font-semibold text-[#6E7485]">Info & Berita</p>
          <div className="flex items-baseline justify-between mt-0.5">
            <span className="text-2xl font-extrabold text-[#111318]">{publishedAnnouncements.length}</span>
            <ArrowRight className="w-4 h-4 text-[#6E7485] group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>

      {/* Mode Information Card */}
      <div className="bg-[#EEF1F6] rounded-2xl p-4 border border-[#E4E7F0] text-xs text-[#111318] space-y-1.5">
        <div className="flex items-center gap-1.5 font-bold text-[13px]">
          <SlidersHorizontal className="w-4 h-4 text-[#111318]" strokeWidth={2} />
          <span>Cara Menguji Prototyping:</span>
        </div>
        <p className="text-[11px] text-[#6E7485] leading-relaxed">
          1. Klik tombol peran di kanan atas untuk beralih antara <strong>Mahasiswa</strong>, <strong>Ketua Kelas</strong>, dan <strong>PJ Matkul</strong>.
        </p>
        <p className="text-[11px] text-[#6E7485] leading-relaxed">
          2. Gunakan bottom bar di bawah untuk berpindah antar tab <strong>Tugas</strong>, <strong>Info</strong>, dan <strong>Jadwal</strong>.
        </p>
      </div>
    </div>
  )
}
