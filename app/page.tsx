"use client";

import { useState, useEffect, useCallback } from "react";

/* ═══════════════════ CONSTANTS ═══════════════════ */
const PHONE = "01080231288";
const WA = `https://wa.me/2${PHONE}`;
const WA_MSG = (msg: string) =>
  `${WA}?text=${encodeURIComponent(msg)}`;
const WEB3FORMS_KEY = "50f2c493-44ae-415d-8942-1195ac718d26";
const LAUNCH_DAYS = 9;

/* ═══════════════════ TRACKING ═══════════════════ */
declare global {
  interface Window { dataLayer: unknown[]; gtag: (...args: unknown[]) => void; }
}
function trackEvent(label: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "conversion", {
      send_to: "AW-CONVERSION_ID/" + label,
    });
    window.gtag("event", label, {
      event_category: "engagement",
      event_label: "Hacienda Ras El Hekma - Palm Hills",
    });
  }
}
function trackWhatsApp() { trackEvent("WHATSAPP_CLICK"); }
function trackCall() { trackEvent("CALL_CLICK"); }

/* ═══════════════════ COUNTDOWN HOOK ═══════════════════ */
function useCountdown(days: number) {
  const [end] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    d.setHours(23, 59, 59, 0);
    return d;
  });
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = end.getTime() - Date.now();
      if (diff <= 0) return;
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [end]);

  return time;
}

const pad = (n: number) => String(n).padStart(2, "0");

/* ═══════════════════ SVG ICONS ═══════════════════ */
const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const PhoneIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
);

/* ═══════════════════ MAIN PAGE ═══════════════════ */
export default function Page() {
  const countdown = useCountdown(LAUNCH_DAYS);
  const [popup, setPopup] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");
  const [form, setForm] = useState({ name: "", phone: "", unit: "", notes: "" });

  /* Popup after 5s */
  useEffect(() => {
    if (sessionStorage.getItem("popupClosed")) return;
    const t = setTimeout(() => setPopup(true), 5000);
    return () => clearTimeout(t);
  }, []);

  /* Header scroll */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const closePopup = useCallback(() => {
    setPopup(false);
    sessionStorage.setItem("popupClosed", "true");
  }, []);

  /* Form submit */
  const submitForm = async () => {
    if (!form.name.trim() || !form.phone.trim()) {
      alert("من فضلك اكتب اسمك ورقم تليفونك");
      return;
    }
    setFormState("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: "🏖️ ليد جديد - هاسيندا راس الحكمة - بالم هيلز",
          from_name: "Hacienda Ras El Hekma LP",
          name: form.name,
          phone: form.phone,
          unit_type: form.unit || "غير محدد",
          notes: form.notes || "لا يوجد",
          source: "Hacienda Ras El Hekma - Palm Hills Landing Page",
        }),
      });
      if (!res.ok) throw new Error();
      setFormState("sent");
      trackEvent("FORM_SUBMIT");
    } catch {
      setFormState("idle");
      alert("حصل مشكلة، جرب تاني أو تواصل واتساب");
    }
  };

  /* ─── Shared styles ─── */
  const gradientHero = "linear-gradient(135deg, #5A0F1B 0%, #8B1A2B 40%, #A02040 100%)";

  const diamondBg =
    "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30z' fill='none' stroke='rgba(201,168,76,0.06)' stroke-width='1'/%3E%3C/svg%3E\")";

  const units = [
    { type: "شقق فندقية", area: "تبدأ من 110 م²", price: "12,000,000 ج.م", msg: "أريد تفاصيل الشقق في هاسيندا راس الحكمة" },
    { type: "توين هاوس", area: "تبدأ من 200 م²", price: "19,000,000 ج.م", msg: "أريد تفاصيل التوين هاوس في هاسيندا" },
    { type: "ستاند ألون فيلا", area: "تبدأ من 363 م²", price: "30,000,000 ج.م", msg: "أريد تفاصيل الفلل في هاسيندا راس الحكمة" },
  ];

  const services = [
    { icon: "🏖️", title: "شاطئ خاص", desc: "شاطئ بطول 4.8 كم على البحر الأبيض المتوسط بمياه كريستالية ورمال ذهبية" },
    { icon: "🏨", title: "3 فنادق عالمية", desc: "فنادق فاخرة توفر خدمات ضيافة عالمية المستوى على مدار العام" },
    { icon: "🌊", title: "لاجونز ومسطحات مائية", desc: "مسطحات مائية تغطي مساحات واسعة لإطلالات ساحرة" },
    { icon: "🏊", title: "أكوا بارك", desc: "حديقة ألعاب مائية متكاملة للكبار والأطفال بأحدث التصميمات" },
    { icon: "🛡️", title: "أمن وحراسة 24/7", desc: "منظومة أمنية متكاملة بأحدث أنظمة المراقبة" },
    { icon: "🏥", title: "رعاية طبية", desc: "عيادات ومرافق طبية مجهزة بأحدث التقنيات" },
    { icon: "🛍️", title: "مراكز تجارية", desc: "مناطق تسوق ومطاعم وكافيهات بأعلى المعايير" },
    { icon: "🏋️", title: "كلوب هاوس ونادي رياضي", desc: "نادي رياضي متكامل وكلوب هاوس بأحدث الأجهزة" },
  ];

  const locations = [
    { icon: "📍", title: "العنوان", desc: "الكيلو 238 طريق الإسكندرية - مطروح الساحلي، راس الحكمة" },
    { icon: "🏙️", title: "مدينة العلمين الجديدة", desc: "على بعد مسافة قريبة شرق المشروع" },
    { icon: "✈️", title: "مطار برج العرب الدولي", desc: "حوالي ساعة بالسيارة" },
    { icon: "🏖️", title: "هاسيندا سيدي حنيش", desc: "على بعد 25 دقيقة بالسيارة" },
    { icon: "🌅", title: "مرسى مطروح", desc: "حوالي ساعة ونصف بالسيارة" },
  ];

  return (
    <>
      {/* ═══════════ HEADER ═══════════ */}
      <header
        className="fixed top-0 left-0 right-0 z-[1000] transition-all duration-300"
        style={{
          background: scrolled ? "rgba(90,15,27,0.98)" : "rgba(90,15,27,0.95)",
          backdropFilter: "blur(12px)",
          padding: scrolled ? "8px 0" : "12px 0",
          borderBottom: "1px solid rgba(201,168,76,0.3)",
        }}
      >
        <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-palm-gold rotate-45 rounded flex items-center justify-center">
              <span className="-rotate-45 font-bold text-palm-dark" style={{ fontFamily: "var(--font-playfair)" }}>PH</span>
            </div>
            <div>
              <h1 className="text-white text-sm font-bold leading-tight">هاسيندا راس الحكمة</h1>
              <small className="text-palm-gold text-[10px] tracking-widest uppercase">Palm Hills Developments</small>
            </div>
          </div>
          <div className="hidden md:flex gap-2.5">
            <a href={WA_MSG("أريد الاستفسار عن هاسيندا راس الحكمة")} target="_blank" onClick={trackWhatsApp}
              className="flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-bold bg-[#25D366] text-white hover:bg-[#1EBE5A] transition-all hover:-translate-y-0.5">
              <WhatsAppIcon size={14} /> واتساب
            </a>
            <a href={`tel:${PHONE}`} onClick={trackCall}
              className="flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-bold bg-palm-gold text-palm-dark hover:bg-[#D4B35A] transition-all hover:-translate-y-0.5">
              <PhoneIcon size={13} /> اتصل الآن
            </a>
          </div>
        </div>
      </header>

      {/* ═══════════ HERO ═══════════ */}
      <section
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{ background: gradientHero, padding: "100px 24px 60px" }}
      >
        <div className="absolute inset-0" style={{ backgroundImage: diamondBg, backgroundSize: "60px 60px" }} />
        <div className="absolute bottom-0 left-0 right-0 h-[200px]" style={{ background: "linear-gradient(to top, #FAF6F0, transparent)" }} />

        <div className="relative z-10 text-center max-w-[900px]">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-palm-gold text-sm font-semibold mb-6"
            style={{
              background: "rgba(201,168,76,0.15)",
              border: "1px solid rgba(201,168,76,0.4)",
              animation: "pulse-badge 2s infinite",
            }}
          >
            <span className="w-2 h-2 bg-[#25D366] rounded-full" style={{ animation: "blink 1.5s infinite" }} />
            عرض اللونش متاح الآن - لفترة محدودة
          </div>

          <h3 className="text-white/80 mb-1" style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(18px,3vw,28px)" }}>
            أحدث مشروعات بالم هيلز في الساحل الشمالي
          </h3>
          <h2 className="text-white font-black mb-3 leading-tight" style={{ fontSize: "clamp(28px,5vw,52px)" }}>
            هاسيندا <span className="text-palm-gold">راس الحكمة</span>
          </h2>
          <p className="text-palm-gold font-semibold mb-7 tracking-[3px]" style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(14px,2vw,20px)", direction: "ltr" }}>
            HACIENDA RAS EL HEKMA — PALM HILLS
          </p>

          {/* Stats */}
          <div className="flex gap-4 md:gap-6 justify-center flex-wrap mb-9">
            {[
              { val: "1,400", lbl: "فدان مساحة المشروع" },
              { val: "5%", lbl: "مقدم حجز فقط" },
              { val: "10", lbl: "سنوات تقسيط" },
              { val: "4.8 km", lbl: "شاطئ خاص" },
            ].map((s) => (
              <div key={s.val} className="min-w-[110px] md:min-w-[140px] rounded-xl px-5 py-4" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}>
                <span className="block text-palm-gold text-xl md:text-2xl font-black">{s.val}</span>
                <span className="text-white/70 text-xs">{s.lbl}</span>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-center flex-wrap">
            <a href={WA_MSG("أريد حجز وحدة في هاسيندا راس الحكمة")} target="_blank" onClick={trackWhatsApp}
              className="inline-flex items-center gap-2 bg-palm-gold text-palm-dark px-8 md:px-10 py-4 rounded-lg text-base font-extrabold transition-all hover:bg-[#D4B35A] hover:-translate-y-0.5 hover:shadow-lg">
              <WhatsAppIcon /> احجز عبر واتساب
            </a>
            <a href={`tel:${PHONE}`} onClick={trackCall}
              className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 md:px-10 py-4 rounded-lg text-base font-bold transition-all hover:border-palm-gold hover:text-palm-gold">
              <PhoneIcon /> اتصل بنا الآن
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════ COUNTDOWN ═══════════ */}
      <section className="bg-palm-dark py-10 px-6 text-center border-t-[3px] border-palm-gold">
        <h3 className="text-palm-gold text-xl font-extrabold mb-1">⏰ عرض اللونش ينتهي قريباً</h3>
        <p className="text-white/70 text-sm mb-5">احجز وحدتك في هاسيندا راس الحكمة - بالم هيلز قبل انتهاء العرض</p>
        <div className="flex gap-4 justify-center flex-wrap">
          {[
            { v: countdown.d, l: "يوم" },
            { v: countdown.h, l: "ساعة" },
            { v: countdown.m, l: "دقيقة" },
            { v: countdown.s, l: "ثانية" },
          ].map((c) => (
            <div key={c.l} className="min-w-[80px] rounded-xl px-6 py-4" style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)" }}>
              <span className="block text-palm-gold text-4xl font-black leading-none">{pad(c.v)}</span>
              <span className="text-white/60 text-xs mt-1">{c.l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ ABOUT ═══════════ */}
      <section className="py-20 px-6 bg-white" id="about">
        <div className="max-w-[1100px] mx-auto">
          <p className="text-center text-xs tracking-[3px] uppercase text-palm-gold font-bold mb-2">PALM HILLS DEVELOPMENTS</p>
          <h2 className="text-center text-palm-maroon font-black mb-10" style={{ fontSize: "clamp(24px,4vw,38px)" }}>
            عن مشروع هاسيندا راس الحكمة
          </h2>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="rounded-2xl overflow-hidden h-[300px] md:h-[400px] flex items-center justify-center relative" style={{ background: gradientHero }}>
              <div className="text-center px-6">
                <p className="text-palm-gold text-3xl" style={{ fontFamily: "var(--font-playfair)" }}>Hacienda<br />Ras El Hekma</p>
                <span className="block text-white/60 text-base mt-2">Palm Hills — North Coast</span>
              </div>
              <div className="absolute inset-0 rounded-2xl" style={{ border: "2px solid rgba(201,168,76,0.3)" }} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-palm-maroon mb-1">هاسيندا راس الحكمة</h2>
              <h3 className="text-palm-gold text-lg mb-5 text-right" style={{ fontFamily: "var(--font-playfair)", direction: "ltr" }}>Hacienda Ras El Hekma by Palm Hills</h3>
              <p className="text-palm-gray text-sm leading-[1.9] mb-4">
                أحدث وأضخم مشروعات شركة بالم هيلز للتطوير العقاري في قلب راس الحكمة بالساحل الشمالي. يمتد المشروع على مساحة 1,400 فدان مع شاطئ خاص بطول 4.8 كيلومتر على البحر الأبيض المتوسط.
              </p>
              <p className="text-palm-gray text-sm leading-[1.9] mb-6">
                يقع مشروع هاسيندا بالم هيلز في الكيلو 238 طريق الإسكندرية - مطروح، بالقرب من خليجين طبيعيين، ويضم 3 فنادق فاخرة، أكوا بارك، مناطق ترفيهية، ومرافق متكاملة.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["🏖️ شاطئ 4.8 كم", "🏨 3 فنادق فاخرة", "🌊 لاجونز ومسطحات", "🏊 أكوا بارك", "🚴 ممرات مشي وركوب", "👶 كيدز إريا"].map((f) => (
                  <div key={f} className="flex items-center gap-2 bg-palm-cream px-3 py-2.5 rounded-lg text-palm-maroon text-sm font-semibold">
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ UNITS ═══════════ */}
      <section className="py-20 px-6 bg-palm-cream" id="units">
        <div className="max-w-[1100px] mx-auto">
          <p className="text-center text-xs tracking-[3px] uppercase text-palm-gold font-bold mb-2">HACIENDA PALM HILLS — UNITS</p>
          <h2 className="text-center text-palm-maroon font-black mb-4" style={{ fontSize: "clamp(24px,4vw,38px)" }}>
            أنواع الوحدات والأسعار
          </h2>
          <p className="text-center text-palm-gray text-base max-w-[700px] mx-auto mb-10 leading-[1.8]">
            اختر وحدتك المثالية في هاسيندا راس الحكمة من بالم هيلز — شقق، توين هاوس، وفلل بمساحات متنوعة
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {units.map((u) => (
              <div key={u.type} className="bg-white rounded-2xl overflow-hidden border border-palm-silver transition-all hover:-translate-y-1 hover:shadow-xl hover:border-palm-gold">
                <div className="py-6 text-center" style={{ background: gradientHero }}>
                  <span className="text-palm-gold text-xl font-extrabold">{u.type}</span>
                </div>
                <div className="p-6">
                  {[
                    { l: "المساحات", v: u.area },
                    { l: "السعر يبدأ من", v: u.price },
                    { l: "المقدم", v: "5%" },
                    { l: "التقسيط", v: "حتى 10 سنوات" },
                  ].map((d) => (
                    <div key={d.l} className="flex justify-between items-center py-2.5 border-b border-palm-silver last:border-0 text-sm">
                      <span className="text-palm-gray">{d.l}</span>
                      <span className="font-bold text-palm-maroon">{d.v}</span>
                    </div>
                  ))}
                </div>
                <a href={WA_MSG(u.msg)} target="_blank" onClick={trackWhatsApp}
                  className="block text-center py-3.5 mx-4 mb-4 bg-palm-maroon text-white font-bold text-sm rounded-lg hover:bg-palm-dark transition-all">
                  استفسر الآن
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ SERVICES ═══════════ */}
      <section className="py-20 px-6 bg-white" id="services">
        <div className="max-w-[1100px] mx-auto">
          <p className="text-center text-xs tracking-[3px] uppercase text-palm-gold font-bold mb-2">HACIENDA RAS EL HEKMA — AMENITIES</p>
          <h2 className="text-center text-palm-maroon font-black mb-10" style={{ fontSize: "clamp(24px,4vw,38px)" }}>
            خدمات ومرافق هاسيندا بالم هيلز
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s) => (
              <div key={s.title} className="text-center p-7 rounded-xl bg-palm-cream border border-transparent hover:border-palm-gold transition-all hover:-translate-y-0.5">
                <div className="w-14 h-14 bg-palm-maroon rounded-xl flex items-center justify-center text-2xl mx-auto mb-4">{s.icon}</div>
                <h4 className="text-palm-maroon font-bold text-base mb-2">{s.title}</h4>
                <p className="text-palm-gray text-xs leading-[1.7]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ PAYMENT ═══════════ */}
      <section className="py-20 px-6 relative" style={{ background: gradientHero }}>
        <div className="relative z-10 max-w-[800px] mx-auto text-center">
          <p className="text-xs tracking-[3px] uppercase text-palm-gold font-bold mb-2">PALM HILLS — PAYMENT PLANS</p>
          <h2 className="text-white font-black mb-10" style={{ fontSize: "clamp(24px,4vw,38px)" }}>أنظمة السداد والتقسيط</h2>
          <div className="flex gap-5 justify-center flex-wrap mb-8">
            {[
              { big: "5%", info: "مقدم حجز فقط" },
              { big: "10", info: "سنوات تقسيط بدون فوائد" },
              { big: "0%", info: "فوائد على التقسيط" },
            ].map((p) => (
              <div key={p.info} className="flex-1 min-w-[200px] rounded-2xl p-8" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(201,168,76,0.3)", backdropFilter: "blur(8px)" }}>
                <span className="block text-palm-gold text-5xl font-black leading-none">{p.big}</span>
                <span className="text-white/80 text-sm mt-2 block">{p.info}</span>
              </div>
            ))}
          </div>
          <a href={WA_MSG("أريد معرفة تفاصيل التقسيط في هاسيندا راس الحكمة")} target="_blank" onClick={trackWhatsApp}
            className="inline-flex items-center gap-2 bg-palm-gold text-palm-dark px-10 py-4 rounded-lg text-base font-extrabold hover:bg-[#D4B35A] transition-all hover:-translate-y-0.5">
            احسب قسطك الشهري الآن
          </a>
        </div>
      </section>

      {/* ═══════════ DEVELOPER ═══════════ */}
      <section className="py-20 px-6 bg-white" id="developer">
        <div className="max-w-[900px] mx-auto text-center">
          <p className="text-xs tracking-[3px] uppercase text-palm-gold font-bold mb-2">THE DEVELOPER</p>
          <h2 className="text-palm-maroon font-black text-2xl md:text-3xl mb-1">شركة بالم هيلز للتطوير العقاري</h2>
          <h3 className="text-palm-gold text-xl mb-6" style={{ fontFamily: "var(--font-playfair)", direction: "ltr" }}>Palm Hills Developments</h3>
          <p className="text-palm-gray text-sm leading-[1.9] mb-4">
            تأسست شركة بالم هيلز للتطوير العقاري عام 1997 وأصبحت من أكبر الشركات الرائدة في السوق العقاري المصري. الشركة مدرجة في البورصة المصرية وبورصة لندن، وتمتلك واحدة من أكبر محافظ الأراضي في مصر بإجمالي 37.8 مليون متر مربع.
          </p>
          <p className="text-palm-gray text-sm leading-[1.9] mb-8">
            قدمت بالم هيلز أكثر من 48 مشروعاً متنوعاً. تشمل مشاريعها الساحلية هاسيندا باي، هاسيندا وايت، هاسيندا ووترز، هاسيندا ويست، وأحدثهم هاسيندا راس الحكمة.
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            {[
              { num: "+48", txt: "مشروع" },
              { num: "+27", txt: "سنة خبرة" },
              { num: "37.8M", txt: "م² محفظة أراضي" },
            ].map((s) => (
              <div key={s.txt} className="text-center px-5">
                <span className="block text-palm-maroon text-4xl font-black">{s.num}</span>
                <span className="text-palm-gray text-xs mt-1">{s.txt}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ LOCATION ═══════════ */}
      <section className="py-20 px-6 bg-palm-cream" id="location">
        <div className="max-w-[1100px] mx-auto">
          <p className="text-center text-xs tracking-[3px] uppercase text-palm-gold font-bold mb-2">HACIENDA RAS EL HEKMA — LOCATION</p>
          <h2 className="text-center text-palm-maroon font-black mb-10" style={{ fontSize: "clamp(24px,4vw,38px)" }}>
            موقع هاسيندا راس الحكمة - بالم هيلز
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="rounded-2xl overflow-hidden h-[350px] bg-palm-silver">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110000!2d27.5!3d31.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDA2JzAwLjAiTiAyN8KwMzAnMDAuMCJF!5e0!3m2!1sar!2seg!4v1&q=ras+el+hekma+north+coast+egypt"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div>
              {locations.map((l) => (
                <div key={l.title} className="flex items-center gap-4 py-4 border-b border-palm-silver last:border-0">
                  <div className="w-11 h-11 bg-palm-maroon rounded-lg flex items-center justify-center text-lg shrink-0">{l.icon}</div>
                  <div>
                    <h4 className="text-palm-maroon font-bold text-sm">{l.title}</h4>
                    <p className="text-palm-gray text-xs">{l.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ CONTACT FORM ═══════════ */}
      <section className="py-20 px-6 bg-palm-cream" id="contact">
        <div className="max-w-[1100px] mx-auto">
          <p className="text-center text-xs tracking-[3px] uppercase text-palm-gold font-bold mb-2">BOOK NOW — HACIENDA PALM HILLS</p>
          <h2 className="text-center text-palm-maroon font-black mb-4" style={{ fontSize: "clamp(24px,4vw,38px)" }}>سجل بياناتك للحجز والاستفسار</h2>
          <p className="text-center text-palm-gray text-base max-w-[700px] mx-auto mb-10">
            سجل بياناتك وهيتم التواصل معاك خلال دقائق لمساعدتك في اختيار الوحدة المناسبة في هاسيندا راس الحكمة من بالم هيلز
          </p>

          <div className="max-w-[600px] mx-auto bg-white rounded-2xl p-8 md:p-10 border border-palm-silver shadow-sm">
            {formState === "sent" ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4">✓</div>
                <h3 className="text-palm-maroon text-xl font-extrabold mb-2">تم استلام بياناتك بنجاح!</h3>
                <p className="text-palm-gray text-sm mb-6">هنتواصل معاك في أقرب وقت. لو عايز رد أسرع:</p>
                <a href={WA_MSG("أريد حجز وحدة في هاسيندا راس الحكمة")} target="_blank" onClick={trackWhatsApp}
                  className="inline-flex items-center gap-2 bg-palm-gold text-palm-dark px-8 py-3 rounded-lg font-extrabold hover:bg-[#D4B35A] transition-all">
                  <WhatsAppIcon size={18} /> تواصل معنا واتساب
                </a>
              </div>
            ) : (
              <>
                <div className="mb-5">
                  <label className="block text-palm-maroon text-sm font-bold mb-1.5">الاسم الكامل</label>
                  <input
                    type="text" placeholder="اكتب اسمك هنا"
                    value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full p-3.5 border-2 border-palm-silver rounded-lg text-sm bg-palm-cream focus:border-palm-gold focus:outline-none transition-colors"
                  />
                </div>
                <div className="mb-5">
                  <label className="block text-palm-maroon text-sm font-bold mb-1.5">رقم الهاتف</label>
                  <input
                    type="tel" placeholder="01xxxxxxxxx" dir="ltr"
                    value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full p-3.5 border-2 border-palm-silver rounded-lg text-sm bg-palm-cream focus:border-palm-gold focus:outline-none transition-colors"
                  />
                </div>
                <div className="mb-5">
                  <label className="block text-palm-maroon text-sm font-bold mb-1.5">نوع الوحدة المطلوبة</label>
                  <select
                    value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })}
                    className="w-full p-3.5 border-2 border-palm-silver rounded-lg text-sm bg-palm-cream focus:border-palm-gold focus:outline-none transition-colors"
                  >
                    <option value="">اختر نوع الوحدة</option>
                    <option value="شقة فندقية">شقة فندقية</option>
                    <option value="توين هاوس">توين هاوس</option>
                    <option value="ستاند ألون فيلا">ستاند ألون فيلا</option>
                    <option value="غير محدد">مش محدد لسه</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label className="block text-palm-maroon text-sm font-bold mb-1.5">ملاحظات (اختياري)</label>
                  <textarea
                    rows={3} placeholder="اي استفسارات تانية؟"
                    value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full p-3.5 border-2 border-palm-silver rounded-lg text-sm bg-palm-cream focus:border-palm-gold focus:outline-none transition-colors resize-none"
                  />
                </div>
                <button onClick={submitForm} disabled={formState === "sending"}
                  className="w-full py-4 bg-palm-maroon text-white rounded-lg text-base font-extrabold hover:bg-palm-dark transition-all disabled:opacity-60">
                  {formState === "sending" ? "جاري الإرسال..." : "أرسل بياناتك الآن"}
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════ FINAL CTA ═══════════ */}
      <section className="py-20 px-6 text-center relative" style={{ background: gradientHero }}>
        <div className="relative z-10 max-w-[700px] mx-auto">
          <h2 className="text-white font-black text-2xl md:text-3xl mb-3">احجز وحدتك الآن في هاسيندا راس الحكمة</h2>
          <p className="text-white/70 text-base mb-8">عرض اللونش من بالم هيلز - Hacienda Ras El Hekma by Palm Hills - مقدم 5% وتقسيط 10 سنوات</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href={WA_MSG("أريد حجز وحدة في هاسيندا راس الحكمة - عرض اللونش")} target="_blank" onClick={trackWhatsApp}
              className="inline-flex items-center gap-2.5 bg-[#25D366] text-white px-10 py-4 rounded-xl text-lg font-extrabold hover:bg-[#1EBE5A] transition-all hover:-translate-y-0.5 hover:shadow-lg">
              <WhatsAppIcon size={24} /> احجز عبر واتساب
            </a>
            <a href={`tel:${PHONE}`} onClick={trackCall}
              className="inline-flex items-center gap-2.5 bg-palm-gold text-palm-dark px-10 py-4 rounded-xl text-lg font-extrabold hover:bg-[#D4B35A] transition-all hover:-translate-y-0.5">
              <PhoneIcon size={22} /> اتصل بنا الآن
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="bg-palm-black py-10 px-6 text-center">
        <p className="text-white/40 text-xs mb-2">© 2026 <span className="text-palm-gold font-bold">Grandeur Spaces</span> — وكيل معتمد لشركة بالم هيلز للتطوير العقاري</p>
        <p className="text-white/40 text-xs mb-4">Palm Hills Developments — Authorized Sales Agent</p>
        {/* SEO keywords for Quality Score */}
        <p className="text-white/[0.12] text-[11px] leading-[1.8]">
          هاسيندا راس الحكمة | بالم هيلز | Hacienda Ras El Hekma | Palm Hills | هاسيندا بالم هيلز | Hacienda Palm Hills | بالم هيلز راس الحكمة | Palm Hills Ras El Hekma | شاليهات راس الحكمة | فلل الساحل الشمالي | بالم هيلز الساحل الشمالي | Palm Hills North Coast
        </p>
      </footer>

      {/* ═══════════ POPUP ═══════════ */}
      {popup && (
        <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-6" style={{ backdropFilter: "blur(4px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) closePopup(); }}>
          <div className="bg-white rounded-2xl overflow-hidden max-w-[440px] w-full shadow-2xl" style={{ animation: "popIn 0.4s cubic-bezier(0.34,1.56,0.64,1)" }}>
            <div className="py-8 px-6 text-center relative" style={{ background: gradientHero }}>
              <button onClick={closePopup} className="absolute top-3 left-3 w-8 h-8 bg-white/15 border-none rounded-full text-white text-lg cursor-pointer hover:bg-white/30 transition-all">✕</button>
              <h3 className="text-palm-gold text-xl font-extrabold mb-1">🔥 عرض اللونش لفترة محدودة</h3>
              <p className="text-white/70 text-sm">هاسيندا راس الحكمة - بالم هيلز</p>
            </div>
            <div className="p-7">
              <div className="flex gap-2.5 justify-center mb-5">
                {[
                  { v: countdown.d, l: "يوم" },
                  { v: countdown.h, l: "ساعة" },
                  { v: countdown.m, l: "دقيقة" },
                  { v: countdown.s, l: "ثانية" },
                ].map((c) => (
                  <div key={c.l} className="bg-palm-cream px-3.5 py-2.5 rounded-lg text-center min-w-[56px]">
                    <span className="block text-palm-maroon text-xl font-black leading-none">{pad(c.v)}</span>
                    <span className="text-palm-gray text-[10px]">{c.l}</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-palm-gray text-sm mb-5">
                مقدم <strong className="text-palm-maroon">5%</strong> فقط وتقسيط حتى <strong className="text-palm-maroon">10 سنوات</strong> بدون فوائد
              </p>
              <div className="flex flex-col gap-2.5">
                <a href={WA_MSG("أريد حجز وحدة في هاسيندا راس الحكمة - عرض اللونش")} target="_blank" onClick={trackWhatsApp}
                  className="flex items-center justify-center gap-2.5 py-4 bg-[#25D366] text-white rounded-xl text-base font-extrabold hover:bg-[#1EBE5A] transition-all">
                  <WhatsAppIcon /> احجز عبر واتساب
                </a>
                <a href={`tel:${PHONE}`} onClick={trackCall}
                  className="flex items-center justify-center gap-2.5 py-4 bg-palm-maroon text-white rounded-xl text-base font-extrabold hover:bg-palm-dark transition-all">
                  <PhoneIcon /> اتصل بنا مباشرة
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════ MOBILE BOTTOM BAR ═══════════ */}
      <div className="fixed bottom-0 left-0 right-0 flex md:hidden z-[999]">
        <a href={WA_MSG("أريد حجز وحدة في هاسيندا راس الحكمة")} target="_blank" onClick={trackWhatsApp}
          className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#25D366] text-white text-sm font-extrabold">
          <WhatsAppIcon size={18} /> واتساب
        </a>
        <a href={`tel:${PHONE}`} onClick={trackCall}
          className="flex-1 flex items-center justify-center gap-2 py-4 bg-palm-maroon text-white text-sm font-extrabold">
          <PhoneIcon size={16} /> اتصل الآن
        </a>
      </div>

      {/* ═══════════ DESKTOP WHATSAPP FLOAT ═══════════ */}
      <a href={WA_MSG("أريد الاستفسار عن هاسيندا راس الحكمة")} target="_blank" onClick={trackWhatsApp}
        className="hidden md:flex fixed bottom-7 left-7 w-[60px] h-[60px] bg-[#25D366] rounded-full items-center justify-center z-[998] shadow-lg hover:scale-110 transition-all"
        style={{ boxShadow: "0 4px 16px rgba(37,211,102,0.4)" }}>
        <WhatsAppIcon size={32} />
      </a>

      {/* Spacer for mobile bottom bar */}
      <div className="h-[60px] md:hidden" />
    </>
  );
}
