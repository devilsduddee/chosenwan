import { config } from "dotenv"
config({ path: ".env.local" })

import bcrypt from "bcryptjs"
import { db } from "./index"
import { accounts, courses, schedules } from "./schema"
import { eq } from "drizzle-orm"

export async function seed() {
  console.log("🌱 Menjalankan update jadwal & mata kuliah kelas 3IA01...")

  // 1. Akun Pengguna Awal
  const defaultAccounts = [
    {
      name: "ketua",
      passwordRaw: "ketua123",
      role: "ketua_kelas" as const,
    },
    {
      name: "pj",
      passwordRaw: "pj12345",
      role: "pj" as const,
    },
    {
      name: "member",
      passwordRaw: "member123",
      role: "member" as const,
    },
  ]

  for (const acc of defaultAccounts) {
    const existing = await db
      .select()
      .from(accounts)
      .where(eq(accounts.name, acc.name))
      .get()

    if (!existing) {
      const hashedPassword = await bcrypt.hash(acc.passwordRaw, 10)
      await db.insert(accounts).values({
        name: acc.name,
        password: hashedPassword,
        role: acc.role,
      })
      console.log(`✅ Akun dibuat: ${acc.name} (${acc.role}) - pass: ${acc.passwordRaw}`)
    } else {
      console.log(`ℹ️ Akun ${acc.name} sudah ada.`)
    }
  }

  // 2. Bersihkan Jadwal & Course Lama
  console.log("🧹 Menghapus jadwal dan mata kuliah lama...")
  await db.delete(schedules)
  await db.delete(courses)

  // 3. Master Mata Kuliah Resmi Kelas 3IA01
  const officialCourses = [
    { name: "Pemrograman Web", lecturer: "Ega Hegarini" },
    { name: "Sistem Keamanan Komputer", lecturer: "Bintang Eka Putera" },
    { name: "Kecerdasan Artificial", lecturer: "Octaviani Hutapea" },
    { name: "Grafik Komputer", lecturer: "Aries Muslim" },
    { name: "Sistem Basis Data 1", lecturer: "Jalinas / Elly Agustina Julisawati" },
    { name: "Interaksi Manusia & Komputer", lecturer: "Tavipia Rumambi" },
    { name: "Perancangan & Analisis Algoritma", lecturer: "Risma Rahmalia Fitriani" },
    { name: "Jaringan Komputer", lecturer: "Mochammad Akbar Marwan / Dede Herman S" },
  ]

  const insertedCourses: Record<string, string> = {}

  for (const c of officialCourses) {
    const [inserted] = await db
      .insert(courses)
      .values({
        name: c.name,
        lecturer: c.lecturer,
      })
      .returning()
    insertedCourses[c.name] = inserted.id
    console.log(`✅ Mata kuliah ditambahkan: ${c.name} (${c.lecturer})`)
  }

  // 4. Jadwal Statis Kuliah Kelas 3IA01 (Konversi Jam Gunadarma)
  const ketuaUser = await db
    .select()
    .from(accounts)
    .where(eq(accounts.name, "ketua"))
    .get()

  const officialSchedules = [
    // SENIN (day_of_week: 1)
    {
      courseName: "Pemrograman Web",
      dayOfWeek: 1,
      startTime: "09:30", // Jam 3/4 (09:30 - 11:30)
      endTime: "11:30",
      room: "G222",
    },
    {
      courseName: "Sistem Keamanan Komputer",
      dayOfWeek: 1,
      startTime: "11:30", // Jam 5/6 (11:30 - 13:30)
      endTime: "13:30",
      room: "G2410",
    },
    {
      courseName: "Kecerdasan Artificial",
      dayOfWeek: 1,
      startTime: "13:30", // Jam 7/8 (13:30 - 15:30)
      endTime: "15:30",
      room: "G2410",
    },

    // SELASA (day_of_week: 2)
    {
      courseName: "Grafik Komputer",
      dayOfWeek: 2,
      startTime: "07:30", // Jam 1/2/3 (07:30 - 10:30)
      endTime: "10:30",
      room: "D655",
    },
    {
      courseName: "Sistem Basis Data 1",
      dayOfWeek: 2,
      startTime: "10:30", // Jam 4/5/6 (10:30 - 13:30)
      endTime: "13:30",
      room: "D655",
    },
    {
      courseName: "Interaksi Manusia & Komputer",
      dayOfWeek: 2,
      startTime: "14:30", // Jam 8/9/10 (14:30 - 17:30)
      endTime: "17:30",
      room: "D132",
    },

    // KAMIS (day_of_week: 4)
    {
      courseName: "Perancangan & Analisis Algoritma",
      dayOfWeek: 4,
      startTime: "11:30", // Jam 5/6/7 (11:30 - 14:30)
      endTime: "14:30",
      room: "G132",
    },
    {
      courseName: "Jaringan Komputer",
      dayOfWeek: 4,
      startTime: "14:30", // Jam 8/9/10 (14:30 - 17:30)
      endTime: "17:30",
      room: "G132",
    },
  ]

  for (const s of officialSchedules) {
    const courseId = insertedCourses[s.courseName]
    if (courseId) {
      await db.insert(schedules).values({
        idCourse: courseId,
        idAcc: ketuaUser?.id ?? null,
        dayOfWeek: s.dayOfWeek,
        startTime: s.startTime,
        endTime: s.endTime,
        room: s.room,
      })
    }
  }

  console.log(`✅ 8 Slot Jadwal Kuliah Resmi Kelas 3IA01 berhasil disimpan ke database!`)
  console.log("🎉 Pembaruan jadwal selesai!")
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Error saat update jadwal:", err)
    process.exit(1)
  })
