"use client";

import { useState, useEffect } from "react";
import { Lang, t } from "@/lib/i18n";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Notification {
    id: string;
    title: string;
    description: string;
    type: string;
    date?: string;
}

export default function NotificationsPage() {
    const [lang, setLang] = useState<Lang>("en");
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [azanEnabled, setAzanEnabled] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        const savedLang = localStorage.getItem("rb_lang") as Lang | null;
        const savedTheme = localStorage.getItem("rb_theme") as "light" | "dark" | null;
        const savedAzan = localStorage.getItem("rb_azan_enabled");

        if (savedLang) setLang(savedLang);
        if (savedTheme) setTheme(savedTheme);
        if (savedAzan !== null) setAzanEnabled(savedAzan === "true");

        setMounted(true);

        fetch("/notifications.json")
            .then(res => res.json())
            .then(data => setNotifications(data))
            .catch(err => console.error("Failed to load notifications", err));
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

                    {/* Header */}
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
                            {lang === "en" ? "Updates & Notifications" : "আপডেট ও নোটিফিকেশন"}
                        </h1>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {notifications.map((notif, index) => (
                            <div
                                key={notif.id}
                                className="glass-card animate-fade-in-up"
                                style={{
                                    padding: "20px",
                                    opacity: 0,
                                    animationDelay: `${index * 0.1}s`,
                                    animationFillMode: "forwards",
                                    border: index === 0 ? "2px solid var(--accent-subtle)" : "1px solid var(--border-color)",
                                    position: "relative"
                                }}
                            >
                                {index === 0 && (
                                    <span style={{
                                        position: "absolute",
                                        top: -10,
                                        right: 20,
                                        background: "var(--accent)",
                                        color: "white",
                                        fontSize: 10,
                                        fontWeight: 900,
                                        padding: "2px 10px",
                                        borderRadius: "var(--radius-full)",
                                        textTransform: "uppercase"
                                    }}>
                                        Latest
                                    </span>
                                )}

                                <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                                    <div style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: "var(--radius-lg)",
                                        background: "var(--accent-glass)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0,
                                        color: "var(--accent)"
                                    }}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                                            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                                        </svg>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--text-primary)", marginBottom: 4 }}>
                                            {notif.title}
                                        </h3>
                                        <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5, fontWeight: 500 }}>
                                            {notif.description}
                                        </p>
                                        {notif.date && (
                                            <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 10, fontWeight: 600 }}>
                                                📅 {notif.date}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {notifications.length === 0 && (
                            <div style={{ textAlign: "center", padding: "40px 0", color: "var(--text-muted)" }}>
                                <p>{lang === "en" ? "No notifications yet" : "এখনো কোনো নোটিফিকেশন নেই"}</p>
                            </div>
                        )}
                    </div>
                </div>

                <Footer lang={lang} />
            </main>
        </>
    );
}
