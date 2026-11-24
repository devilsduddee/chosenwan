"use client"

import React from "react"
import Link from "next/link"
import { useMockStore } from "@/lib/mock-store"
import { usePwa } from "@/lib/pwa-context"
import { BrandLogo } from "@/components/layout/BrandLogo"
import { Button } from "@/components/ui/button"
import {
  ShieldCheck,
  LogIn,
  LogOut,
  Plus,
  CheckSquare,
  Megaphone,
  Calendar,
  SlidersHorizontal,
  Smartphone,
} from "lucide-react"
import { ActiveTab } from "@/types"

export function TopHeader() {
  const {
    activeTab,
    setActiveTab,
    userRole,
    logoutPublisher,
    setIsEditorOpen,
    setEditingContent,
  } = useMockStore()
  const { isStandalone, triggerInstall } = usePwa()

  const desktopNavItems: { id: ActiveTab; label: string; icon: React.ElementType }[] = [
    { id: "tasks", label: "Tugas", icon: CheckSquare },
    { id: "info", label: "Info", icon: Megaphone },
    { id: "schedule", label: "Jadwal", icon: Calendar },
  ]

  if (userRole === "ketua_kelas" || userRole === "pj" || userRole === "pj_matkul") {
    desktopNavItems.push({ id: "publisher", label: "Kelola", icon: SlidersHorizontal })
  }

  const handleCreateNew = () => {
    setEditingContent(null)
    setIsEditorOpen(true)
  }

  const handleLogout = async () => {
    await logoutPublisher()
  }

  const roleLabel =
    userRole === "ketua_kelas"
      ? "Ketua Kelas"
      : userRole === "pj" || userRole === "pj_matkul"
      ? "PJ Matkul"
      : userRole === "member"
      ? "Anggota Kelas"
      : "Tamu"

  const isPublisher =
    userRole === "ketua_kelas" || userRole === "pj" || userRole === "pj_matkul"

  return (
    <header className="sticky top-0 z-40 bg-[#F6F7FB]/95 backdrop-blur-md border-b border-[#E4E7F0]/70 pt-[env(safe-area-inset-top,0px)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-3">
        {/* Left: Brand Identity linking back to Landing Page */}
        <Link
          href="/"
          title="Kembali ke Beranda Chosenwan"
          className="flex items-center gap-2.5 min-w-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111318] rounded-xl"
        >
          <BrandLogo className="w-9 h-9 group-hover:scale-[0.97] transition-transform" />
          <div className="min-w-0">
            <h1 className="text-sm sm:text-base font-extrabold text-[#111318] tracking-tight leading-tight truncate">
              Chosenwan
            </h1>
            <p className="text-[10px] sm:text-[11px] text-[#6E7485] font-medium leading-none mt-0.5 truncate">
              Portal Informasi Kelas
            </p>
          </div>
        </Link>

        {/* Center: Desktop / Tablet Inline Navigation */}
        <nav
          aria-label="Navigasi Desktop"
          className="hidden md:flex items-center gap-1 bg-white p-1 rounded-full border border-[#E4E7F0] shadow-2xs"
        >
          {desktopNavItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`min-h-[34px] px-3.5 rounded-full text-xs font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111318] ${
                  isActive
                    ? "bg-[#111318] text-white shadow-2xs"
                    : "text-[#6E7485] hover:text-[#111318] hover:bg-[#EEF1F6]"
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Right: Publisher Auth / Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* PWA Mode indicator or Install Trigger Button */}
          {isStandalone ? (
            <span
              className="hidden sm:inline-flex items-center gap-1 h-[34px] px-2.5 rounded-full bg-[#4CD98B]/15 text-[#111318] text-[11px] font-bold border border-[#4CD98B]/30 shrink-0"
              title="Aplikasi berjalan dalam mode PWA Standalone"
            >
              <Smartphone className="w-3.5 h-3.5 text-[#111318]" strokeWidth={2} />
              <span>App Mode</span>
            </span>
          ) : (
            <button
              type="button"
              onClick={triggerInstall}
              className="flex items-center gap-1.5 h-[34px] px-2.5 sm:px-3 rounded-full bg-white hover:bg-[#EEF1F6] border border-[#E4E7F0] text-[11px] font-bold text-[#111318] shadow-2xs hover:border-[#111318]/40 active:scale-95 transition-all shrink-0 cursor-pointer"
              title="Pasang Aplikasi di Layar HP / Desktop"
            >
              <Smartphone className="w-3.5 h-3.5 text-[#111318]" strokeWidth={2} />
              <span>Install App</span>
            </button>
          )}

          {userRole === "guest" ? (
            <Link
              href="/login"
              aria-label="Masuk Publisher"
              title="Masuk Publisher"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white hover:bg-[#EEF1F6] border border-[#E4E7F0]/80 text-[#6E7485] hover:text-[#111318] transition-all active:scale-95 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111318]"
            >
              <LogIn className="w-4 h-4" strokeWidth={1.75} />
            </Link>
          ) : (
            <>
              {isPublisher && (
                <Button
                  size="sm"
                  onClick={handleCreateNew}
                  className="h-[34px] rounded-full bg-[#111318] hover:bg-[#111318]/90 text-white text-xs font-semibold px-2.5 sm:px-3 shadow-2xs shrink-0 cursor-pointer"
                  title="Buat Konten Baru"
                >
                  <Plus className="w-3.5 h-3.5 sm:mr-1" strokeWidth={2} />
                  <span className="hidden sm:inline">Posting</span>
                </Button>
              )}

              <button
                type="button"
                onClick={() => {
                  if (isPublisher) {
                    setActiveTab("publisher")
                  } else {
                    setActiveTab("tasks")
                  }
                }}
                className="flex items-center gap-1.5 h-[34px] px-2.5 rounded-full bg-[#EEF1F6] hover:bg-[#E4E7F0] border border-[#E4E7F0] text-[11px] font-bold text-[#111318] transition-colors shrink-0 cursor-pointer"
                title={isPublisher ? "Buka Dashboard Kelola" : "Sesi Anggota Aktif"}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#4CD98B] shrink-0" strokeWidth={2} />
                <span className="truncate max-w-[90px]">{roleLabel}</span>
              </button>

              <button
                type="button"
                onClick={handleLogout}
                aria-label="Keluar dari sesi"
                title="Keluar dari sesi"
                className="flex items-center justify-center w-[34px] h-[34px] rounded-full bg-white hover:bg-[#F05252]/10 border border-[#E4E7F0] text-[#6E7485] hover:text-[#F05252] transition-colors shrink-0 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" strokeWidth={2} />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
