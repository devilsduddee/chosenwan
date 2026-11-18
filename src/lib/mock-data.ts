import { Course, Task, Announcement, Schedule, UserProfile } from "@/types"

export const MOCK_COURSES: Course[] = [
  {
    id: "c1",
    code: "IMK",
    name: "Interaksi Manusia & Komputer */**",
    lecturer_name: "Tavipia Rumambi",
  },
  {
    id: "c2",
    code: "PWEB",
    name: "Pemrograman WEB **",
    lecturer_name: "Ega Hegarini",
  },
  {
    id: "c3",
    code: "SBD1",
    name: "Sistem Basis Data 1 **",
    lecturer_name: "Jalinas / Elly Agustina Julisawati",
  },
  {
    id: "c4",
    code: "SKK",
    name: "Sistem Keamanan Komputer",
    lecturer_name: "Bintang Eka Putera",
  },
  {
    id: "c5",
    code: "JARKOM",
    name: "Jaringan Komputer */**",
    lecturer_name: "Mochammad Akbar Marwan / Dede Herman S",
  },
  {
    id: "c6",
    code: "KA",
    name: "Kecerdasan Artificial **",
    lecturer_name: "Octaviani Hutapea",
  },
  {
    id: "c7",
    code: "GK",
    name: "Grafik Komputer **",
    lecturer_name: "Aries Muslim",
  },
  {
    id: "c8",
    code: "PAA",
    name: "Peranc. & Analisis Algoritma */**",
    lecturer_name: "Risma Rahmalia Fitriani",
  },
]

// Reference baseline for mock dates
const getBaseDate = () => {
  if (typeof window !== "undefined") {
    return new Date()
  }
  return new Date("2026-11-18T10:00:00+07:00")
}

const daysFromNow = (d: number, hour = 23, minute = 59) => {
  const date = new Date(getBaseDate())
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
    due_date: daysFromNow(0, 23, 59), // Mendesak: Hari ini (23:59 WIB)
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
    title: "Praktikum 4: Normalisasi & Perancangan ERD",
    instructions: "Selesaikan studi kasus perancangan skema database Sistem Basis Data 1 hingga bentuk 3NF beserta diagram ERD dalam file PDF.",
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
    course_id: "c8",
    created_by: "u1",
    title: "Draft Tugas: Analisis Kompleksitas Divide & Conquer",
    instructions: "Bandingkan kompleksitas waktu Merge Sort dan Quick Sort pada kasus rata-rata serta terburuk menggunakan notasi Big-O.",
    week_number: 8,
    due_date: daysFromNow(10, 23, 59),
    submission_url: "",
    status: "DRAFT", // Khusus publisher view
    created_at: daysFromNow(0),
    course: MOCK_COURSES[7],
  },
]

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "a1",
    course_id: "c1",
    created_by: "u2",
    title: "Perubahan Ruangan: Kuliah IMK Selasa Pindah ke D221",
    category_type: "ACADEMIC",
    content: "Diberitahukan kepada rekan-rekan kelas 3IA01 bahwa perkuliahan Interaksi Manusia & Komputer sesi 8/9/10 minggu ini dipindahkan sementara dari D132 ke ruang D221.",
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

// Jadwal Perkuliahan Ganjil (PTA) 2026/2027 - Kelas 3IA01
export const MOCK_SCHEDULES: Schedule[] = [
  // Senin (day_of_week: 1)
  {
    id: "s1",
    course_id: "c2",
    updated_by: "u1",
    day_of_week: 1,
    start_time: "09:30", // Jam 3/4
    end_time: "11:30",
    room: "G222",
    lecturer_name: "Ega Hegarini",
    course: MOCK_COURSES[1],
  },
  {
    id: "s2",
    course_id: "c4",
    updated_by: "u1",
    day_of_week: 1,
    start_time: "11:30", // Jam 5/6
    end_time: "13:30",
    room: "G2410",
    lecturer_name: "Bintang Eka Putera",
    course: MOCK_COURSES[3],
  },
  {
    id: "s3",
    course_id: "c6",
    updated_by: "u1",
    day_of_week: 1,
    start_time: "13:30", // Jam 7/8
    end_time: "15:30",
    room: "G2410",
    lecturer_name: "Octaviani Hutapea",
    course: MOCK_COURSES[5],
  },
  // Selasa (day_of_week: 2)
  {
    id: "s4",
    course_id: "c7",
    updated_by: "u1",
    day_of_week: 2,
    start_time: "07:30", // Jam 1/2/3
    end_time: "10:30",
    room: "D655",
    lecturer_name: "Aries Muslim",
    course: MOCK_COURSES[6],
  },
  {
    id: "s5",
    course_id: "c3",
    updated_by: "u1",
    day_of_week: 2,
    start_time: "10:30", // Jam 4/5/6
    end_time: "13:30",
    room: "D655",
    lecturer_name: "Jalinas / Elly Agustina Julisawati",
    course: MOCK_COURSES[2],
  },
  {
    id: "s6",
    course_id: "c1",
    updated_by: "u1",
    day_of_week: 2,
    start_time: "14:30", // Jam 8/9/10
    end_time: "17:30",
    room: "D132",
    lecturer_name: "Tavipia Rumambi",
    course: MOCK_COURSES[0],
  },
  // Kamis (day_of_week: 4)
  {
    id: "s7",
    course_id: "c8",
    updated_by: "u1",
    day_of_week: 4,
    start_time: "11:30", // Jam 5/6/7
    end_time: "14:30",
    room: "G132",
    lecturer_name: "Risma Rahmalia Fitriani",
    course: MOCK_COURSES[7],
  },
  {
    id: "s8",
    course_id: "c5",
    updated_by: "u1",
    day_of_week: 4,
    start_time: "14:30", // Jam 8/9/10
    end_time: "17:30",
    room: "G132",
    lecturer_name: "Mochammad Akbar Marwan / Dede Herman S",
    course: MOCK_COURSES[4],
  },
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

export interface MockCredential {
  role: "ketua_kelas" | "pj_matkul"
  email: string
  password: string
  label: string
  description: string
  user: UserProfile
}

export const MOCK_CREDENTIALS: MockCredential[] = [
  {
    role: "ketua_kelas",
    email: "ketua@chosenwan.ac.id",
    password: "ketua123",
    label: "Ketua Kelas",
    description: "Bisa edit dan hapus semua postingan kelas serta jadwal.",
    user: MOCK_USERS.ketua_kelas,
  },
  {
    role: "pj_matkul",
    email: "pj.web@chosenwan.ac.id",
    password: "pjweb123",
    label: "PJ Mata Kuliah",
    description: "Bisa buat konten dan kelola postingan sendiri tanpa persetujuan.",
    user: MOCK_USERS.pj_matkul,
  },
]
