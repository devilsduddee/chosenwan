import ImageKit from "imagekit"

let imagekitInstance: ImageKit | null = null

export function getImageKitClient(): ImageKit | null {
  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY
  const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT

  if (!publicKey || !privateKey || !urlEndpoint) {
    return null
  }

  if (!imagekitInstance) {
    imagekitInstance = new ImageKit({
      publicKey,
      privateKey,
      urlEndpoint,
    })
  }

  return imagekitInstance
}

/**
 * Mengunggah data gambar (bisa berupa base64 Data URL atau buffer) ke ImageKit.io CDN.
 */
export async function uploadPosterToImageKit(
  base64OrUrl: string,
  fileNamePrefix: string = "poster"
): Promise<{ url: string; fileId: string } | null> {
  const client = getImageKitClient()
  if (!client) return null

  // Jika sudah berupa URL eksternal biasa (http/https), tidak perlu re-upload
  if (base64OrUrl.startsWith("http://") || base64OrUrl.startsWith("https://")) {
    return { url: base64OrUrl, fileId: "" }
  }

  try {
    const uploadRes = await client.upload({
      file: base64OrUrl, // ImageKit menerima string base64 / data URL langsung
      fileName: `${fileNamePrefix}_${Date.now()}.jpg`,
      folder: "/chosenwan/posters",
      useUniqueFileName: true,
    })

    return {
      url: uploadRes.url,
      fileId: uploadRes.fileId,
    }
  } catch (err) {
    console.error("Gagal mengunggah poster ke ImageKit:", err)
    return null
  }
}

/**
 * Menghapus poster lama dari ImageKit untuk mencegah file yatim (orphan files).
 */
export async function deletePosterFromImageKit(fileId?: string | null): Promise<void> {
  if (!fileId) return
  const client = getImageKitClient()
  if (!client) return

  try {
    await client.deleteFile(fileId)
  } catch (err) {
    console.warn("Gagal menghapus file lama dari ImageKit:", err)
  }
}
