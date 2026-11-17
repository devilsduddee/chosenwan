export type UserRole = "guest" | "pj_matkul" | "ketua_kelas"

export interface UserProfile {
  id: string
  email: string
  full_name: string
  role: UserRole
}

export interface Course {
  id: string
  code: string
  name: string
  lecturer_name: string
}

export type ContentStatus = "DRAFT" | "PUBLISHED"

export interface Task {
  id: string
  course_id: string
  created_by: string
  title: string
  instructions: string
  week_number?: number
  due_date: string // ISO string
  submission_url?: string
  status: ContentStatus
  created_at: string
  updated_at?: string
  course?: Course
}

export type AnnouncementCategory = "ACADEMIC" | "CAMPUS_NEWS" | "COMPETITION"

export interface Announcement {
  id: string
  course_id?: string | null
  created_by: string
  title: string
  category_type: AnnouncementCategory
  content: string
  source_url?: string | null
  status: ContentStatus
  created_at: string
  updated_at?: string
  course?: Course
}

export interface Schedule {
  id: string
  course_id: string
  updated_by: string
  day_of_week: number // 1 (Senin) - 6 (Sabtu)
  start_time: string // HH:mm
  end_time: string // HH:mm
  room: string
  lecturer_name?: string
  course?: Course
}

export type ActiveTab = "tasks" | "info" | "schedule" | "publisher"
