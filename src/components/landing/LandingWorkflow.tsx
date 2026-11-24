import React from "react"
import Link from "next/link"
import { ArrowRight, Globe, Lock, ShieldCheck } from "lucide-react"

export function LandingWorkflow() {
  return (
    <section id="alur-kerja" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 border-t border-[#E4E7F0]/80">
      <div className="max-w-2xl space-y-2 mb-8 sm:mb-10">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#6E7485]">
          Alur Pengguna
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111318] tracking-tight">
          Cara pakai sesuai hak akses masing-masing.
        </h2>
        <p className="text-sm text-[#6E7485] leading-relaxed">
          Tiga tingkatan peran yang dirancang di PRD v1.5 untuk memisahkan agenda publik,
          keamanan tugas privat kelas, dan kelancaran moderasi pengurus.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5">
        {/* Persona 1: Pengunjung Publik / Tamu */}
        <div className="bg-white border border-[#E4E7F0] rounded-[24px] p-5 sm:p-6 flex flex-col justify-between gap-6 shadow-2xs hover:-translate-y-0.5 transition-transform duration-200">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#EEF1F6] flex items-center justify-center text-[#111318]">
                  <Globe className="w-4 h-4" strokeWidth={2} />
                </div>
                <h3 className="text-base font-extrabold text-[#111318]">Pengunjung Publik</h3>
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-[#4CD98B]/20 text-[#111318] px-2 py-0.5 rounded-full border border-[#4CD98B]/30">
                Tanpa Login
              </span>
            </div>

            <ol className="space-y-3 text-xs text-[#6E7485]">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#EEF1F6] text-[#111318] text-[11px] font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <span>Buka portal dari peramban ponsel atau desktop tanpa perlu akun.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#EEF1F6] text-[#111318] text-[11px] font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <span>Cek jadwal kuliah statis harian (jam, ruang, dosen) dan info lomba.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#EEF1F6] text-[#111318] text-[11px] font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <span>Saring agenda berdasarkan hari atau kategori tanpa batasan sesi.</span>
              </li>
            </ol>
          </div>

          <Link
            href="/portal?tab=schedule"
            className="min-h-[44px] px-4 rounded-full bg-[#111318] text-white text-xs font-bold inline-flex items-center justify-center gap-1.5 hover:bg-[#111318]/90 active:scale-[0.98] transition-transform duration-150 w-full"
          >
            <span>Buka Jadwal Publik</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Persona 2: Anggota Kelas (Member) */}
        <div className="bg-[#EEF1F6] border border-[#E4E7F0] rounded-[24px] p-5 sm:p-6 flex flex-col justify-between gap-6 hover:-translate-y-0.5 transition-transform duration-200">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#111318] shadow-2xs">
                  <Lock className="w-4 h-4" strokeWidth={2} />
                </div>
                <h3 className="text-base font-extrabold text-[#111318]">Anggota Kelas</h3>
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-[#A8C0FF] text-[#111318] px-2 py-0.5 rounded-full">
                Privat Kelas
              </span>
            </div>

            <ol className="space-y-3 text-xs text-[#111318]/80">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-white text-[#111318] text-[11px] font-extrabold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  1
                </span>
                <span>Masuk memakai nama pengguna dan kata sandi anggota kelas yang dibagikan.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-white text-[#111318] text-[11px] font-extrabold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  2
                </span>
                <span>Buka daftar tugas, instruksi lengkap, dan tenggat deadline terdekat.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-white text-[#111318] text-[11px] font-extrabold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  3
                </span>
                <span>Buka tautan pengumpulan Google Drive/LMS kelas secara aman (*read-only*).</span>
              </li>
            </ol>
          </div>

          <Link
            href="/login"
            className="min-h-[44px] px-4 rounded-full bg-white border border-[#E4E7F0] text-[#111318] text-xs font-bold inline-flex items-center justify-center gap-1.5 hover:bg-[#EEF1F6] active:scale-[0.98] transition-transform duration-150 w-full shadow-2xs"
          >
            <span>Masuk Akun Anggota</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Persona 3: Ketua Kelas & PJ Matkul (Publisher) */}
        <div className="bg-white border border-[#E4E7F0] rounded-[24px] p-5 sm:p-6 flex flex-col justify-between gap-6 shadow-2xs hover:-translate-y-0.5 transition-transform duration-200">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#F6C866] flex items-center justify-center text-[#111318] shadow-2xs">
                  <ShieldCheck className="w-4 h-4" strokeWidth={2} />
                </div>
                <h3 className="text-base font-extrabold text-[#111318]">Pengurus Kelas</h3>
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-[#111318] text-white px-2 py-0.5 rounded-full">
                Publisher
              </span>
            </div>

            <ol className="space-y-3 text-xs text-[#6E7485]">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#EEF1F6] text-[#111318] text-[11px] font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <span>Masuk memakai akun publisher ketua kelas atau PJ mata kuliah.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#EEF1F6] text-[#111318] text-[11px] font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <span>Tulis tugas baru, info lomba berposter, atau perbarui jadwal kuliah statis.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#EEF1F6] text-[#111318] text-[11px] font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <span>Sematkan (*pin*) info genting/UTS, simpan draft, atau langsung terbitkan.</span>
              </li>
            </ol>
          </div>

          <Link
            href="/login"
            className="min-h-[44px] px-4 rounded-full bg-[#EEF1F6] hover:bg-[#E4E7F0] text-[#111318] text-xs font-bold inline-flex items-center justify-center gap-1.5 active:scale-[0.98] transition-transform duration-150 w-full"
          >
            <span>Login Publisher</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
