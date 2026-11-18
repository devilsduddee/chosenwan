import React from "react"
import { TopHeader } from "@/components/layout/TopHeader"
import { BottomNavigationBar } from "@/components/layout/BottomNavigationBar"

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-[#F6F7FB] text-[#111318] flex flex-col">
      <TopHeader />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6 pb-[calc(7rem+env(safe-area-inset-bottom,0px))] md:pb-12">
        {children}
      </main>
      <BottomNavigationBar />
    </div>
  )
}
