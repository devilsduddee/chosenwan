"use client"

import React, { useState, useEffect } from "react"
import { usePwa } from "@/lib/pwa-context"
import { Download, Share, X } from "lucide-react"

export function PwaInstallPrompt() {
  const { isStandalone, isIos, triggerInstall } = usePwa()
  const [isDismissed, setIsDismissed] = useState(true)

  useEffect(() => {
    if (isStandalone) return

    // Cek apakah user pernah menutup prompt di sesi browser ini
    const dismissed = sessionStorage.getItem("chosenwan_pwa_session_dismissed")
    if (dismissed) return

    // Tampilkan banner dengan jeda lembut setelah halaman dimuat
    const timer = setTimeout(() => {
      setIsDismissed(false)
    }, 1800)

    return () => clearTimeout(timer)
  }, [isStandalone])

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsDismissed(true)
    sessionStorage.setItem("chosenwan_pwa_session_dismissed", "true")
  }

  if (isStandalone || isDismissed) return null

  return (
    <div
      onClick={triggerInstall}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && triggerInstall()}
      className="fixed bottom-[calc(5rem+env(safe-area-inset-bottom,0px))] left-4 right-4 z-40 max-w-[420px] mx-auto animate-in fade-in slide-in-from-bottom-3 duration-300 cursor-pointer"
    >
      <div className="bg-[#111318] text-white p-3.5 sm:p-4 rounded-[22px] shadow-[0_12px_36px_rgba(17,19,24,0.35)] border border-white/10 flex items-center justify-between gap-3 hover:scale-[1.01] active:scale-[0.99] transition-all">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-[#F6C866]">
            {isIos ? <Share className="w-4 h-4" /> : <Download className="w-4 h-4" />}
          </div>
          <div className="min-w-0 space-y-0.5">
            <p className="text-xs font-bold leading-tight truncate">Pasang Aplikasi Chosenwan</p>
            <p className="text-[10px] text-white/70 leading-tight">
              {isIos
                ? "Akses langsung dari layar utama. Ketuk untuk panduan."
                : "Akses langsung dari layar utama ponsel Anda."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              triggerInstall()
            }}
            className="px-3 py-1.5 rounded-full bg-white text-[#111318] text-xs font-extrabold hover:bg-white/90 active:scale-95 transition-all cursor-pointer shadow-xs"
          >
            Pasang
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
