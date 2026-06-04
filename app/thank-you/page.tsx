"use client";

import { useEffect } from "react";

const PHONE = "01080231288";
const WA = `https://wa.me/2${PHONE}?text=${encodeURIComponent("أريد حجز وحدة في هاسيندا راس الحكمة")}`;

export default function ThankYou() {
  useEffect(() => {
    // Fire Google Ads conversion on page load
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-CONVERSION_ID/FORM_LABEL",
      });
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: "linear-gradient(135deg, #5A0F1B 0%, #8B1A2B 40%, #A02040 100%)" }}>
      <div className="bg-white rounded-2xl p-10 max-w-[500px] w-full text-center shadow-2xl">
        <div className="w-20 h-20 bg-[#25D366] rounded-full flex items-center justify-center text-white text-4xl mx-auto mb-6">✓</div>
        <h1 className="text-palm-maroon text-2xl font-extrabold mb-3">تم استلام بياناتك بنجاح!</h1>
        <p className="text-palm-gray text-sm mb-2">شكراً لاهتمامك بمشروع هاسيندا راس الحكمة من بالم هيلز</p>
        <p className="text-palm-gray text-sm mb-8">هيتم التواصل معاك في أقرب وقت</p>
        <a
          href={WA}
          target="_blank"
          className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-xl text-base font-extrabold hover:bg-[#1EBE5A] transition-all w-full mb-3"
        >
          تواصل معنا واتساب لرد أسرع
        </a>
        <a
          href={`tel:${PHONE}`}
          className="inline-flex items-center justify-center gap-2 bg-palm-maroon text-white px-8 py-4 rounded-xl text-base font-extrabold hover:bg-palm-dark transition-all w-full"
        >
          اتصل بنا الآن
        </a>
      </div>
    </div>
  );
}
