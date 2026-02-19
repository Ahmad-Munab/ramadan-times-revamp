import timingsData from "@/timings-data.json";

// ─── Types ───
export interface DaySchedule {
  roza: number;
  date: string;
  day: string;
  sehri_end: string;
  iftar: string;
}

export interface District {
  district: string;
  division: string;
  offset: number;
  lat: number;
  lng: number;
}

export type FastingStatus =
  | "before_ramadan"
  | "sehri_window"
  | "fasting"
  | "iftar_time"
  | "night"
  | "after_ramadan";

// ─── Constants ───
const RAMADAN_START = new Date("2026-02-19T00:00:00+06:00");
const RAMADAN_END = new Date("2026-03-20T23:59:59+06:00");
const SEHRI_WINDOW_MINUTES = 60; // Show sehri status 60 min before sehri_end
const IFTAR_WINDOW_MINUTES = 15; // Show iftar status 15 min after iftar

// ─── Data accessors ───
export function getSchedule(): DaySchedule[] {
  return timingsData.dhaka_base_schedule;
}

export function getDistrictsFlat(): District[] {
  return timingsData.districts_flat;
}

export function getDistrictsByDivision(): Record<string, District[]> {
  const result: Record<string, District[]> = {};
  const divisions = timingsData.districts;
  for (const [divName, districts] of Object.entries(divisions)) {
    result[divName] = (districts as Array<{
      district: string;
      division: string;
      district_offset_minutes: number;
      lat: number;
      lng: number;
    }>).map((d) => ({
      district: d.district,
      division: d.division,
      offset: d.district_offset_minutes,
      lat: d.lat,
      lng: d.lng,
    }));
  }
  return result;
}

// ─── Time utilities ───
export function applyOffset(time24h: string, offsetMinutes: number): string {
  const [h, m] = time24h.split(":").map(Number);
  const total = h * 60 + m + offsetMinutes;
  const nh = Math.floor((((total % 1440) + 1440) % 1440) / 60);
  const nm = ((total % 1440) + 1440) % 1440 % 60;
  return `${String(nh).padStart(2, "0")}:${String(nm).padStart(2, "0")}`;
}

export function timeToMinutes(time24h: string): number {
  const [h, m] = time24h.split(":").map(Number);
  return h * 60 + m;
}

export function getTodayIndex(): number {
  const now = new Date();
  // Work in Bangladesh timezone
  const bdNow = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Dhaka" })
  );
  const schedule = getSchedule();

  for (let i = 0; i < schedule.length; i++) {
    const d = new Date(schedule[i].date + "T00:00:00+06:00");
    if (
      bdNow.getFullYear() === d.getFullYear() &&
      bdNow.getMonth() === d.getMonth() &&
      bdNow.getDate() === d.getDate()
    ) {
      return i;
    }
  }
  return -1; // Not a Ramadan day
}

export function getTodaySchedule(
  offsetMinutes: number
): (DaySchedule & { adjustedSehri: string; adjustedIftar: string }) | null {
  const idx = getTodayIndex();
  if (idx === -1) return null;
  const day = getSchedule()[idx];
  return {
    ...day,
    adjustedSehri: applyOffset(day.sehri_end, offsetMinutes),
    adjustedIftar: applyOffset(day.iftar, offsetMinutes),
  };
}

export function getAdjustedSchedule(
  offsetMinutes: number
): (DaySchedule & { adjustedSehri: string; adjustedIftar: string })[] {
  return getSchedule().map((day) => ({
    ...day,
    adjustedSehri: applyOffset(day.sehri_end, offsetMinutes),
    adjustedIftar: applyOffset(day.iftar, offsetMinutes),
  }));
}

export function getCurrentStatus(offsetMinutes: number): FastingStatus {
  const now = new Date();
  const bdNow = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Dhaka" })
  );
  const nowMinutes = bdNow.getHours() * 60 + bdNow.getMinutes();

  // Check if within Ramadan period
  if (bdNow < RAMADAN_START) return "before_ramadan";
  if (bdNow > RAMADAN_END) return "after_ramadan";

  const today = getTodaySchedule(offsetMinutes);
  if (!today) return "before_ramadan";

  const sehriEnd = timeToMinutes(today.adjustedSehri);
  const iftarTime = timeToMinutes(today.adjustedIftar);
  const sehriStart = sehriEnd - SEHRI_WINDOW_MINUTES;

  if (nowMinutes >= sehriStart && nowMinutes < sehriEnd) {
    return "sehri_window";
  }
  if (nowMinutes >= sehriEnd && nowMinutes < iftarTime) {
    return "fasting";
  }
  if (
    nowMinutes >= iftarTime &&
    nowMinutes < iftarTime + IFTAR_WINDOW_MINUTES
  ) {
    return "iftar_time";
  }
  return "night";
}

export function getCountdownMs(offsetMinutes: number): {
  targetEvent: "sehri" | "iftar";
  remainingMs: number;
  targetTime: string;
} {
  const now = new Date();
  const bdNow = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Dhaka" })
  );
  const nowMinutes = bdNow.getHours() * 60 + bdNow.getMinutes();
  const nowSeconds = nowMinutes * 60 + bdNow.getSeconds();

  const today = getTodaySchedule(offsetMinutes);
  if (!today) {
    // Fallback: show countdown to first day
    const schedule = getSchedule();
    const firstDay = schedule[0];
    const sehri = applyOffset(firstDay.sehri_end, offsetMinutes);
    return { targetEvent: "sehri", remainingMs: 0, targetTime: sehri };
  }

  const sehriEnd = timeToMinutes(today.adjustedSehri);
  const iftarTime = timeToMinutes(today.adjustedIftar);
  const sehriEndSec = sehriEnd * 60;
  const iftarSec = iftarTime * 60;

  if (nowSeconds < sehriEndSec) {
    // Before sehri ends → countdown to sehri end
    return {
      targetEvent: "sehri",
      remainingMs: (sehriEndSec - nowSeconds) * 1000,
      targetTime: today.adjustedSehri,
    };
  }
  if (nowSeconds < iftarSec) {
    // After sehri, before iftar → countdown to iftar
    return {
      targetEvent: "iftar",
      remainingMs: (iftarSec - nowSeconds) * 1000,
      targetTime: today.adjustedIftar,
    };
  }

  // After iftar → countdown to next day's sehri
  const nextIdx = getTodayIndex() + 1;
  const schedule = getSchedule();
  if (nextIdx < schedule.length) {
    const nextDay = schedule[nextIdx];
    const nextSehri = applyOffset(nextDay.sehri_end, offsetMinutes);
    const nextSehriMin = timeToMinutes(nextSehri);
    // Remaining seconds until midnight + next sehri
    const remainingSec = (1440 - nowMinutes) * 60 + nextSehriMin * 60 - bdNow.getSeconds();
    return {
      targetEvent: "sehri",
      remainingMs: remainingSec * 1000,
      targetTime: nextSehri,
    };
  }

  return {
    targetEvent: "iftar",
    remainingMs: 0,
    targetTime: today.adjustedIftar,
  };
}

export function formatCountdown(ms: number): {
  hours: string;
  minutes: string;
  seconds: string;
} {
  if (ms <= 0) return { hours: "00", minutes: "00", seconds: "00" };
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return {
    hours: String(h).padStart(2, "0"),
    minutes: String(m).padStart(2, "0"),
    seconds: String(s).padStart(2, "0"),
  };
}

export function getRozaNumber(): number {
  const idx = getTodayIndex();
  return idx === -1 ? 0 : idx + 1;
}

export function format12h(time24h: string): string {
  const [h, m] = time24h.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2, "0")} ${period}`;
}

export function isRamadanActive(): boolean {
  const now = new Date();
  const bdNow = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Dhaka" })
  );
  return bdNow >= RAMADAN_START && bdNow <= RAMADAN_END;
}
