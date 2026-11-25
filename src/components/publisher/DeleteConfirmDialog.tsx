"use client"

import React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Trash2, Loader2 } from "lucide-react"

interface DeleteConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void | Promise<void>
  title: string
  itemType: "tugas" | "pengumuman" | "jadwal" | "matkul" | "akun"
  isDeleting?: boolean
}

const ITEM_TYPE_LABEL = {
  tugas: "Tugas",
  pengumuman: "Pengumuman",
  jadwal: "Slot Jadwal",
  matkul: "Mata Kuliah",
  akun: "Akun",
} as const

export function DeleteConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  itemType,
  isDeleting = false,
}: DeleteConfirmDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && !isDeleting && onClose()}>
      <DialogContent className="max-w-sm mx-auto rounded-[24px] p-6 bg-white border border-[#E4E7F0] shadow-xl">
        <DialogHeader className="text-left space-y-2.5">
          <div className="w-11 h-11 rounded-2xl bg-[#F05252]/10 text-[#F05252] flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" strokeWidth={2} />
          </div>
          <DialogTitle className="text-base font-bold text-[#111318]">
            Hapus {ITEM_TYPE_LABEL[itemType]}?
          </DialogTitle>
          <DialogDescription className="text-xs text-[#6E7485] leading-relaxed">
            Apakah kamu yakin ingin menghapus{" "}
            <strong className="text-[#111318]">&ldquo;{title}&rdquo;</strong>?
            Tindakan ini tidak dapat dibatalkan.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4 flex flex-row gap-2 justify-end">
          <Button
            type="button"
            variant="outline"
            disabled={isDeleting}
            onClick={onClose}
            className="flex-1 min-h-[44px] rounded-full border-[#E4E7F0] bg-white text-[#111318] hover:bg-[#EEF1F6] text-xs font-semibold disabled:opacity-60"
          >
            Batal
          </Button>
          <Button
            type="button"
            disabled={isDeleting}
            onClick={onConfirm}
            className="flex-1 min-h-[44px] rounded-full bg-[#F05252] hover:bg-[#F05252]/90 text-white text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 disabled:opacity-60"
          >
            {isDeleting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Trash2 className="w-3.5 h-3.5" strokeWidth={2} />
            )}
            <span>{isDeleting ? "Menghapus..." : "Ya, Hapus"}</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
