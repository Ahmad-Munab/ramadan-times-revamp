"use client";

import { useEffect, useState, useCallback } from "react";
import { Lang, t, localizeNumber } from "@/lib/i18n";
import { getCountdownMs, formatCountdown } from "@/lib/timings";

interface CountdownTimerProps {
    offsetMinutes: number;
    lang: Lang;
}

export default function CountdownTimer({
    offsetMinutes,
    lang,
}: CountdownTimerProps) {
    const [countdown, setCountdown] = useState({ hours: "00", minutes: "00", seconds: "00" });
    const [targetEvent, setTargetEvent] = useState<"sehri" | "iftar">("iftar");
    const [targetTime, setTargetTime] = useState("");

    const updateCountdown = useCallback(() => {
        const result = getCountdownMs(offsetMinutes);
        setCountdown(formatCountdown(result.remainingMs));
        setTargetEvent(result.targetEvent);
        setTargetTime(result.targetTime);
    }, [offsetMinutes]);

    useEffect(() => {
        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    }, [updateCountdown]);

    const label =
        targetEvent === "sehri"
            ? t("countdown_to_sehri", lang)
            : t("countdown_to_iftar", lang);

    const digitStyle: React.CSSProperties = {
        background: "var(--countdown-bg)",
        color: "var(--countdown-text)",
        borderRadius: "var(--radius-md)",
        padding: "12px 4px",
        minWidth: 60,
        textAlign: "center",
        fontWeight: 900,
        fontSize: 32,
        fontVariantNumeric: "tabular-nums",
        letterSpacing: "-0.02em",
        boxShadow: "var(--shadow-md), inset 0 1px 0 rgba(255,255,255,0.1)",
        lineHeight: 1,
        position: "relative",
        overflow: "hidden",
    };

    const labelStyle: React.CSSProperties = {
        fontSize: 10,
        color: "var(--text-muted)",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        marginTop: 6,
        textAlign: "center",
    };

    const separatorStyle: React.CSSProperties = {
        fontSize: 28,
        fontWeight: 900,
        color: "var(--accent)",
        alignSelf: "flex-start",
        paddingTop: 12,
        opacity: 0.6,
    };

    return (
        <div
            className="glass-card"
            style={{
                padding: "24px 20px",
                textAlign: "center",
            }}
        >
            {/* Label */}
            <p
                style={{
                    fontSize: 13,
                    color: "var(--text-muted)",
                    fontWeight: 600,
                    marginBottom: 4,
                    letterSpacing: "0.02em",
                }}
            >
                {label}
            </p>

            {/* Countdown Digits */}
            <div
                style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    gap: 8,
                }}
            >
                {/* Hours */}
                <div>
                    <div style={digitStyle}>
                        {localizeNumber(countdown.hours, lang)}
                    </div>
                    <p style={labelStyle}>{t("hours", lang)}</p>
                </div>

                <span style={separatorStyle}>:</span>

                {/* Minutes */}
                <div>
                    <div style={digitStyle}>
                        {localizeNumber(countdown.minutes, lang)}
                    </div>
                    <p style={labelStyle}>{t("minutes", lang)}</p>
                </div>

                <span style={separatorStyle}>:</span>

                {/* Seconds */}
                <div>
                    <div style={digitStyle}>
                        {localizeNumber(countdown.seconds, lang)}
                    </div>
                    <p style={labelStyle}>{t("seconds", lang)}</p>
                </div>
            </div>
        </div>
    );
}
