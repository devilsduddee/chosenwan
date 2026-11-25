"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { usePortalStore } from "@/lib/portal-store"
import { PortalStatusBanner } from "@/components/layout/PortalStatusBanner"
import { TaskList } from "@/components/tasks/TaskList"
import { AnnouncementList } from "@/components/info/AnnouncementList"
import { ScheduleTimeline } from "@/components/schedule/ScheduleTimeline"
import { PublisherDashboard } from "@/components/publisher/PublisherDashboard"
import { ContentEditorDialog } from "@/components/publisher/ContentEditorDialog"
import { ActiveTab } from "@/types"

export default function PortalPage() {
  const router = useRouter()
  const { activeTab, setActiveTab, userRole, isLoading, hasError } = usePortalStore()

  // Handle public tab shortcuts (?tab=tasks|info|schedule) and protect publisher tab
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const tabParam = params.get("tab") as ActiveTab | null

    if (tabParam === "publisher") {
      if (!isLoading && userRole === "guest") {
        router.replace("/login")
        return
      }
      if (userRole === "pj" || userRole === "ketua_kelas") {
        setActiveTab("publisher")
      }
    } else if (tabParam && ["tasks", "info", "schedule"].includes(tabParam)) {
      setActiveTab(tabParam)
    } else if (!tabParam) {
      if (userRole === "guest") {
        setActiveTab("schedule")
      } else {
        setActiveTab("tasks")
      }
    }
  }, [router, setActiveTab, userRole, isLoading])

  // Auth Guard: prevent unauthenticated guest or member from viewing Publisher Dashboard
  useEffect(() => {
    if (!isLoading && activeTab === "publisher" && userRole !== "pj" && userRole !== "ketua_kelas") {
      router.replace(userRole === "guest" ? "/login" : "/portal")
    }
  }, [activeTab, userRole, isLoading, router])

  return (
    <>
      <PortalStatusBanner />
      {!isLoading && !hasError && (
        <>
          {activeTab === "tasks" && <TaskList />}
          {activeTab === "info" && <AnnouncementList />}
          {activeTab === "schedule" && <ScheduleTimeline />}
          {activeTab === "publisher" && (userRole === "pj" || userRole === "ketua_kelas") && (
            <PublisherDashboard />
          )}
        </>
      )}

      {/* Global Content Editor Modal */}
      <ContentEditorDialog />
    </>
  )
}
