import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "هاسيندا راس الحكمة بالم هيلز | Hacienda Ras El Hekma Palm Hills — أسعار وتقسيط",
  description: "هاسيندا راس الحكمة من بالم هيلز — Hacienda Ras El Hekma by Palm Hills. ١٬٤٠٠ فدان، ٤.٨ كم شاطئ، ٥٪ مقدم وتقسيط حتى ١٠ سنوات. هاسيندا بالم هيلز الساحل الشمالي.",
  keywords: "هاسيندا راس الحكمة,بالم هيلز,هاسيندا بالم هيلز,Hacienda Ras El Hekma,Palm Hills Hacienda,Hacienda Palm Hills,Palm Hills,الساحل الشمالي,شاليهات هاسيندا,فلل بالم هيلز",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
