import { Course, Task, Announcement, Schedule, UserProfile } from "@/types"

export const MOCK_COURSES: Course[] = [
  {
    id: "c1",
    code: "IF2140",
    name: "Interaksi Manusia dan Komputer",
    lecturer_name: "Siti Rahma, M.T.",
  },
  {
    id: "c2",
    code: "IF2150",
    name: "Pemrograman Web",
    lecturer_name: "Rahmat Hidayat, M.Kom.",
  },
  {
    id: "c3",
    code: "IF2160",
    name: "Basis Data Lanjut",
    lecturer_name: "Dr. Ir. Budi Santoso",
  },
  {
    id: "c4",
    code: "IF2170",
    name: "Rekayasa Perangkat Lunak",
    lecturer_name: "Hendra Wijaya, Ph.D.",
  },
  {
    id: "c5",
    code: "IF2180",
    name: "Jaringan Komputer",
    lecturer_name: "Doni Prasetyo, M.Cs.",
  },
]

// Helper function to create relative dates
const now = new Date()
const hoursFromNow = (h: number) => new Date(now.getTime() + h * 3600 * 1000).toISOString()
const daysFromNow = (d: number, hour = 23, minute = 59) => {
  const date = new Date(now)
  date.setDate(date.getDate() + d)
  date.setHours(hour, minute, 0, 0)
  return date.toISOString()
}

export const MOCK_TASKS: Task[] = [
  {
    id: "t1",
    course_id: "c1",
    created_by: "u2",
    title: "Tugas 3: Perancangan UI Mobile High-Fidelity",
    instructions: "Buat minimal 4 frame prototipe aplikasi mobile menggunakan tema Playful Bento di Figma. Cantumkan link Figma yang dapat diakses publik pada Google Classroom.",
    week_number: 6,
    due_date: hoursFromNow(5), // Mendesak: Hari ini (~5 jam lagi)
    submission_url: "https://classroom.google.com/c/example-imk",
    status: "PUBLISHED",
    created_at: daysFromNow(-3),
    course: MOCK_COURSES[0],
  },
  {
    id: "t2",
    course_id: "c2",
    created_by: "u2",
    title: "Milestone 1: Implementasi REST API & Schema",
    instructions: "Buat endpoint CRUD untuk entitas pengguna dan produk menggunakan Next.js Route Handlers. Lampirkan export Postman Collection pada link Drive pengumpulan.",
    week_number: 7,
    due_date: daysFromNow(2, 23, 59), // H-2 (Mendekati tenggat)
    submission_url: "https://forms.gle/example-web-tugas",
    status: "PUBLISHED",
    created_at: daysFromNow(-2),
    course: MOCK_COURSES[1],
  },
  {
    id: "t3",
    course_id: "c3",
    created_by: "u1",
    title: "Praktikum 4: Optimasi Query & Composite Index",
    instructions: "Selesaikan 5 soal studi kasus query tuning pada schema database rental mobil. Tuliskan query SQL beserta hasil EXPLAIN ANALYZE dalam file PDF.",
    week_number: 7,
    due_date: daysFromNow(5, 17, 0), // Aman (> 3 hari)
    submission_url: "https://classroom.google.com/c/example-basdat",
    status: "PUBLISHED",
    created_at: daysFromNow(-1),
    course: MOCK_COURSES[2],
  },
  {
    id: "t4",
    course_id: "c5",
    created_by: "u1",
    title: "Laporan Awal: Konfigurasi Subnetting IPv4",
    instructions: "Hitung pembagian subnet IP kelas C untuk 4 laboratorium komputer. Kerjakan pada lembar kerja praktikum modul 2.",
    week_number: 5,
    due_date: daysFromNow(-1, 23, 59), // Lewat tenggat (Past Due)
    submission_url: "https://classroom.google.com/c/example-jarkom",
    status: "PUBLISHED",
    created_at: daysFromNow(-8),
    course: MOCK_COURSES[4],
  },
  {
    id: "t5",
    course_id: "c4",
    created_by: "u1",
    title: "Draft Tugas: SRS Dokumen Perancangan Sistem",
    instructions: "Menyusun Software Requirements Specification bab 1 sampai 3 sesuai format IEEE 830.",
    week_number: 8,
    due_date: daysFromNow(10, 23, 59),
    submission_url: "",
    status: "DRAFT", // Khusus publisher view
    created_at: daysFromNow(0),
    course: MOCK_COURSES[3],
  },
]

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "a1",
    course_id: "c1",
    created_by: "u2",
    title: "Perubahan Ruangan: Kuliah IMK Kamis Pindah ke Lab Komputer 2",
    category_type: "ACADEMIC",
    content: "Diberitahukan kepada rekan-rekan kelas bahwa perkuliahan IMK hari Kamis minggu ini dipindahkan ke Lab Komputer 2 Lantai 3 karena ruang 302 sedang dipakai ujian sertifikasi.",
    source_url: null,
    status: "PUBLISHED",
    created_at: daysFromNow(-1),
    course: MOCK_COURSES[0],
  },
  {
    id: "a2",
    course_id: null,
    created_by: "u1",
    title: "Pendaftaran Beasiswa Unggulan Prestasi Mahasiswa Semester Genap",
    category_type: "CAMPUS_NEWS",
    content: "Pusat Kemahasiswaan membuka pendaftaran beasiswa biaya kuliah UKT untuk mahasiswa berprestasi akademik & non-akademik. Batas akhir pendaftaran berkas 30 November.",
    source_url: "https://kemahasiswaan.kampus.ac.id/beasiswa-2026",
    status: "PUBLISHED",
    created_at: daysFromNow(-2),
  },
  {
    id: "a3",
    course_id: null,
    created_by: "u1",
    title: "Gemastik 2026: Divisi UX Design & Software Development",
    category_type: "COMPETITION",
    content: "Pendaftaran babak penyisihan Gemastik telah dibuka! Bagi rekan kelas yang berminat membentuk tim lomba divisi UX Design atau Software Dev, silakan kontak ketua kelas untuk koordinasi dosen pembimbing.",
    source_url: "https://pusatprestasinasional.kemdikbud.go.id/gemastik",
    status: "PUBLISHED",
    created_at: daysFromNow(-4),
  },
  {
    id: "a4",
    course_id: null,
    created_by: "u1",
    title: "Draft Info: Pengumuman Libur Hari Pencoblosan Pilkada",
    category_type: "CAMPUS_NEWS",
    content: "Draft surat edaran rektorat mengenai libur nasional kegiatan perkuliahan tatap muka.",
    source_url: null,
    status: "DRAFT", // Khusus publisher view
    created_at: daysFromNow(0),
  },
]

export const MOCK_SCHEDULES: Schedule[] = [
  {
    id: "s1",
    course_id: "c3",
    updated_by: "u1",
    day_of_week: 1, // Senin
    start_time: "08:00",
    end_time: "10:30",
    room: "Lab Komputer 1",
    lecturer_name: "Dr. Ir. Budi Santoso",
    course: MOCK_COURSES[2],
  },
  {
    id: "s2",
    course_id: "c2",
    updated_by: "u1",
    day_of_week: 2, // Selasa
    start_time: "10:00",
    end_time: "12:30",
    room: "Lab Komputer 3",
    lecturer_name: "Rahmat Hidayat, M.Kom.",
    course: MOCK_COURSES[1],
  },
  {
    id: "s3",
    course_id: "c1",
    updated_by: "u1",
    day_of_week: 3, // Rabu
    start_time: "13:00",
    end_time: "15:30",
    room: "Ruang Kuliah 302",
    lecturer_name: "Siti Rahma, M.T.",
    course: MOCK_COURSES[0],
  },
  {
    id: "s4",
    course_id: "c4",
    updated_by: "u1",
    day_of_week: 4, // Kamis
    start_time: "08:00",
    end_time: "10:30",
    room: "Ruang Kuliah 401",
    lecturer_name: "Hendra Wijaya, Ph.D.",
    course: MOCK_COURSES[3],
  },
  {
    id: "s5",
    course_id: "c5",
    updated_by: "u1",
    day_of_week: 5, // Jumat
    start_time: "08:30",
    end_time: "11:00",
    room: "Lab Jaringan Lt. 2",
    lecturer_name: "Doni Prasetyo, M.Cs.",
    course: MOCK_COURSES[4],
  },
  // Sabtu (day_of_week 6) sengaja dikosongkan untuk empty state testing!
]

export const MOCK_USERS: Record<string, UserProfile> = {
  ketua_kelas: {
    id: "u1",
    email: "ketua@chosenwan.ac.id",
    full_name: "Farhan (Ketua Kelas)",
    role: "ketua_kelas",
  },
  pj_matkul: {
    id: "u2",
    email: "pj.web@chosenwan.ac.id",
    full_name: "Andi (PJ Pemrograman Web)",
    role: "pj_matkul",
  },
  guest: {
    id: "u0",
    email: "mahasiswa@chosenwan.ac.id",
    full_name: "Mahasiswa Kelas",
    role: "guest",
  },
}
