"use client";

import { formatMinutes, hours } from "@/lib/business";
import { useShopTime } from "@/lib/useNow";

export function OpenStatus({ className = "" }: { className?: string }) {
  const now = useShopTime();
  if (!now) return <span className={className} aria-hidden />;

  const today = hours[now.day];
  const open =
    today.open !== null && today.close !== null && now.minutes >= today.open && now.minutes < today.close;

  let label: string;
  if (open) {
    label = `Open · closes ${formatMinutes(today.close!)}`;
  } else {
    let d = now.day;
    let offset = 0;
    // Before opening today counts as "today"; otherwise look ahead.
    if (!(today.open !== null && now.minutes < today.open)) {
      do {
        d = (d + 1) % 7;
        offset++;
      } while (hours[d].open === null);
    }
    const when = offset === 0 ? "" : offset === 1 ? " tomorrow" : ` ${hours[d].short}`;
    label = `Closed · opens${when} ${formatMinutes(hours[d].open!)}`;
  }

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span
        className={`size-1.5 rounded-full ${open ? "animate-pulse-dot bg-emerald-400 text-emerald-400" : "bg-mist/60"}`}
      />
      {label}
    </span>
  );
}
