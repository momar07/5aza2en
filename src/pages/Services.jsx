import React from "react";
import { useTranslation } from "react-i18next";
import PageLayout from "../components/Layout/PageLayout";
import AnimatedSection from "../components/UI/AnimatedSection";
import SectionHeader from "../components/UI/SectionHeader";
import { Star, Truck, Shield, MessageCircle, Wrench, CreditCard } from "lucide-react";

export default function Services() {
  const { t } = useTranslation();
  const services = [
    { icon:<Star size={36}/>,         title:t("services.s1Title"), desc:t("services.s1Desc"), num:"01" },
    { icon:<Truck size={36}/>,        title:t("services.s2Title"), desc:t("services.s2Desc"), num:"02" },
    { icon:<Shield size={36}/>,       title:t("services.s3Title"), desc:t("services.s3Desc"), num:"03" },
    { icon:<MessageCircle size={36}/>,title:t("services.s4Title"), desc:t("services.s4Desc"), num:"04" },
    { icon:<Wrench size={36}/>,       title:t("services.s5Title"), desc:t("services.s5Desc"), num:"05" },
    { icon:<CreditCard size={36}/>,   title:t("services.s6Title"), desc:t("services.s6Desc"), num:"06" },
  ];

  return (
    <PageLayout>
      <div style={{ paddingTop:"100px", background:"var(--dark)", minHeight:"100vh" }}>
        <div className="container py-16">
          <SectionHeader badge={t("services.badge")} title={t("services.title")} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <AnimatedSection key={i} delay={i * 0.1} direction="up">
                <div className="card-dark p-8 rounded-3xl group relative overflow-hidden h-full">
                  <div className="absolute top-4 right-4 font-black text-6xl pointer-events-none select-none opacity-5
                                  group-hover:opacity-10 transition-opacity duration-500"
                    style={{ color:"var(--gold)", fontFamily:"Playfair Display,serif" }}>
                    {s.num}
                  </div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl gold-gradient flex items-center justify-center mb-6
                                    text-black shadow-gold-sm group-hover:shadow-gold-md transition-shadow duration-300
                                    group-hover:scale-110 transform transition-transform">
                      {s.icon}
                    </div>
                    <h3 className="font-black text-white text-xl mb-3">{s.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{s.desc}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 gold-gradient-h opacity-0
                                  group-hover:opacity-100 transition-opacity duration-300"/>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
