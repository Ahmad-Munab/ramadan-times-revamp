"use client";

import { Lang, t, localizeNumber } from "@/lib/i18n";
import { FastingStatus } from "@/lib/timings";

interface StatusBannerProps {
    status: FastingStatus;
    rozaNumber: number;
    lang: Lang;
}

const statusConfig: Record<
    FastingStatus,
    { icon: string; color: string; bgGradient: string }
> = {
    before_ramadan: {
        icon: "crescent",
        color: "#fbbf24",
        bgGradient: "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)",
    },
    sehri_window: {
        icon: "plate",
        color: "#a78bfa",
        bgGradient: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #3730a3 100%)",
    },
    fasting: {
        icon: "star",
        color: "#34d399",
        bgGradient: "linear-gradient(135deg, #022c22 0%, #064e3b 50%, #065f46 100%)",
    },
    iftar_time: {
        icon: "sunset",
        color: "#fb923c",
        bgGradient: "linear-gradient(135deg, #7c2d12 0%, #c2410c 50%, #ea580c 100%)",
    },
    night: {
        icon: "moon",
        color: "#818cf8",
        bgGradient: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)",
    },
    after_ramadan: {
        icon: "sparkle",
        color: "#fbbf24",
        bgGradient: "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)",
    },
};

function StatusIcon({ icon, color }: { icon: string; color: string }) {
    const size = 28;
    const style = { color, flexShrink: 0 as const };

    switch (icon) {
        case "crescent":
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
            );
        case "plate":
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                    <line x1="6" y1="1" x2="6" y2="4" />
                    <line x1="10" y1="1" x2="10" y2="4" />
                    <line x1="14" y1="1" x2="14" y2="4" />
                </svg>
            );
        case "star":
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
            );
        case "sunset":
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
                    <path d="M17 18a5 5 0 0 0-10 0" />
                    <line x1="12" y1="2" x2="12" y2="9" />
                    <line x1="4.22" y1="10.22" x2="5.64" y2="11.64" />
                    <line x1="1" y1="18" x2="3" y2="18" />
                    <line x1="21" y1="18" x2="23" y2="18" />
                    <line x1="18.36" y1="11.64" x2="19.78" y2="10.22" />
                    <line x1="23" y1="22" x2="1" y2="22" />
                    <polyline points="8 5 12 9 16 5" />
                </svg>
            );
        case "moon":
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
            );
        case "sparkle":
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            );
        default:
            return null;
    }
}

export default function StatusBanner({
    status,
    rozaNumber,
    lang,
}: StatusBannerProps) {
    const config = statusConfig[status];
    const statusKey = `status_${status}` as const;
    const isActive = status === "sehri_window" || status === "iftar_time";

    return (
        <div
            className={isActive ? "animate-breathe" : ""}
            style={{
                background: config.bgGradient,
                borderRadius: "var(--radius-xl)",
                padding: "20px 22px",
                color: "#ffffff",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Decorative geometric overlay */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0.04,
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M30 0l7.07 15 15-7.07L45 22.93l15 7.07-15 7.07 7.07 15L37.07 45 30 60l-7.07-15L7.93 52.07 15 37.07 0 30l15-7.07L7.93 7.93 22.93 15z'/%3E%3C/g%3E%3C/svg%3E\")",
                }}
            />

            <div style={{ position: "relative", zIndex: 1 }}>
                {/* Status Row */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <StatusIcon icon={config.icon} color={config.color} />
                        <div>
                            <p
                                style={{
                                    fontSize: 17,
                                    fontWeight: 800,
                                    letterSpacing: "-0.01em",
                                    lineHeight: 1.3,
                                }}
                            >
                                {t(statusKey, lang)}
                            </p>
                            {rozaNumber > 0 && (
                                <p
                                    style={{
                                        fontSize: 13,
                                        opacity: 0.85,
                                        fontWeight: 500,
                                        marginTop: 2,
                                    }}
                                >
                                    {t("roza", lang)} {localizeNumber(rozaNumber, lang)}/
                                    {localizeNumber(30, lang)}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Roza badge */}
                    {rozaNumber > 0 && (
                        <div
                            style={{
                                background: "rgba(255,255,255,0.12)",
                                backdropFilter: "blur(8px)",
                                borderRadius: "var(--radius-lg)",
                                padding: "10px 16px",
                                textAlign: "center",
                                border: "1px solid rgba(255,255,255,0.08)",
                            }}
                        >
                            <p
                                style={{
                                    fontSize: 24,
                                    fontWeight: 900,
                                    lineHeight: 1,
                                    color: config.color,
                                }}
                            >
                                {localizeNumber(rozaNumber, lang)}
                            </p>
                            <p style={{ fontSize: 10, opacity: 0.7, marginTop: 4, fontWeight: 600 }}>
                                {t("of_ramadan", lang)}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
