import { z } from "zod"
import { isSafeHttpUrl, isSafePosterSrc, MAX_POSTER_DATA_URL_LENGTH } from "@/lib/url-safety"

export const entityIdSchema = z
  .string()
  .trim()
  .min(1, "ID wajib diisi")
  .max(128, "Format ID tidak valid")

const optionalHttpUrl = z
  .string()
  .trim()
  .max(2048, "Tautan maksimal 2048 karakter")
  .refine((val) => !val || isSafeHttpUrl(val), {
    message: "Tautan harus berupa URL http(s) publik tanpa kredensial",
  })
  .optional()
  .nullable()
  .or(z.literal(""))

const optionalPosterUrl = z
  .string()
  .trim()
  .max(MAX_POSTER_DATA_URL_LENGTH, "Ukuran poster melebihi batas maksimal server")
  .refine((val) => !val || isSafePosterSrc(val), {
    message: "Poster harus berupa gambar (PNG/JPG/WebP) atau tautan https:// yang valid",
  })
  .optional()
  .nullable()
  .or(z.literal(""))

export const taskFormSchema = z.object({
  course_id: z.string().min(1, "Mata kuliah wajib dipilih"),
  title: z.string().trim().min(3, "Judul tugas minimal 3 karakter").max(200, "Judul maksimal 200 karakter"),
  instructions: z
    .string()
    .trim()
    .min(5, "Instruksi tugas minimal 5 karakter")
    .max(5000, "Instruksi maksimal 5000 karakter"),
  due_date: z.string().min(1, "Batas waktu tugas wajib diisi"),
  submission_url: optionalHttpUrl,
})

export type TaskFormValues = z.infer<typeof taskFormSchema>

export const announcementFormSchema = z.object({
  category_type: z.enum(["ACADEMIC", "CAMPUS_NEWS", "COMPETITION"], {
    message: "Kategori pengumuman wajib dipilih",
  }),
  course_id: z.string().optional(),
  title: z
    .string()
    .trim()
    .min(3, "Judul pengumuman minimal 3 karakter")
    .max(200, "Judul maksimal 200 karakter"),
  content: z
    .string()
    .trim()
    .min(5, "Isi pengumuman minimal 5 karakter")
    .max(5000, "Isi maksimal 5000 karakter"),
  event_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format tanggal YYYY-MM-DD").optional().or(z.literal("")),
  source_url: optionalHttpUrl,
  poster_url: optionalPosterUrl,
  is_pinned: z.boolean().optional(),
})

export type AnnouncementFormValues = z.infer<typeof announcementFormSchema>

export const loginFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Nama pengguna / username wajib diisi")
    .max(64, "Nama pengguna maksimal 64 karakter"),
  password: z.string().min(4, "Kata sandi minimal 4 karakter").max(128, "Kata sandi terlalu panjang"),
})

export type LoginFormValues = z.infer<typeof loginFormSchema>

export const scheduleFormSchema = z.object({
  course_id: z.string().min(1, "Mata kuliah wajib dipilih"),
  day_of_week: z.string().min(1, "Hari wajib dipilih"),
  start_time: z.string().regex(/^\d{2}:\d{2}$/, "Format jam mulai HH:MM (contoh: 08:00)"),
  end_time: z.string().regex(/^\d{2}:\d{2}$/, "Format jam selesai HH:MM (contoh: 10:30)"),
  room: z.string().trim().min(2, "Nama ruangan minimal 2 karakter").max(80, "Nama ruangan maksimal 80 karakter"),
  lecturer_name: z.string().optional(),
})

export type ScheduleFormValues = z.infer<typeof scheduleFormSchema>

// --- Server Action Boundary Schemas ---

const isoDateString = z
  .string()
  .min(1, "Tanggal tenggat wajib diisi")
  .refine((val) => !isNaN(new Date(val).getTime()), "Format tanggal tidak valid")

export const serverTaskCreateSchema = z.object({
  course_id: z.string().trim().min(1, "Mata kuliah wajib dipilih"),
  title: z.string().trim().min(3, "Judul minimal 3 karakter").max(200, "Judul maksimal 200 karakter"),
  instructions: z
    .string()
    .trim()
    .min(5, "Instruksi minimal 5 karakter")
    .max(5000, "Instruksi maksimal 5000 karakter"),
  due_date: isoDateString,
  submission_url: optionalHttpUrl,
  status: z.enum(["DRAFT", "PUBLISHED"]),
})

export const serverTaskUpdateSchema = serverTaskCreateSchema.partial()

export const serverEventCreateSchema = z.object({
  category: z.enum(["ACADEMIC", "CAMPUS_NEWS", "COMPETITION"]),
  title: z.string().trim().min(3, "Judul minimal 3 karakter").max(200, "Judul maksimal 200 karakter"),
  content: z
    .string()
    .trim()
    .min(5, "Isi minimal 5 karakter")
    .max(5000, "Isi maksimal 5000 karakter"),
  course_id: z.string().trim().optional().nullable(),
  event_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Format tanggal acara harus YYYY-MM-DD")
    .optional(),
  source_url: optionalHttpUrl,
  poster_url: optionalPosterUrl,
  poster_file_id: z.string().trim().max(255).optional().nullable(),
  is_pinned: z.boolean().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]),
})

export const serverEventUpdateSchema = serverEventCreateSchema.partial()

export const serverScheduleCreateSchema = z
  .object({
    course_id: z.string().trim().min(1, "Mata kuliah wajib dipilih"),
    day_of_week: z.number().int().min(1, "Hari minimal 1 (Senin)").max(6, "Hari maksimal 6 (Sabtu)"),
    start_time: z.string().regex(/^\d{2}:\d{2}$/, "Format jam mulai HH:MM"),
    end_time: z.string().regex(/^\d{2}:\d{2}$/, "Format jam selesai HH:MM"),
    room: z.string().trim().min(2, "Ruangan minimal 2 karakter").max(80, "Ruangan maksimal 80 karakter"),
  })
  .refine((data) => data.start_time < data.end_time, {
    message: "Jam selesai harus lebih besar dari jam mulai",
    path: ["end_time"],
  })

export const serverScheduleUpdateSchema = serverScheduleCreateSchema
