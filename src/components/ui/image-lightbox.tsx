"use client"

import React, { useState, useEffect, useCallback } from "react"
import { X, ZoomIn, ZoomOut, RotateCcw, ExternalLink } from "lucide-react"
import { isSafeHttpUrl, isSafePosterSrc } from "@/lib/url-safety"

interface ImageLightboxProps {
  src: string | null
  alt: string
  title?: string
  isOpen: boolean
  onClose: () => void
}

export function ImageLightbox({
  src,
  alt,
  title,
  isOpen,
  onClose,
}: ImageLightboxProps) {
  const [scale, setScale] = useState(1)

  // Reset scale when reopened
  useEffect(() => {
    if (isOpen) {
      setScale(1)
      // Prevent background body scroll
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  const zoomIn = useCallback(() => {
    setScale((prev) => Math.min(prev + 0.5, 3))
  }, [])

  const zoomOut = useCallback(() => {
    setScale((prev) => Math.max(prev - 0.5, 0.75))
  }, [])

  const resetZoom = useCallback(() => {
    setScale(1)
  }, [])

  const toggleDoubleTapZoom = useCallback(() => {
    setScale((prev) => (prev > 1.2 ? 1 : 2))
  }, [])

  const safeSrc = src && isSafePosterSrc(src) ? src : null
  const canOpenExternal = isSafeHttpUrl(safeSrc)

  if (!isOpen || !safeSrc) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title || "Tampilan gambar penuh"}
      className="fixed inset-0 z-[100] bg-[#111318]/95 backdrop-blur-md flex flex-col select-none animate-in fade-in duration-150"
    >
      {/* Top Bar Header */}
      <div className="w-full px-4 py-3 sm:py-3.5 pt-[calc(0.75rem+env(safe-area-inset-top,0px))] flex items-center justify-between gap-3 bg-[#111318]/80 border-b border-white/10 shrink-0 z-10">
        <div className="min-w-0 pr-2">
          <h4 className="text-white text-xs sm:text-sm font-bold truncate">
            {title || "Gambar Pengumuman"}
          </h4>
          <p className="text-white/60 text-[10px] hidden sm:block">
            Ketuk 2x untuk memperbesar · Geser untuk menggeser gambar
          </p>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {canOpenExternal && (
            <a
              href={safeSrc}
              target="_blank"
              rel="noopener noreferrer"
              title="Buka ukuran penuh di tab baru"
              aria-label="Buka ukuran penuh di tab baru"
              className="h-9 px-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" strokeWidth={2} />
              <span className="hidden sm:inline">Ukuran Penuh</span>
            </a>
          )}

          <button
            type="button"
            onClick={onClose}
            title="Tutup (Esc)"
            aria-label="Tutup"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#F05252] text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Main Image Canvas with Zoom & Pan */}
      <div
        onClick={(e) => {
          // If clicked on backdrop, close
          if (e.target === e.currentTarget) onClose()
        }}
        onDoubleClick={toggleDoubleTapZoom}
        className="flex-1 w-full h-full overflow-auto overscroll-contain flex items-center justify-center p-2 sm:p-6 touch-pan-x touch-pan-y cursor-zoom-in"
      >
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "center center",
            transition: "transform 0.18s ease-out",
          }}
          className="relative max-w-full max-h-full flex items-center justify-center min-w-[320px] sm:min-w-[500px]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={safeSrc}
            alt={alt}
            draggable={false}
            className="max-h-[82dvh] max-w-full sm:max-w-4xl w-auto h-auto object-contain rounded-xl shadow-2xl drop-shadow-2xl border border-white/10 pointer-events-auto"
          />
        </div>
      </div>

      {/* Bottom Floating Zoom Controls */}
      <div className="w-full pb-[calc(1rem+env(safe-area-inset-bottom,0px))] sm:pb-6 flex items-center justify-center shrink-0 z-10 pointer-events-none">
        <div className="pointer-events-auto bg-[#111318]/90 backdrop-blur-md border border-white/15 rounded-full px-3 py-1.5 flex items-center gap-2 sm:gap-3 shadow-xl">
          <button
            type="button"
            onClick={zoomOut}
            disabled={scale <= 0.75}
            title="Perkecil"
            aria-label="Perkecil"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center disabled:opacity-40 transition-colors cursor-pointer"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={resetZoom}
            title="Reset Zoom ke 100%"
            className="px-2 py-1 rounded-md text-[11px] font-bold text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            {Math.round(scale * 100)}%
          </button>

          <button
            type="button"
            onClick={zoomIn}
            disabled={scale >= 3}
            title="Perbesar"
            aria-label="Perbesar"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center disabled:opacity-40 transition-colors cursor-pointer"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <div className="w-px h-4 bg-white/20 mx-0.5" />

          <button
            type="button"
            onClick={resetZoom}
            title="Reset Ukuran"
            aria-label="Reset Ukuran"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
