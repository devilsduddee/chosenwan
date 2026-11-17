# Brand Guidelines: Chosenwan

- **Brand:** Chosenwan
- **Versi:** 1.0 (Produksi)
- **Tanggal:** 2026-11-17
- **Arah Desain:** Playful Minimalist Bento — Konsep C ("Bento Spark Portal")

---

## 1. Filosofi & Makna Identitas

**Chosenwan** (*The Chosen One / Nomor Wahid*) adalah portal informasi terpusat yang dirancang untuk mengakhiri kekacauan pesan di grup chat kelas. 

Logo **Bento Spark Portal** tersusun atas empat modul kapsul geometris dengan sudut membulat empuk:
1. **Modul Kiri-Atas (Deep Jet Charcoal `#111318`):** Melambangkan pondasi utama dan ketegasan informasi akademik.
2. **Modul Kanan-Atas (Warm Honey Amber `#F6C866`):** Melambangkan kehangatan berita dan pengumuman kampus.
3. **Modul Kiri-Bawah (Periwinkle Cornflower `#A8C0FF`):** Melambangkan tugas kuliah yang terjadwal rapi.
4. **Modul Kanan-Bawah (Orchid Pastel Lilac `#EA9DFB`):** Melambangkan antusiasme peluang lomba dan prestasi.

Pertemuan di antara keempat modul tersebut membentuk ruang negatif siluet **Bintang 4-Arah (*Sparkle / Focus Point*)**, menandakan bahwa setiap informasi penting telah terkurasi dan terfokus di satu wadah.

---

## 2. Palet Warna Resmi

| Peran | Nama Warna | Hex Code | Penggunaan |
|---|---|---|---|
| **Primary Anchor** | Deep Jet Charcoal | `#111318` | Wordmark, modul utama, kartu tugas mendesak, tombol aksi primer. |
| **Canvas** | Crisp Canvas White | `#FFFFFF` | Latar kartu bento, modal, dan elemen kontras tinggi. |
| **Accent 1** | Warm Honey Amber | `#F6C866` | Modul berita kampus, penanda H-2/H-3 deadline. |
| **Accent 2** | Periwinkle Cornflower | `#A8C0FF` | Modul akademik & tugas kuliah, badge status. |
| **Accent 3** | Orchid Pastel Lilac | `#EA9DFB` | Modul info lomba dan peluang mahasiswa. |
| **Neutral Container** | Soft Pewter | `#EEF1F6` | Kolom input, latar ubin bento sekunder, tombol sekunder. |

> **Aturan Kontras:** Seluruh tipografi di atas blok warna pastel (`#A8C0FF`, `#F6C866`, `#EA9DFB`) wajib menggunakan `#111318`. Teks putih `#FFFFFF` hanya diperbolehkan di atas `#111318`.

---

## 3. Tipografi Wordmark

- **Font Family:** **Plus Jakarta Sans** (Google Fonts)
- **Bobot Wordmark:** ExtraBold (800), tracking `-1.5px`
- **Bobot Sub-label:** SemiBold (600), uppercase, tracking `+3px` (`PORTAL INFORMASI KELAS`)
- **Catatan Branding:** Sub-label identitas resmi tidak mencantumkan kode kelas spesifik (tanpa teks "IF-A") agar identitas bersifat universal dan profesional.

---

## 4. Struktur Master File

```text
branding/
├── chosenwan-symbol.svg                 # Simbol monokrom hitam (#111318)
├── chosenwan-symbol-color.svg           # Simbol varian multi-color brand
├── chosenwan-lockup-horizontal.svg      # Horizontal lockup monokrom
├── chosenwan-lockup-horizontal-color.svg# Horizontal lockup dengan simbol warna
├── chosenwan-lockup-stacked.svg         # Stacked/vertical lockup
├── export/
│   ├── chosenwan-symbol-app-icon.svg    # App icon master
│   ├── chosenwan-symbol-favicon.svg     # Favicon SVG
│   ├── chosenwan-symbol-black-*.png     # Raster PNG 32, 64, 128, 256, 512px
│   ├── chosenwan-symbol-white-*.png     # Raster PNG putih (reversed)
│   ├── apple-touch-icon.png             # iOS home screen icon (180x180)
│   ├── icon-192.png & icon-512.png      # Android & PWA icons
│   ├── favicon.ico                      # Multi-size browser favicon (16, 32, 48px)
│   └── site.webmanifest                 # Web app manifest standar
└── BRAND-GUIDELINES.md                  # Dokumen panduan ini
```

---

## 5. Area Aman & Batasan Penggunaan

1. **Clear Space:** Jarak aman di sekeliling logo minimal setara dengan radius 1 modul bento ($25\%$ tinggi simbol).
2. **Ukuran Minimal:**
   - Simbol mandiri: minimal `16 x 16 px` (keterbacaan telah teruji 100%).
   - Horizontal lockup: tinggi minimal `24 px` agar teks sub-label tetap terbaca.
3. **Larangan:**
   - Dilarang meregangkan (*stretch*) atau mengubah proporsi aspek rasio.
   - Dilarang mengganti warna modul di luar palet resmi Playful Bento.
   - Dilarang menambahkan efek glow neon, drop shadow tebal, atau ornamen blur di belakang logo.
