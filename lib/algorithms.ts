/**
 * ============================================================
 * MODUL ALGORITMA - Sistem Rekomendasi Film
 * ============================================================
 * File ini berisi implementasi manual dari berbagai algoritma
 * yang digunakan dalam sistem rekomendasi film.
 *
 * Struktur Data & Algoritma yang diimplementasikan:
 * 1. Merge Sort - O(n log n) untuk sorting film
 * 2. Quick Sort - O(n log n) average untuk sorting film
 * 3. Linear Search - O(n) untuk pencarian judul
 * 4. Filter Algorithm - O(n) untuk filtering multi-kriteria
 * 5. Scoring Algorithm - O(n) untuk menghitung skor rekomendasi
 * 6. HashMap/Map - O(1) average untuk distribusi genre
 * ============================================================
 */

import { Movie, UserPreferences, RecommendationResult } from "@/data/movies";

// ==================== MERGE SORT ====================

/**
 * Merge Sort - Algoritma sorting divide and conquer
 * Kompleksitas Waktu: O(n log n) - semua kasus (best, average, worst)
 * Kompleksitas Ruang: O(n) - membutuhkan array tambahan untuk merge
 * Stabil: Ya - elemen dengan nilai sama mempertahankan urutan relatifnya
 *
 * Cara kerja:
 * 1. Bagi array menjadi dua bagian (divide)
 * 2. Urutkan masing-masing bagian secara rekursif (conquer)
 * 3. Gabungkan kedua bagian yang sudah terurut (combine)
 *
 * @param arr - Array film yang akan diurutkan
 * @param compareFn - Fungsi pembanding untuk menentukan urutan
 * @returns Array film yang sudah terurut
 */
export function mergeSort(
  arr: Movie[],
  compareFn: (a: Movie, b: Movie) => number
): Movie[] {
  // Base case: array dengan 0 atau 1 elemen sudah terurut
  if (arr.length <= 1) {
    return arr;
  }

  // DIVIDE: Bagi array menjadi dua bagian
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  // CONQUER: Urutkan kedua bagian secara rekursif
  const sortedLeft = mergeSort(left, compareFn);
  const sortedRight = mergeSort(right, compareFn);

  // COMBINE: Gabungkan kedua bagian yang sudah terurut
  return merge(sortedLeft, sortedRight, compareFn);
}

/**
 * Fungsi helper untuk menggabungkan dua array terurut
 * Kompleksitas Waktu: O(n) dimana n = left.length + right.length
 *
 * @param left - Array kiri yang sudah terurut
 * @param right - Array kanan yang sudah terurut
 * @param compareFn - Fungsi pembanding
 * @returns Array gabungan yang terurut
 */
function merge(
  left: Movie[],
  right: Movie[],
  compareFn: (a: Movie, b: Movie) => number
): Movie[] {
  const result: Movie[] = [];
  let leftIndex = 0;
  let rightIndex = 0;

  // Bandingkan elemen dari kedua array satu per satu
  while (leftIndex < left.length && rightIndex < right.length) {
    if (compareFn(left[leftIndex], right[rightIndex]) <= 0) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  // Tambahkan sisa elemen yang belum diproses
  while (leftIndex < left.length) {
    result.push(left[leftIndex]);
    leftIndex++;
  }

  while (rightIndex < right.length) {
    result.push(right[rightIndex]);
    rightIndex++;
  }

  return result;
}

// ==================== QUICK SORT ====================

/**
 * Quick Sort - Algoritma sorting divide and conquer berbasis pivot
 * Kompleksitas Waktu:
 *   - Best Case: O(n log n) - pivot selalu membagi array seimbang
 *   - Average Case: O(n log n)
 *   - Worst Case: O(n²) - pivot selalu elemen terkecil/terbesar
 * Kompleksitas Ruang: O(log n) - untuk call stack rekursi
 * Stabil: Tidak - elemen dengan nilai sama bisa bertukar posisi
 *
 * Cara kerja:
 * 1. Pilih elemen pivot (menggunakan median-of-three)
 * 2. Partisi array: elemen < pivot di kiri, elemen > pivot di kanan
 * 3. Urutkan bagian kiri dan kanan secara rekursif
 *
 * @param arr - Array film yang akan diurutkan
 * @param compareFn - Fungsi pembanding
 * @returns Array film yang sudah terurut
 */
export function quickSort(
  arr: Movie[],
  compareFn: (a: Movie, b: Movie) => number
): Movie[] {
  // Buat salinan agar tidak mengubah array asli
  const result = [...arr];
  quickSortHelper(result, 0, result.length - 1, compareFn);
  return result;
}

/**
 * Helper rekursif untuk Quick Sort
 * Melakukan partisi dan sorting secara in-place
 */
function quickSortHelper(
  arr: Movie[],
  low: number,
  high: number,
  compareFn: (a: Movie, b: Movie) => number
): void {
  if (low < high) {
    // Partisi array dan dapatkan posisi pivot
    const pivotIndex = partition(arr, low, high, compareFn);

    // Urutkan bagian kiri dan kanan dari pivot
    quickSortHelper(arr, low, pivotIndex - 1, compareFn);
    quickSortHelper(arr, pivotIndex + 1, high, compareFn);
  }
}

/**
 * Fungsi partisi untuk Quick Sort
 * Menggunakan elemen terakhir sebagai pivot
 * Menempatkan semua elemen < pivot di kiri, dan > pivot di kanan
 *
 * @returns Index posisi akhir pivot
 */
function partition(
  arr: Movie[],
  low: number,
  high: number,
  compareFn: (a: Movie, b: Movie) => number
): number {
  // Pilih elemen terakhir sebagai pivot
  const pivot = arr[high];
  let i = low - 1; // Index elemen terkecil

  for (let j = low; j < high; j++) {
    // Jika elemen saat ini lebih kecil/sama dengan pivot
    if (compareFn(arr[j], pivot) <= 0) {
      i++;
      // Tukar arr[i] dan arr[j]
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  // Tempatkan pivot pada posisi yang benar
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

// ==================== LINEAR SEARCH ====================

/**
 * Linear Search - Algoritma pencarian sekuensial
 * Kompleksitas Waktu:
 *   - Best Case: O(1) - elemen ditemukan di posisi pertama
 *   - Average Case: O(n/2) ≈ O(n)
 *   - Worst Case: O(n) - elemen di posisi terakhir atau tidak ditemukan
 * Kompleksitas Ruang: O(1) - tidak membutuhkan ruang tambahan
 *
 * Cara kerja:
 * 1. Iterasi setiap elemen dalam array dari awal hingga akhir
 * 2. Bandingkan judul film dengan query pencarian (case-insensitive)
 * 3. Jika cocok (mengandung substring), tambahkan ke hasil
 *
 * Keunggulan: Tidak memerlukan data terurut, cocok untuk pencarian substring
 *
 * @param movies - Array film yang akan dicari
 * @param query - String pencarian (judul film)
 * @returns Array film yang judulnya mengandung query
 */
export function linearSearch(movies: Movie[], query: string): Movie[] {
  const results: Movie[] = [];
  const lowerQuery = query.toLowerCase().trim();

  // Kasus khusus: query kosong, kembalikan semua film
  if (lowerQuery === "") {
    return [...movies];
  }

  // Iterasi linear melalui setiap film - O(n)
  for (let i = 0; i < movies.length; i++) {
    const title = movies[i].title.toLowerCase();

    // Pencocokan substring - cek apakah judul mengandung query
    if (title.includes(lowerQuery)) {
      results.push(movies[i]);
    }
  }

  return results;
}

// ==================== FILTER ALGORITHM ====================

/**
 * Multi-Criteria Filter - Algoritma filtering berdasarkan beberapa kriteria
 * Kompleksitas Waktu: O(n × g) dimana n = jumlah film, g = jumlah genre per film
 * Dalam praktik mendekati O(n) karena g sangat kecil (maks 3-4 genre per film)
 * Kompleksitas Ruang: O(k) dimana k = jumlah film yang lolos filter
 *
 * Cara kerja:
 * 1. Iterasi setiap film dalam array
 * 2. Periksa apakah film memenuhi SEMUA kriteria (AND logic)
 * 3. Kriteria: genre, rating minimum, tahun minimum, durasi maksimal
 *
 * @param movies - Array film yang akan difilter
 * @param genre - Genre yang dicari (kosong = semua genre)
 * @param minRating - Rating minimum (0-10)
 * @param minYear - Tahun rilis minimum
 * @param maxDuration - Durasi maksimal dalam menit (0 = tanpa batas)
 * @returns Array film yang memenuhi semua kriteria
 */
export function filterMovies(
  movies: Movie[],
  genre: string,
  minRating: number,
  minYear: number,
  maxDuration: number
): Movie[] {
  const results: Movie[] = [];

  // Iterasi setiap film - O(n)
  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];
    let passesFilter = true;

    // Filter 1: Genre (jika dipilih)
    if (genre && genre !== "Semua") {
      // Cek apakah film memiliki genre yang dicari - O(g)
      let hasGenre = false;
      for (let j = 0; j < movie.genre.length; j++) {
        if (movie.genre[j] === genre) {
          hasGenre = true;
          break;
        }
      }
      if (!hasGenre) passesFilter = false;
    }

    // Filter 2: Rating minimum
    if (passesFilter && movie.rating < minRating) {
      passesFilter = false;
    }

    // Filter 3: Tahun minimum
    if (passesFilter && minYear > 0 && movie.year < minYear) {
      passesFilter = false;
    }

    // Filter 4: Durasi maksimal
    if (passesFilter && maxDuration > 0 && movie.duration > maxDuration) {
      passesFilter = false;
    }

    // Jika lolos semua filter, tambahkan ke hasil
    if (passesFilter) {
      results.push(movie);
    }
  }

  return results;
}

// ==================== SCORING ALGORITHM ====================

/**
 * Recommendation Scoring Algorithm - Menghitung skor rekomendasi film
 * Kompleksitas Waktu: O(g × p) per film, dimana g = genre film, p = genre preferensi
 * Total untuk semua film: O(n × g × p)
 * Dalam praktik mendekati O(n) karena g dan p sangat kecil
 *
 * Sistem Bobot Scoring:
 * - Genre cocok: +40 poin (bobot tertinggi karena genre adalah preferensi utama)
 * - Rating sesuai: +25 poin (kualitas film penting)
 * - Tahun sesuai: +15 poin (film baru lebih relevan)
 * - Popularitas tinggi: +10 poin (popularitas sebagai indikator)
 * - Durasi sesuai: +10 poin (kenyamanan menonton)
 * Total maksimal: 100 poin
 *
 * @param movie - Film yang akan dihitung skornya
 * @param preferences - Preferensi pengguna
 * @returns Object berisi skor (0-100) dan array alasan rekomendasi
 */
export function calculateRecommendationScore(
  movie: Movie,
  preferences: UserPreferences
): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

  // ---- SCORING 1: Genre Match (+40 poin) ----
  // Cek apakah genre film cocok dengan preferensi pengguna
  if (preferences.favoriteGenres.length > 0) {
    let genreMatch = false;
    let matchedGenres: string[] = [];

    // Iterasi genre film dan bandingkan dengan preferensi
    for (let i = 0; i < movie.genre.length; i++) {
      for (let j = 0; j < preferences.favoriteGenres.length; j++) {
        if (movie.genre[i] === preferences.favoriteGenres[j]) {
          genreMatch = true;
          matchedGenres.push(movie.genre[i]);
        }
      }
    }

    if (genreMatch) {
      // Bonus proporsional: lebih banyak genre cocok = skor lebih tinggi
      const genreScore = Math.min(40, (matchedGenres.length / preferences.favoriteGenres.length) * 40);
      score += genreScore;
      reasons.push(`Genre cocok: ${matchedGenres.join(", ")} (+${Math.round(genreScore)})`);
    }
  } else {
    // Jika tidak ada preferensi genre, beri skor default
    score += 20;
    reasons.push("Tidak ada preferensi genre, skor default (+20)");
  }

  // ---- SCORING 2: Rating Match (+25 poin) ----
  // Film dengan rating >= preferensi mendapat skor penuh
  if (movie.rating >= preferences.minRating) {
    const ratingScore = 25;
    score += ratingScore;
    reasons.push(`Rating ${movie.rating} >= ${preferences.minRating} (+${ratingScore})`);
  } else {
    // Skor parsial berdasarkan seberapa dekat rating dengan preferensi
    const ratingDiff = preferences.minRating - movie.rating;
    const partialScore = Math.max(0, 25 - ratingDiff * 10);
    score += partialScore;
    if (partialScore > 0) {
      reasons.push(`Rating ${movie.rating} mendekati ${preferences.minRating} (+${Math.round(partialScore)})`);
    }
  }

  // ---- SCORING 3: Year Match (+15 poin) ----
  // Film dengan tahun >= preferensi mendapat skor penuh
  if (movie.year >= preferences.minYear) {
    const yearScore = 15;
    score += yearScore;
    reasons.push(`Tahun ${movie.year} >= ${preferences.minYear} (+${yearScore})`);
  } else {
    // Skor parsial berdasarkan selisih tahun
    const yearDiff = preferences.minYear - movie.year;
    const partialScore = Math.max(0, 15 - yearDiff * 1.5);
    score += partialScore;
    if (partialScore > 0) {
      reasons.push(`Tahun ${movie.year} mendekati ${preferences.minYear} (+${Math.round(partialScore)})`);
    }
  }

  // ---- SCORING 4: Popularity (+10 poin) ----
  // Skor berdasarkan persentase popularitas (skala 0-100)
  const popularityScore = (movie.popularity / 100) * 10;
  score += popularityScore;
  reasons.push(`Popularitas ${movie.popularity}% (+${Math.round(popularityScore)})`);

  // ---- SCORING 5: Duration Match (+10 poin) ----
  // Film dengan durasi <= preferensi mendapat skor penuh
  if (preferences.maxDuration > 0) {
    if (movie.duration <= preferences.maxDuration) {
      score += 10;
      reasons.push(`Durasi ${movie.duration} menit <= ${preferences.maxDuration} menit (+10)`);
    } else {
      // Skor parsial berdasarkan selisih durasi
      const durationDiff = movie.duration - preferences.maxDuration;
      const partialScore = Math.max(0, 10 - durationDiff * 0.2);
      score += partialScore;
      if (partialScore > 0) {
        reasons.push(`Durasi ${movie.duration} menit mendekati batas (+${Math.round(partialScore)})`);
      }
    }
  } else {
    // Tanpa batas durasi, beri skor penuh
    score += 10;
    reasons.push("Tanpa batas durasi (+10)");
  }

  return {
    score: Math.round(Math.min(100, score)),
    reasons,
  };
}

/**
 * Generate Recommendations - Menghasilkan daftar rekomendasi terurut
 * Kompleksitas Waktu: O(n × g × p) untuk scoring + O(n log n) untuk sorting
 * Total: O(n log n) karena sorting mendominasi
 *
 * Cara kerja:
 * 1. Hitung skor untuk setiap film - O(n)
 * 2. Urutkan berdasarkan skor tertinggi menggunakan mergeSort - O(n log n)
 * 3. Kembalikan top-k film dengan skor tertinggi
 *
 * @param movies - Array semua film
 * @param preferences - Preferensi pengguna
 * @param topK - Jumlah rekomendasi yang dikembalikan (default: 10)
 * @returns Array RecommendationResult terurut dari skor tertinggi
 */
export function generateRecommendations(
  movies: Movie[],
  preferences: UserPreferences,
  topK: number = 10
): RecommendationResult[] {
  // Step 1: Hitung skor untuk setiap film
  const scoredMovies: RecommendationResult[] = movies.map((movie) => {
    const { score, reasons } = calculateRecommendationScore(movie, preferences);
    return { movie, score, reasons };
  });

  // Step 2: Urutkan menggunakan merge sort berdasarkan skor tertinggi
  // Kita convert ke format yang bisa digunakan mergeSort
  const sortedByScore = mergeSort(
    scoredMovies.map((r) => r.movie),
    (a, b) => {
      const scoreA = scoredMovies.find((r) => r.movie.id === a.id)!.score;
      const scoreB = scoredMovies.find((r) => r.movie.id === b.id)!.score;
      return scoreB - scoreA; // Descending
    }
  );

  // Step 3: Kembalikan top-K rekomendasi
  const results: RecommendationResult[] = [];
  for (let i = 0; i < Math.min(topK, sortedByScore.length); i++) {
    const movie = sortedByScore[i];
    const scored = scoredMovies.find((r) => r.movie.id === movie.id)!;
    results.push(scored);
  }

  return results;
}

// ==================== SORTING HELPERS ====================

/**
 * Sort movies menggunakan Merge Sort dengan berbagai kriteria
 * Memanfaatkan implementasi mergeSort manual di atas
 *
 * @param movies - Array film
 * @param sortBy - Kriteria sorting
 * @returns Array film terurut
 */
export function sortMovies(
  movies: Movie[],
  sortBy: "rating" | "year" | "popularity" | "title"
): Movie[] {
  const compareFunctions: Record<string, (a: Movie, b: Movie) => number> = {
    // Rating tertinggi - descending
    rating: (a, b) => b.rating - a.rating,
    // Tahun terbaru - descending
    year: (a, b) => b.year - a.year,
    // Popularitas tertinggi - descending
    popularity: (a, b) => b.popularity - a.popularity,
    // Judul A-Z - ascending (lexicographic)
    title: (a, b) => a.title.localeCompare(b.title),
  };

  // Gunakan merge sort manual untuk sorting
  return mergeSort(movies, compareFunctions[sortBy]);
}

// ==================== HASHMAP/MAP OPERATIONS ====================

/**
 * Genre Distribution menggunakan HashMap/Map
 * Kompleksitas Waktu: O(n × g) dimana n = jumlah film, g = genre per film
 * Kompleksitas Ruang: O(k) dimana k = jumlah genre unik
 *
 * Struktur Data: Map<string, number>
 * - Key: nama genre (string)
 * - Value: jumlah film dengan genre tersebut (number)
 * - Operasi insert/lookup: O(1) average case
 *
 * @param movies - Array film
 * @returns Map dengan distribusi genre
 */
export function getGenreDistribution(movies: Movie[]): Map<string, number> {
  // Inisialisasi HashMap kosong
  const genreMap = new Map<string, number>();

  // Iterasi setiap film - O(n)
  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];

    // Iterasi setiap genre dalam film - O(g)
    for (let j = 0; j < movie.genre.length; j++) {
      const genre = movie.genre[j];

      // HashMap lookup O(1) average + insert O(1) average
      const currentCount = genreMap.get(genre) || 0;
      genreMap.set(genre, currentCount + 1);
    }
  }

  return genreMap;
}

/**
 * Menghitung statistik film menggunakan iterasi linear
 * Kompleksitas Waktu: O(n)
 *
 * @param movies - Array film
 * @returns Object berisi statistik
 */
export function calculateStatistics(movies: Movie[]): {
  totalFilm: number;
  averageRating: number;
  topGenre: string;
  topRatedMovie: Movie | null;
} {
  if (movies.length === 0) {
    return {
      totalFilm: 0,
      averageRating: 0,
      topGenre: "-",
      topRatedMovie: null,
    };
  }

  // Hitung rata-rata rating - O(n)
  let totalRating = 0;
  let topRatedMovie: Movie = movies[0];

  for (let i = 0; i < movies.length; i++) {
    totalRating += movies[i].rating;
    if (movies[i].rating > topRatedMovie.rating) {
      topRatedMovie = movies[i];
    }
  }

  const averageRating = totalRating / movies.length;

  // Dapatkan genre terbanyak menggunakan HashMap - O(n × g)
  const genreMap = getGenreDistribution(movies);
  let topGenre = "";
  let maxCount = 0;

  // Iterasi Map untuk menemukan genre dengan count tertinggi - O(k)
  genreMap.forEach((count, genre) => {
    if (count > maxCount) {
      maxCount = count;
      topGenre = genre;
    }
  });

  return {
    totalFilm: movies.length,
    averageRating: Math.round(averageRating * 10) / 10,
    topGenre,
    topRatedMovie,
  };
}
