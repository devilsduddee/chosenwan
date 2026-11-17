"use client"

import React from "react"
import { useMockStore } from "@/lib/mock-store"
import { TaskList } from "@/components/tasks/TaskList"
import { AnnouncementList } from "@/components/info/AnnouncementList"
import { ScheduleTimeline } from "@/components/schedule/ScheduleTimeline"
import { PublisherDashboard } from "@/components/publisher/PublisherDashboard"
import { ContentEditorDialog } from "@/components/publisher/ContentEditorDialog"

export default function HomePage() {
  const { activeTab } = useMockStore()

  return (
    <>
      {activeTab === "tasks" && <TaskList />}
      {activeTab === "info" && <AnnouncementList />}
      {activeTab === "schedule" && <ScheduleTimeline />}
      {activeTab === "publisher" && <PublisherDashboard />}

      {/* Global Content Editor Modal */}
      <ContentEditorDialog />
    </>
  )
}
