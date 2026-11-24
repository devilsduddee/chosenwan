export type UserRole = "guest" | "member" | "pj" | "ketua_kelas" | "pj_matkul"

export interface UserProfile {
  id: string
  name: string
  full_name?: string
  role: UserRole
}

export interface Course {
  id: string
  name: string
  lecturer?: string | null
  lecturer_name?: string | null
  code?: string
}

export type ContentStatus = "DRAFT" | "PUBLISHED"

export interface Task {
  id: string
  course_id: string
  id_course?: string
  created_by?: string
  id_acc?: string | null
  title: string
  instructions: string
  description?: string
  week_number?: number
  due_date: string // ISO string
  submission_url?: string | null
  status: ContentStatus
  created_at: string
  updated_at?: string
  course?: Course
}

export type AnnouncementCategory = "ACADEMIC" | "CAMPUS_NEWS" | "COMPETITION"

export interface Announcement {
  id: string
  course_id?: string | null
  id_course?: string | null
  created_by?: string
  id_acc?: string | null
  title: string
  category_type: AnnouncementCategory
  content: string
  source_url?: string | null
  poster_url?: string | null
  poster_file_id?: string | null
  is_pinned?: boolean
  event_date?: string
  status: ContentStatus
  created_at: string
  updated_at?: string
  course?: Course
}

export interface Schedule {
  id: string
  course_id: string
  id_course?: string
  updated_by?: string
  id_acc?: string | null
  day_of_week: number // 1 (Senin) - 6 (Sabtu)
  start_time: string // HH:mm
  end_time: string // HH:mm
  room: string
  lecturer_name?: string
  course?: Course
}

export type ActiveTab = "tasks" | "info" | "schedule" | "publisher"

export type TaskStatusFilter = "ALL" | "URGENT" | "UPCOMING" | "PAST"
