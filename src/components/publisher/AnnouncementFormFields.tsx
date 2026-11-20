"use client"

import React, { useRef, useState } from "react"
import { UseFormReturn, useWatch } from "react-hook-form"
import { AnnouncementFormValues } from "@/lib/validations"
import { compressPosterImage, isSafePosterSrc } from "@/lib/image-utils"
import { Course } from "@/types"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ImagePlus, X } from "lucide-react"
import { toast } from "sonner"

interface AnnouncementFormFieldsProps {
  form: UseFormReturn<AnnouncementFormValues>
  courses: Course[]
}

export function AnnouncementFormFields({ form, courses }: AnnouncementFormFieldsProps) {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = form

  const selectedCategory = useWatch({ control, name: "category_type" })
  const posterUrl = useWatch({ control, name: "poster_url" })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isProcessingPoster, setIsProcessingPoster] = useState(false)

  const categories = [
    { id: "ACADEMIC", label: "Akademik" },
    { id: "CAMPUS_NEWS", label: "Berita" },
    { id: "COMPETITION", label: "Lomba" },
  ] as const

  const handlePosterFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ""
    if (!file) return

    setIsProcessingPoster(true)
    try {
      const compressedDataUrl = await compressPosterImage(file)
      setValue("poster_url", compressedDataUrl, { shouldValidate: true, shouldDirty: true })
      toast.success("Poster lomba siap dilampirkan")
    } catch (err) {
      const message = err instanceof Error ? err.message : "Gagal memproses poster"
      toast.error(message)
    } finally {
      setIsProcessingPoster(false)
    }
  }

  const handleClearPoster = () => {
    setValue("poster_url", "", { shouldValidate: true, shouldDirty: true })
  }

  const showPosterField =
    selectedCategory === "COMPETITION" ||
    selectedCategory === "CAMPUS_NEWS" ||
    Boolean(posterUrl)
  const posterLabel =
    selectedCategory === "COMPETITION"
      ? "Poster Perlombaan (Opsional)"
      : "Poster / Gambar Info (Opsional)"
  const hasValidPosterPreview = isSafePosterSrc(posterUrl)

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
                {c.code}: {c.name}
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

      {/* Poster Upload / URL (Shown for Info Lomba & Berita Kampus) */}
      {showPosterField && (
        <div className="space-y-2 rounded-2xl bg-[#F6F7FB] border border-[#E4E7F0] p-3.5">
          <div className="flex items-center justify-between gap-2">
            <label className="text-xs font-bold text-[#111318]">
              {posterLabel}
            </label>
            <span className="text-[10px] font-semibold text-[#6E7485]">PNG / JPG / WebP</span>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handlePosterFileChange}
            className="hidden"
          />

          {hasValidPosterPreview && posterUrl && (
            <div className="relative rounded-xl overflow-hidden border border-[#E4E7F0] bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={posterUrl}
                alt="Preview poster perlombaan"
                className="w-full max-h-48 object-contain mx-auto bg-[#F6F7FB]"
              />
              <button
                type="button"
                onClick={handleClearPoster}
                aria-label="Hapus poster"
                title="Hapus poster"
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-[#111318]/85 hover:bg-[#F05252] text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={isProcessingPoster}
              onClick={() => fileInputRef.current?.click()}
              className="min-h-[38px] px-3.5 rounded-xl bg-white hover:bg-[#EEF1F6] border border-[#E4E7F0] text-xs font-bold text-[#111318] inline-flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer disabled:opacity-60"
            >
              <ImagePlus className="w-3.5 h-3.5" strokeWidth={2} />
              <span>{isProcessingPoster ? "Memproses..." : posterUrl ? "Ganti File" : "Upload Poster"}</span>
            </button>

            <Input
              type="url"
              inputMode="url"
              autoCapitalize="none"
              autoCorrect="off"
              placeholder="atau tempel link gambar (https://...)"
              value={posterUrl?.startsWith("data:") ? "" : posterUrl || ""}
              onChange={(e) => setValue("poster_url", e.target.value, { shouldValidate: true })}
              className="h-[38px] rounded-xl bg-white border-[#E4E7F0] text-xs"
            />
          </div>

          {errors.poster_url && (
            <p className="text-[11px] text-[#F05252]">{errors.poster_url.message}</p>
          )}
        </div>
      )}

      {/* Source URL */}
      <div className="space-y-1">
        <label className="text-xs font-bold text-[#111318]">
          Tautan Sumber Resmi (Opsional)
        </label>
        <Input
          type="url"
          inputMode="url"
          autoCapitalize="none"
          autoCorrect="off"
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
