import { z } from "zod"

export const taskFormSchema = z.object({
  course_id: z.string().min(1, "Mata kuliah wajib dipilih"),
  title: z.string().min(3, "Judul tugas minimal 3 karakter"),
  instructions: z.string().min(5, "Instruksi tugas minimal 5 karakter"),
  week_number: z.string().optional(),
  due_date: z.string().min(1, "Batas waktu tugas wajib diisi"),
  submission_url: z
    .string()
    .url("Format tautan harus valid (contoh: https://...)")
    .optional()
    .or(z.literal("")),
})

export type TaskFormValues = z.infer<typeof taskFormSchema>

export const announcementFormSchema = z.object({
  category_type: z.enum(["ACADEMIC", "CAMPUS_NEWS", "COMPETITION"], {
    message: "Kategori pengumuman wajib dipilih",
  }),
  course_id: z.string().optional(),
  title: z.string().min(3, "Judul pengumuman minimal 3 karakter"),
  content: z.string().min(5, "Isi pengumuman minimal 5 karakter"),
  source_url: z
    .string()
    .url("Format tautan harus valid (contoh: https://...)")
    .optional()
    .or(z.literal("")),
})

export type AnnouncementFormValues = z.infer<typeof announcementFormSchema>

export const loginFormSchema = z.object({
  email: z.string().trim().min(1, "Email wajib diisi").email("Format email tidak valid"),
  password: z.string().min(6, "Kata sandi minimal 6 karakter"),
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
