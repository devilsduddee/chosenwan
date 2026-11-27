"use client"

import React from "react"
import { Trophy, Calendar, ShieldCheck, Pin, Lock } from "lucide-react"
import { BlurFade } from "@/components/magicui/blur-fade"
import { BorderBeam } from "@/components/magicui/border-beam"

export function LandingFeatures() {
  const days = [
    { label: "Sen", hasClass: true, active: false },
    { label: "Sel", hasClass: true, active: true },
    { label: "Rab", hasClass: false, active: false },
    { label: "Kam", hasClass: true, active: false },
    { label: "Jum", hasClass: false, active: false },
    { label: "Sab", hasClass: false, active: false },
  ]

  return (
    <section id="fitur" className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 border-t border-[#E4E7F0]/80">
      <BlurFade delay={0.05} className="max-w-2xl space-y-2 mb-6 sm:mb-10">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#6E7485]">
          Pilar Fungsional
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111318] tracking-tight">
          Akses jadwal publik instan, tugas kelas privat & terproteksi.
        </h2>
        <p className="text-sm sm:text-base text-[#6E7485] leading-relaxed">
          Dirancang sesuai PRD v1.6 dengan model dua lapis: jadwal dan info kampus terbuka untuk siapa saja,
          sementara tugas dan tautan pengumpulan diamankan khusus bagi anggota kelas.
        </p>
      </BlurFade>

      {/* Bento Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-3.5 sm:gap-4">
        {/* Card 1: Dark Anchor - Tugas Kelas Privat & Gated */}
        <BlurFade delay={0.08} className="md:col-span-2 flex">
          <div className="w-full relative overflow-hidden bg-[#111318] text-white rounded-[22px] sm:rounded-[24px] p-4.5 sm:p-6 flex flex-col justify-between gap-5 sm:gap-6 shadow-sm hover:-translate-y-0.5 transition-transform duration-200">
            <BorderBeam size={72} duration={11} colorFrom="#F6C866" colorTo="#A8C0FF" borderWidth={1.5} />
            <div className="flex items-center justify-between gap-2">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#F6C866] text-[#111318] flex items-center justify-center shadow-2xs shrink-0">
                <Lock className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
              </div>
              <span className="shrink-0 whitespace-nowrap text-[10px] font-extrabold uppercase tracking-wider bg-[#F05252] text-white px-2.5 py-1 rounded-full">
                Khusus Anggota
              </span>
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <h3 className="text-sm sm:text-base font-bold leading-snug">
                Daftar tugas & tautan pengumpulan privat
              </h3>
              <p className="text-xs text-white/75 leading-relaxed">
                Instruksi pengerjaan dan link Google Drive/LMS diamankan di balik login kelas agar
                kerahasiaan tugas dan link pengumpulan kelas tidak diakses pihak luar.
              </p>
            </div>
          </div>
        </BlurFade>

        {/* Card 2: Periwinkle - Info Akademik & Sematkan Info Penting */}
        <BlurFade delay={0.14} className="md:col-span-2 flex">
          <div className="w-full bg-[#A8C0FF] text-[#111318] rounded-[22px] sm:rounded-[24px] p-4.5 sm:p-6 flex flex-col justify-between gap-5 sm:gap-6 hover:-translate-y-0.5 transition-transform duration-200">
            <div className="flex items-center justify-between gap-2">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white text-[#111318] flex items-center justify-center shadow-2xs shrink-0">
                <Pin className="w-4 h-4 sm:w-5 sm:h-5 text-[#111318]" strokeWidth={2} />
              </div>
              <span className="shrink-0 whitespace-nowrap text-[10px] font-extrabold uppercase tracking-wider bg-white/90 text-[#111318] px-2.5 py-1 rounded-full shadow-2xs">
                Pin & Akademik
              </span>
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <h3 className="text-sm sm:text-base font-bold leading-snug">
                Pengumuman dosen & sematkan info UTS
              </h3>
              <p className="text-xs text-[#111318]/85 leading-relaxed">
                Info pindah ruang, kelas pengganti, atau pengumuman darurat dapat disematkan (pin)
                di posisi teratas feed agar langsung terlihat oleh seluruh mahasiswa.
              </p>
            </div>
          </div>
        </BlurFade>

        {/* Card 3: Orchid Lilac - Berita Kampus & Info Lomba */}
        <BlurFade delay={0.2} className="md:col-span-2 flex">
          <div className="w-full bg-[#EA9DFB] text-[#111318] rounded-[22px] sm:rounded-[24px] p-4.5 sm:p-6 flex flex-col justify-between gap-5 sm:gap-6 hover:-translate-y-0.5 transition-transform duration-200">
            <div className="flex items-center justify-between gap-2">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white text-[#111318] flex items-center justify-center shadow-2xs shrink-0">
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-[#111318]" strokeWidth={2} />
              </div>
              <span className="shrink-0 whitespace-nowrap text-[10px] font-extrabold uppercase tracking-wider bg-white/90 text-[#111318] px-2.5 py-1 rounded-full shadow-2xs">
                Poster CDN
              </span>
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <h3 className="text-sm sm:text-base font-bold leading-snug">
                Berita kampus & info lomba berposter
              </h3>
              <p className="text-xs text-[#111318]/85 leading-relaxed">
                Info kompetisi dan kabar kampus dilengkapi poster visual beresolusi tinggi yang
                dioptimasi via ImageKit CDN dan tautan ke sumber resmi Instagram/portal kampus.
              </p>
            </div>
          </div>
        </BlurFade>

        {/* Card 4: White - Jadwal Kuliah Statis Publik */}
        <BlurFade delay={0.26} className="md:col-span-3 flex">
          <div className="w-full bg-white border border-[#E4E7F0] text-[#111318] rounded-[22px] sm:rounded-[24px] p-4.5 sm:p-6 flex flex-col justify-between gap-4 sm:gap-5 shadow-2xs hover:-translate-y-0.5 transition-transform duration-200">
          <div className="flex items-start sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#EEF1F6] text-[#111318] flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm sm:text-base font-bold leading-tight truncate">
                  Jadwal kuliah Senin – Sabtu
                </h3>
                <p className="text-[11px] sm:text-xs text-[#6E7485] mt-0.5 truncate">Daftar jadwal tetap per semester</p>
              </div>
            </div>
            <span className="shrink-0 whitespace-nowrap text-[10px] font-extrabold uppercase tracking-wider bg-[#4CD98B]/20 text-[#111318] px-2.5 py-1 rounded-full border border-[#4CD98B]/40">
              Bebas Login
            </span>
          </div>

          <div className="space-y-2">
            <div className="grid grid-cols-6 gap-1 bg-[#F6F7FB] p-1 rounded-xl border border-[#E4E7F0]/70">
              {days.map((d) => (
                <div
                  key={d.label}
                  className={`py-2 rounded-lg flex flex-col items-center justify-center text-center select-none ${
                    d.active ? "bg-[#111318] text-white font-extrabold shadow-2xs" : "text-[#111318] font-bold"
                  }`}
                >
                  <span className="text-[10px] uppercase leading-none tracking-wider">{d.label}</span>
                  <span
                    className={`w-1.5 h-1.5 rounded-full mt-1.5 ${
                      d.active
                        ? "bg-[#F6C866]"
                        : d.hasClass
                        ? "bg-[#A8C0FF]"
                        : "bg-transparent"
                    }`}
                  />
                </div>
              ))}
            </div>

            <div className="bg-[#F6F7FB] p-2.5 rounded-xl border border-[#E4E7F0]/70 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-[#6E7485] truncate">14:30 – 17:30 WIB · Ruang D132</p>
                <p className="text-xs font-extrabold text-[#111318] truncate mt-0.5">Interaksi Manusia & Komputer</p>
              </div>
              <span className="shrink-0 text-[10px] font-bold text-[#111318] bg-white border border-[#E4E7F0] px-2 py-0.5 rounded-full shadow-2xs">
                Rutin
              </span>
            </div>
          </div>

          <p className="text-xs text-[#6E7485] leading-relaxed">
            Cek jam mulai, kode mata kuliah, ruangan, dan nama dosen rutin per semester langsung
            dari browser ponsel tanpa hambatan login.
          </p>
          </div>
        </BlurFade>

        {/* Card 5: Warm Honey Amber - Multi-Peran & Opsi Draft */}
        <BlurFade delay={0.32} className="md:col-span-3 flex">
          <div className="w-full bg-[#F6C866] text-[#111318] rounded-[22px] sm:rounded-[24px] p-4.5 sm:p-6 flex flex-col justify-between gap-4 sm:gap-5 hover:-translate-y-0.5 transition-transform duration-200">
            <div className="flex items-center justify-between gap-2">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white text-[#111318] flex items-center justify-center shadow-2xs shrink-0">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#111318]" strokeWidth={2} />
              </div>
              <span className="shrink-0 whitespace-nowrap text-[10px] font-extrabold uppercase tracking-wider bg-[#111318] text-white px-2.5 py-1 rounded-full">
                Multi-Peran RBAC
              </span>
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <h3 className="text-sm sm:text-base font-bold leading-snug">
                Simpan draft atau terbitkan langsung
              </h3>
              <p className="text-xs text-[#111318]/85 leading-relaxed">
                Anggota kelas memiliki akses baca saja (<em>read-only</em>). PJ matkul dan ketua kelas bisa meracik informasi
                sebagai draft untuk dicek terlebih dahulu, atau langsung menerbitkan tanpa birokrasi persetujuan.
              </p>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  )
}
