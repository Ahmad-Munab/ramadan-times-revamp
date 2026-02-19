"use client";

import { useState, useMemo, useRef, useEffect } from "react";
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
    const containerRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);
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

    // Focus input when opened
    useEffect(() => {
        if (isOpen && searchRef.current) {
            setTimeout(() => searchRef.current?.focus(), 50);
        }
    }, [isOpen]);

    // Close on outside click
    useEffect(() => {
        if (!isOpen) return;
        const handleClick = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
                setSearch("");
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
        if (!isOpen) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsOpen(false);
                setSearch("");
            }
        };
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [isOpen]);

    return (
        <div ref={containerRef} style={{ position: "relative", zIndex: 100 }}>
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
                    boxShadow: isOpen ? "var(--shadow-md)" : "var(--shadow-sm)",
                    fontFamily: "inherit",
                }}
            >
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {/* Location SVG icon */}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent)" }}>
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>
                        {selectedDistrict} · {t("your_location", lang)}
                    </span>
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
                        transition: "transform 0.25s ease",
                    }}
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>

            {/* Dropdown — conditionally rendered for reliability */}
            {isOpen && (
                <div
                    style={{
                        position: "absolute",
                        top: "calc(100% + 6px)",
                        left: 0,
                        right: 0,
                        background: "var(--bg-card)",
                        border: "1px solid var(--border-color)",
                        borderRadius: "var(--radius-lg)",
                        boxShadow: "var(--shadow-lg)",
                        maxHeight: 380,
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        zIndex: 9999,
                        animation: "slideDown 0.2s ease-out",
                    }}
                >
                    {/* Search */}
                    <div style={{ padding: "12px 12px 8px" }}>
                        <input
                            ref={searchRef}
                            type="text"
                            placeholder={t("search_district", lang)}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
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
                            <div key={divName} style={{ marginBottom: 6 }}>
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
                                            padding: "9px 12px",
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
        </div>
    );
}
