"use client"

import React from "react"
import { UseFormReturn } from "react-hook-form"
import { AnnouncementFormValues } from "@/lib/validations"
import { Course } from "@/types"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface AnnouncementFormFieldsProps {
  form: UseFormReturn<AnnouncementFormValues>
  courses: Course[]
}

export function AnnouncementFormFields({ form, courses }: AnnouncementFormFieldsProps) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = form

  const selectedCategory = watch("category_type")

  const categories = [
    { id: "ACADEMIC", label: "Akademik", bg: "bg-[#A8C0FF]" },
    { id: "CAMPUS_NEWS", label: "Berita", bg: "bg-[#F6C866]" },
    { id: "COMPETITION", label: "Lomba", bg: "bg-[#EA9DFB]" },
  ] as const

  return (
    <div className="space-y-3.5">
      {/* Category Segmented Pills */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#111318]">
          Kategori Info <span className="text-[#F05252]">*</span>
        </label>
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#EEF1F6] rounded-2xl border border-[#E4E7F0]">
          {categories.map((c) => {
            const isSelected = selectedCategory === c.id
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setValue("category_type", c.id)}
                className={`min-h-[38px] rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#111318] text-white shadow-xs"
                    : "text-[#6E7485] hover:text-[#111318]"
                }`}
              >
                {c.label}
              </button>
            )
          })}
        </div>
        {errors.category_type && (
          <p className="text-[11px] text-[#F05252]">{errors.category_type.message}</p>
        )}
      </div>

      {/* Course (Optional for Academic) */}
      {selectedCategory === "ACADEMIC" && (
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#111318]">
            Terkait Mata Kuliah (Opsional)
          </label>
          <select
            {...register("course_id")}
            className="w-full h-10 px-3 rounded-xl bg-[#EEF1F6] border border-[#E4E7F0] text-xs font-semibold text-[#111318] focus:outline-none focus:border-[#111318]"
          >
            <option value="">Pengumuman Umum (Bukan Matkul Tertentu)</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.code} — {c.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Announcement Title */}
      <div className="space-y-1">
        <label className="text-xs font-bold text-[#111318]">
          Judul Informasi <span className="text-[#F05252]">*</span>
        </label>
        <Input
          placeholder="Contoh: Perubahan Ruangan Kuliah Kamis"
          {...register("title")}
          className="h-10 rounded-xl bg-[#EEF1F6] border-[#E4E7F0] text-xs"
        />
        {errors.title && (
          <p className="text-[11px] text-[#F05252]">{errors.title.message}</p>
        )}
      </div>

      {/* Content Body */}
      <div className="space-y-1">
        <label className="text-xs font-bold text-[#111318]">
          Isi Ringkas Informasi <span className="text-[#F05252]">*</span>
        </label>
        <Textarea
          rows={3}
          placeholder="Tuliskan detail pengumuman yang jelas dan ringkas..."
          {...register("content")}
          className="rounded-xl bg-[#EEF1F6] border-[#E4E7F0] text-xs resize-none"
        />
        {errors.content && (
          <p className="text-[11px] text-[#F05252]">{errors.content.message}</p>
        )}
      </div>

      {/* Source URL */}
      <div className="space-y-1">
        <label className="text-xs font-bold text-[#111318]">
          Tautan Sumber Resmi (Opsional)
        </label>
        <Input
          placeholder="https://instagram.com/p/... atau website lomba"
          {...register("source_url")}
          className="h-10 rounded-xl bg-[#EEF1F6] border-[#E4E7F0] text-xs"
        />
        {errors.source_url && (
          <p className="text-[11px] text-[#F05252]">{errors.source_url.message}</p>
        )}
      </div>
    </div>
  )
}
