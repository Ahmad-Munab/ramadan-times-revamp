"use client";

import { useState } from "react";
import { Lang, t } from "@/lib/i18n";
import { Dua, sehriDua, iftarDua } from "@/lib/duas";

interface DuaCardProps {
    lang: Lang;
}

function SingleDua({
    dua,
    titleKey,
    lang,
}: {
    dua: Dua;
    titleKey: string;
    lang: Lang;
}) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div
            className="glass-card"
            style={{
                overflow: "hidden",
                transition: "all 0.3s ease",
            }}
        >
            {/* Header */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                style={{
                    width: "100%",
                    padding: "16px 20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    color: "var(--text-primary)",
                    fontFamily: "inherit",
                }}
            >
                <span
                    style={{
                        fontSize: 14,
                        fontWeight: 700,
                    }}
                >
                    {t(titleKey, lang)}
                </span>
                <span
                    style={{
                        transform: isExpanded ? "rotate(180deg)" : "rotate(0)",
                        transition: "transform 0.3s ease",
                        fontSize: 14,
                        color: "var(--text-muted)",
                    }}
                >
                    ▾
                </span>
            </button>

            {/* Content */}
            {isExpanded && (
                <div
                    className="animate-fade-in"
                    style={{
                        padding: "0 20px 20px",
                    }}
                >
                    {/* Arabic */}
                    <p
                        className="text-arabic"
                        style={{
                            fontSize: 22,
                            color: "var(--accent)",
                            marginBottom: 16,
                            padding: "16px",
                            background: "var(--bg-secondary)",
                            borderRadius: "var(--radius-md)",
                            textAlign: "right",
                            lineHeight: 2.2,
                        }}
                    >
                        {dua.arabic}
                    </p>

                    {/* Transliteration */}
                    <div style={{ marginBottom: 12 }}>
                        <p
                            style={{
                                fontSize: 10,
                                fontWeight: 700,
                                color: "var(--text-muted)",
                                textTransform: "uppercase",
                                letterSpacing: "0.1em",
                                marginBottom: 4,
                            }}
                        >
                            {t("transliteration", lang)}
                        </p>
                        <p
                            style={{
                                fontSize: 13,
                                color: "var(--text-secondary)",
                                fontStyle: "italic",
                                lineHeight: 1.6,
                            }}
                        >
                            {dua.transliteration}
                        </p>
                    </div>

                    {/* Meaning */}
                    <div>
                        <p
                            style={{
                                fontSize: 10,
                                fontWeight: 700,
                                color: "var(--text-muted)",
                                textTransform: "uppercase",
                                letterSpacing: "0.1em",
                                marginBottom: 4,
                            }}
                        >
                            {t("meaning", lang)}
                        </p>
                        <p
                            style={{
                                fontSize: 13,
                                color: "var(--text-secondary)",
                                lineHeight: 1.6,
                            }}
                        >
                            {lang === "en" ? dua.meaning_en : dua.meaning_bn}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function DuaCard({ lang }: DuaCardProps) {
    return (
        <div>
            <h2
                style={{
                    fontSize: 16,
                    fontWeight: 800,
                    color: "var(--text-primary)",
                    marginBottom: 12,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                }}
            >
                <span>🤲</span>
                {t("duas", lang)}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <SingleDua dua={sehriDua} titleKey="sehri_dua" lang={lang} />
                <SingleDua dua={iftarDua} titleKey="iftar_dua" lang={lang} />
            </div>
        </div>
    );
}
