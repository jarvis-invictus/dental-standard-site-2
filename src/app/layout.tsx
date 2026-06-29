
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";

const figtree = Figtree({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
  title: "Dentalist - Premium Smile Dental Clinic in Aundh, Pune",
  description: "Experience premium dental care at Dentalist. Specialized in root canals, teeth alignment, implants, and teeth whitening in Aundh.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content="Aundh, Pune, Maharashtra, India" />
        <meta name="geo.position" content="18.5602;73.8031" />
        <meta name="ICBM" content="18.5602, 73.8031" />
      </head>
      <body className={figtree.className}>
        {children}
      </body>
    </html>
  );
}
