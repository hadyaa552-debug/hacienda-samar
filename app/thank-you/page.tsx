"use client";
import { useEffect } from "react";

export default function ThankYou() {
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "conversion", {
        send_to: "AW-18271769567/cDkZCLSyxcgcEN-n1IhE",
        value: 1.0,
        currency: "EGP",
      });
    }
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #0a1628 0%, #132238 100%)",
      fontFamily: "var(--font-sans)",
      padding: "24px",
      textAlign: "center",
    }}>
      <div style={{
        maxWidth: 480,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(184,134,11,0.15)",
        borderRadius: 20,
        padding: "48px 32px",
      }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>✓</div>
        <h1 style={{
          fontFamily: "var(--font-serif)",
          fontSize: 28,
          fontWeight: 700,
          color: "#fff",
          marginBottom: 12,
        }}>
          تم استلام بياناتك بنجاح
        </h1>
        <p style={{
          color: "rgba(255,255,255,0.55)",
          fontSize: 15,
          lineHeight: 1.8,
          marginBottom: 24,
        }}>
          شكراً لاهتمامك بمشروع هاسيندا راس الحكمة — Hacienda Ras El Hekma من بالم هيلز.
          <br />سيتواصل معك أحد مستشارينا في أقرب وقت.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="https://wa.me/201096988666?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D9%87%D8%A7%D8%B3%D9%8A%D9%86%D8%AF%D8%A7%20%D8%B1%D8%A7%D8%B3%20%D8%A7%D9%84%D8%AD%D9%83%D9%85%D8%A9%20%D8%A8%D8%A7%D9%84%D9%85%20%D9%87%D9%8A%D9%84%D8%B2"
            target="_blank"
            rel="noopener"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "12px 24px", borderRadius: 10,
              background: "#25d366", color: "#fff",
              fontWeight: 700, fontSize: 14, textDecoration: "none",
              fontFamily: "var(--font-sans)",
            }}
          >
            💬 تواصل واتساب
          </a>
          <a
            href="tel:+201096988666"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "12px 24px", borderRadius: 10,
              background: "transparent", color: "var(--color-gold)",
              border: "1px solid rgba(184,134,11,0.3)",
              fontWeight: 700, fontSize: 14, textDecoration: "none",
              fontFamily: "var(--font-sans)",
            }}
          >
            📞 اتصل بنا
          </a>
        </div>
        <a
          href="/"
          style={{
            display: "inline-block", marginTop: 28,
            color: "rgba(255,255,255,0.35)", fontSize: 12,
            textDecoration: "underline",
          }}
        >
          العودة للصفحة الرئيسية
        </a>
      </div>
    </div>
  );
}
