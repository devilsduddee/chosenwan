"use client"

import React, { useState, useEffect } from "react"
import { Download, Share, X } from "lucide-react"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isIos, setIsIos] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [isDismissed, setIsDismissed] = useState(true)

  useEffect(() => {
    // 1. Cek apakah sudah berjalan dalam mode standalone PWA
    const isStandaloneMode =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true

    setIsStandalone(isStandaloneMode)
    if (isStandaloneMode) return

    // 2. Cek apakah user pernah menutup prompt ini
    const dismissed = localStorage.getItem("chosenwan_pwa_dismissed")
    if (dismissed) return

    // 3. Deteksi iOS
    const userAgent = window.navigator.userAgent.toLowerCase()
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent)
    setIsIos(isIosDevice)

    // 4. Tangkap event beforeinstallprompt (Android / Chrome)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setIsDismissed(false)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    // Untuk iOS, tampilkan setelah beberapa detik jika belum standalone
    if (isIosDevice) {
      const timer = setTimeout(() => {
        setIsDismissed(false)
      }, 2500)
      return () => clearTimeout(timer)
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return
    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === "accepted") {
      setIsDismissed(true)
    }
    setDeferredPrompt(null)
  }

  const handleDismiss = () => {
    setIsDismissed(true)
    localStorage.setItem("chosenwan_pwa_dismissed", "true")
  }

  if (isStandalone || isDismissed) return null

  return (
    <div className="fixed bottom-20 left-4 right-4 z-40 max-w-[420px] mx-auto animate-in fade-in slide-in-from-bottom-3 duration-300">
      <div className="bg-[#111318] text-white p-3.5 sm:p-4 rounded-[22px] shadow-[0_12px_36px_rgba(17,19,24,0.35)] border border-white/10 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-[#F6C866]">
            {isIos ? <Share className="w-4 h-4" /> : <Download className="w-4 h-4" />}
          </div>
          <div className="min-w-0 space-y-0.5">
            <p className="text-xs font-bold leading-tight truncate">Pasang Aplikasi Chosenwan</p>
            <p className="text-[10px] text-white/70 leading-tight">
              {isIos
                ? "Tap ikon Bagikan lalu pilih 'Tambah ke Layar Utama'"
                : "Buka instan seperti aplikasi native di HP"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {!isIos && deferredPrompt && (
            <button
              type="button"
              onClick={handleInstallClick}
              className="px-3 py-1.5 rounded-full bg-white text-[#111318] text-xs font-extrabold hover:bg-white/90 active:scale-95 transition-all cursor-pointer"
            >
              Install
            </button>
          )}
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
