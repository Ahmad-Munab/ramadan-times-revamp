"use client";

import { Lang, t } from "@/lib/i18n";

interface LinkItem {
    title_key: string;
    desc_key: string;
    url: string;
    iconType: "quran" | "hadith";
    color: string;
}

const links: LinkItem[] = [
    {
        title_key: "read_quran",
        desc_key: "quran_desc",
        url: "https://quran.com",
        iconType: "quran",
        color: "linear-gradient(135deg, #059669, #047857)",
    },
    {
        title_key: "read_hadith",
        desc_key: "hadith_desc",
        url: "https://sunnah.com",
        iconType: "hadith",
        color: "linear-gradient(135deg, #d97706, #b45309)",
    },
];

function LinkIcon({ type }: { type: "quran" | "hadith" }) {
    if (type === "quran") {
        return (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
        );
    }
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            <line x1="9" y1="7" x2="16" y2="7" />
            <line x1="9" y1="11" x2="16" y2="11" />
            <line x1="9" y1="15" x2="13" y2="15" />
        </svg>
    );
}

interface QuranHadithLinksProps {
    lang: Lang;
}

export default function QuranHadithLinks({ lang }: QuranHadithLinksProps) {
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
                {t("quran_hadith", lang)}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {links.map((link) => (
                    <a
                        key={link.title_key}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-card"
                        style={{
                            padding: "14px 18px",
                            display: "flex",
                            alignItems: "center",
                            gap: 14,
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
                                background: link.color,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                            }}
                        >
                            <LinkIcon type={link.iconType} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <p
                                style={{
                                    fontSize: 14,
                                    fontWeight: 700,
                                    marginBottom: 2,
                                }}
                            >
                                {t(link.title_key, lang)}
                            </p>
                            <p
                                style={{
                                    fontSize: 12,
                                    color: "var(--text-muted)",
                                }}
                            >
                                {t(link.desc_key, lang)}
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
                ))}
            </div>
        </div>
    );
}
