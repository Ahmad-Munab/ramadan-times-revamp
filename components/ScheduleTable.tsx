"use client";

import { useState, useMemo } from "react";
import { Lang, t, localizeNumber, localizeTime } from "@/lib/i18n";
import { getAdjustedSchedule, getTodayIndex } from "@/lib/timings";

interface ScheduleTableProps {
    offsetMinutes: number;
    lang: Lang;
}

export default function ScheduleTable({
    offsetMinutes,
    lang,
}: ScheduleTableProps) {
    const [isOpen, setIsOpen] = useState(false);
    const schedule = useMemo(
        () => getAdjustedSchedule(offsetMinutes),
        [offsetMinutes]
    );
    const todayIdx = getTodayIndex();

    const dayNames: Record<string, Record<Lang, string>> = {
        Saturday: { en: "Sat", bn: "শনি" },
        Sunday: { en: "Sun", bn: "রবি" },
        Monday: { en: "Mon", bn: "সোম" },
        Tuesday: { en: "Tue", bn: "মঙ্গল" },
        Wednesday: { en: "Wed", bn: "বুধ" },
        Thursday: { en: "Thu", bn: "বৃহঃ" },
        Friday: { en: "Fri", bn: "শুক্র" },
    };

    return (
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: "100%",
                    padding: "14px 18px",
                    borderRadius: "var(--radius-lg)",
                    border: "1px solid var(--border-color)",
                    background: "var(--bg-card)",
                    color: "var(--text-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    fontSize: 14,
                    fontWeight: 700,
                    transition: "all 0.2s ease",
                    boxShadow: "var(--shadow-sm)",
                    fontFamily: "inherit",
                }}
            >
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {/* Calendar SVG icon */}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent)" }}>
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    {isOpen ? t("hide_schedule", lang) : t("show_schedule", lang)}
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
                        transform: isOpen ? "rotate(180deg)" : "rotate(0)",
                        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>

            {/* Smooth Accordion */}
            <div
                style={{
                    display: "grid",
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    opacity: isOpen ? 1 : 0,
                    transition: "grid-template-rows 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease",
                    marginTop: isOpen ? 10 : 0,
                }}
            >
                <div style={{ overflow: "hidden" }}>
                    <div
                        className="glass-card"
                        style={{ overflow: "hidden" }}
                    >
                        <div
                            style={{
                                overflowX: "auto",
                                WebkitOverflowScrolling: "touch",
                            }}
                        >
                            <table
                                style={{
                                    width: "100%",
                                    borderCollapse: "collapse",
                                    fontSize: 13,
                                }}
                            >
                                <thead>
                                    <tr
                                        style={{
                                            borderBottom: "2px solid var(--border-color)",
                                        }}
                                    >
                                        <th style={thStyle}>#</th>
                                        <th style={{ ...thStyle, textAlign: "left" }}>
                                            {t("date", lang)}
                                        </th>
                                        <th style={thStyle}>{t("sehri_col", lang)}</th>
                                        <th style={thStyle}>{t("iftar_col", lang)}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {schedule.map((day, idx) => {
                                        const isToday = idx === todayIdx;
                                        return (
                                            <tr
                                                key={day.roza}
                                                style={{
                                                    background: isToday
                                                        ? "var(--accent)"
                                                        : idx % 2 === 0
                                                            ? "transparent"
                                                            : "var(--bg-secondary)",
                                                    color: isToday ? "#fff" : "var(--text-primary)",
                                                    borderBottom: "1px solid var(--divider)",
                                                    transition: "background 0.2s",
                                                }}
                                            >
                                                <td style={{ ...tdStyle, fontWeight: 700 }}>
                                                    {localizeNumber(day.roza, lang)}
                                                </td>
                                                <td style={{ ...tdStyle, textAlign: "left" }}>
                                                    <span style={{ fontWeight: 600 }}>
                                                        {localizeNumber(day.date.slice(5), lang)}
                                                    </span>
                                                    <span
                                                        style={{
                                                            fontSize: 11,
                                                            opacity: 0.7,
                                                            marginLeft: 6,
                                                        }}
                                                    >
                                                        {dayNames[day.day]?.[lang] ?? day.day}
                                                    </span>
                                                    {isToday && (
                                                        <span
                                                            style={{
                                                                fontSize: 9,
                                                                background: "rgba(255,255,255,0.25)",
                                                                padding: "2px 6px",
                                                                borderRadius: "var(--radius-full)",
                                                                marginLeft: 6,
                                                                fontWeight: 700,
                                                            }}
                                                        >
                                                            {t("today", lang)}
                                                        </span>
                                                    )}
                                                </td>
                                                <td style={tdStyle}>
                                                    {localizeTime(day.adjustedSehri, lang)}
                                                </td>
                                                <td style={tdStyle}>
                                                    {localizeTime(day.adjustedIftar, lang)}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const thStyle: React.CSSProperties = {
    padding: "12px 10px",
    fontSize: 11,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "var(--text-muted)",
    textAlign: "center",
    whiteSpace: "nowrap",
};

const tdStyle: React.CSSProperties = {
    padding: "10px",
    textAlign: "center",
    whiteSpace: "nowrap",
    fontSize: 13,
};
