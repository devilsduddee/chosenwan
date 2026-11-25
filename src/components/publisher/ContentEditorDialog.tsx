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
import { usePortalStore } from "@/lib/portal-store"
import { formatDateInputValue, formatDateTimeLocalInput } from "@/lib/date-utils"
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
import { CheckSquare, Megaphone, Send, Bookmark, Loader2 } from "lucide-react"

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
  } = usePortalStore()

  const [selectedType, setSelectedType] = useState<"task" | "announcement">("task")
  const [submittingStatus, setSubmittingStatus] = useState<"DRAFT" | "PUBLISHED" | null>(null)
  const contentType = editingContent ? editingContent.type : selectedType
  const isSubmitting = submittingStatus !== null

  const taskForm = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      course_id: "",
      title: "",
      instructions: "",
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
      event_date: "",
      source_url: "",
      poster_url: "",
      is_pinned: false,
    },
  })

  useEffect(() => {
    if (!isEditorOpen) return

    if (editingContent) {
      if (editingContent.type === "task") {
        const t = editingContent.data as Task
        const dateStr = t.due_date ? formatDateTimeLocalInput(t.due_date) : ""
        taskForm.reset({
          course_id: t.course_id || "",
          title: t.title || "",
          instructions: t.instructions || "",
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
          event_date: a.event_date ? formatDateInputValue(a.event_date) : "",
          source_url: a.source_url || "",
          poster_url: a.poster_url || "",
          is_pinned: Boolean(a.is_pinned),
        })
      }
    } else {
      taskForm.reset({
        course_id: "",
        title: "",
        instructions: "",
        due_date: "",
        submission_url: "",
      })
      announcementForm.reset({
        category_type: "ACADEMIC",
        course_id: "",
        title: "",
        content: "",
        event_date: formatDateInputValue(new Date()),
        source_url: "",
        poster_url: "",
        is_pinned: false,
      })
    }
  }, [editingContent, isEditorOpen, taskForm, announcementForm])

  const handleClose = () => {
    if (isSubmitting) return
    setIsEditorOpen(false)
    setEditingContent(null)
  }

  const handleSubmitContent = (status: "DRAFT" | "PUBLISHED") => {
    if (isSubmitting) return

    if (contentType === "task") {
      taskForm.handleSubmit(async (values) => {
        setSubmittingStatus(status)
        try {
          const payload = {
            course_id: values.course_id,
            title: values.title,
            instructions: values.instructions,
            due_date: new Date(values.due_date).toISOString(),
            submission_url: values.submission_url || undefined,
            status,
            created_by: currentUser.id,
          }

          if (editingContent && editingContent.type === "task") {
            await updateTask(editingContent.data.id, payload)
          } else {
            await addTask(payload)
          }
          setIsEditorOpen(false)
          setEditingContent(null)
        } catch {
          // Toast error ditampilkan oleh store; dialog tetap terbuka agar input tidak hilang
        } finally {
          setSubmittingStatus(null)
        }
      })()
    } else {
      announcementForm.handleSubmit(async (values) => {
        setSubmittingStatus(status)
        try {
          const payload = {
            category_type: values.category_type,
            course_id: values.course_id || undefined,
            title: values.title,
            content: values.content,
            event_date: values.event_date || undefined,
            source_url: values.source_url || undefined,
            poster_url: values.poster_url || null,
            is_pinned: Boolean(values.is_pinned),
            status,
            created_by: currentUser.id,
          }

          if (editingContent && editingContent.type === "announcement") {
            await updateAnnouncement(editingContent.data.id, payload)
          } else {
            await addAnnouncement(payload)
          }
          setIsEditorOpen(false)
          setEditingContent(null)
        } catch {
          // Toast error ditampilkan oleh store; dialog tetap terbuka agar input tidak hilang
        } finally {
          setSubmittingStatus(null)
        }
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
            Publisher: <strong className="text-[#111318]">{currentUser.full_name || currentUser.name}</strong>
          </SheetDescription>
        </SheetHeader>

        {!editingContent && (
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#EEF1F6] rounded-2xl border border-[#E4E7F0] mt-3">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => setSelectedType("task")}
              className={`min-h-[40px] rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-60 ${
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
              disabled={isSubmitting}
              onClick={() => setSelectedType("announcement")}
              className={`min-h-[40px] rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-60 ${
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

        <div className="mt-4 flex-1">
          {contentType === "task" ? (
            <TaskFormFields form={taskForm} courses={courses} />
          ) : (
            <AnnouncementFormFields form={announcementForm} courses={courses} />
          )}
        </div>

        <div className="mt-6 pt-3 border-t border-[#E4E7F0] grid grid-cols-2 gap-2.5">
          <Button
            type="button"
            variant="secondary"
            disabled={isSubmitting}
            onClick={() => handleSubmitContent("DRAFT")}
            className="min-h-[44px] rounded-full bg-[#EEF1F6] hover:bg-[#E4E7F0] text-[#111318] text-xs font-bold flex items-center justify-center gap-1.5 disabled:opacity-60"
          >
            {submittingStatus === "DRAFT" ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Bookmark className="w-3.5 h-3.5" />
            )}
            <span>{submittingStatus === "DRAFT" ? "Menyimpan..." : "Simpan Draft"}</span>
          </Button>

          <Button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSubmitContent("PUBLISHED")}
            className="min-h-[44px] rounded-full bg-[#111318] hover:bg-[#111318]/90 text-white text-xs font-bold shadow-sm flex items-center justify-center gap-1.5 disabled:opacity-60"
          >
            {submittingStatus === "PUBLISHED" ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            <span>{submittingStatus === "PUBLISHED" ? "Menerbitkan..." : "Terbitkan"}</span>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
