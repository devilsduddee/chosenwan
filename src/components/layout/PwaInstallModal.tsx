"use client"

import React, { useState } from "react"
import { usePwa } from "@/lib/pwa-context"
import { BrandLogo } from "@/components/layout/BrandLogo"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Share,
  PlusSquare,
  Sparkles,
  Download,
  MoreVertical,
  CheckCircle2,
  Smartphone,
  Check,
} from "lucide-react"

export function PwaInstallModal() {
  const { isModalOpen, closeModal, isIos, hasNativePrompt, triggerInstall, isStandalone } = usePwa()
  const [activeTab, setActiveTab] = useState<"ios" | "android">(isIos ? "ios" : "android")

  // Update tab when isIos changes
  React.useEffect(() => {
    setActiveTab(isIos ? "ios" : "android")
  }, [isIos])

  return (
    <Dialog open={isModalOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-md mx-auto rounded-[28px] p-5 sm:p-6 bg-white border border-[#E4E7F0] shadow-2xl overflow-hidden">
        <DialogHeader className="text-left space-y-2">
          <div className="flex items-center gap-3">
            <BrandLogo className="w-12 h-12 shrink-0" />
            <div className="min-w-0">
              <DialogTitle className="text-lg font-extrabold text-[#111318] tracking-tight">
                Pasang Aplikasi Chosenwan
              </DialogTitle>
              <DialogDescription className="text-xs text-[#6E7485] mt-0.5">
                Akses jadwal dan tugas langsung dari layar ponsel tanpa membuka browser.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {isStandalone ? (
          <div className="mt-4 p-4 rounded-[20px] bg-[#EEF1F6] border border-[#E4E7F0] text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#4CD98B]/20 text-[#111318] flex items-center justify-center mx-auto">
              <Check className="w-5 h-5 text-[#111318]" strokeWidth={2.5} />
            </div>
            <h4 className="text-sm font-bold text-[#111318]">Aplikasi Sudah Terpasang</h4>
            <p className="text-xs text-[#6E7485]">
              Anda sedang membuka Chosenwan dalam mode aplikasi PWA (Standalone).
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {/* Platform Selector Tabs */}
            <div className="grid grid-cols-2 p-1 rounded-2xl bg-[#EEF1F6] border border-[#E4E7F0]">
              <button
                type="button"
                onClick={() => setActiveTab("ios")}
                className={`min-h-[38px] rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === "ios"
                    ? "bg-white text-[#111318] shadow-xs"
                    : "text-[#6E7485] hover:text-[#111318]"
                }`}
              >
                <span>iPhone (Safari)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("android")}
                className={`min-h-[38px] rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === "android"
                    ? "bg-white text-[#111318] shadow-xs"
                    : "text-[#6E7485] hover:text-[#111318]"
                }`}
              >
                <span>Android & Komputer</span>
              </button>
            </div>

            {/* iOS Guides */}
            {activeTab === "ios" && (
              <div className="space-y-2.5 animate-in fade-in duration-200">
                <div className="flex items-start gap-3 p-3 rounded-[18px] bg-[#F6F7FB] border border-[#E4E7F0]">
                  <div className="w-7 h-7 rounded-full bg-[#111318] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    1
                  </div>
                  <div className="text-xs space-y-0.5">
                    <p className="font-bold text-[#111318] flex items-center gap-1.5">
                      Buka Safari dan ketuk Bagikan
                      <Share className="w-3.5 h-3.5 text-[#111318]" />
                    </p>
                    <p className="text-[#6E7485] leading-relaxed">
                      Buka halaman ini di Safari, lalu ketuk ikon <strong>Bagikan</strong> di bilah bawah layar.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-[18px] bg-[#F6F7FB] border border-[#E4E7F0]">
                  <div className="w-7 h-7 rounded-full bg-[#111318] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    2
                  </div>
                  <div className="text-xs space-y-0.5">
                    <p className="font-bold text-[#111318] flex items-center gap-1.5">
                      Pilih Tambahkan ke Layar Utama
                      <PlusSquare className="w-3.5 h-3.5 text-[#111318]" />
                    </p>
                    <p className="text-[#6E7485] leading-relaxed">
                      Gulir ke bawah pada menu opsi, lalu pilih <strong>Tambahkan ke Layar Utama</strong> (Add to Home Screen).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-[18px] bg-[#F6F7FB] border border-[#E4E7F0]">
                  <div className="w-7 h-7 rounded-full bg-[#111318] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    3
                  </div>
                  <div className="text-xs space-y-0.5">
                    <p className="font-bold text-[#111318] flex items-center gap-1.5">
                      Konfirmasi Tambah
                      <Sparkles className="w-3.5 h-3.5 text-[#F6C866]" />
                    </p>
                    <p className="text-[#6E7485] leading-relaxed">
                      Ketuk <strong>Tambah</strong> di pojok kanan atas. Ikon Chosenwan akan muncul di layar utama ponsel.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Android / PC Guides */}
            {activeTab === "android" && (
              <div className="space-y-2.5 animate-in fade-in duration-200">
                {hasNativePrompt && (
                  <Button
                    type="button"
                    onClick={triggerInstall}
                    className="w-full min-h-[46px] rounded-full bg-[#111318] text-white text-xs font-extrabold hover:bg-[#111318]/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>Pasang Aplikasi Langsung</span>
                  </Button>
                )}

                <div className="flex items-start gap-3 p-3 rounded-[18px] bg-[#F6F7FB] border border-[#E4E7F0]">
                  <div className="w-7 h-7 rounded-full bg-[#111318] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    1
                  </div>
                  <div className="text-xs space-y-0.5">
                    <p className="font-bold text-[#111318] flex items-center gap-1.5">
                      Buka menu peramban Chrome
                      <MoreVertical className="w-3.5 h-3.5 text-[#111318]" />
                    </p>
                    <p className="text-[#6E7485] leading-relaxed">
                      Ketuk menu titik tiga (<strong>⋮</strong>) di pojok kanan atas Chrome.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-[18px] bg-[#F6F7FB] border border-[#E4E7F0]">
                  <div className="w-7 h-7 rounded-full bg-[#111318] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    2
                  </div>
                  <div className="text-xs space-y-0.5">
                    <p className="font-bold text-[#111318] flex items-center gap-1.5">
                      Pilih Install Aplikasi
                      <Smartphone className="w-3.5 h-3.5 text-[#111318]" />
                    </p>
                    <p className="text-[#6E7485] leading-relaxed">
                      Pilih opsi <strong>Install Aplikasi</strong> atau <strong>Tambahkan ke Layar Utama</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-[18px] bg-[#F6F7FB] border border-[#E4E7F0]">
                  <div className="w-7 h-7 rounded-full bg-[#111318] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    3
                  </div>
                  <div className="text-xs space-y-0.5">
                    <p className="font-bold text-[#111318] flex items-center gap-1.5">
                      Buka dari layar ponsel
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#4CD98B]" />
                    </p>
                    <p className="text-[#6E7485] leading-relaxed">
                      Aplikasi siap dibuka layar penuh tanpa bilah browser.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="pt-2 border-t border-[#E4E7F0]/80 flex items-center justify-between text-[11px] text-[#6E7485]">
          <span>Hemat memori dan otomatis terbarui</span>
          <button
            type="button"
            onClick={closeModal}
            className="font-bold text-[#111318] hover:underline cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
