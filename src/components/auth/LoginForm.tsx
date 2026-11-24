"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginFormSchema, LoginFormValues } from "@/lib/validations"
import { useMockStore } from "@/lib/mock-store"
import { BrandLogo } from "@/components/layout/BrandLogo"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Home,
  LogOut,
  ShieldCheck,
  UserCheck,
} from "lucide-react"

const SEED_ACCOUNTS = [
  { name: "ketua", label: "Ketua Kelas", pass: "ketua123", desc: "Moderator Penuh" },
  { name: "pj", label: "PJ Matkul", pass: "pj12345", desc: "Editor Tugas & Info" },
  { name: "member", label: "Anggota Kelas", pass: "member123", desc: "Lihat Tugas Privat" },
]

export function LoginForm() {
  const router = useRouter()
  const { userRole, currentUser, loginPublisher, logoutPublisher, setActiveTab } = useMockStore()
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      name: "",
      password: "",
    },
  })

  const currentName = useWatch({ control: form.control, name: "name" })

  const onSubmit = async (values: LoginFormValues) => {
    setLoginError(null)
    setIsSubmitting(true)
    try {
      const result = await loginPublisher(values.name, values.password)
      if (!result.ok) {
        setLoginError(result.error || "Nama pengguna atau kata sandi salah.")
        return
      }

      toast.success(`Selamat datang, ${result.user?.name}!`)
      if (result.user?.role === "ketua_kelas" || result.user?.role === "pj") {
        setActiveTab("publisher")
      } else {
        setActiveTab("tasks")
      }
      router.push("/portal")
    } catch {
      setLoginError("Terjadi kesalahan saat masuk.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleQuickFill = (name: string, password: string) => {
    setLoginError(null)
    form.setValue("name", name, { shouldValidate: true })
    form.setValue("password", password, { shouldValidate: true })
  }

  return (
    <div className="my-auto w-full max-w-[420px] mx-auto py-2 space-y-3">
      {/* Top Navigation */}
      <div className="flex items-center justify-between gap-2">
        <Link
          href="/portal"
          className="min-h-[44px] px-4 rounded-full bg-white hover:bg-[#EEF1F6] border border-[#E4E7F0] shadow-2xs inline-flex items-center gap-1.5 text-xs font-bold text-[#111318] active:scale-[0.97] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111318]"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#6E7485] shrink-0" strokeWidth={2} />
          <span>Kembali ke Portal</span>
        </Link>

        <Link
          href="/"
          className="min-h-[44px] px-4 rounded-full bg-white hover:bg-[#EEF1F6] border border-[#E4E7F0] shadow-2xs inline-flex items-center gap-1.5 text-xs font-bold text-[#6E7485] hover:text-[#111318] active:scale-[0.97] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111318]"
        >
          <Home className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} />
          <span>Beranda</span>
        </Link>
      </div>

      {/* Main Login Bento Card */}
      <div className="bg-white rounded-[24px] p-5 sm:p-7 border border-[#E4E7F0] shadow-[0_12px_36px_rgba(17,19,24,0.05)] space-y-5">
        {/* Compact Header */}
        <div className="flex items-center gap-3">
          <BrandLogo className="w-11 h-11" />
          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl font-extrabold text-[#111318] tracking-tight leading-tight">
              Masuk Akun Kelas
            </h1>
            <p className="text-xs text-[#6E7485] mt-0.5">
              Khusus Anggota Kelas, PJ, dan Ketua Kelas.
            </p>
          </div>
        </div>

        {/* Already Logged In Notice */}
        {userRole !== "guest" && (
          <div className="bg-[#EEF1F6] rounded-[18px] p-3.5 border border-[#E4E7F0] space-y-3">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#4CD98B] shrink-0 mt-0.5" />
              <div className="space-y-0.5 text-xs">
                <p className="font-bold text-[#111318]">Sesi aktif: {currentUser.name}</p>
                <p className="text-[#6E7485]">
                  Masuk sebagai{" "}
                  <strong className="text-[#111318]">
                    {userRole === "ketua_kelas"
                      ? "Ketua Kelas"
                      : userRole === "pj" || userRole === "pj_matkul"
                      ? "PJ Matkul"
                      : "Anggota Kelas"}
                  </strong>
                  .
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                onClick={() => {
                  if (userRole === "ketua_kelas" || userRole === "pj" || userRole === "pj_matkul") {
                    setActiveTab("publisher")
                  } else {
                    setActiveTab("tasks")
                  }
                  router.push("/portal")
                }}
                className="flex-1 min-h-[44px] rounded-full bg-[#111318] text-white text-xs font-bold hover:bg-[#111318]/90 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Buka Portal</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={async () => {
                  await logoutPublisher()
                }}
                className="min-h-[44px] px-4 rounded-full border-[#E4E7F0] bg-white text-xs font-bold text-[#111318] active:scale-[0.98] transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5 mr-1.5" />
                <span>Keluar</span>
              </Button>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {loginError && (
          <div
            role="alert"
            aria-live="polite"
            className="bg-[#F05252]/10 border border-[#F05252]/30 text-[#111318] rounded-[16px] p-3.5 flex items-start gap-2.5 text-xs"
          >
            <AlertCircle className="w-4 h-4 text-[#F05252] shrink-0 mt-0.5" />
            <span className="font-medium leading-relaxed">{loginError}</span>
          </div>
        )}

        {/* Username / Password Form */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-xs font-bold text-[#111318] block">
              Nama Pengguna (Username)
            </label>
            <Input
              id="name"
              type="text"
              autoComplete="username"
              autoCapitalize="none"
              autoCorrect="off"
              enterKeyHint="next"
              placeholder="Contoh: ketua, pj, atau member"
              {...form.register("name")}
              className="h-12 px-3.5 rounded-[14px] bg-[#F6F7FB] border-[#E4E7F0] text-base sm:text-sm text-[#111318] focus-visible:border-[#111318] focus-visible:ring-0"
            />
            {form.formState.errors.name && (
              <p className="text-[11px] font-medium text-[#F05252]">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="text-xs font-bold text-[#111318] block">
              Kata Sandi
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                autoCapitalize="none"
                autoCorrect="off"
                enterKeyHint="go"
                placeholder="Masukkan kata sandi"
                {...form.register("password")}
                className="h-12 pl-3.5 pr-12 rounded-[14px] bg-[#F6F7FB] border-[#E4E7F0] text-base sm:text-sm text-[#111318] focus-visible:border-[#111318] focus-visible:ring-0"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Sembunyikan kata sandi" : "Lihat kata sandi"}
                className="absolute right-0.5 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-xl text-[#6E7485] hover:text-[#111318] active:scale-95 transition-all cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {form.formState.errors.password && (
              <p className="text-[11px] font-medium text-[#F05252]">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full min-h-[48px] rounded-full bg-[#111318] hover:bg-[#111318]/90 text-white text-sm font-bold shadow-xs active:scale-[0.98] transition-all cursor-pointer disabled:opacity-60"
          >
            <span>{isSubmitting ? "Memverifikasi..." : "Masuk"}</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </form>

        {/* Quick Fill Database Seed Accounts */}
        <div className="pt-4 border-t border-[#E4E7F0]/80 space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold text-[#6E7485]">
              Akun Resmi Database (Pilih Cepat)
            </span>
            <span className="text-[10px] font-semibold text-[#6E7485]">Tap untuk isi</span>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {SEED_ACCOUNTS.map((acc) => {
              const isSelected = currentName?.trim().toLowerCase() === acc.name.toLowerCase()
              return (
                <button
                  key={acc.name}
                  type="button"
                  onClick={() => handleQuickFill(acc.name, acc.pass)}
                  className={`p-2.5 rounded-[16px] border text-left flex flex-col justify-center gap-0.5 transition-all active:scale-[0.97] cursor-pointer ${
                    isSelected
                      ? "bg-[#EEF1F6] border-[#111318] shadow-2xs"
                      : "bg-[#F6F7FB] border-[#E4E7F0] hover:border-[#111318]/40"
                  }`}
                >
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#111318]">
                    <UserCheck className="w-3 h-3 shrink-0" strokeWidth={2} />
                    <span className="truncate">{acc.label}</span>
                  </span>
                  <span className="text-[9px] text-[#6E7485] truncate w-full">
                    {acc.name}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
