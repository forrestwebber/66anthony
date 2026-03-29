import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "66 Anthony Street | Modern Luxury in Austin, TX",
  description:
    "Discover 66 Anthony Street — a stunning contemporary residence in Austin, TX featuring 3 beds, 2 baths, and 1,850 sq ft of designer living space. Schedule a private tour today.",
  openGraph: {
    title: "66 Anthony Street | Modern Luxury in Austin, TX",
    description:
      "A stunning contemporary residence in one of Austin's most sought-after neighborhoods. 3 beds, 2 baths, 1,850 sq ft.",
    type: "website",
    url: "https://66anthony.com",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "66 Anthony Street Exterior",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "66 Anthony Street | Modern Luxury in Austin, TX",
    description: "Contemporary living at its finest. Schedule a private tour.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-neutral-50`}>{children}</body>
    </html>
  );
}
