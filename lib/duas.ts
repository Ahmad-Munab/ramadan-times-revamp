export interface Dua {
    id: string;
    arabic: string;
    transliteration: string;
    meaning_en: string;
    meaning_bn: string;
}

export const sehriDua: Dua = {
    id: "sehri",
    arabic: "وَبِصَوْمِ غَدٍ نَّوَيْتُ مِنْ شَهْرِ رَمَضَانَ",
    transliteration: "Wa bisawmi ghadin nawaytu min shahri Ramadan",
    meaning_en:
        "I intend to keep the fast for tomorrow in the month of Ramadan.",
    meaning_bn: "আমি রমজান মাসের আগামীকালের রোজা রাখার নিয়ত করছি।",
};

export const iftarDua: Dua = {
    id: "iftar",
    arabic:
        "اللَّهُمَّ اِنِّى لَكَ صُمْتُ وَبِكَ اٰمَنْتُ وَعَلَيْكَ تَوَكَّلْتُ وَعَلٰى رِزْقِكَ اَفْطَرْتُ",
    transliteration:
        "Allahumma inni laka sumtu, wa bika aamantu, wa alayka tawakkaltu, wa ala rizqika aftartu",
    meaning_en:
        "O Allah! I fasted for You, I believe in You, I put my trust in You, and I break my fast with Your sustenance.",
    meaning_bn:
        "হে আল্লাহ! আমি তোমার জন্য রোজা রেখেছি, তোমার প্রতি ঈমান এনেছি, তোমার উপর তাওয়াক্কুল করেছি এবং তোমার রিযিক দিয়ে ইফতার করছি।",
};
