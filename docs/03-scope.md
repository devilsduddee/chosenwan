# 03 — Scope: Chosenwan

- **Versi:** 1.3
- **Tanggal:** 2026-11-24
- **Status:** Approved
- **Sumber input:** `01-discovery.md` v1.0, `02-opportunity.md` v1.0, dokumen desain database ERD serah-terima, keputusan pengguna (2026-11-17, 2026-11-20, & 2026-11-24).
- **Skill digunakan:** `scope-cutting`, matriks evaluasi praktikal RICE dari `profile.md`, `antislop-copywriting`

## TL;DR

MVP Chosenwan adalah portal web mobile-first untuk satu kelas pilot dengan pemisahan zona akses:
1. **Zona Publik (Tanpa Login):** Membuka **Jadwal Kuliah Statis** dan **Event / Info Kampus & Lomba**.
2. **Zona Privat Anggota Kelas (Wajib Login):** Membuka **Tugas Kuliah (Task)** beserta tautan pengumpulan (Google Drive / LMS). Akses ini dikunci khusus teman sekelas untuk melindungi privasi kelas dan mencegah pihak luar/kelas lain mengakses tautan pengumpulan tugas. Anggota kelas berstatus *Read-Only*.
3. **Pengurus Kelas (Ketua Kelas & PJ Mata Kuliah):** Login dengan hak publisher untuk membuat, mengedit, menyimpan `Draft`, atau langsung menerbitkan (*self-publish*) informasi tanpa bottleneck persetujuan bertingkat.

Tugas menampilkan detail, mata kuliah (relasi master `course`), deadline, tempat/link pengumpulan, dan referensi. Pengumuman dosen, perubahan jadwal insidental, berita kampus, dan info lomba memakai satu format entri `event` yang didukung gambar poster teroptimasi (ImageKit.io). Jadwal statis menampilkan hari, jam, mata kuliah, ruangan, dan dosen.

Scraping otomatis jadwal dan LLM / AI Chat Parser dicatat secara resmi sebagai rencana masa depan (`Won't have di MVP / Future Roadmap`).

## Konteks dan alasan

Masalah utama yang dipilih adalah sulit mencari ulang informasi akademik di chat WhatsApp yang panjang. Selain itu, masukan tim pengguna menyoroti dua friksi tambahan: berita kampus sering *misscom* di grup/kanal kampus, dan banyak mahasiswa kelas belum pernah ikut lomba sehingga butuh akses info lomba yang lebih rapi.

Pada revisi v1.3, atas alasan keamanan dan privasi kelas, **menu Tugas resmi di-gated untuk anggota kelas yang login**. Hal ini mencegah tautan pengumpulan Google Drive/LMS kelas terbuka bebas di internet.

Scope ini menjaga *appetite* MVP tetap ringan:
- Menjaga kebersihan database dengan 5 tabel relasional (`account`, `course`, `schedule`, `task`, `event`).
- Menghindari kompleksitas auth publik dengan model login berbasis akun anggota kelas (`name` dan `password` ter-hash).
- Tetap menyediakan akses instan tanpa login untuk jadwal dan event publik.

## Target pengguna dan batas pilot

- **Pengunjung Publik (Tamu):** Membaca Jadwal Kuliah Statis dan Event publik tanpa login. Akses ke menu Tugas ditolak (HTTP 401) dan diarahkan ke login.
- **Anggota Kelas (Member):** Teman sekelas yang login menggunakan akun kelas (`role = member`); memiliki akses baca (*Read-Only*) ke seluruh tugas dan tautan pengumpulan Google Drive/LMS.
- **Publisher:** Ketua kelas (`role = ketua_kelas`) dan PJ mata kuliah (`role = pj`); login untuk membuat, mengubah, atau menghapus informasi (langsung terbit tanpa approval berjenjang, dengan opsi simpan `Draft`).
- **Sumber informasi:** Dosen mengirim informasi kepada ketua kelas/PJ; untuk berita kampus dan info lomba, publisher mengkurasi manual dengan menyertakan tautan sumber resmi dan gambar poster.
- **Batas pilot:** Satu kelas. Nama kelas pilot disepakati.

## Must have

1. **Daftar informasi kelas terpisah yang jelas** antara Tugas (Privat), Event & Pengumuman (Akademik, Berita Kampus, Info Lomba), dan Jadwal Kuliah.
2. **Akses privat untuk Tugas**: Halaman dan data tugas wajib login akun anggota kelas demi keamanan tautan pengumpulan Google Drive / LMS.
3. **Detail tugas**: Mata kuliah (relasi `course`), judul, instruksi/detail, deadline (tanggal & jam), dan tautan pengumpulan privat.
4. **Event & Info simpel dengan dukungan poster**: Satu struktur entitas `event` untuk pengumuman dosen/umum (termasuk perubahan jadwal insidental), **Berita Kampus**, dan **Info Lomba** (judul, kategori info, mata kuliah opsional, rincian, tanggal, link sumber, dan poster via ImageKit.io).
5. **Jadwal kuliah statis**: Daftar jadwal tetap per semester (hari, jam mulai–selesai, mata kuliah, ruangan, dosen).
6. **Autentikasi multi-peran**: Login berbasis `name` dan `password` hash dengan pemisahan peran: `member` (read-only tugas), `pj` (editor tugas & event), dan `ketua_kelas` (moderator kelas & jadwal).

## Should have

- Pencarian dan filter berdasarkan mata kuliah serta kategori info (Akademik, Berita Kampus, Info Lomba).
- Waktu publikasi atau pembaruan agar pembaca dapat melihat kebaruan informasi.
- Kompresi gambar poster otomatis di sisi browser sebelum diunggah ke CDN ImageKit.io.
- `[SARAN MVP]` Tombol salin ringkasan tugas untuk dibagikan ulang ke grup WhatsApp bila diperlukan.

## Could have

- Bantuan AI / LLM untuk menyusun draft ringkasan tugas/event dari pesan chat WhatsApp (direncanakan pada Future Roadmap).
- Skrip scraping otomatis untuk menyinkronkan jadwal kuliah dan mata kuliah dari SIAKAD kampus (direncanakan pada Future Roadmap).
- Informasi oprec lab dan acara non-lomba lain setelah pola kurasi berjalan stabil.

## Won't have di MVP (Future Roadmap)

- **Scraping otomatis jadwal & mata kuliah:** Pengambilan otomatis data jadwal dari sistem kampus (skema DB sudah disiapkan siap-terima).
- **LLM / AI Chat Parser:** Fitur auto-fill form tugas dari forward pesan WhatsApp dosen (skema form Zod sudah kompatibel).
- Sistem kalender jadwal berulang dengan *override*/penanda perubahan per tanggal pertemuan.
- Modul event/lomba khusus (registrasi lomba, pencari teman tim, pengingat otomatis, kalender lomba terpisah).
- Tracking status tugas personal per mahasiswa (belum/sedang/sudah dikerjakan) dan pengumpulan file langsung di server Chosenwan.
- Workflow approval berjenjang oleh ketua kelas untuk postingan PJ.
- Portal seluruh kampus atau banyak kelas.

## Matriks evaluasi praktikal

| Fitur Kandidat | Reach (Jangkauan) | Impact (Dampak Nyata) | Confidence (Keyakinan Bukti) | Effort & Risiko Teknis | Keputusan Scope |
|---|---|---|---|---|---|
| Gated Tugas & link GDrive privat | Anggota kelas pilot | Sangat Tinggi: melindungi privasi tugas & link pengumpulan kelas | Tinggi: keputusan langsung pengguna & pemilik proyek | Rendah–sedang: proteksi sesi HTTP 401 di endpoint tugas | Must have |
| Event simpel + Poster ImageKit (Akademik, Berita, Lomba) | Pengunjung & anggota | Menjawab info dosen, misscom berita kampus, dan info lomba dengan visual poster | Sedang–tinggi; poster meningkatkan minat baca mahasiswa | Rendah–sedang via CDN ImageKit.io (tanpa beban DB) | Must have |
| Jadwal kuliah statis | Pengunjung & anggota | Membantu melihat jadwal tetap semester di satu tempat | Sedang; praktis dan stabil | Rendah; daftar jadwal statis per hari | Must have |
| Pencarian/filter mata kuliah & kategori info | Pengunjung & anggota | Mempercepat akses ke info yang dicari & mencegah campur aduk | Sedang–tinggi | Rendah | Should have |
| Login multi-peran (`member`, `pj`, `ketua_kelas`) | Seluruh pengguna kelas | Menjaga integritas data (hanya PJ/Ketua yang bisa edit, member read-only) | Tinggi; kebutuhan dasar keamanan sistem | Rendah–sedang via session cookie + hash password | Must have |
| Scraping otomatis jadwal kampus | Anggota kelas | Mengurangi input manual jadwal semester | Rendah di MVP; format SIAKAD kampus bisa berubah-ubah | Tinggi; perlu reverse engineer portal kampus | Won't have (Future Roadmap) |
| LLM / AI Chat Parser (WA to Form) | Ketua kelas & PJ | Mempercepat input tugas dari chat WA dosen | Sedang; eksperimen menarik untuk efisiensi | Sedang–tinggi; membutuhkan integrasi API LLM | Won't have (Future Roadmap) |

## Cost-benefit dan risiko

| Pilihan | Benefit | Cost/Risiko | Sikap scope |
|---|---|---|---|
| Tugas di-gated login, Jadwal/Event publik | Tautan Google Drive kelas aman dari akses luar/kelas lain; jadwal tetap mudah dicek | Mahasiswa harus mengingat nama akun & password kelas | Prioritaskan; pisahkan peran `member` (read-only) |
| Poster disimpan di ImageKit.io | Database tetap ringan, gambar dilayani cepat via CDN dengan fitur resize URL | Membutuhkan setup API key ImageKit di server Next.js | Prioritaskan; kuota 3 GB & 20 GB bandwidth gratis memadai |
| Menunda Scraping & AI Parser ke Future Roadmap | MVP selesai tepat waktu, arsitektur dasar stabil dan teruji | Pengurus menginput jadwal & tugas secara manual di awal | Tepat; arsitektur DB & Form sudah dipersiapkan modular |

## Asumsi dan pertanyaan terbuka

- `[ASUMSI]` Akun anggota kelas (`role = member`) dibagikan oleh ketua kelas/pengelola dengan username unik (`name`) dan password kelas.
- `[ASUMSI]` Tautan pengumpulan tugas berupa Google Drive / LMS yang membutuhkan proteksi privasi.
- `[RISIKO]` Jika anggota lupa password, reset password dilakukan manual oleh ketua kelas karena belum ada alur reset mandiri via email.
- `[RISIKO]` Beban kurasi poster dan info lomba berada pada inisiatif publisher.

## Out of scope

- Menentukan stack di luar Next.js, Turso, dan ImageKit.io.
- Modul pendaftaran lomba / pencarian tim internal.
- Otomasi scraping pada rilis perdana MVP.
- Integrasi WhatsApp bot langsung pada rilis perdana MVP.
- Pengumpulan file tugas di dalam storage server Chosenwan.

## Gate 1 — Persetujuan scope

Scope v1.3 telah disesuaikan dengan kebutuhan proteksi privasi tugas kelas, penyelarasan 5 tabel relasional standar (`account`, `course`, `schedule`, `task`, `event`), penambahan CDN poster ImageKit.io, serta pencatatan resmi fitur Scraping dan AI Chat Parser ke dalam Future Roadmap.

## Changelog

| Versi | Tanggal | Perubahan |
|---|---|---|
| 1.0 | 2026-11-11 | Draft awal scope MVP (tugas/pengumuman dosen, jadwal, review publisher). |
| 1.1 | 2026-11-17 | Menghapus workflow approval berjenjang oleh ketua kelas; memasukkan **Berita Kampus** dan **Info Lomba** sebagai kategori di Pengumuman Simpel; menambahkan catatan kurasi & risiko. |
| 1.2 | 2026-11-17 | Memangkas jadwal menjadi jadwal statis per semester tanpa sistem *override* per tanggal; perubahan jadwal insidental masuk ke Pengumuman & Info Simpel. |
| 1.3 | 2026-11-24 | Menyesuaikan model akses: **Tugas di-gated khusus Anggota Kelas (login)** untuk privasi link GDrive; Jadwal & Event tetap publik; menambahkan peran `member` (read-only); mendukung poster event ImageKit.io; mengadopsi 5 tabel standar; memindahkan fitur Scraping otomatis dan AI Chat Parser ke Future Roadmap. |
