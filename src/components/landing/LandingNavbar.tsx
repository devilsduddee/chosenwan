import React from "react"
import Link from "next/link"
import { BrandLogo } from "@/components/layout/BrandLogo"
import { ArrowRight, LogIn } from "lucide-react"

export function LandingNavbar() {
  return (
    <header className="sticky top-0 z-40 bg-[#F6F7FB]/90 backdrop-blur-md border-b border-[#E4E7F0]/70 pt-[env(safe-area-inset-top,0px)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111318] rounded-xl"
        >
          <BrandLogo className="w-9 h-9" />
          <div className="min-w-0">
            <span className="block text-sm sm:text-base font-extrabold text-[#111318] tracking-tight leading-tight truncate">
              Chosenwan
            </span>
            <span className="block text-[10px] sm:text-[11px] font-medium text-[#6E7485] leading-none mt-0.5 truncate">
              Portal Informasi Kelas
            </span>
          </div>
        </Link>

        <nav aria-label="Navigasi Beranda" className="hidden sm:flex items-center gap-6">
          <a
            href="#fitur"
            className="text-xs font-semibold text-[#6E7485] hover:text-[#111318] transition-colors py-2"
          >
            Fitur Utama
          </a>
          <a
            href="#alur-kerja"
            className="text-xs font-semibold text-[#6E7485] hover:text-[#111318] transition-colors py-2"
          >
            Cara Kerja
          </a>
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/login"
            aria-label="Masuk Publisher"
            title="Masuk Publisher"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-white hover:bg-[#EEF1F6] border border-[#E4E7F0]/80 text-[#6E7485] hover:text-[#111318] transition-all active:scale-95 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111318]"
          >
            <LogIn className="w-4 h-4" strokeWidth={1.75} />
          </Link>

          <Link
            href="/portal?tab=schedule"
            className="min-h-[40px] h-10 px-4 rounded-full bg-[#111318] text-white text-xs font-bold inline-flex items-center gap-1.5 hover:bg-[#111318]/90 active:scale-[0.97] transition-all shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111318] focus-visible:ring-offset-2"
          >
            <span>Buka Portal</span>
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </header>
  )
}
