"use client";

import { Lang, t } from "@/lib/i18n";

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
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                borderBottom: "1px solid var(--border-subtle)",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    maxWidth: 480,
                    margin: "0 auto",
                    padding: "0 16px",
                }}
            >
                {/* Logo & Name */}
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span
                        className="animate-crescent"
                        style={{ fontSize: 28, lineHeight: 1 }}
                        aria-hidden="true"
                    >
                        🌙
                    </span>
                    <div>
                        <h1
                            style={{
                                fontSize: 18,
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
                                fontSize: 11,
                                color: "var(--text-muted)",
                                fontWeight: 500,
                                letterSpacing: "0.02em",
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

                    {/* Theme Toggle */}
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
                            fontSize: 18,
                            transition: "all 0.3s ease",
                        }}
                    >
                        {theme === "light" ? "🌙" : "☀️"}
                    </button>
                </div>
            </div>
        </header>
    );
}
