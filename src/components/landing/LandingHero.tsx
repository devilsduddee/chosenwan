"use client"

import React from "react"
import Link from "next/link"
import { BrandLogo } from "@/components/layout/BrandLogo"
import { usePwa } from "@/lib/pwa-context"
import {
  ArrowRight,
  CheckSquare,
  AlertCircle,
  Megaphone,
  Trophy,
  Clock,
  ArrowUpRight,
  User,
  Smartphone,
  Lock,
} from "lucide-react"

export function LandingHero() {
  const { isStandalone, triggerInstall, openModal } = usePwa()

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-12 pb-14 sm:pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Column: Copy & Actions */}
        <div className="lg:col-span-7 space-y-6">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 bg-white border border-[#E4E7F0] px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#111318] shadow-2xs hover:border-[#111318]/25 transition-colors">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4CD98B] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4CD98B]" />
            </span>
            <span className="font-bold text-[#111318]">Portal Kelas 3IA01</span>
            <span className="text-[#D3D8E2]">·</span>
            <span className="text-[#6E7485] font-medium">Universitas Gunadarma</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#111318] tracking-[-0.035em] leading-[1.14]">
            Cari tugas dan jadwal kuliah tanpa menggali grup WhatsApp.
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-[17px] text-[#6E7485] leading-relaxed max-w-xl font-normal">
            Cek jadwal kuliah dan info kampus seketika tanpa login. Akses tugas serta tautan
            pengumpulan diamankan khusus untuk mahasiswa kelas 3IA01.
          </p>

          {/* Action CTAs & Secondary Links */}
          <div className="space-y-3.5 pt-1">
            {/* Action Buttons Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/portal?tab=schedule"
                className="min-h-[48px] h-12 px-6 rounded-full bg-[#111318] hover:bg-[#111318]/90 text-white text-sm font-bold inline-flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-transform duration-150 whitespace-nowrap cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111318] focus-visible:ring-offset-2"
              >
                <span>Buka Jadwal & Portal</span>
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Link>

              {!isStandalone && (
                <button
                  type="button"
                  onClick={triggerInstall}
                  className="min-h-[48px] h-12 px-5 rounded-full bg-white hover:bg-[#EEF1F6] border border-[#E4E7F0] text-[#111318] text-sm font-bold inline-flex items-center justify-center gap-2 shadow-2xs active:scale-[0.98] transition-transform duration-150 whitespace-nowrap cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111318]"
                >
                  <Smartphone className="w-4 h-4 text-[#111318]" strokeWidth={2} />
                  <span>Pasang Aplikasi di HP</span>
                </button>
              )}
            </div>

            {/* Helper row */}
            <div className="flex items-center gap-2.5 flex-wrap text-xs text-[#6E7485]">
              <a
                href="#alur-kerja"
                className="inline-flex items-center gap-1 font-bold text-[#111318] hover:text-[#4CD98B] transition-colors"
              >
                <span>Lihat alur pakai</span>
                <ArrowRight className="w-3 h-3" />
              </a>
              <span className="text-[#D3D8E2]">·</span>
              <span className="font-semibold text-[#111318]">Jadwal Publik</span>
              <span className="text-[#D3D8E2]">·</span>
              <span className="inline-flex items-center gap-1 text-[#111318]/90">
                <Lock className="w-3 h-3 text-[#6E7485]" />
                Tugas Privat Kelas
              </span>
              {!isStandalone && (
                <>
                  <span className="text-[#D3D8E2]">·</span>
                  <button
                    type="button"
                    onClick={openModal}
                    className="text-[#6E7485] hover:text-[#111318] font-medium underline underline-offset-2 transition-colors cursor-pointer"
                  >
                    Panduan Pasang iOS & Android
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Authentic Playful Bento Window Preview */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-[26px] border border-[#E4E7F0] p-4 sm:p-5 shadow-[0_16px_40px_rgba(17,19,24,0.06)] max-w-[420px] mx-auto lg:ml-auto space-y-3.5">
            {/* Window Top Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E4E7F0]/70">
              <div className="flex items-center gap-2.5 min-w-0">
                <BrandLogo className="w-8 h-8 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-extrabold text-[#111318] leading-none truncate">Chosenwan</p>
                  <p className="text-[10px] text-[#6E7485] mt-0.5 truncate">Portal Informasi Kelas 3IA01</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#EEF1F6] text-[10px] font-bold text-[#111318] shrink-0">
                <User className="w-3 h-3 text-[#6E7485]" strokeWidth={1.75} />
                Mahasiswa
              </span>
            </div>

            {/* 2x2 Bento Metric Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {/* Metric 1: Semua Tugas */}
              <div className="bg-[#EEF1F6] p-3 rounded-[18px] border border-[#E4E7F0]/60 flex flex-col justify-between min-h-[92px] hover:-translate-y-0.5 transition-transform duration-200">
                <div className="flex items-center justify-between">
                  <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shadow-2xs">
                    <CheckSquare className="w-3.5 h-3.5 text-[#111318]" strokeWidth={2} />
                  </div>
                  <span className="text-[9px] font-extrabold uppercase text-[#6E7485] bg-white px-2 py-0.5 rounded-full shadow-2xs">
                    Semua
                  </span>
                </div>
                <div className="mt-2">
                  <p className="text-[10px] font-bold text-[#6E7485]">Semua Tugas</p>
                  <p className="text-xl font-extrabold text-[#111318] leading-none mt-0.5 tabular-nums">4</p>
                </div>
              </div>

              {/* Metric 2: Tugas Mendesak */}
              <div className="bg-[#F6C866] p-3 rounded-[18px] flex flex-col justify-between min-h-[92px] text-[#111318] hover:-translate-y-0.5 transition-transform duration-200">
                <div className="flex items-center justify-between">
                  <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shadow-2xs">
                    <AlertCircle className="w-3.5 h-3.5 text-[#111318]" strokeWidth={2.2} />
                  </div>
                  <span className="text-[9px] font-extrabold uppercase bg-[#111318] text-white px-2 py-0.5 rounded-full">
                    Hari Ini
                  </span>
                </div>
                <div className="mt-2">
                  <p className="text-[10px] font-bold text-[#111318]/85">Tugas Mendesak</p>
                  <p className="text-xl font-extrabold text-[#111318] leading-none mt-0.5 tabular-nums">1</p>
                </div>
              </div>

              {/* Metric 3: Berita Kampus */}
              <div className="bg-[#A8C0FF] p-3 rounded-[18px] flex flex-col justify-between min-h-[92px] text-[#111318] hover:-translate-y-0.5 transition-transform duration-200">
                <div className="flex items-center justify-between">
                  <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shadow-2xs">
                    <Megaphone className="w-3.5 h-3.5 text-[#111318]" strokeWidth={2} />
                  </div>
                  <span className="inline-flex items-center gap-0.5 text-[9px] font-extrabold bg-white/90 px-1.5 py-0.5 rounded-full">
                    Info <ArrowUpRight className="w-2.5 h-2.5" />
                  </span>
                </div>
                <div className="mt-2">
                  <p className="text-[10px] font-bold text-[#111318]/85">Berita Kampus</p>
                  <p className="text-xl font-extrabold text-[#111318] leading-none mt-0.5 tabular-nums">1</p>
                </div>
              </div>

              {/* Metric 4: Info Lomba */}
              <div className="bg-[#EA9DFB] p-3 rounded-[18px] flex flex-col justify-between min-h-[92px] text-[#111318] hover:-translate-y-0.5 transition-transform duration-200">
                <div className="flex items-center justify-between">
                  <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shadow-2xs">
                    <Trophy className="w-3.5 h-3.5 text-[#111318]" strokeWidth={2} />
                  </div>
                  <span className="inline-flex items-center gap-0.5 text-[9px] font-extrabold bg-white/90 px-1.5 py-0.5 rounded-full">
                    Lomba <ArrowUpRight className="w-2.5 h-2.5" />
                  </span>
                </div>
                <div className="mt-2">
                  <p className="text-[10px] font-bold text-[#111318]/85">Info Lomba</p>
                  <p className="text-xl font-extrabold text-[#111318] leading-none mt-0.5 tabular-nums">1</p>
                </div>
              </div>
            </div>

            {/* Urgent Task Card (Dark Anchor) */}
            <div className="bg-[#111318] text-white rounded-[20px] p-3.5 space-y-2.5 hover:-translate-y-0.5 transition-transform duration-200">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-extrabold bg-[#A8C0FF] text-[#111318] px-2 py-0.5 rounded-full">
                    IMK
                  </span>
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold text-white/75 bg-white/10 px-2 py-0.5 rounded-full">
                    <Lock className="w-2.5 h-2.5 text-white/60" />
                    Khusus Anggota
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 bg-[#F05252] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  <Clock className="w-2.5 h-2.5" strokeWidth={2.5} />
                  Hari Ini
                </span>
              </div>
              <p className="text-xs font-bold leading-snug line-clamp-2">
                Tugas 3: Perancangan UI Mobile High-Fidelity
              </p>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px]">
                <span className="text-white/65">Tenggat: 23:59 WIB</span>
                <span className="text-[#F6C866] font-semibold flex items-center gap-1">
                  Buka Detail <ArrowRight className="w-2.5 h-2.5" />
                </span>
              </div>
            </div>

            {/* Direct Interactive CTA */}
            <Link
              href="/portal?tab=schedule"
              className="w-full min-h-[44px] h-11 rounded-full bg-[#EEF1F6] hover:bg-[#E4E7F0] text-[#111318] text-xs font-bold flex items-center justify-center gap-2 transition-transform duration-150 active:scale-[0.98] select-none"
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
