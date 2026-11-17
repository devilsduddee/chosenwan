# 03 — Scope: Chosenwan

- **Versi:** 1.2
- **Tanggal:** 2026-11-17
- **Status:** Approved
- **Sumber input:** `01-discovery.md` v1.0, `02-opportunity.md` v1.0, keputusan pengguna (2026-11-11 & 2026-11-17).
- **Skill digunakan:** `scope-cutting`, matriks evaluasi praktikal RICE dari `profile.md`, `antislop-copywriting`

## TL;DR

MVP Chosenwan adalah portal web mobile-first untuk satu kelas. Mahasiswa dapat membuka informasi tanpa login. Ketua kelas dan PJ mata kuliah login untuk mengelola dan **langsung menerbitkan** tugas, jadwal statis, serta info/pengumuman kelas (termasuk **Berita Kampus**, **Info Lomba**, dan **perubahan jadwal insidental**).

Fokusnya mencari info dengan mudah menggunakan struktur seragam dan tipis — bukan membuat modul event/lomba terpisah, sistem kalender berulang dengan *override* per tanggal, task tracker, atau portal seluruh kampus. Tugas menampilkan detail, mata kuliah/minggu (opsional), deadline, tempat/link pengumpulan, dan referensi. Pengumuman dosen, perubahan jadwal insidental, berita kampus, dan info lomba memakai **satu format pengumuman simpel** yang dibedakan oleh kategori/tag info. Jadwal statis menampilkan hari, jam, mata kuliah, kelas/ruangan, dan dosen.

Forward WhatsApp dan AI summary ditunda ke iterasi lanjutan (`Could have`).

## Konteks dan alasan

Masalah utama yang dipilih adalah sulit mencari ulang informasi akademik di chat WhatsApp yang panjang. Selain itu, masukan tim pengguna menyoroti dua friksi tambahan: berita kampus sering *misscom* di grup/kanal kampus, dan banyak mahasiswa kelas belum pernah ikut lomba sehingga butuh akses info lomba yang lebih rapi.

Scope ini menjaga *appetite* MVP tetap ringan: menambah cakupan **Berita Kampus** dan **Info Lomba** tanpa menambah modul atau alur baru, melainkan menumpangkannya pada satu tipe konten **Pengumuman & Info Simpel**.

## Target pengguna dan batas pilot

- **Pembaca:** mahasiswa satu kelas; akses tanpa login.
- **Publisher:** ketua kelas dan PJ mata kuliah; login diperlukan untuk membuat, mengubah, atau menghapus informasi (langsung terbit tanpa approval berjenjang, dengan opsi simpan `Draft`).
- **Sumber informasi:** dosen mengirim informasi kepada ketua kelas/PJ; untuk berita kampus dan info lomba, publisher mengkurasi manual dengan menyertakan tautan sumber resmi bila ada.
- **Batas pilot:** satu kelas. Nama kelas belum ditentukan.

## Must have

1. **Daftar informasi kelas terpisah yang jelas** antara Tugas, Pengumuman & Info (Akademik/Umum, Berita Kampus, Info Lomba), dan Jadwal.
2. **Detail tugas**: mata kuliah (pilih manual), minggu ke-*n* (opsional), detail/instruksi, deadline, tempat atau link pengumpulan, dan lampiran/referensi bila ada.
3. **Pengumuman & Info simpel**: satu struktur ringkas untuk pengumuman dosen/umum (termasuk info perubahan jadwal insidental), **Berita Kampus**, dan **Info Lomba** (judul, kategori info, mata kuliah opsional, isi ringkas, link/lampiran sumber).
4. **Jadwal kuliah statis**: daftar jadwal tetap per semester (hari, jam, mata kuliah, kelas/ruangan, dosen).
5. **Akses publik untuk mahasiswa** tanpa akun mahasiswa, dan **login untuk publisher** (ketua kelas & PJ mata kuliah) yang langsung bisa menerbitkan konten.

## Should have

- Pencarian dan filter berdasarkan mata kuliah serta kategori info (Tugas, Akademik/Umum, Berita Kampus, Info Lomba).
- Waktu publikasi atau pembaruan agar pembaca dapat melihat kebaruan informasi.
- `[SARAN MVP]` Tombol salin ringkasan untuk dibagikan ulang ke grup WhatsApp agar publisher tidak kerja dua kali.

## Could have

- Bantuan AI untuk menyusun draft ringkasan dari pesan yang diteruskan publisher (dengan pesan asli tetap tersimpan untuk diperiksa).
- Saran kategori dari AI sebagai bantuan saja; publisher tetap memilih kategori final.
- Informasi oprec lab dan acara non-lomba lain setelah pola kurasi berjalan.

## Won't have di MVP

- Sistem kalender jadwal berulang dengan *override*/penanda perubahan per tanggal pertemuan.
- Modul event/lomba khusus (registrasi lomba, pencari teman tim, pengingat otomatis, kalender lomba terpisah).
- Scraping atau sinkronisasi otomatis dari Instagram/website kampus atau grup WhatsApp.
- Tracking status tugas (belum dikerjakan/sedang dikerjakan/sudah dikumpulkan) dan pengumpulan tugas di dalam portal.
- Workflow approval berjenjang oleh ketua kelas untuk postingan PJ.
- Publikasi otomatis dari AI tanpa aksi terbit publisher.
- Portal seluruh kampus atau banyak kelas.
- Oprec lab sebagai prioritas awal.

## Matriks evaluasi praktikal

| Fitur Kandidat | Reach (Jangkauan) | Impact (Dampak Nyata) | Confidence (Keyakinan Bukti) | Effort & Risiko Teknis | Keputusan Scope |
|---|---|---|---|---|---|
| Daftar tugas dan detail terstruktur | Mahasiswa satu kelas | Tinggi untuk menemukan ulang tugas | Sedang: ada contoh teman meminta tugas dikirim ulang, frekuensi belum diukur | Rendah–sedang; publisher perlu memasukkan data yang benar | Must have |
| Pengumuman simpel (Akademik/Umum + perubahan jadwal, Berita Kampus, Info Lomba) | Mahasiswa satu kelas | Menjawab info dosen, perubahan jadwal dadakan, misscom berita kampus, dan info lomba dalam satu pola | Sedang untuk akademik/misscom; rendah–sedang untuk lomba (feedback tim, belum diuji ke anak kelas) | Rendah jika memakai 1 tipe konten & form simpel yang sama | Must have (tanpa modul lomba terpisah) |
| Jadwal kuliah statis | Mahasiswa satu kelas | Membantu melihat jadwal tetap semester di satu tempat | Rendah–sedang: dipilih pengguna, contoh friksi jadwal belum ada | Rendah; cukup daftar jadwal tetap tanpa logika *override* tanggal | Must have (dipangkas jadi statis) |
| Pencarian/filter mata kuliah & kategori info | Mahasiswa satu kelas | Mempercepat akses ke info yang dicari & mencegah campur aduk konten | Sedang; wajib ada agar info lomba & berita kampus tidak menenggelamkan tugas | Rendah–sedang | Should have; sangat dianjurkan di v1 |
| Login publisher (langsung publish + opsi Draft) | Ketua kelas/PJ serta pembaca | Menghilangkan bottleneck approval sambil menjaga kontrol penulis | Tinggi sebagai keputusan alur pengguna | Rendah–sedang; autentikasi & role | Must have |
| Forward pesan + AI draft summary | Ketua kelas/PJ | Berpotensi mengurangi ketik ulang | Rendah; masih ide pengguna, belum diuji | Tinggi relatif; mekanisme ingestion belum ditentukan | Could have |
| Modul lomba khusus / team matching / tracking tugas | Mahasiswa | Tidak sebanding dengan risiko scope creep di pilot 1 kelas | Rendah | Tinggi | Won't have |

## Cost-benefit dan risiko

| Pilihan | Benefit | Cost/Risiko | Sikap scope |
|---|---|---|---|
| Informasi ditata terstruktur dan dapat dicari | Mahasiswa tidak perlu menggali chat panjang untuk detail tugas | Publisher harus menjaga data tetap lengkap dan terbaru | Prioritaskan; mulai dengan satu kelas |
| Login publisher, pembaca tanpa login | Akses mudah bagi mahasiswa, perubahan konten punya publisher teridentifikasi | Akun publisher dan kontrol akses perlu dibangun; akses publik membuat konten terlihat di luar kelas | Sesuai keputusan pengguna; hindari memuat data pribadi/rahasia |
| AI membuat ringkasan | Mengurangi pengetikan ulang jika alur input sederhana | Salah membaca instruksi/deadline; biaya dan integrasi belum diketahui; publisher tetap harus memeriksa | Jangan auto-publish; jadikan opsi dan validasi feasibility |
| Task tracking | Dapat membantu mengelola pengerjaan | Menambah banyak state dan bukan kebutuhan inti yang dipilih | Pangkas dari MVP |
| Banyak kanal/kategori sejak awal | Cakupan konten lebih luas (termasuk berita kampus & info lomba) | Moderasi dan beban kurasi publisher meningkat | Pakai 1 struktur Pengumuman Simpel dengan tag kategori; jangan buat modul event terpisah |

## Asumsi dan pertanyaan terbuka

- `[ASUMSI]` Informasi tugas terstruktur akan lebih mudah dicari daripada pesan WhatsApp.
- `[ASUMSI]` Ketua kelas dan PJ bersedia login, input info kuliah, serta mengkurasi berita kampus dan info lomba secara manual dengan menyertakan tautan sumber resmi.
- `[ASUMSI]` Menaruh info lomba membantu *awareness*, walau belum tervalidasi apakah alasan anak kelas belum pernah ikut lomba benar-benar karena kurang informasi atau faktor lain (tim, rasa percaya diri, waktu).
- `[RISIKO]` Jika publisher tidak rutin memperbarui tugas, berita kampus, dan lomba (termasuk menandai info yang sudah kedaluwarsa), portal cepat kehilangan kepercayaan.
- `[RISIKO]` Akses tanpa login berarti informasi yang dipublikasikan dapat dilihat di luar kelas; pengguna menilai konten mata kuliah tidak rahasia.
- `[PERTANYAAN]` Siapa yang bertanggung jawab memverifikasi sumber berita kampus dan info lomba sebelum diterbitkan?
- `[PERTANYAAN]` Apakah PJ mata kuliah boleh mengedit postingan lintas mata kuliah, atau cukup pembuat asli + ketua kelas?

## Out of scope

- Menentukan stack, vendor autentikasi, database, model AI, atau integrasi WhatsApp.
- Modul lomba/event terpisah (pendaftaran, team matching, kalender lomba).
- Scraping otomatis dari Instagram atau website kampus.
- Verifikasi kebutuhan secara representatif di seluruh kelas/kampus.
- Mengelola tugas mahasiswa atau menerima hasil pengumpulan.
- Membangun portal lintas kampus.

## Gate 1 — Persetujuan scope

Scope v1.2 telah diperbarui sesuai arahan pengguna (2026-11-17): publikasi langsung tanpa approval berjenjang, penambahan **Berita Kampus** dan **Info Lomba** lewat satu struktur Pengumuman Simpel, serta penyederhanaan jadwal menjadi **jadwal statis** (perubahan insidental masuk Pengumuman).

## Changelog

| Versi | Tanggal | Perubahan |
|---|---|---|
| 1.0 | 2026-11-11 | Draft awal scope MVP (tugas/pengumuman dosen, jadwal, review publisher). |
| 1.1 | 2026-11-17 | Menghapus workflow approval berjenjang oleh ketua kelas; memasukkan **Berita Kampus** dan **Info Lomba** sebagai kategori di Pengumuman Simpel tanpa membuat modul event terpisah; menambahkan catatan kurasi & risiko. |
| 1.2 | 2026-11-17 | Memangkas jadwal menjadi jadwal statis per semester tanpa sistem *override* per tanggal; perubahan jadwal insidental masuk ke Pengumuman & Info Simpel. |
