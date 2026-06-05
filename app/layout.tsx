import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "هاسيندا راس الحكمة | بالم هيلز - Hacienda Ras El Hekma | Palm Hills",
  description:
    "احجز وحدتك في هاسيندا راس الحكمة من بالم هيلز - Hacienda Ras El Hekma by Palm Hills Developments. مقدم 5% وتقسيط حتى 10 سنوات. شقق وفلل وتوين هاوس بأسعار لونش.",
  keywords:
    "هاسيندا راس الحكمة, بالم هيلز, Palm Hills, Hacienda Ras El Hekma, Hacienda Palm Hills, هاسيندا بالم هيلز, بالم هيلز راس الحكمة, Palm Hills Ras El Hekma, Palm Hills North Coast, Palm Hills Developments, شاليهات راس الحكمة, فلل الساحل الشمالي",
  openGraph: {
    title: "هاسيندا راس الحكمة - بالم هيلز | Hacienda Ras El Hekma",
    description: "أحدث مشروعات بالم هيلز في راس الحكمة. مقدم 5% وتقسيط 10 سنوات.",
    type: "website",
    locale: "ar_EG",
  },
};

const CONVERSION_ID = "AW-CONVERSION_ID";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap"
          rel="stylesheet"
        />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${CONVERSION_ID}`} strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${CONVERSION_ID}');`}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
