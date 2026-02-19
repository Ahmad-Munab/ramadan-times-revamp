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
        icon: "🌙",
        color: "#fbbf24",
        bgGradient: "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)",
    },
    sehri_window: {
        icon: "🍽️",
        color: "#a78bfa",
        bgGradient: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #3730a3 100%)",
    },
    fasting: {
        icon: "☪️",
        color: "#34d399",
        bgGradient: "linear-gradient(135deg, #022c22 0%, #064e3b 50%, #065f46 100%)",
    },
    iftar_time: {
        icon: "🌅",
        color: "#fb923c",
        bgGradient: "linear-gradient(135deg, #7c2d12 0%, #c2410c 50%, #ea580c 100%)",
    },
    night: {
        icon: "🌃",
        color: "#818cf8",
        bgGradient: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)",
    },
    after_ramadan: {
        icon: "🎉",
        color: "#fbbf24",
        bgGradient: "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)",
    },
};

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
                padding: "20px 24px",
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
                    opacity: 0.06,
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
                        <span style={{ fontSize: 32 }}>{config.icon}</span>
                        <div>
                            <p
                                style={{
                                    fontSize: 18,
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
                                background: "rgba(255,255,255,0.15)",
                                backdropFilter: "blur(8px)",
                                borderRadius: "var(--radius-lg)",
                                padding: "10px 16px",
                                textAlign: "center",
                                border: "1px solid rgba(255,255,255,0.1)",
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
