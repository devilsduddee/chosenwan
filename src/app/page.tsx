import React from "react"
import { LandingNavbar } from "@/components/landing/LandingNavbar"
import { LandingHero } from "@/components/landing/LandingHero"
import { LandingFeatures } from "@/components/landing/LandingFeatures"
import { LandingWorkflow } from "@/components/landing/LandingWorkflow"
import { LandingFooter } from "@/components/landing/LandingFooter"

export default function LandingPage() {
  return (
    <div className="min-h-dvh bg-[#F6F7FB] text-[#111318]">
      <LandingNavbar />
      <main>
        <LandingHero />
        <LandingFeatures />
        <LandingWorkflow />
      </main>
      <LandingFooter />
    </div>
  )
}
