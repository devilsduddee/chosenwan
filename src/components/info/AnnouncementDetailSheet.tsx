"use client"

import React, { useState } from "react"
import { Announcement } from "@/types"
import { formatIndonesianDate } from "@/lib/date-utils"
import { isSafePosterSrc } from "@/lib/image-utils"
import {
  buildAnnouncementWhatsAppText,
  getAnnouncementCategoryMeta,
  isSafeHttpUrl,
} from "@/lib/announcement-utils"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { ImageLightbox } from "@/components/ui/image-lightbox"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Calendar, Check, ExternalLink, Maximize2, Share2, Pin } from "lucide-react"
import { useMockStore } from "@/lib/mock-store"

interface AnnouncementDetailSheetProps {
  announcement: Announcement | null
  onClose: () => void
}

export function AnnouncementDetailSheet({
  announcement,
  onClose,
}: AnnouncementDetailSheetProps) {
  const { userRole, togglePinAnnouncement } = useMockStore()
  const [copied, setCopied] = useState(false)
  const [isPinning, setIsPinning] = useState(false)
  const [isPosterZoomOpen, setIsPosterZoomOpen] = useState(false)
  const [failedPosterUrl, setFailedPosterUrl] = useState<string | null>(null)

  if (!announcement) return null

  const categoryMeta = getAnnouncementCategoryMeta(announcement.category_type)
  const formattedDate = formatIndonesianDate(announcement.created_at, {
    showDayName: true,
    showYear: true,
  })

  const rawPoster = announcement.poster_url
  const posterSrc =
    rawPoster && rawPoster !== failedPosterUrl && isSafePosterSrc(rawPoster)
      ? rawPoster
      : null

  const safeSourceUrl = isSafeHttpUrl(announcement.source_url)
    ? announcement.source_url
    : null

  const handleCopyWhatsApp = () => {
    navigator.clipboard.writeText(buildAnnouncementWhatsAppText(announcement))
    setCopied(true)
    toast.success("Info berhasil disalin untuk WhatsApp!")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <Sheet open={!!announcement} onOpenChange={(open) => !open && onClose()}>
        <SheetContent
          side="bottom"
          className="w-full sm:max-w-lg mx-auto rounded-t-[24px] sm:rounded-[24px] sm:mb-4 p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] max-h-[90dvh] overflow-y-auto overscroll-contain bg-white border border-[#E4E7F0] shadow-2xl"
        >
          <SheetHeader className="text-left space-y-2.5">
            <div className="flex items-center gap-2 flex-wrap">
              {announcement.is_pinned && (
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#111318] text-white inline-flex items-center gap-1">
                  <Pin className="w-3 h-3 fill-white" /> Dipin
                </span>
              )}
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full ${categoryMeta.bgClass} ${categoryMeta.textColor}`}
              >
                {categoryMeta.label}
              </span>
              {announcement.course && (
                <span className="text-xs font-semibold bg-[#EEF1F6] text-[#111318] px-2.5 py-1 rounded-full">
                  {announcement.course.code} · {announcement.course.name}
                </span>
              )}
            </div>

            <SheetTitle className="text-lg font-extrabold text-[#111318] leading-snug">
              {announcement.title}
            </SheetTitle>
            <SheetDescription className="sr-only">
              Detail lengkap pengumuman dan informasi kelas
            </SheetDescription>
          </SheetHeader>

          {/* Publication Date Strip */}
          <div className="mt-4 bg-[#F6F7FB] border border-[#E4E7F0] rounded-2xl p-3.5 flex items-center gap-2.5 text-xs">
            <div className="w-8 h-8 rounded-xl bg-white border border-[#E4E7F0] flex items-center justify-center text-[#111318] shrink-0">
              <Calendar className="w-4 h-4" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-[11px] text-[#6E7485] font-medium">Dipublikasikan</p>
              <p className="font-bold text-[#111318] text-xs leading-tight" suppressHydrationWarning>
                {formattedDate}
              </p>
            </div>
          </div>

          {/* Poster Image (clickable for full-screen zoom) */}
          {posterSrc && (
            <div className="mt-4 space-y-2">
              <button
                type="button"
                onClick={() => setIsPosterZoomOpen(true)}
                aria-label={`Perbesar poster ${announcement.title}`}
                className="relative w-full rounded-2xl overflow-hidden border border-[#E4E7F0] bg-[#F6F7FB] cursor-pointer active:scale-[0.99] transition-transform block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111318]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={posterSrc}
                  alt={`Poster ${announcement.title}`}
                  onError={() => setFailedPosterUrl(rawPoster || null)}
                  className="w-full max-h-72 object-contain mx-auto bg-[#F6F7FB]"
                />
                <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 rounded-full bg-[#111318]/85 text-white text-[10px] font-bold px-2.5 py-1 shadow-xs">
                  <Maximize2 className="w-3 h-3" strokeWidth={2} />
                  <span>Perbesar Poster</span>
                </span>
              </button>
            </div>
          )}

          {/* Full Announcement Content */}
          <div className="mt-5 space-y-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#6E7485]">
              Rincian Informasi
            </h5>
            <div className="bg-[#EEF1F6]/70 rounded-2xl p-4 border border-[#E4E7F0]/60">
              <p className="text-xs sm:text-[13px] text-[#111318] leading-relaxed whitespace-pre-line">
                {announcement.content}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 space-y-2.5 pt-2 border-t border-[#E4E7F0]">
            {(userRole === "pj" || userRole === "ketua_kelas") && (
              <Button
                type="button"
                variant="outline"
                disabled={isPinning}
                onClick={async () => {
                  setIsPinning(true)
                  try {
                    await togglePinAnnouncement(announcement.id)
                    onClose()
                  } finally {
                    setIsPinning(false)
                  }
                }}
                className="w-full min-h-[44px] rounded-full border-[#111318] bg-white text-[#111318] hover:bg-[#EEF1F6] font-bold text-xs flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
              >
                <Pin
                  className={`w-3.5 h-3.5 ${
                    announcement.is_pinned ? "fill-[#111318]" : ""
                  }`}
                />
                <span>
                  {isPinning
                    ? "Memperbarui sematan..."
                    : announcement.is_pinned
                    ? "Lepas Sematan (Unpin)"
                    : "Sematkan Info ini (Pin)"}
                </span>
              </Button>
            )}

            {safeSourceUrl ? (
              <a
                href={safeSourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[44px] rounded-full bg-[#111318] hover:bg-[#111318]/90 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
              >
                <span>Buka Sumber Resmi</span>
                <ExternalLink className="w-3.5 h-3.5" strokeWidth={2} />
              </a>
            ) : (
              <div className="w-full min-h-[44px] rounded-full bg-[#EEF1F6] text-[#6E7485] font-medium text-xs flex items-center justify-center">
                Sumber terverifikasi kelas
              </div>
            )}

            <Button
              type="button"
              variant="outline"
              onClick={handleCopyWhatsApp}
              className="w-full min-h-[44px] rounded-full border-[#E4E7F0] bg-white text-[#111318] hover:bg-[#EEF1F6] font-semibold text-xs flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#4CD98B]" strokeWidth={2.5} />
                  <span>Format WA Disalin!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#6E7485]" strokeWidth={2} />
                  <span>Salin Info untuk Grup WA</span>
                </>
              )}
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Immersive Zoomable Fullscreen Image Lightbox */}
      <ImageLightbox
        src={posterSrc}
        alt={`Poster penuh ${announcement.title}`}
        title={announcement.title}
        isOpen={isPosterZoomOpen}
        onClose={() => setIsPosterZoomOpen(false)}
      />
    </>
  )
}
