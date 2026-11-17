# Implementation Plan: Chosenwan Frontend Prototyping

Source spec:
- [04-prd.md](file:///D:/Projects/Chosenwan/docs/04-prd.md) (v1.4)
- [05-design.md](file:///D:/Projects/Chosenwan/docs/05-design.md) (v1.0)
- [06-spec.md](file:///D:/Projects/Chosenwan/docs/06-spec.md) (v1.1)
- [07-vibe-rules.md](file:///D:/Projects/Chosenwan/docs/07-vibe-rules.md) (v1.0)
- [AGENTS.md](file:///D:/Projects/Chosenwan/AGENTS.md)

## Overview

Membangun prototipe frontend interaktif untuk portal kelas **Chosenwan** secara mandiri (mock data in-memory / local state) tanpa integrasi backend Supabase terlebih dahulu. Tujuannya adalah menguji secara langsung pengalaman pengguna di layar ponsel, memvalidasi tema visual *Playful Bento*, memastikan kepatuhan aturan kontras pastel, serta menguji interaktivitas transisi tab, drawer detail tugas, dan form publikasi ganda (Draft vs Terbitkan).

## Architecture Decisions

- **In-Memory Mock State Provider (`src/lib/mock-store.tsx`)**: Menyimpan data tugas, pengumuman, jadwal, dan status publisher dalam React Context (dengan sinkronisasi opsional ke `localStorage`) sehingga mutasi data (create, edit, delete, switch draft/published) dapat langsung dicoba secara realistis di browser.
- **Strict Mobile-First Viewport**: Kontainer aplikasi dibatasi `max-w-md mx-auto min-h-screen bg-[#F6F7FB]` dengan fixed header dan docked bottom navigation bar agar proporsi mobile presisi di desktop maupun layar ponsel.
- **Design Token Fidelity**: Warna didefinisikan secara semantik di `globals.css` sesuai `05-design.md` (`#F6F7FB`, `#FFFFFF`, `#111318`, `#EEF1F6`, `#A8C0FF`, `#F6C866`, `#EA9DFB`, `#4CD98B`, `#F05252`). Teks di atas warna pastel mutlak `#111318`.
- **Zero Custom Component Reinvention**: Menggunakan komponen resmi `shadcn/ui` (`Card`, `Button`, `Badge`, `Tabs`, `Sheet`, `Dialog`, `Select`, `Input`, `Textarea`, `Sonner`) dengan styling utility Tailwind CSS v4.
- **Modularitas File (< 500 Baris)**: Setiap komponen dipecah secara modular per folder fungsional (`components/layout/`, `components/tasks/`, `components/info/`, `components/schedule/`, `components/publisher/`).

---

## Task List

### Phase 1: Foundation & Layout Shell

- [x] **Task 1: Design Tokens & CSS Variables Setup**
  - Menerapkan variabel warna Playful Bento dan radius di `src/app/globals.css`.
  - Mengonfigurasi utility classes untuk warna pastel, dark anchor card, dan typography Plus Jakarta Sans/Inter.
- [x] **Task 2: Mock Data Layer & Mock State Store**
  - Membuat `src/types/index.ts` berdasarkan skema data `06-spec.md`.
  - Membuat `src/lib/mock-data.ts` dengan data seed realistis (tugas mendesak, tugas aktif, tugas lewat waktu, pengumuman 3 kategori, jadwal 6 hari).
  - Membuat `src/lib/mock-store.tsx` dengan React Context untuk mensimulasikan CRUD dan toggle role (Guest Mahasiswa vs Publisher).
- [x] **Task 3: Mobile Container, TopHeader & BottomNavigationBar**
  - Membangun layout `max-w-md mx-auto` di `src/app/layout.tsx`.
  - Membuat `TopHeader` dengan identitas kelas dan tombol simulasi peran (Mahasiswa / Publisher).
  - Membuat `BottomNavigationBar` docked pill bar dengan 3 tab publik (`Tugas`, `Info`, `Jadwal`) dan tab tambahan (`Kelola`) saat mode publisher aktif.

#### Checkpoint 1: Shell & Navigation Ready
- [x] Build Next.js sukses tanpa error TypeScript.
- [x] Tata letak responsive di mobile viewport (375px - 480px).
- [x] Navigasi bawah dapat beralih antar-tab dengan mulus.

---

### Phase 2: Mahasiswa Public Experience

- [x] **Task 4: Tab Tugas — BentoSummaryGrid & UrgentTaskCard**
  - Membuat `BentoSummaryGrid` (grid 2x2: Total Tugas, Mendesak, Berita Kampus, Info Lomba) yang dapat diklik sebagai filter cepat.
  - Membuat `UrgentTaskCard` (kontras tinggi `bg-[#111318] text-white`) untuk tugas dengan batas waktu terdekat lengkap dengan badge jam mendesak.
- [x] **Task 5: Tab Tugas — TaskList, Filter Bar & TaskDetailSheet**
  - Membuat `TaskSearchBar` dengan filter mata kuliah dan pencarian teks.
  - Membuat `TaskCard` standar berlatar putih dengan badge status (`Aman`, `Mendesak`, `Lewat`).
  - Mengimplementasikan `TaskDetailSheet` menggunakan `shadcn Sheet` (bottom drawer) untuk instruksi lengkap dan tombol aksi CTA "Buka Link Pengumpulan".
- [x] **Task 6: Tab Info & Kampus — CategoryFilterPills & AnnouncementList**
  - Membuat `CategoryFilterPills` horizontal (`Semua`, `Akademik / Jadwal`, `Berita Kampus`, `Info Lomba`).
  - Membuat `AnnouncementCard` dengan warna aksen badge kategori pastel (`#A8C0FF`, `#F6C866`, `#EA9DFB`) dengan teks `#111318`.
  - Menyertakan link sumber resmi eksternal yang dapat diklik langsung.
- [x] **Task 7: Tab Jadwal Statis — DaySelectorStrip & ScheduleTimeline**
  - Membuat `DaySelectorStrip` horizontal untuk 6 hari (`Sen` s.d. `Sab`) dengan penanda hari aktif berlatar `#111318`.
  - Membuat `ScheduleSlotCard` menampilkan jam mulai-selesai, mata kuliah, ruangan, dan dosen pengampu.
  - Menampilkan empty state ramah jika hari yang dipilih tidak ada jadwal kuliah.

#### Checkpoint 2: Public Views Functional
- [x] Seluruh tab publik menampilkan data mock dengan benar.
- [x] Filter pencarian dan chip kategori berfungsi responsif.
- [x] Bottom sheet detail tugas terbuka lancar di mobile viewport.

---

### Phase 3: Publisher Experience & Content Form

- [x] **Task 8: Publisher Dashboard & Tab Status (Published vs Draft)**
  - Membuat tampilan dashboard publisher dengan ringkasan status konten.
  - Membuat tab pemisah: `Terbit (Published)` vs `Draft (Disimpan)`.
  - Menyediakan tombol aksi cepat `+ Buat Konten Baru`.
- [x] **Task 9: ContentEditorForm (Tugas vs Info Simpel)**
  - Membuat toggle segmented pill antara entri `Tugas Kuliah` dan `Pengumuman & Info`.
  - Form dinamis: validasi field tugas (matkul, deadline, instruksi) vs field info (kategori info, isi ringkas, tautan sumber).
  - Mengintegrasikan skema validasi `zod` + `react-hook-form`.
  - Membuat tombol aksi ganda: **Simpan Draft** (sekunder) dan **Terbitkan** (primer hitam pekat).
  - Menampilkan feedback notifikasi via `sonner` toast.
- [x] **Task 10: Delete Confirmation & Content Mutation Simulation**
  - Mengimplementasikan modal konfirmasi hapus menggunakan `shadcn AlertDialog` / `Dialog`.
  - Memastikan konten yang baru dibuat atau dihapus langsung ter-update di feed publik maupun dashboard publisher melalui `mock-store`.

#### Checkpoint 3: Interactive Prototyping Complete
- [x] Siklus publikasi tugas dan pengumuman berfungsi end-to-end secara lokal.
- [x] Simpan draft berhasil dan hanya muncul di tab Draft publisher.
- [x] Toast notifikasi dan modal konfirmasi berjalan mulus.

---

### Phase 4: Polish, Mobile Tuning, & Quality Audit

- [ ] **Task 11: Mobile UX Polish & Anti-Slop Audit**
  - Menerapkan panduan `mobile-native`: minimal target sentuhan 44x44px, pencegahan zoom iOS pada form input (`font-size >= 16px`).
  - Memverifikasi kepatuhan aturan kontras warna pastel di `05-design.md` (tidak ada teks putih di atas pastel).
  - Melakukan audit batasan ukuran file: memastikan tidak ada satu pun file yang melebihi 500 baris kode (Aturan 2 AGENTS.md).
  - Menjalankan `npm run build` dan `npm run lint` untuk menjamin zero error.

---

## Risks and Mitigations

| Risiko | Dampak | Mitigasi |
|---|---|---|
| State mock hilang saat browser di-refresh | Sedang | Simpan state mock ke `localStorage` sehingga data simulasi tetap tersimpan saat testing. |
| Ukuran file form atau list membengkak > 500 baris | Tinggi (Melanggar AGENTS.md) | Pecah form menjadi subkomponen kecil (`TaskFormFields.tsx`, `AnnouncementFormFields.tsx`, `FormActionsBar.tsx`). |
| Kontras teks tidak terbaca di bawah cahaya terang | Sedang | Terapkan utility class kustom `text-[#111318]` pada seluruh komponen badge/pill pastel. |
| Tampilan melar di desktop | Rendah | Kunci wrapper utama dengan `max-w-md mx-auto min-h-screen shadow-sm`. |

---

## Open Questions

- Apakah simulasi Publisher cukup diakses lewat tombol switch mode di TopHeader untuk kemudahan pengetesan prototipe, sebelum autentikasi Supabase Auth dipasang nanti? (Rekomendasi: Ya, sediakan toggle pill di header).
