import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useApp } from "../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import PageLayout from "../components/Layout/PageLayout";
import SectionHeader from "../components/UI/SectionHeader";
import { X, ZoomIn } from "lucide-react";

export default function Products() {
  const { t }               = useTranslation();
  const { lang, products }  = useApp();
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const cats     = ["all","bedroom","living","kids","custom"];
  const filtered = filter === "all" ? products : products.filter(p => p.category === filter);

  return (
    <PageLayout>
      <div style={{ paddingTop:"100px", background:"var(--dark)", minHeight:"100vh" }}>
        <div className="container py-16">
          <SectionHeader badge={t("products.title")} title={t("products.subtitle")} />

          {/* فلاتر الفئات */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {cats.map(c => (
              <button key={c} onClick={() => setFilter(c)}
                className="px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300"
                style={{
                  background: filter===c
                    ? "linear-gradient(135deg,#7a5418,#C8973A,#E8B96A)"
                    : "rgba(200,151,58,0.08)",
                  color:     filter===c ? "var(--dark)" : "var(--gold)",
                  border:    filter===c ? "1px solid transparent" : "1px solid rgba(200,151,58,0.2)",
                  boxShadow: filter===c ? "0 4px 20px rgba(200,151,58,0.3)" : "none",
                }}>
                {t(`products.${c}`)}
              </button>
            ))}
          </div>

          {/* ── الجريد الموحد ── */}
          <motion.div layout className="products-grid">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.div key={p.id} layout
                  initial={{ opacity:0, scale:0.92 }}
                  animate={{ opacity:1, scale:1   }}
                  exit={{    opacity:0, scale:0.92 }}
                  transition={{ duration:0.35, delay: Math.min(i * 0.04, 0.3) }}
                  className="product-card group"
                  onClick={() => setSelected(p)}
                >
                  <img
                    src={p.img}
                    alt={lang==="ar" ? `${p.titleAr} — خزائن فاخرة` : `${p.titleEn} — Luxury Cabinets`}
                    loading="lazy"
                    className="product-card__img"
                  />

                  {/* overlay عند hover */}
                  <div className="product-card__overlay">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ background:"rgba(200,151,58,0.9)" }}>
                      <ZoomIn size={20} className="text-black"/>
                    </div>
                  </div>

                  {/* اسم المنتج — دائماً ظاهر */}
                  <div className="product-card__caption">
                    <h3 className="font-black text-white text-sm mb-1 leading-snug">
                      {lang==="ar" ? p.titleAr : p.titleEn}
                    </h3>
                    <span className="tag-gold text-xs">{t(`products.${p.category}`)}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background:"rgba(0,0,0,0.92)", backdropFilter:"blur(10px)" }}
            onClick={() => setSelected(null)}>
            <motion.div
              initial={{ scale:0.8, opacity:0 }}
              animate={{ scale:1,   opacity:1 }}
              exit={{    scale:0.8, opacity:0 }}
              transition={{ type:"spring", bounce:0.25 }}
              className="relative max-w-2xl w-full rounded-3xl overflow-hidden"
              style={{ border:"1px solid rgba(200,151,58,0.3)", background:"var(--dark-200)" }}
              onClick={e => e.stopPropagation()}>
              <img
                src={selected.img}
                alt={lang==="ar" ? selected.titleAr : selected.titleEn}
                loading="lazy"
                className="w-full object-cover"
                style={{ height:"360px" }}
              />
              <div className="p-6">
                <h2 className="text-2xl font-black text-white mb-2">
                  {lang==="ar" ? selected.titleAr : selected.titleEn}
                </h2>
                <span className="tag-gold">{t(`products.${selected.category}`)}</span>
              </div>
              <button onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                style={{ background:"rgba(0,0,0,0.7)", border:"1px solid rgba(200,151,58,0.3)", color:"var(--gold)" }}>
                <X size={18}/>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
}
