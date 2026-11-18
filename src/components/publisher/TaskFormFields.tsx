"use client"

import React from "react"
import { UseFormReturn } from "react-hook-form"
import { TaskFormValues } from "@/lib/validations"
import { Course } from "@/types"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface TaskFormFieldsProps {
  form: UseFormReturn<TaskFormValues>
  courses: Course[]
}

export function TaskFormFields({ form, courses }: TaskFormFieldsProps) {
  const {
    register,
    formState: { errors },
  } = form

  return (
    <div className="space-y-3.5">
      {/* Course & Week Number */}
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2 space-y-1">
          <label className="text-xs font-bold text-[#111318]">
            Mata Kuliah <span className="text-[#F05252]">*</span>
          </label>
          <select
            {...register("course_id")}
            className="w-full h-10 px-3 rounded-xl bg-[#EEF1F6] border border-[#E4E7F0] text-xs font-semibold text-[#111318] focus:outline-none focus:border-[#111318]"
          >
            <option value="">Pilih Mata Kuliah</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.code}: {c.name}
              </option>
            ))}
          </select>
          {errors.course_id && (
            <p className="text-[11px] text-[#F05252]">{errors.course_id.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-[#111318]">
            Mgg Ke-
          </label>
          <Input
            type="number"
            inputMode="numeric"
            min={1}
            max={16}
            placeholder="Contoh: 7"
            {...register("week_number")}
            className="h-10 rounded-xl bg-[#EEF1F6] border-[#E4E7F0] text-xs"
          />
        </div>
      </div>

      {/* Task Title */}
      <div className="space-y-1">
        <label className="text-xs font-bold text-[#111318]">
          Judul Tugas <span className="text-[#F05252]">*</span>
        </label>
        <Input
          placeholder="Contoh: Tugas 3: ERD Sistem Kasir"
          {...register("title")}
          className="h-10 rounded-xl bg-[#EEF1F6] border-[#E4E7F0] text-xs"
        />
        {errors.title && (
          <p className="text-[11px] text-[#F05252]">{errors.title.message}</p>
        )}
      </div>

      {/* Due Date */}
      <div className="space-y-1">
        <label className="text-xs font-bold text-[#111318]">
          Batas Waktu (Deadline) <span className="text-[#F05252]">*</span>
        </label>
        <Input
          type="datetime-local"
          {...register("due_date")}
          className="h-10 rounded-xl bg-[#EEF1F6] border-[#E4E7F0] text-xs"
        />
        {errors.due_date && (
          <p className="text-[11px] text-[#F05252]">{errors.due_date.message}</p>
        )}
      </div>

      {/* Instructions */}
      <div className="space-y-1">
        <label className="text-xs font-bold text-[#111318]">
          Instruksi & Rincian <span className="text-[#F05252]">*</span>
        </label>
        <Textarea
          rows={3}
          placeholder="Jelaskan detail instruksi pengerjaan tugas dari dosen..."
          {...register("instructions")}
          className="rounded-xl bg-[#EEF1F6] border-[#E4E7F0] text-xs resize-none"
        />
        {errors.instructions && (
          <p className="text-[11px] text-[#F05252]">{errors.instructions.message}</p>
        )}
      </div>

      {/* Submission Link */}
      <div className="space-y-1">
        <label className="text-xs font-bold text-[#111318]">
          Link Pengumpulan (Opsional)
        </label>
        <Input
          type="url"
          inputMode="url"
          autoCapitalize="none"
          autoCorrect="off"
          placeholder="https://classroom.google.com/..."
          {...register("submission_url")}
          className="h-10 rounded-xl bg-[#EEF1F6] border-[#E4E7F0] text-xs"
        />
        {errors.submission_url && (
          <p className="text-[11px] text-[#F05252]">{errors.submission_url.message}</p>
        )}
      </div>
    </div>
  )
}
