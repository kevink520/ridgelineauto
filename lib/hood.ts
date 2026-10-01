// Frame sequence extracted from under-the-hood-scroll.mp4 (1920×1080 @ 24fps).
export const FRAME_COUNT = 289;

export function framePath(index: number, small: boolean) {
  const n = String(index + 1).padStart(4, "0");
  return `/hood/${small ? "frames-sm" : "frames"}/f_${n}.webp`;
}

// Scroll progress (0–1 across the pinned section) is split into three phases:
// intro with the neutral car, the scrubbed video, and an outro back to neutral.
export const INTRO_END = 0.12;
export const OUTRO_START = 0.92;

export type Chapter = {
  id: string;
  index: string;
  name: string;
  /** Inclusive frame range where this system is lit. */
  from: number;
  to: number;
  accent: "amber" | "cyan";
  symptom: string;
  cta: string;
  body: string;
  services: string[];
  /** Target point on the 16:9 frame, in percent. */
  target: { x: number; y: number };
  still: string;
};

export const chapters: Chapter[] = [
  {
    id: "engine",
    index: "01",
    name: "Engine",
    from: 0,
    to: 66,
    accent: "amber",
    symptom: "Rough idle or an unfamiliar rattle?",
    cta: "Book an engine check",
    body: "We'll trace the cause and explain your repair options, whether it's a sensor, a gasket or something bigger.",
    services: ["Check engine light", "Engine repair", "Timing belts"],
    target: { x: 25, y: 45 },
    still: "/hood/stills/01-engine.webp",
  },
  {
    id: "brakes",
    index: "02",
    name: "Brakes",
    from: 67,
    to: 138,
    accent: "amber",
    symptom: "Squeaking, grinding, or a soft pedal?",
    cta: "Book a brake check",
    body: "We'll inspect your pads, rotors and calipers and show you exactly what needs attention, and what can wait.",
    services: ["Brake repair", "Rotor resurfacing", "Calipers & lines"],
    target: { x: 40, y: 68 },
    still: "/hood/stills/02-brakes.webp",
  },
  {
    id: "tires",
    index: "03",
    name: "Tires",
    from: 139,
    to: 210,
    accent: "amber",
    symptom: "Vibration or uneven wear?",
    cta: "Book a tire check",
    body: "We'll check your tires, balance and alignment, plus the steering and suspension parts that wear them down.",
    services: ["Vibration diagnosis", "Steering & suspension", "TPMS"],
    target: { x: 37, y: 76 },
    still: "/hood/stills/03-tires.webp",
  },
  {
    id: "ac",
    index: "04",
    name: "Air conditioning",
    from: 211,
    to: 288,
    accent: "cyan",
    symptom: "Air feeling warm?",
    cta: "Book an A/C check",
    body: "We'll check cooling performance, pressure-test the system and look for leaks before we recharge anything.",
    services: ["A/C diagnosis", "Leak detection", "Heater core & hoses"],
    target: { x: 12, y: 56 },
    still: "/hood/stills/04-air-conditioning.webp",
  },
];
