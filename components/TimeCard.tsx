"use client";

import { Lang, t, localizeTime } from "@/lib/i18n";

interface TimeCardProps {
    sehriTime: string;
    iftarTime: string;
    lang: Lang;
}

export default function TimeCard({ sehriTime, iftarTime, lang }: TimeCardProps) {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
            }}
        >
            {/* Sehri Card */}
            <div
                className="glass-card"
                style={{
                    padding: "20px 16px",
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Subtle top accent */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 3,
                        background: "linear-gradient(90deg, #818cf8, #a78bfa)",
                        borderRadius: "var(--radius-lg) var(--radius-lg) 0 0",
                    }}
                />
                {/* Moon SVG icon for Sehri */}
                <div style={{ marginBottom: 8, display: "flex", justifyContent: "center" }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                </div>
                <p
                    style={{
                        fontSize: 11,
                        color: "var(--text-muted)",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        marginBottom: 4,
                    }}
                >
                    {t("sehri", lang)}
                </p>
                <p
                    style={{
                        fontSize: 24,
                        fontWeight: 800,
                        color: "var(--text-primary)",
                        letterSpacing: "-0.02em",
                        lineHeight: 1,
                    }}
                >
                    {localizeTime(sehriTime, lang)}
                </p>

            </div>

            {/* Iftar Card */}
            <div
                className="glass-card"
                style={{
                    padding: "20px 16px",
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Subtle top accent */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 3,
                        background: "linear-gradient(90deg, #f59e0b, #fb923c)",
                        borderRadius: "var(--radius-lg) var(--radius-lg) 0 0",
                    }}
                />
                {/* Sunset SVG icon for Iftar */}
                <div style={{ marginBottom: 8, display: "flex", justifyContent: "center" }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 18a5 5 0 0 0-10 0" />
                        <line x1="12" y1="9" x2="12" y2="2" />
                        <line x1="4.22" y1="10.22" x2="5.64" y2="11.64" />
                        <line x1="1" y1="18" x2="3" y2="18" />
                        <line x1="21" y1="18" x2="23" y2="18" />
                        <line x1="18.36" y1="11.64" x2="19.78" y2="10.22" />
                        <line x1="23" y1="22" x2="1" y2="22" />
                        <polyline points="16 5 12 9 8 5" />
                    </svg>
                </div>
                <p
                    style={{
                        fontSize: 11,
                        color: "var(--text-muted)",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        marginBottom: 4,
                    }}
                >
                    {t("iftar", lang)}
                </p>
                <p
                    style={{
                        fontSize: 24,
                        fontWeight: 800,
                        color: "var(--text-primary)",
                        letterSpacing: "-0.02em",
                        lineHeight: 1,
                    }}
                >
                    {localizeTime(iftarTime, lang)}
                </p>
            </div>
        </div>
    );
}
