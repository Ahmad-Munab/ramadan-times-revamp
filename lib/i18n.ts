export type Lang = "en" | "bn";

const translations: Record<string, Record<Lang, string>> = {
    // ─── App ───
    app_name: { en: "Ramadan Daily", bn: "রমজান ডেইলি" },
    app_tagline: { en: "Your Daily Ramadan Companion", bn: "আপনার দৈনিক রমজান সঙ্গী" },

    // ─── Status ───
    status_before_ramadan: { en: "Ramadan is approaching", bn: "রমজান আসছে" },
    status_sehri_window: { en: "Sehri Time — Eat Now!", bn: "সেহরির সময় — এখন খান!" },
    status_fasting: { en: "Fasting in Progress", bn: "রোজা চলছে" },
    status_iftar_time: { en: "Iftar Time — Break Your Fast!", bn: "ইফতারের সময় — রোজা ভাঙুন!" },
    status_night: { en: "Night Time", bn: "রাতের সময়" },
    status_after_ramadan: { en: "Ramadan has ended", bn: "রমজান শেষ হয়েছে" },

    // ─── Countdown ───
    countdown_to_sehri: { en: "Time until Sehri ends", bn: "সেহরি শেষ হতে বাকি" },
    countdown_to_iftar: { en: "Time until Iftar", bn: "ইফতার পর্যন্ত বাকি" },
    hours: { en: "Hours", bn: "ঘণ্টা" },
    minutes: { en: "Minutes", bn: "মিনিট" },
    seconds: { en: "Seconds", bn: "সেকেন্ড" },

    // ─── Time Cards ───
    sehri: { en: "Sehri", bn: "সেহরি" },
    iftar: { en: "Iftar", bn: "ইফতার" },
    sehri_ends_at: { en: "Sehri ends at", bn: "সেহরি শেষ" },
    iftar_at: { en: "Iftar at", bn: "ইফতার" },
    today: { en: "Today", bn: "আজ" },

    // ─── Roza ───
    roza: { en: "Roza", bn: "রোজা" },
    roza_number: { en: "Roza #", bn: "রোজা নং" },
    day: { en: "Day", bn: "দিন" },
    of_ramadan: { en: "of Ramadan", bn: "রমজানের" },

    // ─── District ───
    select_district: { en: "Select District", bn: "জেলা নির্বাচন করুন" },
    search_district: { en: "Search district...", bn: "জেলা খুঁজুন..." },
    your_location: { en: "Your Location", bn: "আপনার অবস্থান" },

    // ─── Duas ───
    duas: { en: "Duas", bn: "দোয়া" },
    sehri_dua: { en: "Sehri Dua (Intention for Fasting)", bn: "সেহরির দোয়া (রোজার নিয়ত)" },
    iftar_dua: { en: "Iftar Dua (Breaking Fast)", bn: "ইফতারের দোয়া" },
    transliteration: { en: "Transliteration", bn: "উচ্চারণ" },
    meaning: { en: "Meaning", bn: "অর্থ" },

    // ─── Schedule ───
    full_schedule: { en: "Full Ramadan Schedule", bn: "সম্পূর্ণ রমজান সূচি" },
    date: { en: "Date", bn: "তারিখ" },
    sehri_col: { en: "Sehri", bn: "সেহরি" },
    iftar_col: { en: "Iftar", bn: "ইফতার" },
    show_schedule: { en: "View Full Schedule", bn: "সম্পূর্ণ সূচি দেখুন" },
    hide_schedule: { en: "Hide Schedule", bn: "সূচি বন্ধ করুন" },

    // ─── Links ───
    quran_hadith: { en: "Quran & Hadith", bn: "কুরআন ও হাদিস" },
    read_quran: { en: "Read Quran", bn: "কুরআন পড়ুন" },
    read_hadith: { en: "Read Hadith", bn: "হাদিস পড়ুন" },
    quran_desc: { en: "Read the Holy Quran online", bn: "অনলাইনে পবিত্র কুরআন পড়ুন" },
    hadith_desc: { en: "Browse authentic Hadith collections", bn: "প্রামাণিক হাদিস সংকলন পড়ুন" },

    // ─── Footer ───
    data_source: { en: "Data: Islamic Foundation Bangladesh", bn: "তথ্যসূত্র: ইসলামিক ফাউন্ডেশন বাংলাদেশ" },
    ramadan_year: { en: "Ramadan 1447 AH • 2026 CE", bn: "রমজান ১৪৪৭ হিজরি • ২০২৬ খ্রি." },

    // ─── Theme ───
    dark_mode: { en: "Dark Mode", bn: "ডার্ক মোড" },
    light_mode: { en: "Light Mode", bn: "লাইট মোড" },

    // ─── Days ───
    Saturday: { en: "Saturday", bn: "শনিবার" },
    Sunday: { en: "Sunday", bn: "রবিবার" },
    Monday: { en: "Monday", bn: "সোমবার" },
    Tuesday: { en: "Tuesday", bn: "মঙ্গলবার" },
    Wednesday: { en: "Wednesday", bn: "বুধবার" },
    Thursday: { en: "Thursday", bn: "বৃহস্পতিবার" },
    Friday: { en: "Friday", bn: "শুক্রবার" },

    // ─── Azan ───
    azan_notification: { en: "Azan Notification", bn: "আযানের নোটিফিকেশন" },
    azan_enabled: { en: "Azan enabled", bn: "আযান চালু" },
    azan_disabled: { en: "Azan disabled", bn: "আযান বন্ধ" },
};

export function t(key: string, lang: Lang): string {
    return translations[key]?.[lang] ?? key;
}

// Bengali numeral converter
const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
export function toBnNum(num: number | string): string {
    return String(num)
        .split("")
        .map((ch) => (/\d/.test(ch) ? bnDigits[parseInt(ch)] : ch))
        .join("");
}

export function localizeNumber(num: number | string, lang: Lang): string {
    return lang === "bn" ? toBnNum(num) : String(num);
}

export function localizeTime(time24h: string, lang: Lang): string {
    // Convert to 12h and localize
    const [h, m] = time24h.split(":").map(Number);
    const period = h >= 12 ? (lang === "bn" ? "PM" : "PM") : (lang === "bn" ? "AM" : "AM");
    const h12 = h % 12 || 12;
    const timeStr = `${localizeNumber(h12, lang)}:${localizeNumber(String(m).padStart(2, "0"), lang)}`;
    return `${timeStr} ${period}`;
}
