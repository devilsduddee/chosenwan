# AGENTS.md — Chosenwan Coding Rules

Dokumen ini adalah aturan wajib bagi coding agent (Antigravity atau coding agent lainnya) yang bekerja di repositori ini. Seluruh instruksi di bawah ini bersifat mutlak dan harus dipatuhi tanpa pengecualian.

---

## 1. Golden Rules (Wajib Dipatuhi)

### Aturan 1: Selalu Terpaku pada Dokumen Markdown yang Ada
- **Dilarang keras berimprovisasi** atau menambahkan fitur, halaman, kolom database, atau alur yang tidak tercantum dalam dokumen spesifikasi.
- Dokumen acuan utama di repositori ini (atau folder referensi `docs/`):
  1. `04-prd.md`: Masalah, user stories, dan functional requirements (FR-01 s.d. FR-07).
  2. `05-design.md`: Visual theme Playful Bento, token warna pastel, radius kartu, dan tipografi.
  3. `06-spec.md`: Diagram alur, data model relasional, REST contracts, dan penanganan edge cases.
  4. `07-vibe-rules.md`: Aturan teknis dan roadmap implementasi.
- Jika ada hal yang belum jelas, tanyakan kepada pengguna. Jangan menebak atau membuat keputusan arsitektur secara sepihak.

### Aturan 2: Batas Maksimal 500 Baris per File (Anti-Spaghetti)
- **Setiap file kode sumber (`.tsx`, `.ts`, `.sql`, `.css`) TIDAK BOLEH melebihi 500 baris kode.**
- Jika sebuah komponen atau modul mendekati **400 baris**, segera lakukan pemecahan (*refactoring*):
  - Pecah UI besar menjadi subkomponen di folder terkait (contoh: `TaskCard.tsx`, `BentoGrid.tsx`, `TaskDetailSheet.tsx`).
  - Pindahkan logika state, query, atau helper ke file terpisah (`hooks/use-tasks.ts`, `lib/utils.ts`, atau `lib/actions/tasks.ts`).
  - Satu file hanya memiliki satu tanggung jawab utama (*single responsibility principle*).

### Aturan 3: Jangan Asal Push ke Git (Strict Git Safety)
- **DILARANG KERAS menjalankan perintah `git push` secara otomatis atau mandiri.**
- Coding agent hanya diizinkan membuat commit lokal (`git add` dan `git commit`) setelah sebuah fitur atau milestone selesai diuji dan disetujui pengguna.
- Perintah `git push` ke GitHub/remote repository **HANYA** boleh dijalankan jika pengguna memberikan instruksi eksplisit: *"push ke git"*, *"push ke repo"*, atau sejenisnya.
- Pesan commit harus jelas dan deskriptif mengikuti konvensi conventional commits (contoh: `feat(tasks): implement bento grid and urgent task card`).

### Aturan 4: Dilarang Membuat Komponen Custom dari Nol (Wajib Pakai Library Standar)
- **Jangan pernah membuat komponen UI dari nol** jika sudah tersedia di library komponen standar.
- Komponen UI wajib menggunakan **shadcn/ui** berbasis Radix UI dan Tailwind CSS:
  - `Card`, `Button`, `Badge`, `Tabs`, `Dialog`, `Sheet` (drawer mobile), `Select`, `Input`, `Textarea`, `Toast` (`sonner`).
- Seluruh ikon wajib menggunakan paket **`lucide-react`** dengan stroke outline seragam (1.75px).
- Jangan memasang dependency library baru tanpa persetujuan eksplisit pengguna.

---

## 2. Tech Stack & Konvensi Arsitektur

### 2.1 Spesifikasi Stack
- **Framework:** Next.js 15 (App Router, TypeScript, React 19)
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Icons:** Lucide React
- **Backend & Database:** Supabase (PostgreSQL, Supabase Auth, Row Level Security)
- **Client & SSR Helper:** `@supabase/ssr`
- **Validasi Form:** `react-hook-form` + `zod`
- **Deployment Platform:** Vercel

### 2.2 Struktur Folder Standar
```text
src/
├── app/                        # App Router Pages & Layouts
│   ├── layout.tsx              # Root mobile-first wrapper (max-w-md mx-auto)
│   ├── page.tsx                # Halaman utama mahasiswa publik (RSC)
│   ├── login/
│   │   └── page.tsx            # Halaman login email/password publisher
│   └── publisher/
│       ├── layout.tsx          # Auth protected layout middleware
│       └── page.tsx            # Dashboard kelola konten (Draft & Published)
├── components/
│   ├── ui/                     # Komponen shadcn/ui murni
│   ├── layout/                 # TopHeader, BottomNavigationBar
│   ├── tasks/                  # BentoSummaryGrid, UrgentTaskCard, TaskList, TaskDetailSheet
│   ├── info/                   # CategoryFilterPills, AnnouncementCard, AnnouncementList
│   ├── schedule/               # DaySelectorStrip, ScheduleSlotCard
│   └── publisher/              # ContentEditorForm, DeleteConfirmDialog
├── lib/
│   ├── supabase/
│   │   ├── client.ts           # Browser Supabase client
│   │   └── server.ts           # Server Component / Server Action Supabase client
│   ├── actions/                # Next.js Server Actions (mutasi create/edit/delete)
│   ├── validations/            # Zod schemas (taskSchema, announcementSchema)
│   ├── utils.ts                # cn helper & date formatting (date-fns / Intl)
│   └── constants.ts            # Token warna, label hari, kategori enum
└── types/
    └── database.ts             # TypeScript types Supabase
```

### 2.3 Aturan Komponen & Styling
- **Tampilan Mobile-First:** Kontainer utama selalu dibatasi lebar maksimal `max-w-md mx-auto` dengan background kanvas `#F6F7FB`.
- **Token Warna Playful Bento (Wajib Ikuti `05-design.md`):**
  - Kanvas Utama: `#F6F7FB` | Kartu Putih: `#FFFFFF` | Kontainer Sekunder: `#EEF1F6`
  - Jangkar Gelap (Urgent / CTA Primer): `#111318` (Teks putih `#FFFFFF`)
  - Pastel Akademik / Tugas: `#A8C0FF` (Teks wajib `#111318`)
  - Pastel Berita Kampus: `#F6C866` (Teks wajib `#111318`)
  - Pastel Info Lomba: `#EA9DFB` (Teks wajib `#111318`)
  - Status Aman: `#4CD98B` | Status Mendesak/Error: `#F05252`
- **Aturan Kontras:** Dilarang menggunakan teks putih di atas blok pastel (`#A8C0FF`, `#F6C866`, `#EA9DFB`). Teks di atas warna pastel wajib menggunakan `#111318` agar tajam dan terbaca.

### 2.4 Aturan Akses & Database (Supabase RLS)
- **Publik Mahasiswa (Read-Only Tanpa Login):**
  - Hanya dapat membaca data dengan kondisi `status = 'PUBLISHED'`.
  - Jangan pernah mengekspos endpoint atau query yang mengembalikan data `status = 'DRAFT'` ke halaman publik.
- **Publisher (Ketua Kelas & PJ):**
  - Harus terautentikasi melalui Supabase Auth.
  - Memiliki opsi mutasi data: simpan sebagai `DRAFT` atau langsung `PUBLISHED` (tanpa sistem approval bertingkat).
  - PJ hanya boleh mengedit/menghapus konten yang dibuatnya sendiri (`created_by = auth.uid()`), sedangkan Ketua Kelas (`role = 'ketua_kelas'`) memiliki hak moderasi darurat untuk semua konten kelas.

---

## 3. Alur Kerja Vibecoding Bertahap (Step-by-Step)

Coding agent wajib mengeksekusi pembangunan aplikasi secara bertahap dan melakukan verifikasi di setiap langkah:

1. **Langkah 1:** Setup awal Next.js + Tailwind + shadcn/ui + mobile container shell.
2. **Langkah 2:** Setup database Supabase menggunakan `schema.sql` dan buat helper client/server.
3. **Langkah 3:** Bangun antarmuka publik mahasiswa (Tab Tugas, Tab Info & Kampus, Tab Jadwal Statis).
4. **Langkah 4:** Bangun alur autentikasi publisher (Login email/password) dan Dashboard publisher.
5. **Langkah 5:** Bangun form create/edit konten (Tugas & Pengumuman) dengan aksi ganda Simpan Draft vs Terbitkan.
6. **Langkah 6:** Uji kelengkapan kriteria penerimaan (Acceptance Criteria), verifikasi batas 500 baris kode per file, dan siapkan deployment ke Vercel.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
