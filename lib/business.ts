export const business = {
  name: "Ridgeline Auto Works",
  shortName: "Ridgeline Auto",
  established: 1994,
  owners: "Marco & Dee",
  phone: "(555) 014-2290",
  phoneHref: "tel:+15550142290",
  street: "1180 Alder Way, Unit 4",
  city: "Cedar Hollow",
  region: "CA",
  postalCode: "90000",
  rating: 4.9,
  reviewCount: 340,
  timeZone: "America/Los_Angeles",
} as const;

// Day index follows Date#getDay(): 0 = Sunday. Times are minutes after midnight.
export const hours: { day: string; short: string; open: number | null; close: number | null }[] = [
  { day: "Sunday", short: "Sun", open: null, close: null },
  { day: "Monday", short: "Mon", open: 7 * 60 + 30, close: 18 * 60 },
  { day: "Tuesday", short: "Tue", open: 7 * 60 + 30, close: 18 * 60 },
  { day: "Wednesday", short: "Wed", open: 7 * 60 + 30, close: 18 * 60 },
  { day: "Thursday", short: "Thu", open: 7 * 60 + 30, close: 18 * 60 },
  { day: "Friday", short: "Fri", open: 7 * 60 + 30, close: 18 * 60 },
  { day: "Saturday", short: "Sat", open: 9 * 60, close: 14 * 60 },
];

export function formatMinutes(m: number) {
  const h = Math.floor(m / 60);
  const min = m % 60;
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return min ? `${h12}:${String(min).padStart(2, "0")} ${suffix}` : `${h12} ${suffix}`;
}

export const serviceGroups = [
  {
    id: "diagnostics",
    index: "01",
    title: "Diagnostics",
    blurb: "Noises, vibrations, warning lights. We find the cause before we quote the fix.",
    items: [
      "Check engine light",
      "General diagnosis",
      "Noise diagnosis",
      "Vibration diagnosis",
      "No-start diagnosis",
      "Pre-purchase inspection",
    ],
  },
  {
    id: "engine",
    index: "02",
    title: "Engine & Transmission",
    blurb: "From valve cover gaskets to remanufactured engines and transmissions.",
    items: [
      "Engine repair",
      "Transmission repair",
      "Transmission leak inspection",
      "Timing belts & water pumps",
      "Manual clutch replacement",
      "Exhaust repair",
    ],
  },
  {
    id: "brakes",
    index: "03",
    title: "Brakes & Suspension",
    blurb: "Pads, rotors, calipers, steering and suspension, done right the first time.",
    items: [
      "Brake repair",
      "Rotor resurfacing",
      "Steering & suspension",
      "Drive shafts & axles",
      "TPMS diagnosis",
    ],
  },
  {
    id: "electrical",
    index: "04",
    title: "Electrical & A/C",
    blurb: "Batteries, starters, lighting, heater cores and air conditioning.",
    items: [
      "Battery & electrical",
      "Starters & alternators",
      "Auto light repair",
      "HVAC & A/C repair",
      "Heater core & hoses",
    ],
  },
  {
    id: "maintenance",
    index: "05",
    title: "Maintenance",
    blurb: "The routine work that keeps the big repairs away.",
    items: [
      "Oil changes",
      "Fluids & filters",
      "Fuel system cleaning",
      "Smog check",
      "Routine maintenance",
    ],
  },
] as const;

export const reviews = [
  {
    quote: "They showed me the worn part, explained it, and charged exactly what they quoted.",
    name: "Priya S.",
  },
  {
    quote: "Two other shops wanted to replace everything. Marco fixed one sensor and I was on my way.",
    name: "Dan M.",
  },
  {
    quote: "Honest, quick, and they actually call you back. My whole family brings their cars here now.",
    name: "Luis R.",
  },
] as const;
