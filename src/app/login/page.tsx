import React from "react"
import { LoginForm } from "@/components/auth/LoginForm"

export default function LoginPage() {
  return (
    <main className="min-h-dvh bg-[#F6F7FB] text-[#111318] flex flex-col px-4 pt-[calc(0.75rem+env(safe-area-inset-top,0px))] pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]">
      <LoginForm />
    </main>
  )
}
