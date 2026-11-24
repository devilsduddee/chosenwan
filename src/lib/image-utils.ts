const ALLOWED_MIME_TYPES = new Set(["image/png", "image/jpeg", "image/webp"])
const MAX_RAW_BYTES = 8 * 1024 * 1024 // 8 MB raw file guard
const MAX_POSTER_WIDTH = 900
const JPEG_QUALITY = 0.82

/**
 * Compresses and resizes an uploaded competition poster image in-browser
 * so it fits comfortably inside localStorage during prototyping.
 */
export async function compressPosterImage(file: File): Promise<string> {
  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    throw new Error("Format poster harus PNG, JPG, atau WebP.")
  }

  if (file.size > MAX_RAW_BYTES) {
    throw new Error("Ukuran file poster maksimal 8 MB.")
  }

  const dataUrl = await readFileAsDataUrl(file)
  const img = await loadImage(dataUrl)

  const scale = img.width > MAX_POSTER_WIDTH ? MAX_POSTER_WIDTH / img.width : 1
  const targetWidth = Math.max(1, Math.round(img.width * scale))
  const targetHeight = Math.max(1, Math.round(img.height * scale))

  const canvas = document.createElement("canvas")
  canvas.width = targetWidth
  canvas.height = targetHeight

  const ctx = canvas.getContext("2d")
  if (!ctx) {
    throw new Error("Gagal memproses gambar poster di browser.")
  }

  // Paint white backdrop for transparent PNGs when exporting compressed JPEG
  ctx.fillStyle = "#FFFFFF"
  ctx.fillRect(0, 0, targetWidth, targetHeight)
  ctx.drawImage(img, 0, 0, targetWidth, targetHeight)

  return canvas.toDataURL("image/jpeg", JPEG_QUALITY)
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result)
      } else {
        reject(new Error("Gagal membaca file gambar."))
      }
    }
    reader.onerror = () => reject(new Error("Gagal membaca file gambar."))
    reader.readAsDataURL(file)
  })
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error("File gambar rusak atau tidak didukung."))
    img.src = src
  })
}

function isPrivateOrReservedHost(hostname: string): boolean {
  const host = hostname.toLowerCase().trim()
  if (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "0.0.0.0" ||
    host === "::1" ||
    host === "169.254.169.254" ||
    host.endsWith(".local") ||
    host.endsWith(".internal") ||
    host.endsWith(".localhost")
  ) {
    return true
  }
  if (/^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(host)) return true
  if (/^192\.168\.\d{1,3}\.\d{1,3}$/.test(host)) return true
  if (/^169\.254\.\d{1,3}\.\d{1,3}$/.test(host)) return true
  if (/^172\.(1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3}$/.test(host)) return true
  return false
}

export function isSafePosterSrc(src?: string | null): boolean {
  if (!src) return false
  if (/^data:image\/(png|jpeg|jpg|webp);base64,[a-z0-9+/=]+$/i.test(src)) {
    return true
  }
  try {
    const parsed = new URL(src)
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return false
    if (isPrivateOrReservedHost(parsed.hostname)) return false
    return true
  } catch {
    return false
  }
}
