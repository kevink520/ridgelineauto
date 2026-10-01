"use client";

import { formatMinutes, hours } from "@/lib/business";
import { useShopTime } from "@/lib/useNow";

// Monday-first order for display.
const order = [1, 2, 3, 4, 5, 6, 0];

export function HoursTable() {
  const now = useShopTime();
  return (
    <table className="w-full text-sm">
      <caption className="sr-only">Shop hours</caption>
      <tbody>
        {order.map((d) => {
          const h = hours[d];
          const today = now?.day === d;
          return (
            <tr key={h.day} className={`border-t border-white/[0.07] ${today ? "text-white" : "text-mist"}`}>
              <th scope="row" className="py-2.5 text-left font-normal">
                <span className="inline-flex items-center gap-2">
                  {h.day}
                  {today && <span className="eyebrow rounded-full bg-amber/15 px-2 py-0.5 text-[10px] text-amber">Today</span>}
                </span>
              </th>
              <td className="py-2.5 text-right whitespace-nowrap tabular-nums">
                {h.open === null ? "Closed" : `${formatMinutes(h.open)} – ${formatMinutes(h.close!)}`}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
