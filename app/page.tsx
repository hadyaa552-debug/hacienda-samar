"use client";
import{useState,useEffect,useRef,FormEvent}from"react";
const P="01096988666",PD="0109 698 8666",PI="+201096988666",WN="201096988666";
const WM="مرحباً، أرغب في الاستفسار عن هاسيندا راس الحكمة بالم هيلز — Hacienda Ras El Hekma Palm Hills";
const WU=`https://wa.me/${WN}?text=${encodeURIComponent(WM)}`;
const WK="b52fbaac-3490-4c0d-a4c6-129f0e596428";
const LAUNCH_END=new Date(Date.now()+9*24*60*60*1000);

type UT="all"|"beach"|"chalet"|"twin"|"villa";
const UNITS=[
  {n:"بيتش هوم ١ غرفة",en:"1BR Beach Home",p:"11.7 مليون",t:"beach"as UT},
  {n:"بيتش هوم ٢ غرف",en:"2BR Beach Home",p:"15 مليون",t:"beach"as UT},
  {n:"بيتش هوم ٣ غرف",en:"3BR Beach Home",p:"18 مليون",t:"beach"as UT},
  {n:"شاليه جونيور",en:"Junior Chalet",p:"23 مليون",t:"chalet"as UT},
  {n:"شاليه سينيور",en:"Senior Chalet",p:"28 مليون",t:"chalet"as UT},
  {n:"توين هاوس",en:"Twin House",p:"44 مليون",t:"twin"as UT},
  {n:"فيلا — الصف الرابع",en:"Villa — 4th Row",p:"125 مليون",t:"villa"as UT},
  {n:"فيلا — الصف الثالث",en:"Villa — 3rd Row",p:"165 مليون",t:"villa"as UT},
  {n:"فيلا — الصف الثاني",en:"Villa — 2nd Row",p:"195 مليون",t:"villa"as UT},
  {n:"فيلا — الصف الأول",en:"Villa — 1st Row",p:"450 مليون",t:"villa"as UT},
];
const FAQS=[
  {q:"أين يقع مشروع هاسيندا راس الحكمة من بالم هيلز؟",a:"يقع هاسيندا راس الحكمة — Hacienda Ras El Hekma عند الكيلو 238 على الساحل الشمالي. مشروع بالم هيلز الأضخم على البحر المتوسط."},
  {q:"ما أنواع الوحدات في هاسيندا بالم هيلز؟",a:"بيتش هومز (1-3 غرف)، شاليهات، توين هاوس، وفيلات بإطلالات بحر مباشرة. هاسيندا بالم هيلز — Hacienda Palm Hills توفر تشكيلة كاملة."},
  {q:"ما أسعار هاسيندا راس الحكمة — Hacienda Ras El Hekma؟",a:"تبدأ من 11.7 مليون جنيه لبيتش هوم وحتى 450 مليون لفيلات الصف الأول. أسعار بالم هيلز — Palm Hills استرشادية قبل التأكيد."},
  {q:"ما خطة سداد هاسيندا بالم هيلز — Palm Hills Hacienda؟",a:"5% مقدم + 5% بعد فترة. تقسيط حتى 10 سنوات. أول 4 صفوف فيلات على 8 سنوات. الأجانب بنفس الشروط."},
  {q:"ما مساحة مشروع بالم هيلز هاسيندا راس الحكمة؟",a:"1,400 فدان مع 4.8 كم بيتش فرونت و84% مساحات خضراء ومائية. Palm Hills Hacienda Ras El Hekma أكبر مشروع ساحلي في مصر."},
  {q:"ما قيمة جدية الحجز EOI؟",a:"بيتش هوم: 250 ألف — شاليهات: 500 ألف — فيلات وتوين: مليون جنيه. كل المبالغ مستردة بالكامل."},
];
const Ph=()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
const Chv=()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>;

function track(id:string){if(typeof window==="undefined"||!(window as any).gtag)return;const g=(window as any).gtag;g("event","cta_click",{cta_id:id,project:"hacienda_ras_el_hekma"});if(id.startsWith("wa_"))g("event","conversion",{send_to:"AW-18271769567/wS3vCLqyxcgcEN-n1IhE",value:1.0,currency:"EGP"});if(id.startsWith("call_"))g("event","conversion",{send_to:"AW-18271769567/QpmiCLeyxcgcEN-n1IhE",value:1.0,currency:"EGP"});}

export default function Home(){
  const[f,sF]=useState<UT>("all");
  const[fq,sFq]=useState<number|null>(null);
  const[mn,sMn]=useState(false);
  const[fs,sFs]=useState<"idle"|"sending"|"sent"|"error">("idle");
  const[pop,sPop]=useState(false);
  const[ps,sPs]=useState<"idle"|"sending"|"sent"|"error">("idle");
  const[ck,sCk]=useState(false);
  const[prv,sPrv]=useState(false);
  const[cd,sCd]=useState({d:9,h:0,m:0,s:0});
  const pr=useRef(false);
  const fr=useRef<HTMLFormElement>(null);
  const pfr=useRef<HTMLFormElement>(null);

  useEffect(()=>{
    const els=document.querySelectorAll(".fin");
    const ob=new IntersectionObserver(e=>e.forEach(x=>x.isIntersecting&&x.target.classList.add("vis")),{threshold:.1});
    els.forEach(e=>ob.observe(e));
    try{if(!localStorage.getItem("ck_ok"))sCk(true)}catch{sCk(true)}
    // Countdown
    const ci=setInterval(()=>{
      const diff=LAUNCH_END.getTime()-Date.now();
      if(diff<=0){clearInterval(ci);return;}
      sCd({d:Math.floor(diff/864e5),h:Math.floor(diff%864e5/36e5),m:Math.floor(diff%36e5/6e4),s:Math.floor(diff%6e4/1e3)});
    },1000);
    return()=>{ob.disconnect();clearInterval(ci)};
  },[]);

  useEffect(()=>{
    if(pr.current)return;
    const onS=()=>{const p=(window.scrollY)/(document.documentElement.scrollHeight-window.innerHeight);if(p>=.55)op();};
    const t=setTimeout(()=>op(),14000);
    window.addEventListener("scroll",onS,{passive:true});
    function op(){if(pr.current)return;pr.current=true;sPop(true);document.body.classList.add("pop-opn");window.removeEventListener("scroll",onS);clearTimeout(t);}
    return()=>{window.removeEventListener("scroll",onS);clearTimeout(t)};
  },[]);

  const fl=f==="all"?UNITS:UNITS.filter(u=>u.t===f);
  function cp(){sPop(false);document.body.classList.remove("pop-opn");}

  async function sub(r:React.RefObject<HTMLFormElement|null>,ss:(s:any)=>void){
    if(!r.current)return;ss("sending");
    const fd=new FormData(r.current);const pl:Record<string,string>={};fd.forEach((v,k)=>pl[k]=v.toString());
    try{const res=await fetch("https://api.web3forms.com/submit",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(pl)});
    const d=await res.json();if(d.success){ss("sent");r.current.reset();window.location.href="/thank-you";}else throw 0;}catch{ss("error");}
  }

  return(<>
    {/* HEADER */}
    <header className="hdr"><div className="hdr-in">
      <a className="hdr-brand" href="#hero"><img src="/images/palm-hills-logo-white.png" alt="Palm Hills بالم هيلز"/><div><div className="hdr-brand-t">Hacienda Ras El Hekma</div><div className="hdr-brand-s">هاسيندا راس الحكمة · بالم هيلز</div></div></a>
      <nav className="hdr-nav">{[["#overview","عن المشروع"],["#units","الوحدات"],["#payment","السداد"],["#gallery","الصور"],["#facilities","المرافق"],["#location","الموقع"],["#contact","احجز"]].map(([h,l])=><a key={h} href={h}>{l}</a>)}</nav>
      <div className="hdr-acts">
        <a className="btn-hcall" href={`tel:${PI}`} onClick={()=>track("call_header")}><Ph/><span>{PD}</span></a>
        <a className="btn-hreg" href="#contact">سجل اهتمامك</a>
        <button className="mob-btn" onClick={()=>sMn(!mn)}>☰</button>
      </div>
    </div>
    {mn&&<div style={{background:"var(--color-navy-deep)",padding:"12px 20px",borderTop:"1px solid rgba(184,134,11,.08)"}}>
      {[["#overview","عن المشروع"],["#units","الوحدات"],["#payment","السداد"],["#contact","احجز وحدتك"]].map(([h,l])=><a key={h} href={h} onClick={()=>sMn(false)} style={{display:"block",padding:"10px 0",color:"rgba(255,255,255,.7)",textDecoration:"none",fontSize:"14px",borderBottom:"1px solid rgba(255,255,255,.04)"}}>{l}</a>)}
    </div>}
    </header>

    {/* COUNTDOWN */}
    <div className="countdown">
      <span>⚡ لونش هاسيندا راس الحكمة — Hacienda Ras El Hekma ينتهي خلال </span>
      <span className="cd-nums">
        <span className="cd-box">{cd.d}<span className="cd-lbl">يوم</span></span>
        <span className="cd-box">{cd.h}<span className="cd-lbl">ساعة</span></span>
        <span className="cd-box">{cd.m}<span className="cd-lbl">دقيقة</span></span>
        <span className="cd-box">{cd.s}<span className="cd-lbl">ثانية</span></span>
      </span>
    </div>

    {/* HERO */}
    <section className="hero" id="hero">
      <div className="hero-bg"><img src="/images/hacienda-hero.webp" alt="هاسيندا راس الحكمة بالم هيلز — Hacienda Ras El Hekma Palm Hills الساحل الشمالي"/><div className="hero-ov"/></div>
      <div className="hero-ct">
        <span className="hero-bdg">Palm Hills Developments · بالم هيلز للتطوير العقاري</span>
        <h1 className="hero-h1">هاسيندا راس الحكمة</h1>
        <p className="hero-sub">Hacienda Ras El Hekma — أول مدينة ساحلية مسوّرة من بالم هيلز على الكيلو ٢٣٨</p>
        <p className="hero-kw">Palm Hills Hacienda · هاسيندا بالم هيلز · Hacienda Palm Hills</p>
        <div className="hero-stats">
          <div className="hero-st"><div className="hero-st-v">١٬٤٠٠ فدان</div><div className="hero-st-l">مساحة المشروع</div></div>
          <div className="hero-st"><div className="hero-st-v">٤.٨ كم شاطئ</div><div className="hero-st-l">بيتش فرونت مباشر</div></div>
          <div className="hero-st"><div className="hero-st-v">٥٪ مقدم فقط</div><div className="hero-st-l">تقسيط حتى ١٠ سنوات</div></div>
        </div>
        <div className="hero-ctas">
          <a className="btn-gold" href="#contact" onClick={()=>track("cta_hero_register")}>احجز وحدتك الآن</a>
          <a className="btn-wa" href={WU} target="_blank" rel="noopener" onClick={()=>track("wa_hero")}>💬 واتساب</a>
          <a className="btn-out" href="#units">استكشف الوحدات</a>
        </div>
      </div>
    </section>

    {/* TRUST BAR */}
    <div className="trust-bar"><div className="trust-in">
      <div className="trust-item"><strong>١٬٤٠٠</strong> فدان</div>
      <div className="trust-item"><strong>٤.٨</strong> كم شاطئ</div>
      <div className="trust-item"><strong>٨٤٪</strong> خضرة ومياه</div>
      <div className="trust-item"><strong>٥٪</strong> مقدم فقط</div>
      <div className="trust-item"><strong>١٠</strong> سنوات تقسيط</div>
    </div></div>

    {/* ABOUT */}
    <section className="sec about" id="overview"><div className="sec-in">
      <div className="fin" style={{textAlign:"center"}}>
        <span className="sec-bdg">Hacienda Ras El Hekma · Palm Hills</span>
        <h2 className="sec-h" style={{textAlign:"center"}}>عن هاسيندا راس الحكمة — بالم هيلز</h2>
        <p className="sec-p cen">هاسيندا راس الحكمة — Hacienda Ras El Hekma من بالم هيلز — Palm Hills وجهة ساحلية فريدة عند الكيلو ٢٣٨. مجتمع مسوّر متكامل على البحر يجمع بين البحيرات الكريستالية والمساحات الخضراء والتشطيبات الفاخرة. هاسيندا بالم هيلز — Hacienda Palm Hills أكبر مشروع ساحلي مسوّر في مصر.</p>
      </div>
      <div className="about-grid fin">
        <div className="about-feats">
          {[{i:"🏖",t:"١٬٤٠٠ فدان",d:"مجتمع ساحلي مسوّر — هاسيندا بالم هيلز"},{i:"🌊",t:"٤.٨ كم بيتش فرونت",d:"شاطئ راس الحكمة المباشر على المتوسط"},{i:"🌿",t:"٨٤٪ مياه وخضرة",d:"تجربة سكنية ساحلية فريدة من Palm Hills"},{i:"🏡",t:"تشطيب كامل + تكييفات",d:"فُل فينِش لكل وحدات هاسيندا راس الحكمة"}].map((x,i)=>
            <div key={i} className="about-feat"><div className="about-feat-i">{x.i}</div><div><h3>{x.t}</h3><p>{x.d}</p></div></div>
          )}
        </div>
        <div className="about-img"><img src="/images/hacienda-launching.webp" alt="هاسيندا راس الحكمة بالم هيلز — Hacienda Palm Hills"/></div>
      </div>
      <div className="stats-bar fin">
        {[{v:"1,400",u:"فدان",l:"مساحة هاسيندا راس الحكمة"},{v:"4.8",u:"كم",l:"بيتش فرونت Palm Hills"},{v:"84",u:"%",l:"خضرة ومياه"},{v:"238",u:"KM",l:"الساحل الشمالي"}].map((s,i)=>
          <div key={i} className="stat-c"><div className="stat-v">{s.v}<span>{s.u}</span></div><div className="stat-l">{s.l}</div></div>
        )}
      </div>
    </div></section>

    {/* MID CTA */}
    <div className="mid-cta">
      <h3>احجز وحدتك في هاسيندا راس الحكمة — Hacienda Ras El Hekma</h3>
      <p>اللونش ينتهي قريب — سجّل اهتمامك دلوقتي واحصل على أفضل المواقع على الماستر بلان من بالم هيلز — Palm Hills</p>
      <div className="mid-cta-btns">
        <a className="btn-gold" href="#contact" onClick={()=>track("cta_mid")}>سجل اهتمامك الآن</a>
        <a className="btn-wa" href={WU} target="_blank" rel="noopener" onClick={()=>track("wa_mid")}>💬 تواصل واتساب</a>
        <a className="btn-out" href={`tel:${PI}`} onClick={()=>track("call_mid")}><Ph/> اتصل بنا</a>
      </div>
    </div>

    {/* UNITS */}
    <section className="sec units" id="units"><div className="sec-in fin" style={{textAlign:"center"}}>
      <span className="sec-bdg">وحدات هاسيندا بالم هيلز — Hacienda Palm Hills</span>
      <h2 className="sec-h" style={{textAlign:"center"}}>الوحدات المتاحة في هاسيندا راس الحكمة</h2>
      <p className="sec-p cen">بيتش هومز وشاليهات وتوين هاوس وفيلات من بالم هيلز — Palm Hills بإطلالات بحرية وتشطيبات كاملة</p>
      <div className="u-filters">
        {([["all","الكل"],["beach","بيتش هوم"],["chalet","شاليهات"],["twin","توين هاوس"],["villa","فيلات"]]as[UT,string][]).map(([k,l])=>
          <button key={k} className={`u-fb ${f===k?"act":""}`} onClick={()=>sF(k)}>{l}</button>
        )}
      </div>
      <div className="u-grid">
        {fl.map((u,i)=><div key={i} className="u-card"><div className="u-card-b">
          <h3>{u.n}</h3><span className="u-en">{u.en}</span>
          <span className="u-pl">يبدأ من</span><div className="u-pr">{u.p}</div>
          <span className="u-fin">تشطيب كامل + تكييفات + مطبخ</span>
          <a href={WU} target="_blank" rel="noopener" className="btn-u" onClick={()=>track(`wa_unit_${u.t}`)}>استفسر الآن</a>
        </div></div>)}
      </div>
      <p className="u-note">الأسعار استرشادية لـ هاسيندا راس الحكمة من بالم هيلز — Palm Hills Hacienda وقابلة للتغيير. تواصل معنا لآخر الأسعار.</p>
    </div></section>

    {/* PAYMENT */}
    <section className="sec payment" id="payment"><div className="sec-in fin" style={{textAlign:"center"}}>
      <h2 className="sec-h" style={{textAlign:"center"}}>خطة سداد هاسيندا بالم هيلز — Palm Hills Hacienda</h2>
      <div className="pay-grid" style={{textAlign:"right"}}>
        <div className="pay-card"><h3>نظام التقسيط</h3>
          <ul className="pay-list"><li>٥٪ مقدم</li><li>٥٪ بعد فترة</li><li>تقسيط حتى ١٠ سنوات</li><li>أول ٤ صفوف على ٨ سنوات</li><li>الأجانب بنفس شروط المصريين</li></ul>
          <div style={{marginTop:16}}><a className="btn-gold" href={WU} target="_blank" rel="noopener" style={{width:"100%",justifyContent:"center"}} onClick={()=>track("wa_payment")}>اطلب تفاصيل السداد</a></div>
        </div>
        <div className="pay-card"><h3>جدية الحجز EOI</h3>
          <div>{[["البيتش هوم","250K"],["الشاليهات","500K"],["الفيلات والتوين","1M"]].map(([t,v],i)=><div key={i} className="eoi-r"><span className="eoi-t">{t}</span><span className="eoi-v">{v} EGP</span></div>)}</div>
          <p className="pay-note">مبالغ EOI مستردة بالكامل — أسعار هاسيندا راس الحكمة استرشادية من بالم هيلز</p>
        </div>
      </div>
    </div></section>

    {/* GALLERY */}
    <section className="sec gal" id="gallery"><div className="sec-in fin" style={{textAlign:"center"}}>
      <h2 className="sec-h" style={{textAlign:"center"}}>معرض هاسيندا راس الحكمة — Hacienda Ras El Hekma</h2>
      <div className="gal-grid">
        {[{s:"/images/hacienda-hero.webp",c:"هاسيندا راس الحكمة بالم هيلز — الإطلالة الرئيسية"},{s:"/images/hacienda-launching.webp",c:"Hacienda Palm Hills — منظر جوي"},{s:"/images/hacienda-master-plan.webp",c:"ماستر بلان هاسيندا بالم هيلز — Palm Hills Hacienda"},{s:"/images/hacienda-beach.webp",c:"شاطئ راس الحكمة — Hacienda Ras El Hekma Beach"}].map((g,i)=>
          <div key={i} className="gal-item"><img src={g.s} alt={g.c}/><div className="gal-cap">{g.c}</div></div>
        )}
      </div>
    </div></section>

    {/* FACILITIES */}
    <section className="fac" id="facilities">
      <div className="fac-bg"><img src="/images/hacienda-beach.webp" alt="مرافق هاسيندا بالم هيلز"/></div>
      <div className="fac-ct fin" style={{textAlign:"center"}}>
        <h3 className="sec-h" style={{color:"#fff",textAlign:"center"}}>مرافق هاسيندا راس الحكمة — Palm Hills Hacienda</h3>
        <div className="fac-grid">
          {[{i:"🏋️",n:"نادي رياضي"},{i:"💎",n:"بحيرات كريستالية"},{i:"🏠",n:"كلوب هاوس"},{i:"🔒",n:"كمبوند مسوّر"},{i:"🏖",n:"بيتش فرونت"},{i:"💧",n:"مسطحات مائية"},{i:"🌳",n:"مساحات خضراء"},{i:"✨",n:"تشطيبات فاخرة"},{i:"✈️",n:"مطار دولي قريب"},{i:"⛵",n:"مارينا دولية"},{i:"🏢",n:"منطقة حرة"},{i:"📡",n:"مدينة ذكية"}].map((x,i)=>
            <div key={i} className="fac-c"><div className="fac-c-i">{x.i}</div><div className="fac-c-n">{x.n}</div></div>
          )}
        </div>
      </div>
    </section>

    {/* LOCATION */}
    <section className="sec loc" id="location"><div className="sec-in fin" style={{textAlign:"center"}}>
      <h2 className="sec-h" style={{textAlign:"center"}}>موقع هاسيندا راس الحكمة — Hacienda Ras El Hekma Location</h2>
      <div className="loc-grid" style={{textAlign:"right"}}>
        <div className="loc-img"><img src="/images/hacienda-master-plan.webp" alt="موقع هاسيندا راس الحكمة بالم هيلز على الخريطة"/></div>
        <div className="loc-facts">
          {[{t:"الكيلو ٢٣٨",d:"على الطريق الساحلي الدولي — الساحل الشمالي"},{t:"راس الحكمة",d:"أحد أجمل شواطئ البحر المتوسط في مصر"},{t:"بالم هيلز — Palm Hills",d:"مطور هاسيندا راس الحكمة منذ ١٩٩٧"}].map((x,i)=>
            <div key={i} className="loc-fact"><h4>{x.t}</h4><p>{x.d}</p></div>
          )}
        </div>
      </div>
    </div></section>

    {/* FAQ */}
    <section className="sec faq-sec" id="faq"><div className="sec-in fin" style={{textAlign:"center"}}>
      <h2 className="sec-h" style={{textAlign:"center"}}>أسئلة شائعة عن هاسيندا راس الحكمة — Hacienda Palm Hills FAQ</h2>
      <div className="faq-list">
        {FAQS.map((x,i)=><div key={i} className="faq-i">
          <button className={`faq-q ${fq===i?"opn":""}`} onClick={()=>sFq(fq===i?null:i)}><span>{x.q}</span><span className="arr"><Chv/></span></button>
          <div className={`faq-a ${fq===i?"opn":""}`}><p>{x.a}</p></div>
        </div>)}
      </div>
    </div></section>

    {/* AGENT */}
    <div className="agent" id="about-agent"><div className="agent-in fin">
      <span className="sec-bdg">من نحن</span>
      <h3>وكيل معتمد من بالم هيلز — Palm Hills</h3>
      <p>وكيل مبيعات معتمد من بالم هيلز للتطوير العقاري. نقدم استشارات مجانية لمشروع هاسيندا راس الحكمة — Hacienda Ras El Hekma ونساعدك في اختيار الوحدة المناسبة والتعاقد مع المطور مباشرة.</p>
      <p>جميع الأسعار استرشادية وقابلة للتغيير من بالم هيلز — Palm Hills دون إشعار مسبق.</p>
      <p>تواصل: <a href={`tel:${PI}`} style={{color:"var(--color-gold)",fontWeight:700}}>{PD}</a></p>
      <span className="agent-bdg">وكيل معتمد · Authorized Agent</span>
    </div></div>

    {/* CONTACT */}
    <section className="contact" id="contact"><div className="sec-in fin" style={{textAlign:"center"}}>
      <h2 className="sec-h">سجل اهتمامك في هاسيندا راس الحكمة — Hacienda Ras El Hekma</h2>
      <p style={{color:"rgba(255,255,255,.55)",fontSize:14,maxWidth:560,margin:"0 auto 4px"}}>املأ النموذج وسيتواصل معك مستشار من بالم هيلز — Palm Hills لآخر الأسعار والوحدات المتاحة</p>
      <form className="c-form" ref={fr} onSubmit={(e:FormEvent)=>{e.preventDefault();sub(fr,sFs)}} style={{textAlign:"right"}}>
        <input type="hidden" name="access_key" value={WK}/><input type="hidden" name="subject" value="Lead — هاسيندا راس الحكمة بالم هيلز Hacienda Ras El Hekma"/><input type="hidden" name="from_name" value="Hacienda Landing "/><input type="checkbox" name="botcheck" style={{display:"none"}}/>
        <div className="f-row">
          <div className="f-fld"><label>الاسم الكامل *</label><input name="name" placeholder="أدخل اسمك" required/></div>
          <div className="f-fld"><label>رقم الهاتف *</label><input name="phone" type="tel" dir="ltr" placeholder="01012345678" required/></div>
        </div>
        <div className="f-row">
          <div className="f-fld"><label>البريد الإلكتروني</label><input name="email" type="email" dir="ltr" placeholder="email@example.com"/></div>
          <div className="f-fld"><label>نوع الوحدة</label><select name="unit_type"><option value="غير محدد">اختر</option><option value="بيتش هوم">بيتش هوم</option><option value="شاليه">شاليه</option><option value="توين هاوس">توين هاوس</option><option value="فيلا">فيلا</option></select></div>
        </div>
        {fs==="sent"?<div style={{textAlign:"center",padding:"18px 0"}}><div style={{fontSize:40,marginBottom:8}}>✓</div><p style={{color:"var(--color-gold)",fontSize:16,fontWeight:700}}>تم استلام بياناتك</p></div>
        :<button type="submit" className="btn-sub" disabled={fs==="sending"}>{fs==="sending"?"جاري الإرسال...":"إرسال"}</button>}
        {fs==="error"&&<p style={{color:"#ef4444",fontSize:12,textAlign:"center",marginTop:8}}>خطأ — <a href={WU} target="_blank" rel="noopener" style={{color:"var(--color-gold)"}}>تواصل واتساب</a></p>}
      </form>
      <p style={{fontSize:10,color:"rgba(255,255,255,.3)",marginTop:12,maxWidth:480,margin:"12px auto 0"}}>بإرسال هذا النموذج توافق على <button onClick={()=>sPrv(true)} style={{background:"none",border:"none",color:"var(--color-gold)",textDecoration:"underline",cursor:"pointer",fontSize:10,fontFamily:"var(--font-sans)"}}>سياسة الخصوصية</button>. بياناتك لن تُشارك مع أطراف ثالثة.</p>
    </div></section>

    {/* FOOTER */}
    <footer className="ftr"><div className="ftr-in">
      <img src="/images/palm-hills-logo-white.png" alt="Palm Hills بالم هيلز"/>
      <p className="ftr-t">وكيل معتمد من بالم هيلز. هاسيندا راس الحكمة — Hacienda Ras El Hekma، الكيلو ٢٣٨ الساحل الشمالي. Palm Hills Hacienda · هاسيندا بالم هيلز.</p>
      <div className="ftr-links">
        <a className="ftr-link" href={`tel:${PI}`} onClick={()=>track("call_footer")}><Ph/><span>{PD}</span></a>
        <a className="ftr-link" href={WU} target="_blank" rel="noopener" onClick={()=>track("wa_footer")}>💬 واتساب</a>
      </div>
      <div className="ftr-legal">
        <button onClick={()=>sPrv(true)}>سياسة الخصوصية</button><a href="#about-agent">من نحن</a><a href="#contact">تواصل معنا</a>
      </div>
      <p className="ftr-cr">© 2026  · وكيل معتمد من بالم هيلز · جميع الأسعار استرشادية · Palm Hills Hacienda Ras El Hekma</p>
    </div></footer>

    {/* POPUP */}
    <div className={`pop-bk ${pop?"opn":""}`} onClick={cp}/>
    <div className={`pop-dlg ${pop?"opn":""}`}>
      <button className="pop-x" onClick={cp}>✕</button>
      <span className="pop-bdg">⚡ لونش هاسيندا راس الحكمة</span>
      <h2 className="pop-h">احجز مكانك في Hacienda Ras El Hekma</h2>
      <p className="pop-desc">سجّل دلوقتي واحصل على أولوية اختيار الموقع في هاسيندا بالم هيلز — Palm Hills Hacienda قبل انتهاء اللونش</p>
      <ul className="pop-perks"><li>أولوية اختيار الموقع على الماستر بلان</li><li>٥٪ مقدم فقط — تبدأ من ٥٨٥ ألف</li><li>رد في دقايق من فريق بالم هيلز</li></ul>
      {ps==="sent"?<div style={{textAlign:"center",padding:"14px 0"}}><div style={{fontSize:40}}>✓</div><p style={{color:"var(--color-gold)",fontWeight:700,marginTop:6}}>تم الاستلام</p></div>
      :<form className="pop-form" ref={pfr} onSubmit={(e:FormEvent)=>{e.preventDefault();sub(pfr,sPs).then(()=>{setTimeout(cp,2500)})}}>
        <input type="hidden" name="access_key" value={WK}/><input type="hidden" name="subject" value="Popup — هاسيندا راس الحكمة Hacienda"/><input type="hidden" name="from_name" value="Hacienda Popup"/><input type="checkbox" name="botcheck" style={{display:"none"}}/>
        <div className="f-fld"><label>الاسم *</label><input name="name" placeholder="الاسم الكامل" required/></div>
        <div className="f-fld"><label>رقم الموبايل *</label><input name="phone" type="tel" dir="ltr" placeholder="01012345678" required/></div>
        <div className="f-fld"><label>نوع الوحدة</label><select name="unit_type"><option value="غير محدد">اختر</option><option value="بيتش هوم">بيتش هوم</option><option value="شاليه">شاليه</option><option value="توين هاوس">توين هاوس</option><option value="فيلا">فيلا</option></select></div>
        <button type="submit" className="pop-sub" disabled={ps==="sending"}>{ps==="sending"?"جاري...":"احجز موقعي الآن"}</button>
        <a className="pop-wa" href={WU} target="_blank" rel="noopener" onClick={()=>track("wa_popup")}>💬 تواصل واتساب</a>
      </form>}
    </div>

    {/* PRIVACY MODAL */}
    {prv&&<><div style={{position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,.6)",backdropFilter:"blur(4px)"}} onClick={()=>sPrv(false)}/>
    <div style={{position:"fixed",zIndex:301,top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:"min(560px,92vw)",maxHeight:"85vh",overflowY:"auto",background:"#fff",borderRadius:18,padding:"32px 26px",color:"var(--color-navy)"}}>
      <button onClick={()=>sPrv(false)} style={{position:"absolute",top:12,left:12,background:"var(--color-cream)",border:"none",borderRadius:"50%",width:30,height:30,fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
      <h2 style={{fontFamily:"var(--font-serif)",fontSize:24,fontWeight:700,marginBottom:14}}>سياسة الخصوصية</h2>
      <div style={{fontSize:13,lineHeight:1.8,color:"var(--color-muted)"}}>
        <p style={{marginBottom:12}}><strong style={{color:"var(--color-navy)"}}>١. البيانات:</strong> الاسم، الهاتف، البريد، نوع الوحدة — فقط عند تعبئة النموذج.</p>
        <p style={{marginBottom:12}}><strong style={{color:"var(--color-navy)"}}>٢. الاستخدام:</strong> حصرياً للتواصل بخصوص هاسيندا راس الحكمة — Hacienda Ras El Hekma من بالم هيلز.</p>
        <p style={{marginBottom:12}}><strong style={{color:"var(--color-navy)"}}>٣. الحماية:</strong> اتصال مشفر HTTPS + Web3Forms. لا نبيع أو نشارك بياناتك.</p>
        <p style={{marginBottom:12}}><strong style={{color:"var(--color-navy)"}}>٤. حقوقك:</strong> طلب الاطلاع أو التصحيح أو الحذف في أي وقت.</p>
        <p><strong style={{color:"var(--color-navy)"}}>٥. التواصل:</strong> <a href={`tel:${PI}`} style={{color:"var(--color-gold)"}}>{PD}</a></p>
      </div>
      <p style={{fontSize:10,color:"#999",marginTop:14}}>آخر تحديث: يونيو 2026 · </p>
    </div></>}

    {/* COOKIE */}
    {ck&&<div className="ck-ban"><p>نستخدم ملفات تعريف الارتباط لتحسين تجربتك. <button onClick={()=>sPrv(true)} style={{background:"none",border:"none",color:"var(--color-gold)",textDecoration:"underline",cursor:"pointer",fontSize:11,fontFamily:"var(--font-sans)"}}>سياسة الخصوصية</button></p>
      <div className="ck-btns"><button className="ck-ok" onClick={()=>{sCk(false);try{localStorage.setItem("ck_ok","1")}catch{}}}>موافق</button><button className="ck-no" onClick={()=>sCk(false)}>رفض</button></div>
    </div>}

    {/* FLOATING BUTTONS - LEFT */}
    <div className="float-btns">
      <a className="float-wa" href={WU} target="_blank" rel="noopener" onClick={()=>track("wa_float")} aria-label="واتساب"><svg width="26" height="26" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a>
      <a className="float-call" href={`tel:${PI}`} onClick={()=>track("call_float")} aria-label="اتصل"><Ph/></a>
    </div>

    {/* MOBILE BAR */}
    <nav className="mbar"><div className="mbar-in">
      <a className="m-call" href={`tel:${PI}`} onClick={()=>track("call_mobile")}><Ph/>{PD}</a>
      <a className="m-wa" href={WU} target="_blank" rel="noopener" onClick={()=>track("wa_mobile")}>💬 واتساب</a>
      <a className="m-reg" href="#contact">سجل</a>
    </div></nav>
  </>);
}
