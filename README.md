<p align="center">
  <img src="branding/chosenwan-lockup-horizontal-color.svg" alt="Chosenwan Logo" width="380" />
</p>

<p align="center">
  <b>Portal Informasi Kelas Mobile-First Kelas 3IA01</b><br />
  Membantu mahasiswa memantau jadwal kuliah harian, tenggat pengumpulan tugas, dan pengumuman akademik tanpa terselip di obrolan grup WhatsApp.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.4-111318?logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-111318?logo=react&logoColor=61DAFB" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-111318?logo=typescript&logoColor=3178C6" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-CSS_v4-111318?logo=tailwindcss&logoColor=38BDF8" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Turso-libSQL-111318?logo=sqlite&logoColor=003B57" alt="Turso" />
  <img src="https://img.shields.io/badge/Drizzle-ORM-111318?logo=drizzle&logoColor=C5F74F" alt="Drizzle ORM" />
  <img src="https://img.shields.io/badge/ImageKit-CDN-111318?logo=imagekit&logoColor=white" alt="ImageKit" />
</p>

---

## Daftar Isi

- [Tentang Proyek](#tentang-proyek)
- [Fitur Utama](#fitur-utama)
- [Tech Stack](#tech-stack)
- [Akun Pengguna Uji Coba](#akun-pengguna-uji-coba)
- [Jadwal Resmi Kelas 3IA01](#jadwal-resmi-kelas-3ia01)
- [Struktur Direktori](#struktur-direktori)
- [Panduan Instalasi Lokal](#panduan-instalasi-lokal)
- [Konfigurasi Environment Variables (Vercel)](#konfigurasi-environment-variables-vercel)
- [Perintah Verifikasi & Kualitas Kode](#perintah-verifikasi--kualitas-kode)
- [Dokumentasi Terkait](#dokumentasi-terkait)

---

## Tentang Proyek

Chosenwan dirancang khusus untuk mengatasi masalah informasi perkuliahan yang kerap terkubur dalam ribuan pesan grup chat. Mahasiswa sering kali terlambat mengumpulkan tugas atau salah ruangan kuliah karena pengumuman penting tidak terorganisasi dengan baik.

Dengan Chosenwan:
- **Mahasiswa Publik:** Dapat langsung membuka jadwal kuliah mingguan dan pengumuman resmi tanpa perlu membuat akun atau login.
- **Anggota Kelas:** Mendapatkan akses terproteksi ke tautan privat pengumpulan tugas (Google Drive / LMS).
- **Pengurus Kelas (Ketua Kelas & PJ Matkul):** Memiliki panel publisher mandiri untuk menyematkan pengumuman darurat, menerbitkan tugas, atau menyimpan draft secara terstruktur.

---

## Fitur Utama

- **Jadwal Kuliah Statis 3IA01:** Konversi jam kuliah otomatis (Jam ke-1 s.d. 10 ke format waktu WIB nyata), pemetaan ruangan kelas, dan nama dosen pengampu.
- **Tugas Kelas dengan Gated Privacy:** Tautan pengumpulan Google Drive/LMS privat terlindungi di balik autentikasi anggota kelas (`member`, `pj`, `ketua_kelas`).
- **Info & Pengumuman dengan Fitur Sematan (Pin):** Pengumuman prioritas tinggi (seperti Jadwal UTS atau perubahan ruangan) dapat disematkan di paling atas feed publik.
- **Penyimpanan Media ImageKit.io CDN:** Dukungan upload foto pengumuman akademik dan poster lomba beresolusi tinggi dengan optimasi kompresi otomatis WebP.
- **Fullscreen Interactive Lightbox:** Penampil gambar penuh layar dengan fitur zoom bertingkat (+ / - / double-tap) serta geser (pan & scroll) untuk mempermudah membaca tabel jadwal yang lebar.
- **Multi-Role RBAC:** Hak akses bertingkat antara Tamu Publik (`guest`), Mahasiswa (`member`), Penanggung Jawab Matkul (`pj`), dan Ketua Kelas (`ketua_kelas`).
- **Keamanan & Hardening OWASP:** HTTP Security Headers (HSTS, Anti-Clickjacking, Anti-Sniffing), proteksi SSRF terhadap private network, JWT sesi bertanda tangan pada HTTP-only cookie, dan middleware pemblokir vulnerability scanner.

---

## Tech Stack

| Lapisan | Teknologi | Peran & Alasan Pemilihan |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router) | Server Actions, rendering hibrida (SSR + Client), dan Turbopack bundler. |
| **Bahasa** | TypeScript 5 | Tipe data ketat (*type safety*) end-to-end antara database, server, dan antarmuka. |
| **Database** | Turso (libSQL / Edge SQLite) | Database SQLite terdistribusi dengan latensi rendah dan dukungan serverless. |
| **ORM** | Drizzle ORM | Query builder bertipe aman tanpa overhead runtime yang besar. |
| **Media CDN** | ImageKit.io | Penyimpanan berkas poster dan foto jadwal dengan kompresi otomatis. |
| **Autentikasi** | Jose (JWT) + BcryptJS | Enkripsi sesi berbasis stateless token yang disimpan dalam HTTP-only Cookie. |
| **Styling** | Tailwind CSS v4 + shadcn/ui | Desain visual Playful Bento, token warna pastel, dan komponen modular berbasis Radix UI. |
| **Ikon** | Lucide React | Set ikon outline seragam (stroke 1.75px). |
| **Validasi** | Zod + React Hook Form | Validasi skema input pada batas klien (*client*) dan server (*Server Actions*). |

---

## Akun Pengguna Uji Coba

Database telah dilengkapi dengan akun bawaan untuk pengujian hak akses:

| Peran | Username | Password | Hak Akses & Kemampuan |
| :--- | :--- | :--- | :--- |
| **Ketua Kelas** | `ketua` | `ketua123` | **Admin / Moderator Penuh:** Kelola jadwal statis, moderasi seluruh tugas/event kelas, pin pengumuman, dan publikasi konten. |
| **PJ Mata Kuliah** | `pj` | `pj12345` | **Editor Konten Mandiri:** Buat, perbarui, atau hapus tugas & event miliknya sendiri; pin info terkait matkul. |
| **Anggota Kelas** | `member` | `member123` | **Mahasiswa Terverifikasi:** Membaca daftar tugas kelas dan membuka tautan pengumpulan Google Drive/LMS. |
| **Pengunjung Publik** | *(Tanpa Login)* | *(Tanpa Password)* | **Publik / Tamu:** Membaca jadwal kuliah statis dan feed pengumuman publik (Tab Tugas digembok). |

---

## Jadwal Resmi Kelas 3IA01

Data jadwal kuliah statis yang aktif di sistem:

| Hari | Jam Ke- | Waktu (WIB) | Mata Kuliah | Ruang | Dosen Pengampu |
| :--- | :---: | :---: | :--- | :---: | :--- |
| **Senin** | 3/4 | 09:30 – 11:30 | Pemrograman Web | G222 | Ega Hegarini |
| **Senin** | 5/6 | 11:30 – 13:30 | Sistem Keamanan Komputer | G2410 | Bintang Eka Putera |
| **Senin** | 7/8 | 13:30 – 15:30 | Kecerdasan Artificial | G2410 | Octaviani Hutapea |
| **Selasa** | 1/2/3 | 07:30 – 10:30 | Grafik Komputer | D655 | Aries Muslim |
| **Selasa** | 4/5/6 | 10:30 – 13:30 | Sistem Basis Data 1 | D655 | Jalinas / Elly Agustina Julisawati |
| **Selasa** | 8/9/10 | 14:30 – 17:30 | Interaksi Manusia & Komputer | D132 | Tavipia Rumambi |
| **Kamis** | 5/6/7 | 11:30 – 14:30 | Perancangan & Analisis Algoritma | G132 | Risma Rahmalia Fitriani |
| **Kamis** | 8/9/10 | 14:30 – 17:30 | Jaringan Komputer | G132 | Mochammad Akbar Marwan / Dede Herman S |

---

## Struktur Direktori

```text
chosenwan/
├── branding/               # Berkas master logo SVG dan panduan identitas visual
├── docs/                   # Spesifikasi teknis (PRD, Design System, ERD, Spec)
├── public/                 # Favicon dan aset statis publik
├── src/
│   ├── app/                # Rute Next.js App Router (Landing, Portal, Login)
│   ├── components/
│   │   ├── auth/           # Komponen formulir login dan autentikasi
│   │   ├── info/           # Feed Info & Kampus, kartu pengumuman, dan detail sheet
│   │   ├── landing/        # Seksi landing page publik (Hero, Features, Workflow, Footer)
│   │   ├── layout/         # Header, BrandLogo, dan BottomNavigationBar
│   │   ├── publisher/      # Dashboard pengurus, formulir input konten, dan dialog konfirmasi
│   │   ├── schedule/       # Timeline jadwal kuliah statis dan pemilih hari
│   │   ├── tasks/          # Ringkasan bento tugas, kartu mendesak, filter, dan dialog tugas
│   │   └── ui/             # Komponen primitif antarmuka (shadcn/ui & lightbox)
│   ├── db/                 # Skema Drizzle ORM, koneksi libSQL, dan skrip seed database
│   ├── lib/
│   │   ├── actions/        # Server Actions mutasi data (auth, tasks, events, schedules, portal)
│   │   ├── auth.ts         # Utilitas manajemen sesi JWT dan verifikasi cookie
│   │   ├── imagekit.ts     # Integrasi upload dan pembersihan berkas ImageKit CDN
│   │   └── validations.ts  # Skema validasi Zod untuk formulir dan payload
│   └── types/              # Definisi tipe TypeScript domain portal dan state
├── AGENTS.md               # Aturan kepatuhan coding agent dan batas baris berkas
├── drizzle.config.ts       # Konfigurasi migrasi Drizzle ORM
└── package.json            # Daftar dependensi dan perintah proyek
```

---

## Panduan Instalasi Lokal

### 1. Kloning Repositori & Pasang Dependensi

```bash
git clone https://github.com/devilsduddee/chosenwan.git
cd chosenwan
npm install
```

### 2. Konfigurasi Environment Variables

Salin berkas template environment:

```bash
cp .env.example .env.local
```

Buka `.env.local` dan isi kredensial yang dibutuhkan:

```ini
TURSO_DATABASE_URL="libsql://chosenwan-devilsduddee.aws-ap-southeast-1.turso.io"
TURSO_AUTH_TOKEN="<token_turso_anda>"
SESSION_SECRET="<kunci_acak_minimal_32_karakter>"
IMAGEKIT_PUBLIC_KEY="<public_key_imagekit>"
IMAGEKIT_PRIVATE_KEY="<private_key_imagekit>"
IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/<id_imagekit>"
```

### 3. Migrasi & Seed Database

Terapkan skema tabel ke database Turso dan masukkan data awal:

```bash
npm run db:push
npm run db:seed
```

### 4. Jalankan Server Pengembangan

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) pada browser Anda.

---

## Konfigurasi Environment Variables (Vercel)

Saat melakukan deployment di platform **Vercel** (*Project Settings → Environment Variables*), masukkan variabel berikut:

1. `TURSO_DATABASE_URL` : URL koneksi Turso Cloud (format `libsql://...`).
2. `TURSO_AUTH_TOKEN` : Token autentikasi database Turso Cloud.
3. `SESSION_SECRET` : String rahasia minimal 32 karakter untuk enkripsi sesi JWT.
4. `IMAGEKIT_PUBLIC_KEY` : Public API Key dari dashboard ImageKit.io.
5. `IMAGEKIT_PRIVATE_KEY` : Private API Key dari dashboard ImageKit.io.
6. `IMAGEKIT_URL_ENDPOINT` : URL Endpoint dari dashboard ImageKit.io (`https://ik.imagekit.io/...`).

---

## Perintah Verifikasi & Kualitas Kode

Proyek ini menerapkan standar pemeriksaan kode yang ketat sebelum digabungkan ke cabang utama:

```bash
# Pemeriksaan tipe data TypeScript
npx tsc --noEmit

# Pemeriksaan gaya kode dan anti-slop ESLint
npm run lint

# Pengujian kompilasi produksi Next.js
npm run build
```

---

## Dokumentasi Terkait

- [Product Requirements Document (`docs/04-prd.md`)](docs/04-prd.md)
- [Design System & Panduan Bento (`docs/05-design.md`)](docs/05-design.md)
- [Spesifikasi Teknis & Arsitektur API (`docs/06-spec.md`)](docs/06-spec.md)
- [Aturan Implementasi (`docs/07-vibe-rules.md`)](docs/07-vibe-rules.md)
- [Aturan Pengembangan Agent (`AGENTS.md`)](AGENTS.md)
