"use client"

import React from "react"
import { usePortalStore } from "@/lib/portal-store"
import { WifiOff, RotateCcw } from "lucide-react"

export function PortalStatusBanner() {
  const { isLoading, hasError, errorMessage, refreshData } = usePortalStore()

  if (hasError) {
    return (
      <div
        role="alert"
        className="mb-4 rounded-[20px] bg-[#F05252]/10 border border-[#F05252]/30 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
      >
        <div className="flex items-start gap-2.5 text-xs text-[#111318]">
          <WifiOff className="w-4 h-4 text-[#F05252] shrink-0 mt-0.5" />
          <span className="font-semibold leading-relaxed">
            {errorMessage || "Gagal memuat info terbaru. Periksa koneksi internetmu."}
          </span>
        </div>
        <button
          type="button"
          onClick={() => refreshData()}
          className="min-h-[44px] px-4 rounded-full bg-[#111318] text-white text-xs font-bold inline-flex items-center gap-1.5 shrink-0 cursor-pointer active:scale-[0.98]"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Coba Lagi</span>
        </button>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="space-y-3 mb-4" aria-busy="true" aria-label="Memuat data portal">
        <div className="h-24 rounded-[22px] bg-white border border-[#E4E7F0] animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="h-32 rounded-[22px] bg-white border border-[#E4E7F0] animate-pulse" />
          <div className="h-32 rounded-[22px] bg-white border border-[#E4E7F0] animate-pulse" />
        </div>
      </div>
    )
  }

  return null
}
