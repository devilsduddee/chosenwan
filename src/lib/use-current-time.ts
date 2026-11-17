"use client"

import { useSyncExternalStore } from "react"

const emptySubscribe = () => () => {}

// Module-level cached timestamp updated once every 60 seconds
let cachedTimestamp = typeof window !== "undefined" ? Date.now() : 0
const timeListeners = new Set<() => void>()

if (typeof window !== "undefined") {
  setInterval(() => {
    cachedTimestamp = Date.now()
    timeListeners.forEach((listener) => {
      try {
        listener()
      } catch {}
    })
  }, 60000)
}

function subscribeTime(callback: () => void) {
  timeListeners.add(callback)
  return () => {
    timeListeners.delete(callback)
  }
}

function getTimeSnapshot() {
  return cachedTimestamp
}

function getServerTimeSnapshot() {
  return 0
}

function getMountedSnapshot() {
  return true
}

function getServerMountedSnapshot() {
  return false
}

function getDaySnapshot() {
  if (typeof window === "undefined") return 1
  const d = new Date().getDay()
  return d === 0 ? 1 : d > 5 ? 1 : d
}

function getServerDaySnapshot() {
  return 1
}

export function useCurrentTime() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getMountedSnapshot,
    getServerMountedSnapshot
  )

  const now = useSyncExternalStore(
    subscribeTime,
    getTimeSnapshot,
    getServerTimeSnapshot
  )

  const currentDay = useSyncExternalStore(
    emptySubscribe,
    getDaySnapshot,
    getServerDaySnapshot
  )

  return { now, currentDay, mounted }
}
