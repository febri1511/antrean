"use client";

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { MovieCard } from "@/components/MovieCard";
import { movies, ALL_GENRES } from "@/data/movies";
import { linearSearch, filterMovies, sortMovies } from "@/lib/algorithms";

export function FilmList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("Semua");
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState<"rating" | "year" | "popularity" | "title">("rating");

  // Step 1: Linear Search berdasarkan judul - O(n)
  const searchResults = linearSearch(movies, searchQuery);

  // Step 2: Filter berdasarkan genre dan rating - O(n)
  const filteredResults = filterMovies(searchResults, selectedGenre, minRating, 0, 0);

  // Step 3: Sort menggunakan Merge Sort - O(n log n)
  const sortedResults = sortMovies(filteredResults, sortBy);

  return (
    <div>
      {/* Search & Filter Controls */}
      <div className="space-y-4 mb-6">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari film berdasarkan judul... (Linear Search)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label className="text-xs text-muted-foreground mb-1 block">
              <SlidersHorizontal className="h-3 w-3 inline mr-1" />
              Genre
            </label>
            <Select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <option value="Semua">Semua Genre</option>
              {ALL_GENRES.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex-1">
            <label className="text-xs text-muted-foreground mb-1 block">
              Rating Minimum: {minRating}
            </label>
            <Slider
              min={0}
              max={10}
              step={0.5}
              value={minRating}
              onChange={setMinRating}
            />
          </div>

          <div className="flex-1">
            <label className="text-xs text-muted-foreground mb-1 block">Urutkan</label>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            >
              <option value="rating">Rating Tertinggi</option>
              <option value="year">Tahun Terbaru</option>
              <option value="popularity">Popularitas Tertinggi</option>
              <option value="title">Judul A-Z</option>
            </Select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <p className="text-sm text-muted-foreground mb-4">
        Menampilkan {sortedResults.length} dari {movies.length} film
      </p>

      {/* Movie Grid */}
      {sortedResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedResults.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg font-medium">Tidak ada film ditemukan</p>
          <p className="text-sm">Coba ubah filter atau kata kunci pencarian</p>
        </div>
      )}
    </div>
  );
}
