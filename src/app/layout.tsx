import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "66 Anthony | Oak Forest Modern Homes",
  description: "Superior design as a moat. A high-end infill development in Austin, TX.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "66 Anthony | Oak Forest Modern Homes",
    description: "Superior design as a moat. A high-end infill development in Austin, TX.",
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
      <body>{children}</body>
    </html>
  );
}
