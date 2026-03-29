import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "66 Anthony Street | Luxury Property Showcase",
  description:
    "Explore 66 Anthony Street — a stunning property featuring modern design, premium finishes, and exceptional living spaces. Schedule a private showing today.",
  keywords: "66 Anthony Street, luxury home, real estate, property showcase, modern home",
  openGraph: {
    title: "66 Anthony Street | Luxury Property Showcase",
    description:
      "Explore 66 Anthony Street — a stunning property featuring modern design, premium finishes, and exceptional living spaces.",
    type: "website",
    url: "https://66anthony.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
