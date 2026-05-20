import type { TimeValue } from "./types";

export function formatTime(t: TimeValue): string {
  const m = t.minute.toString().padStart(2, "0");
  const h = t.hour === 0 ? 12 : t.hour > 12 ? t.hour - 12 : t.hour;
  return `${h}:${m} ${t.period}`;
}

export function sunriseStartLabel(t: TimeValue): string {
  const total = t.hour % 12 + t.minute / 60 + (t.period === "pm" ? 12 : 0);
  const start = total - 0.5;
  const h = Math.floor(start);
  const min = Math.round((start - h) * 60);
  const period = t.period;
  const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${hour12}:${min.toString().padStart(2, "0")} ${period}`;
}
