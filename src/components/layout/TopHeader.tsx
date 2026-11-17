"use client"

import React from "react"
import { useMockStore } from "@/lib/mock-store"
import { Button } from "@/components/ui/button"
import { ShieldCheck, User, Plus } from "lucide-react"

export function TopHeader() {
  const { userRole, setUserRole, setIsEditorOpen, setEditingContent } = useMockStore()

  const toggleRole = () => {
    if (userRole === "guest") {
      setUserRole("ketua_kelas")
    } else if (userRole === "ketua_kelas") {
      setUserRole("pj_matkul")
    } else {
      setUserRole("guest")
    }
  }

  const handleCreateNew = () => {
    setEditingContent(null)
    setIsEditorOpen(true)
  }

  const roleLabel =
    userRole === "ketua_kelas"
      ? "Ketua Kelas"
      : userRole === "pj_matkul"
      ? "PJ Matkul"
      : "Mahasiswa"

  return (
    <header className="sticky top-0 z-40 bg-[#F6F7FB]/95 backdrop-blur-md px-4 pt-3.5 pb-2.5 border-b border-[#E4E7F0]/60">
      <div className="flex items-center justify-between gap-2">
        {/* Left: Class Identity */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-2xl bg-[#111318] p-1.5 flex items-center justify-center text-white shadow-xs shrink-0">
            {/* Chosenwan Bento Spark Logo Mark */}
            <svg viewBox="0 0 256 256" className="w-full h-full" fill="none">
              <rect x="32" y="32" width="88" height="88" rx="28" fill="#FFFFFF" />
              <rect x="136" y="32" width="88" height="88" rx="44" fill="#F6C866" />
              <rect x="32" y="136" width="88" height="88" rx="44" fill="#A8C0FF" />
              <rect x="136" y="136" width="88" height="88" rx="28" fill="#EA9DFB" />
            </svg>
          </div>
          <div className="min-w-0">
            <h1 className="text-sm sm:text-base font-extrabold text-[#111318] tracking-tight leading-tight truncate">
              Chosenwan
            </h1>
            <p className="text-[10px] sm:text-[11px] text-[#6E7485] font-medium leading-none mt-0.5 truncate">
              Portal Informasi Kelas
            </p>
          </div>
        </div>

        {/* Right: Role Switcher & Action */}
        <div className="flex items-center gap-1.5 shrink-0">
          {userRole !== "guest" && (
            <Button
              size="sm"
              onClick={handleCreateNew}
              className="h-[34px] rounded-full bg-[#111318] hover:bg-[#111318]/90 text-white text-xs font-semibold px-2.5 shadow-xs shrink-0"
              title="Buat Konten Baru"
            >
              <Plus className="w-3.5 h-3.5 mr-1" strokeWidth={2} />
              <span>Posting</span>
            </Button>
          )}

          <button
            type="button"
            onClick={toggleRole}
            aria-label="Beralih peran pengguna"
            className="group flex items-center gap-1.5 min-h-[34px] h-[34px] px-2.5 rounded-full bg-[#EEF1F6] hover:bg-[#E4E7F0] border border-[#E4E7F0] text-xs font-semibold text-[#111318] transition-all cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111318] shrink-0"
            title="Klik untuk beralih peran"
          >
            {userRole === "guest" ? (
              <User className="w-3.5 h-3.5 text-[#6E7485] shrink-0" strokeWidth={1.75} />
            ) : (
              <ShieldCheck className="w-3.5 h-3.5 text-[#4CD98B] shrink-0" strokeWidth={2} />
            )}
            <span className="text-[11px] font-bold" suppressHydrationWarning>{roleLabel}</span>
          </button>
        </div>
      </div>
    </header>
  )
}
