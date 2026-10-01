export const business = {
  name: "BC Advance Auto Repair",
  shortName: "BC Advance Auto",
  established: 1985,
  owners: "Charlie & Tony",
  phone: "(714) 554-8290",
  phoneHref: "tel:+17145548290",
  street: "308 N Harbor Blvd, Ste B",
  city: "Santa Ana",
  region: "CA",
  postalCode: "92703",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=308+N+Harbor+Blvd+B,+Santa+Ana,+CA+92703",
  reviewsUrl:
    "https://www.google.com/search?q=BC+Advance+Auto+Santa+Ana+reviews",
  rating: 4.8,
  reviewCount: 707,
  timeZone: "America/Los_Angeles",
} as const;

// Day index follows Date#getDay(): 0 = Sunday. Times are minutes after midnight.
export const hours: { day: string; short: string; open: number | null; close: number | null }[] = [
  { day: "Sunday", short: "Sun", open: null, close: null },
  { day: "Monday", short: "Mon", open: 8 * 60, close: 17 * 60 + 30 },
  { day: "Tuesday", short: "Tue", open: 8 * 60, close: 17 * 60 + 30 },
  { day: "Wednesday", short: "Wed", open: 8 * 60, close: 17 * 60 + 30 },
  { day: "Thursday", short: "Thu", open: 8 * 60, close: 17 * 60 + 30 },
  { day: "Friday", short: "Fri", open: 8 * 60, close: 17 * 60 + 30 },
  { day: "Saturday", short: "Sat", open: 8 * 60, close: 15 * 60 },
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
    quote: "Whether I get just an oil change or any other service they give a fair price.",
    name: "Elmer B.",
  },
  {
    quote: "They work quickly, they’re nice, and they’re super fair with their prices.",
    name: "Richard L.",
  },
  {
    quote: "No pushy people to get you spend more money than what need to be done.",
    name: "Truong D.",
  },
] as const;
