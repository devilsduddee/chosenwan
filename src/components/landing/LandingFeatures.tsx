import React from "react"
import { Clock, Megaphone, Trophy, Calendar, ShieldCheck } from "lucide-react"

export function LandingFeatures() {
  const days = [
    { num: "01", label: "Sen", active: false },
    { num: "02", label: "Sel", active: true },
    { num: "03", label: "Rab", active: false },
    { num: "04", label: "Kam", active: false },
    { num: "05", label: "Jum", active: false },
  ]

  return (
    <section id="fitur" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 border-t border-[#E4E7F0]/80">
      <div className="max-w-2xl space-y-2 mb-8 sm:mb-10">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#6E7485]">
          Isi Portal
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111318] tracking-tight">
          Tugas, info kampus, dan jadwal kuliah dipisah per tab.
        </h2>
        <p className="text-sm text-[#6E7485] leading-relaxed">
          Setiap jenis informasi duduk di tabnya sendiri, jadi info lomba atau berita kampus tidak
          menutupi deadline tugas minggu ini.
        </p>
      </div>

      {/* Bento Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {/* Card 1: Dark Anchor - Tugas & Deadline */}
        <div className="md:col-span-2 bg-[#111318] text-white rounded-[24px] p-6 flex flex-col justify-between gap-6">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-[#F6C866] text-[#111318] flex items-center justify-center">
              <Clock className="w-5 h-5" strokeWidth={2} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F05252] text-white px-2.5 py-1 rounded-full">
              Prioritas
            </span>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-bold leading-snug">
              Daftar tugas urut deadline
            </h3>
            <p className="text-xs text-white/75 leading-relaxed">
              Tugas dengan tenggat paling dekat muncul paling atas. Lengkap dengan minggu
              pertemuan, instruksi dosen, dan link pengumpulan.
            </p>
          </div>
        </div>

        {/* Card 2: Periwinkle - Info Akademik & Perubahan Jadwal */}
        <div className="md:col-span-2 bg-[#A8C0FF] text-[#111318] rounded-[24px] p-6 flex flex-col justify-between gap-6">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-white text-[#111318] flex items-center justify-center shadow-2xs">
              <Megaphone className="w-5 h-5" strokeWidth={2} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-white/90 text-[#111318] px-2.5 py-1 rounded-full">
              Akademik
            </span>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-bold leading-snug">
              Pengumuman dosen dan pindah ruang
            </h3>
            <p className="text-xs text-[#111318]/80 leading-relaxed">
              Info pindah ruangan, kelas pengganti, atau kuliah online dipisah dari obrolan grup
              supaya gampang dicari ulang.
            </p>
          </div>
        </div>

        {/* Card 3: Orchid Lilac - Berita Kampus & Lomba */}
        <div className="md:col-span-2 bg-[#EA9DFB] text-[#111318] rounded-[24px] p-6 flex flex-col justify-between gap-6">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-white text-[#111318] flex items-center justify-center shadow-2xs">
              <Trophy className="w-5 h-5" strokeWidth={2} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-white/90 text-[#111318] px-2.5 py-1 rounded-full">
              Kampus & Lomba
            </span>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-bold leading-snug">
              Berita kampus dan info lomba
            </h3>
            <p className="text-xs text-[#111318]/80 leading-relaxed">
              Info kompetisi dan pengumuman kampus punya tab sendiri, disertai tautan ke sumber
              resmi IG atau situs kampus.
            </p>
          </div>
        </div>

        {/* Card 4: White - Jadwal Kuliah Statis */}
        <div className="md:col-span-3 bg-white border border-[#E4E7F0] text-[#111318] rounded-[24px] p-6 flex flex-col justify-between gap-5 shadow-2xs">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#EEF1F6] text-[#111318] flex items-center justify-center">
                <Calendar className="w-5 h-5" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-base font-bold leading-tight">Jadwal kuliah Senin sampai Sabtu</h3>
                <p className="text-xs text-[#6E7485]">Daftar jadwal tetap per semester</p>
              </div>
            </div>
          </div>

          {/* Mini Authentic Day Strip */}
          <div className="bg-[#F6F7FB] rounded-2xl p-2 flex items-center justify-between gap-1.5 border border-[#E4E7F0]/70">
            {days.map((d) => (
              <div
                key={d.num}
                className={`flex-1 py-2 rounded-xl flex flex-col items-center justify-center text-center ${
                  d.active ? "bg-[#111318] text-white" : "text-[#6E7485]"
                }`}
              >
                <span className="text-[9px] font-bold uppercase">{d.label}</span>
                <span className="text-xs font-extrabold mt-0.5">{d.num}</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-[#6E7485] leading-relaxed">
            Cek jam mulai, kode mata kuliah, ruangan, dan nama dosen rutin per hari tanpa harus
            tanya ulang di grup kelas.
          </p>
        </div>

        {/* Card 5: Warm Honey Amber - Publisher Draft & Publish */}
        <div className="md:col-span-3 bg-[#F6C866] text-[#111318] rounded-[24px] p-6 flex flex-col justify-between gap-5">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-white text-[#111318] flex items-center justify-center shadow-2xs">
              <ShieldCheck className="w-5 h-5" strokeWidth={2} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#111318] text-white px-2.5 py-1 rounded-full">
              Draft vs Terbit
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-bold leading-snug">
              Simpan draft atau terbitkan langsung
            </h3>
            <p className="text-xs text-[#111318]/80 leading-relaxed">
              PJ mata kuliah dan ketua kelas tidak perlu menunggu antrean persetujuan. Simpan sebagai
              draft bila perlu dicek dulu, atau langsung terbitkan ke halaman mahasiswa.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
