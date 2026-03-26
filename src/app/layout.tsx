import type { Metadata } from "next";
import { Urbanist, Geist } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Contrast. | World-Class UI/UX for SaaS & Startups",
  description:
    "Psychology-driven UX/UI design agency helping SaaS companies and startups build products users love.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${urbanist.variable} ${geist.variable}`}>
      <body className="antialiased" style={{ background: "#0a0a0a" }}>{children}</body>
    </html>
  );
}
