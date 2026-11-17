import type { Metadata, Viewport } from "next"
import "./globals.css"
import { Plus_Jakarta_Sans } from "next/font/google"
import { cn } from "@/lib/utils"
import { MockStoreProvider } from "@/lib/mock-store"
import { TopHeader } from "@/components/layout/TopHeader"
import { BottomNavigationBar } from "@/components/layout/BottomNavigationBar"
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
      <body className="bg-[#EEF1F6] min-h-screen text-[#111318]">
        <MockStoreProvider>
          {/* Mobile-first centered shell (max-w-md mx-auto) */}
          <div className="w-full max-w-md mx-auto min-h-screen bg-[#F6F7FB] flex flex-col relative shadow-[0_0_50px_rgba(0,0,0,0.06)] border-x border-[#E4E7F0]/80 pb-32">
            <TopHeader />
            <main className="flex-1 px-4 py-4">{children}</main>
            <BottomNavigationBar />
            <Toaster position="top-center" richColors />
          </div>
        </MockStoreProvider>
      </body>
    </html>
  )
}
