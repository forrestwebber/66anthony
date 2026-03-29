import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "66 Anthony Street | Modern Luxury Living in Austin, TX",
  description:
    "Discover 66 Anthony Street — a stunning contemporary residence in Austin, TX featuring 3 beds, 2 baths, and 1,850 sq ft of designer living space. Schedule a private tour today.",
  keywords: [
    "66 Anthony Street",
    "Austin TX real estate",
    "luxury home Austin",
    "modern home for sale",
    "Austin property",
    "contemporary residence Austin",
  ],
  openGraph: {
    title: "66 Anthony Street | Modern Luxury Living in Austin, TX",
    description:
      "A stunning contemporary residence in one of Austin's most sought-after neighborhoods. 3 beds, 2 baths, 1,850 sq ft.",
    type: "website",
    url: "https://66anthony.com",
    siteName: "66 Anthony Street",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "66 Anthony Street — Modern Luxury Home in Austin, TX",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "66 Anthony Street | Modern Luxury in Austin, TX",
    description: "Contemporary living at its finest. Schedule a private tour.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://66anthony.com" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  name: "66 Anthony Street",
  description:
    "A stunning contemporary residence designed for the modern homeowner. 66 Anthony Street blends clean architectural lines with warm, livable interiors.",
  url: "https://66anthony.com",
  image:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
  address: {
    "@type": "PostalAddress",
    streetAddress: "66 Anthony Street",
    addressLocality: "Austin",
    addressRegion: "TX",
    addressCountry: "US",
  },
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  numberOfRooms: 5,
  numberOfBedrooms: 3,
  numberOfBathroomsTotal: 2,
  floorSize: {
    "@type": "QuantitativeValue",
    value: 1850,
    unitCode: "FTK",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} bg-neutral-950`}>{children}</body>
    </html>
  );
}
