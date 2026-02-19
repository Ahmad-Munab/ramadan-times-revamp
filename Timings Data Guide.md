Here's your complete JSON! Here's a summary of what's inside and how to use it:

What's in the JSON:

dhaka_base_schedule — Full 30-day Ramadan schedule (Feb 19 – Mar 20, 2026) with exact Sehri end times and Iftar times for Dhaka, based on Islamic Foundation Bangladesh data
districts_flat — All 64 districts with their offset in minutes (positive = west of Dhaka = add minutes; negative = east of Dhaka = subtract minutes), plus latitude/longitude
districts — Same data grouped by division (Dhaka, Chattogram, Sylhet, Rajshahi, Khulna, Barishal, Rangpur, Mymensingh)


How to use offsets in your webapp:
jsfunction applyOffset(time24h, offsetMinutes) {
  const [h, m] = time24h.split(':').map(Number);
  const total = h * 60 + m + offsetMinutes;
  const nh = Math.floor(((total % 1440) + 1440) % 1440 / 60);
  const nm = ((total % 1440) + 1440) % 1440 % 60;
  return `${String(nh).padStart(2,'0')}:${String(nm).padStart(2,'0')}`;
}

// Example: Sylhet (offset = -6)
applyOffset("05:12", -6) // → "05:06"

Key facts:

Ramadan 1: February 19, 2026 (subject to moon sighting)
Ramadan 30: March 20, 2026
Offsets range from -6 min (Sylhet — earliest) to +9 min (Chapainawabganj — latest)
Times use 24h format for easy JavaScript Date manipulation
Islamic Foundation Bangladesh confirmed separate schedules for all 64 districts this year (2026 is the first year they officially published per-district times rather than requiring manual calculation from Dhaka)