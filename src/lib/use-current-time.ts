"use client"

import { useState, useEffect } from "react"

export function useCurrentTime() {
  const [now, setNow] = useState<number>(0)
  const [currentDay, setCurrentDay] = useState<number>(1) // Default Senin (1)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const nowDate = new Date()
    setNow(nowDate.getTime())
    const day = nowDate.getDay()
    setCurrentDay(day === 0 ? 1 : day > 6 ? 1 : day)
    setMounted(true)
  }, [])

  return { now, currentDay, mounted }
}
