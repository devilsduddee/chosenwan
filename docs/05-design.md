# 05 - Design System: Chosenwan

- **Versi:** 1.0
- **Tanggal:** 2026-11-17
- **Status:** Draft
- **Sumber input:** `04-prd.md` v1.4 dan referensi visual Dribbble Shot #26390603 (*Education App UI* oleh Tino).
- **Skill digunakan:** `design-md`, `antislop-copywriting`

## TL;DR

Chosenwan mengadopsi gaya visual *Playful Minimalist Bento* dari referensi Dribbble yang dikirim pengguna: kanvas putih bersih dengan sudut kartu membulat besar, pemisahan visual datar tanpa bayangan berat, aksen blok warna pastel yang energetik, serta jangkar kartu hitam pekat untuk informasi paling mendesak.

Seluruh elemen estetika dari referensi disesuaikan ketat dengan batas MVP di `04-prd.md` v1.4. Elemen di luar scope seperti *progress bar* tugas, pelacakan jam belajar, ilustrasi custom 3D/doodle berat, promo, dan *AI Assistant* tidak diadopsi agar pengembangan tetap ringan dan cepat dengan library komponen standar.

---

## Konteks Adaptasi Referensi

Referensi Dribbble (*Education App UI*) dipilih karena terasa segar untuk audiens mahasiswa dan membuat informasi akademik yang biasanya membosankan jadi lebih mudah dipindai lewat kartu berwarna dan angka ringkas. Agar selaras dengan `04-prd.md` v1.4 dan prinsip teknis di `profile.md`:

- **Diadopsi:** tata letak kartu bento 2x2 sebagai ringkasan cepat dan filter satu ketukan, kartu gelap berkontras tinggi untuk tugas dengan deadline terdekat, pill kategori berwarna pastel, navigasi bawah mobile-first, dan pemisahan kontainer berbasis warna datar.
- **Ditolak (Out of Scope):** *progress tracker* (`67%`), widget *My Activity* (`40h 32m`), kartu promo *Hot Offers*, tumpukan avatar kolaborator, antarmuka *AI Assistant*, serta aset ilustrasi doodle/3D custom.

---

## 1. Visual Theme & Atmosphere

Antarmuka Chosenwan dibangun dengan atmosfer **bersih, ringan, dan berenergi** (*Crisp & Playfully Structured*). Alih-alih mengandalkan daftar teks panjang seperti grup chat atau portal kampus konvensional, informasi dikelompokkan ke dalam blok kartu modular yang empuk secara visual.

Latar belakang utama menggunakan putih dingin yang terang sehingga mata pembaca tidak cepat lelah saat memindai tugas di ponsel. Untuk menciptakan hierarki fokus instan tanpa perlu teks panjang, sistem memadukan tiga kontras: latar netral untuk isi utama, blok warna pastel untuk membedakan kategori informasi (Tugas, Akademik, Berita Kampus, Info Lomba), dan kartu hitam pekat sebagai jangkar perhatian untuk deadline paling mendesak. Kedalaman antar-elemen bersifat datar (*flat*), mengandalkan kontras warna permukaan dan ruang napas alih-alih bayangan (*drop shadow*) yang berat.

---

## 2. Color Palette & Roles

Nilai warna di bawah diadaptasi dari referensi visual Dribbble (ekstraksi visual dari tangkapan layar referensi) dengan penyesuaian kontras teks agar nyaman dibaca di layar ponsel:

| Nama Deskriptif | Hex Code | Peran Fungsional |
|---|---|---|
| **Crisp Canvas White** | `#FFFFFF` | Permukaan kartu utama, modal, form input publisher, dan bilah navigasi bawah. |
| **Cool Alabaster Canvas** | `#F6F7FB` | Latar belakang utama halaman agar kartu putih tetap terpisah halus tanpa garis tebal. |
| **Soft Pewter Tint** | `#EEF1F6` | Kontainer sekunder, kolom pencarian, kartu statistik "Semua", dan permukaan tombol sekunder. |
| **Deep Jet Charcoal** | `#111318` | Jangkar fokus utama: kartu tugas deadline terdekat (*Urgent*), tombol aksi utama (CTA), teks judul utama, dan status tab aktif. |
| **Cool Slate Gray** | `#6E7485` | Teks pendukung, label waktu pembaruan, nama dosen/ruangan, dan ikon navigasi yang tidak aktif. |
| **Periwinkle Cornflower** | `#A8C0FF` | Blok warna kartu ringkasan/label kategori **Tugas & Akademik**, serta sorotan jadwal hari ini. |
| **Warm Honey Amber** | `#F6C866` | Blok warna untuk **Berita Kampus** dan penanda jadwal atau tugas yang mendekati tenggat (H-2 sampai H-3). |
| **Orchid Pastel Lilac** | `#EA9DFB` | Blok warna khusus untuk kategori **Info Lomba**, memberi pembeda visual yang menarik perhatian tanpa mencampur dengan tugas kuliah. |
| **Mint Emerald Pill** | `#4CD98B` | Pill status aman untuk tugas yang deadline-nya masih panjang (> 3 hari) dan pesan sukses publikasi. |
| **Coral Alert Red** | `#F05252` | Pill status mendesak untuk tugas deadline hari ini/besok atau lewat waktu, badge error validasi, dan aksi hapus. |
| **Hairline Mist Border** | `#E4E7F0` | Garis tepi tipis (`1px`) opsional pada input form dan pemisah daftar jadwal statis. |

> **Aturan Kontras (`[RISIKO]` Aksesibilitas):** Seluruh teks di atas blok warna pastel (`#A8C0FF`, `#F6C866`, `#EA9DFB`) wajib menggunakan **Deep Jet Charcoal (`#111318`)**, bukan putih, agar teks tetap tajam dan mudah dibaca di bawah cahaya terang. Teks putih (`#FFFFFF`) hanya dipakai di atas **Deep Jet Charcoal (`#111318`)** dan **Coral Alert Red (`#F05252`)**.

---

## 3. Typography Rules

- **Font Family:** Sans-serif geometris yang bersih dan modern, seperti **Plus Jakarta Sans** (prioritas utama untuk karakter ramah mirip referensi) atau **Inter** (opsi alternatif yang sangat terawat dan ringan di Google Fonts). Hindari font serif atau font dekoratif agar angka jam dan tanggal jadwal tetap mudah dipindai.
- **Hierarki & Bobot:**
  - **Page Greeting / Judul Halaman (`22-24px`, Bold 700, tracking rapat `-0.02em`):** Memberi pembuka yang jelas per tab (misal: *"Tugas Kelas"*, *"Info & Kampus"*, *"Jadwal Kuliah"*).
  - **Angka Ringkasan Bento (`26-28px`, ExtraBold 800, tabular numerals):** Dipakai pada ubin ringkasan 2x2 (misal jumlah tugas aktif atau jumlah info lomba terbaru) agar terlihat seperti angka dasbor yang tegas.
  - **Judul Kartu & Mata Kuliah (`15-16px`, SemiBold 600):** Cukup besar untuk terbaca satu lirikan di ponsel tanpa memakan banyak baris.
  - **Isi Instruksi / Pengumuman (`14px`, Regular 400, line-height `1.5`):** Nyaman dibaca untuk deskripsi tugas 2 sampai 4 baris.
  - **Metadata & Label Pill (`11-12px`, Medium 500-600):** Digunakan untuk jam deadline, label kategori (`Berita Kampus`, `Info Lomba`), dan timestamp pembaruan.

---

## 4. Component Stylings

Seluruh komponen dibangun menggunakan library UI standar (seperti shadcn/ui, Tailwind, atau setara sesuai keputusan stack nanti) tanpa menggambar komponen kompleks dari nol:

- **Buttons & CTAs:**
  - **Tombol Utama (Primary Action):** Berbentuk kapsul penuh (*pill-shaped*, `9999px`), latar **Deep Jet Charcoal (`#111318`)** dengan teks putih (`#FFFFFF`). Dipakai untuk tombol *"Terbitkan"* di halaman publisher, tombol *"Buka Link Pengumpulan"*, atau tombol aksi sirkular panah.
  - **Tombol Sekunder (Secondary Action):** Berbentuk kapsul penuh (`9999px`) dengan latar **Soft Pewter Tint (`#EEF1F6`)** dan teks `#111318`. Dipakai untuk *"Simpan Draft"* atau *"Batal"*.
  - **Tombol Destruktif:** Teks atau ikon **Coral Alert Red (`#F05252`)** dengan konfirmasi sebelum menghapus konten.
- **Cards & Containers:**
  - **Radius Sudut:** Sudut membulat besar (*generously rounded corners*, `20px-24px`) pada kartu bento, kartu tugas prioritas, dan kartu pengumuman agar terasa konsisten dengan gaya *mobile app* pada referensi.
  - **Bento Summary Tiles (2x2 Grid):** Empat kotak sejajar tanpa bayangan (*flat*), menggunakan warna latar pastel/netral (`#EEF1F6`, `#F6C866`, `#A8C0FF`, `#EA9DFB`) dengan angka jumlah item di kanan bawah dan ikon garis tipis di kiri atas. Mengetuk salah satu kotak langsung memfilter daftar di bawahnya.
  - **Kartu Tugas Prioritas (Dark Anchor Card):** Menggunakan latar **Deep Jet Charcoal (`#111318`)** dan teks putih (`#FFFFFF`) khusus untuk tugas dengan tenggat paling dekat (atau mendesak) di bagian atas daftar, meniru gaya kartu *Next Milestones* pada referensi.
  - **Kartu Daftar Standar:** Latar **Crisp Canvas White (`#FFFFFF`)** di atas kanvas `#F6F7FB`, dipisahkan dengan jarak antar-kartu (`12px`) tanpa drop shadow tebal.
- **Chips, Pills & Badges:**
  - Berbentuk kapsul penuh (`9999px`) berukuran ringkas (`padding vertikal 4px, horizontal 10px`).
  - Dipakai untuk status kedekatan deadline (`Hari Ini` / `Urgent` merah `#F05252`, `Aman` hijau `#4CD98B`), label mata kuliah, serta badge kategori info (`Akademik`, `Berita Kampus`, `Info Lomba`).
- **Inputs & Forms (Khusus Halaman Publisher):**
  - Kolom input memiliki sudut membulat sedang (`14px`), latar **Soft Pewter Tint (`#EEF1F6`)** atau putih dengan garis tepi **Hairline Mist (`#E4E7F0`)**.
  - Saat fokus (*active state*), garis tepi berubah menjadi **Deep Jet Charcoal (`#111318`)** (`1.5px`) agar pengguna ponsel tahu pasti kolom mana yang sedang diisi.
  - Pilihan kategori (`Tugas` vs `Pengumuman Simpel`, serta tag `Akademik`, `Berita Kampus`, `Info Lomba`) menggunakan tombol *segmented pill* agar publisher cukup satu ketukan tanpa membuka dropdown bertingkat.
- **Icons:**
  - Menggunakan satu paket ikon garis (*outline icons*) dengan ketebalan seragam (`1.75px`), misalnya **Lucide Icons**, tanpa mencampur dengan ilustrasi doodle atau ikon 3D.

---

## 5. Layout Principles & Pemetaan Layar Chosenwan

- **Mobile-First Container:** Meskipun berjalan di web, seluruh tampilan utama dirancang dengan lebar konten terpusat maksimal `480px` (`max-w-md` di tengah layar bila dibuka di desktop) agar proporsi bento, jarak kartu, dan posisi navigasi jempol tetap identik dengan aplikasi mobile pada referensi.
- **Whitespace & Rhythm:** Margin luar halaman konsisten `16px-20px`, jarak antar-kartu `12px`, dan jarak antar-bagian `24px`. Hindari menumpuk lebih dari 4 elemen metadata di dalam satu kartu agar kartu tidak penuh sesak di layar kecil.
- **Pemetaan Layar Inti (Sesuai `04-prd.md` v1.4):**
  1. **Header Ringkas:** Judul/identitas kelas di kiri (tanpa perlu avatar profil 3D untuk pembaca karena mahasiswa tidak login), dan tombol ikon *"Masuk Publisher"* / *"Tambah Info"* di kanan atas.
  2. **Bottom Navigation Bar (Docked Pill/Bar):** Tiga tab utama yang bersih (`Tugas`, `Info & Kampus`, `Jadwal`) sehingga berita kampus dan info lomba tidak menenggelamkan daftar tugas, ditambah tab/akses `Kelola` saat publisher sudah login.
  3. **Tab Tugas:** Kolom pencarian / filter pill mata kuliah di atas, bento 2x2 ringkas (atau 2x2 filter status: `Semua`, `Aktif`, `Minggu Ini`, `Lewat`), diikuti kartu gelap untuk tugas terdekat dan kartu putih untuk tugas lainnya.
  4. **Tab Pengumuman & Info:** Filter chip horizontal (`Semua`, `Akademik`, `Berita Kampus`, `Info Lomba`) di bagian atas, diikuti daftar kartu berwarna aksen kategori tipis (badge warna `Periwinkle`, `Amber`, `Orchid`) dengan tautan sumber resmi yang langsung bisa diklik.
  5. **Tab Jadwal Statis:** Pemilih hari horizontal 5 sampai 6 hari (`Sen`, `Sel`, `Rab`, `Kam`, `Jum`, `Sab`) bergaya strip kalender referensi (hari aktif ditandai kapsul vertikal **Deep Jet Charcoal `#111318`**), menampilkan kartu jadwal hari tersebut secara berurutan menurut jam mulai.
  6. **Area Publisher (Login & Editor):** Antarmuka form satu halaman per tipe konten dengan dua tombol permanen di bawah: **Simpan Draft** (sekunder) dan **Terbitkan** (utama hitam pekat), serta daftar postingan dengan filter `Published` dan `Draft`.

---

## Asumsi & Risiko

- `[ASUMSI]` Mahasiswa mengakses portal dominan lewat browser ponsel (WhatsApp in-app browser atau Chrome/Safari mobile), sehingga batas lebar tampilan `480px` di desktop tetap nyaman dan tidak menyulitkan.
- `[ASUMSI]` Penghilangan ilustrasi 3D/doodle custom tidak mengurangi daya tarik portal selama hierarki warna blok pastel dan kartu gelap tetap konsisten.
- `[RISIKO]` Terlalu banyak warna pastel sekaligus pada satu daftar kartu bisa membuat mata lelah. Gunakan warna blok penuh **hanya** pada kartu bento ringkasan dan pill kategori; daftar konten di bawahnya tetap dominan putih (`#FFFFFF`) dan hitam (`#111318`).

## Out of scope

- Membuat aset ilustrasi 3D atau doodle vector custom dari nol.
- Mendesain tampilan *AI Assistant*, *Hot Offers*, *Progress Tracker*, atau grafik *My Activity* seperti yang muncul pada referensi Dribbble.
- Mengunci framework CSS atau component library tertentu sebelum tahap spesifikasi teknis (`06-spec.md`).
- Desain halaman registrasi akun mahasiswa umum atau portal multi-kelas.
