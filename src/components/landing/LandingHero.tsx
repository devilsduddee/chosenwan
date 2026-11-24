import React from "react"
import Link from "next/link"
import { BrandLogo } from "@/components/layout/BrandLogo"
import {
  ArrowRight,
  CheckSquare,
  AlertCircle,
  Megaphone,
  Trophy,
  Clock,
  ArrowUpRight,
  User,
} from "lucide-react"

export function LandingHero() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-14 sm:pt-14 sm:pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* Left Copy & CTA */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 bg-white border border-[#E4E7F0] px-3 py-1.5 rounded-full text-xs font-semibold text-[#111318] shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#4CD98B] shrink-0" />
            <span>Portal Kelas</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#111318] tracking-[-0.03em] leading-[1.12]">
            Cari tugas dan jadwal kuliah tanpa menggali grup WhatsApp.
          </h1>

          <p className="text-sm sm:text-base text-[#6E7485] leading-relaxed max-w-xl">
            Mahasiswa langsung cek deadline tugas, info pindah ruang, berita kampus, dan info lomba
            tanpa login. Ketua kelas dan PJ mata kuliah bisa simpan draft atau langsung terbitkan.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
            <Link
              href="/portal?tab=schedule"
              className="min-h-[48px] px-6 rounded-full bg-[#111318] text-white text-sm font-bold inline-flex items-center justify-center gap-2 hover:bg-[#111318]/90 active:scale-[0.98] transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111318] focus-visible:ring-offset-2"
            >
              <span>Buka Jadwal & Portal</span>
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </Link>

            <a
              href="#alur-kerja"
              className="min-h-[48px] px-6 rounded-full bg-white border border-[#E4E7F0] text-[#111318] text-sm font-bold inline-flex items-center justify-center hover:bg-[#EEF1F6] active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111318]"
            >
              Lihat Alur Pakai
            </a>
          </div>

          <p className="text-xs font-medium text-[#6E7485] pt-1">
            Bisa dibuka langsung tanpa akun mahasiswa. Tugas disaring per mata kuliah dan status deadline.
          </p>
        </div>

        {/* Right: Authentic Playful Bento Portal Preview */}
        <div className="lg:col-span-6">
          <div className="bg-white rounded-[28px] border border-[#E4E7F0] p-4 sm:p-5 shadow-[0_18px_50px_rgba(17,19,24,0.06)] max-w-md mx-auto lg:ml-auto space-y-3.5">
            {/* Preview Top Bar */}
            <div className="flex items-center justify-between pb-2.5 border-b border-[#E4E7F0]/70">
              <div className="flex items-center gap-2">
                <BrandLogo className="w-8 h-8" />
                <div>
                  <p className="text-xs font-extrabold text-[#111318] leading-none">Chosenwan</p>
                  <p className="text-[10px] text-[#6E7485] mt-0.5">Portal Informasi Kelas</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#EEF1F6] text-[10px] font-bold text-[#111318]">
                <User className="w-3 h-3 text-[#6E7485]" strokeWidth={1.75} />
                Mahasiswa
              </span>
            </div>

            {/* Preview 2x2 Bento Summary Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-[#EEF1F6] p-3 rounded-[18px] border border-[#E4E7F0] flex flex-col justify-between min-h-[88px]">
                <div className="flex items-center justify-between">
                  <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shadow-2xs">
                    <CheckSquare className="w-3.5 h-3.5 text-[#111318]" strokeWidth={2} />
                  </div>
                  <span className="text-[9px] font-bold uppercase text-[#6E7485] bg-white px-2 py-0.5 rounded-full">
                    Semua
                  </span>
                </div>
                <div className="mt-2">
                  <p className="text-[10px] font-semibold text-[#6E7485]">Semua Tugas</p>
                  <p className="text-xl font-extrabold text-[#111318] leading-none mt-0.5 tabular-nums">4</p>
                </div>
              </div>

              <div className="bg-[#F6C866] p-3 rounded-[18px] flex flex-col justify-between min-h-[88px] text-[#111318]">
                <div className="flex items-center justify-between">
                  <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shadow-2xs">
                    <AlertCircle className="w-3.5 h-3.5 text-[#111318]" strokeWidth={2.2} />
                  </div>
                  <span className="text-[9px] font-bold uppercase bg-[#111318] text-white px-2 py-0.5 rounded-full">
                    Hari Ini
                  </span>
                </div>
                <div className="mt-2">
                  <p className="text-[10px] font-bold text-[#111318]/85">Tugas Mendesak</p>
                  <p className="text-xl font-extrabold text-[#111318] leading-none mt-0.5 tabular-nums">1</p>
                </div>
              </div>

              <div className="bg-[#A8C0FF] p-3 rounded-[18px] flex flex-col justify-between min-h-[88px] text-[#111318]">
                <div className="flex items-center justify-between">
                  <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shadow-2xs">
                    <Megaphone className="w-3.5 h-3.5 text-[#111318]" strokeWidth={2} />
                  </div>
                  <span className="inline-flex items-center gap-0.5 text-[9px] font-bold bg-white/90 px-1.5 py-0.5 rounded-full">
                    Info <ArrowUpRight className="w-2.5 h-2.5" />
                  </span>
                </div>
                <div className="mt-2">
                  <p className="text-[10px] font-bold text-[#111318]/85">Berita Kampus</p>
                  <p className="text-xl font-extrabold text-[#111318] leading-none mt-0.5 tabular-nums">1</p>
                </div>
              </div>

              <div className="bg-[#EA9DFB] p-3 rounded-[18px] flex flex-col justify-between min-h-[88px] text-[#111318]">
                <div className="flex items-center justify-between">
                  <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shadow-2xs">
                    <Trophy className="w-3.5 h-3.5 text-[#111318]" strokeWidth={2} />
                  </div>
                  <span className="inline-flex items-center gap-0.5 text-[9px] font-bold bg-white/90 px-1.5 py-0.5 rounded-full">
                    Lomba <ArrowUpRight className="w-2.5 h-2.5" />
                  </span>
                </div>
                <div className="mt-2">
                  <p className="text-[10px] font-bold text-[#111318]/85">Info Lomba</p>
                  <p className="text-xl font-extrabold text-[#111318] leading-none mt-0.5 tabular-nums">1</p>
                </div>
              </div>
            </div>

            {/* Preview Dark Urgent Anchor Card */}
            <div className="bg-[#111318] text-white rounded-[18px] p-3.5 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold bg-[#A8C0FF] text-[#111318] px-2 py-0.5 rounded-full">
                  IMK
                </span>
                <span className="inline-flex items-center gap-1 bg-[#F05252] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  <Clock className="w-2.5 h-2.5" strokeWidth={2.5} />
                  Hari Ini
                </span>
              </div>
              <p className="text-xs font-bold leading-snug">
                Tugas 3: Perancangan UI Mobile High-Fidelity
              </p>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px]">
                <span className="text-white/65">Tenggat: 23:59 WIB</span>
                <span className="text-[#F6C866] font-semibold">Buka Detail →</span>
              </div>
            </div>

            {/* Direct interactive CTA inside preview */}
            <Link
              href="/portal"
              className="w-full min-h-[42px] rounded-full bg-[#EEF1F6] hover:bg-[#E4E7F0] text-[#111318] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Buka Portal Sekarang</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
