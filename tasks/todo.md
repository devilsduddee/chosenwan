# Task List: Pembaruan Landing Page Sesuai PRD v1.5 & v1.6

- [x] **Task 1: Pembaruan Hero Section (`LandingHero.tsx`)**
  - **Deskripsi:** Perbarui copy hero untuk menjelaskan model dua lapis (Jadwal Publik vs Tugas Privat Kelas) dan tambahkan indikator privasi pada pratinjau bento.
  - **Acceptance Criteria:**
    - [x] Subjudul hero menjelaskan jadwal publik tanpa login dan tugas kelas berproteksi privasi.
    - [x] Baris helper bawah memisahkan *Akses Publik* dan *Akses Privat Kelas*.
    - [x] Kartu tugas pada pratinjau bento kanan menampilkan penanda visual *Khusus Anggota / Privat*.
  - **Files:** `src/components/landing/LandingHero.tsx`

- [x] **Task 2: Restrukturisasi 6 Pilar Bento Fitur (`LandingFeatures.tsx`)**
  - **Deskripsi:** Bangun ulang fitur bento menjadi grid 3x2 berimbang (6 kartu) yang mencakup Privasi Tugas, Jadwal Statis, Pin Info Akademik/UTS, Poster Lomba/Event CDN, Multi-Peran & Opsi Draft, serta PWA.
  - **Acceptance Criteria:**
    - [x] 6 kartu bento tersusun rapi dalam grid responsif (`grid-cols-1 md:grid-cols-3` atau bento terpadu).
    - [x] Kartu Tugas menyorot privasi link Google Drive/LMS (FR-01).
    - [x] Kartu Pengumuman menyorot fitur *Pin Info Penting* (FR-04, v1.6).
    - [x] Kartu Event menyorot poster visual resolusi tinggi ImageKit (FR-04, NFR-04).
    - [x] Seluruh kartu pastel (`#A8C0FF`, `#F6C866`, `#EA9DFB`) menggunakan teks gelap `#111318` untuk ketajaman kontras.
  - **Files:** `src/components/landing/LandingFeatures.tsx`

- [x] **Task 3: Pembaruan Alur Pakai 3 Persona (`LandingWorkflow.tsx`)**
  - **Deskripsi:** Sajikan alur kerja 3 kolom yang merefleksikan 3 target user resmi: Tamu Publik, Anggota Kelas, dan Publisher.
  - **Acceptance Criteria:**
    - [x] Kolom 1: Pengunjung Publik (Akses jadwal kuliah & event tanpa login).
    - [x] Kolom 2: Anggota Kelas (Login kelas, akses tugas & link GDrive, read-only).
    - [x] Kolom 3: Ketua Kelas & PJ Matkul (Dashboard kelola, pin info, simpan draft vs terbitkan langsung).
  - **Files:** `src/components/landing/LandingWorkflow.tsx`

- [x] **Task 4: Penyelarasan Footer & Aksi Ganda (`LandingFooter.tsx`)**
  - **Deskripsi:** Perbarui pesan penutup dan sediakan aksi cepat untuk buka jadwal publik atau masuk ke akun kelas.
  - **Acceptance Criteria:**
    - [x] Menampilkan tombol primer *Buka Jadwal Publik* dan tombol sekunder *Masuk Akun Kelas*.
    - [x] Teks ajakan selaras dengan PRD baru.
  - **Files:** `src/components/landing/LandingFooter.tsx`

- [x] **Task 5: Pengujian Kualitas, Build, & Verifikasi Browser**
  - **Deskripsi:** Jalankan pemeriksaan build Next.js dan uji tampilan di viewport ponsel dan desktop.
  - **Acceptance Criteria:**
    - [x] `npm run build` sukses tanpa error dan tanpa warning TypeScript.
    - [x] Seluruh file berukuran di bawah 500 baris kode (`AGENTS.md` Rule 2).
    - [x] Tampilan responsif diuji pada 375x812 (mobile) dan 1280x800 (desktop).
