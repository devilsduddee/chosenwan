import React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function LandingWorkflow() {
  return (
    <section id="alur-kerja" className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 border-t border-[#E4E7F0]/80">
      <div className="max-w-2xl space-y-2 mb-8 sm:mb-10">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#6E7485]">
          Alur Pakai
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111318] tracking-tight">
          Cara pakai untuk mahasiswa dan pengelola kelas.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Mahasiswa Flow */}
        <div className="bg-white border border-[#E4E7F0] rounded-[24px] p-6 flex flex-col justify-between gap-6 shadow-2xs">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-extrabold text-[#111318]">Mahasiswa kelas</h3>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#4CD98B] text-[#111318] px-2.5 py-1 rounded-full">
                Tanpa Login
              </span>
            </div>

            <ol className="space-y-3 text-xs sm:text-sm text-[#6E7485]">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#EEF1F6] text-[#111318] text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <span>Buka tautan portal dari browser ponsel tanpa perlu membuat akun.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#EEF1F6] text-[#111318] text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <span>
                  Pilih tab Tugas, Info, atau Jadwal, lalu saring daftar berdasarkan mata kuliah
                  atau kategori.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#EEF1F6] text-[#111318] text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <span>
                  Ketuk kartu tugas untuk membaca instruksi lengkap, membuka link pengumpulan, atau
                  menyalin format pesan ke grup WhatsApp.
                </span>
              </li>
            </ol>
          </div>

          <Link
            href="/portal?tab=schedule"
            className="min-h-[44px] px-5 rounded-full bg-[#111318] text-white text-xs font-bold inline-flex items-center justify-center gap-1.5 hover:bg-[#111318]/90 active:scale-[0.98] transition-all w-full sm:w-fit"
          >
            <span>Buka Halaman Mahasiswa</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Publisher Flow */}
        <div className="bg-[#EEF1F6] border border-[#E4E7F0] rounded-[24px] p-6 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-extrabold text-[#111318]">Ketua kelas & PJ matkul</h3>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#111318] text-white px-2.5 py-1 rounded-full">
                Publisher
              </span>
            </div>

            <ol className="space-y-3 text-xs sm:text-sm text-[#111318]/80">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-white text-[#111318] text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  1
                </span>
                <span>
                  Masuk lewat halaman login publisher memakai akun ketua kelas atau PJ mata kuliah.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-white text-[#111318] text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  2
                </span>
                <span>
                  Ketuk Posting untuk menulis tugas baru, pengumuman dosen, info lomba, atau update
                  jadwal kuliah.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-white text-[#111318] text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  3
                </span>
                <span>
                  Pilih Simpan Draft bila masih dicek, atau Terbitkan agar langsung tampil di
                  halaman mahasiswa.
                </span>
              </li>
            </ol>
          </div>

          <Link
            href="/login"
            className="min-h-[44px] px-5 rounded-full bg-white border border-[#E4E7F0] text-[#111318] text-xs font-bold inline-flex items-center justify-center gap-1.5 hover:bg-white/80 active:scale-[0.98] transition-all w-full sm:w-fit shadow-2xs"
          >
            <span>Login Ketua Kelas / PJ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
