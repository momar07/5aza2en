import React from "react";
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import { motion } from "framer-motion";
import { Package, Megaphone, Users, TrendingUp } from "lucide-react";

export default function Overview() {
  const { t }                  = useTranslation();
  const { lang, products, ads } = useApp();

  const stats = [
    { icon:<Package size={24}/>,    label:t("dashboard.totalProducts"), value:products.length, color:"#C8973A", bg:"rgba(200,151,58,0.1)"  },
    { icon:<Megaphone size={24}/>,  label:t("dashboard.totalAds"),      value:ads.filter(a=>a.active).length, color:"#10b981", bg:"rgba(16,185,129,0.1)"  },
    { icon:<Users size={24}/>,      label:t("dashboard.visitors"),      value:"1,240",         color:"#6366f1", bg:"rgba(99,102,241,0.1)"  },
    { icon:<TrendingUp size={24}/>, label:t("dashboard.engagement"),    value:"87%",           color:"#f59e0b", bg:"rgba(245,158,11,0.1)"  },
  ];

  return (
    <div>
      <h1 className="text-2xl font-black text-white mb-6">{t("dashboard.overview")}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <motion.div key={i}
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:i*0.1 }}
            className="p-5 rounded-2xl"
            style={{ background:"var(--dark-100)", border:"1px solid rgba(200,151,58,0.08)" }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background:s.bg, color:s.color }}>
                {s.icon}
              </div>
              <span className="text-2xl font-black" style={{ color:s.color }}>{s.value}</span>
            </div>
            <p className="text-sm text-gray-400 font-medium">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl" style={{ background:"var(--dark-100)", border:"1px solid rgba(200,151,58,0.08)" }}>
          <h3 className="font-black text-white mb-5 flex items-center gap-2">
            <Package size={18} style={{ color:"var(--gold)" }}/>
            {t("dashboard.recentProducts")}
          </h3>
          <div className="space-y-3">
            {products.slice(0,5).map(p => (
              <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl transition-colors hover:bg-white/5">
                <img src={p.img} alt="" className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                  style={{ border:"1px solid rgba(200,151,58,0.15)" }}/>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white text-sm truncate">
                    {lang==="ar"?p.titleAr:p.titleEn}
                  </div>
                  <div className="text-xs text-gray-500 capitalize mt-0.5">{p.category}</div>
                </div>
                <span className="tag-gold text-xs flex-shrink-0">{lang==="ar"?p.category:p.category}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl" style={{ background:"var(--dark-100)", border:"1px solid rgba(200,151,58,0.08)" }}>
          <h3 className="font-black text-white mb-5 flex items-center gap-2">
            <Megaphone size={18} style={{ color:"var(--gold)" }}/>
            {t("dashboard.activeAds")}
          </h3>
          <div className="space-y-3">
            {ads.filter(a=>a.active).map(ad => (
              <div key={ad.id} className="flex items-center gap-3 p-3 rounded-xl transition-colors hover:bg-white/5">
                <img src={ad.img} alt="" className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                  style={{ border:"1px solid rgba(200,151,58,0.15)" }}/>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white text-sm truncate">
                    {lang==="ar"?ad.titleAr:ad.titleEn}
                  </div>
                  <div className="text-xs text-gray-500 truncate mt-0.5">
                    {lang==="ar"?ad.descAr:ad.descEn}
                  </div>
                </div>
                <span className="text-xs px-2 py-1 rounded-full font-semibold"
                  style={{ background:"rgba(16,185,129,0.1)", color:"#10b981" }}>
                  {t("dashboard.active")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
