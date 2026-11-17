"use client"

import React from "react"
import { useMockStore } from "@/lib/mock-store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, ShieldCheck, User, Plus } from "lucide-react"

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
    <header className="sticky top-0 z-40 bg-[#F6F7FB]/95 backdrop-blur-md px-4 pt-4 pb-3 border-b border-[#E4E7F0]/60">
      <div className="flex items-center justify-between gap-3">
        {/* Left: Class Identity */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-[#111318] flex items-center justify-center text-white shadow-sm shrink-0">
            <GraduationCap className="w-5 h-5" strokeWidth={1.75} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base font-bold text-[#111318] tracking-tight leading-tight">
                Chosenwan Pilot
              </h1>
              <span className="text-[10px] font-semibold bg-[#A8C0FF] text-[#111318] px-1.5 py-0.5 rounded-full">
                IF-A
              </span>
            </div>
            <p className="text-[11px] text-[#6E7485] font-medium leading-none mt-0.5">
              Semester Genap 2026
            </p>
          </div>
        </div>

        {/* Right: Role Switcher & Action */}
        <div className="flex items-center gap-1.5">
          {userRole !== "guest" && (
            <Button
              size="sm"
              onClick={handleCreateNew}
              className="h-8 rounded-full bg-[#111318] hover:bg-[#111318]/90 text-white text-xs font-semibold px-2.5 shadow-sm"
              title="Buat Konten Baru"
            >
              <Plus className="w-3.5 h-3.5 mr-1" strokeWidth={2} />
              Posting
            </Button>
          )}

          <button
            type="button"
            onClick={toggleRole}
            className="group flex items-center gap-1.5 h-8 px-2.5 rounded-full bg-[#EEF1F6] hover:bg-[#E4E7F0] border border-[#E4E7F0] text-xs font-medium text-[#111318] transition-all cursor-pointer active:scale-95"
            title="Klik untuk beralih antara Mode Mahasiswa dan Mode Publisher"
          >
            {userRole === "guest" ? (
              <User className="w-3.5 h-3.5 text-[#6E7485]" strokeWidth={1.75} />
            ) : (
              <ShieldCheck className="w-3.5 h-3.5 text-[#4CD98B]" strokeWidth={2} />
            )}
            <span className="text-[11px] font-semibold">{roleLabel}</span>
          </button>
        </div>
      </div>
    </header>
  )
}
