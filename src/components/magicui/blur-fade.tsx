"use client"

import React, { useRef } from "react"
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  type UseInViewOptions,
  type Variants,
} from "motion/react"

interface BlurFadeProps {
  children: React.ReactNode
  className?: string
  variant?: {
    hidden: { y: number }
    visible: { y: number }
  }
  duration?: number
  delay?: number
  offset?: number
  direction?: "up" | "down" | "left" | "right"
  inView?: boolean
  inViewMargin?: UseInViewOptions["margin"]
  blur?: string
}

export function BlurFade({
  children,
  className,
  variant,
  duration = 0.35,
  delay = 0,
  offset = 8,
  direction = "up",
  inView = true,
  inViewMargin = "-40px",
  blur = "4px",
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const shouldReduceMotion = useReducedMotion()
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin })
  const isInView = !inView || inViewResult

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  const defaultVariants: Variants = {
    hidden: {
      [direction === "left" || direction === "right" ? "x" : "y"]:
        direction === "right" || direction === "down" ? -offset : offset,
      opacity: 0,
      filter: `blur(${blur})`,
    },
    visible: {
      [direction === "left" || direction === "right" ? "x" : "y"]: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
  }

  const combinedVariants = variant ?? defaultVariants

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        exit="hidden"
        variants={combinedVariants}
        transition={{
          delay: 0.04 + delay,
          duration,
          ease: [0.23, 1, 0.32, 1],
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
