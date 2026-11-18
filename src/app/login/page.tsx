import React from "react"
import { LoginForm } from "@/components/auth/LoginForm"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#F6F7FB] text-[#111318] flex flex-col justify-center px-4 py-8 sm:py-12">
      <LoginForm />
    </div>
  )
}
