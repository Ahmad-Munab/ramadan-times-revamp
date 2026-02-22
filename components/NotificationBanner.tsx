"use client";

import { useState, useEffect } from "react";
import { Lang } from "@/lib/i18n";
import Link from "next/link";

interface Notification {
    id: string;
    title: string;
    description: string;
    type: string;
}

export default function NotificationBanner({ lang }: { lang: Lang }) {
    const [notification, setNotification] = useState<Notification | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        fetch("/notifications.json")
            .then((res) => res.json())
            .then((data: Notification[]) => {
                if (data && data.length > 0) {
                    const latest = data[0];
                    const dismissed = localStorage.getItem(`dismissed_notif_${latest.id}`);
                    if (!dismissed) {
                        setNotification(latest);
                        // Small delay for animation
                        setTimeout(() => setIsVisible(true), 1000);
                    }
                }
            })
            .catch((err) => console.error("Failed to load notifications", err));
    }, []);

    const handleDismiss = () => {
        if (!notification) return;
        setIsVisible(false);
        setTimeout(() => {
            localStorage.setItem(`dismissed_notif_${notification.id}`, "true");
            setNotification(null);
        }, 500);
    };

    if (!notification) return null;

    return (
        <div
            style={{
                width: "100%",
                maxWidth: 520,
                margin: "0 auto",
                padding: "0 16px",
                height: isVisible ? "auto" : 0,
                overflow: "hidden",
                opacity: isVisible ? 1 : 0,
                transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
        >
            <div
                style={{
                    background: "var(--bg-glass-strong)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "2px solid var(--accent-subtle)",
                    borderRadius: "var(--radius-xl)",
                    padding: "14px 18px",
                    display: "flex",
                    gap: 12,
                    alignItems: "center",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1), inset 0 0 15px var(--accent-glass)",
                    position: "relative",
                    marginTop: 12,
                }}
            >
                <div
                    style={{
                        width: 32,
                        height: 32,
                        borderRadius: "var(--radius-full)",
                        background: "var(--accent-glass)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        color: "var(--accent)",
                    }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                    </svg>
                </div>

                <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 1 }}>
                        <h4
                            style={{
                                fontSize: 13,
                                fontWeight: 800,
                                color: "var(--text-primary)",
                                letterSpacing: "-0.01em",
                            }}
                        >
                            {notification.title}
                        </h4>
                        <Link
                            href="/updates"
                            style={{
                                fontSize: 10,
                                fontWeight: 700,
                                color: "var(--accent)",
                                textDecoration: "none",
                                background: "var(--accent-glass)",
                                padding: "2px 6px",
                                borderRadius: 4
                            }}
                        >
                            {lang === "en" ? "History" : "ইতিহাস"}
                        </Link>
                    </div>
                    <p
                        style={{
                            fontSize: 11,
                            lineHeight: 1.4,
                            color: "var(--text-secondary)",
                            fontWeight: 500,
                        }}
                    >
                        {notification.description}
                    </p>
                </div>

                <button
                    onClick={handleDismiss}
                    style={{
                        background: "none",
                        border: "none",
                        color: "var(--text-muted)",
                        cursor: "pointer",
                        padding: 4,
                        display: "flex",
                        borderRadius: 8,
                        transition: "all 0.2s",
                        opacity: 0.7,
                    }}
                    className="hover-bg-subtle"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
