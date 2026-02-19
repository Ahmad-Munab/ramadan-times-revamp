"use client";

import { useState, useEffect, useCallback } from "react";
import { Lang } from "@/lib/i18n";
import {
  getCurrentStatus,
  getRozaNumber,
  getTodaySchedule,
  getDistrictsFlat,
  District,
} from "@/lib/timings";
import Header from "@/components/Header";
import StatusBanner from "@/components/StatusBanner";
import CountdownTimer from "@/components/CountdownTimer";
import TimeCard from "@/components/TimeCard";
import DistrictSelector from "@/components/DistrictSelector";
import DuaCard from "@/components/DuaCard";
import QuranHadithLinks from "@/components/QuranHadithLinks";
import ScheduleTable from "@/components/ScheduleTable";
import Footer from "@/components/Footer";

export default function Home() {
  // ─── State ───
  const [lang, setLang] = useState<Lang>("bn");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [selectedDistrict, setSelectedDistrict] = useState<District>(() => {
    const districts = getDistrictsFlat();
    return districts.find((d) => d.district === "Dhaka") ?? districts[0];
  });
  const [mounted, setMounted] = useState(false);

  // ─── Hydration & localStorage ───
  useEffect(() => {
    // Load saved preferences
    const savedLang = localStorage.getItem("rb_lang") as Lang | null;
    const savedTheme = localStorage.getItem("rb_theme") as
      | "light"
      | "dark"
      | null;
    const savedDistrict = localStorage.getItem("rb_district");

    if (savedLang) setLang(savedLang);
    if (savedTheme) setTheme(savedTheme);
    if (savedDistrict) {
      const districts = getDistrictsFlat();
      const found = districts.find((d) => d.district === savedDistrict);
      if (found) setSelectedDistrict(found);
    }

    setMounted(true);
  }, []);

  // ─── Persist preferences ───
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("rb_lang", lang);
  }, [lang, mounted]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("rb_theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("rb_district", selectedDistrict.district);
  }, [selectedDistrict, mounted]);

  // ─── Handlers ───
  const handleSetLang = useCallback((l: Lang) => setLang(l), []);
  const handleSetTheme = useCallback(
    (t: "light" | "dark") => setTheme(t),
    []
  );
  const handleSelectDistrict = useCallback(
    (d: District) => setSelectedDistrict(d),
    []
  );

  // ─── Derived state ───
  const status = getCurrentStatus(selectedDistrict.offset);
  const rozaNumber = getRozaNumber();
  const todaySchedule = getTodaySchedule(selectedDistrict.offset);

  // Use fallback times if not a Ramadan day (use day 1 for preview)
  const sehriTime = todaySchedule?.adjustedSehri ?? "05:12";
  const iftarTime = todaySchedule?.adjustedIftar ?? "17:58";

  // ─── Prevent flash before hydration ───
  if (!mounted) {
    return (
      <div
        style={{
          minHeight: "100dvh",
          background: "#0c1222",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            textAlign: "center",
            animation: "fadeIn 0.5s ease-out",
          }}
        >
          <span style={{ fontSize: 44 }}>🌙</span>
          <p
            style={{
              color: "#a7f3d0",
              marginTop: 12,
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.02em",
            }}
          >
            Ramadan Daily
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header
        lang={lang}
        setLang={handleSetLang}
        theme={theme}
        setTheme={handleSetTheme}
      />

      <main className="app-container" style={{ paddingBottom: 32 }}>
        {/* Section gaps via vertical flex */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            paddingTop: 24,
          }}
        >
          {/* 1. District Selector */}
          <section className="animate-fade-in-up" style={{ opacity: 0, animationDelay: "0.05s", animationFillMode: "forwards" }}>
            <DistrictSelector
              selectedDistrict={selectedDistrict.district}
              onSelect={handleSelectDistrict}
              lang={lang}
            />
          </section>

          {/* 2. Status Banner */}
          <section className="animate-fade-in-up" style={{ opacity: 0, animationDelay: "0.1s", animationFillMode: "forwards" }}>
            <StatusBanner
              status={status}
              rozaNumber={rozaNumber}
              lang={lang}
            />
          </section>

          {/* 3. Countdown Timer */}
          <section className="animate-fade-in-up" style={{ opacity: 0, animationDelay: "0.2s", animationFillMode: "forwards" }}>
            <CountdownTimer
              offsetMinutes={selectedDistrict.offset}
              lang={lang}
            />
          </section>

          {/* 4. Time Cards */}
          <section className="animate-fade-in-up" style={{ opacity: 0, animationDelay: "0.3s", animationFillMode: "forwards" }}>
            <TimeCard
              sehriTime={sehriTime}
              iftarTime={iftarTime}
              lang={lang}
            />
          </section>

          {/* 5. Duas */}
          <section className="animate-fade-in-up" style={{ opacity: 0, animationDelay: "0.4s", animationFillMode: "forwards" }}>
            <DuaCard lang={lang} />
          </section>

          {/* 6. Schedule Table */}
          <section className="animate-fade-in-up" style={{ opacity: 0, animationDelay: "0.5s", animationFillMode: "forwards" }}>
            <ScheduleTable
              offsetMinutes={selectedDistrict.offset}
              lang={lang}
            />
          </section>

          {/* 7. Quran & Hadith Links */}
          <section className="animate-fade-in-up" style={{ opacity: 0, animationDelay: "0.6s", animationFillMode: "forwards" }}>
            <QuranHadithLinks lang={lang} />
          </section>
        </div>

        <Footer lang={lang} />
      </main>
    </>
  );
}
