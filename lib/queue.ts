/**
 * ============================================================
 * QUEUE - Struktur Data Antrian untuk Riwayat Rekomendasi
 * ============================================================
 *
 * Implementasi Queue (Antrian) menggunakan array dengan batasan kapasitas.
 * Digunakan untuk menyimpan riwayat rekomendasi terakhir pengguna.
 *
 * Prinsip: FIFO (First In, First Out)
 * - Elemen yang masuk pertama akan keluar pertama
 * - Ketika kapasitas penuh, elemen tertua dihapus otomatis (dequeue)
 *
 * Kompleksitas:
 * - Enqueue: O(1) amortized
 * - Dequeue: O(n) karena shift array (bisa dioptimalkan dengan circular buffer)
 * - Peek: O(1)
 * - Size: O(1)
 * - isFull: O(1)
 * - isEmpty: O(1)
 * - getAll: O(n) - mengembalikan salinan seluruh isi queue
 *
 * Kapasitas default: 5 (menyimpan 5 rekomendasi terakhir)
 * ============================================================
 */

import { RecommendationResult } from "@/data/movies";

/**
 * Class RecommendationQueue - Queue untuk riwayat rekomendasi
 *
 * Mengimplementasikan queue dengan kapasitas terbatas.
 * Ketika penuh, elemen tertua otomatis dihapus (circular behavior).
 */
export class RecommendationQueue {
  private items: RecommendationResult[];
  private capacity: number;

  /**
   * Constructor - inisialisasi queue kosong
   * @param capacity - Kapasitas maksimal queue (default: 5)
   */
  constructor(capacity: number = 5) {
    this.items = [];
    this.capacity = capacity;
  }

  /**
   * Enqueue - Menambahkan elemen ke belakang antrian
   * Jika penuh, otomatis hapus elemen terdepan (dequeue)
   *
   * Kompleksitas: O(1) jika belum penuh, O(n) jika penuh (karena shift)
   *
   * @param item - RecommendationResult yang akan ditambahkan
   */
  enqueue(item: RecommendationResult): void {
    // Jika kapasitas penuh, hapus elemen terdepan
    if (this.isFull()) {
      this.dequeue();
    }
    // Tambahkan elemen ke belakang
    this.items.push(item);
  }

  /**
   * Enqueue Multiple - Menambahkan beberapa elemen sekaligus
   * Berguna ketika menyimpan batch rekomendasi
   *
   * Kompleksitas: O(k) dimana k = jumlah items yang ditambahkan
   *
   * @param items - Array RecommendationResult yang akan ditambahkan
   */
  enqueueMultiple(items: RecommendationResult[]): void {
    for (let i = 0; i < items.length; i++) {
      this.enqueue(items[i]);
    }
  }

  /**
   * Dequeue - Menghapus dan mengembalikan elemen terdepan
   * Prinsip FIFO: elemen yang masuk pertama keluar pertama
   *
   * Kompleksitas: O(n) karena array shift
   *
   * @returns Elemen terdepan atau undefined jika kosong
   */
  dequeue(): RecommendationResult | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.shift();
  }

  /**
   * Peek - Melihat elemen terdepan tanpa menghapusnya
   *
   * Kompleksitas: O(1)
   *
   * @returns Elemen terdepan atau undefined jika kosong
   */
  peek(): RecommendationResult | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[0];
  }

  /**
   * Peek Last - Melihat elemen terakhir (terbaru) tanpa menghapusnya
   *
   * Kompleksitas: O(1)
   *
   * @returns Elemen terakhir atau undefined jika kosong
   */
  peekLast(): RecommendationResult | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.items.length - 1];
  }

  /**
   * Size - Mengembalikan jumlah elemen dalam queue
   *
   * Kompleksitas: O(1)
   *
   * @returns Jumlah elemen saat ini
   */
  size(): number {
    return this.items.length;
  }

  /**
   * isEmpty - Mengecek apakah queue kosong
   *
   * Kompleksitas: O(1)
   *
   * @returns true jika kosong, false jika tidak
   */
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  /**
   * isFull - Mengecek apakah queue sudah penuh
   *
   * Kompleksitas: O(1)
   *
   * @returns true jika penuh, false jika tidak
   */
  isFull(): boolean {
    return this.items.length >= this.capacity;
  }

  /**
   * getAll - Mengembalikan salinan seluruh isi queue
   * Mengembalikan salinan (bukan referensi) untuk menjaga enkapsulasi
   *
   * Kompleksitas: O(n)
   *
   * @returns Array salinan seluruh elemen dalam queue
   */
  getAll(): RecommendationResult[] {
    return [...this.items];
  }

  /**
   * clear - Mengosongkan seluruh isi queue
   *
   * Kompleksitas: O(1)
   */
  clear(): void {
    this.items = [];
  }

  /**
   * getCapacity - Mengembalikan kapasitas maksimal queue
   *
   * Kompleksitas: O(1)
   *
   * @returns Kapasitas maksimal
   */
  getCapacity(): number {
    return this.capacity;
  }
}
