# 01 — Discovery: Chosenwan

- **Versi:** 1.0
- **Tanggal:** 2026-11-11
- **Status:** Draft
- **Sumber input:** Percakapan dengan pemilik ide dan observasi yang ia ceritakan tentang grup kelas.
- **Skill digunakan:** `pm-brainstorming` (pendekatan JTBD/problem validation), `antislop-copywriting`

## TL;DR

Mahasiswa kelas pengguna kesulitan mencari ulang tugas dan informasi kuliah di chat WhatsApp yang sudah panjang. Mereka memakai search atau meminta teman mengirim ulang; keduanya terasa merepotkan. Observasi awal menunjukkan teman di grup memang pernah meminta tugas dikirim ulang, tetapi frekuensi dan cakupan masalah belum diukur.

Ide awal Chosenwan adalah portal web mobile-first untuk satu kelas. Fokus yang dipilih pengguna adalah tugas/pengumuman dosen dan jadwal kuliah. Ini masih arah solusi, bukan bukti bahwa portal atau AI summary pasti dibutuhkan.

**Keputusan yang dibutuhkan:** setujui problem statement dan lanjut ke tahap framing, lakukan validasi dulu, ubah arah, atau berhenti.

## Konteks dan alasan

Saat ini dosen mengirim informasi lewat WhatsApp kepada ketua kelas atau penanggung jawab mata kuliah. Informasi diteruskan ke grup kelas dan bercampur dengan chat lain. Mahasiswa mencari ulang lewat search WhatsApp atau bertanya kepada teman. Pengguna mengatakan pencarian sulit dan balasan teman kadang lama. Informasi kampus juga muncul di Instagram dan website.

### Temuan awal

**Observasi yang dilaporkan pengguna:**
- Teman di grup kelas pernah menanyakan tugas mata kuliah tertentu ada di mana dan meminta dikirim ulang karena sulit ditemukan.
- Pengguna sendiri merasa search WhatsApp sulit; bertanya kepada teman bisa lama dibalas.
- Informasi yang dimaksud mencakup tugas dan pengumuman dosen. Perubahan jadwal juga masuk prioritas awal yang dipilih pengguna.

**Batas bukti:** Ini berasal dari pengalaman pengguna dan percakapan grup yang ia ceritakan. Belum ada wawancara terstruktur, hitungan frekuensi, atau konfirmasi dari seluruh kelas. Belum diketahui apakah mahasiswa mengalami friksi yang sama saat mencari jadwal.

## JTBD

**Core Job (Job Story):**

> When gue perlu mengecek lagi tugas, pengumuman dosen, atau jadwal kelas,
> I want to menemukan informasi yang dicari tanpa susah mencari di chat atau menunggu teman membalas,
> So I can tahu detail dan langkah berikutnya dengan cepat.

**Dimensi job:**
- **Functional:** menemukan kembali tugas, pengumuman, deadline, link pengumpulan, dan jadwal kuliah.
- **Emotional:** tidak merasa repot atau bergantung pada orang lain untuk mencari informasi kelas. `[ASUMSI]`
- **Social:** tidak perlu berulang kali meminta teman mengirim ulang informasi. `[ASUMSI]`

**Current workaround & struggle:**
- **Solusi saat ini:** search di WhatsApp atau bertanya kepada teman; ketua kelas/PJ meneruskan info dari dosen ke grup kelas.
- **Friksi:** pencarian terasa sulit dan teman tidak selalu cepat membalas.

**Bukti:** Pengalaman pribadi pengguna dan cerita bahwa teman sekelas meminta tugas dikirim ulang. **Yang belum divalidasi:** frekuensi, skala kelas yang terdampak, waktu yang terbuang, serta apakah masalah berlaku sama untuk jadwal.

## Problem statement

> Mahasiswa di kelas pengguna kesulitan mencari kembali tugas, pengumuman dosen, dan jadwal kuliah karena informasi masuk ke beberapa kanal dan tertumpuk di chat WhatsApp. Mereka memakai search atau meminta teman mengirim ulang. Frekuensi dan dampaknya terhadap seluruh kelas belum diukur.

Problem statement ini menggambarkan masalah yang dilaporkan, bukan kesimpulan bahwa semua mahasiswa mengalaminya.

## 5 Whys

1. **Kenapa mahasiswa meminta tugas dikirim ulang?** Karena mereka sulit menemukan pesan tugas di grup yang sudah panjang. *(Dilaporkan pengguna.)*
2. **Kenapa sulit ditemukan?** Informasi tugas bercampur dengan pesan dan chat lain di WhatsApp. *(Dilaporkan pengguna.)*
3. **Kenapa mereka tidak cukup mengandalkan search WhatsApp?** Pengguna mengatakan pencariannya sulit, tetapi belum diketahui apakah penyebabnya keyword, hasil yang banyak, konteks pesan, atau faktor lain. `[PERTANYAAN]`
4. **Kenapa mereka bertanya kepada teman?** Search tidak menyelesaikan kebutuhan mereka dengan mudah; teman menjadi jalur alternatif. *(Interpretasi dari workaround yang diceritakan.)*
5. **Kenapa belum ada tempat yang lebih mudah untuk mencari info kelas?** Belum diketahui apakah kelas pernah mencoba solusi lain atau siapa yang punya mandat dan waktu untuk mengelolanya. `[PERTANYAAN]`

**Kesimpulan sementara:** bukti mendukung adanya friksi pencarian ulang di WhatsApp, tetapi akar penyebab yang lebih dalam dan luasnya masalah belum cukup diketahui.

## Arah solusi yang sedang dipertimbangkan

Ini hipotesis produk, bukan hasil validasi:
- Portal publik tanpa login untuk mahasiswa kelas.
- Ketua kelas dan PJ mata kuliah login untuk mengelola informasi.
- Publisher meneruskan pesan WhatsApp; sistem membantu menyusun ringkasan sebagai draft.
- Publisher memilih kategori mata kuliah secara manual, memeriksa ringkasan, lalu menyetujuinya sebelum tayang.
- Pesan asli disimpan agar informasi ringkas bisa diperiksa.

### Kebutuhan informasi MVP yang dipilih pengguna

**Tugas:** mata kuliah, minggu ke berapa, detail/instruksi tugas, deadline, tempat atau link pengumpulan, serta lampiran/referensi bila ada. Pelacakan status pengerjaan/pengumpulan tidak masuk MVP.

**Jadwal:** hari/tanggal, jam, mata kuliah, kelas/ruangan, dosen, dan penanda perubahan jadwal.

**Fitur lanjutan:** informasi oprec lab, lomba, dan acara.

## Asumsi dan risiko

- `[ASUMSI]` Portal akan lebih mudah dipakai untuk menemukan ulang informasi daripada chat WhatsApp.
- `[ASUMSI]` Ketua kelas dan PJ bersedia meneruskan info dan memeriksa draft sebelum tayang.
- `[RISIKO]` Ringkasan dapat keliru membaca deadline, ruangan, atau instruksi. Pesan asli perlu tersedia untuk pemeriksaan.
- `[RISIKO]` Workflow forward dan approval tetap bisa terasa merepotkan, sehingga publisher tidak rutin mengisi portal.
- `[ASUMSI]` Informasi mata kuliah aman dibaca publik. Pengguna menyatakan tidak ada informasi rahasia dalam scope pilot.

## Pertanyaan terbuka

- Seberapa sering teman meminta tugas dikirim ulang?
- Apakah mahasiswa juga kesulitan menemukan jadwal, dan seberapa sering?
- Apa yang membuat search WhatsApp terasa sulit?
- Apakah ketua kelas dan PJ bersedia memakai workflow forward, review, dan approval?
- Bagaimana mahasiswa tahu informasi yang tampil masih terbaru dan benar?
- Apa identitas kelas pilot, dan apakah publisher serta mahasiswa sudah bersedia mencoba?

## Out of scope

- Mengklaim masalah ini mewakili semua mahasiswa atau seluruh kampus.
- Memutuskan stack, integrasi WhatsApp, atau vendor AI.
- Merancang task tracking atau sistem pengumpulan tugas.
- Memasukkan oprec, lomba, dan acara sebagai prioritas MVP.
- Menganggap AI summary sebagai fitur yang sudah tervalidasi.

## Checkpoint masalah

Problem statement dan 5 Whys di atas masih draft. Pilih arah sebelum lanjut ke framing:

- **Lanjut:** setujui problem framing dan lanjut ke opportunity mapping.
- **Validasi dulu:** kumpulkan bukti tambahan dari mahasiswa/publisher kelas.
- **Ubah arah:** revisi siapa yang mengalami masalah atau masalah yang diprioritaskan.
- **Berhenti:** jangan lanjutkan project.
