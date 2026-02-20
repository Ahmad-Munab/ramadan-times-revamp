"use client";

import { Lang, t } from "@/lib/i18n";

interface FooterProps {
    lang: Lang;
}

export default function Footer({ lang }: FooterProps) {
    return (
        <footer
            style={{
                marginTop: 28,
                borderRadius: "var(--radius-xl)",
                background: "var(--bg-glass)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid var(--border-color)",
                padding: "24px 20px",
                textAlign: "center",
            }}
        >
            {/* Data source info */}
            <div style={{ marginBottom: 16 }}>
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
                        fontFamily: "system-ui, -apple-system, sans-serif",
                    }}
                >
                    {t("ramadan_year", lang)}
                </p>
            </div>

            {/* Divider */}
            <div
                style={{
                    height: 1,
                    background: "var(--divider)",
                    margin: "0 auto 16px",
                    maxWidth: 200,
                }}
            />

            {/* Made with love */}
            <p
                style={{
                    fontSize: 13,
                    color: "var(--text-secondary)",
                    marginBottom: 8,
                    fontWeight: 500,
                }}
            >
                Made with{" "}
                <span style={{ color: "#ef4444" }}>❤️</span>{" "}
                by{" "}
                <a
                    href="https://munab.ascendralabs.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        color: "var(--accent)",
                        fontWeight: 700,
                        textDecoration: "none",
                    }}
                >
                    Munab
                </a>
            </p>

            {/* Copyright */}
            <p
                style={{
                    fontSize: 11,
                    color: "var(--text-muted)",
                    opacity: 0.8,
                }}
            >
                © 2026{" "}
                <a
                    href="https://ascendralabs.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        color: "var(--text-muted)",
                        textDecoration: "none",
                        fontWeight: 700,
                    }}
                >
                    Ascendra Labs
                </a>
                . All rights reserved.
            </p>
        </footer>
    );
}
