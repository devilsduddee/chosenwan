import type { Metadata, Viewport } from "next"
import "./globals.css"
import { Plus_Jakarta_Sans } from "next/font/google"
import { cn } from "@/lib/utils"
import { MockStoreProvider } from "@/lib/mock-store"
import { Toaster } from "@/components/ui/sonner"

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: "Chosenwan: Portal Informasi Kelas",
  description: "Cek tugas kuliah, jadwal statis harian, dan pengumuman kampus kelas pilot dengan cepat.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={cn("font-sans antialiased", plusJakartaSans.variable)}>
      <body className="bg-[#F6F7FB] min-h-screen text-[#111318]">
        <MockStoreProvider>
          {children}
          <Toaster position="top-center" richColors />
        </MockStoreProvider>
      </body>
    </html>
  )
}
