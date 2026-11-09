import type { Metadata, Viewport } from "next";
import { Inter_Tight, Newsreader, JetBrains_Mono } from "next/font/google";
import { business, hours } from "@/lib/business";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ridgeline Auto Works · Cedar Hollow, CA",
  description:
    "Family-owned, ASE-certified auto repair in Cedar Hollow since 1994. Honest diagnostics for engines, brakes, tires and A/C on domestic and import cars. Free quotes over the phone.",
  // Pre-launch: keep out of search results. Remove before going live.
  robots: { index: false, follow: false },
  openGraph: {
    title: "Ridgeline Auto Works · Cedar Hollow, CA",
    description: "Whatever's making that noise, we'll help you understand it.",
    images: [{ url: "/og.jpg", width: 1200, height: 675 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0c1726",
};

const pad = (m: number) =>
  `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: business.name,
  telephone: business.phone,
  foundingDate: String(business.established),
  image: "/og.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: business.street,
    addressLocality: business.city,
    addressRegion: business.region,
    postalCode: business.postalCode,
    addressCountry: "US",
  },
  openingHoursSpecification: hours
    .filter((h) => h.open !== null && h.close !== null)
    .map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.day,
      opens: pad(h.open!),
      closes: pad(h.close!),
    })),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: business.rating,
    reviewCount: business.reviewCount,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${newsreader.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
