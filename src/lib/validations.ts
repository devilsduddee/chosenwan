import { z } from "zod"

const SAFE_HTTP_URL_REGEX = /^https?:\/\//i
const SAFE_RASTER_DATA_URL_REGEX = /^data:image\/(png|jpeg|jpg|webp);base64,[a-z0-9+/=]+$/i

const optionalHttpUrl = z
  .string()
  .trim()
  .url("Format tautan harus valid (contoh: https://...)")
  .refine((val) => SAFE_HTTP_URL_REGEX.test(val), "Tautan wajib menggunakan http:// atau https://")
  .optional()
  .or(z.literal(""))

const optionalPosterUrl = z
  .string()
  .trim()
  .refine(
    (val) => {
      if (!val) return true
      if (SAFE_RASTER_DATA_URL_REGEX.test(val)) return true
      try {
        const parsed = new URL(val)
        return parsed.protocol === "http:" || parsed.protocol === "https:"
      } catch {
        return false
      }
    },
    "Poster harus berupa gambar (PNG/JPG/WebP) atau tautan https:// yang valid"
  )
  .optional()
  .or(z.literal(""))

export const taskFormSchema = z.object({
  course_id: z.string().min(1, "Mata kuliah wajib dipilih"),
  title: z.string().min(3, "Judul tugas minimal 3 karakter"),
  instructions: z.string().min(5, "Instruksi tugas minimal 5 karakter"),
  week_number: z.string().optional(),
  due_date: z.string().min(1, "Batas waktu tugas wajib diisi"),
  submission_url: optionalHttpUrl,
})

export type TaskFormValues = z.infer<typeof taskFormSchema>

export const announcementFormSchema = z.object({
  category_type: z.enum(["ACADEMIC", "CAMPUS_NEWS", "COMPETITION"], {
    message: "Kategori pengumuman wajib dipilih",
  }),
  course_id: z.string().optional(),
  title: z.string().min(3, "Judul pengumuman minimal 3 karakter"),
  content: z.string().min(5, "Isi pengumuman minimal 5 karakter"),
  source_url: optionalHttpUrl,
  poster_url: optionalPosterUrl,
  is_pinned: z.boolean().optional(),
})

export type AnnouncementFormValues = z.infer<typeof announcementFormSchema>

export const loginFormSchema = z.object({
  name: z.string().trim().min(2, "Nama pengguna / username wajib diisi"),
  password: z.string().min(4, "Kata sandi minimal 4 karakter"),
})

export type LoginFormValues = z.infer<typeof loginFormSchema>

export const scheduleFormSchema = z.object({
  course_id: z.string().min(1, "Mata kuliah wajib dipilih"),
  day_of_week: z.string().min(1, "Hari wajib dipilih"),
  start_time: z.string().regex(/^\d{2}:\d{2}$/, "Format jam mulai HH:MM (contoh: 08:00)"),
  end_time: z.string().regex(/^\d{2}:\d{2}$/, "Format jam selesai HH:MM (contoh: 10:30)"),
  room: z.string().trim().min(2, "Nama ruangan minimal 2 karakter"),
  lecturer_name: z.string().optional(),
})

export type ScheduleFormValues = z.infer<typeof scheduleFormSchema>
