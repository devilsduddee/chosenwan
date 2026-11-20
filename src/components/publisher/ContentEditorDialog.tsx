"use client"

import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  taskFormSchema,
  TaskFormValues,
  announcementFormSchema,
  AnnouncementFormValues,
} from "@/lib/validations"
import { useMockStore } from "@/lib/mock-store"
import { Task, Announcement } from "@/types"
import { TaskFormFields } from "@/components/publisher/TaskFormFields"
import { AnnouncementFormFields } from "@/components/publisher/AnnouncementFormFields"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { CheckSquare, Megaphone, Send, Bookmark } from "lucide-react"

export function ContentEditorDialog() {
  const {
    isEditorOpen,
    setIsEditorOpen,
    editingContent,
    setEditingContent,
    courses,
    currentUser,
    addTask,
    updateTask,
    addAnnouncement,
    updateAnnouncement,
  } = useMockStore()

  const [selectedType, setSelectedType] = useState<"task" | "announcement">("task")
  const contentType = editingContent ? editingContent.type : selectedType

  // Forms
  const taskForm = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      course_id: "",
      title: "",
      instructions: "",
      week_number: "",
      due_date: "",
      submission_url: "",
    },
  })

  const announcementForm = useForm<AnnouncementFormValues>({
    resolver: zodResolver(announcementFormSchema),
    defaultValues: {
      category_type: "ACADEMIC",
      course_id: "",
      title: "",
      content: "",
      source_url: "",
      poster_url: "",
    },
  })

  // Pre-fill fields when modal opens or editingContent changes
  useEffect(() => {
    if (!isEditorOpen) return

    if (editingContent) {
      if (editingContent.type === "task") {
        const t = editingContent.data as Task
        const dateStr = t.due_date ? new Date(t.due_date).toISOString().slice(0, 16) : ""
        taskForm.reset({
          course_id: t.course_id || "",
          title: t.title || "",
          instructions: t.instructions || "",
          week_number: t.week_number ? String(t.week_number) : "",
          due_date: dateStr,
          submission_url: t.submission_url || "",
        })
      } else {
        const a = editingContent.data as Announcement
        announcementForm.reset({
          category_type: a.category_type || "ACADEMIC",
          course_id: a.course_id || "",
          title: a.title || "",
          content: a.content || "",
          source_url: a.source_url || "",
          poster_url: a.poster_url || "",
        })
      }
    } else {
      taskForm.reset({
        course_id: "",
        title: "",
        instructions: "",
        week_number: "",
        due_date: "",
        submission_url: "",
      })
      announcementForm.reset({
        category_type: "ACADEMIC",
        course_id: "",
        title: "",
        content: "",
        source_url: "",
        poster_url: "",
      })
    }
  }, [editingContent, isEditorOpen, taskForm, announcementForm])

  const handleClose = () => {
    setIsEditorOpen(false)
    setEditingContent(null)
  }

  // Handle Submission with status ('DRAFT' or 'PUBLISHED')
  const handleSubmitContent = (status: "DRAFT" | "PUBLISHED") => {
    if (contentType === "task") {
      taskForm.handleSubmit((values) => {
        const payload = {
          course_id: values.course_id,
          title: values.title,
          instructions: values.instructions,
          week_number: values.week_number ? Number(values.week_number) : undefined,
          due_date: new Date(values.due_date).toISOString(),
          submission_url: values.submission_url || undefined,
          status,
          created_by: currentUser.id,
        }

        if (editingContent && editingContent.type === "task") {
          updateTask(editingContent.data.id, payload)
          toast.success(`Tugas berhasil diperbarui (${status === "DRAFT" ? "Draft" : "Terbit"})`)
        } else {
          addTask(payload)
          toast.success(`Tugas berhasil ${status === "DRAFT" ? "disimpan sebagai draft" : "diterbitkan"}!`)
        }
        handleClose()
      })()
    } else {
      announcementForm.handleSubmit((values) => {
        const payload = {
          category_type: values.category_type,
          course_id: values.course_id || undefined,
          title: values.title,
          content: values.content,
          source_url: values.source_url || undefined,
          poster_url: values.poster_url || null,
          status,
          created_by: currentUser.id,
        }

        if (editingContent && editingContent.type === "announcement") {
          updateAnnouncement(editingContent.data.id, payload)
          toast.success(`Info berhasil diperbarui (${status === "DRAFT" ? "Draft" : "Terbit"})`)
        } else {
          addAnnouncement(payload)
          toast.success(`Info berhasil ${status === "DRAFT" ? "disimpan sebagai draft" : "diterbitkan"}!`)
        }
        handleClose()
      })()
    }
  }

  return (
    <Sheet open={isEditorOpen} onOpenChange={(open) => !open && handleClose()}>
      <SheetContent
        side="bottom"
        className="w-full sm:max-w-lg mx-auto rounded-t-[24px] sm:rounded-[24px] sm:mb-4 p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] max-h-[92dvh] overflow-y-auto overscroll-contain bg-white border border-[#E4E7F0] shadow-2xl flex flex-col"
      >
        <SheetHeader className="text-left space-y-2">
          <SheetTitle className="text-lg font-extrabold text-[#111318]">
            {editingContent ? "Edit Konten" : "Posting Informasi Kelas"}
          </SheetTitle>
          <SheetDescription className="text-xs text-[#6E7485]">
            Publisher: <strong className="text-[#111318]">{currentUser.full_name}</strong>
          </SheetDescription>
        </SheetHeader>

        {/* Content Type Toggle (only active if creating new) */}
        {!editingContent && (
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#EEF1F6] rounded-2xl border border-[#E4E7F0] mt-3">
            <button
              type="button"
              onClick={() => setSelectedType("task")}
              className={`min-h-[40px] rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                contentType === "task"
                  ? "bg-[#111318] text-white shadow-xs"
                  : "text-[#6E7485] hover:text-[#111318]"
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Tugas Kuliah</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedType("announcement")}
              className={`min-h-[40px] rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                contentType === "announcement"
                  ? "bg-[#111318] text-white shadow-xs"
                  : "text-[#6E7485] hover:text-[#111318]"
              }`}
            >
              <Megaphone className="w-3.5 h-3.5" />
              <span>Pengumuman / Info</span>
            </button>
          </div>
        )}

        {/* Form Body */}
        <div className="mt-4 flex-1">
          {contentType === "task" ? (
            <TaskFormFields form={taskForm} courses={courses} />
          ) : (
            <AnnouncementFormFields form={announcementForm} courses={courses} />
          )}
        </div>

        {/* Fixed Dual Action Buttons */}
        <div className="mt-6 pt-3 border-t border-[#E4E7F0] grid grid-cols-2 gap-2.5">
          <Button
            type="button"
            variant="secondary"
            onClick={() => handleSubmitContent("DRAFT")}
            className="min-h-[44px] rounded-full bg-[#EEF1F6] hover:bg-[#E4E7F0] text-[#111318] text-xs font-bold flex items-center justify-center gap-1.5"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Simpan Draft</span>
          </Button>

          <Button
            type="button"
            onClick={() => handleSubmitContent("PUBLISHED")}
            className="min-h-[44px] rounded-full bg-[#111318] hover:bg-[#111318]/90 text-white text-xs font-bold shadow-sm flex items-center justify-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Terbitkan</span>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
