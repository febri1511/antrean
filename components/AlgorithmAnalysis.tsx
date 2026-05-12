"use client";

import { Code2, Cpu, Database, Layers } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function AlgorithmAnalysis() {
  return (
    <div className="space-y-6">
      {/* Struktur Data */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Database className="h-5 w-5 text-blue-500" />
            Struktur Data yang Digunakan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-2 mb-2">
                <Badge>Array/List</Badge>
                <span className="text-xs text-muted-foreground">data/movies.ts</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Array digunakan untuk menyimpan koleksi 45 data film. Dipilih karena mendukung 
                akses acak O(1) berdasarkan index dan iterasi sekuensial O(n) yang efisien 
                untuk operasi filtering dan searching.
              </p>
              <div className="mt-2 text-xs font-mono bg-background p-2 rounded">
                const movies: Movie[] = [...] // 45 elemen
              </div>
            </div>

            <div className="p-4 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-2 mb-2">
                <Badge>HashMap/Map</Badge>
                <span className="text-xs text-muted-foreground">lib/algorithms.ts</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Map&lt;string, number&gt; digunakan untuk menghitung distribusi genre. 
                HashMap dipilih karena operasi lookup dan insert O(1) average case, 
                sangat efisien untuk menghitung frekuensi.
              </p>
              <div className="mt-2 text-xs font-mono bg-background p-2 rounded">
                const genreMap = new Map&lt;string, number&gt;()
              </div>
            </div>

            <div className="p-4 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-2 mb-2">
                <Badge>Queue (Antrian)</Badge>
                <span className="text-xs text-muted-foreground">lib/queue.ts</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Queue dengan kapasitas terbatas (bounded queue) untuk menyimpan riwayat 
                rekomendasi terakhir. Prinsip FIFO - rekomendasi terlama otomatis dihapus 
                ketika kapasitas penuh. Kapasitas default: 5 item.
              </p>
              <div className="mt-2 text-xs font-mono bg-background p-2 rounded">
                class RecommendationQueue &#123; enqueue(), dequeue(), peek() &#125;
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Algoritma Searching */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Code2 className="h-5 w-5 text-green-500" />
            Algoritma Searching
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-lg bg-secondary/50">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">Linear Search</Badge>
              <Badge variant="outline">O(n)</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Pencarian sekuensial untuk menemukan film berdasarkan substring judul (case-insensitive). 
              Dipilih karena data tidak terurut berdasarkan judul dan mendukung pencarian substring 
              yang tidak bisa dilakukan oleh binary search.
            </p>
            <div className="text-xs font-mono bg-background p-3 rounded space-y-1">
              <p className="text-green-600 dark:text-green-400">{"// Iterasi setiap film - O(n)"}</p>
              <p>{"for (let i = 0; i < movies.length; i++) {"}</p>
              <p className="pl-4">{"if (movies[i].title.toLowerCase().includes(query)) {"}</p>
              <p className="pl-8">{"results.push(movies[i]);"}</p>
              <p className="pl-4">{"}"}</p>
              <p>{"}"}</p>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
              <div className="text-center p-2 rounded bg-background">
                <p className="font-semibold">Best</p>
                <p className="text-muted-foreground">O(1)</p>
              </div>
              <div className="text-center p-2 rounded bg-background">
                <p className="font-semibold">Average</p>
                <p className="text-muted-foreground">O(n)</p>
              </div>
              <div className="text-center p-2 rounded bg-background">
                <p className="font-semibold">Worst</p>
                <p className="text-muted-foreground">O(n)</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Algoritma Sorting */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Layers className="h-5 w-5 text-purple-500" />
            Algoritma Sorting
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg bg-secondary/50">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">Merge Sort</Badge>
              <Badge variant="outline">O(n log n)</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Algoritma divide and conquer yang membagi array menjadi dua, mengurutkan 
              masing-masing secara rekursif, lalu menggabungkan. Dipilih karena stabil dan 
              konsisten O(n log n) di semua kasus.
            </p>
            <div className="text-xs font-mono bg-background p-3 rounded space-y-1">
              <p className="text-green-600 dark:text-green-400">{"// Divide"}</p>
              <p>{"const mid = Math.floor(arr.length / 2);"}</p>
              <p>{"const left = arr.slice(0, mid);"}</p>
              <p>{"const right = arr.slice(mid);"}</p>
              <p className="text-green-600 dark:text-green-400">{"// Conquer & Combine"}</p>
              <p>{"return merge(mergeSort(left), mergeSort(right));"}</p>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
              <div className="text-center p-2 rounded bg-background">
                <p className="font-semibold">Best</p>
                <p className="text-muted-foreground">O(n log n)</p>
              </div>
              <div className="text-center p-2 rounded bg-background">
                <p className="font-semibold">Average</p>
                <p className="text-muted-foreground">O(n log n)</p>
              </div>
              <div className="text-center p-2 rounded bg-background">
                <p className="font-semibold">Worst</p>
                <p className="text-muted-foreground">O(n log n)</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-secondary/50">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">Quick Sort</Badge>
              <Badge variant="outline">O(n log n) avg</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Algoritma divide and conquer berbasis pivot. Mempartisi array berdasarkan pivot, 
              lalu mengurutkan kedua sisi secara rekursif. Implementasi tersedia sebagai alternatif.
            </p>
            <div className="text-xs font-mono bg-background p-3 rounded space-y-1">
              <p className="text-green-600 dark:text-green-400">{"// Partition: elemen < pivot di kiri, > pivot di kanan"}</p>
              <p>{"const pivotIndex = partition(arr, low, high);"}</p>
              <p>{"quickSort(arr, low, pivotIndex - 1);"}</p>
              <p>{"quickSort(arr, pivotIndex + 1, high);"}</p>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
              <div className="text-center p-2 rounded bg-background">
                <p className="font-semibold">Best</p>
                <p className="text-muted-foreground">O(n log n)</p>
              </div>
              <div className="text-center p-2 rounded bg-background">
                <p className="font-semibold">Average</p>
                <p className="text-muted-foreground">O(n log n)</p>
              </div>
              <div className="text-center p-2 rounded bg-background">
                <p className="font-semibold">Worst</p>
                <p className="text-muted-foreground">O(n&sup2;)</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Algoritma Filtering */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Cpu className="h-5 w-5 text-orange-500" />
            Algoritma Filtering & Scoring
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg bg-secondary/50">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">Multi-Criteria Filter</Badge>
              <Badge variant="outline">O(n)</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Filter berdasarkan beberapa kriteria sekaligus (AND logic): genre, rating minimum, 
              tahun minimum, durasi maksimal. Setiap film diperiksa terhadap semua kriteria secara sekuensial.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-secondary/50">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">Recommendation Scoring</Badge>
              <Badge variant="outline">O(n)</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Menghitung skor rekomendasi (0-100) berdasarkan bobot kriteria:
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span>Genre cocok</span>
                <Badge variant="outline">+40 poin</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Rating sesuai</span>
                <Badge variant="outline">+25 poin</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Tahun sesuai</span>
                <Badge variant="outline">+15 poin</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Popularitas tinggi</span>
                <Badge variant="outline">+10 poin</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Durasi sesuai</span>
                <Badge variant="outline">+10 poin</Badge>
              </div>
              <div className="flex justify-between items-center font-semibold border-t pt-2">
                <span>Total Maksimal</span>
                <Badge>100 poin</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabel Kompleksitas */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Ringkasan Kompleksitas Big-O</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Operasi</th>
                  <th className="text-center p-2">Best</th>
                  <th className="text-center p-2">Average</th>
                  <th className="text-center p-2">Worst</th>
                  <th className="text-center p-2">Space</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="p-2 font-medium">Merge Sort</td>
                  <td className="p-2 text-center text-xs">O(n log n)</td>
                  <td className="p-2 text-center text-xs">O(n log n)</td>
                  <td className="p-2 text-center text-xs">O(n log n)</td>
                  <td className="p-2 text-center text-xs">O(n)</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">Quick Sort</td>
                  <td className="p-2 text-center text-xs">O(n log n)</td>
                  <td className="p-2 text-center text-xs">O(n log n)</td>
                  <td className="p-2 text-center text-xs">O(n&sup2;)</td>
                  <td className="p-2 text-center text-xs">O(log n)</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">Linear Search</td>
                  <td className="p-2 text-center text-xs">O(1)</td>
                  <td className="p-2 text-center text-xs">O(n)</td>
                  <td className="p-2 text-center text-xs">O(n)</td>
                  <td className="p-2 text-center text-xs">O(1)</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">Filter Multi-Kriteria</td>
                  <td className="p-2 text-center text-xs">O(n)</td>
                  <td className="p-2 text-center text-xs">O(n)</td>
                  <td className="p-2 text-center text-xs">O(n)</td>
                  <td className="p-2 text-center text-xs">O(k)</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">Scoring Rekomendasi</td>
                  <td className="p-2 text-center text-xs">O(n)</td>
                  <td className="p-2 text-center text-xs">O(n)</td>
                  <td className="p-2 text-center text-xs">O(n)</td>
                  <td className="p-2 text-center text-xs">O(n)</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">Queue Enqueue</td>
                  <td className="p-2 text-center text-xs">O(1)</td>
                  <td className="p-2 text-center text-xs">O(1)</td>
                  <td className="p-2 text-center text-xs">O(n)</td>
                  <td className="p-2 text-center text-xs">O(1)</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">HashMap Lookup</td>
                  <td className="p-2 text-center text-xs">O(1)</td>
                  <td className="p-2 text-center text-xs">O(1)</td>
                  <td className="p-2 text-center text-xs">O(n)</td>
                  <td className="p-2 text-center text-xs">O(k)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
