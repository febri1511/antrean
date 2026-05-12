# CineMatch - Sistem Rekomendasi Film Sederhana

## Proyek Akhir Mata Kuliah Struktur Data dan Algoritma

---

## Daftar Isi

1. [Pendahuluan](#1-pendahuluan)
2. [Masalah yang Diselesaikan](#2-masalah-yang-diselesaikan)
3. [Pertanyaan Penelitian](#3-pertanyaan-penelitian)
4. [Overview Sistem](#4-overview-sistem)
5. [Fitur dan Data](#5-fitur-dan-data)
6. [Batasan Sistem](#6-batasan-sistem)
7. [Perancangan Sistem](#7-perancangan-sistem)
8. [Implementasi Sistem](#8-implementasi-sistem)
9. [Pengujian](#9-pengujian)
10. [Kesimpulan dan Saran](#10-kesimpulan-dan-saran)
11. [Cara Menjalankan](#11-cara-menjalankan)
12. [Cara Deploy ke Vercel](#12-cara-deploy-ke-vercel)

---

## 1. Pendahuluan

**CineMatch** adalah aplikasi web sistem rekomendasi film sederhana yang dibangun sebagai proyek akhir mata kuliah Struktur Data dan Algoritma. Aplikasi ini mendemonstrasikan penerapan berbagai struktur data dan algoritma dalam konteks nyata, yaitu sistem rekomendasi yang membantu pengguna menemukan film berdasarkan preferensi mereka.

### Topik yang Dipilih
**Sistem Rekomendasi Sederhana** - Menggunakan pendekatan content-based filtering dengan scoring algorithm berbasis bobot kriteria.

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Bahasa**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI Pattern
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

---

## 2. Masalah yang Diselesaikan

Dalam era streaming digital, pengguna sering kesulitan memilih film dari katalog yang sangat besar. Sistem rekomendasi membantu mengatasi masalah ini dengan:

1. **Information Overload** - Terlalu banyak pilihan film membuat pengguna bingung
2. **Personalisasi** - Setiap pengguna memiliki preferensi berbeda (genre, durasi, rating)
3. **Efisiensi Pencarian** - Pengguna membutuhkan cara cepat menemukan film yang sesuai
4. **Kualitas Rekomendasi** - Bagaimana mengukur kesesuaian film dengan preferensi pengguna

---

## 3. Pertanyaan Penelitian

1. Bagaimana struktur data yang tepat dapat digunakan untuk menyimpan dan mengelola data film secara efisien?
2. Bagaimana algoritma sorting dapat diimplementasikan secara manual untuk mengurutkan film berdasarkan berbagai kriteria?
3. Bagaimana algoritma scoring berbasis bobot dapat menghasilkan rekomendasi film yang relevan?
4. Bagaimana kompleksitas waktu algoritma mempengaruhi performa sistem?
5. Bagaimana Queue dapat digunakan untuk mengelola riwayat rekomendasi?

---

## 4. Overview Sistem

### Arsitektur Aplikasi

```
┌─────────────────────────────────────────────────┐
│                   Frontend (UI)                   │
│        Next.js App Router + React Components      │
├─────────────────────────────────────────────────┤
│                  Business Logic                   │
│    lib/algorithms.ts    │    lib/queue.ts         │
├─────────────────────────────────────────────────┤
│                   Data Layer                      │
│              data/movies.ts (45 film)             │
└─────────────────────────────────────────────────┘
```

### Alur Sistem

```
Input Pengguna → Pencarian/Filter → Algoritma Processing → Scoring → Output Terurut
```

---

## 5. Fitur dan Data

### Fitur Utama

| No | Fitur | Deskripsi |
|----|-------|-----------|
| 1 | Dashboard Statistik | Total film, rata-rata rating, genre terbanyak, film terbaik |
| 2 | Daftar Film | 45 film dengan informasi lengkap |
| 3 | Pencarian | Linear search berdasarkan judul (case-insensitive) |
| 4 | Filter Genre | Filter berdasarkan 12 genre |
| 5 | Filter Rating | Filter berdasarkan rating minimum |
| 6 | Sorting | Rating, tahun, popularitas, judul A-Z (Merge Sort) |
| 7 | Rekomendasi | Scoring algorithm berbasis preferensi pengguna |
| 8 | Skor Rekomendasi | Persentase kesesuaian (0-100%) |
| 9 | Alasan Rekomendasi | Penjelasan detail mengapa film direkomendasikan |
| 10 | Riwayat | Queue FIFO untuk menyimpan rekomendasi terakhir |
| 11 | Dark Mode | Toggle tema gelap/terang |
| 12 | Analisis Algoritma | Penjelasan lengkap struktur data & algoritma |
| 13 | Pengujian | 10 skenario uji otomatis |
| 14 | Responsive | Mendukung mobile dan desktop |

### Data Film

Setiap film memiliki properti:
- `id` - Identifier unik
- `title` - Judul film
- `genre` - Array genre (multi-genre)
- `year` - Tahun rilis
- `rating` - Rating (0-10)
- `duration` - Durasi dalam menit
- `popularity` - Popularitas (0-100)
- `description` - Deskripsi singkat
- `posterUrl` - Gradient placeholder (tanpa API eksternal)

> **Catatan**: Data film menggunakan dummy lokal dalam file TypeScript. Tidak memerlukan database atau API eksternal.

---

## 6. Batasan Sistem

1. Data film bersifat statis (45 film dummy, tanpa database)
2. Tidak ada autentikasi pengguna
3. Preferensi tidak disimpan secara persisten (hilang saat refresh)
4. Rekomendasi menggunakan content-based filtering sederhana (bukan collaborative filtering)
5. Poster menggunakan gradient placeholder (bukan gambar asli)
6. Tidak ada fitur rating/review dari pengguna

---

## 7. Perancangan Sistem

### Struktur Data yang Digunakan

| Struktur Data | Lokasi | Kegunaan |
|---------------|--------|----------|
| **Array/List** | `data/movies.ts` | Menyimpan koleksi film |
| **HashMap/Map** | `lib/algorithms.ts` | Distribusi genre, frekuensi counting |
| **Queue** | `lib/queue.ts` | Riwayat rekomendasi (FIFO, bounded) |

### Algoritma yang Digunakan

| Algoritma | Lokasi | Kegunaan |
|-----------|--------|----------|
| **Merge Sort** | `lib/algorithms.ts` | Sorting utama (rating, tahun, popularitas, judul) |
| **Quick Sort** | `lib/algorithms.ts` | Alternatif sorting (implementasi tersedia) |
| **Linear Search** | `lib/algorithms.ts` | Pencarian judul film (substring matching) |
| **Multi-Criteria Filter** | `lib/algorithms.ts` | Filter genre, rating, tahun, durasi |
| **Scoring Algorithm** | `lib/algorithms.ts` | Perhitungan skor rekomendasi berbasis bobot |

### Struktur Folder

```
antrean/
├── app/
│   ├── globals.css          # Tailwind styles + CSS variables
│   ├── layout.tsx           # Root layout dengan metadata
│   └── page.tsx             # Halaman utama (dashboard)
├── components/
│   ├── ui/                  # Komponen UI dasar (Shadcn-style)
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   └── slider.tsx
│   ├── AlgorithmAnalysis.tsx # Analisis algoritma
│   ├── DarkModeToggle.tsx   # Toggle dark mode
│   ├── FilmList.tsx         # Daftar film + search/filter/sort
│   ├── MovieCard.tsx        # Card film individual
│   ├── Recommendations.tsx  # Sistem rekomendasi
│   ├── Statistics.tsx       # Dashboard statistik
│   └── Testing.tsx          # Pengujian otomatis
├── data/
│   └── movies.ts            # Data dummy + interfaces
├── lib/
│   ├── algorithms.ts        # Implementasi algoritma
│   ├── queue.ts             # Implementasi Queue
│   └── utils.ts             # Utility (cn function)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── next.config.ts
└── README.md
```

---

## 8. Implementasi Sistem

### 8.1 Merge Sort (Sorting Utama)

```typescript
// Kompleksitas: O(n log n) - semua kasus
function mergeSort(arr: Movie[], compareFn): Movie[] {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid), compareFn);
  const right = mergeSort(arr.slice(mid), compareFn);
  
  return merge(left, right, compareFn);
}
```

### 8.2 Linear Search (Pencarian)

```typescript
// Kompleksitas: O(n) - worst case
function linearSearch(movies: Movie[], query: string): Movie[] {
  const results: Movie[] = [];
  for (let i = 0; i < movies.length; i++) {
    if (movies[i].title.toLowerCase().includes(query.toLowerCase())) {
      results.push(movies[i]);
    }
  }
  return results;
}
```

### 8.3 Scoring Algorithm (Rekomendasi)

```typescript
// Sistem bobot scoring (total maks: 100 poin)
function calculateRecommendationScore(movie, preferences) {
  let score = 0;
  // Genre cocok:      +40 poin
  // Rating sesuai:    +25 poin
  // Tahun sesuai:     +15 poin
  // Popularitas:      +10 poin
  // Durasi sesuai:    +10 poin
  return { score, reasons };
}
```

### 8.4 Queue (Riwayat Rekomendasi)

```typescript
// Queue FIFO dengan kapasitas terbatas
class RecommendationQueue {
  private items: RecommendationResult[];
  private capacity: number;
  
  enqueue(item): void {
    if (this.isFull()) this.dequeue(); // Hapus terlama
    this.items.push(item);
  }
  
  dequeue(): RecommendationResult | undefined {
    return this.items.shift(); // FIFO
  }
}
```

---

## 9. Pengujian

### Skenario Pengujian

| No | Skenario | Input | Expected Output | Status |
|----|----------|-------|-----------------|--------|
| 1 | Search - Judul ditemukan | "Dark Knight" | ≥1 film ditemukan | ✅ |
| 2 | Search - Judul tidak ada | "Film Tidak Ada XYZ" | 0 film | ✅ |
| 3 | Search - Case insensitive | "inception" | 1 film (Inception) | ✅ |
| 4 | Filter - Genre Action | Genre: Action | Semua hasil genre Action | ✅ |
| 5 | Filter - Rating ≥ 8.5 | MinRating: 8.5 | Semua rating ≥ 8.5 | ✅ |
| 6 | Sort - Rating desc | Sort: rating | Terurut dari tertinggi | ✅ |
| 7 | Sort - Tahun desc | Sort: year | Terurut dari terbaru | ✅ |
| 8 | Sort - Judul A-Z | Sort: title | Terurut alfabetis | ✅ |
| 9 | Scoring - Genre match | Preferensi Action | Skor > 50 | ✅ |
| 10 | Queue - FIFO | 4 item, kapasitas 3 | Size 3, item pertama terhapus | ✅ |

Semua pengujian dapat dijalankan langsung di tab "Pengujian" pada aplikasi.

---

## 10. Kesimpulan dan Saran

### Kesimpulan

1. **Struktur data Array** efektif untuk menyimpan koleksi film dengan akses O(1) dan iterasi O(n).
2. **HashMap (Map)** sangat efisien untuk operasi counting dan distribusi genre dengan O(1) lookup.
3. **Queue** cocok untuk mengelola riwayat dengan prinsip FIFO dan kapasitas terbatas.
4. **Merge Sort** memberikan performa konsisten O(n log n) untuk semua kasus sorting.
5. **Linear Search** memadai untuk pencarian substring pada dataset kecil-menengah.
6. **Scoring Algorithm** berbasis bobot dapat menghasilkan rekomendasi yang relevan dan transparan.

### Saran Pengembangan

1. Implementasi Binary Search untuk pencarian pada data terurut
2. Penambahan collaborative filtering (berdasarkan preferensi pengguna lain)
3. Integrasi dengan database untuk data persisten
4. Penambahan sistem rating dan review dari pengguna
5. Optimasi Queue dengan circular buffer untuk O(1) dequeue
6. Implementasi caching untuk hasil rekomendasi yang sering diminta

---

## 11. Cara Menjalankan

### Prasyarat
- Node.js versi 18 atau lebih baru
- npm atau yarn

### Langkah-langkah

```bash
# 1. Clone repository
git clone <repository-url>
cd antrean

# 2. Install dependencies
npm install

# 3. Jalankan development server
npm run dev

# 4. Buka di browser
# http://localhost:3000
```

### Build untuk Produksi

```bash
npm run build
npm start
```

---

## 12. Cara Deploy ke Vercel

### Metode 1: Melalui GitHub (Direkomendasikan)

1. Push kode ke repository GitHub
2. Buka [vercel.com](https://vercel.com) dan login
3. Klik "New Project"
4. Import repository dari GitHub
5. Vercel akan otomatis mendeteksi Next.js
6. Klik "Deploy"
7. Tunggu proses build selesai
8. Aplikasi akan tersedia di URL yang diberikan Vercel

### Metode 2: Melalui Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy ke produksi
vercel --prod
```

### Konfigurasi Vercel

Tidak diperlukan konfigurasi tambahan. Aplikasi ini:
- ✅ Tidak memerlukan environment variables
- ✅ Tidak memerlukan database eksternal
- ✅ Tidak memerlukan API keys
- ✅ Semua data bersifat lokal (dummy)
- ✅ Compatible dengan Vercel Edge Runtime

---

## Kompleksitas Algoritma (Ringkasan)

| Operasi | Best Case | Average Case | Worst Case | Space |
|---------|-----------|--------------|------------|-------|
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) |
| Linear Search | O(1) | O(n) | O(n) | O(1) |
| Filter | O(n) | O(n) | O(n) | O(k) |
| Scoring | O(n) | O(n) | O(n) | O(n) |
| Queue Enqueue | O(1) | O(1) | O(n) | O(1) |
| HashMap Lookup | O(1) | O(1) | O(n) | O(k) |

---

## Teknologi yang Digunakan

| Teknologi | Versi | Kegunaan |
|-----------|-------|----------|
| Next.js | 14.x | Framework React full-stack |
| TypeScript | 5.x | Type safety dan dokumentasi kode |
| Tailwind CSS | 3.x | Utility-first CSS framework |
| Shadcn UI | - | Component pattern |
| Lucide React | 0.36x | Icon library |
| Vercel | - | Platform deployment |

---

## Lisensi

Proyek ini dibuat untuk keperluan akademis (Proyek Akhir Mata Kuliah Struktur Data dan Algoritma).

---

*Dibuat dengan ❤️ menggunakan Next.js, TypeScript, dan Tailwind CSS*
