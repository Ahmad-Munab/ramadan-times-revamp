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
            }}
        >
            {/* Header */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                style={{
                    width: "100%",
                    padding: "14px 18px",
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
                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                        color: "var(--text-muted)",
                        transform: isExpanded ? "rotate(180deg)" : "rotate(0)",
                        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>

            {/* Smooth Accordion Content */}
            <div
                style={{
                    display: "grid",
                    gridTemplateRows: isExpanded ? "1fr" : "0fr",
                    opacity: isExpanded ? 1 : 0,
                    transition: "grid-template-rows 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease",
                }}
            >
                <div style={{ overflow: "hidden" }}>
                    <div style={{ padding: "0 18px 18px" }}>
                        {/* Arabic */}
                        <p
                            className="text-arabic"
                            style={{
                                fontSize: 22,
                                color: "var(--accent)",
                                marginBottom: 14,
                                padding: "14px",
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
                </div>
            </div>
        </div>
    );
}

export default function DuaCard({ lang }: DuaCardProps) {
    return (
        <div>
            <h2
                style={{
                    fontSize: 15,
                    fontWeight: 800,
                    color: "var(--text-primary)",
                    marginBottom: 10,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                }}
            >
                {t("duas", lang)}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <SingleDua dua={iftarDua} titleKey="iftar_dua" lang={lang} />
                <SingleDua dua={sehriDua} titleKey="sehri_dua" lang={lang} />
            </div>
        </div>
    );
}
