import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";

export const metadata: Metadata = {
  title: "Ramadan Daily — রমজান ডেইলি | Sehri & Iftar Times Bangladesh 2026",
  description:
    "Your daily Ramadan companion for Bangladesh — accurate Sehri & Iftar times for all 64 districts, live countdown, duas, Azan notification. সেহরি ও ইফতারের সময়সূচি ২০২৬।",
  keywords: [
    "Ramadan",
    "Sehri times",
    "Iftar times",
    "Bangladesh",
    "রমজান",
    "সেহরি",
    "ইফতার",
    "2026",
    "1447",
    "Ramadan schedule",
    "Islamic Foundation Bangladesh",
    "prayer times",
  ],
  openGraph: {
    title: "Ramadan Daily — Sehri & Iftar Times Bangladesh 2026",
    description:
      "Accurate Sehri & Iftar times for all 64 districts of Bangladesh with live countdown, duas, and Azan notification.",
    type: "website",
    locale: "en_BD",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f0fdf4" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1222" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=DM+Sans:wght@400;500;600;700;800;900&family=Noto+Sans+Bengali:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body><Analytics />{children}</body>
    </html>
  );
}
