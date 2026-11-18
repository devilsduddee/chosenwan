"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useMockStore } from "@/lib/mock-store"
import { TaskList } from "@/components/tasks/TaskList"
import { AnnouncementList } from "@/components/info/AnnouncementList"
import { ScheduleTimeline } from "@/components/schedule/ScheduleTimeline"
import { PublisherDashboard } from "@/components/publisher/PublisherDashboard"
import { ContentEditorDialog } from "@/components/publisher/ContentEditorDialog"
import { ActiveTab } from "@/types"

export default function PortalPage() {
  const router = useRouter()
  const { activeTab, setActiveTab, userRole } = useMockStore()

  // Handle public tab shortcuts (?tab=tasks|info|schedule) and protect publisher tab
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const tabParam = params.get("tab") as ActiveTab | null

    if (tabParam === "publisher") {
      if (userRole === "guest") {
        router.replace("/login")
        return
      }
      setActiveTab("publisher")
    } else if (tabParam && ["tasks", "info", "schedule"].includes(tabParam)) {
      setActiveTab(tabParam)
    }
  }, [router, setActiveTab, userRole])

  // Auth Guard: prevent unauthenticated guest from viewing Publisher Dashboard
  useEffect(() => {
    if (activeTab === "publisher" && userRole === "guest") {
      router.replace("/login")
    }
  }, [activeTab, userRole, router])

  return (
    <>
      {activeTab === "tasks" && <TaskList />}
      {activeTab === "info" && <AnnouncementList />}
      {activeTab === "schedule" && <ScheduleTimeline />}
      {activeTab === "publisher" && userRole !== "guest" && <PublisherDashboard />}

      {/* Global Content Editor Modal */}
      <ContentEditorDialog />
    </>
  )
}
