# Rencana Pembaruan Landing Page — Chosenwan (Sesuai PRD v1.5 & v1.6)

Dokumen ini merinci rencana pembaruan antarmuka dan copywriting landing page Chosenwan agar selaras 100% dengan **PRD v1.5 & v1.6 (`docs/04-prd.md`)**, serta mematuhi panduan desain `design-taste-frontend`, `emil-design-eng`, `mobile-native`, dan `antislop-copywriting`.

---

## 1. Analisis Kesenjangan (Gap Analysis) Antara Landing Page Saat Ini vs PRD Baru

| Bagian Halaman | Kondisi Saat Ini | Spesifikasi Baru PRD v1.5 & v1.6 | Tindakan Perbaikan |
|---|---|---|---|
| **Hero Copywriting** | Menyebut *"Mahasiswa langsung cek deadline tugas ... tanpa login"* | **FR-01 & NFR-02:** Akses Tugas di-gated khusus Anggota Kelas (wajib login) demi melindungi link pengumpulan Google Drive/LMS; Jadwal & Event tetap publik | Perbarui headline/subhead: tegaskan bahwa Jadwal & Event publik instan tanpa login, sedangkan Tugas privat aman via login kelas |
| **Hero Bento Preview** | Menampilkan kartu tugas IMK tanpa penanda status privasi | **FR-01:** Menjelaskan secara visual bahwa area Tugas diproteksi untuk anggota kelas | Tambahkan badge proteksi visual (misal `🔒 Khusus Anggota`) pada kartu tugas di pratinjau bento |
| **Bento Fitur (`LandingFeatures`)** | Memuat 5 kartu umum, belum menyorot privasi link GDrive, pin info penting, dan poster CDN | **FR-01, FR-04, FR-06, NFR-04:** Privasi link tugas, Jadwal statis publik, Pin info penting (misal UTS), Poster event ImageKit, Multi-peran, dan PWA | Susun ulang menjadi 6 kartu bento berimbang (grid 3x2) dengan token Playful Bento resmi |
| **Alur Pakai (`LandingWorkflow`)** | Hanya ada 2 kolom: Mahasiswa (klaim tanpa login untuk tugas) dan Publisher | **Bagian 3 Target Users & FR-02:** Ada 3 persona nyata: 1) Tamu Publik (Jadwal & Info), 2) Anggota Kelas (Tugas Privat), 3) Publisher (PJ & Ketua Kelas) | Perluas menjadi 3 kartu alur pengguna yang merefleksikan peran dan hak akses secara presisi |
| **Footer & Navigasi** | CTA hanya mengarah ke portal publik | **Target Users:** Menyediakan akses cepat masuk akun kelas dan jelajah jadwal publik | Tambahkan aksi sekunder untuk Login Anggota Kelas |

---

## 2. Struktur Tugas (Task Breakdown)

### Task 1: Pembaruan Hero Section (`LandingHero.tsx`)
- **Tujuan:** Menyelaraskan teks nilai utama (*value proposition*) dengan model keamanan dua lapis (Jadwal Publik vs Tugas Privat Kelas) dan memperkaya visual pratinjau bento.
- **Perubahan Spesifik:**
  - Perbarui subjudul: *"Jadwal kuliah dan agenda kampus dapat diakses langsung tanpa login. Daftar tugas dan tautan pengumpulan diamankan khusus untuk mahasiswa kelas 3IA01."*
  - Pada baris helper, beri label pembeda: *Akses Publik (Jadwal & Info)* dan *Akses Privat (Tugas Kelas)*.
  - Pada pratinjau bento kanan, sematkan badge status *🔒 Khusus Anggota* pada item tugas IMK untuk mengomunikasikan keamanan data secara visual.
- **Kepatuhan Desain:** Menjaga lebar `max-w-6xl`, tombol 48px `whitespace-nowrap`, dan active scale 0.98.

### Task 2: Restrukturisasi Bento Fitur Utama (`LandingFeatures.tsx`)
- **Tujuan:** Menampilkan 6 pilar fungsional produk sesuai PRD v1.5 & v1.6 dalam layout grid bento 3x2 yang proporsional di desktop dan mobile.
- **Rincian 6 Kartu Bento:**
  1. **Tugas Kelas Privat & Aman (Dark Anchor `#111318`):** Melindungi tugas dan tautan Google Drive/LMS dari akses luar (FR-01, NFR-02).
  2. **Jadwal Kuliah Statis Publik (Pastel Honey Amber `#F6C866`):** Jadwal tetap Senin–Sabtu, jam, ruangan, dan dosen tanpa perlu login (FR-06).
  3. **Info Akademik & Pin Pengumuman (Pastel Periwinkle `#A8C0FF`):** Info pindah ruang dan fitur sematkan (*pin*) info genting seperti Jadwal UTS di urutan teratas (FR-04, v1.6).
  4. **Berita Kampus & Info Lomba (Pastel Orchid Lilac `#EA9DFB`):** Agenda kompetisi dan kabar kampus dengan dukungan poster visual CDN ImageKit (FR-04, NFR-04).
  5. **Sistem Multi-Peran & Opsi Draft (White Container `#FFFFFF`):** Anggota kelas (read-only), PJ matkul dan ketua kelas (buat/edit, simpan draft vs langsung terbitkan tanpa antrean persetujuan) (FR-02, FR-05).
  6. **Aplikasi Web Mandiri / PWA (Soft Container `#EEF1F6`):** Pasang langsung di layar utama iOS & Android tanpa harus mengunduh dari App Store / Play Store.

### Task 3: Pembaruan Alur Pakai 3 Persona (`LandingWorkflow.tsx`)
- **Tujuan:** Mengganti 2 kolom alur lama menjadi 3 kolom alur yang presisi sesuai Bagian 3 Target Users PRD:
  1. **Pengunjung Publik & Tamu (Tanpa Login):** Buka peramban, cek jadwal kuliah harian dan informasi event/lomba seketika.
  2. **Anggota Kelas (Login Mahasiswa / Read-Only):** Masuk dengan nama akun dan kata sandi kelas, akses tugas, deadline, instruksi pengerjaan, dan buka link pengumpulan Google Drive secara privat.
  3. **Ketua Kelas & PJ Matkul (Publisher):** Masuk ke dashboard kelola untuk membuat tugas baru, menyematkan (*pin*) pengumuman darurat/UTS, atau menyimpan draft sebelum tayang.

### Task 4: Penyelarasan Footer & CTA Penutup (`LandingFooter.tsx`)
- **Tujuan:** Memperbarui banner penutup dengan pesan inklusif untuk pengunjung publik dan anggota kelas yang ingin login.
- **Aksi:** Tombol primer *Buka Jadwal Publik* dan tombol sekunder *Masuk Akun Kelas*.

### Task 5: Pengujian Visual, Responsivitas, & Verifikasi Build
- **Tujuan:** Memastikan halaman lulus `npm run build`, bebas error TypeScript, dan tampil sempurna di mobile (375x812) serta desktop (1280x800) tanpa teks tumpang tindih (*anti-slop* dan *mobile-native* compliant).

---

## 3. Matriks Risiko & Mitigasi

| Risiko Potensial | Dampak | Mitigasi |
|---|---|---|
| Konten landing page terlalu panjang (*bloated*) | Pengguna lelah menggulir (*scroll fatigue*) | Batasi setiap kartu bento pada satu ide pokok yang padat dan jelas, gunakan tipografi ringkas sesuai `antislop-copywriting` |
| Batas 500 baris kode per file terlampaui | Melanggar aturan `AGENTS.md` | Setiap komponen modular tetap berada di file terpisah (`LandingHero`, `LandingFeatures`, `LandingWorkflow`, `LandingFooter`) dengan panjang masing-masing < 250 baris |
| Inkonsistensi token warna Playful Bento | Desain terlihat berantakan | Gunakan token warna kanonik: `#F6F7FB` (kanvas), `#FFFFFF` (kartu), `#111318` (anchor), `#A8C0FF` (periwinkle), `#F6C866` (honey amber), `#EA9DFB` (orchid lilac) dengan kontras teks `#111318` di atas pastel |
