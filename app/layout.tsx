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
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Ramadan Daily",
  },
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

import { Toaster } from "sonner";

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
          href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Outfit:wght@400;500;600;700;800;900&family=Hind+Siliguri:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="apple-touch-icon" href="/icons/moon-128.png" />
      </head>
      <body>
        <Analytics />
        <Toaster position="bottom-center" toastOptions={{
          style: {
            background: 'var(--bg-glass-strong)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-primary)',
            borderRadius: 'var(--radius-lg)',
          }
        }} />
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}

function ServiceWorkerRegister() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
              navigator.serviceWorker.register('/sw.js');
            });
          }
        `,
      }}
    />
  );
}
