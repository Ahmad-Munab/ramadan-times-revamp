"use client";

import { Lang, t } from "@/lib/i18n";

interface FooterProps {
    lang: Lang;
}

export default function Footer({ lang }: FooterProps) {
    return (
        <footer
            style={{
                textAlign: "center",
                padding: "32px 16px 24px",
                borderTop: "1px solid var(--divider)",
            }}
        >
            <p
                style={{
                    fontSize: 11,
                    color: "var(--text-muted)",
                    fontWeight: 500,
                    marginBottom: 4,
                }}
            >
                {t("data_source", lang)}
            </p>
            <p
                style={{
                    fontSize: 11,
                    color: "var(--text-muted)",
                    fontWeight: 500,
                    marginBottom: 12,
                }}
            >
                {t("ramadan_year", lang)}
            </p>
            <p
                style={{
                    fontSize: 10,
                    color: "var(--text-muted)",
                    opacity: 0.6,
                }}
            >
                Made with ❤️ for the Ummah
            </p>
        </footer>
    );
}
