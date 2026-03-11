import React, { useState, useEffect, useRef, useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useApp } from "../context/AppContext";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import "swiper/css";
import "swiper/css/pagination";
import PageLayout from "../components/Layout/PageLayout";
import AnimatedSection from "../components/UI/AnimatedSection";
import SectionHeader from "../components/UI/SectionHeader";
import { ArrowLeft, ArrowRight, Star, Shield, Truck, Wrench, MessageCircle } from "lucide-react";

/* ---------- StatCard ---------- */
function StatCard({ num, suffix="", label, delay=0 }) {
  const { ref, inView } = useInView({ triggerOnce: true });
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-black mb-1" style={{ color: "var(--gold)" }}>
        {inView ? <CountUp end={num} duration={2.5} delay={delay} separator="," suffix={suffix}/> : "0"}
      </div>
      <div className="text-sm text-gray-400 font-medium">{label}</div>
    </div>
  );
}

/* ---------- StatsSection ---------- */
function StatsSection() {
  const { t } = useTranslation();
  return (
    <section style={{ background: "var(--dark-200)",
                      borderTop: "1px solid rgba(200,151,58,.08)",
                      borderBottom: "1px solid rgba(200,151,58,.08)" }}>
      <div className="container py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatCard num={500}  suffix="+" label={t("stats.products")}  delay={0}/>
          <StatCard num={2000} suffix="+" label={t("stats.customers")} delay={.2}/>
          <StatCard num={14}   suffix="+" label={t("stats.years")}     delay={.4}/>
          <StatCard num={2}               label={t("stats.branches")}  delay={.6}/>
        </div>
      </div>
    </section>
  );
}

/* ---------- ProductsSection ---------- */
function ProductsSection() {
  const { t } = useTranslation();
  const { lang, products } = useApp();
  const featured = products.slice(0, 6);
  return (
    <section className="section-padding" style={{ background: "var(--dark-100)" }}>
      <div className="container">
        <SectionHeader badge={t("products.title")} title={t("products.subtitle")}/>
        <div style={{ display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                      gap: "1.25rem", marginTop: "2rem" }}>
          {featured.map((p, i) => (
            <motion.div key={p.id || i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
              className="card-dark"
              style={{ overflow: "hidden", borderRadius: "1rem" }}
            >
              <img src={p.img} alt={lang === "ar" ? p.titleAr : p.titleEn}
                style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }}/>
              <div style={{ padding: "1rem" }}>
                <h3 style={{ color: "#fff", fontWeight: 700, marginBottom: 6 }}>
                  {lang === "ar" ? p.titleAr : p.titleEn}
                </h3>
                <span className="tag-gold">{t(`products.${p.category}`)}</span>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/products" className="btn-gold text-base">
            {t("products.viewAll")}
            {lang === "ar" ? <ArrowLeft size={18}/> : <ArrowRight size={18}/>}
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- ServicesSection ---------- */
function ServicesSection() {
  const { t } = useTranslation();
  const services = [
    { icon: <Star size={28}/>,        title: t("services.s1Title"), desc: t("services.s1Desc") },
    { icon: <Truck size={28}/>,       title: t("services.s2Title"), desc: t("services.s2Desc") },
    { icon: <Shield size={28}/>,      title: t("services.s3Title"), desc: t("services.s3Desc") },
    { icon: <MessageCircle size={28}/>,title: t("services.s4Title"), desc: t("services.s4Desc") },
    { icon: <Wrench size={28}/>,      title: t("services.s5Title"), desc: t("services.s5Desc") },
    { icon: <Star size={28}/>,        title: t("services.s6Title"), desc: t("services.s6Desc") },
  ];
  return (
    <section className="section-padding" style={{ background: "var(--dark-200)" }}>
      <div className="container">
        <SectionHeader badge={t("services.badge")} title={t("services.title")}/>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <AnimatedSection key={i} delay={i * .08} direction="up">
              <div className="card-dark p-6 group h-full">
                <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center mb-4 text-black">
                  {s.icon}
                </div>
                <h3 className="font-black text-white text-lg mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CTASection ---------- */
function CTASection() {
  const { t } = useTranslation();
  const { lang } = useApp();
  return (
    <section className="section-padding relative overflow-hidden" style={{ background: "var(--dark)" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, var(--gold), transparent 70%)" }}/>
      </div>
      <div className="container relative z-10 text-center">
        <AnimatedSection direction="scale">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-5">
            {lang === "ar" ? "حوّل مساحتك" : "Transform Your"}
            <span className="block gold-text">{lang === "ar" ? "إلى تحفة فنية" : "Space Into Art"}</span>
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
            {lang === "ar"
              ? "تواصل معنا اليوم واحصل على استشارة مجانية"
              : "Contact us today for a free consultation"}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact"  className="btn-gold text-lg px-10 py-4">
              <MessageCircle size={20}/>{t("hero.cta2")}
            </Link>
            <Link to="/products" className="btn-outline-gold text-lg px-10 py-4">
              {t("hero.cta1")}{lang === "ar" ? <ArrowLeft size={20}/> : <ArrowRight size={20}/>}
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

const CARDS_F = [
  { img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80",
    titleAr: "غرف النوم",   titleEn: "Bedrooms",
    descAr: "فخامة لا حدود لها",       descEn: "Unlimited luxury" },
  { img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80",
    titleAr: "المعيشة",      titleEn: "Living Rooms",
    descAr: "تصاميم تجمع الأسرة",      descEn: "Designs that unite families" },
  { img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
    titleAr: "الأطفال",      titleEn: "Kids Rooms",
    descAr: "ألوان تشعل الخيال",       descEn: "Colors that ignite imagination" },
  { img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80",
    titleAr: "مخصص",         titleEn: "Custom",
    descAr: "فكرتك بأيدينا",           descEn: "Your idea in our hands" },
];

const STACK_STYLES = [
  { zIndex: 10, scale: 1,    rotateY:  0,  x: "0%",  opacity: 1    },
  { zIndex:  8, scale: 0.88, rotateY: 12,  x: "18%", opacity: 0.75 },
  { zIndex:  6, scale: 0.76, rotateY: 20,  x: "32%", opacity: 0.45 },
  { zIndex:  4, scale: 0.64, rotateY: 26,  x: "44%", opacity: 0.2  },
];

function Hero3DStack() {
  const { lang } = useApp();
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const [dir, setDir]       = useState(1);

  const goNext = () => { setDir(1);  setActive(p => (p + 1) % CARDS_F.length); };
  const goPrev = () => { setDir(-1); setActive(p => (p - 1 + CARDS_F.length) % CARDS_F.length); };

  useEffect(() => {
    const timer = setInterval(goNext, 4200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section style={{ position: "relative", width: "100%", minHeight: "100vh",
                      background: "radial-gradient(ellipse at 30% 50%, #150e02 0%, #0a0a0a 65%)",
                      display: "flex", alignItems: "center", overflow: "hidden",
                      padding: "5rem 0 7rem" }}>

      {/* Ambient glow */}
      <div style={{ position: "absolute", top: "30%", left: "8%",
                    width: 480, height: 480, borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(200,151,58,0.07) 0%, transparent 70%)",
                    pointerEvents: "none" }}/>

      <div className="container" style={{ display: "grid",
                                          gridTemplateColumns: "1fr 1.15fr",
                                          gap: "3rem", alignItems: "center",
                                          padding: "0 3rem", position: "relative", zIndex: 2 }}>

        {/* LEFT — text */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div key={active}
              initial={{ opacity: 0, y: 20, x: dir * -30 }}
              animate={{ opacity: 1, y: 0,  x: 0 }}
              exit={{    opacity: 0, y: -20, x: dir * 30 }}
              transition={{ duration: 0.5 }}>

              <span className="tag-gold" style={{ display: "inline-block", marginBottom: "1rem" }}>
                {lang === "ar" ? CARDS_F[active].titleAr : CARDS_F[active].titleEn}
              </span>

              <h1 style={{ fontSize: "clamp(2.5rem,5vw,4.5rem)", fontWeight: 900,
                           color: "#fff", lineHeight: 1.15, marginBottom: "1.2rem",
                           fontFamily: "Cairo, sans-serif" }}>
                {lang === "ar" ? "خبراء" : "Experts"}{" "}
                <span className="gold-text">{lang === "ar" ? "الخزائن" : "Cabinets"}</span>
                <br/>{lang === "ar" ? "الفاخرة" : "& Wardrobes"}
              </h1>

              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.05rem", marginBottom: "2.5rem" }}>
                {lang === "ar" ? CARDS_F[active].descAr : CARDS_F[active].descEn}
              </p>
            </motion.div>
          </AnimatePresence>

          <div style={{ display: "flex", gap: "1rem", marginBottom: "2.5rem", flexWrap: "wrap" }}>
            <Link to="/products" className="btn-gold">
              {t("hero.cta1")}{lang === "ar" ? <ArrowLeft size={18}/> : <ArrowRight size={18}/>}
            </Link>
            <Link to="/contact" className="btn-outline-gold">
              <MessageCircle size={18}/>{t("hero.cta2")}
            </Link>
          </div>

          {/* Controls */}
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
            <button onClick={goPrev} style={{
              width: 44, height: 44, borderRadius: "50%",
              background: "rgba(200,151,58,0.12)",
              border: "1px solid rgba(200,151,58,0.35)",
              color: "var(--gold)", fontSize: "1.3rem",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"
            }}>‹</button>

            {CARDS_F.map((_, i) => (
              <div key={i} onClick={() => { setDir(i > active ? 1 : -1); setActive(i); }}
                style={{ width: i === active ? 28 : 10, height: 10, borderRadius: 5,
                         background: i === active ? "var(--gold)" : "rgba(255,255,255,0.2)",
                         cursor: "pointer", transition: "all 0.3s" }}/>
            ))}

            <button onClick={goNext} style={{
              width: 44, height: 44, borderRadius: "50%",
              background: "rgba(200,151,58,0.12)",
              border: "1px solid rgba(200,151,58,0.35)",
              color: "var(--gold)", fontSize: "1.3rem",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"
            }}>›</button>
          </div>
        </div>

        {/* RIGHT — 3D stack */}
        <div style={{ position: "relative", height: 520,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      perspective: 1200 }}>
          {CARDS_F.map((card, i) => {
            const offset = (i - active + CARDS_F.length) % CARDS_F.length;
            if (offset > 3) return null;
            const st = STACK_STYLES[offset];
            return (
              <motion.div key={i}
                animate={{ ...st }}
                transition={{ duration: 0.65, ease: "easeInOut" }}
                onClick={() => { setDir(1); setActive(i); }}
                style={{ position: "absolute",
                         width: "75%", maxWidth: 340,
                         borderRadius: "1.25rem", overflow: "hidden",
                         cursor: offset === 0 ? "default" : "pointer",
                         boxShadow: offset === 0
                           ? "0 30px 70px rgba(0,0,0,0.8), 0 0 40px rgba(200,151,58,0.2)"
                           : "0 15px 40px rgba(0,0,0,0.5)",
                         transformStyle: "preserve-3d",
                         transformOrigin: "center center" }}>

                <img src={card.img} alt=""
                  style={{ width: "100%", height: 480, objectFit: "cover", display: "block" }}/>

                {offset === 0 && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    style={{ position: "absolute", bottom: 0, left: 0, right: 0,
                             padding: "2rem 1.5rem 1.5rem",
                             background: "linear-gradient(to top, rgba(0,0,0,0.88), transparent)" }}>
                    <p className="gold-text" style={{ fontWeight: 700, fontSize: "1.1rem" }}>
                      {lang === "ar" ? card.titleAr : card.titleEn}
                    </p>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", marginTop: 4 }}>
                      {lang === "ar" ? card.descAr : card.descEn}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom stats bar */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0,
                    background: "rgba(0,0,0,0.45)", backdropFilter: "blur(10px)",
                    borderTop: "1px solid rgba(200,151,58,0.15)",
                    display: "flex", justifyContent: "center",
                    gap: "4rem", padding: "1.2rem 1rem" }}>
        {[["500+","stats.products"],["2000+","stats.customers"],["14+","stats.years"],["2","stats.branches"]].map(([n, key], i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <span className="gold-text" style={{ fontWeight: 800, fontSize: "1.4rem" }}>{n}</span>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem",
                           display: "block", marginTop: 2 }}>
              {key}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <PageLayout>
      <Hero3DStack />
      <StatsSection />
      <ProductsSection />
      <ServicesSection />
      <CTASection />
    </PageLayout>
  );
}