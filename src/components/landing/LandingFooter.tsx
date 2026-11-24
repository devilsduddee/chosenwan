import React from "react"
import Link from "next/link"
import { BrandLogo } from "@/components/layout/BrandLogo"
import { ArrowRight } from "lucide-react"

export function LandingFooter() {
  return (
    <footer className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 pb-12 space-y-10">
      {/* Final CTA Bento Banner */}
      <div className="bg-[#111318] text-white rounded-[24px] p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-lg">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Butuh cek tugas atau ruang kuliah hari ini?
          </h2>
          <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
            Buka portal Chosenwan langsung dari browser untuk mengecek deadline terdekat atau
            memperbarui info kelas.
          </p>
        </div>

        <Link
          href="/portal?tab=schedule"
          className="min-h-[48px] px-6 rounded-full bg-[#F6C866] text-[#111318] text-sm font-extrabold inline-flex items-center justify-center gap-2 hover:bg-[#F6C866]/90 active:scale-[0.98] transition-all shrink-0 w-full sm:w-auto"
        >
          <span>Buka Portal Kelas</span>
          <ArrowRight className="w-4 h-4" strokeWidth={2.2} />
        </Link>
      </div>

      {/* Minimal Bottom Bar */}
      <div className="pt-6 border-t border-[#E4E7F0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <BrandLogo className="w-7 h-7" />
          <div className="text-xs">
            <span className="font-extrabold text-[#111318]">Chosenwan</span>
            <span className="text-[#6E7485]"> · Portal Informasi Kelas</span>
          </div>
        </div>

        <div className="flex items-center gap-5 text-xs font-semibold text-[#6E7485]">
          <Link href="/portal?tab=schedule" className="hover:text-[#111318] transition-colors">
            Portal Mahasiswa
          </Link>
          <Link href="/login" className="hover:text-[#111318] transition-colors">
            Masuk Publisher
          </Link>
        </div>
      </div>
    </footer>
  )
}
