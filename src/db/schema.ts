import { relations } from "drizzle-orm"
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"

/**
 * 1. Tabel: account
 * Menyimpan kredensial anggota kelas dan pengurus/publisher.
 * role:
 *  - "member"      : Anggota kelas biasa (read-only tugas, jadwal, event)
 *  - "pj"          : PJ Mata Kuliah (editor tugas & event terkait matkul)
 *  - "ketua_kelas" : Ketua Kelas (admin/moderator penuh seluruh konten)
 */
export const accounts = sqliteTable("account", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull().unique(), // Username unik untuk login
  password: text("password").notNull(), // Hash bcrypt
  role: text("role", { enum: ["member", "pj", "ketua_kelas"] })
    .notNull()
    .default("member"),
  createdAt: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
})

/**
 * 2. Tabel: course
 * Master data mata kuliah dan dosen pengampu.
 * Constraint UNIQUE pada name mempermudah upsert proses scraping di masa depan.
 */
export const courses = sqliteTable("course", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull().unique(), // Nama resmi mata kuliah
  lecturer: text("lecturer"), // Nama dosen pengampu
  createdAt: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
})

/**
 * 3. Tabel: schedule
 * Jadwal kuliah statis per hari (1 = Senin s.d. 6 = Sabtu).
 * id_acc dibuat nullable agar skrip scraper otomatis dapat meng-insert data tanpa akun user.
 */
export const schedules = sqliteTable("schedule", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  idCourse: text("id_course")
    .notNull()
    .references(() => courses.id, { onDelete: "restrict" }),
  idAcc: text("id_acc").references(() => accounts.id, { onDelete: "set null" }),
  dayOfWeek: integer("day_of_week").notNull(), // 1 (Senin) - 6 (Sabtu)
  startTime: text("start_time").notNull(), // Format "HH:MM" contoh: "08:00"
  endTime: text("end_time").notNull(), // Format "HH:MM" contoh: "10:30"
  room: text("room").notNull(), // Ruangan / lab
  updatedAt: text("updated_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
})

/**
 * 4. Tabel: task
 * Tugas kelas (Area Privat). Akses wajib login anggota kelas (HTTP 401 jika publik).
 */
export const tasks = sqliteTable("task", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  idCourse: text("id_course")
    .notNull()
    .references(() => courses.id, { onDelete: "restrict" }),
  idAcc: text("id_acc").references(() => accounts.id, { onDelete: "set null" }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  dueDate: text("due_date").notNull(), // ISO-8601 string
  submissionUrl: text("submission_url"), // Link privat Google Drive / LMS
  status: text("status", { enum: ["DRAFT", "PUBLISHED"] })
    .notNull()
    .default("PUBLISHED"),
  createdAt: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
})

/**
 * 5. Tabel: event
 * Event, pengumuman akademik, berita kampus, dan info lomba (Area Publik).
 * Mendukung poster via ImageKit.io CDN.
 */
export const events = sqliteTable("event", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  idAcc: text("id_acc").references(() => accounts.id, { onDelete: "set null" }),
  idCourse: text("id_course").references(() => courses.id, { onDelete: "set null" }),
  category: text("category", { enum: ["ACADEMIC", "CAMPUS_NEWS", "COMPETITION"] }).notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  eventDate: text("event_date").notNull(), // YYYY-MM-DD atau ISO-8601
  sourceUrl: text("source_url"), // Tautan sumber resmi eksternal
  posterUrl: text("poster_url"), // URL CDN ImageKit.io
  posterFileId: text("poster_file_id"), // File ID ImageKit.io untuk pembersihan otomatis
  isPinned: integer("is_pinned", { mode: "boolean" }).notNull().default(false), // Sematan info penting / UTS
  status: text("status", { enum: ["DRAFT", "PUBLISHED"] })
    .notNull()
    .default("PUBLISHED"),
  createdAt: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
})

// --- Relasi Drizzle ORM ---

export const accountsRelations = relations(accounts, ({ many }) => ({
  tasks: many(tasks),
  events: many(events),
  schedules: many(schedules),
}))

export const coursesRelations = relations(courses, ({ many }) => ({
  tasks: many(tasks),
  schedules: many(schedules),
  events: many(events),
}))

export const schedulesRelations = relations(schedules, ({ one }) => ({
  course: one(courses, {
    fields: [schedules.idCourse],
    references: [courses.id],
  }),
  account: one(accounts, {
    fields: [schedules.idAcc],
    references: [accounts.id],
  }),
}))

export const tasksRelations = relations(tasks, ({ one }) => ({
  course: one(courses, {
    fields: [tasks.idCourse],
    references: [courses.id],
  }),
  account: one(accounts, {
    fields: [tasks.idAcc],
    references: [accounts.id],
  }),
}))

export const eventsRelations = relations(events, ({ one }) => ({
  course: one(courses, {
    fields: [events.idCourse],
    references: [courses.id],
  }),
  account: one(accounts, {
    fields: [events.idAcc],
    references: [accounts.id],
  }),
}))
