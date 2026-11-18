import React from "react"

interface BrandLogoProps {
  className?: string
}

/**
 * Concept C: Bento Spark Portal logo mark (without class code text).
 */
export function BrandLogo({ className = "w-9 h-9" }: BrandLogoProps) {
  return (
    <div
      className={`${className} rounded-2xl bg-[#111318] p-1.5 flex items-center justify-center text-white shadow-xs shrink-0`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 256 256" className="w-full h-full" fill="none">
        <rect x="32" y="32" width="88" height="88" rx="28" fill="#FFFFFF" />
        <rect x="136" y="32" width="88" height="88" rx="44" fill="#F6C866" />
        <rect x="32" y="136" width="88" height="88" rx="44" fill="#A8C0FF" />
        <rect x="136" y="136" width="88" height="88" rx="28" fill="#EA9DFB" />
      </svg>
    </div>
  )
}
