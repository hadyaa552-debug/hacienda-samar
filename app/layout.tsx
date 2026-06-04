import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "هاسيندا راس الحكمة | بالم هيلز - Hacienda Ras El Hekma | Palm Hills",
  description:
    "احجز وحدتك في هاسيندا راس الحكمة من بالم هيلز - Hacienda Ras El Hekma by Palm Hills Developments. مقدم 5% وتقسيط حتى 10 سنوات. شقق وفلل وتوين هاوس بأسعار لونش. عرض لفترة محدودة.",
  keywords:
    "هاسيندا راس الحكمة, بالم هيلز, Palm Hills, Hacienda Ras El Hekma, Hacienda Palm Hills, هاسيندا بالم هيلز, بالم هيلز راس الحكمة, شاليهات راس الحكمة, فلل الساحل الشمالي, Palm Hills North Coast, Palm Hills Developments",
  openGraph: {
    title: "هاسيندا راس الحكمة - بالم هيلز | Hacienda Ras El Hekma - Palm Hills",
    description:
      "أحدث مشروعات بالم هيلز في راس الحكمة. مقدم 5% وتقسيط 10 سنوات. احجز الآن!",
    type: "website",
    locale: "ar_EG",
  },
};

// ─── Constants ───
const PHONE = "01080231288";
const WA_LINK = `https://wa.me/2${PHONE}`;
// Replace with your actual Google Ads Conversion ID when ready
const CONVERSION_ID = "AW-CONVERSION_ID";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Playfair+Display:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Google Ads gtag – replace CONVERSION_ID */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${CONVERSION_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${CONVERSION_ID}');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
