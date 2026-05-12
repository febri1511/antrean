import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sistem Rekomendasi Film | Proyek Akhir Struktur Data & Algoritma",
  description:
    "Aplikasi web sistem rekomendasi film sederhana menggunakan struktur data dan algoritma. Proyek akhir mata kuliah Struktur Data dan Algoritma.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
