"use client"

import { useLayoutEffect } from "react"
import { usePortalStore } from "@/lib/portal-store"
import type { InitialPortalPayload } from "@/lib/actions/portal"

export function PortalHydratorClient({ initialData }: { initialData: InitialPortalPayload }) {
  const { hydrateInitialData } = usePortalStore()

  useLayoutEffect(() => {
    hydrateInitialData(initialData)
  }, [initialData, hydrateInitialData])

  return null
}
