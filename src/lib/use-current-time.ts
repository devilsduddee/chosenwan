"use client"

import { useSyncExternalStore } from "react"

const emptySubscribe = () => () => {}

export function useCurrentTime() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )

  const now = useSyncExternalStore(
    emptySubscribe,
    () => Date.now(),
    () => 0
  )

  const currentDay = useSyncExternalStore(
    emptySubscribe,
    () => {
      const day = new Date().getDay()
      return day === 0 ? 1 : day > 6 ? 1 : day
    },
    () => 1
  )

  return { now, currentDay, mounted }
}
