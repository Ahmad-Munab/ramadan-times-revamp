"use client";

import { Lang, t, localizeTime } from "@/lib/i18n";
import type { TimeCardStatusResult } from "@/lib/timings";

interface TimeCardProps {
    sehriTime: string;
    iftarTime: string;
    lang: Lang;
    status: TimeCardStatusResult;
}

export default function TimeCard({ sehriTime, iftarTime, lang, status }: TimeCardProps) {
    const badgeStyle: React.CSSProperties = {
        fontSize: 10,
        fontWeight: 700,
        padding: "2px 6px",
        borderRadius: 6,
        marginLeft: 4,
        display: "inline-block",
        verticalAlign: "middle",
        lineHeight: 1.3,
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
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
                        opacity: status.sehriStatus === "done" ? 0.65 : 1,
                        transition: "opacity 0.3s ease",
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
                            background: status.sehriStatus === "done"
                                ? "linear-gradient(90deg, #6b7280, #9ca3af)"
                                : "linear-gradient(90deg, #818cf8, #a78bfa)",
                            borderRadius: "var(--radius-lg) var(--radius-lg) 0 0",
                        }}
                    />
                    {/* Moon SVG icon for Sehri */}
                    <div style={{ marginBottom: 8, display: "flex", justifyContent: "center" }}>
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={status.sehriStatus === "done" ? "#9ca3af" : "#818cf8"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexWrap: "wrap",
                            gap: 2,
                        }}
                    >
                        <span>{t("sehri", lang)}</span>
                        {status.sehriStatus === "done" && (
                            <span
                                style={{
                                    ...badgeStyle,
                                    background: "rgba(239, 68, 68, 0.15)",
                                    color: "#ef4444",
                                }}
                            >
                                {t("sehri_done", lang)}
                            </span>
                        )}
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
                            background: status.iftarStatus === "ongoing"
                                ? "linear-gradient(90deg, #22c55e, #4ade80)"
                                : "linear-gradient(90deg, #f59e0b, #fb923c)",
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
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexWrap: "wrap",
                            gap: 2,
                        }}
                    >
                        <span>{t("iftar", lang)}</span>
                        {status.iftarStatus === "ongoing" && (
                            <span
                                style={{
                                    ...badgeStyle,
                                    background: "rgba(34, 197, 94, 0.15)",
                                    color: "#22c55e",
                                }}
                            >
                                {t("iftar_ongoing", lang)}
                            </span>
                        )}
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

            {/* Prayer Reminder Banner */}
            {status.showPrayerReminder && (
                <div
                    className="glass-card animate-breathe"
                    style={{
                        padding: "14px 18px",
                        textAlign: "center",
                        background: "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(167,139,250,0.12))",
                        border: "1px solid rgba(99,102,241,0.2)",
                    }}
                >
                    <p
                        style={{
                            fontSize: 14,
                            fontWeight: 700,
                            color: "var(--accent)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 8,
                        }}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                        </svg>
                        {t("prayer_reminder", lang)}
                    </p>
                </div>
            )}
        </div>
    );
}
