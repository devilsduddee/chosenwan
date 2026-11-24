"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"
import { Task, Announcement, Course, Schedule, UserRole, UserProfile, ActiveTab } from "@/types"
import { MockStoreContextType, LoginResult } from "@/types/store"
import { loginAction, logoutAction } from "@/lib/actions/auth"
import { getInitialPortalData } from "@/lib/actions/portal"
import { createTaskAction, updateTaskAction, deleteTaskAction } from "@/lib/actions/tasks"
import {
  createEventAction,
  updateEventAction,
  deleteEventAction,
  togglePinEventAction,
} from "@/lib/actions/events"
import {
  createScheduleAction,
  updateScheduleAction,
  deleteScheduleAction,
} from "@/lib/actions/schedules"
import { toast } from "sonner"

const MockStoreContext = createContext<MockStoreContextType | undefined>(undefined)

export function MockStoreProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("schedule")
  const [userRole, setUserRole] = useState<UserRole>("guest")
  const [currentUser, setCurrentUser] = useState<UserProfile>({
    id: "guest-user",
    name: "Pengunjung",
    role: "guest",
  })

  const [courses, setCourses] = useState<Course[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [isTasksGated, setIsTasksGated] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCourseFilter, setSelectedCourseFilter] = useState("ALL")
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("ALL")

  // Sheet & Dialog states
  const [selectedTaskForDetail, setSelectedTaskForDetail] = useState<Task | null>(null)
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [editingContent, setEditingContent] = useState<{
    type: "task" | "announcement"
    data: Task | Announcement
  } | null>(null)

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await getInitialPortalData()
      setCourses(data.courses)
      setSchedules(data.schedules)
      setAnnouncements(data.announcements)
      setTasks(data.tasks)
      setIsTasksGated(data.isTasksGated)
      setCurrentUser(data.currentUser)
      setUserRole(data.currentUser.role)
      if (data.currentUser.role !== "guest") {
        const tabParam =
          typeof window !== "undefined"
            ? new URLSearchParams(window.location.search).get("tab")
            : null
        if (!tabParam) {
          setActiveTab("tasks")
        }
      }
    } catch (err) {
      console.error("Gagal memuat data portal:", err)
      toast.error("Gagal memuat data dari database.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const canManageContent = (createdBy?: string) => {
    if (userRole === "guest" || userRole === "member") return false
    if (userRole === "ketua_kelas") return true
    if (userRole === "pj" || userRole === "pj_matkul") {
      return !createdBy || createdBy === currentUser.id
    }
    return false
  }

  // Auth Handlers
  const loginPublisher = async (name: string, password: string): Promise<LoginResult> => {
    try {
      const result = await loginAction(name, password)
      if (result.ok && result.user) {
        setCurrentUser(result.user)
        setUserRole(result.user.role)
        await loadData()
        return { ok: true, user: result.user }
      }
      return { ok: false, error: result.error || "Login gagal." }
    } catch (err) {
      return {
        ok: false,
        error: err instanceof Error ? err.message : "Terjadi kesalahan koneksi.",
      }
    }
  }

  const logoutPublisher = async () => {
    try {
      await logoutAction()
      setCurrentUser({ id: "guest-user", name: "Pengunjung", role: "guest" })
      setUserRole("guest")
      setActiveTab("tasks")
      await loadData()
      toast.success("Berhasil keluar.")
    } catch (err) {
      console.error("Logout error:", err)
    }
  }

  // Mutations
  const addTask = async (task: Omit<Task, "id" | "created_at">) => {
    try {
      await createTaskAction({
        course_id: task.course_id,
        title: task.title,
        instructions: task.instructions,
        due_date: task.due_date,
        submission_url: task.submission_url,
        status: task.status,
      })
      await loadData()
      toast.success(
        task.status === "DRAFT" ? "Draft tugas tersimpan" : "Tugas berhasil diterbitkan!"
      )
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal menambah tugas")
      throw err
    }
  }

  const updateTask = async (id: string, partial: Partial<Task>) => {
    try {
      await updateTaskAction(id, {
        course_id: partial.course_id,
        title: partial.title,
        instructions: partial.instructions,
        due_date: partial.due_date,
        submission_url: partial.submission_url,
        status: partial.status,
      })
      await loadData()
      toast.success("Tugas berhasil diperbarui")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal memperbarui tugas")
      throw err
    }
  }

  const deleteTask = async (id: string) => {
    try {
      await deleteTaskAction(id)
      await loadData()
      toast.success("Tugas berhasil dihapus")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal menghapus tugas")
      throw err
    }
  }

  const addAnnouncement = async (announcement: Omit<Announcement, "id" | "created_at">) => {
    try {
      await createEventAction({
        category: announcement.category_type,
        title: announcement.title,
        content: announcement.content,
        course_id: announcement.course_id,
        source_url: announcement.source_url,
        poster_url: announcement.poster_url,
        poster_file_id: announcement.poster_file_id,
        is_pinned: announcement.is_pinned,
        status: announcement.status,
      })
      await loadData()
      toast.success(
        announcement.status === "DRAFT"
          ? "Draft pengumuman tersimpan"
          : "Pengumuman berhasil diterbitkan!"
      )
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal menambah pengumuman")
      throw err
    }
  }

  const updateAnnouncement = async (id: string, partial: Partial<Announcement>) => {
    try {
      await updateEventAction(id, {
        category: partial.category_type,
        title: partial.title,
        content: partial.content,
        course_id: partial.course_id,
        source_url: partial.source_url,
        poster_url: partial.poster_url,
        poster_file_id: partial.poster_file_id,
        is_pinned: partial.is_pinned,
        status: partial.status,
      })
      await loadData()
      toast.success("Pengumuman berhasil diperbarui")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal memperbarui pengumuman")
      throw err
    }
  }

  const togglePinAnnouncement = async (id: string) => {
    try {
      const updated = await togglePinEventAction(id)
      await loadData()
      toast.success(
        updated.isPinned
          ? "Pengumuman disematkan di paling atas!"
          : "Sematan pengumuman dilepas."
      )
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal mengubah status sematan")
      throw err
    }
  }

  const deleteAnnouncement = async (id: string) => {
    try {
      await deleteEventAction(id)
      await loadData()
      toast.success("Pengumuman berhasil dihapus")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal menghapus pengumuman")
      throw err
    }
  }

  const addSchedule = async (schedule: Omit<Schedule, "id">) => {
    try {
      if (
        !schedule.course_id ||
        schedule.day_of_week === undefined ||
        !schedule.start_time ||
        !schedule.end_time ||
        !schedule.room
      ) {
        throw new Error("Data jadwal tidak lengkap.")
      }
      await createScheduleAction({
        course_id: schedule.course_id,
        day_of_week: schedule.day_of_week,
        start_time: schedule.start_time,
        end_time: schedule.end_time,
        room: schedule.room,
      })
      await loadData()
      toast.success("Slot jadwal berhasil ditambahkan")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal menambah jadwal")
      throw err
    }
  }

  const updateSchedule = async (id: string, partial: Partial<Schedule>) => {
    try {
      if (
        !partial.course_id ||
        partial.day_of_week === undefined ||
        !partial.start_time ||
        !partial.end_time ||
        !partial.room
      ) {
        throw new Error("Data jadwal tidak lengkap.")
      }
      await updateScheduleAction(id, {
        course_id: partial.course_id,
        day_of_week: partial.day_of_week,
        start_time: partial.start_time,
        end_time: partial.end_time,
        room: partial.room,
      })
      await loadData()
      toast.success("Jadwal kuliah berhasil diperbarui")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal memperbarui jadwal")
      throw err
    }
  }

  const deleteSchedule = async (id: string) => {
    try {
      await deleteScheduleAction(id)
      await loadData()
      toast.success("Slot jadwal berhasil dihapus")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal menghapus jadwal")
      throw err
    }
  }

  const resetToDefaults = () => {
    loadData()
  }

  return (
    <MockStoreContext.Provider
      value={{
        activeTab,
        setActiveTab,
        userRole,
        currentUser,
        loginPublisher,
        logoutPublisher,
        canManageContent,
        isTasksGated,
        courses,
        tasks,
        announcements,
        schedules,
        isLoading,
        refreshData: loadData,
        searchQuery,
        setSearchQuery,
        selectedCourseFilter,
        setSelectedCourseFilter,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        selectedTaskForDetail,
        setSelectedTaskForDetail,
        isEditorOpen,
        setIsEditorOpen,
        editingContent,
        setEditingContent,
        addTask,
        updateTask,
        deleteTask,
        addAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
        togglePinAnnouncement,
        addSchedule,
        updateSchedule,
        deleteSchedule,
        resetToDefaults,
      }}
    >
      {children}
    </MockStoreContext.Provider>
  )
}

export function useMockStore() {
  const context = useContext(MockStoreContext)
  if (!context) {
    throw new Error("useMockStore must be used within a MockStoreProvider")
  }
  return context
}
