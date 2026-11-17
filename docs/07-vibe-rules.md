# 07 - Vibe Rules: Chosenwan

- **Versi:** 1.0
- **Tanggal:** 2026-11-17
- **Status:** Approved
- **Sumber input:** `04-prd.md` v1.4, `05-design.md` v1.0, `06-spec.md` v1.1, dan instruksi Lead PM.
- **Skill digunakan:** `vibe-rules`, `antislop-copywriting`

---

## TL;DR

Dokumen ini mendefinisikan aturan operasional dan batasan teknis (*guardrails*) untuk coding agent (Antigravity) yang akan mengeksekusi pembangunan aplikasi Chosenwan di repositori terpisah.

Prinsip utamanya adalah kepatuhan mutlak pada spesifikasi tertulis (`04-prd.md`, `05-design.md`, `06-spec.md`), modularitas kode yang ketat (maksimal 500 baris per file), larangan membuat komponen custom dari nol (wajib memanfaatkan ekosistem shadcn/ui dan Tailwind), serta keamanan version control (dilarang melakukan `git push` otomatis ke remote tanpa konfirmasi manusia).

---

## 1. Golden Rules untuk Coding Agent

### Aturan 1: Patuh Mutlak pada Markdown Spesifikasi
- Coding agent **wajib** membaca dan berpatokan pada dokumen spesifikasi yang disertakan di folder handoff (`PRD`, `DESIGN`, `SPEC`, dan `SCHEMA.sql`).
- **Dilarang berimprovisasi** menambahkan fitur di luar scope MVP (seperti notifikasi push otomatis, pelacak progres tugas, atau kalender dinamis).
- Jika ada ambiguitas perilaku atau kebutuhan di luar dokumen, coding agent harus berhenti dan bertanya kepada developer, bukan membuat asumsi sendiri.

### Aturan 2: Batas Ukuran File (Maksimal 500 Baris)
- Setiap file kode sumber (`.tsx`, `.ts`, `.sql`, `.css`) **wajib berukuran di bawah 500 baris**.
- Jika sebuah komponen UI atau route handler mendekati 400 baris, coding agent wajib langsung memecahnya (*refactor*) menjadi subkomponen, custom hook, atau helper terpisah.
- Satu file hanya memegang satu tanggung jawab utama (*single responsibility principle*).

### Aturan 3: Keamanan Git (Dilarang Asal Push ke Remote)
- Coding agent **dilarang keras** mengeksekusi perintah `git push` secara mandiri/otomatis ke branch remote atau platform hosting (GitHub/Vercel).
- Pembuatan commit lokal diizinkan setelah fitur selesai diuji, dengan pesan commit yang jelas dan deskriptif.
- Perintah `git push` hanya boleh dijalankan jika pengguna memberikan instruksi eksplisit dalam chat.

### Aturan 4: Zero Custom Component Reinvention
- Sesuai prinsip `profile.md` bagian 9, **dilarang membuat komponen UI custom dari nol** jika sudah tersedia di library standar.
- Seluruh kebutuhan UI wajib menggunakan **shadcn/ui** (Card, Button, Tabs, Badge, Dialog, Sheet, Select, Input, Textarea, Toast/Sonner) dan ikon dari **lucide-react**.
- Styling komponen wajib menggunakan utility classes **Tailwind CSS** dengan token warna dan radius yang telah didefinisikan di `05-design.md`.

---

## 2. Standar Arsitektur Next.js & Supabase

### 2.1 Pola Komponen & Data Fetching (App Router)
1. **Server Components by Default:**
   - Halaman feed publik (`/`, tab tugas, info, jadwal) wajib di-render sebagai *React Server Component (RSC)* untuk kecepatan pemuatan awal dan SEO/metadata instan.
2. **Client Components Seperlunya (`'use client'`):**
   - Gunakan `'use client'` hanya pada komponen interaktif yang memerlukan event handler, state lokal, atau hook (seperti filter tab, form input publisher, dan bottom sheet interaktif).
3. **Pemisahan Lapisan Kode:**
   - Pisahkan kode ke dalam 3 lapisan:
     - `components/`: Khusus representasi UI dan interaksi pengguna.
     - `lib/actions/` atau `lib/api/`: Khusus logika mutasi data (Next.js Server Actions) dan pemanggilan Supabase.
     - `lib/validations/`: Khusus skema validasi form Zod.

### 2.2 Integrasi Supabase & Keamanan RLS
1. **Koneksi Supabase:**
   - Gunakan `@supabase/ssr` untuk manajemen cookie sesi yang aman di Next.js App Router (Server Client vs Browser Client).
2. **Enforcement Row Level Security (RLS):**
   - Query publik hanya boleh mengambil data berstatus `'PUBLISHED'`.
   - Data berstatus `'DRAFT'` diproteksi di level database PostgreSQL melalui policy RLS, bukan sekadar filter di sisi frontend.
3. **Penanganan Kredensial:**
   - Simpan `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` di file `.env.local`.
   - Jangan pernah membocorkan `SUPABASE_SERVICE_ROLE_KEY` ke sisi browser client.

---

## 3. Struktur Direktori Repositori Target

```text
chosenwan-app/
├── AGENTS.md                   # Aturan operasional coding agent (disalin dari handoff)
├── README.md                   # Ringkasan project & petunjuk menjalankan
├── docs/                       # Dokumen PM referensi (PRD, Spec, Design)
├── supabase/
│   └── migrations/
│       └── 0001_initial.sql    # Skrip skema database dari handoff/schema.sql
├── public/                     # Favicon, manifest, ikon
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root mobile container (max-w-md center)
│   │   ├── page.tsx            # Halaman utama mahasiswa (Server Component)
│   │   ├── login/
│   │   │   └── page.tsx        # Form login publisher
│   │   └── publisher/
│   │       ├── layout.tsx      # Auth gate middleware layout
│   │       └── page.tsx        # Dashboard publisher (Draft vs Published)
│   ├── components/
│   │   ├── ui/                 # Komponen shadcn/ui
│   │   ├── layout/             # TopHeader, BottomNav
│   │   ├── tasks/              # BentoGrid, UrgentCard, TaskList, TaskDetailSheet
│   │   ├── info/               # AnnouncementList, CategoryFilterPills
│   │   ├── schedule/           # DaySelectorStrip, ScheduleSlotCard
│   │   └── publisher/          # ContentForm, DeleteConfirmDialog
│   ├── lib/
│   │   ├── supabase/           # Client & Server supabase helper (@supabase/ssr)
│   │   ├── validations/        # Schema Zod untuk tugas & pengumuman
│   │   ├── utils.ts            # Formatting tanggal & cn helper
│   │   └── constants.ts        # Konstanta hari, warna kategori pastel
│   └── types/
│       └── database.ts         # TypeScript types hasil generate Supabase CLI
├── tailwind.config.ts          # Color tokens Bento Pastel dari 05-design.md
└── package.json
```

---

## 4. Rencana Eksekusi Bertahap (Vibecoding Roadmap)

Agar kode tetap rapi dan mudah di-debug, coding agent wajib mengerjakan implementasi dalam urutan bertahap (*milestones*):

1. **Milestone 1 — Setup Dasar & UI Shell:**
   - Inisialisasi Next.js 15 (TypeScript + Tailwind CSS).
   - Pasang shadcn/ui dan konfigurasi token warna `tailwind.config.ts`.
   - Bangun layout kontainer mobile-first (`max-w-md mx-auto`) beserta `TopHeader` dan `BottomNavigationBar`.
2. **Milestone 2 — Database Supabase & Mock Data:**
   - Eksekusi `schema.sql` di Supabase SQL Editor.
   - Buat helper koneksi Supabase (`client.ts` dan `server.ts`).
   - Masukkan *seed data* mata kuliah dan beberapa contoh tugas/pengumuman.
3. **Milestone 3 — Fitur Mahasiswa Publik (Read-Only):**
   - Implementasikan Tab Tugas (Bento grid ringkasan, Urgent Task Card, dan Task Detail Sheet).
   - Implementasikan Tab Info & Kampus (filter pill kategori: Akademik, Berita Kampus, Info Lomba).
   - Implementasikan Tab Jadwal Statis (strip hari Senin-Sabtu dan kartu jam kuliah).
4. **Milestone 4 — Autentikasi Publisher & Dashboard:**
   - Halaman login email/password via Supabase Auth.
   - Dashboard publisher menampilkan daftar konten dengan tab `Published` vs `Draft`.
5. **Milestone 5 — Form Manajemen Konten (Create/Edit/Delete):**
   - Form input dinamis untuk Tugas dan Pengumuman Simpel.
   - Aksi ganda: tombol "Simpan Draft" dan tombol "Terbitkan".
   - Modal konfirmasi hapus data dan toast notifikasi sukses.
6. **Milestone 6 — Verifikasi & Siap Deploy Vercel:**
   - Uji edge cases (input kosong, error network, responsive mobile).
   - Verifikasi tidak ada file yang melebihi 500 baris.
   - Siapkan instruksi deployment ke Vercel.

---

## 5. Ringkasan Paket Handoff

Seluruh berkas persiapan untuk coding agent telah disimpan di folder `docs/chosenwan/handoff/`:
- `handoff/AGENTS.md`: Aturan ketat coding agent untuk di-paste di root repo.
- `handoff/schema.sql`: Skrip SQL migrasi database Supabase lengkap dengan RLS.
- `handoff/tailwind.config.ts`: Konfigurasi token palet warna bento pastel dan radius.
- `handoff/SETUP.md`: Panduan setup perintah CLI dari nol sampai deploy Vercel.
