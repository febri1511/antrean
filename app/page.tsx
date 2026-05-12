"use client";

import { useState } from "react";
import { Film, Sparkles, Code2, FlaskConical } from "lucide-react";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { Statistics } from "@/components/Statistics";
import { FilmList } from "@/components/FilmList";
import { Recommendations } from "@/components/Recommendations";
import { AlgorithmAnalysis } from "@/components/AlgorithmAnalysis";
import { Testing } from "@/components/Testing";

type TabType = "films" | "recommendations" | "algorithm" | "testing";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabType>("films");

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: "films", label: "Semua Film", icon: <Film className="h-4 w-4" /> },
    { id: "recommendations", label: "Rekomendasi", icon: <Sparkles className="h-4 w-4" /> },
    { id: "algorithm", label: "Analisis Algoritma", icon: <Code2 className="h-4 w-4" /> },
    { id: "testing", label: "Pengujian", icon: <FlaskConical className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Film className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">CineMatch</h1>
              <p className="text-xs text-muted-foreground">Sistem Rekomendasi Film</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-xs text-muted-foreground px-2 py-1 rounded bg-secondary">
              Proyek Akhir SDA
            </span>
            <DarkModeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Statistics */}
        <Statistics />

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-1 p-1 rounded-lg bg-secondary/50">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "films" && <FilmList />}
          {activeTab === "recommendations" && <Recommendations />}
          {activeTab === "algorithm" && <AlgorithmAnalysis />}
          {activeTab === "testing" && <Testing />}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p className="font-medium">CineMatch - Sistem Rekomendasi Film Sederhana</p>
          <p className="mt-1">Proyek Akhir Mata Kuliah Struktur Data dan Algoritma</p>
          <p className="mt-1 text-xs">
            Dibuat dengan Next.js, TypeScript, Tailwind CSS & Shadcn UI
          </p>
        </div>
      </footer>
    </div>
  );
}
