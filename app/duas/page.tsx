"use client";

import { useState, useEffect, useMemo } from "react";
import { Lang, t } from "@/lib/i18n";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Zikr {
    id: number;
    title: string;
    arabic: string;
    transliteration: string;
    translation_en: string;
    translation_bn: string;
    repeat: number;
    source: string;
    category: string;
    when_to_recite: string;
}

export default function DuasPage() {
    const [lang, setLang] = useState<Lang>("en");
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [azanEnabled, setAzanEnabled] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [azkar, setAzkar] = useState<Zikr[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    useEffect(() => {
        const savedLang = localStorage.getItem("rb_lang") as Lang | null;
        const savedTheme = localStorage.getItem("rb_theme") as "light" | "dark" | null;
        const savedAzan = localStorage.getItem("rb_azan_enabled");

        if (savedLang) setLang(savedLang);
        if (savedTheme) setTheme(savedTheme);
        if (savedAzan !== null) setAzanEnabled(savedAzan === "true");

        setMounted(true);

        fetch("/zikr_azkar_duas.json")
            .then(res => res.json())
            .then(data => {
                setAzkar(data.azkar);
                setCategories(["all", ...data.categories]);
            })
            .catch(err => console.error("Failed to load azkar", err));
    }, []);

    useEffect(() => {
        if (!mounted) return;
        localStorage.setItem("rb_lang", lang);
    }, [lang, mounted]);

    useEffect(() => {
        if (!mounted) return;
        localStorage.setItem("rb_theme", theme);
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme, mounted]);

    const filteredAzkar = useMemo(() => {
        return azkar.filter(item => {
            const matchesSearch =
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.translation_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.translation_bn.includes(searchQuery);
            const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [azkar, searchQuery, selectedCategory]);

    const formatCategory = (cat: string) => {
        return cat.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    if (!mounted) return null;

    return (
        <>
            <Header
                lang={lang}
                setLang={setLang}
                theme={theme}
                setTheme={setTheme}
                azanEnabled={azanEnabled}
                setAzanEnabled={setAzanEnabled}
            />

            <main className="app-container" style={{ paddingBottom: 60, minHeight: "100vh" }}>
                <div style={{ paddingTop: 24, display: "flex", flexDirection: "column", gap: 20 }}>

                    {/* Page Title & Back Button */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <Link
                            href="/"
                            style={{
                                width: 36,
                                height: 36,
                                borderRadius: "var(--radius-full)",
                                background: "var(--bg-card)",
                                border: "1px solid var(--border-color)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "var(--text-primary)",
                                textDecoration: "none"
                            }}
                            className="hover-scale"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="19" y1="12" x2="5" y2="12" />
                                <polyline points="12 19 5 12 12 5" />
                            </svg>
                        </Link>
                        <h1 style={{ fontSize: 22, fontWeight: 900, color: "var(--text-primary)" }}>
                            {lang === "en" ? "Zikr & Duas" : "জিকির ও দোয়া"}
                        </h1>
                    </div>

                    {/* Search Bar */}
                    <div style={{ position: "relative" }}>
                        <input
                            type="text"
                            placeholder={lang === "en" ? "Search duas..." : "দোয়া খুঁজুন..."}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "14px 44px 14px 18px",
                                borderRadius: "var(--radius-xl)",
                                background: "var(--bg-card)",
                                border: "1px solid var(--border-color)",
                                color: "var(--text-primary)",
                                fontSize: 14,
                                fontWeight: 500,
                                outline: "none",
                                transition: "all 0.2s"
                            }}
                            className="input-focus-ring"
                        />
                        <div style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", opacity: 0.6 }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4, scrollbarWidth: "none" }} className="hide-scrollbar">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                style={{
                                    padding: "8px 16px",
                                    borderRadius: "var(--radius-full)",
                                    whiteSpace: "nowrap",
                                    fontSize: 12,
                                    fontWeight: 700,
                                    background: selectedCategory === cat ? "var(--accent)" : "var(--bg-card)",
                                    color: selectedCategory === cat ? "white" : "var(--text-secondary)",
                                    border: "1px solid " + (selectedCategory === cat ? "var(--accent)" : "var(--border-color)"),
                                    cursor: "pointer",
                                    transition: "all 0.2s"
                                }}
                            >
                                {cat === "all" ? (lang === "en" ? "All Categories" : "সবগুলো") : formatCategory(cat)}
                            </button>
                        ))}
                    </div>

                    {/* Dua Grid */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {filteredAzkar.map((item, index) => (
                            <DuaItem key={item.id} item={item} lang={lang} index={index} />
                        ))}

                        {filteredAzkar.length === 0 && (
                            <div style={{ textAlign: "center", padding: "40px 0", color: "var(--text-muted)" }}>
                                <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
                                <p style={{ fontWeight: 600 }}>{lang === "en" ? "No results found" : "কোনো ফলাফল পাওয়া যায়নি"}</p>
                            </div>
                        )}
                    </div>
                </div>

                <Footer lang={lang} />
            </main>
        </>
    );
}

function DuaItem({ item, lang, index }: { item: Zikr; lang: Lang; index: number }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div
            className="glass-card animate-fade-in-up"
            style={{
                opacity: 0,
                animationDelay: `${Math.min(index * 0.05, 0.5)}s`,
                animationFillMode: "forwards",
                overflow: "hidden"
            }}
        >
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                style={{
                    width: "100%",
                    padding: "18px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--text-primary)",
                    gap: 8
                }}
            >
                <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span style={{
                            fontSize: 10,
                            fontWeight: 800,
                            padding: "2px 8px",
                            background: "var(--accent-glass)",
                            color: "var(--accent)",
                            borderRadius: 4,
                            textTransform: "uppercase"
                        }}>
                            {item.category.replace('_', ' ')}
                        </span>
                        {item.repeat > 0 && (
                            <span style={{
                                fontSize: 10,
                                fontWeight: 800,
                                padding: "2px 8px",
                                background: "var(--bg-secondary)",
                                color: "var(--text-muted)",
                                borderRadius: 4
                            }}>
                                {lang === "en" ? `Repeat: ${item.repeat}x` : `${item.repeat} বার`}
                            </span>
                        )}
                    </div>
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                            color: "var(--text-muted)",
                            transform: isExpanded ? "rotate(180deg)" : "rotate(0)",
                            transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            flexShrink: 0
                        }}
                    >
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.3 }}>
                    {item.title}
                </h3>
            </button>

            <div style={{
                display: "grid",
                gridTemplateRows: isExpanded ? "1fr" : "0fr",
                opacity: isExpanded ? 1 : 0,
                transition: "grid-template-rows 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease",
            }}>
                <div style={{ overflow: "hidden" }}>
                    <div style={{ padding: "0 18px 18px", display: "flex", flexDirection: "column", gap: 16 }}>

                        {/* Arabic */}
                        <div style={{
                            background: "var(--bg-secondary)",
                            borderRadius: "var(--radius-lg)",
                            padding: "20px",
                            textAlign: "right"
                        }}>
                            <p className="text-arabic" style={{ fontSize: 24, lineHeight: 2, color: "var(--accent)" }}>
                                {item.arabic}
                            </p>
                        </div>

                        {/* Transliteration */}
                        <div>
                            <p style={{ fontSize: 10, fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>
                                {t("transliteration", lang)}
                            </p>
                            <p style={{ fontSize: 14, color: "var(--text-secondary)", fontStyle: "italic", lineHeight: 1.6 }}>
                                {item.transliteration}
                            </p>
                        </div>

                        {/* Meaning */}
                        <div>
                            <p style={{ fontSize: 10, fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>
                                {t("meaning", lang)}
                            </p>
                            <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                                {lang === "en" ? item.translation_en : item.translation_bn}
                            </p>
                        </div>

                        {/* Context & Source */}
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 8,
                            paddingTop: 12,
                            borderTop: "1px solid var(--border-subtle)"
                        }}>
                            <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                                <span style={{ fontSize: 14, color: "var(--accent)" }}>🛡️</span>
                                <p style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 500 }}>
                                    {item.when_to_recite}
                                </p>
                            </div>
                            <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                                <span style={{ fontSize: 14, color: "var(--accent)" }}>📖</span>
                                <p style={{ fontSize: 11, color: "var(--text-muted)", opacity: 0.8, fontWeight: 500 }}>
                                    {item.source}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
