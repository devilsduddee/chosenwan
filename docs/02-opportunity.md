# 02 — Opportunity: Chosenwan

- **Versi:** 1.0
- **Tanggal:** 2026-11-11
- **Status:** Draft
- **Sumber input:** `01-discovery.md` v1.0 dan keputusan pengguna dalam percakapan.
- **Skill digunakan:** JTBD dari `profile.md`; `opportunity-mapping` tidak tersedia di sesi ini; `antislop-copywriting`

## TL;DR

Peluang utama Chosenwan adalah membantu mahasiswa menemukan ulang tugas dan informasi kelas tanpa harus menggali chat WhatsApp atau menunggu teman membalas. Peluang pendukungnya adalah membuat jadwal kuliah dan perubahan jadwal mudah dilihat. Untuk tugas kuliah ini, framing memakai pengalaman yang sudah diceritakan pengguna; tidak ada riset tambahan.

Arah solusi yang dipilih pengguna adalah portal web mobile-first untuk satu kelas. Publisher meneruskan pesan dosen, memeriksa draft ringkasan, memilih kategori mata kuliah, lalu menyetujui publikasi. Ini keputusan arah produk dari pengguna, bukan bukti bahwa AI summary adalah cara terbaik.

## Konteks

Mahasiswa menerima informasi lewat grup WhatsApp dan kanal kampus lain. Pesan tugas bisa tertumpuk. Workaround yang disebutkan adalah search WhatsApp dan meminta teman mengirim ulang. Pengguna mengatakan search terasa sulit dan teman bisa lama membalas. Ada contoh teman sekelas yang bertanya tugas mata kuliah tertentu ada di mana dan meminta dikirim ulang.

## Job yang ingin diselesaikan

> Ketika gue perlu mengecek lagi tugas, pengumuman dosen, atau jadwal kelas, gue ingin menemukan informasi yang dicari tanpa susah mencari di chat atau menunggu teman membalas, supaya gue bisa tahu detail dan langkah berikutnya dengan cepat.

## Peluang produk

| Peluang | Kebutuhan pengguna | Bukti saat ini | Arah yang dipilih | Batasan/risiko |
|---|---|---|---|---|
| Menemukan ulang tugas dengan cepat | Cari detail tugas, mata kuliah, minggu, deadline, dan tempat pengumpulan | Pengguna melaporkan teman meminta tugas dikirim ulang; search WA dirasa sulit | Tampilkan tugas terstruktur dan mudah dicari | Frekuensi kebutuhan belum diukur; data tugas harus tetap akurat |
| Mengurangi ketergantungan pada balasan teman | Dapatkan jawaban sendiri tanpa menunggu teman | Pengguna mengatakan balasan teman bisa lama | Portal dapat dibaca mahasiswa tanpa login | Informasi harus cukup lengkap dan terbaru agar tidak kembali perlu bertanya |
| Membuat jadwal kuliah mudah ditemukan | Lihat hari, jam, mata kuliah, kelas/ruangan, dan dosen | Jadwal dipilih pengguna sebagai prioritas MVP, tetapi masalah aktual saat mencarinya belum diceritakan secara spesifik | Halaman jadwal dengan detail umum dan penanda perubahan | Kebutuhan jadwal belum didukung contoh kejadian langsung |
| Mengurangi beban publikasi bagi ketua kelas/PJ | Terbitkan informasi tanpa mengetik ulang semuanya | Pengguna mengusulkan forward pesan dan bantuan ringkasan | Forward menjadi masukan, AI membuat draft, publisher review dan approve | Mekanisme forward dari WhatsApp ke web belum ditentukan; tambahan langkah dapat mengurangi adopsi |
| Menghindari salah kategori dan ringkasan | Pastikan info masuk ke mata kuliah dan detail yang benar | Kekhawatiran bias kategori dan miss informasi disampaikan pengguna | Kategori mata kuliah dipilih manual; draft diperiksa sebelum tayang | Review tetap memerlukan waktu; pesan asli perlu tersedia sebagai rujukan |

## Prioritas peluang

### Fokus utama

**Kurangi usaha mencari ulang tugas kelas.** Ini peluang dengan sinyal paling nyata dalam cerita yang tersedia: chat tugas tertumpuk, search terasa sulit, dan teman meminta tugas dikirim ulang.

### Fokus pendukung

**Tampilkan jadwal kuliah dengan jelas.** Pengguna memilih jadwal sebagai prioritas MVP dan menyebut detail yang dibutuhkan. Namun, pengalaman konkret mahasiswa kesulitan mencari jadwal belum dikonfirmasi. Pertahankan sebagai kebutuhan yang dipilih pengguna, sambil menandai confidence lebih rendah.

### Enabler operasional

**Buat publikasi info tidak merepotkan dan tetap bisa diperiksa.** Forward + draft ringkasan + pilihan kategori manual + approval adalah arah yang dipilih pengguna. Jangan anggap AI wajib untuk menyelesaikan problem pencarian; AI menambah effort dan risiko salah ringkas.

## Matriks evaluasi praktikal

| Fitur Kandidat | Reach (Jangkauan) | Impact (Dampak Nyata) | Confidence (Keyakinan Bukti) | Effort & Risiko Teknis | Keputusan Scope |
|---|---|---|---|---|---|
| Daftar tugas terstruktur dengan pencarian/filter mata kuliah | Mahasiswa satu kelas | Tinggi untuk kebutuhan mencari ulang tugas | Sedang: contoh nyata ada, frekuensi belum diukur | Rendah–sedang; perlu data tugas terstruktur dan kontrol kualitas | Fokus MVP |
| Jadwal kuliah dengan ruang, jam, dosen, dan penanda perubahan | Mahasiswa satu kelas | Berpotensi tinggi untuk cek jadwal cepat | Rendah–sedang: diprioritaskan pengguna, contoh friksi jadwal belum ada | Sedang; perubahan perlu memperbarui data secara konsisten | Masuk MVP sesuai pilihan pengguna |
| Forward pesan dan AI summary | Ketua kelas/PJ sebagai publisher, manfaat tidak langsung ke semua mahasiswa | Bisa mengurangi entry manual | Rendah: baru hipotesis workflow | Tinggi relatif; integrasi/ingestion WhatsApp belum ditentukan, AI bisa salah membaca detail | Pertahankan sebagai hipotesis; jangan mengunci integrasi teknis |
| Approval publisher dan kategori manual | Publisher dan semua pembaca | Menurunkan risiko salah publikasi/kategori | Tinggi sebagai keputusan pengguna untuk workflow yang diinginkan | Sedang; menambah langkah review dan kebutuhan akun/role | Masuk arah MVP bila workflow forward dibangun |
| Tracking progres tugas | Mahasiswa | Tidak langsung menyelesaikan masalah pencarian info | Rendah | Menambah scope dan state yang harus dipelihara | Tidak masuk MVP |
| Oprec, lomba, dan acara | Mahasiswa yang mencari peluang | Nilai tambahan, bukan pain utama saat ini | Rendah | Memperluas sumber, kategori, dan moderasi | Fitur lanjutan |

## Rekomendasi framing

Bingkai Chosenwan sebagai **cara cepat menemukan kembali informasi akademik kelas**, bukan sebagai portal kampus lengkap atau task manager. MVP mengikuti prioritas yang dipilih pengguna: tugas/pengumuman dan jadwal. Kurangi scope tambahan yang tidak membantu pencarian atau kejelasan informasi.

**Core job:** mencari kembali informasi akademik kelas dengan cepat dan mandiri.

**Outcome yang diinginkan:** mahasiswa menemukan detail yang dicari tanpa menggali chat panjang atau menunggu teman mengirim ulang.

## Asumsi dan risiko

- `[ASUMSI]` Portal terstruktur akan lebih cepat digunakan daripada search WhatsApp.
- `[ASUMSI]` Ketua kelas/PJ bersedia menjadi publisher jika inputnya sederhana.
- `[RISIKO]` Jika portal tidak ter-update, mahasiswa akan kembali bertanya di WhatsApp.
- `[RISIKO]` AI summary dan mekanisme forward dapat menambah kompleksitas lebih besar daripada manfaatnya.
- `[RISIKO]` Jadwal masuk MVP walau masalah pencarian jadwal belum memiliki contoh kejadian langsung.

## Out of scope

- Menyatakan kebutuhan telah divalidasi secara representatif.
- Menentukan vendor/model AI, integrasi WhatsApp, atau stack teknis.
- Task tracking dan pengumpulan tugas di dalam portal.
- Oprec, lomba, dan acara sebagai prioritas MVP.
- Memperluas pilot satu kelas menjadi portal seluruh kampus.

## Keputusan yang diminta

Tinjau framing ini sebelum masuk ke tahap Decision/Scope. Pilih: **setujui dan lanjut**, **revisi**, atau **berhenti**.
