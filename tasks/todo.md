# Task Checklist: Chosenwan Frontend Prototyping

## Phase 1: Foundation & Layout Shell

### Task 1: Design Tokens & CSS Variables Setup
- **Description:** Mengonfigurasi token warna tema Playful Bento dari `05-design.md` di `src/app/globals.css` beserta styling dasar kontainer kanvas putih dan abu-abu.
- **Acceptance criteria:**
  - Token warna `#F6F7FB`, `#FFFFFF`, `#111318`, `#EEF1F6`, `#A8C0FF`, `#F6C866`, `#EA9DFB`, `#4CD98B`, `#F05252` terdefinisi dan dapat dipakai via class utility Tailwind.
  - Border radius kustom untuk kartu bento (`rounded-2xl` / `rounded-3xl`) terdaftar.
  - Teks di atas warna pastel terisolasi dengan warna `#111318`.
- **Verification:**
  - Build succeeds: `npm run build`
  - Manual check: Warna background dan token card ter-render sesuai nilai hex.
- **Dependencies:** None
- **Files likely touched:**
  - `src/app/globals.css`
- **Estimated scope:** Small (1 file)

---

### Task 2: Mock Data Layer & Mock State Store
- **Description:** Membuat tipe data TypeScript sesuai `06-spec.md`, data awal (seed) yang realistis, dan React Context provider untuk mensimulasikan penyimpanan data di sisi browser.
- **Acceptance criteria:**
  - Tipe `Task`, `Announcement`, `Course`, `Schedule`, dan `UserProfile` terdefinisi lengkap.
  - Seed data memuat tugas mendesak (deadline hari ini), tugas mendatang, tugas lewat waktu, pengumuman multi-kategori, dan jadwal 6 hari.
  - Context Provider menyediakan state dan fungsi mutasi (`addTask`, `updateTask`, `deleteTask`, `addAnnouncement`, `updateAnnouncement`, `deleteAnnouncement`, `activeTab`, `setActiveTab`, `userRole`, `setUserRole`).
- **Verification:**
  - Build succeeds: `npm run build`
  - Typecheck: Zero TypeScript error pada definisi interface.
- **Dependencies:** Task 1
- **Files likely touched:**
  - `src/types/index.ts`
  - `src/lib/mock-data.ts`
  - `src/lib/mock-store.tsx`
- **Estimated scope:** Medium (3 files)

---

### Task 3: Mobile Container, TopHeader & BottomNavigationBar
- **Description:** Membangun kontainer utama mobile-first (`max-w-md mx-auto`), header dengan indikator kelas dan switch role, serta bottom navigation bar docked dengan 3-4 tab.
- **Acceptance criteria:**
  - Layout terpusat di layar lebar dengan batas maksimal `max-w-md mx-auto min-h-screen bg-[#F6F7FB]`.
  - `TopHeader` menampilkan judul "Chosenwan Pilot", penanda kelas, dan tombol cepat toggle peran "Mode Mahasiswa" vs "Mode Publisher".
  - `BottomNavigationBar` menampilkan tab `Tugas`, `Info`, `Jadwal`, serta otomatis memunculkan tab `Kelola` jika mode Publisher aktif.
  - State perpindahan tab terhubung dengan `mock-store`.
- **Verification:**
  - Build succeeds: `npm run build`
  - Manual check: Ketukan pada ikon tab bawah mengubah tampilan aktif.
- **Dependencies:** Task 2
- **Files likely touched:**
  - `src/app/layout.tsx`
  - `src/components/layout/TopHeader.tsx`
  - `src/components/layout/BottomNavigationBar.tsx`
- **Estimated scope:** Medium (3 files)

---

### Checkpoint 1: Shell & Navigation Ready
- [x] Build Next.js sukses tanpa error: `npm run build`
- [x] Layout mobile-first terpusat `max-w-md` rapi di viewport desktop dan mobile.
- [x] Tombol toggle peran dan navigasi tab bawah berfungsi interaktif.

---

## Phase 2: Mahasiswa Public Views

### Task 4: Tab Tugas — BentoSummaryGrid & UrgentTaskCard
- **Description:** Membangun grid ringkasan bento 2x2 dan kartu jangkar kontras tinggi untuk tugas yang tenggatnya paling dekat.
- **Acceptance criteria:**
  - `BentoSummaryGrid` menampilkan 4 kartu pastel/netral: Total Tugas Aktif (`#EEF1F6`), Tugas Mendesak (`#F05252`/`#F6C866`), Berita Kampus (`#F6C866`), dan Info Lomba (`#EA9DFB`).
  - Mengetuk ubin bento otomatis memfilter daftar tugas/info di bawahnya.
  - `UrgentTaskCard` berlatar hitam pekat `#111318` dengan teks putih `#FFFFFF`, badge sisa waktu (misal: "Sisa 5 Jam"), nama matkul, dan instruksi singkat.
- **Verification:**
  - Build succeeds: `npm run build`
  - Manual check: Kartu urgent tampil menonjol di urutan teratas jika ada tugas mendesak.
- **Dependencies:** Task 3
- **Files likely touched:**
  - `src/components/tasks/BentoSummaryGrid.tsx`
  - `src/components/tasks/UrgentTaskCard.tsx`
- **Estimated scope:** Small (2 files)

---

### Task 5: Tab Tugas — TaskList, Filter Bar & TaskDetailSheet
- **Description:** Membangun input pencarian, dropdown filter mata kuliah, daftar kartu tugas standar, dan bottom drawer (sheet) detail tugas lengkap.
- **Acceptance criteria:**
  - Search bar dan dropdown filter mata kuliah menyaring daftar kartu tugas secara instan.
  - Kartu tugas standar berlatar putih `#FFFFFF` dengan badge status (`Aman` hijau `#4CD98B`, `Mendesak` merah `#F05252`, `Lewat` abu-abu).
  - Mengetuk kartu tugas membuka `TaskDetailSheet` dari bawah layar (shadcn `Sheet`).
  - `TaskDetailSheet` menampilkan rincian instruksi lengkap, deadline, link pengumpulan eksternal, dan tombol "Salin Tautan".
- **Verification:**
  - Build succeeds: `npm run build`
  - Manual check: Sheet terbuka lancar saat kartu diklik dan dapat ditutup kembali.
- **Dependencies:** Task 4
- **Files likely touched:**
  - `src/components/tasks/TaskFilterBar.tsx`
  - `src/components/tasks/TaskCard.tsx`
  - `src/components/tasks/TaskList.tsx`
  - `src/components/tasks/TaskDetailSheet.tsx`
- **Estimated scope:** Medium (4 files)

---

### Task 6: Tab Info & Kampus — CategoryFilterPills & AnnouncementList
- **Description:** Membangun tampilan tab pengumuman dan berita dengan filter horizontal dan kartu badge pastel.
- **Acceptance criteria:**
  - Filter horizontal (`Semua`, `Akademik / Jadwal`, `Berita Kampus`, `Info Lomba`) menyaring daftar kartu info.
  - Badge kategori memakai warna pastel resmi (`#A8C0FF`, `#F6C866`, `#EA9DFB`) dengan teks `#111318`.
  - Kartu menampilkan judul, timestamp pembaruan, isi ringkas, dan tautan sumber resmi eksternal yang dapat diklik.
- **Verification:**
  - Build succeeds: `npm run build`
  - Manual check: Seluruh teks di atas pastel jelas terbaca dan tautan luar terbuka dengan aman (`target="_blank"`).
- **Dependencies:** Task 3
- **Files likely touched:**
  - `src/components/info/CategoryFilterPills.tsx`
  - `src/components/info/AnnouncementCard.tsx`
  - `src/components/info/AnnouncementList.tsx`
- **Estimated scope:** Medium (3 files)

---

### Task 7: Tab Jadwal Statis — DaySelectorStrip & ScheduleTimeline
- **Description:** Membangun strip pemilih hari (Senin s.d. Sabtu) dan daftar kartu jam kuliah per semester.
- **Acceptance criteria:**
  - `DaySelectorStrip` menyajikan tombol hari horisontal (`Sen`, `Sel`, `Rab`, `Kam`, `Jum`, `Sab`) dengan hari aktif berkapsul hitam `#111318`.
  - Daftar jadwal terurut menurut jam mulai (`08:00`, `10:00`, dst.) menampilkan nama matkul, ruangan/lab, dan nama dosen.
  - Menyajikan empty state ramah jika tidak ada kelas di hari terpilih.
- **Verification:**
  - Build succeeds: `npm run build`
  - Manual check: Mengganti hari langsung memperbarui jadwal hari tersebut.
- **Dependencies:** Task 3
- **Files likely touched:**
  - `src/components/schedule/DaySelectorStrip.tsx`
  - `src/components/schedule/ScheduleSlotCard.tsx`
  - `src/components/schedule/ScheduleTimeline.tsx`
- **Estimated scope:** Medium (3 files)

---

### Checkpoint 2: Public Views Functional
- [ ] Tab Tugas, Info & Kampus, dan Jadwal terintegrasi penuh di halaman utama (`src/app/page.tsx`).
- [ ] Seluruh filter dan interaksi sheet berjalan tanpa error console.
- [ ] Build sukses: `npm run build`.

---

## Phase 3: Publisher Experience & Content Form

### Task 8: Publisher Dashboard & Tab Pengelolaan (Published vs Draft)
- **Description:** Membangun tampilan tab kelola untuk publisher dengan daftar konten berstatus `Published` dan `Draft`.
- **Acceptance criteria:**
  - Menampilkan ringkasan jumlah konten aktif dan draft.
  - Segmented control untuk beralih antara daftar `Terbit` dan `Draft`.
  - Tombol aksi "+ Buat Konten Baru" membuka modal form editor.
- **Verification:**
  - Build succeeds: `npm run build`
  - Manual check: Item berstatus draft hanya terlihat di tab ini.
- **Dependencies:** Task 5, Task 6
- **Files likely touched:**
  - `src/components/publisher/PublisherDashboard.tsx`
  - `src/components/publisher/PublisherContentItem.tsx`
- **Estimated scope:** Small (2 files)

---

### Task 9: ContentEditorForm (Tugas vs Info Simpel) & Action Bar
- **Description:** Form input dinamis modal/sheet untuk membuat dan mengedit konten tugas atau pengumuman dengan aksi simpan ganda.
- **Acceptance criteria:**
  - Toggle segmented pill antara `Tugas Kuliah` dan `Pengumuman & Info`.
  - Form tugas memvalidasi matkul, instruksi, dan deadline; form info memvalidasi kategori, isi, dan link sumber.
  - Tombol aksi ganda: **Simpan Draft** (sekunder `#EEF1F6`) dan **Terbitkan** (primer `#111318`).
  - Menampilkan toast `sonner` sukses ketika aksi selesai.
- **Verification:**
  - Build succeeds: `npm run build`
  - Manual check: Menambah tugas/pengumuman baru langsung muncul di state dan feed terkait.
- **Dependencies:** Task 8
- **Files likely touched:**
  - `src/components/publisher/ContentEditorDialog.tsx`
  - `src/components/publisher/TaskFormFields.tsx`
  - `src/components/publisher/AnnouncementFormFields.tsx`
- **Estimated scope:** Medium (3 files)

---

### Task 10: Delete Confirmation & Edit State Flow
- **Description:** Dialog konfirmasi penghapusan konten dan alur edit konten yang sudah ada.
- **Acceptance criteria:**
  - Mengetuk tombol edit membuka form dengan data terisi.
  - Mengetuk tombol hapus memunculkan dialog konfirmasi destruktif dengan tombol warna merah `#F05252`.
  - Item terhapus seketika dari state dan feed.
- **Verification:**
  - Build succeeds: `npm run build`
  - Manual check: Edit dan hapus berfungsi presisi pada data mock.
- **Dependencies:** Task 9
- **Files likely touched:**
  - `src/components/publisher/DeleteConfirmDialog.tsx`
- **Estimated scope:** Small (1 file)

---

### Checkpoint 3: End-to-End Prototyping Complete
- [ ] Pengguna dapat mencoba alur lengkap sebagai Mahasiswa (baca, cari, filter, lihat detail tugas/jadwal) maupun Publisher (buat tugas, buat pengumuman, simpan draft, terbitkan, edit, hapus).
- [ ] Data tersinkronisasi via `mock-store`.
- [ ] Build sukses: `npm run build`.

---

## Phase 4: Polish, Mobile Tuning, & Quality Audit

### Task 11: Mobile UX Polish & Anti-Slop Audit
- **Description:** Memoles interaksi sentuhan, layout safe-area, kontras teks pastel, dan mengaudit batas baris kode per file.
- **Acceptance criteria:**
  - Seluruh target klik jempol minimal `44x44px`.
  - Tidak ada font input di bawah `16px` (mencegah auto-zoom Safari/iOS).
  - Seluruh teks di atas blok pastel (`#A8C0FF`, `#F6C866`, `#EA9DFB`) terbukti berwarna gelap `#111318`.
  - **Audit Aturan 2 AGENTS.md**: Seluruh file `.tsx`, `.ts`, `.css` dipastikan berada di bawah 500 baris kode (tidak ada file mendekati 400 baris tanpa refaktor).
- **Verification:**
  - Build: `npm run build`
  - Lint: `npm run lint`
  - Script audit ukuran baris file: Memastikan zero violation baris kode.
- **Dependencies:** Task 10
- **Files likely touched:**
  - `src/app/globals.css`
  - `src/app/page.tsx`
- **Estimated scope:** Small (2 files)

---

### Checkpoint 4: Prototyping Ready for Review
- [ ] Semua acceptance criteria Task 1 - 11 terpenuhi.
- [ ] Aplikasi berjalan tanpa warning di browser desktop maupun simulasi mobile.
- [ ] Siap direview oleh pengguna.
