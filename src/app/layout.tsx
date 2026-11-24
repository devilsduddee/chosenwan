import type { Metadata, Viewport } from "next"
import "./globals.css"
import { Plus_Jakarta_Sans } from "next/font/google"
import { cn } from "@/lib/utils"
import { MockStoreProvider } from "@/lib/mock-store"
import { PwaProvider } from "@/lib/pwa-context"
import { Toaster } from "@/components/ui/sonner"
import { PwaInstallModal } from "@/components/layout/PwaInstallModal"

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: "Chosenwan: Portal Informasi Kelas 3IA01",
  description: "Cek tugas kuliah, jadwal statis harian, dan pengumuman kampus kelas 3IA01 dengan cepat.",
  applicationName: "Chosenwan",
  authors: [{ name: "Chosenwan Team" }],
  generator: "Next.js",
  keywords: ["Chosenwan", "3IA01", "Gunadarma", "Jadwal Kuliah", "Tugas Kelas", "Portal Mahasiswa"],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Chosenwan",
  },
  formatDetection: {
    telephone: false,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F6F7FB" },
    { media: "(prefers-color-scheme: dark)", color: "#F6F7FB" },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={cn("font-sans antialiased", plusJakartaSans.variable)}>
      <body className="bg-[#F6F7FB] min-h-dvh text-[#111318]">
        <PwaProvider>
          <MockStoreProvider>
            {children}
            <PwaInstallModal />
            <Toaster position="top-center" richColors />
          </MockStoreProvider>
        </PwaProvider>
      </body>
    </html>
  )
}
