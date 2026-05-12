"use client";

import { FlaskConical, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { movies } from "@/data/movies";
import { linearSearch, filterMovies, sortMovies, calculateRecommendationScore, mergeSort } from "@/lib/algorithms";
import { RecommendationQueue } from "@/lib/queue";

interface TestResult {
  name: string;
  description: string;
  expected: string;
  actual: string;
  passed: boolean;
}

function runTests(): TestResult[] {
  const results: TestResult[] = [];

  // Test 1: Linear Search - Pencarian judul yang ada
  const search1 = linearSearch(movies, "Dark Knight");
  results.push({
    name: "Linear Search - Judul ditemukan",
    description: "Mencari film dengan judul mengandung 'Dark Knight'",
    expected: "Minimal 1 film ditemukan",
    actual: `${search1.length} film ditemukan: ${search1.map(m => m.title).join(", ")}`,
    passed: search1.length >= 1 && search1.some(m => m.title.includes("Dark Knight")),
  });

  // Test 2: Linear Search - Judul tidak ditemukan
  const search2 = linearSearch(movies, "Film Tidak Ada XYZ");
  results.push({
    name: "Linear Search - Judul tidak ditemukan",
    description: "Mencari film dengan judul 'Film Tidak Ada XYZ'",
    expected: "0 film ditemukan",
    actual: `${search2.length} film ditemukan`,
    passed: search2.length === 0,
  });

  // Test 3: Linear Search - Case insensitive
  const search3 = linearSearch(movies, "inception");
  results.push({
    name: "Linear Search - Case Insensitive",
    description: "Mencari 'inception' (huruf kecil semua)",
    expected: "1 film ditemukan (Inception)",
    actual: `${search3.length} film ditemukan: ${search3.map(m => m.title).join(", ")}`,
    passed: search3.length === 1 && search3[0].title === "Inception",
  });

  // Test 4: Filter - Genre Action
  const filter1 = filterMovies(movies, "Action", 0, 0, 0);
  results.push({
    name: "Filter - Genre Action",
    description: "Filter film dengan genre Action",
    expected: "Semua film hasil memiliki genre Action",
    actual: `${filter1.length} film ditemukan`,
    passed: filter1.length > 0 && filter1.every(m => m.genre.includes("Action")),
  });

  // Test 5: Filter - Rating minimum 8.5
  const filter2 = filterMovies(movies, "Semua", 8.5, 0, 0);
  results.push({
    name: "Filter - Rating Minimum 8.5",
    description: "Filter film dengan rating >= 8.5",
    expected: "Semua film hasil rating >= 8.5",
    actual: `${filter2.length} film ditemukan, rating terendah: ${filter2.length > 0 ? Math.min(...filter2.map(m => m.rating)) : '-'}`,
    passed: filter2.length > 0 && filter2.every(m => m.rating >= 8.5),
  });

  // Test 6: Merge Sort - Rating descending
  const sorted1 = sortMovies(movies, "rating");
  let isSortedDesc = true;
  for (let i = 0; i < sorted1.length - 1; i++) {
    if (sorted1[i].rating < sorted1[i + 1].rating) {
      isSortedDesc = false;
      break;
    }
  }
  results.push({
    name: "Merge Sort - Rating Descending",
    description: "Mengurutkan film berdasarkan rating dari tertinggi",
    expected: "Film terurut dari rating tertinggi ke terendah",
    actual: `Film pertama: ${sorted1[0]?.title} (${sorted1[0]?.rating}), terakhir: ${sorted1[sorted1.length-1]?.title} (${sorted1[sorted1.length-1]?.rating})`,
    passed: isSortedDesc,
  });

  // Test 7: Merge Sort - Tahun descending
  const sorted2 = sortMovies(movies, "year");
  let isSortedYearDesc = true;
  for (let i = 0; i < sorted2.length - 1; i++) {
    if (sorted2[i].year < sorted2[i + 1].year) {
      isSortedYearDesc = false;
      break;
    }
  }
  results.push({
    name: "Merge Sort - Tahun Descending",
    description: "Mengurutkan film berdasarkan tahun terbaru",
    expected: "Film terurut dari tahun terbaru ke terlama",
    actual: `Film pertama: ${sorted2[0]?.title} (${sorted2[0]?.year}), terakhir: ${sorted2[sorted2.length-1]?.title} (${sorted2[sorted2.length-1]?.year})`,
    passed: isSortedYearDesc,
  });

  // Test 8: Merge Sort - Title ascending
  const sorted3 = sortMovies(movies, "title");
  let isSortedAlpha = true;
  for (let i = 0; i < sorted3.length - 1; i++) {
    if (sorted3[i].title.localeCompare(sorted3[i + 1].title) > 0) {
      isSortedAlpha = false;
      break;
    }
  }
  results.push({
    name: "Merge Sort - Judul A-Z",
    description: "Mengurutkan film berdasarkan judul secara alfabetis",
    expected: "Film terurut A-Z",
    actual: `Film pertama: ${sorted3[0]?.title}, terakhir: ${sorted3[sorted3.length-1]?.title}`,
    passed: isSortedAlpha,
  });

  // Test 9: Scoring - Genre match
  const score1 = calculateRecommendationScore(movies[0], {
    favoriteGenres: ["Action"],
    minRating: 7,
    minYear: 2000,
    maxDuration: 180,
  });
  results.push({
    name: "Scoring - Genre Match",
    description: `Hitung skor ${movies[0].title} dengan preferensi genre Action`,
    expected: "Skor > 50 (genre cocok, rating tinggi)",
    actual: `Skor: ${score1.score}, Alasan: ${score1.reasons.length} items`,
    passed: score1.score > 50,
  });

  // Test 10: Queue - FIFO behavior
  const queue = new RecommendationQueue(3);
  const dummyResult = (id: number) => ({
    movie: movies[id],
    score: 80,
    reasons: ["test"],
  });
  queue.enqueue(dummyResult(0));
  queue.enqueue(dummyResult(1));
  queue.enqueue(dummyResult(2));
  queue.enqueue(dummyResult(3)); // Should remove first
  const queueItems = queue.getAll();
  results.push({
    name: "Queue - FIFO Behavior",
    description: "Enqueue 4 item ke queue kapasitas 3, item pertama harus terhapus",
    expected: "Queue berisi 3 item, item pertama (id=2) bukan yang di-enqueue pertama",
    actual: `Size: ${queue.size()}, Items: [${queueItems.map(i => i.movie.title).join(", ")}]`,
    passed: queue.size() === 3 && queueItems[0].movie.id === movies[1].id,
  });

  return results;
}

export function Testing() {
  const testResults = runTests();
  const passedCount = testResults.filter((t) => t.passed).length;

  return (
    <div className="space-y-6">
      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FlaskConical className="h-5 w-5 text-blue-500" />
            Hasil Pengujian
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-2xl font-bold">
              {passedCount}/{testResults.length}
            </div>
            <div>
              <p className="text-sm font-medium">Test Passed</p>
              <p className="text-xs text-muted-foreground">
                {passedCount === testResults.length
                  ? "Semua pengujian berhasil!"
                  : `${testResults.length - passedCount} test gagal`}
              </p>
            </div>
            <Badge
              variant={passedCount === testResults.length ? "default" : "destructive"}
              className="ml-auto"
            >
              {passedCount === testResults.length ? "ALL PASSED" : "SOME FAILED"}
            </Badge>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-500"
              style={{ width: `${(passedCount / testResults.length) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Test Details */}
      <div className="space-y-3">
        {testResults.map((test, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                {test.passed ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm">{test.name}</h4>
                    <Badge variant={test.passed ? "secondary" : "destructive"} className="text-[10px]">
                      {test.passed ? "PASSED" : "FAILED"}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{test.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded bg-secondary/50">
                      <span className="font-medium">Expected: </span>
                      <span className="text-muted-foreground">{test.expected}</span>
                    </div>
                    <div className="p-2 rounded bg-secondary/50">
                      <span className="font-medium">Actual: </span>
                      <span className="text-muted-foreground">{test.actual}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
