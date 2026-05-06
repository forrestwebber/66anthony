import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "66 Anthony | Oak Forest Modern Homes — Austin, TX",
  description: "Three luxury residences in East Austin. Pool, carport, curated finishes. A Slacked.co production.",
  metadataBase: new URL("https://66anthony.com"),
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "66 Anthony | Oak Forest Modern Homes",
    description: "Three luxury residences in East Austin. Pool, carport, curated finishes.",
    images: ["/home.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "66 Anthony | Oak Forest Modern Homes",
    description: "Three luxury residences in East Austin.",
    images: ["/home.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-P76DS00SXK" />
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-P76DS00SXK');` }} />
      </head>
      <body className="bg-[#faf8f4] text-[#1a1714]">{children}</body>
    </html>
  );
}
