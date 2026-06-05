"use client";

import { useState, useEffect, useCallback } from "react";

// ─── Constants ───
const PHONE = "01080231288";
const WA = `https://wa.me/2${PHONE}`;
const waMsg = (m: string) => `${WA}?text=${encodeURIComponent(m)}`;
const WEB3FORMS_KEY = "50f2c493-44ae-415d-8942-1195ac718d26";

// ─── Tracking ───
declare global { interface Window { gtag: (...a: unknown[]) => void } }
function track(label: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "conversion", { send_to: "AW-CONVERSION_ID/" + label });
    window.gtag("event", label, { event_category: "engagement", event_label: "Hacienda Ras El Hekma" });
  }
}

// ─── Countdown ───
function useCountdown(days: number) {
  const [end] = useState(() => { const d = new Date(); d.setDate(d.getDate() + days); d.setHours(23, 59, 59); return d; });
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = end.getTime() - Date.now();
      if (diff <= 0) return;
      setT({ d: Math.floor(diff / 864e5), h: Math.floor((diff % 864e5) / 36e5), m: Math.floor((diff % 36e5) / 6e4), s: Math.floor((diff % 6e4) / 1e3) });
    };
    tick(); const id = setInterval(tick, 1e3); return () => clearInterval(id);
  }, [end]);
  return t;
}
const pad = (n: number) => String(n).padStart(2, "0");

// ─── Icons ───
const WaIcon = ({ s = 18 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
);
const PhIcon = ({ s = 16 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
);
const Check = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
);

/* ═══════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════ */
export default function Page() {
  const cd = useCountdown(9);
  const [popup, setPopup] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formState, setFormState] = useState<"idle"|"sending"|"sent">("idle");
  const [form, setForm] = useState({ name: "", phone: "", unit: "", notes: "" });

  useEffect(() => { if (!sessionStorage.getItem("pc")) { const t = setTimeout(() => setPopup(true), 5000); return () => clearTimeout(t); } }, []);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 60); window.addEventListener("scroll", fn, { passive: true }); return () => window.removeEventListener("scroll", fn); }, []);
  const closePopup = useCallback(() => { setPopup(false); sessionStorage.setItem("pc", "1"); }, []);

  const submitForm = async () => {
    if (!form.name.trim() || !form.phone.trim()) { alert("من فضلك اكتب اسمك ورقم تليفونك"); return; }
    setFormState("sending");
    try {
      const r = await fetch("https://api.web3forms.com/submit", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject: "🏖️ ليد جديد - هاسيندا راس الحكمة", from_name: "Hacienda RH LP", name: form.name, phone: form.phone, unit_type: form.unit || "غير محدد", notes: form.notes || "-", source: "Hacienda Ras El Hekma Landing" }),
      });
      if (!r.ok) throw 0;
      setFormState("sent"); track("FORM_SUBMIT");
    } catch { setFormState("idle"); alert("حصل مشكلة، جرب تاني أو تواصل واتساب"); }
  };

  const sLabel = "text-[11px] tracking-[4px] uppercase text-gold font-bold mb-3";
  const goldBar = <div className="w-12 h-[2px] bg-gold mx-auto mb-8" />;

  return (
    <>
      {/* ═══ HEADER ═══ */}
      <header className={`fixed top-0 inset-x-0 z-[100] transition-all duration-300 ${scrolled ? "py-2.5" : "py-4"}`}
        style={{ background: scrolled ? "rgba(12,10,15,0.95)" : "rgba(12,10,15,0.7)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(201,168,76,0.1)" }}>
        <div className="max-w-[1200px] mx-auto flex items-center justify-between px-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 border border-gold rounded-sm flex items-center justify-center">
              <span className="text-gold text-xs font-bold tracking-wider" style={{ fontFamily: "var(--font-playfair)" }}>PH</span>
            </div>
            <span className="text-text text-sm font-bold">PALM HILLS</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#about" className="text-text-dim text-xs hover:text-gold transition-colors">المشروع</a>
            <a href="#units" className="text-text-dim text-xs hover:text-gold transition-colors">الوحدات</a>
            <a href="#contact" className="text-text-dim text-xs hover:text-gold transition-colors">تواصل</a>
            <a href={`tel:${PHONE}`} onClick={() => track("CALL")} className="text-gold text-xs font-bold flex items-center gap-1.5 border border-gold-border rounded-full px-4 py-2 hover:bg-gold-dim transition-all" dir="ltr">
              <PhIcon s={12} />{PHONE}
            </a>
            <a href={waMsg("مرحباً، أنا مهتم بمشروع هاسيندا راس الحكمة من Palm Hills")} target="_blank" onClick={() => track("WA")}
              className="bg-gold text-bg text-xs font-extrabold px-5 py-2 rounded-full hover:bg-[#D4B35A] transition-all">تواصل الآن</a>
          </div>
        </div>
      </header>

      {/* ═══ MARQUEE ═══ */}
      <div className="fixed top-0 inset-x-0 z-[101] bg-gold py-1.5 overflow-hidden">
        <div className="flex whitespace-nowrap" style={{ animation: "marquee 20s linear infinite" }}>
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-bg text-[11px] font-bold mx-8">
              PALM HILLS DEVELOPMENTS • هاسيندا راس الحكمة • HACIENDA RAS EL HEKMA • Hacienda Palm Hills • بالم هيلز •
            </span>
          ))}
        </div>
      </div>

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[100px] pb-16">
        <div className="absolute inset-0 bg-bg" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(rgba(201,168,76,0.5) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-bg to-transparent" />

        <div className="relative z-10 text-center max-w-[820px] px-5" style={{ animation: "fade-up 0.8s ease-out" }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-border bg-gold-dim text-gold text-xs font-semibold mb-8" style={{ animation: "pulse-glow 2.5s infinite" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-whatsapp" style={{ animation: "blink 1.5s infinite" }} />
            🔥 عرض اللونش لفترة محدودة — سجّل الآن
          </div>

          <p className="text-text-dim text-sm mb-3 tracking-wide">أحدث مشروعات Palm Hills على الساحل الشمالي</p>
          <h1 className="text-text font-black mb-2" style={{ fontSize: "clamp(32px,6vw,64px)", lineHeight: 1.15 }}>
            هاسيندا راس الحكمة
          </h1>
          <p className="mb-6" style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", fontSize: "clamp(16px,2.5vw,24px)", color: "rgba(201,168,76,0.8)", direction: "ltr" }}>
            Hacienda Ras El Hekma — Palm Hills
          </p>
          <p className="text-text-dim text-sm md:text-base max-w-[550px] mx-auto mb-10 leading-relaxed">
            1,400 فدان على شاطئ البحر المتوسط في رأس الحكمة. مقدم 5% وتقسيط 10 سنوات — تواصل معنا للأسعار والحجز.
          </p>

          <div className="flex justify-center gap-6 md:gap-10 flex-wrap mb-10">
            {[{ val: "1,400", lbl: "فدان" }, { val: "5%", lbl: "مقدم" }, { val: "10", lbl: "سنوات تقسيط" }, { val: "4.8 km", lbl: "شاطئ خاص" }].map(s => (
              <div key={s.lbl} className="text-center">
                <span className="block text-gold font-black text-2xl md:text-3xl">{s.val}</span>
                <span className="text-text-muted text-[11px]">{s.lbl}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-3 justify-center flex-wrap">
            <a href={waMsg("أريد حجز وحدة في هاسيندا راس الحكمة - Palm Hills")} target="_blank" onClick={() => track("WA")}
              className="inline-flex items-center gap-2 bg-gold text-bg px-8 py-3.5 rounded-full text-sm font-extrabold hover:bg-[#D4B35A] transition-all hover:-translate-y-0.5">
              <WaIcon s={16} /> احجز عبر واتساب
            </a>
            <a href={`tel:${PHONE}`} onClick={() => track("CALL")}
              className="inline-flex items-center gap-2 border border-border text-text-dim px-8 py-3.5 rounded-full text-sm font-semibold hover:border-gold hover:text-gold transition-all">
              <PhIcon s={14} /> اتصل الآن
            </a>
          </div>
        </div>
      </section>

      {/* ═══ COUNTDOWN ═══ */}
      <section className="py-10 border-y border-border">
        <div className="max-w-[700px] mx-auto text-center px-5">
          <p className="text-gold text-sm font-bold mb-5">⏰ عرض اللونش ينتهي خلال</p>
          <div className="flex gap-4 justify-center">
            {[{ v: cd.d, l: "يوم" }, { v: cd.h, l: "ساعة" }, { v: cd.m, l: "دقيقة" }, { v: cd.s, l: "ثانية" }].map(c => (
              <div key={c.l} className="min-w-[64px] md:min-w-[80px]">
                <span className="block text-gold text-3xl md:text-4xl font-black leading-none">{pad(c.v)}</span>
                <span className="text-text-muted text-[10px] mt-1 block">{c.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section className="py-20 md:py-28 px-5" id="about">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-16">
            <p className={sLabel}>HACIENDA RAS EL HEKMA</p>
            <h2 className="text-text font-black leading-tight mb-4" style={{ fontSize: "clamp(26px,4vw,42px)" }}>
              هاسيندا <span style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", color: "var(--color-gold)" }}>راس الحكمة</span>
            </h2>
            {goldBar}
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-bg-elevated border border-border flex flex-col items-center justify-center p-8">
              <p className="text-text-muted text-xs tracking-widest uppercase mb-4">PALM HILLS DEVELOPMENTS</p>
              <p className="text-gold text-3xl md:text-4xl leading-tight text-center" style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}>Hacienda<br/>Ras El Hekma</p>
              <p className="text-text-muted text-sm mt-3">الساحل الشمالي — رأس الحكمة</p>
              <div className="mt-6 flex gap-3">
                <span className="px-3 py-1 text-[10px] text-gold border border-gold-border rounded-full">🔥 إطلاق اللونش</span>
                <span className="px-3 py-1 text-[10px] text-text-dim border border-border rounded-full">1,400 فدان</span>
              </div>
            </div>

            <div>
              <p className="text-text-dim text-xs tracking-widest uppercase mb-2">PALM HILLS DEVELOPMENTS</p>
              <h3 className="text-text text-2xl font-extrabold mb-1">هاسيندا راس الحكمة</h3>
              <p className="text-gold text-sm mb-6" style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}>الساحل الشمالي — كيلو 238</p>
              <p className="text-text-dim text-sm leading-[1.9] mb-4">أحدث وأضخم مشروعات شركة بالم هيلز للتطوير العقاري في قلب راس الحكمة. يمتد على مساحة 1,400 فدان مع شاطئ خاص بطول 4.8 كيلومتر.</p>
              <p className="text-text-dim text-sm leading-[1.9] mb-8">يقع في الكيلو 238 طريق الإسكندرية - مطروح بالقرب من خليجين طبيعيين. يضم 3 فنادق فاخرة، أكوا بارك، مناطق ترفيهية، ومرافق متكاملة.</p>
              <div className="space-y-3 mb-8">
                {["1,400 فدان على ساحل البحر المتوسط", "شاطئ خاص بطول 4.8 كيلومتر", "3 فنادق فاخرة عالمية المستوى", "أكوا بارك ولاجونز ومسطحات مائية", "كلوب هاوس ونادي رياضي متكامل", "كيلو 238 طريق الإسكندرية — مطروح"].map(f => (
                  <div key={f} className="flex items-center gap-3 text-sm">
                    <span className="w-5 h-5 rounded-full bg-gold-dim text-gold flex items-center justify-center shrink-0"><Check /></span>
                    <span className="text-text-dim">{f}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <a href={waMsg("أريد تفاصيل مشروع هاسيندا راس الحكمة من بالم هيلز")} target="_blank" onClick={() => track("WA")}
                  className="inline-flex items-center gap-2 bg-gold text-bg px-6 py-3 rounded-full text-xs font-extrabold hover:bg-[#D4B35A] transition-all"><WaIcon s={14} /> واتساب</a>
                <a href={`tel:${PHONE}`} onClick={() => track("CALL")}
                  className="inline-flex items-center gap-2 border border-border text-text-dim px-6 py-3 rounded-full text-xs font-semibold hover:border-gold hover:text-gold transition-all"><PhIcon s={12} /> اتصل الآن</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ UNITS ═══ */}
      <section className="py-20 md:py-28 px-5 border-t border-border" id="units">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-16">
            <p className={sLabel}>HACIENDA PALM HILLS — UNITS & PRICES</p>
            <h2 className="text-text font-black leading-tight mb-4" style={{ fontSize: "clamp(26px,4vw,42px)" }}>الوحدات <span style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", color: "var(--color-gold)" }}>والأسعار</span></h2>
            {goldBar}
            <p className="text-text-dim text-sm max-w-[550px] mx-auto">شقق فندقية، توين هاوس، وستاند ألون فيلا — مقدم 5% وتقسيط حتى 10 سنوات بدون فوائد</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { type: "شقق فندقية", area: "تبدأ من 110 م²", price: "12,000,000", msg: "أريد تفاصيل الشقق في هاسيندا راس الحكمة" },
              { type: "توين هاوس", area: "تبدأ من 200 م²", price: "19,000,000", msg: "أريد تفاصيل التوين هاوس في هاسيندا راس الحكمة" },
              { type: "ستاند ألون فيلا", area: "تبدأ من 363 م²", price: "30,000,000", msg: "أريد تفاصيل الفلل في هاسيندا راس الحكمة" },
            ].map((u, i) => (
              <div key={u.type} className="bg-bg-card border border-border rounded-2xl overflow-hidden hover:border-gold-border transition-all">
                <div className="p-6 border-b border-border">
                  <span className="text-text-muted text-[10px] tracking-widest">0{i + 1}</span>
                  <h3 className="text-text text-lg font-extrabold mt-1">{u.type}</h3>
                  <p className="text-text-muted text-xs mt-0.5">{u.area}</p>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <span className="text-text-muted text-[10px] tracking-wider block mb-1">يبدأ السعر من</span>
                    <span className="text-gold text-2xl font-black">{u.price}</span>
                    <span className="text-text-muted text-xs mr-1"> ج.م</span>
                  </div>
                  <div className="space-y-2 mb-6">
                    {[["المقدم", "5%", false], ["التقسيط", "10 سنوات", false], ["الفوائد", "0%", true]].map(([l, v, gold]) => (
                      <div key={l as string}>
                        <div className="flex justify-between text-xs"><span className="text-text-muted">{l as string}</span><span className={gold ? "text-gold font-bold" : "text-text font-bold"}>{v as string}</span></div>
                        <div className="h-px bg-border mt-2" />
                      </div>
                    ))}
                  </div>
                  <a href={waMsg(u.msg)} target="_blank" onClick={() => track("WA")}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-gold text-bg text-xs font-extrabold rounded-full hover:bg-[#D4B35A] transition-all"><WaIcon s={14} /> تواصل للحجز</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PAYMENT ═══ */}
      <section className="py-20 px-5 border-t border-border">
        <div className="max-w-[800px] mx-auto text-center">
          <p className={sLabel}>PALM HILLS — PAYMENT PLANS</p>
          <h2 className="text-text font-black leading-tight mb-4" style={{ fontSize: "clamp(24px,4vw,38px)" }}>أنظمة <span style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", color: "var(--color-gold)" }}>السداد</span></h2>
          {goldBar}
          <div className="flex gap-5 justify-center flex-wrap mb-10">
            {[{ big: "5%", sub: "مقدم حجز فقط" }, { big: "10", sub: "سنوات تقسيط" }, { big: "0%", sub: "فوائد" }].map(p => (
              <div key={p.sub} className="flex-1 min-w-[160px] bg-bg-card border border-border rounded-2xl py-8 px-4 hover:border-gold-border transition-all">
                <span className="block text-gold text-4xl md:text-5xl font-black leading-none">{p.big}</span>
                <span className="text-text-dim text-xs mt-2 block">{p.sub}</span>
              </div>
            ))}
          </div>
          <a href={waMsg("أريد معرفة تفاصيل التقسيط في هاسيندا راس الحكمة")} target="_blank" onClick={() => track("WA")}
            className="inline-flex items-center gap-2 bg-gold text-bg px-8 py-3.5 rounded-full text-sm font-extrabold hover:bg-[#D4B35A] transition-all">احسب قسطك الشهري</a>
        </div>
      </section>

      {/* ═══ DEVELOPER ═══ */}
      <section className="py-20 md:py-28 px-5 border-t border-border">
        <div className="max-w-[800px] mx-auto text-center">
          <p className={sLabel}>SINCE 1997</p>
          <h2 className="text-text font-black leading-tight mb-4" style={{ fontSize: "clamp(26px,4vw,42px)" }}>عن <span style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", color: "var(--color-gold)" }}>Palm Hills</span></h2>
          {goldBar}
          <p className="text-text-dim text-sm leading-[1.9] mb-4 max-w-[650px] mx-auto">Palm Hills Developments من أكبر شركات التطوير العقاري في مصر — مدرجة في البورصة المصرية وبورصة لندن. تمتلك واحداً من أكبر بنوك الأراضي مع أكثر من 48 مشروعاً.</p>
          <p className="text-text-dim text-sm leading-[1.9] mb-10 max-w-[650px] mx-auto">تشمل مشاريعها الساحلية هاسيندا باي، هاسيندا وايت، هاسيندا ووترز، هاسيندا ويست، وأحدثهم هاسيندا راس الحكمة.</p>
          <div className="flex gap-8 md:gap-12 justify-center flex-wrap">
            {[{ num: "48+", txt: "مشروع نشط" }, { num: "1997", txt: "سنة التأسيس" }, { num: "LSE", txt: "مدرجة لندن" }, { num: "37.8M", txt: "م² أراضي" }].map(s => (
              <div key={s.txt} className="text-center"><span className="block text-gold text-3xl font-black">{s.num}</span><span className="text-text-muted text-[11px] mt-1 block">{s.txt}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ LOCATION ═══ */}
      <section className="py-20 px-5 border-t border-border" id="location">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-16">
            <p className={sLabel}>HACIENDA RAS EL HEKMA — LOCATION</p>
            <h2 className="text-text font-black leading-tight mb-4" style={{ fontSize: "clamp(24px,4vw,38px)" }}>الموقع</h2>
            {goldBar}
          </div>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="rounded-2xl overflow-hidden h-[350px] border border-border">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110000!2d27.5!3d31.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDA2JzAwLjAiTiAyN8KwMzAnMDAuMCJF!5e0!3m2!1sar!2seg!4v1&q=ras+el+hekma+north+coast+egypt" className="w-full h-full border-0" loading="lazy" />
            </div>
            <div className="space-y-1">
              {[
                { icon: "📍", title: "الكيلو 238 طريق الإسكندرية - مطروح", sub: "الساحل الشمالي — رأس الحكمة" },
                { icon: "🏙️", title: "مدينة العلمين الجديدة", sub: "على بعد مسافة قريبة" },
                { icon: "✈️", title: "مطار برج العرب الدولي", sub: "حوالي ساعة بالسيارة" },
                { icon: "🏖️", title: "هاسيندا سيدي حنيش", sub: "على بعد 25 دقيقة" },
                { icon: "🌅", title: "مرسى مطروح", sub: "ساعة ونصف بالسيارة" },
              ].map(l => (
                <div key={l.title} className="flex items-center gap-4 py-4 border-b border-border last:border-0">
                  <span className="w-10 h-10 bg-bg-elevated border border-border rounded-lg flex items-center justify-center text-base shrink-0">{l.icon}</span>
                  <div><h4 className="text-text text-sm font-bold">{l.title}</h4><p className="text-text-muted text-xs">{l.sub}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section className="py-20 md:py-28 px-5 border-t border-border" id="contact">
        <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className={sLabel}>BOOK NOW — HACIENDA PALM HILLS</p>
            <h2 className="text-text font-black text-2xl md:text-3xl mb-3">ابدأ رحلتك <span style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", color: "var(--color-gold)" }}>نحو الساحل</span></h2>
            <p className="text-text-dim text-sm mb-8">سيتواصل معك فريقنا خلال 24 ساعة</p>
            <div className="space-y-4 mb-10">
              {[{ tag: "🔥 عرض اللونش", name: "هاسيندا راس الحكمة — Hacienda Ras El Hekma" }, { tag: "مقدم 5%", name: "تقسيط حتى 10 سنوات بدون فوائد" }, { tag: "Palm Hills", name: "وكيل معتمد — Grandeur Spaces" }].map(p => (
                <div key={p.name} className="flex items-center gap-4 p-4 bg-bg-card border border-border rounded-xl">
                  <span className="text-[10px] text-gold bg-gold-dim border border-gold-border px-2 py-0.5 rounded-full shrink-0">{p.tag}</span>
                  <span className="text-text text-sm font-semibold">{p.name}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <a href={waMsg("مرحباً، أنا مهتم بمشروع هاسيندا راس الحكمة من Palm Hills")} target="_blank" onClick={() => track("WA")}
                className="inline-flex items-center gap-2 bg-whatsapp text-white px-6 py-3 rounded-full text-xs font-extrabold hover:bg-[#1EBE5A] transition-all"><WaIcon s={16} /> واتساب</a>
              <a href={`tel:${PHONE}`} onClick={() => track("CALL")}
                className="inline-flex items-center gap-2 border border-border text-text-dim px-6 py-3 rounded-full text-xs font-semibold hover:border-gold hover:text-gold transition-all"><PhIcon s={14} /> اتصل الآن</a>
            </div>
          </div>

          <div className="bg-bg-card border border-border rounded-2xl p-8">
            {formState === "sent" ? (
              <div className="text-center py-10">
                <div className="w-14 h-14 bg-whatsapp rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">✓</div>
                <h3 className="text-text text-xl font-extrabold mb-2">تم استلام بياناتك!</h3>
                <p className="text-text-dim text-sm mb-6">هنتواصل معاك في أقرب وقت</p>
                <a href={waMsg("أريد حجز وحدة في هاسيندا راس الحكمة")} target="_blank" onClick={() => track("WA")}
                  className="inline-flex items-center gap-2 bg-gold text-bg px-6 py-3 rounded-full text-xs font-extrabold"><WaIcon s={14} /> تواصل واتساب</a>
              </div>
            ) : (
              <>
                <h3 className="text-text text-lg font-extrabold mb-1">طلب معلومات</h3>
                <p className="text-text-muted text-xs mb-6">سيتواصل معك فريق Palm Hills خلال 24 ساعة</p>
                {[{ id: "name", label: "الاسم", ph: "اكتب اسمك", type: "text" }, { id: "phone", label: "رقم الهاتف", ph: "01xxxxxxxxx", type: "tel" }].map(f => (
                  <div key={f.id} className="mb-4">
                    <label className="block text-text-dim text-xs font-bold mb-1.5">{f.label}</label>
                    <input type={f.type} placeholder={f.ph} dir={f.type === "tel" ? "ltr" : undefined}
                      value={form[f.id as keyof typeof form]} onChange={e => setForm({ ...form, [f.id]: e.target.value })}
                      className="w-full p-3 bg-bg-elevated border border-border rounded-lg text-text text-sm placeholder:text-text-muted focus:border-gold focus:outline-none transition-colors" />
                  </div>
                ))}
                <div className="mb-4">
                  <label className="block text-text-dim text-xs font-bold mb-1.5">نوع الوحدة</label>
                  <select value={form.unit} onChange={e => setForm({ ...form, unit: e.target.value })}
                    className="w-full p-3 bg-bg-elevated border border-border rounded-lg text-text text-sm focus:border-gold focus:outline-none transition-colors">
                    <option value="">اختر نوع الوحدة</option>
                    <option value="شقة فندقية">شقة فندقية</option>
                    <option value="توين هاوس">توين هاوس</option>
                    <option value="ستاند ألون فيلا">ستاند ألون فيلا</option>
                  </select>
                </div>
                <button onClick={submitForm} disabled={formState === "sending"}
                  className="w-full py-3.5 bg-gold text-bg rounded-lg text-sm font-extrabold hover:bg-[#D4B35A] transition-all disabled:opacity-50 mt-2">
                  {formState === "sending" ? "جاري الإرسال..." : "اطلب معلومات الآن"}
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="py-10 px-5 border-t border-border text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-7 h-7 border border-gold-border rounded-sm flex items-center justify-center">
            <span className="text-gold text-[9px] font-bold" style={{ fontFamily: "var(--font-playfair)" }}>PH</span>
          </div>
          <span className="text-text-dim text-xs font-bold tracking-wider">PALM HILLS</span>
        </div>
        <p className="text-text-muted text-xs mb-3">© 2026 Palm Hills Developments | <span className="text-gold">Grandeur Spaces</span> — وكيل معتمد</p>
        <p className="text-[10px] text-text-muted/30 leading-[2]">هاسيندا راس الحكمة | بالم هيلز | Hacienda Ras El Hekma | Palm Hills | هاسيندا بالم هيلز | Hacienda Palm Hills | بالم هيلز راس الحكمة | Palm Hills Ras El Hekma | Palm Hills North Coast | Palm Hills Developments</p>
      </footer>

      {/* ═══ POPUP ═══ */}
      {popup && (
        <div className="fixed inset-0 bg-black/70 z-[200] flex items-center justify-center p-5" style={{ backdropFilter: "blur(8px)" }} onClick={e => { if (e.target === e.currentTarget) closePopup(); }}>
          <div className="bg-bg-card border border-border rounded-2xl overflow-hidden max-w-[400px] w-full" style={{ animation: "pop-in 0.35s ease-out" }}>
            <div className="bg-bg-elevated border-b border-border p-6 text-center relative">
              <button onClick={closePopup} className="absolute top-3 left-3 w-7 h-7 bg-border rounded-full text-text-muted text-sm hover:text-text transition-colors flex items-center justify-center">✕</button>
              <p className="text-gold text-xs tracking-widest uppercase mb-1">عرض اللونش</p>
              <h3 className="text-text text-lg font-extrabold">هاسيندا راس الحكمة</h3>
              <p className="text-text-muted text-xs">Palm Hills Developments</p>
            </div>
            <div className="p-6">
              <div className="flex gap-3 justify-center mb-5">
                {[{ v: cd.d, l: "يوم" }, { v: cd.h, l: "ساعة" }, { v: cd.m, l: "دقيقة" }, { v: cd.s, l: "ثانية" }].map(c => (
                  <div key={c.l} className="bg-bg-elevated border border-border rounded-lg px-3 py-2 text-center min-w-[50px]">
                    <span className="block text-gold text-lg font-black leading-none">{pad(c.v)}</span>
                    <span className="text-text-muted text-[9px]">{c.l}</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-text-dim text-xs mb-5">مقدم <strong className="text-gold">5%</strong> — تقسيط <strong className="text-gold">10 سنوات</strong> — بدون فوائد</p>
              <div className="space-y-2.5">
                <a href={waMsg("أريد حجز وحدة في هاسيندا راس الحكمة - عرض اللونش")} target="_blank" onClick={() => track("WA")}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-whatsapp text-white rounded-xl text-sm font-extrabold hover:bg-[#1EBE5A] transition-all"><WaIcon s={16} /> احجز عبر واتساب</a>
                <a href={`tel:${PHONE}`} onClick={() => track("CALL")}
                  className="flex items-center justify-center gap-2 w-full py-3.5 border border-border text-text-dim rounded-xl text-sm font-semibold hover:border-gold hover:text-gold transition-all"><PhIcon s={14} /> اتصل بنا</a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══ MOBILE BAR ═══ */}
      <div className="fixed bottom-0 inset-x-0 flex md:hidden z-[99] border-t border-border">
        <a href={`tel:${PHONE}`} onClick={() => track("CALL")} className="flex-1 flex items-center justify-center gap-2 py-4 bg-bg-card text-text text-sm font-extrabold border-l border-border"><PhIcon s={15} /> اتصل الآن</a>
        <a href={waMsg("أريد حجز وحدة في هاسيندا راس الحكمة")} target="_blank" onClick={() => track("WA")} className="flex-1 flex items-center justify-center gap-2 py-4 bg-gold text-bg text-sm font-extrabold"><WaIcon s={15} /> واتساب</a>
      </div>

      {/* ═══ WA FLOAT ═══ */}
      <a href={waMsg("مرحباً، أنا مهتم بهاسيندا راس الحكمة من Palm Hills")} target="_blank" onClick={() => track("WA")}
        className="hidden md:flex fixed bottom-7 left-7 w-14 h-14 bg-whatsapp rounded-full items-center justify-center z-[98] hover:scale-110 transition-transform"
        style={{ boxShadow: "0 4px 20px rgba(37,211,102,0.4)" }}><WaIcon s={28} /></a>

      <div className="h-[60px] md:hidden" />
    </>
  );
}
