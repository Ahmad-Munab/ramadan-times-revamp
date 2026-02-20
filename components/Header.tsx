"use client";

import { Lang, t } from "@/lib/i18n";
import { DotLottiePlayer } from "@dotlottie/react-player";

interface HeaderProps {
    lang: Lang;
    setLang: (lang: Lang) => void;
    theme: "light" | "dark";
    setTheme: (theme: "light" | "dark") => void;
}

export default function Header({ lang, setLang, theme, setTheme }: HeaderProps) {
    return (
        <header
            style={{
                position: "sticky",
                top: 0,
                zIndex: 50,
                padding: "12px 0",
                background: "var(--bg-glass-strong)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderBottom: "1px solid var(--border-subtle)",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    maxWidth: 520,
                    margin: "0 auto",
                    padding: "0 16px",
                }}
            >
                {/* Logo & Name */}
                <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
                    <div className="w-10 h-10 sm:w-14 sm:h-14">
                        <DotLottiePlayer
                            src="/Icon - Ramadan.lottie"
                            autoplay
                            loop
                            className="w-full h-full"
                        />
                    </div>
                    <div>
                        <h1
                            style={{
                                fontSize: 17,
                                fontWeight: 800,
                                letterSpacing: "-0.02em",
                                color: "var(--text-primary)",
                                lineHeight: 1.2,
                            }}
                        >
                            {t("app_name", lang)}
                        </h1>
                        <p
                            style={{
                                fontSize: 10,
                                color: "var(--text-muted)",
                                fontWeight: 500,
                                letterSpacing: "0.03em",
                            }}
                        >
                            {t("app_tagline", lang)}
                        </p>
                    </div>
                </div>

                {/* Controls */}
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    {/* Language Toggle */}
                    <button
                        onClick={() => setLang(lang === "en" ? "bn" : "en")}
                        aria-label="Toggle language"
                        style={{
                            padding: "6px 12px",
                            borderRadius: "var(--radius-full)",
                            border: "1px solid var(--border-color)",
                            background: "var(--bg-card)",
                            color: "var(--text-primary)",
                            fontSize: 12,
                            fontWeight: 700,
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            letterSpacing: "0.01em",
                        }}
                    >
                        {lang === "en" ? "বাং" : "EN"}
                    </button>

                    {/* Theme Toggle — distinct SVG icon, NOT the logo moon emoji */}
                    <button
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                        aria-label="Toggle theme"
                        style={{
                            width: 36,
                            height: 36,
                            borderRadius: "var(--radius-full)",
                            border: "1px solid var(--border-color)",
                            background: "var(--bg-card)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                        }}
                    >
                        {theme === "light" ? (
                            /* Half-moon / crescent SVG — different from the emoji logo */
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-primary)" }}>
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                            </svg>
                        ) : (
                            /* Sun SVG for dark mode */
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--gold)" }}>
                                <circle cx="12" cy="12" r="5" />
                                <line x1="12" y1="1" x2="12" y2="3" />
                                <line x1="12" y1="21" x2="12" y2="23" />
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                                <line x1="1" y1="12" x2="3" y2="12" />
                                <line x1="21" y1="12" x2="23" y2="12" />
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
}
