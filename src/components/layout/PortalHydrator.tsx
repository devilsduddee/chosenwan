import React from "react"
import { getInitialPortalData } from "@/lib/actions/portal"
import { PortalHydratorClient } from "@/components/layout/PortalHydratorClient"

export async function PortalHydrator() {
  const initialData = await getInitialPortalData()
  return <PortalHydratorClient initialData={initialData} />
}
