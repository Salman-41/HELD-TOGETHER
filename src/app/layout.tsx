import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const instrument = localFont({
  src: "../assets/fonts/InstrumentSerif-latin.woff2",
  variable: "--font-instrument",
  weight: "400",
  display: "swap",
});
const inter = localFont({
  src: "../assets/fonts/Inter-latin.woff2",
  variable: "--font-inter",
  weight: "400 500",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "HELD TOGETHER", template: "%s — HELD TOGETHER" },
  description: "A suspended beam, one clay weight, and the act of sharing support. An original architectural sculpture study.",
};
export const viewport: Viewport = { themeColor: "#E7E1D5" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${instrument.variable} ${inter.variable}`}>
      <body>
        <a className="skip-link" href="#main">Skip to main content</a>
        {children}
      </body>
    </html>
  );
}
