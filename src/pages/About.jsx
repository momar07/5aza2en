import React from "react";
import { useTranslation } from "react-i18next";
import { useApp } from "../context/AppContext";
import PageLayout from "../components/Layout/PageLayout";
import AnimatedSection from "../components/UI/AnimatedSection";
import SectionHeader from "../components/UI/SectionHeader";
import { MapPin, Award, Target, Eye } from "lucide-react";

const TIMELINE_KEYS = [
  ["timeline1Y","timeline1T","timeline1D"],
  ["timeline2Y","timeline2T","timeline2D"],
  ["timeline3Y","timeline3T","timeline3D"],
  ["timeline4Y","timeline4T","timeline4D"],
];

export default function About() {
  const { t }    = useTranslation();
  const { lang } = useApp();

  return (
    <PageLayout>
      <div style={{ paddingTop:"100px", background:"var(--dark)", minHeight:"100vh" }}>
        <div className="container py-16">
          <SectionHeader badge={t("about.badge")} title={t("about.title")} subtitle={t("about.subtitle")}/>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
            <AnimatedSection direction="right">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=700"
                  alt={lang==="ar" ? "خبراء الخزائن - خزائن فاخرة منذ 2010" : "Khobara Khazaen - Luxury cabinets since 2010"}
                  loading="lazy"
                  width="700" height="480"
                  className="rounded-3xl w-full h-80 object-cover shadow-gold-lg"
                  style={{ border:"1px solid rgba(200,151,58,0.2)" }}
                />
                <div className="absolute -bottom-5 -left-5 w-24 h-24 rounded-2xl gold-gradient flex items-center justify-center shadow-gold-md">
                  <div className="text-center">
                    <div className="text-black font-black text-2xl leading-none">14</div>
                    <div className="text-black/70 text-xs font-semibold">{lang==="ar"?"عاماً":"Years"}</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="left" delay={0.2}>
              <div className="space-y-6">
                <p className="text-gray-300 leading-relaxed text-lg">{t("about.story1")}</p>
                <p className="text-gray-400 leading-relaxed">{t("about.story2")}</p>
                <div className="divider-gold"/>
                <div className="grid grid-cols-1 gap-4">
                  <div className="glass-gold p-4 rounded-2xl">
                    <div className="flex items-center gap-3 mb-2">
                      <Eye size={18} style={{ color:"var(--gold)" }}/>
                      <h4 className="font-bold text-white">{t("about.vision")}</h4>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">{t("about.visionText")}</p>
                  </div>
                  <div className="glass-gold p-4 rounded-2xl">
                    <div className="flex items-center gap-3 mb-2">
                      <Target size={18} style={{ color:"var(--gold)" }}/>
                      <h4 className="font-bold text-white">{t("about.mission")}</h4>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">{t("about.missionText")}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection>
            <h3 className="text-2xl font-black text-center mb-12"
              style={{ color:"var(--gold)", fontFamily:"Cairo,sans-serif" }}>
              {lang==="ar"?"رحلتنا عبر السنين":"Our Journey Through the Years"}
            </h3>
          </AnimatedSection>

          <div className="relative max-w-3xl mx-auto mb-24">
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-px w-px opacity-30"
              style={{ background:"linear-gradient(to bottom,transparent,var(--gold),transparent)" }}/>
            {TIMELINE_KEYS.map(([y,tit,desc], i) => (
              <AnimatedSection key={i} delay={i*0.15} direction={i%2===0?"right":"left"}>
                <div className={`flex items-center gap-6 mb-10 ${i%2===0?"flex-row":"flex-row-reverse"}`}>
                  <div className="flex-1 text-right" style={{ textAlign: i%2===0 ? (lang==="ar"?"left":"right") : (lang==="ar"?"right":"left") }}>
                    <div className="card-dark p-5 rounded-2xl">
                      <div className="font-black text-2xl mb-1 gold-text">{t(`about.${y}`)}</div>
                      <div className="font-bold text-white mb-1">{t(`about.${tit}`)}</div>
                      <div className="text-gray-400 text-sm">{t(`about.${desc}`)}</div>
                    </div>
                  </div>
                  <div className="number-badge flex-shrink-0 z-10 shadow-gold-md">{i+1}</div>
                  <div className="flex-1"/>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection>
            <h3 className="text-2xl font-black text-center mb-8"
              style={{ color:"var(--gold)", fontFamily:"Cairo,sans-serif" }}>
              {lang==="ar"?"فروعنا":"Our Branches"}
            </h3>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name:t("about.branch1"), addr:t("about.branch1Addr") },
              { name:t("about.branch2"), addr:t("about.branch2Addr") },
            ].map((b,i) => (
              <AnimatedSection key={i} delay={i*0.15} direction="up">
                <div className="card-dark p-6 rounded-2xl flex items-start gap-4"
                  itemScope itemType="https://schema.org/LocalBusiness">
                  <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center flex-shrink-0 shadow-gold-sm">
                    <MapPin size={20} className="text-black"/>
                  </div>
                  <div>
                    <h4 className="font-black text-white text-lg mb-1" itemProp="name">{b.name}</h4>
                    <p className="text-gray-400 text-sm" itemProp="address">{b.addr}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
