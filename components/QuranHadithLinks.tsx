"use client";

import { Lang, t } from "@/lib/i18n";

interface LinkItem {
    title_key: string;
    desc_key: string;
    url: string;
    icon: string;
    color: string;
}

const links: LinkItem[] = [
    {
        title_key: "read_quran",
        desc_key: "quran_desc",
        url: "https://quran.com",
        icon: "📖",
        color: "linear-gradient(135deg, #059669, #047857)",
    },
    {
        title_key: "read_hadith",
        desc_key: "hadith_desc",
        url: "https://sunnah.com",
        icon: "📚",
        color: "linear-gradient(135deg, #d97706, #b45309)",
    },
];

interface QuranHadithLinksProps {
    lang: Lang;
}

export default function QuranHadithLinks({ lang }: QuranHadithLinksProps) {
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
                <span>📖</span>
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
                            padding: "16px 20px",
                            display: "flex",
                            alignItems: "center",
                            gap: 16,
                            textDecoration: "none",
                            color: "var(--text-primary)",
                            transition: "all 0.2s ease",
                        }}
                    >
                        <div
                            style={{
                                width: 44,
                                height: 44,
                                borderRadius: "var(--radius-md)",
                                background: link.color,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 22,
                                flexShrink: 0,
                            }}
                        >
                            {link.icon}
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
                        <span
                            style={{
                                fontSize: 18,
                                color: "var(--text-muted)",
                                opacity: 0.5,
                            }}
                        >
                            →
                        </span>
                    </a>
                ))}
            </div>
        </div>
    );
}
