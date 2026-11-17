"use client"

import React, { useState } from "react"
import { useMockStore } from "@/lib/mock-store"
import { useCurrentTime } from "@/lib/use-current-time"
import { formatIndonesianDate, formatIndonesianTime } from "@/lib/date-utils"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import {
  Calendar,
  ExternalLink,
  Check,
  Share2,
} from "lucide-react"

export function TaskDetailSheet() {
  const { selectedTaskForDetail, setSelectedTaskForDetail } = useMockStore()
  const { now, mounted } = useCurrentTime()
  const [copied, setCopied] = useState(false)

  if (!selectedTaskForDetail) return null

  const task = selectedTaskForDetail
  const dueDate = new Date(task.due_date)
  const isPast = mounted && now > 0 ? dueDate.getTime() < now : false
  const diffHours = mounted && now > 0 ? Math.round((dueDate.getTime() - now) / (1000 * 3600)) : 48

  const formattedDate = formatIndonesianDate(dueDate, {
    showDayName: true,
    showYear: true,
  })
  const formattedTime = formatIndonesianTime(dueDate)

  const handleCopyWhatsApp = () => {
    const text = `📢 *TUGAS KELAS: ${task.course?.name || task.course?.code}*\n` +
      `📌 *Judul:* ${task.title}\n` +
      (task.week_number ? `🗓 *Minggu ke:* ${task.week_number}\n` : "") +
      `⏰ *Deadline:* ${formattedDate}, ${formattedTime} WIB\n` +
      `📝 *Instruksi:*\n${task.instructions}\n` +
      (task.submission_url ? `🔗 *Link Pengumpulan:* ${task.submission_url}\n` : "") +
      `\n_Info via Chosenwan Portal_`

    navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success("Format pesan berhasil disalin untuk WhatsApp!")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Sheet
      open={!!selectedTaskForDetail}
      onOpenChange={(open) => !open && setSelectedTaskForDetail(null)}
    >
      <SheetContent
        side="bottom"
        className="max-w-md mx-auto rounded-t-[32px] p-6 max-h-[90vh] overflow-y-auto bg-white border-t border-[#E4E7F0] shadow-2xl"
      >
        <SheetHeader className="text-left space-y-2">
          {/* Top badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold bg-[#A8C0FF] text-[#111318] px-3 py-1 rounded-full">
              {task.course?.code} — {task.course?.name}
            </span>
            {task.week_number && (
              <span className="text-xs font-semibold bg-[#EEF1F6] text-[#6E7485] px-2.5 py-1 rounded-full">
                Pertemuan {task.week_number}
              </span>
            )}
            {isPast ? (
              <span className="text-xs font-bold bg-[#EEF1F6] text-[#6E7485] px-2.5 py-1 rounded-full">
                Tenggat Lewat
              </span>
            ) : diffHours <= 24 ? (
              <span className="text-xs font-bold bg-[#F05252] text-white px-2.5 py-1 rounded-full">
                Mendesak (~{diffHours} Jam)
              </span>
            ) : (
              <span className="text-xs font-bold bg-[#4CD98B] text-[#111318] px-2.5 py-1 rounded-full">
                Aman
              </span>
            )}
          </div>

          <SheetTitle className="text-lg font-extrabold text-[#111318] leading-snug">
            {task.title}
          </SheetTitle>
          <SheetDescription className="sr-only">
            Detail rincian instruksi tugas dan batas waktu pengumpulan
          </SheetDescription>
        </SheetHeader>

        {/* Deadline Information Box */}
        <div className="mt-4 bg-[#F6F7FB] border border-[#E4E7F0] rounded-2xl p-3.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white border border-[#E4E7F0] flex items-center justify-center text-[#111318] shrink-0">
              <Calendar className="w-4 h-4" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-[11px] text-[#6E7485] font-medium">Batas Waktu</p>
              <p className="font-bold text-[#111318] text-xs leading-tight" suppressHydrationWarning>
                {formattedDate}
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-[#6E7485] font-medium block">Pukul</span>
            <span className="font-bold text-[#111318] text-xs" suppressHydrationWarning>
              {formattedTime} WIB
            </span>
          </div>
        </div>

        {/* Detailed Instructions */}
        <div className="mt-5 space-y-2">
          <h5 className="text-xs font-bold uppercase tracking-wider text-[#6E7485]">
            Instruksi & Rincian Tugas
          </h5>
          <div className="bg-[#EEF1F6]/70 rounded-2xl p-4 border border-[#E4E7F0]/60">
            <p className="text-xs text-[#111318] leading-relaxed whitespace-pre-line">
              {task.instructions}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-2.5 pt-2 border-t border-[#E4E7F0]">
          {task.submission_url ? (
            <a
              href={task.submission_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[44px] rounded-full bg-[#111318] hover:bg-[#111318]/90 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
            >
              <span>Buka Link Pengumpulan</span>
              <ExternalLink className="w-3.5 h-3.5" strokeWidth={2} />
            </a>
          ) : (
            <div className="w-full min-h-[44px] rounded-full bg-[#EEF1F6] text-[#6E7485] font-medium text-xs flex items-center justify-center">
              Belum ada tautan pengumpulan dari dosen
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
                <span>Salin Ringkasan untuk Grup WA</span>
              </>
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
