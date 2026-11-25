# Task Breakdown: Full Audit Remediation — Chosenwan

---

## Phase 1: Security Hardening & Backend Boundary Integrity

### Task 1: Fail-Closed Session Secret & Strict Auth Claim Validation
**Description:** Menghapus risiko pemalsuan cookie sesi di production akibat hardcoded fallback secret di `src/lib/auth.ts`, serta menghapus fallback JWT `jose` sehingga sesi 100% memakai PASETO `v3.local` dengan validasi claim ketat.
**Acceptance criteria:**
- [x] Aplikasi melempar error eksplisit saat startup/auth di `NODE_ENV === "production"` jika `SESSION_SECRET` / `JWT_SECRET` tidak diset atau panjangnya `< 32` karakter.
- [x] Fallback `jwtVerify` dihapus sepenuhnya (pure PASETO `v3.local`) dan seluruh claim (`userId`, `name`, `role`) divalidasi terhadap schema allowlist role (`"member" | "pj" | "ketua_kelas"`).
**Verification:**
- [x] Typecheck passes: `npx tsc --noEmit`
- [x] Unit check: `src/lib/__tests__/auth.test.ts` memverifikasi token invalid, role/token non-PASETO, dan secret kosong/pendek di production ditolak (`null` / throw).
**Dependencies:** None
**Files likely touched:**
- `src/lib/auth.ts`
- `src/lib/session-token.ts`
- `.env.example`

### Task 2: Server-Side Zod Validation & RBAC Ownership Enforcement
**Description:** Memasang validasi Zod langsung di batas Server Actions agar mutasi data tidak bergantung pada validasi client, serta menutup celah ownership pada `togglePinEventAction` (hak kelola jadwal tetap untuk `ketua_kelas` dan `pj` sesuai keputusan pengguna).
**Acceptance criteria:**
- [x] `createTaskAction`, `updateTaskAction`, `createEventAction`, `updateEventAction`, `createScheduleAction`, dan `updateScheduleAction` memvalidasi seluruh input memakai schema Zod server-side (menolak URL non-`http(s)`, `day_of_week` di luar `1..6`, atau string melebihi batas wajar).
- [x] `togglePinEventAction` memeriksa kepemilikan (`session.role === "ketua_kelas" || existing.idAcc === session.userId`) sebelum mengubah `isPinned`.
- [x] Hak mutasi jadwal di `schedules.ts` dan `ScheduleTimeline.tsx` dipertahankan untuk `ketua_kelas` & `pj` sesuai konfirmasi pengguna.
**Verification:**
- [x] Tests pass: `src/lib/__tests__/validations.test.ts` menguji penolakan URL `javascript:` / localhost / metadata SSRF, serta `createTaskAction`/`updateEventAction`/`togglePinEventAction` menjaga session & ownership di server.
- [x] Typecheck passes: `npx tsc --noEmit`
**Dependencies:** Task 1
**Files likely touched:**
- `src/lib/validations.ts`
- `src/lib/url-safety.ts`
- `src/lib/actions/tasks.ts`
- `src/lib/actions/events.ts`
- `src/lib/actions/schedules.ts`

### Task 3: ImageKit Orphan Poster Cleanup & Base64 Guard
**Description:** Memastikan file poster lama di ImageKit selalu dibersihkan saat poster dihapus/diganti pada `updateEventAction` (`FR-04`) dan mencegah data base64 mentah tersimpan diam-diam ke database jika upload ImageKit gagal.
**Acceptance criteria:**
- [x] Menghapus poster dari form edit (`poster_url` menjadi `""` atau `null`) atau menggantinya dengan URL baru otomatis memanggil `deletePosterFromImageKit(existing.posterFileId)` dan mengosongkan `posterFileId`.
- [x] Jika `uploadPosterToImageKit` gagal saat ImageKit terkonfigurasi, server action mengembalikan error terstruktur alih-alih menyimpan Data URL berukuran besar ke kolom SQLite.
**Verification:**
- [x] Typecheck passes: `npx tsc --noEmit`
- [x] Code verification: `resolvePosterUpdate` di `events.ts` memanggil `deletePosterFromImageKit(existing.posterFileId)` saat poster dihapus/diganti dan melempar error terstruktur jika `isImageKitConfigured()` gagal upload.
**Dependencies:** Task 2
**Files likely touched:**
- `src/lib/actions/events.ts`
- `src/lib/imagekit.ts`

### Task 4: CSP Security Headers, Per-Account Login Throttle & Dependency Audit
**Description:** Memusatkan konfigurasi header keamanan (menghindari duplikasi `next.config.ts` vs `vercel.json`), menambahkan `Content-Security-Policy` yang ketat, menambah pelacakan percobaan login per username, serta menghapus dependensi `jose`.
**Acceptance criteria:**
- [x] Response HTTP menyertakan header `Content-Security-Policy` yang aman untuk script, style, font, dan gambar (`'self'`, `data:`, `https://ik.imagekit.io`, `https:`).
- [x] Login memiliki pembatasan percobaan gagal per username (`name`) selain per-IP di `proxy.ts`.
- [x] Dependensi tak terpakai (`jose`) dihapus dari `package.json`.
**Verification:**
- [x] Build succeeds: `npm run build`
- [x] CSP & security headers dikonfigurasi di `next.config.ts` dan deduplicated di `vercel.json`.
**Dependencies:** Task 1
**Files likely touched:**
- `next.config.ts`
- `vercel.json`
- `src/lib/actions/auth.ts`
- `src/lib/rate-limit.ts`
- `package.json`

## Checkpoint: After Tasks 1-4 (Security & Boundary Gate)
- [x] `npm run build` dan `npx tsc --noEmit` sukses
- [x] Tidak ada endpoint mutasi/privasi tanpa validasi sesi & input server-side
- [x] Header keamanan (CSP, HSTS, X-Frame-Options, nosniff) terverifikasi

---

## Phase 2: Data Integrity, Form Correctness & Edge Cases

### Task 5: Fix Double Toast, Unawaited Mutations & Double-Submit Lock
**Description:** Memperbaiki penanganan async di `ContentEditorDialog` dan `PublisherDashboard` agar dialog hanya menutup & menampilkan toast sukses setelah server action benar-benar berhasil, serta mencegah *double submit* (`06-spec.md` §11).
**Acceptance criteria:**
- [x] `ContentEditorDialog` melakukan `await` pada `addTask`/`updateTask`/`addAnnouncement`/`updateAnnouncement` di dalam `try/catch`; jika gagal, modal tetap terbuka (input user tidak hilang) dan tidak ada toast sukses ganda.
- [x] Tombol *Simpan Draft*, *Terbitkan*, dan *Ya, Hapus* (`DeleteConfirmDialog`) menampilkan status loading & `disabled` selama request berjalan.
- [x] Toast sukses hanya muncul satu kali per aksi berhasil.
**Verification:**
- [x] Build succeeds: `npm run build`
- [x] Code audit: toast sukses dipusatkan di caller setelah `await`, tanpa toast ganda di `portal-store.tsx`.
**Dependencies:** None
**Files likely touched:**
- `src/components/publisher/ContentEditorDialog.tsx`
- `src/components/publisher/PublisherDashboard.tsx`
- `src/components/publisher/DeleteConfirmDialog.tsx`

### Task 6: Fix Saturday Default Day, UTC Edit Timezone Shift & Form/Schema Parity
**Description:** Memperbaiki bug logika hari Sabtu di `useCurrentTime`, bug pergeseran UTC `-7 jam` saat mengedit `due_date` di `ContentEditorDialog`, serta menyelaraskan field UI yang belum tersimpan di database (`week_number` dihapus, `event_date` dibuka di form, `lecturer_name` read-only dari course, `course.code` deterministik unik).
**Acceptance criteria:**
- [x] `useCurrentTime()` mengembalikan `6` pada hari Sabtu (`d === 6`), bukan `1` (Senin).
- [x] Pre-fill `due_date` pada `ContentEditorDialog` memformat waktu lokal WIB (`YYYY-MM-DDTHH:mm`) tanpa menggeser ke UTC.
- [x] `event_date` tersimpan via UI `AnnouncementFormFields`, `deriveCourseCode` mencegah tabrakan kode `"SIS"`, serta field mati `week_number` & `lecturer_name` editable dibersihkan agar 100% selaras dengan schema Turso.
**Verification:**
- [x] Build succeeds: `npm run build`
- [x] Tests pass: `date-utils.test.ts` & `course-utils.test.ts` lolos (`npm test`).
**Dependencies:** Task 2
**Files likely touched:**
- `src/lib/use-current-time.ts`
- `src/lib/date-utils.ts`
- `src/lib/course-utils.ts`
- `src/components/publisher/ContentEditorDialog.tsx`
- `src/components/publisher/AnnouncementFormFields.tsx`
- `src/components/schedule/ScheduleEditorDialog.tsx`
- `src/lib/actions/portal.ts`

### Task 7: SSR Portal Hydration, Loading Skeleton, Offline Error/Retry & Store Cleanup
**Description:** Menghilangkan client-fetch waterfall saat membuka `/portal` dengan melempar initial data dari Server Component, menambahkan skeleton loading & banner error + tombol *"Coba Lagi"* (`06-spec.md` §11), serta merapikan penamaan `mock-store.tsx`.
**Acceptance criteria:**
- [x] `/portal` melakukan SSR load `getInitialPortalData()` di server (`PortalHydrator` dalam `<Suspense>`) sehingga konten langsung tampil tanpa flash *empty state* atau card gembok sebelum data tiba.
- [x] Error koneksi menampilkan kartu peringatan eksplisit (`PortalStatusBanner`) dengan tombol *"Coba Lagi"* (`refreshData()`).
- [x] `mock-store.tsx` dirapikan menjadi `portal-store.tsx`, `resetToDefaults` yang mati dihapus, dan `userRole` disinkronkan (`"guest" | "member" | "pj" | "ketua_kelas"`).
**Verification:**
- [x] Build succeeds: `npm run build`
- [x] Route `/portal` dibangun dengan Partial Prerendering (`◐ /portal`) + `<Suspense>` SSR hydrator.
**Dependencies:** Task 6
**Files likely touched:**
- `src/app/portal/layout.tsx`
- `src/app/portal/page.tsx`
- `src/components/layout/PortalHydrator.tsx`
- `src/components/layout/PortalHydratorClient.tsx`
- `src/components/layout/PortalStatusBanner.tsx`
- `src/lib/portal-store.tsx`
- `src/types/index.ts`
- `src/types/store.ts`

### Task 8: Course & Account Administration untuk Ketua Kelas
**Description:** Menyediakan antarmuka ringan khusus `ketua_kelas` untuk menambah/mengubah master mata kuliah (`course`) serta membuat akun atau mereset password anggota kelas (`04-prd.md` FR-03 & §8 Risiko Manajemen Akun).
**Acceptance criteria:**
- [x] `ketua_kelas` dapat menambah/mengedit mata kuliah + nama dosen dari dashboard tanpa menjalankan script `seed.ts`.
- [x] `ketua_kelas` dapat membuat akun baru (`member` / `pj`) dan mereset kata sandi akun yang lupa (password di-hash `bcryptjs` 12 rounds di server).
**Verification:**
- [x] Build succeeds: `npm run build`
- [x] Guard server action `assertKetuaKelas()` di `src/lib/actions/admin.ts` menolak selain `role === "ketua_kelas"`.
**Dependencies:** Task 2, Task 7
**Files likely touched:**
- `src/lib/actions/admin.ts`
- `src/components/publisher/PublisherDashboard.tsx`
- `src/components/publisher/AdminManageSheet.tsx`

## Checkpoint: After Tasks 5-8 (Functional & Spec Parity)
- [x] `npm run build` & `npx tsc --noEmit` sukses
- [x] Seluruh fitur PRD v1.5–v1.6 dan edge cases `06-spec.md` §11 berfungsi end-to-end

---

## Phase 3: Mobile-Native, UI Polish & Anti-Slop Fixes

### Task 9: Fix Raw Markdown Asterisks, Preview Accuracy & ESLint Warnings
**Description:** Membersihkan tanda bintang literal `*pin*` dan `*read-only*` yang tercetak mentah di JSX landing page, menyelaraskan preview jadwal/bento dengan data riil (`C-5`), dan menghapus unused imports di `LandingFeatures.tsx`.
**Acceptance criteria:**
- [x] Tidak ada karakter `*pin*` atau `*read-only*` literal di teks yang dirender pada `LandingFeatures.tsx` dan `LandingWorkflow.tsx`.
- [x] Data contoh jadwal pada `LandingFeatures.tsx` cocok dengan jadwal riil kelas 3IA01 (`Sen 3 mk, Sel 3 mk, Kam 2 mk`).
- [x] `npm run lint` berjalan dengan **0 errors dan 0 warnings**.
**Verification:**
- [x] Lint passes: `npm run lint`
- [x] Build & visual check pada `#fitur` dan `#alur-kerja` di browser.
**Dependencies:** None
**Files likely touched:**
- `src/components/landing/LandingFeatures.tsx`
- `src/components/landing/LandingWorkflow.tsx`

### Task 10: Touch Target >= 44px, Input Zoom Fix, Lightbox & Dead File Cleanup
**Description:** Menjamin seluruh elemen interaktif di portal & publisher memenuhi ukuran sentuhan minimal `44 × 44 px` (`antislop-layoutmobile` & `06-spec.md` §12), menghapus `!important` font override global di `globals.css`, memperbaiki `image-lightbox.tsx`, serta membersihkan file mati.
**Acceptance criteria:**
- [x] Seluruh tombol aksi (Edit/Delete/Pin di `ScheduleSlotCard`, `PublisherContentItem`, `PublisherDashboard`, tombol clear di `TaskFilterBar` & `AnnouncementFormFields`, tombol header di `TopHeader`) memiliki area sentuh >= `44 × 44 px`.
- [x] `globals.css` tidak memakai `font-size: 16px !important` secara paksa pada `<select>` kecil; input teks menggunakan kelas responsif tanpa distorsi UI.
- [x] `image-lightbox.tsx` tidak memiliki duplikasi kelas `pb-*` maupun `touch-none` pemblokir pan/zoom; `transition-all` diganti properti transisi spesifik (`emil-design-eng`).
- [x] File tak terpakai `PwaInstallPrompt.tsx`, `mock-store.tsx`, dan `public/manifest.json` dihapus.
**Verification:**
- [x] Build succeeds: `npm run build`
- [x] Visual check viewport mobile `360x740` dan desktop `1280x800`.
**Dependencies:** Task 9
**Files likely touched:**
- `src/app/globals.css`
- `src/components/ui/image-lightbox.tsx`
- `src/components/schedule/ScheduleSlotCard.tsx`
- `src/components/publisher/PublisherContentItem.tsx`
- `src/components/publisher/PublisherDashboard.tsx`
- `src/components/tasks/TaskFilterBar.tsx`
- `src/components/layout/TopHeader.tsx`
- `src/components/layout/PwaInstallPrompt.tsx` *(dihapus)*

## Checkpoint: After Tasks 9-10 (UI & Mobile-Native Gate)
- [x] `npm run lint` 0 warnings, `npm run build` sukses
- [x] Setiap file kode sumber tetap `< 500` baris (`AGENTS.md` Rule 2)

---

## Phase 4: Automated Testing & Spec Reconciliation

### Task 11: Setup `tsx --test` (`node:test`) & Suite Pengujian Unit
**Description:** Menambahkan skrip test native Node (`tsx --test`, tanpa menambah dependency produksi/Vitest baru sesuai `AGENTS.md` Rule 4) beserta pengujian otomatis untuk autentikasi PASETO, validasi Zod/SSRF, rate limit, course code, dan helper tanggal/waktu.
**Acceptance criteria:**
- [x] Skrip `"test": "tsx --test src/lib/__tests__/*.test.ts"` tersedia di `package.json`.
- [x] 5 suite test berjalan hijau (12 test cases): `auth.test.ts`, `validations.test.ts`, `date-utils.test.ts`, `course-utils.test.ts`, dan `rate-limit.test.ts`.
**Verification:**
- [x] Tests pass: `npm test` (`12/12` pass)
**Dependencies:** Tasks 1, 2, 6
**Files likely touched:**
- `package.json`
- `src/lib/__tests__/*.test.ts`

### Task 12: Sinkronisasi Kontrak Spec & Dokumentasi (`06-spec.md`, `AGENTS.md`)
**Description:** Menyelaraskan dokumentasi proyek (`AGENTS.md` dan `docs/06-spec.md`) dengan arsitektur aktif Next.js Server Actions + Turso + PASETO `v3.local` + ImageKit.io sesuai konfirmasi pengguna (tanpa membuat REST `/api/v1/*`).
**Acceptance criteria:**
- [x] `AGENTS.md` dan `docs/06-spec.md` konsisten 100% dengan arsitektur & struktur folder aktual di `src/`.
- [x] Changelog v1.6 tercatat di `docs/06-spec.md`.
**Verification:**
- [x] Build succeeds: `npm run build`
**Dependencies:** Tasks 1–11
**Files likely touched:**
- `AGENTS.md`
- `docs/06-spec.md`

## Checkpoint: Complete
- [x] `npm run lint` (0 errors, 0 warnings)
- [x] `npx tsc --noEmit` & `npm run build` sukses
- [x] `npm test` seluruh test pass (`12/12`)
- [x] `npm audit` ditinjau (`10 moderate` pada dev/transitive deps `esbuild`/`minimatch`/`uuid`; 0 critical/high)
