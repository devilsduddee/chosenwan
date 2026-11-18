# Chosenwan

Portal informasi kelas mobile-first agar mahasiswa bisa mengecek deadline tugas, pengumuman dosen, berita kampus, info lomba, dan jadwal kuliah statis tanpa menggali riwayat chat WhatsApp.

> **Status:** Interactive Frontend Prototype (`localStorage`, belum terhubung ke database Supabase).

## Tech Stack

- **Framework:** Next.js 16 (App Router, TypeScript, React 19)
- **Styling & UI:** Tailwind CSS v4, shadcn/ui, Lucide React
- **Validasi Form:** React Hook Form + Zod
- **Notifikasi:** Sonner Toast

## Rute & Alur Aplikasi

- `/` : Landing page pengenalan portal dengan preview bento dan akses ke portal.
- `/portal` : Portal kelas (`Tugas`, `Info`, `Jadwal`, serta tab `Kelola` setelah login publisher). Pengunjung publik membaca item berstatus `PUBLISHED` tanpa login.
- `/login` : Halaman login email dan kata sandi untuk **Ketua Kelas** dan **PJ Mata Kuliah**.

### Akun Uji Coba Prototype

Data sesi dan mutasi konten disimpan secara lokal di browser (`localStorage`):

| Peran | Email | Kata Sandi | Hak Akses |
|---|---|---|---|
| **Ketua Kelas** | `ketua@chosenwan.ac.id` | `ketua123` | Buat, edit, hapus semua postingan kelas (draft/terbit) dan kelola jadwal |
| **PJ Mata Kuliah** | `pj.web@chosenwan.ac.id` | `pjweb123` | Buat konten, terbit langsung atau simpan draft, edit/hapus postingan sendiri, kelola jadwal |

## Struktur Direktori

```text
Chosenwan/
├── branding/               # Master SVG logo (Konsep C) & panduan identitas visual
├── docs/                   # Dokumen PRD, Design System, Spec Teknis, & Vibe Rules
├── public/                 # Favicon, ikon PWA, dan site.webmanifest
├── src/
│   ├── app/                # Rute App Router (/, /portal, /login) & styling global
│   ├── components/
│   │   ├── auth/           # Form login publisher
│   │   ├── info/           # Tab Info & Kampus (filter kategori & kartu)
│   │   ├── landing/        # Seksi landing page (Hero, Features, Workflow, Footer)
│   │   ├── layout/         # BrandLogo, TopHeader, BottomNavigationBar
│   │   ├── publisher/      # Dashboard kelola konten, editor form, & dialog hapus
│   │   ├── schedule/       # Jadwal kuliah statis Senin-Sabtu & editor jadwal
│   │   ├── tasks/          # Bento summary, kartu mendesak, filter, & detail sheet
│   │   └── ui/             # Primitif shadcn/ui
│   ├── lib/                # Mock store, seed data, validasi Zod, & utilitas tanggal
│   └── types/              # Definisi TypeScript domain portal kelas
├── AGENTS.md               # Aturan coding agent & konvensi repositori
└── components.json         # Konfigurasi shadcn/ui
```

## Menjalankan Secara Lokal

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### Perintah Verifikasi

```bash
npx tsc --noEmit
npm run lint
npm run build
```

## Dokumen Spesifikasi

- [PRD (`docs/04-prd.md`)](docs/04-prd.md)
- [Design System (`docs/05-design.md`)](docs/05-design.md)
- [Spec Teknis (`docs/06-spec.md`)](docs/06-spec.md)
- [Vibe Rules (`docs/07-vibe-rules.md`)](docs/07-vibe-rules.md)
- [Coding Rules (`AGENTS.md`)](AGENTS.md)
