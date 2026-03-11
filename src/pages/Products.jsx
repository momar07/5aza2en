import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useApp } from "../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import PageLayout from "../components/Layout/PageLayout";
import AnimatedSection from "../components/UI/AnimatedSection";
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

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {cats.map(c => (
              <button key={c} onClick={() => setFilter(c)}
                className="px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300"
                style={{
                  background: filter===c ? "linear-gradient(135deg,#7a5418,#C8973A,#E8B96A)" : "rgba(200,151,58,0.08)",
                  color:      filter===c ? "var(--dark)" : "var(--gold)",
                  border:     filter===c ? "1px solid transparent" : "1px solid rgba(200,151,58,0.2)",
                  boxShadow:  filter===c ? "0 4px 20px rgba(200,151,58,0.3)" : "none",
                }}>
                {t(`products.${c}`)}
              </button>
            ))}
          </div>

          <motion.div layout className="masonry-grid">
            <AnimatePresence>
              {filtered.map((p, i) => (
                <motion.div key={p.id} layout
                  initial={{ opacity:0, scale:0.9 }}
                  animate={{ opacity:1, scale:1  }}
                  exit={{    opacity:0, scale:0.9 }}
                  transition={{ duration:0.4, delay:i*0.04 }}
                  className="masonry-item"
                >
                  <div className="relative rounded-2xl overflow-hidden group cursor-pointer hover-lift"
                    style={{ border:"1px solid rgba(200,151,58,0.1)" }}
                    onClick={() => setSelected(p)}>
                    <img src={p.img} alt={lang==="ar"?p.titleAr:p.titleEn}
                      className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      style={{ height:i%3===0?"300px":i%3===1?"230px":"260px" }}/>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                      style={{ background:"rgba(0,0,0,0.6)" }}>
                      <div className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ background:"rgba(200,151,58,0.9)" }}>
                        <ZoomIn size={20} className="text-black"/>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0
                                    transition-transform duration-300 opacity-0 group-hover:opacity-100"
                      style={{ background:"linear-gradient(to top,rgba(0,0,0,0.95),transparent)" }}>
                      <h3 className="font-black text-white text-sm mb-1">{lang==="ar"?p.titleAr:p.titleEn}</h3>
                      <span className="tag-gold text-xs">{t(`products.${p.category}`)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background:"rgba(0,0,0,0.92)", backdropFilter:"blur(10px)" }}
            onClick={() => setSelected(null)}>
            <motion.div initial={{ scale:0.8, opacity:0 }} animate={{ scale:1, opacity:1 }}
              exit={{ scale:0.8, opacity:0 }} transition={{ type:"spring", bounce:0.25 }}
              className="relative max-w-2xl w-full rounded-3xl overflow-hidden"
              style={{ border:"1px solid rgba(200,151,58,0.3)", background:"var(--dark-200)" }}
              onClick={e => e.stopPropagation()}>
              <img src={selected.img} alt="" className="w-full h-80 object-cover"/>
              <div className="p-6">
                <h2 className="text-2xl font-black text-white mb-2">{lang==="ar"?selected.titleAr:selected.titleEn}</h2>
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
