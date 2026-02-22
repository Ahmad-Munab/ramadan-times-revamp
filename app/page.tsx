"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Lang } from "@/lib/i18n";
import {
  getCurrentStatus,
  getRozaNumber,
  getDisplaySchedule,
  getTimeCardStatus,
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
import NotificationBanner from "@/components/NotificationBanner";
import Link from "next/link";
import { localizeTime, t } from "@/lib/i18n";

export default function Home() {
  // ─── State ───
  const [lang, setLang] = useState<Lang>("en");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [selectedDistrict, setSelectedDistrict] = useState<District>(() => {
    const districts = getDistrictsFlat();
    return districts.find((d) => d.district === "Dhaka") ?? districts[0];
  });
  const [azanEnabled, setAzanEnabled] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [lastAzaanTime, setLastAzaanTime] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isAzanPlaying, setIsAzanPlaying] = useState(false);

  // ─── Live Update Timer ───
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 10000); // Check every 10s for smooth transitions
    return () => clearInterval(timer);
  }, []);

  // ─── Hydration & localStorage ───
  useEffect(() => {
    // Load saved preferences
    const savedLang = localStorage.getItem("rb_lang") as Lang | null;
    const savedTheme = localStorage.getItem("rb_theme") as
      | "light"
      | "dark"
      | null;
    const savedDistrict = localStorage.getItem("rb_district");
    const savedAzan = localStorage.getItem("rb_azan_enabled");

    if (savedLang) setLang(savedLang);
    if (savedTheme) setTheme(savedTheme);
    if (savedDistrict) {
      const districts = getDistrictsFlat();
      const found = districts.find((d) => d.district === savedDistrict);
      if (found) setSelectedDistrict(found);
    }
    if (savedAzan !== null) setAzanEnabled(savedAzan === "true");

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

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("rb_azan_enabled", String(azanEnabled));
  }, [azanEnabled, mounted]);

  // ─── Azaan Playback Logic ───
  useEffect(() => {
    if (!mounted || !azanEnabled) return;

    const checkAzaan = () => {
      const bdNow = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" }));
      const currentH = bdNow.getHours();
      const currentM = bdNow.getMinutes();
      const currentTimeStr = `${String(currentH).padStart(2, "0")}:${String(currentM).padStart(2, "0")}`;

      // Get timings for today
      const today = getDisplaySchedule(selectedDistrict.offset);
      if (!today) return;

      const iftarTime = today.adjustedIftar;
      // Sehri end + 2.5 minutes
      const [sh, sm] = today.adjustedSehri.split(":").map(Number);
      const sehriPlusTotal = sh * 60 + sm + 2.5;
      const sph = Math.floor(sehriPlusTotal / 60);
      const spm = Math.floor(sehriPlusTotal % 60);
      const sehriPlusStr = `${String(sph).padStart(2, "0")}:${String(spm).padStart(2, "0")}`;

      if ((currentTimeStr === iftarTime || currentTimeStr === sehriPlusStr) && lastAzaanTime !== currentTimeStr) {
        setLastAzaanTime(currentTimeStr);
        setIsAzanPlaying(true);
        const audio = new Audio("/audio/azaan.mp3");
        audio.play().catch(e => console.error("Azaan playback failed", e));

        // Stop playing indicator after ~3.5 minutes (average duration)
        setTimeout(() => setIsAzanPlaying(false), 3.5 * 60 * 1000);
      }
    };

    const interval = setInterval(checkAzaan, 30000); // Check every 30s
    checkAzaan(); // Initial check

    return () => clearInterval(interval);
  }, [mounted, azanEnabled, selectedDistrict.offset, lastAzaanTime]);

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

  // ─── Derived state (Reactive to currentTime) ───
  const status = getCurrentStatus(selectedDistrict.offset);
  const rozaNumber = getRozaNumber();
  const displaySchedule = getDisplaySchedule(selectedDistrict.offset);
  const timeCardStatus = getTimeCardStatus(selectedDistrict.offset);

  // Azan Nearing Check (5 minutes)
  const azanNearing = useMemo(() => {
    if (!displaySchedule) return null;
    const bdNow = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" }));
    const nowMinutes = bdNow.getHours() * 60 + bdNow.getMinutes();

    // Check for Sehri end
    const [sh, sm] = displaySchedule.adjustedSehri.split(":").map(Number);
    const sehriMinutes = sh * 60 + sm;

    // Check for Iftar
    const [ih, im] = displaySchedule.adjustedIftar.split(":").map(Number);
    const iftarMinutes = ih * 60 + im;

    if (sehriMinutes - nowMinutes > 0 && sehriMinutes - nowMinutes <= 5) {
      return { type: "sehri", minutes: sehriMinutes - nowMinutes };
    }
    if (iftarMinutes - nowMinutes > 0 && iftarMinutes - nowMinutes <= 5) {
      return { type: "iftar", minutes: iftarMinutes - nowMinutes };
    }
    return null;
  }, [displaySchedule, currentTime]);

  // Use fallback times if not a Ramadan day
  const sehriTime = displaySchedule?.adjustedSehri ?? "05:12";
  const iftarTime = displaySchedule?.adjustedIftar ?? "17:58";

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
        azanEnabled={azanEnabled}
        setAzanEnabled={setAzanEnabled}
      />

      <NotificationBanner lang={lang} />

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
          {/* Azan Proximity Indicator */}
          {azanNearing && !isAzanPlaying && (
            <div
              className="animate-fade-in-up"
              style={{
                background: "linear-gradient(135deg, #059669, #047857)",
                borderRadius: "var(--radius-xl)",
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                gap: 16,
                boxShadow: "0 10px 25px rgba(5, 150, 105, 0.3)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div style={{ fontSize: 24, animation: "bounce 2s infinite" }}>⏳</div>
              <div style={{ flex: 1 }}>
                <p style={{ color: "white", fontWeight: 800, fontSize: 13, marginBottom: 2 }}>
                  {azanNearing.type === "sehri"
                    ? (lang === "en" ? "Azan nearing (Sehri end)" : "আজান সন্নিকটে (সেহরীর শেষ সময়)")
                    : (lang === "en" ? "Azan nearing (Iftar)" : "আজান সন্নিকটে (ইফতার)")}
                </p>
                <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 11, fontWeight: 600 }}>
                  {lang === "en"
                    ? `Don't close the site to hear the Azan automatically (${azanNearing.minutes}m left)`
                    : `স্বয়ংক্রিয়ভাবে আজান শুনতে সাইটটি বন্ধ করবেন না (${azanNearing.minutes} মিনিট বাকি)`}
                </p>
              </div>
            </div>
          )}

          {/* Azan Playing Indicator */}
          {isAzanPlaying && (
            <div
              className="animate-pulse"
              style={{
                background: "linear-gradient(135deg, #059669, #065f46)",
                borderRadius: "var(--radius-xl)",
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                gap: 16,
                boxShadow: "0 10px 25px rgba(5, 150, 105, 0.4)",
                border: "2px solid #34d399",
              }}
            >
              <div style={{ fontSize: 24 }}>🔊</div>
              <div style={{ flex: 1 }}>
                <p style={{ color: "white", fontWeight: 800, fontSize: 13, marginBottom: 2 }}>
                  {lang === "en" ? "Azan is playing..." : "আজান চলছে..."}
                </p>
                <div style={{ display: "flex", gap: 3 }}>
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} style={{ width: 3, height: 12, background: "white", borderRadius: 2, animation: `music-bar 0.8s ease-in-out infinite alternate ${i * 0.1}s` }}></div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 1. District Selector */}
          <section className="animate-fade-in-up" style={{ opacity: 0, animationDelay: "0.05s", animationFillMode: "forwards", position: "relative", zIndex: 100 }}>
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
              status={timeCardStatus}
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

          {/* 8. Additional Actions (Quran Radio & Calendar) */}
          <section
            className="animate-fade-in-up"
            style={{
              opacity: 0,
              animationDelay: "0.7s",
              animationFillMode: "forwards",
              display: "flex",
              flexDirection: "column",
              gap: 12
            }}
          >
            <a
              href="https://quran.com/radio"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card hover-scale"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "14px 18px",
                textDecoration: "none",
                color: "var(--text-primary)",
                transition: "all 0.2s ease",
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "var(--radius-md)",
                  background: "linear-gradient(135deg, #059669, #047857)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontSize: 20,
                  boxShadow: "0 4px 12px rgba(5, 150, 105, 0.3)",
                }}
              >
                🔉
              </div>
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    marginBottom: 2,
                  }}
                >
                  {t("listen_quran", lang)}
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: "var(--text-muted)",
                  }}
                >
                  {lang === "en" ? "Listen to live Quran radio" : "লাইভ কুরআন রেডিও শুনুন"}
                </p>
              </div>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: "var(--text-muted)", opacity: 0.5, flexShrink: 0 }}
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </a>

            <a
              href="/images/ramadan-calendar-dhaka.jpg"
              download="Ramadan-Calendar-1447.jpg"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                padding: "18px",
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                borderRadius: "var(--radius-xl)",
                color: "var(--text-primary)",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: 14,
                transition: "all 0.3s ease",
              }}
              className="hover-bg-subtle"
            >
              <div style={{ fontSize: 20 }}>📅</div>
              {t("download_calendar", lang)}
            </a>
          </section>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 40, marginBottom: -10 }}>
          <Link
            href="/about"
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "var(--text-muted)",
              textDecoration: "none",
              background: "var(--bg-card)",
              padding: "6px 16px",
              borderRadius: "var(--radius-full)",
              border: "1px solid var(--border-subtle)",
              transition: "all 0.2s ease",
            }}
            className="hover-bg-subtle"
          >
            {t("about_app", lang)}
          </Link>
          <Link
            href="/updates"
            style={{
              fontSize: 12,
              color: "var(--text-muted)",
              textDecoration: "none",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 4
            }}
            className="hover-text-accent"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
            {lang === "en" ? "Updates History" : "আপডেট হিস্টোরি"}
          </Link>
        </div>

        <Footer lang={lang} />
      </main>
    </>
  );
}
