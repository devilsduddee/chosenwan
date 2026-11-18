"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginFormSchema, LoginFormValues } from "@/lib/validations"
import { MOCK_CREDENTIALS } from "@/lib/mock-data"
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
  KeyRound,
  LogOut,
  ShieldCheck,
  UserCheck,
} from "lucide-react"

export function LoginForm() {
  const router = useRouter()
  const { userRole, currentUser, loginPublisher, logoutPublisher, setActiveTab } = useMockStore()
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (values: LoginFormValues) => {
    setLoginError(null)
    const result = loginPublisher(values.email, values.password)
    if (!result.ok) {
      setLoginError(result.error || "Email atau kata sandi salah.")
      return
    }

    toast.success(`Selamat datang, ${result.user?.full_name}!`)
    router.push("/portal")
  }

  const handleQuickFill = (email: string, password: string) => {
    setLoginError(null)
    form.setValue("email", email, { shouldValidate: true })
    form.setValue("password", password, { shouldValidate: true })
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-5">
      {/* Top Navigation Back */}
      <div className="flex items-center justify-between">
        <Link
          href="/portal"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6E7485] hover:text-[#111318] transition-colors py-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Portal</span>
        </Link>

        <Link
          href="/"
          className="text-xs font-semibold text-[#6E7485] hover:text-[#111318] transition-colors py-1.5"
        >
          Beranda
        </Link>
      </div>

      {/* Main Login Bento Card */}
      <div className="bg-white rounded-[24px] p-6 sm:p-7 border border-[#E4E7F0] shadow-[0_12px_36px_rgba(17,19,24,0.05)] space-y-5">
        {/* Brand & Title */}
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <BrandLogo className="w-10 h-10" />
              <div>
                <p className="text-sm font-extrabold text-[#111318] leading-tight">Chosenwan</p>
                <p className="text-[11px] font-medium text-[#6E7485]">Portal Informasi Kelas</p>
              </div>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F6C866] text-[#111318] px-2.5 py-1 rounded-full">
              Mode Prototype
            </span>
          </div>

          <div className="space-y-1 pt-1">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#111318] tracking-tight">
              Masuk sebagai Publisher
            </h1>
            <p className="text-xs text-[#6E7485] leading-relaxed">
              Login khusus Ketua Kelas dan PJ Mata Kuliah untuk menambah tugas, pengumuman, atau
              jadwal kuliah.
            </p>
          </div>
        </div>

        {/* Already Logged In Notice */}
        {userRole !== "guest" && (
          <div className="bg-[#EEF1F6] rounded-[18px] p-4 border border-[#E4E7F0] space-y-3">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#4CD98B] shrink-0 mt-0.5" />
              <div className="space-y-0.5 text-xs">
                <p className="font-bold text-[#111318]">
                  Sesi aktif: {currentUser.full_name}
                </p>
                <p className="text-[#6E7485]">
                  Anda sedang masuk sebagai{" "}
                  <strong className="text-[#111318]">
                    {userRole === "ketua_kelas" ? "Ketua Kelas" : "PJ Matkul"}
                  </strong>
                  .
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                onClick={() => {
                  setActiveTab("publisher")
                  router.push("/portal")
                }}
                className="flex-1 min-h-[38px] rounded-full bg-[#111318] text-white text-xs font-bold hover:bg-[#111318]/90"
              >
                <span>Buka Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  logoutPublisher()
                  toast.info("Berhasil keluar ke akses publik mahasiswa")
                }}
                className="min-h-[38px] rounded-full border-[#E4E7F0] bg-white text-xs font-bold text-[#111318]"
              >
                <LogOut className="w-3.5 h-3.5 mr-1" />
                <span>Keluar</span>
              </Button>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {loginError && (
          <div
            role="alert"
            className="bg-[#F05252]/10 border border-[#F05252]/30 text-[#111318] rounded-[16px] p-3.5 flex items-start gap-2.5 text-xs"
          >
            <AlertCircle className="w-4 h-4 text-[#F05252] shrink-0 mt-0.5" />
            <span className="font-medium leading-relaxed">{loginError}</span>
          </div>
        )}

        {/* Email / Password Form */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-bold text-[#111318] block">
              Email Publisher
            </label>
            <Input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              autoCapitalize="none"
              autoCorrect="off"
              enterKeyHint="next"
              placeholder="nama@chosenwan.ac.id"
              {...form.register("email")}
              className="h-11 rounded-[14px] bg-[#F6F7FB] border-[#E4E7F0] text-sm text-[#111318] focus-visible:border-[#111318] focus-visible:ring-0"
            />
            {form.formState.errors.email && (
              <p className="text-[11px] font-medium text-[#F05252]">
                {form.formState.errors.email.message}
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
                placeholder="Minimal 6 karakter"
                {...form.register("password")}
                className="h-11 pr-10 rounded-[14px] bg-[#F6F7FB] border-[#E4E7F0] text-sm text-[#111318] focus-visible:border-[#111318] focus-visible:ring-0"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Sembunyikan kata sandi" : "Lihat kata sandi"}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 text-[#6E7485] hover:text-[#111318] cursor-pointer"
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
            className="w-full min-h-[46px] rounded-full bg-[#111318] hover:bg-[#111318]/90 text-white text-xs sm:text-sm font-bold shadow-xs cursor-pointer"
          >
            <span>Masuk ke Ruang Publisher</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </form>
      </div>

      {/* Prototype Quick-Fill Accounts Box */}
      <div className="bg-white rounded-[22px] p-5 border border-[#E4E7F0] shadow-2xs space-y-3">
        <div className="flex items-center gap-2">
          <KeyRound className="w-4 h-4 text-[#111318]" strokeWidth={2} />
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#111318]">
            Akun Uji Coba (Tanpa Database)
          </h2>
        </div>

        <p className="text-[11px] text-[#6E7485] leading-relaxed">
          Klik <strong>Isi Otomatis</strong> untuk langsung memasukkan email dan kata sandi ke form
          di atas. Data disimpan lokal di browser.
        </p>

        <div className="space-y-2.5">
          {MOCK_CREDENTIALS.map((cred) => (
            <div
              key={cred.role}
              className="rounded-[16px] bg-[#F6F7FB] border border-[#E4E7F0] p-3.5 flex items-center justify-between gap-3"
            >
              <div className="min-w-0 space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-[#111318] shrink-0" />
                  <span className="text-xs font-bold text-[#111318]">{cred.label}</span>
                </div>
                <p className="text-[11px] text-[#6E7485] truncate">
                  {cred.email} • <code className="text-[#111318] font-semibold">{cred.password}</code>
                </p>
                <p className="text-[10px] text-[#6E7485] line-clamp-1">{cred.description}</p>
              </div>

              <button
                type="button"
                onClick={() => handleQuickFill(cred.email, cred.password)}
                className="min-h-[34px] px-3 rounded-full bg-white border border-[#E4E7F0] hover:border-[#111318] text-[11px] font-bold text-[#111318] shrink-0 transition-colors cursor-pointer active:scale-95"
              >
                Isi Otomatis
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
