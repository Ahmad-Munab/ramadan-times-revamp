"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Lang, t } from "@/lib/i18n";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

export default function AboutPage() {
    const [lang, setLang] = useState<Lang>("en");
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [azanEnabled, setAzanEnabled] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedLang = localStorage.getItem("rb_lang") as Lang | null;
        const savedTheme = localStorage.getItem("rb_theme") as "light" | "dark" | null;
        const savedAzan = localStorage.getItem("rb_azan_enabled");

        if (savedLang) setLang(savedLang);
        if (savedTheme) setTheme(savedTheme);
        if (savedAzan !== null) setAzanEnabled(savedAzan === "true");

        setMounted(true);
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

    useEffect(() => {
        if (!mounted) return;
        localStorage.setItem("rb_azan_enabled", String(azanEnabled));
    }, [azanEnabled, mounted]);

    if (!mounted) return null;

    const features = [
        {
            title: lang === "en" ? "District-wise Timings" : "জেলা ভিত্তিক সময়সূচি",
            desc: lang === "en" ? "View accurate sehri and iftaar times for any of the 64 districts in Bangladesh." : "বাংলাদেশের ৬৪টি জেলার সেহরি ও ইফতারের সঠিক সময় দেখুন।",
            icon: "📍"
        },
        {
            title: lang === "en" ? "Live Countdown" : "লাইভ কাউন্টডাউন",
            desc: lang === "en" ? "Real-time countdown timer showing remaining time for your next event." : "সেহরি ও ইফতারের বাকি সময়ের নিখুঁত কাউন্টডাউন।",
            icon: "⏳"
        },
        {
            title: lang === "en" ? "Daily Duas" : "প্রতিদিনের দোয়া",
            desc: lang === "en" ? "Authentic duas for sehri, iftaar and other important prayers during Ramadan." : "সেহরি, ইফতার এবং রমজানের অন্যান্য গুরুত্বপূর্ণ দোয়া।",
            icon: "🤲"
        },
        {
            title: lang === "en" ? "Azaan Notifications" : "আযান নোটিফিকেশন",
            desc: lang === "en" ? "Hear the beautiful voice of Azaan at Iftaar and Fajr prayer times." : "ইফতার এবং ফজর নামাজের সময় আযান শুনুন।",
            icon: "📢"
        },
        {
            title: lang === "en" ? "Quran Radio" : "কুরআন রেডিও",
            desc: lang === "en" ? "Listen to beautiful Quran tilawat directly from the website at any time." : "যেকোনো সময় সরাসরি ওয়েবসাইট থেকে মধুর কুরআন তিলাওয়াত শুনুন।",
            icon: "📻"
        },
        {
            title: lang === "en" ? "Digital Calendar" : "ডিজিটাল ক্যালেন্ডার",
            desc: lang === "en" ? "View and download the full 1447 Hijri Ramadan schedule for Dhaka." : "১৪৪৭ হিজরির সম্পূর্ণ রমজান ক্যালেন্ডার দেখুন এবং ডাউনলোড করুন।",
            icon: "📅"
        },
        {
            title: lang === "en" ? "Dark & Light Mode" : "ডার্ক ও লাইট মোড",
            desc: lang === "en" ? "Premium dark and light themes for a comfortable viewing experience." : "আরামদায়ক অভিজ্ঞতা নিশ্চিত করতে প্রিমিয়াম ডার্ক ও লাইট থিম।",
            icon: "✨"
        }
    ];

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
            <main className="app-container" style={{ paddingTop: 24, paddingBottom: 40 }}>
                <Link href="/" className="flex gap-2 items-center text-medium pb-3!" >
                    <ArrowLeftIcon className="w-4 h-4" /> Back to home
                </Link>
                <div className="animate-fade-in-up" style={{ marginBottom: 32 }}>
                    <h2 style={{
                        fontSize: 28,
                        fontWeight: 900,
                        color: "var(--text-primary)",
                        marginBottom: 8,
                        letterSpacing: "-0.03em"
                    }}>
                        {lang === "en" ? "About Ramadan Daily" : "রমজান ডেইলি সম্পর্কে"}
                    </h2>
                    <p style={{ color: "var(--text-secondary)", fontSize: 16, maxWidth: 500, lineHeight: 1.6 }}>
                        {lang === "en"
                            ? "Welcome to your digital companion for the holy month of Ramadan. Our mission is to provide accurate timings and helpful resources for every Muslim in Bangladesh."
                            : "পবিত্র রমজান মাসে আপনার ডিজিটাল সঙ্গী হিসেবে আপনাকে স্বাগতম। আমাদের লক্ষ্য হলো বাংলাদেশের প্রতিটি মুসলিমের জন্য সঠিক সময়সূচি এবং প্রয়োজনীয় রিসোর্স প্রদান করা।"}
                    </p>
                </div>

                <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
                    {features.map((f, i) => (
                        <div
                            key={i}
                            className="animate-fade-in-up"
                            style={{
                                background: "var(--bg-glass)",
                                backdropFilter: "blur(12px)",
                                border: "1px solid var(--border-subtle)",
                                borderRadius: "var(--radius-xl)",
                                padding: "24px",
                                animationDelay: `${0.1 + i * 0.05}s`,
                                animationFillMode: "forwards",
                                opacity: 0,
                                transition: "transform 0.3s ease",
                            }}
                        >
                            <div style={{ fontSize: 32, marginBottom: 16 }}>{f.icon}</div>
                            <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--text-primary)", marginBottom: 8 }}>{f.title}</h3>
                            <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6, fontWeight: 500 }}>{f.desc}</p>
                        </div>
                    ))}
                </div>

                <div
                    className="animate-fade-in-up"
                    style={{
                        marginTop: 40,
                        padding: "24px",
                        borderRadius: "var(--radius-xl)",
                        background: "var(--accent-glass)",
                        border: "1px solid var(--accent-subtle)",
                        animationDelay: "0.6s",
                        animationFillMode: "forwards",
                        opacity: 0,
                    }}
                >
                    <p style={{ color: "var(--accent)", fontSize: 14, fontWeight: 700, textAlign: "center" }}>
                        {lang === "en"
                            ? "Dedicated to the Muslims of Bangladesh. May this Ramadan bring peace and blessings."
                            : "বাংলাদেশের মুসলিম উম্মাহর জন্য উৎসর্গীকৃত। এই রমজান আপনার জীবনে শান্তি ও বরকত বয়ে আনুক।"}
                    </p>
                </div>

                <Footer lang={lang} />
            </main>
        </>
    );
}
