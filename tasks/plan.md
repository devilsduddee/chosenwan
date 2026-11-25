# Full Application Audit & Implementation Plan — Chosenwan

- **Tanggal Audit:** 2026-11-25
- **Acuan Spesifikasi:** `docs/04-prd.md` (v1.5/v1.6), `docs/05-design.md` (v1.0), `docs/06-spec.md` (v1.4/v1.5), `AGENTS.md`
- **Skills Audit:** `code-review-and-quality`, `security-and-hardening`, `api-and-interface-design`, `antislop`, `antislop-layoutmobile`, `mobile-native`, `emil-design-eng`, `planning-and-task-breakdown`

---

## Ringkasan Eksekutif Audit

Secara keseluruhan, fondasi aplikasi **Chosenwan** sudah solid: skema 5 tabel Turso + Drizzle ORM selaras dengan ERD, enkripsi sesi PASETO `v3.local` sudah terpasang, *gated task* di `getInitialPortalData()` mencegah data tugas bocor ke tamu, dan kompilasi `npm run build` / `tsc --noEmit` berjalan bersih.

Namun, audit lintas-aspek menemukan **celah kritis & teknis** pada 4 area utama:
1. **Security & Hardening:** Fallback secret hardcoded di `src/lib/auth.ts`, tidak ada validasi Zod di boundary Server Actions (hanya di client), `pj` bisa mem-pin/unpin event milik publisher lain (`togglePinEventAction`), `pj` masih diizinkan mengubah jadwal statis (kontra PRD FR-02), poster lama tidak terhapus di ImageKit saat poster dibersihkan, serta tidak adanya `Content-Security-Policy` dan brute-force limiter persisten/per-akun.
2. **Correctness & Edge Cases:** Double toast + dialog langsung menutup & menghapus input saat mutasi gagal di `ContentEditorDialog` & `PublisherDashboard`, tidak ada anti-double-submit spinner, bug hari Sabtu (`dayOfWeek = 6`) di `useCurrentTime` yang memaksa balik ke Senin, bug pergeseran timezone UTC `-7 jam` saat mengedit deadline tugas, kolom `week_number` & `lecturer_name` & `event_date` terbuang/hardcoded, kode matkul tabrakan (`"SIS"`), dan tidak ada SSR initial data maupun banner error/retry saat offline (`06-spec.md` §11).
3. **Mobile-Native, UI & Anti-Slop:** Teks literal `*pin*` dan `*read-only*` tampil mentah di landing page, tombol ikon di portal/dashboard berukuran 22–36 px (di bawah standar minimal sentuhan 44×44 px), override CSS `font-size: 16px !important` global mendistorsi dropdown filter kecil, `transition-all` berlebih, dan file mati (`PwaInstallPrompt.tsx`, `clock/megaphone` unused imports).
4. **Testing & Operasional:** Belum ada *test runner* maupun unit/integration test sama sekali, belum ada UI kelola master `course` dan reset password/buat akun oleh `ketua_kelas` (`04-prd.md` §8), dan terdapat divergensi antara kontrak REST `/api/v1/*` di `06-spec.md` dengan implementasi Server Actions.

---

## Architecture & Product Decisions (Terkonfirmasi Pengguna)

1. **Otorisasi Jadwal Statis (`FR-02` vs Implementasi):** Pengguna mengonfirmasi bahwa `pj` dan `ketua_kelas` memang sengaja diperbolehkan menambah/mengubah jadwal statis (`schedules.ts` & `ScheduleTimeline.tsx` dipertahankan).
2. **REST Endpoints `/api/v1/*` vs Server Actions:** Cukup memperbarui dokumentasi `docs/06-spec.md` dan `AGENTS.md` agar mencerminkan arsitektur **Next.js Server Actions + Turso + PASETO + ImageKit.io** (tidak perlu Route Handlers `/api/v1/*`).
3. **Transisi Penuh ke PASETO:** Fallback legacy `jose` JWT dihapus sepenuhnya dari `src/lib/auth.ts`, paket `jose` di-uninstall, dan seluruh sesi berjalan murni di atas PASETO `v3.local`.

---

## Task List & Roadmap Implementasi

### Phase 1: Security Hardening & Backend Boundary Integrity
- [x] **Task 1:** Fail-Closed Session Secret & Strict Claim Validation (`src/lib/auth.ts`, `src/lib/session-token.ts`) — **Size: S**
- [x] **Task 2:** Server-Side Zod Validation & RBAC Ownership Fixes (`src/lib/validations.ts`, `src/lib/url-safety.ts`, `src/lib/actions/*.ts`, `ScheduleTimeline.tsx`) — **Size: M**
- [x] **Task 3:** ImageKit Orphan Poster Cleanup & Large Base64 Fallback Guard (`src/lib/actions/events.ts`, `src/lib/imagekit.ts`) — **Size: S**
- [x] **Task 4:** CSP Security Headers, Per-Account Login Throttle & Dependency Hygiene (`next.config.ts`, `vercel.json`, `src/lib/actions/auth.ts`, `package.json`) — **Size: M**
- **Checkpoint Phase 1:** Build bersih, server actions menolak payload ilegal & akses tidak sah, CSP aktif, zero hardcoded secret di production.

### Phase 2: Data Integrity, Form Correctness & Edge Cases
- [x] **Task 5:** Fix Double Toast, Unawaited Mutations & Double-Submit Lock (`ContentEditorDialog.tsx`, `PublisherDashboard.tsx`, `DeleteConfirmDialog.tsx`) — **Size: S**
- [x] **Task 6:** Fix Saturday Schedule Bug, UTC Edit Timezone Shift & Form/Schema Parity (`use-current-time.ts`, `date-utils.ts`, `course-utils.ts`, `portal.ts`, `AnnouncementFormFields.tsx`, `ScheduleEditorDialog.tsx`) — **Size: M**
- [x] **Task 7:** SSR Portal Hydration, Loading Skeleton, Offline Error/Retry Banner & Clean Store Refactor (`src/app/portal/layout.tsx`, `src/app/portal/page.tsx`, `PortalHydrator*.tsx`, `PortalStatusBanner.tsx`, `portal-store.tsx`, `types/index.ts`) — **Size: M**
- [x] **Task 8:** Course & Account Management UI untuk Ketua Kelas (`src/lib/actions/admin.ts`, `AdminManageSheet.tsx`, `PublisherDashboard.tsx`) — **Size: M**
- **Checkpoint Phase 2:** Seluruh edge case `06-spec.md` §11 terpenuhi, waktu/hari Sabtu akurat, data edit bebas pergeseran -7 jam, zero data hilang saat gagal simpan.

### Phase 3: Mobile-Native, UI Polish & Anti-Slop Fixes
- [x] **Task 9:** Fix Raw Markdown Asterisks, Sync Preview Copy & Clean ESLint Warnings (`LandingFeatures.tsx`, `LandingWorkflow.tsx`) — **Size: S**
- [x] **Task 10:** Touch Target 44×44px Audit, CSS Input Zoom Fix, Lightbox & Dead Asset Cleanup (`ScheduleSlotCard.tsx`, `PublisherContentItem.tsx`, `PublisherDashboard.tsx`, `AnnouncementFormFields.tsx`, `TaskFilterBar.tsx`, `TopHeader.tsx`, `globals.css`, `image-lightbox.tsx`, `PwaInstallPrompt.tsx` dihapus, `public/manifest.json` dihapus) — **Size: M**
- **Checkpoint Phase 3:** `npm run lint` 0 errors & 0 warnings, seluruh tombol interaktif >= 44×44 px, visual terverifikasi di 360px & 1280px.

### Phase 4: Automated Testing & Spec Traceability
- [x] **Task 11:** Setup `tsx --test` (`node:test`) & Suite Pengujian Auth, Validasi, Rate Limit, Course Utils & Date Utils (`package.json`, `src/lib/__tests__/*.test.ts`) — **Size: M**
- [x] **Task 12:** Sinkronisasi Dokumen Spec/Rules (`docs/06-spec.md`, `AGENTS.md`) agar mencerminkan Server Actions + Turso + PASETO `v3.local` — **Size: S**
- **Checkpoint Complete:** Seluruh test lulus (`12/12`), `npm run lint` & `tsc` & `npm run build` bersih, seluruh file `< 500` baris kode.

---

## Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Menghapus fallback `RAW_SECRET` memutus login lokal bila `.env.local` kosong | High | Izinkan fallback dev hanya saat `NODE_ENV !== "production"`, wajibkan throw error di production |
| Menambah kolom `week_number` atau `code` pada tabel DB butuh migrasi Turso | Medium | Jalankan `drizzle-kit push` / SQL `ALTER TABLE` yang aman & nullable agar data existing aman |
| Rate limiter in-memory di Vercel reset antar cold-start | Medium | Dokumentasikan batas serverless atau gunakan Turso lightweight counter table untuk login throttling |
| Pengujian di iOS/Android fisik belum otomatis | Low | Lakukan uji visual mobile viewport via browser subagent dan checklist verifikasi hardware (`mobile-native`) |
