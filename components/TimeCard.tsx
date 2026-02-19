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
                <div style={{ fontSize: 28, marginBottom: 8 }}>🌃</div>
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
                        fontWeight: 900,
                        color: "var(--text-primary)",
                        letterSpacing: "-0.02em",
                        lineHeight: 1,
                    }}
                >
                    {localizeTime(sehriTime, lang)}
                </p>
                <p
                    style={{
                        fontSize: 10,
                        color: "var(--text-muted)",
                        marginTop: 6,
                        fontWeight: 500,
                    }}
                >
                    {t("sehri_ends_at", lang)}
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
                <div style={{ fontSize: 28, marginBottom: 8 }}>🌅</div>
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
                        fontWeight: 900,
                        color: "var(--text-primary)",
                        letterSpacing: "-0.02em",
                        lineHeight: 1,
                    }}
                >
                    {localizeTime(iftarTime, lang)}
                </p>
                <p
                    style={{
                        fontSize: 10,
                        color: "var(--text-muted)",
                        marginTop: 6,
                        fontWeight: 500,
                    }}
                >
                    {t("iftar_at", lang)}
                </p>
            </div>
        </div>
    );
}
