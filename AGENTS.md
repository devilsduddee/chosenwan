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
- **Framework:** Next.js 16 (App Router, TypeScript, React 19)
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Icons:** Lucide React
- **Backend & Database:** Turso (libSQL / Edge SQLite) + Drizzle ORM
- **Autentikasi & Sesi:** PASETO `v3.local` encrypted HTTP-only cookie (`src/lib/auth.ts` + `src/lib/session-token.ts`) & `bcryptjs`
- **Media CDN:** ImageKit.io (`src/lib/imagekit.ts`)
- **Validasi Form & Server Boundary:** `react-hook-form` + `zod`
- **Deployment Platform:** Vercel

### 2.2 Struktur Folder Standar
```text
src/
├── app/                        # App Router Pages & Layouts
│   ├── layout.tsx              # Root wrapper + PWA modal + PortalStoreProvider
│   ├── page.tsx                # Landing page publik
│   ├── login/
│   │   └── page.tsx            # Halaman login username/password kelas & publisher
│   └── portal/
│       ├── layout.tsx          # SSR data hydrator (<Suspense>) + TopHeader + BottomNav
│       └── page.tsx            # Halaman portal mahasiswa & dashboard publisher
├── components/
│   ├── ui/                     # Komponen shadcn/ui & ImageLightbox
│   ├── auth/                   # LoginForm
│   ├── landing/                # LandingNavbar, LandingHero, LandingFeatures, LandingWorkflow, LandingFooter
│   ├── layout/                 # TopHeader, BottomNavigationBar, PortalHydrator, PortalStatusBanner, PwaInstallModal
│   ├── tasks/                  # BentoSummaryGrid, UrgentTaskCard, TaskList, TaskCard, TaskDetailSheet
│   ├── info/                   # CategoryFilterPills, AnnouncementCard, AnnouncementList, AnnouncementDetailSheet
│   ├── schedule/               # DaySelectorStrip, ScheduleSlotCard, ScheduleTimeline, ScheduleEditorDialog
│   └── publisher/              # PublisherDashboard, ContentEditorDialog, AdminManageSheet, DeleteConfirmDialog
├── db/
│   ├── index.ts                # Koneksi libSQL / Turso + Drizzle ORM
│   ├── schema.ts               # 5 tabel: account, course, schedule, task, event
│   └── seed.ts                 # Seeder awal jadwal & akun 3IA01
├── lib/
│   ├── actions/                # Next.js Server Actions (auth, portal, tasks, events, schedules, admin)
│   ├── portal-store.tsx        # Client state provider & mutasi terintegrasi Server Actions
│   ├── auth.ts                 # Cookie HTTP-only sesi PASETO v3.local
│   ├── session-token.ts        # Enkripsi/dekripsi token PASETO v3.local
│   ├── imagekit.ts             # Upload & cleanup media poster ImageKit.io
│   ├── rate-limit.ts           # Fixed-window limiter login per-IP & per-akun
│   ├── validations.ts          # Zod schemas (client forms & server action boundaries)
│   ├── url-safety.ts           # Validasi URL publik & anti-SSRF
│   ├── course-utils.ts         # Generator kode singkatan mata kuliah deterministik
│   └── date-utils.ts           # Formatting tanggal & waktu WIB deterministik
└── types/
    ├── index.ts                # Domain interfaces (Task, Announcement, Schedule, Course, User)
    └── store.ts                # PortalStoreContextType
```

### 2.3 Aturan Komponen & Styling
- **Tampilan Mobile-First:** Kontainer portal menggunakan pendekatan mobile-first (`max-w-5xl mx-auto` dengan grid responsif 1 kolom mobile → 2 kolom desktop) di atas background kanvas `#F6F7FB`.
- **Token Warna Playful Bento (Wajib Ikuti `05-design.md`):**
  - Kanvas Utama: `#F6F7FB` | Kartu Putih: `#FFFFFF` | Kontainer Sekunder: `#EEF1F6`
  - Jangkar Gelap (Urgent / CTA Primer): `#111318` (Teks putih `#FFFFFF`)
  - Pastel Akademik / Tugas: `#A8C0FF` (Teks wajib `#111318`)
  - Pastel Berita Kampus: `#F6C866` (Teks wajib `#111318`)
  - Pastel Info Lomba: `#EA9DFB` (Teks wajib `#111318`)
  - Status Aman: `#4CD98B` | Status Mendesak/Error: `#F05252`
- **Aturan Kontras:** Dilarang menggunakan teks putih di atas blok pastel (`#A8C0FF`, `#F6C866`, `#EA9DFB`). Teks di atas warna pastel wajib menggunakan `#111318` agar tajam dan terbaca.

### 2.4 Aturan Akses & Database (Turso + Server Actions Guard)
- **Area Publik (Tanpa Login):**
  - Hanya dapat membaca `schedule` dan `event` dengan kondisi `status = 'PUBLISHED'`.
  - Tugas (`task`) dan data berstatus `DRAFT` wajib disaring ketat di Server Action `getInitialPortalData()` agar tidak pernah dikirim ke browser tamu.
- **Anggota Kelas (`role = 'member'`):**
  - Terautentikasi PASETO `v3.local`; memiliki akses baca (*Read-Only*) untuk `task` (`PUBLISHED`), `event` (`PUBLISHED`), dan `schedule`.
- **Publisher (`role = 'pj'` & `role = 'ketua_kelas'`):**
  - Wajib terautentikasi PASETO `v3.local` dan memvalidasi input melalui schema Zod server-side di seluruh Server Actions (`src/lib/actions/*`).
  - Memiliki opsi mutasi data: simpan sebagai `DRAFT` atau langsung `PUBLISHED` (tanpa approval bertingkat).
  - `pj` hanya boleh mengedit/menghapus/menyematkan tugas & event yang dibuatnya sendiri (`id_acc = session.userId`), serta dapat mengelola slot jadwal statis. `ketua_kelas` memiliki hak moderasi penuh serta pengelolaan master `course` dan `account`.

---

## 3. Alur Kerja Bertahap

1. **Database & Auth:** Skema 5 tabel Drizzle ORM (`src/db/schema.ts`), koneksi Turso (`src/db/index.ts`), dan autentikasi PASETO `v3.local` (`src/lib/auth.ts`).
2. **Server Actions & Validation:** Kontrak mutasi/query di `src/lib/actions/*` dengan validasi Zod server-side di setiap batas input.
3. **Antarmuka Landing & Portal:** Mobile-first Playful Bento dengan SSR hydration (`/portal`), target sentuh minimal `44×44 px`, dan state error/retry eksplisit.
4. **Verifikasi & Kualitas:** Lulus `npm run lint`, `npx tsc --noEmit`, `npm run build`, dan pemeriksaan batas 500 baris kode per file.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
