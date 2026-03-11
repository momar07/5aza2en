import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useApp } from "../context/AppContext";
import { motion, useScroll, useTransform } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade, Navigation } from "swiper/modules";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import PageLayout from "../components/Layout/PageLayout";
import AnimatedSection from "../components/UI/AnimatedSection";
import SectionHeader from "../components/UI/SectionHeader";
import { ArrowLeft, ArrowRight, ChevronDown, Star, Shield, Truck, Wrench, MessageCircle } from "lucide-react";

const HERO = [
  { img:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600", tagAr:"مجموعة بريميوم", tagEn:"Premium Collection" },
  { img:"https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=1600", tagAr:"تصاميم حصرية",   tagEn:"Exclusive Designs"   },
  { img:"https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=1600", tagAr:"صنع بالشغف",     tagEn:"Made with Passion"   },
];

function StatCard({ num, suffix="", label, delay=0 }) {
  const { ref, inView } = useInView({ triggerOnce:true });
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-black mb-1" style={{ color:"var(--gold)" }}>
        {inView ? <CountUp end={num} duration={2.5} delay={delay} separator="," suffix={suffix} /> : "0"}
      </div>
      <div className="text-sm text-gray-400 font-medium">{label}</div>
    </div>
  );
}

export default function Home() {
  const { t }                      = useTranslation();
  const { lang, products, ads }    = useApp();
  const featured                   = products.slice(0, 8);
  const activeAds                  = ads.filter(a => a.active);
  const { scrollY }                = useScroll();
  const heroY                      = useTransform(scrollY, [0, 600], [0, 150]);
  const heroOpacity                = useTransform(scrollY, [0, 400], [1, 0]);
  const [typed, setTyped]          = useState("");
  const fullText                   = lang === "ar" ? t("hero.title2") : t("hero.title2");

  useEffect(() => {
    let i = 0;
    setTyped("");
    const iv = setInterval(() => {
      setTyped(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(iv);
    }, 100);
    return () => clearInterval(iv);
  }, [fullText]);

  return (
    <PageLayout>
      <section className="relative h-screen overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            effect="fade"
            autoplay={{ delay:5500, disableOnInteraction:false }}
            pagination={{ clickable:true }}
            loop
            className="h-full"
          >
            {HERO.map((slide, i) => (
              <SwiperSlide key={i}>
                <div className="relative h-full">
                  <img src={slide.img} alt="" className="w-full h-full object-cover scale-105" />
                  <div className="absolute inset-0" style={{ background:"linear-gradient(to bottom,rgba(0,0,0,0.2),rgba(0,0,0,0.85))" }}/>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
          <motion.div
            initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:0.3, duration:0.8 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase"
            style={{ background:"rgba(200,151,58,0.15)", border:"1px solid rgba(200,151,58,0.3)", color:"var(--gold)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background:"var(--gold)" }}/>
            {t("hero.badge")}
          </motion.div>

          <motion.div
            initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:0.5, duration:0.9 }}
            className="mb-6"
          >
            <div className="text-white font-black text-5xl md:text-7xl lg:text-8xl leading-tight" style={{ fontFamily:"Cairo,sans-serif" }}>
              {t("hero.title1")}
            </div>
            <div className="font-black text-5xl md:text-7xl lg:text-8xl leading-tight gold-text" style={{ fontFamily:"Cairo,sans-serif" }}>
              {typed}<span className="animate-pulse">|</span>
            </div>
            <div className="text-white/70 font-light text-3xl md:text-5xl leading-tight" style={{ fontFamily:"Cormorant Garamond,serif" }}>
              {t("hero.title3")}
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity:0 }} animate={{ opacity:1 }}
            transition={{ delay:1, duration:0.8 }}
            className="text-gray-300 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:1.2, duration:0.6 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link to="/products" className="btn-gold text-base">
              {t("hero.cta1")}
              {lang === "ar" ? <ArrowLeft size={18}/> : <ArrowRight size={18}/>}
            </Link>
            <Link to="/contact" className="btn-outline-gold text-base">
              <MessageCircle size={18}/>
              {t("hero.cta2")}
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <span className="text-xs tracking-widest uppercase text-gray-400">{t("hero.scroll")}</span>
          <motion.div animate={{ y:[0,8,0] }} transition={{ duration:1.5, repeat:Infinity }}>
            <ChevronDown size={20} style={{ color:"var(--gold)" }}/>
          </motion.div>
        </motion.div>
      </section>

      <section style={{ background:"var(--dark-200)", borderTop:"1px solid rgba(200,151,58,0.08)", borderBottom:"1px solid rgba(200,151,58,0.08)" }}>
        <div className="container py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard num={500}  suffix="+"  label={t("stats.products")}  delay={0}   />
            <StatCard num={2000} suffix="+"  label={t("stats.customers")} delay={0.2} />
            <StatCard num={14}   suffix="+"  label={t("stats.years")}     delay={0.4} />
            <StatCard num={2}               label={t("stats.branches")}  delay={0.6} />
          </div>
        </div>
      </section>

      {activeAds.length > 0 && (
        <section className="section-padding" style={{ background:"var(--dark)" }}>
          <div className="container">
            <SectionHeader badge={t("ads.title")} title={t("ads.subtitle")} />
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              autoplay={{ delay:4500, disableOnInteraction:false }}
              pagination={{ clickable:true }}
              navigation
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{ 768:{ slidesPerView:2 }, 1024:{ slidesPerView:3 } }}
              className="pb-12"
            >
              {activeAds.map((ad) => (
                <SwiperSlide key={ad.id}>
                  <AnimatedSection direction="scale">
                    <div className="relative rounded-3xl overflow-hidden group cursor-pointer hover-lift"
                      style={{ border:"1px solid rgba(200,151,58,0.15)" }}>
                      <div className="relative h-56 overflow-hidden">
                        <img src={ad.img} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                        <div className="absolute inset-0" style={{ background:"linear-gradient(to top,rgba(0,0,0,0.9) 0%,rgba(0,0,0,0.3) 60%,transparent 100%)" }}/>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <h3 className="font-black text-lg text-white mb-1">{lang==="ar"?ad.titleAr:ad.titleEn}</h3>
                        <p className="text-sm text-gray-300">{lang==="ar"?ad.descAr:ad.descEn}</p>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="tag-gold text-xs px-3 py-1">{lang==="ar"?"عرض خاص":"Special Offer"}</span>
                      </div>
                    </div>
                  </AnimatedSection>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}

      <section className="section-padding" style={{ background:"var(--dark-100)" }}>
        <div className="container">
          <SectionHeader badge={t("products.title")} title={t("products.subtitle")} />
          <div className="masonry-grid">
            {featured.map((p, i) => (
              <AnimatedSection key={p.id} delay={i * 0.06} className="masonry-item" direction="scale">
                <div className="relative rounded-2xl overflow-hidden group cursor-pointer hover-lift"
                  style={{ border:"1px solid rgba(200,151,58,0.1)" }}>
                  <img
                    src={p.img}
                    alt={lang==="ar"?p.titleAr:p.titleEn}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ height: i%4===0?"320px":i%4===1?"240px":i%4===2?"280px":"200px" }}
                  />
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                    style={{ background:"linear-gradient(to top,rgba(0,0,0,0.95) 0%,rgba(0,0,0,0.5) 50%,transparent 100%)" }}/>
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                    <h3 className="font-black text-white text-sm mb-1">{lang==="ar"?p.titleAr:p.titleEn}</h3>
                    <span className="tag-gold text-xs">{t(`products.${p.category}`)}</span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/products" className="btn-gold text-base">
              {t("products.viewAll")}
              {lang==="ar"?<ArrowLeft size={18}/>:<ArrowRight size={18}/>}
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ background:"var(--dark-200)" }}>
        <div className="container">
          <SectionHeader badge={t("services.badge")} title={t("services.title")} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon:<Star size={28}/>,         title:t("services.s1Title"), desc:t("services.s1Desc") },
              { icon:<Truck size={28}/>,        title:t("services.s2Title"), desc:t("services.s2Desc") },
              { icon:<Shield size={28}/>,       title:t("services.s3Title"), desc:t("services.s3Desc") },
              { icon:<MessageCircle size={28}/>,title:t("services.s4Title"), desc:t("services.s4Desc") },
              { icon:<Wrench size={28}/>,       title:t("services.s5Title"), desc:t("services.s5Desc") },
              { icon:<Star size={28}/>,         title:t("services.s6Title"), desc:t("services.s6Desc") },
            ].map((s, i) => (
              <AnimatedSection key={i} delay={i*0.08} direction="up">
                <div className="card-dark p-6 group h-full">
                  <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center mb-4 text-black
                                  group-hover:shadow-gold-md transition-shadow duration-300">
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

      <section className="section-padding relative overflow-hidden" style={{ background:"var(--dark)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10"
            style={{ background:"radial-gradient(circle,var(--gold),transparent 70%)" }}/>
        </div>
        <div className="container relative z-10 text-center">
          <AnimatedSection direction="scale">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase"
              style={{ background:"rgba(200,151,58,0.1)", border:"1px solid rgba(200,151,58,0.25)", color:"var(--gold)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background:"var(--gold)" }}/>
              {lang==="ar"?"ابدا رحلتك معنا":"Start Your Journey"}
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-5" style={{ fontFamily:"Cairo,sans-serif" }}>
              {lang==="ar"?"حوّل مساحتك":"Transform Your"}
              <span className="block gold-text">{lang==="ar"?"الى تحفة فنية":"Space Into Art"}</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
              {lang==="ar"
                ?"تواصل معنا اليوم واحصل على استشارة مجانية من خبرائنا المتخصصين"
                :"Contact us today for a free consultation from our specialized experts"}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact" className="btn-gold text-lg px-10 py-4">
                <MessageCircle size={20}/>
                {t("hero.cta2")}
              </Link>
              <Link to="/products" className="btn-outline-gold text-lg px-10 py-4">
                {t("hero.cta1")}
                {lang==="ar"?<ArrowLeft size={20}/>:<ArrowRight size={20}/>}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </PageLayout>
  );
}
