import { Task, Announcement, Course, Schedule, UserRole, UserProfile, ActiveTab } from "@/types"
import type { InitialPortalPayload } from "@/lib/actions/portal"

export interface LoginResult {
  ok: boolean
  error?: string
  user?: UserProfile
}

export interface PortalStoreContextType {
  // Navigation & Role / Auth
  activeTab: ActiveTab
  setActiveTab: (tab: ActiveTab) => void
  userRole: UserRole
  currentUser: UserProfile
  loginPublisher: (name: string, password: string) => Promise<LoginResult>
  logoutPublisher: () => Promise<void>
  canManageContent: (createdBy?: string) => boolean
  isTasksGated: boolean

  // Data & Network Status
  courses: Course[]
  tasks: Task[]
  announcements: Announcement[]
  schedules: Schedule[]
  isLoading: boolean
  hasError: boolean
  errorMessage: string | null
  refreshData: () => Promise<void>
  hydrateInitialData: (payload: InitialPortalPayload) => void

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
  setEditingContent: (
    content: { type: "task" | "announcement"; data: Task | Announcement } | null
  ) => void

  // Mutations
  addTask: (task: Omit<Task, "id" | "created_at">) => Promise<void>
  updateTask: (id: string, task: Partial<Task>) => Promise<void>
  deleteTask: (id: string) => Promise<void>

  addAnnouncement: (announcement: Omit<Announcement, "id" | "created_at">) => Promise<void>
  updateAnnouncement: (id: string, announcement: Partial<Announcement>) => Promise<void>
  deleteAnnouncement: (id: string) => Promise<void>
  togglePinAnnouncement: (id: string) => Promise<void>

  addSchedule: (schedule: Omit<Schedule, "id">) => Promise<void>
  updateSchedule: (id: string, schedule: Partial<Schedule>) => Promise<void>
  deleteSchedule: (id: string) => Promise<void>
}
