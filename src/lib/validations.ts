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
