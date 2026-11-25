"use client"

import React, { useEffect, useState, useCallback } from "react"
import { usePortalStore } from "@/lib/portal-store"
import {
  listClassAccountsAction,
  upsertCourseAction,
  createClassAccountAction,
  resetClassAccountPasswordAction,
} from "@/lib/actions/admin"
import { Course } from "@/types"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { BookOpen, KeyRound, Loader2, Plus, Users, Edit3 } from "lucide-react"

interface AccountRow {
  id: string
  name: string
  role: "member" | "pj" | "ketua_kelas"
  createdAt: string
}

interface AdminManageSheetProps {
  isOpen: boolean
  onClose: () => void
}

export function AdminManageSheet({ isOpen, onClose }: AdminManageSheetProps) {
  const { courses, refreshData } = usePortalStore()
  const [tab, setTab] = useState<"courses" | "accounts">("courses")
  const [accounts, setAccounts] = useState<AccountRow[]>([])
  const [loadingAccounts, setLoadingAccounts] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Course state
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [courseName, setCourseName] = useState("")
  const [courseLecturer, setCourseLecturer] = useState("")

  // Account state
  const [newUsername, setNewUsername] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [newRole, setNewRole] = useState<"member" | "pj">("member")
  const [resetTargetId, setResetTargetId] = useState<string | null>(null)
  const [resetPasswordVal, setResetPasswordVal] = useState("")

  const loadAccounts = useCallback(async () => {
    setLoadingAccounts(true)
    try {
      const list = await listClassAccountsAction()
      setAccounts(list)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal memuat daftar akun.")
    } finally {
      setLoadingAccounts(false)
    }
  }, [])

  useEffect(() => {
    if (isOpen && tab === "accounts") {
      loadAccounts()
    }
  }, [isOpen, tab, loadAccounts])

  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    try {
      await upsertCourseAction({
        id: editingCourse?.id,
        name: courseName,
        lecturer: courseLecturer,
      })
      toast.success(editingCourse ? "Mata kuliah diperbarui" : "Mata kuliah ditambahkan")
      setEditingCourse(null)
      setCourseName("")
      setCourseLecturer("")
      await refreshData()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal menyimpan mata kuliah")
    } finally {
      setSubmitting(false)
    }
  }

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    try {
      await createClassAccountAction({
        name: newUsername,
        password: newPassword,
        role: newRole,
      })
      toast.success(`Akun ${newUsername} berhasil dibuat`)
      setNewUsername("")
      setNewPassword("")
      await loadAccounts()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal membuat akun")
    } finally {
      setSubmitting(false)
    }
  }

  const handleResetPassword = async (accountId: string) => {
    if (submitting) return
    setSubmitting(true)
    try {
      const updated = await resetClassAccountPasswordAction({
        accountId,
        newPassword: resetPasswordVal,
      })
      toast.success(`Kata sandi ${updated.name} berhasil direset`)
      setResetTargetId(null)
      setResetPasswordVal("")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal mereset kata sandi")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="bottom"
        className="w-full sm:max-w-lg mx-auto rounded-t-[24px] sm:rounded-[24px] sm:mb-4 p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] max-h-[90dvh] overflow-y-auto overscroll-contain bg-white border border-[#E4E7F0] shadow-2xl"
      >
        <SheetHeader className="text-left space-y-1">
          <SheetTitle className="text-lg font-extrabold text-[#111318]">
            Kelola Matkul & Akun Kelas
          </SheetTitle>
          <SheetDescription className="text-xs text-[#6E7485]">
            Khusus Ketua Kelas: tambah atau ubah master mata kuliah serta atur akun anggota.
          </SheetDescription>
        </SheetHeader>

        {/* Tabs */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#EEF1F6] rounded-2xl border border-[#E4E7F0] mt-4">
          <button
            type="button"
            onClick={() => setTab("courses")}
            className={`min-h-[44px] rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
              tab === "courses" ? "bg-[#111318] text-white shadow-xs" : "text-[#6E7485]"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Mata Kuliah ({courses.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setTab("accounts")}
            className={`min-h-[44px] rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
              tab === "accounts" ? "bg-[#111318] text-white shadow-xs" : "text-[#6E7485]"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Akun Kelas</span>
          </button>
        </div>

        {tab === "courses" ? (
          <div className="mt-4 space-y-4">
            <form onSubmit={handleSaveCourse} className="space-y-2.5 bg-[#F6F7FB] p-3.5 rounded-2xl border border-[#E4E7F0]">
              <p className="text-xs font-bold text-[#111318]">
                {editingCourse ? `Edit: ${editingCourse.name}` : "Tambah Mata Kuliah Baru"}
              </p>
              <Input
                placeholder="Nama mata kuliah (misal: Pemrograman Web)"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                required
                className="h-11 rounded-xl bg-white border-[#E4E7F0] text-base sm:text-xs"
              />
              <Input
                placeholder="Nama dosen pengampu (opsional)"
                value={courseLecturer}
                onChange={(e) => setCourseLecturer(e.target.value)}
                className="h-11 rounded-xl bg-white border-[#E4E7F0] text-base sm:text-xs"
              />
              <div className="flex gap-2">
                {editingCourse && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setEditingCourse(null)
                      setCourseName("")
                      setCourseLecturer("")
                    }}
                    className="min-h-[44px] rounded-full text-xs font-bold"
                  >
                    Batal
                  </Button>
                )}
                <Button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 min-h-[44px] rounded-full bg-[#111318] text-white text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                  <span>{editingCourse ? "Simpan Perubahan" : "Tambah Mata Kuliah"}</span>
                </Button>
              </div>
            </form>

            <div className="space-y-2">
              {courses.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between gap-2 p-3 rounded-2xl border border-[#E4E7F0] bg-white"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#111318] truncate">
                      {c.code} · {c.name}
                    </p>
                    <p className="text-[11px] text-[#6E7485] truncate">
                      {c.lecturer_name || "Dosen belum diatur"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingCourse(c)
                      setCourseName(c.name)
                      setCourseLecturer(c.lecturer_name || "")
                    }}
                    aria-label={`Edit ${c.name}`}
                    className="w-11 h-11 rounded-xl text-[#6E7485] hover:text-[#111318] hover:bg-[#EEF1F6] flex items-center justify-center shrink-0 cursor-pointer"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            <form onSubmit={handleCreateAccount} className="space-y-2.5 bg-[#F6F7FB] p-3.5 rounded-2xl border border-[#E4E7F0]">
              <p className="text-xs font-bold text-[#111318]">Buat Akun Anggota / PJ</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Input
                  placeholder="Username (misal: andi)"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  required
                  className="h-11 rounded-xl bg-white border-[#E4E7F0] text-base sm:text-xs"
                />
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as "member" | "pj")}
                  className="h-11 px-3 rounded-xl bg-white border border-[#E4E7F0] text-sm sm:text-xs font-semibold text-[#111318]"
                >
                  <option value="member">Anggota Kelas (Read-Only)</option>
                  <option value="pj">PJ Matkul (Publisher)</option>
                </select>
              </div>
              <Input
                type="password"
                placeholder="Kata sandi awal (minimal 6 karakter)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="h-11 rounded-xl bg-white border-[#E4E7F0] text-base sm:text-xs"
              />
              <Button
                type="submit"
                disabled={submitting}
                className="w-full min-h-[44px] rounded-full bg-[#111318] text-white text-xs font-bold flex items-center justify-center gap-1.5"
              >
                {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                <span>Buat Akun</span>
              </Button>
            </form>

            {loadingAccounts ? (
              <p className="text-xs text-[#6E7485] text-center py-4">Memuat daftar akun...</p>
            ) : (
              <div className="space-y-2">
                {accounts.map((acc) => (
                  <div key={acc.id} className="p-3 rounded-2xl border border-[#E4E7F0] bg-white space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-[#111318] truncate">{acc.name}</p>
                        <p className="text-[11px] text-[#6E7485] uppercase font-semibold">
                          {acc.role === "ketua_kelas"
                            ? "Ketua Kelas"
                            : acc.role === "pj"
                            ? "PJ Matkul"
                            : "Anggota"}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setResetTargetId(resetTargetId === acc.id ? null : acc.id)
                          setResetPasswordVal("")
                        }}
                        className="min-h-[44px] px-3 rounded-full bg-[#EEF1F6] hover:bg-[#E4E7F0] text-[#111318] text-[11px] font-bold inline-flex items-center gap-1 shrink-0 cursor-pointer"
                      >
                        <KeyRound className="w-3.5 h-3.5" />
                        <span>Reset Sandi</span>
                      </button>
                    </div>

                    {resetTargetId === acc.id && (
                      <div className="flex items-center gap-2 pt-1">
                        <Input
                          type="password"
                          placeholder="Kata sandi baru (min 6 karakter)"
                          value={resetPasswordVal}
                          onChange={(e) => setResetPasswordVal(e.target.value)}
                          className="h-11 rounded-xl bg-[#F6F7FB] border-[#E4E7F0] text-base sm:text-xs"
                        />
                        <Button
                          type="button"
                          disabled={submitting || resetPasswordVal.length < 6}
                          onClick={() => handleResetPassword(acc.id)}
                          className="min-h-[44px] px-4 rounded-full bg-[#111318] text-white text-xs font-bold shrink-0"
                        >
                          Simpan
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
