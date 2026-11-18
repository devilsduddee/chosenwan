"use client"

import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Schedule } from "@/types"
import { scheduleFormSchema, ScheduleFormValues } from "@/lib/validations"
import { useMockStore } from "@/lib/mock-store"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

interface ScheduleEditorDialogProps {
  isOpen: boolean
  onClose: () => void
  defaultDay: number
  editingSchedule: Schedule | null
}

const DAY_OPTIONS = [
  { value: "1", label: "Senin" },
  { value: "2", label: "Selasa" },
  { value: "3", label: "Rabu" },
  { value: "4", label: "Kamis" },
  { value: "5", label: "Jumat" },
  { value: "6", label: "Sabtu" },
]

export function ScheduleEditorDialog({
  isOpen,
  onClose,
  defaultDay,
  editingSchedule,
}: ScheduleEditorDialogProps) {
  const { courses, currentUser, addSchedule, updateSchedule } = useMockStore()

  const form = useForm<ScheduleFormValues>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: {
      course_id: "",
      day_of_week: String(defaultDay),
      start_time: "08:00",
      end_time: "10:30",
      room: "",
      lecturer_name: "",
    },
  })

  useEffect(() => {
    if (!isOpen) return
    if (editingSchedule) {
      form.reset({
        course_id: editingSchedule.course_id,
        day_of_week: String(editingSchedule.day_of_week),
        start_time: editingSchedule.start_time,
        end_time: editingSchedule.end_time,
        room: editingSchedule.room,
        lecturer_name: editingSchedule.lecturer_name || "",
      })
    } else {
      form.reset({
        course_id: courses[0]?.id || "",
        day_of_week: String(defaultDay),
        start_time: "08:00",
        end_time: "10:30",
        room: "",
        lecturer_name: courses[0]?.lecturer_name || "",
      })
    }
  }, [isOpen, editingSchedule, defaultDay, courses, form])

  const handleCourseChange = (courseId: string) => {
    const selectedCourse = courses.find((c) => c.id === courseId)
    if (selectedCourse && !form.getValues("lecturer_name")) {
      form.setValue("lecturer_name", selectedCourse.lecturer_name)
    }
  }

  const onSubmit = (values: ScheduleFormValues) => {
    const payload = {
      course_id: values.course_id,
      updated_by: currentUser.id,
      day_of_week: Number(values.day_of_week),
      start_time: values.start_time,
      end_time: values.end_time,
      room: values.room,
      lecturer_name: values.lecturer_name || undefined,
    }

    if (editingSchedule) {
      updateSchedule(editingSchedule.id, payload)
      toast.success("Slot jadwal berhasil diperbarui")
    } else {
      addSchedule(payload)
      toast.success("Slot jadwal baru berhasil ditambahkan")
    }
    onClose()
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="bottom"
        className="w-full sm:max-w-lg mx-auto rounded-t-[24px] sm:rounded-[24px] sm:mb-4 p-6 max-h-[90vh] overflow-y-auto bg-white border border-[#E4E7F0] shadow-2xl"
      >
        <SheetHeader className="text-left space-y-1.5">
          <SheetTitle className="text-lg font-extrabold text-[#111318]">
            {editingSchedule ? "Edit Jadwal Kuliah" : "Tambah Jadwal Kuliah"}
          </SheetTitle>
          <SheetDescription className="text-xs text-[#6E7485]">
            Jadwal statis per semester. Untuk perubahan kelas satu kali pertemuan, posting di tab Info.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#111318]">Hari Kuliah</label>
              <select
                {...form.register("day_of_week")}
                className="w-full h-11 px-3 rounded-[14px] bg-[#EEF1F6] border border-[#E4E7F0] text-xs font-semibold text-[#111318] focus:outline-none focus:border-[#111318]"
              >
                {DAY_OPTIONS.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#111318]">Mata Kuliah</label>
              <select
                {...form.register("course_id", {
                  onChange: (e) => handleCourseChange(e.target.value),
                })}
                className="w-full h-11 px-3 rounded-[14px] bg-[#EEF1F6] border border-[#E4E7F0] text-xs font-semibold text-[#111318] focus:outline-none focus:border-[#111318]"
              >
                <option value="">Pilih Mata Kuliah...</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.code}: {c.name}
                  </option>
                ))}
              </select>
              {form.formState.errors.course_id && (
                <p className="text-[11px] text-[#F05252]">{form.formState.errors.course_id.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#111318]">Jam Mulai</label>
              <Input
                type="time"
                {...form.register("start_time")}
                className="h-11 rounded-[14px] bg-[#F6F7FB] border-[#E4E7F0] text-sm"
              />
              {form.formState.errors.start_time && (
                <p className="text-[11px] text-[#F05252]">{form.formState.errors.start_time.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#111318]">Jam Selesai</label>
              <Input
                type="time"
                {...form.register("end_time")}
                className="h-11 rounded-[14px] bg-[#F6F7FB] border-[#E4E7F0] text-sm"
              />
              {form.formState.errors.end_time && (
                <p className="text-[11px] text-[#F05252]">{form.formState.errors.end_time.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#111318]">Ruangan / Lab</label>
            <Input
              placeholder="Contoh: Lab Komputer 2 / Ruang 302"
              {...form.register("room")}
              className="h-11 rounded-[14px] bg-[#F6F7FB] border-[#E4E7F0] text-sm"
            />
            {form.formState.errors.room && (
              <p className="text-[11px] text-[#F05252]">{form.formState.errors.room.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#111318]">Nama Dosen (Opsional)</label>
            <Input
              placeholder="Nama dosen pengampu"
              {...form.register("lecturer_name")}
              className="h-11 rounded-[14px] bg-[#F6F7FB] border-[#E4E7F0] text-sm"
            />
          </div>

          <div className="pt-2 flex items-center gap-2.5">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 min-h-[44px] rounded-full border-[#E4E7F0] bg-[#EEF1F6] text-xs font-bold text-[#111318]"
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="flex-1 min-h-[44px] rounded-full bg-[#111318] hover:bg-[#111318]/90 text-white text-xs font-bold"
            >
              {editingSchedule ? "Simpan Perubahan" : "Simpan Jadwal"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
