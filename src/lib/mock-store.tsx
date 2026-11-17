"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { Task, Announcement, Course, Schedule, UserRole, UserProfile, ActiveTab } from "@/types"
import { MOCK_COURSES, MOCK_TASKS, MOCK_ANNOUNCEMENTS, MOCK_SCHEDULES, MOCK_USERS } from "@/lib/mock-data"

interface MockStoreContextType {
  // Navigation & Role
  activeTab: ActiveTab
  setActiveTab: (tab: ActiveTab) => void
  userRole: UserRole
  setUserRole: (role: UserRole) => void
  currentUser: UserProfile

  // Data
  courses: Course[]
  tasks: Task[]
  announcements: Announcement[]
  schedules: Schedule[]

  // Filtering & Search
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedCourseFilter: string
  setSelectedCourseFilter: (courseId: string) => void
  selectedCategoryFilter: string
  setSelectedCategoryFilter: (category: string) => void

  // Task Detail Sheet State
  selectedTaskForDetail: Task | null
  setSelectedTaskForDetail: (task: Task | null) => void

  // Dialog State
  isEditorOpen: boolean
  setIsEditorOpen: (open: boolean) => void
  editingContent: { type: "task" | "announcement"; data: Task | Announcement } | null
  setEditingContent: (content: { type: "task" | "announcement"; data: Task | Announcement } | null) => void

  // Mutations
  addTask: (task: Omit<Task, "id" | "created_at">) => void
  updateTask: (id: string, task: Partial<Task>) => void
  deleteTask: (id: string) => void

  addAnnouncement: (announcement: Omit<Announcement, "id" | "created_at">) => void
  updateAnnouncement: (id: string, announcement: Partial<Announcement>) => void
  deleteAnnouncement: (id: string) => void

  resetToDefaults: () => void
}

const MockStoreContext = createContext<MockStoreContextType | undefined>(undefined)

const STORAGE_KEY_TASKS = "chosenwan_mock_tasks"
const STORAGE_KEY_ANNOUNCEMENTS = "chosenwan_mock_announcements"
const STORAGE_KEY_ROLE = "chosenwan_mock_role"

export function MockStoreProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("tasks")
  const [userRole, setUserRole] = useState<UserRole>("guest")
  const [courses] = useState<Course[]>(MOCK_COURSES)
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS)
  const [announcements, setAnnouncements] = useState<Announcement[]>(MOCK_ANNOUNCEMENTS)
  const [schedules] = useState<Schedule[]>(MOCK_SCHEDULES)

  const isLoadedRef = React.useRef(false)

  // Hydrate from localStorage safely on client mount (prevents SSR mismatch)
  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem(STORAGE_KEY_TASKS)
      if (savedTasks) setTasks(JSON.parse(savedTasks))

      const savedAnnouncements = localStorage.getItem(STORAGE_KEY_ANNOUNCEMENTS)
      if (savedAnnouncements) setAnnouncements(JSON.parse(savedAnnouncements))

      const savedRole = localStorage.getItem(STORAGE_KEY_ROLE)
      if (savedRole === "guest" || savedRole === "ketua_kelas" || savedRole === "pj_matkul") {
        setUserRole(savedRole as UserRole)
      }
    } catch {}
    isLoadedRef.current = true
  }, [])

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCourseFilter, setSelectedCourseFilter] = useState("ALL")
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("ALL")

  const [selectedTaskForDetail, setSelectedTaskForDetail] = useState<Task | null>(null)
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [editingContent, setEditingContent] = useState<{
    type: "task" | "announcement"
    data: Task | Announcement
  } | null>(null)

  // Sync to LocalStorage on change (only after initial load)
  useEffect(() => {
    if (!isLoadedRef.current) return
    try {
      localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(tasks))
    } catch {}
  }, [tasks])

  useEffect(() => {
    if (!isLoadedRef.current) return
    try {
      localStorage.setItem(STORAGE_KEY_ANNOUNCEMENTS, JSON.stringify(announcements))
    } catch {}
  }, [announcements])

  const handleSetUserRole = (role: UserRole) => {
    setUserRole(role)
    try {
      localStorage.setItem(STORAGE_KEY_ROLE, role)
    } catch {}
    if (role === "guest" && activeTab === "publisher") {
      setActiveTab("tasks")
    }
  }

  const currentUser: UserProfile = MOCK_USERS[userRole] || MOCK_USERS.guest

  // Task Mutations
  const addTask = (newTaskData: Omit<Task, "id" | "created_at">) => {
    const courseObj = courses.find((c) => c.id === newTaskData.course_id)
    const newTask: Task = {
      ...newTaskData,
      id: `task_${Date.now()}`,
      created_at: new Date().toISOString(),
      course: courseObj,
    }
    setTasks((prev) => [newTask, ...prev])
  }

  const updateTask = (id: string, updatedFields: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const courseObj = updatedFields.course_id
            ? courses.find((c) => c.id === updatedFields.course_id)
            : t.course
          return {
            ...t,
            ...updatedFields,
            updated_at: new Date().toISOString(),
            course: courseObj,
          }
        }
        return t
      })
    )
  }

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
    if (selectedTaskForDetail?.id === id) {
      setSelectedTaskForDetail(null)
    }
  }

  // Announcement Mutations
  const addAnnouncement = (newAnnData: Omit<Announcement, "id" | "created_at">) => {
    const courseObj = newAnnData.course_id
      ? courses.find((c) => c.id === newAnnData.course_id)
      : undefined
    const newAnn: Announcement = {
      ...newAnnData,
      id: `ann_${Date.now()}`,
      created_at: new Date().toISOString(),
      course: courseObj,
    }
    setAnnouncements((prev) => [newAnn, ...prev])
  }

  const updateAnnouncement = (id: string, updatedFields: Partial<Announcement>) => {
    setAnnouncements((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const courseObj = updatedFields.course_id
            ? courses.find((c) => c.id === updatedFields.course_id)
            : a.course
          return {
            ...a,
            ...updatedFields,
            updated_at: new Date().toISOString(),
            course: courseObj,
          }
        }
        return a
      })
    )
  }

  const deleteAnnouncement = (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id))
  }

  const resetToDefaults = () => {
    setTasks(MOCK_TASKS)
    setAnnouncements(MOCK_ANNOUNCEMENTS)
    setUserRole("guest")
    try {
      localStorage.removeItem(STORAGE_KEY_TASKS)
      localStorage.removeItem(STORAGE_KEY_ANNOUNCEMENTS)
      localStorage.removeItem(STORAGE_KEY_ROLE)
    } catch {}
  }

  return (
    <MockStoreContext.Provider
      value={{
        activeTab,
        setActiveTab,
        userRole,
        setUserRole: handleSetUserRole,
        currentUser,
        courses,
        tasks,
        announcements,
        schedules,
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
