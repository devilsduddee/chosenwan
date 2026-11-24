"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

interface PwaContextType {
  isInstallable: boolean
  isStandalone: boolean
  isIos: boolean
  isModalOpen: boolean
  hasNativePrompt: boolean
  openModal: () => void
  closeModal: () => void
  triggerInstall: () => Promise<void>
}

const PwaContext = createContext<PwaContextType | undefined>(undefined)

export function PwaProvider({ children }: { children: React.ReactNode }) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isIos, setIsIos] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    // 1. Cek apakah sudah berjalan dalam mode standalone PWA
    const isStandaloneMode =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true

    setIsStandalone(isStandaloneMode)

    // 2. Deteksi iOS
    const userAgent = window.navigator.userAgent.toLowerCase()
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent)
    setIsIos(isIosDevice)

    // 3. Tangkap event beforeinstallprompt (Android / Chrome Desktop)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const triggerInstall = async () => {
    // Jika ada prompt native Chrome / Android, langsung munculkan prompt
    if (deferredPrompt) {
      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === "accepted") {
        setIsModalOpen(false)
      }
      setDeferredPrompt(null)
      return
    }
    // Jika di iOS, Safari, atau browser tanpa native prompt, buka modal panduan visual
    setIsModalOpen(true)
  }

  return (
    <PwaContext.Provider
      value={{
        isInstallable: !isStandalone,
        isStandalone,
        isIos,
        isModalOpen,
        hasNativePrompt: !!deferredPrompt,
        openModal: () => setIsModalOpen(true),
        closeModal: () => setIsModalOpen(false),
        triggerInstall,
      }}
    >
      {children}
    </PwaContext.Provider>
  )
}

export function usePwa() {
  const context = useContext(PwaContext)
  if (!context) {
    throw new Error("usePwa must be used within a PwaProvider")
  }
  return context
}
