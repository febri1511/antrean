"use client";

import { Film, Star, BarChart3, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { movies } from "@/data/movies";
import { calculateStatistics } from "@/lib/algorithms";

export function Statistics() {
  const stats = calculateStatistics(movies);

  const statItems = [
    {
      label: "Total Film",
      value: stats.totalFilm,
      icon: Film,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Rata-rata Rating",
      value: stats.averageRating,
      icon: Star,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      label: "Genre Terbanyak",
      value: stats.topGenre,
      icon: BarChart3,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      label: "Rating Tertinggi",
      value: stats.topRatedMovie ? `${stats.topRatedMovie.title} (${stats.topRatedMovie.rating})` : "-",
      icon: Trophy,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statItems.map((item) => (
        <Card key={item.label}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${item.bgColor}`}>
                <item.icon className={`h-5 w-5 ${item.color}`} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="font-semibold text-sm truncate">{item.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
