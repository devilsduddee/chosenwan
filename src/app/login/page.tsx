import React from "react"
import { LoginForm } from "@/components/auth/LoginForm"

export default function LoginPage() {
  return (
    <div className="min-h-dvh bg-[#F6F7FB] text-[#111318] flex flex-col justify-center px-4 py-8 sm:py-12 pt-[calc(2rem+env(safe-area-inset-top,0px))] pb-[calc(2rem+env(safe-area-inset-bottom,0px))]">
      <LoginForm />
    </div>
  )
}
