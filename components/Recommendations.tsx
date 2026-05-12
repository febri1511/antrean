"use client";

import { useState, useCallback } from "react";
import { Sparkles, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MovieCard } from "@/components/MovieCard";
import { movies, ALL_GENRES, UserPreferences, RecommendationResult } from "@/data/movies";
import { generateRecommendations } from "@/lib/algorithms";
import { RecommendationQueue } from "@/lib/queue";

// Inisialisasi Queue untuk riwayat rekomendasi (kapasitas 5)
const historyQueue = new RecommendationQueue(5);

export function Recommendations() {
  const [favoriteGenres, setFavoriteGenres] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(7);
  const [minYear, setMinYear] = useState(2010);
  const [maxDuration, setMaxDuration] = useState(180);
  const [results, setResults] = useState<RecommendationResult[]>([]);
  const [history, setHistory] = useState<RecommendationResult[]>([]);
  const [hasGenerated, setHasGenerated] = useState(false);

  const toggleGenre = (genre: string) => {
    setFavoriteGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleGenerate = useCallback(() => {
    const preferences: UserPreferences = {
      favoriteGenres,
      minRating,
      minYear,
      maxDuration,
    };

    // Generate rekomendasi menggunakan scoring algorithm
    const recommendations = generateRecommendations(movies, preferences, 10);
    setResults(recommendations);
    setHasGenerated(true);

    // Simpan ke Queue riwayat (FIFO - yang lama keluar otomatis)
    if (recommendations.length > 0) {
      historyQueue.enqueue(recommendations[0]);
      setHistory(historyQueue.getAll());
    }
  }, [favoriteGenres, minRating, minYear, maxDuration]);

  return (
    <div className="space-y-6">
      {/* Preferences Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            Preferensi Pengguna
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Genre Selection */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Genre Favorit (pilih satu atau lebih)
            </label>
            <div className="flex flex-wrap gap-2">
              {ALL_GENRES.map((genre) => (
                <Badge
                  key={genre}
                  variant={favoriteGenres.includes(genre) ? "default" : "outline"}
                  className="cursor-pointer select-none"
                  onClick={() => toggleGenre(genre)}
                >
                  {genre}
                </Badge>
              ))}
            </div>
          </div>

          {/* Rating Slider */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Rating Minimum: {minRating}
            </label>
            <Slider min={0} max={10} step={0.5} value={minRating} onChange={setMinRating} />
          </div>

          {/* Year Slider */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Tahun Minimal: {minYear}
            </label>
            <Slider min={1970} max={2024} step={1} value={minYear} onChange={setMinYear} />
          </div>

          {/* Duration Slider */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Durasi Maksimal: {maxDuration} menit
            </label>
            <Slider min={60} max={240} step={10} value={maxDuration} onChange={setMaxDuration} />
          </div>

          {/* Generate Button */}
          <Button onClick={handleGenerate} className="w-full">
            <Sparkles className="h-4 w-4 mr-2" />
            Generate Rekomendasi
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {hasGenerated && (
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Hasil Rekomendasi ({results.length} film)
          </h3>
          {results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {results.map((result) => (
                <MovieCard
                  key={result.movie.id}
                  movie={result.movie}
                  score={result.score}
                  reasons={result.reasons}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>Tidak ada film yang sesuai dengan preferensi Anda.</p>
              <p className="text-sm">Coba ubah kriteria preferensi.</p>
            </div>
          )}
        </div>
      )}

      {/* History Queue */}
      {history.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <History className="h-5 w-5" />
              Riwayat Rekomendasi Teratas (Queue - FIFO, maks {historyQueue.getCapacity()})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {history.map((item, idx) => (
                <div
                  key={`${item.movie.id}-${idx}`}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">#{idx + 1}</span>
                    <span className="text-sm font-medium">{item.movie.title}</span>
                  </div>
                  <Badge variant="secondary">Skor: {item.score}%</Badge>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Queue menggunakan prinsip FIFO. Kapasitas: {historyQueue.getCapacity()}, 
              Terisi: {historyQueue.size()}. Ketika penuh, rekomendasi terlama otomatis dihapus.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
