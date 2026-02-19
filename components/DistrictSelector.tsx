"use client";

import { useState, useMemo } from "react";
import { Lang, t } from "@/lib/i18n";
import { getDistrictsByDivision, District } from "@/lib/timings";

interface DistrictSelectorProps {
    selectedDistrict: string;
    onSelect: (district: District) => void;
    lang: Lang;
}

export default function DistrictSelector({
    selectedDistrict,
    onSelect,
    lang,
}: DistrictSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const divisions = useMemo(() => getDistrictsByDivision(), []);

    const filteredDivisions = useMemo(() => {
        if (!search.trim()) return divisions;
        const q = search.toLowerCase();
        const result: Record<string, District[]> = {};
        for (const [div, districts] of Object.entries(divisions)) {
            const matches = districts.filter(
                (d) =>
                    d.district.toLowerCase().includes(q) ||
                    d.division.toLowerCase().includes(q)
            );
            if (matches.length > 0) result[div] = matches;
        }
        return result;
    }, [search, divisions]);

    return (
        <div style={{ position: "relative" }}>
            {/* Trigger */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "var(--radius-lg)",
                    border: "1px solid var(--border-color)",
                    background: "var(--bg-card)",
                    color: "var(--text-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    fontSize: 14,
                    fontWeight: 600,
                    transition: "all 0.2s ease",
                    boxShadow: "var(--shadow-sm)",
                }}
            >
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 18 }}>📍</span>
                    <span>
                        {selectedDistrict} • {t("your_location", lang)}
                    </span>
                </span>
                <span
                    style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0)",
                        transition: "transform 0.2s ease",
                        fontSize: 14,
                    }}
                >
                    ▾
                </span>
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div
                    className="animate-fade-in"
                    style={{
                        position: "absolute",
                        top: "calc(100% + 8px)",
                        left: 0,
                        right: 0,
                        background: "var(--bg-card)",
                        border: "1px solid var(--border-color)",
                        borderRadius: "var(--radius-lg)",
                        boxShadow: "var(--shadow-lg)",
                        maxHeight: 360,
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        zIndex: 100,
                    }}
                >
                    {/* Search */}
                    <div style={{ padding: "12px 12px 8px" }}>
                        <input
                            type="text"
                            placeholder={t("search_district", lang)}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            autoFocus
                            style={{
                                width: "100%",
                                padding: "10px 14px",
                                borderRadius: "var(--radius-md)",
                                border: "1px solid var(--border-color)",
                                background: "var(--bg-secondary)",
                                color: "var(--text-primary)",
                                fontSize: 13,
                                outline: "none",
                                fontFamily: "inherit",
                            }}
                        />
                    </div>

                    {/* List */}
                    <div
                        style={{
                            overflowY: "auto",
                            padding: "0 8px 8px",
                            flex: 1,
                        }}
                    >
                        {Object.entries(filteredDivisions).map(([divName, districts]) => (
                            <div key={divName} style={{ marginBottom: 8 }}>
                                <p
                                    style={{
                                        fontSize: 10,
                                        fontWeight: 700,
                                        color: "var(--accent)",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.1em",
                                        padding: "8px 8px 4px",
                                    }}
                                >
                                    {divName}
                                </p>
                                {districts.map((d) => (
                                    <button
                                        key={d.district}
                                        onClick={() => {
                                            onSelect(d);
                                            setIsOpen(false);
                                            setSearch("");
                                        }}
                                        style={{
                                            width: "100%",
                                            padding: "10px 12px",
                                            borderRadius: "var(--radius-md)",
                                            border: "none",
                                            background:
                                                d.district === selectedDistrict
                                                    ? "var(--accent)"
                                                    : "transparent",
                                            color:
                                                d.district === selectedDistrict
                                                    ? "#fff"
                                                    : "var(--text-primary)",
                                            textAlign: "left",
                                            cursor: "pointer",
                                            fontSize: 13,
                                            fontWeight: d.district === selectedDistrict ? 700 : 500,
                                            transition: "all 0.15s ease",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            fontFamily: "inherit",
                                        }}
                                    >
                                        <span>{d.district}</span>
                                        <span
                                            style={{
                                                fontSize: 11,
                                                opacity: 0.6,
                                            }}
                                        >
                                            {d.offset > 0 ? `+${d.offset}` : d.offset}
                                            {lang === "en" ? " min" : " মি."}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Backdrop */}
            {isOpen && (
                <div
                    onClick={() => {
                        setIsOpen(false);
                        setSearch("");
                    }}
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 99,
                    }}
                />
            )}
        </div>
    );
}
