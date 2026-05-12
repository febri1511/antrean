"use client";

import { Star, Clock, TrendingUp, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Movie } from "@/data/movies";

interface MovieCardProps {
  movie: Movie;
  score?: number;
  reasons?: string[];
}

export function MovieCard({ movie, score, reasons }: MovieCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Poster Gradient Placeholder */}
      <div className={`h-40 bg-gradient-to-br ${movie.posterUrl} relative`}>
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <span className="text-white font-bold text-lg text-center px-4 drop-shadow-lg">
            {movie.title}
          </span>
        </div>
        {score !== undefined && (
          <div className="absolute top-2 right-2 bg-white dark:bg-gray-900 rounded-full px-2 py-1 text-xs font-bold shadow">
            <span className="text-primary">{score}%</span>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-sm mb-2 line-clamp-1">{movie.title}</h3>

        {/* Genres */}
        <div className="flex flex-wrap gap-1 mb-3">
          {movie.genre.map((g) => (
            <Badge key={g} variant="secondary" className="text-[10px] px-1.5 py-0">
              {g}
            </Badge>
          ))}
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 text-yellow-500" />
            <span>{movie.rating}/10</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{movie.year}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{movie.duration} menit</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            <span>{movie.popularity}%</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
          {movie.description}
        </p>

        {/* Recommendation Reasons */}
        {reasons && reasons.length > 0 && (
          <div className="mt-3 pt-3 border-t">
            <p className="text-[10px] font-semibold text-primary mb-1">Alasan Rekomendasi:</p>
            <ul className="space-y-0.5">
              {reasons.slice(0, 3).map((reason, idx) => (
                <li key={idx} className="text-[10px] text-muted-foreground">
                  • {reason}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
