import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { Plus, Edit, Trash2, X, ToggleLeft, ToggleRight } from "lucide-react";

const EMPTY = { titleAr:"", titleEn:"", descAr:"", descEn:"", img:"", active:true };

export default function ManageAds() {
  const { t }               = useTranslation();
  const { lang, ads, addAd, updateAd, deleteAd } = useApp();
  const [modal, setModal]   = useState(false);
  const [form, setForm]     = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [confirmId, setConfirmId] = useState(null);

  const openAdd  = () => { setForm(EMPTY); setEditing(null); setModal(true); };
  const openEdit = (a) => {
    setForm({ titleAr:a.titleAr, titleEn:a.titleEn, descAr:a.descAr, descEn:a.descEn, img:a.img, active:a.active });
    setEditing(a.id); setModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editing) { updateAd({ ...form, id:editing }); toast.success(lang==="ar"?"تم التعديل":"Updated"); }
    else         { addAd(form);                        toast.success(lang==="ar"?"تمت الاضافة":"Added");  }
    setModal(false);
  };

  const handleDelete  = (id) => { deleteAd(id); setConfirmId(null); toast.success(lang==="ar"?"تم الحذف":"Deleted"); };
  const toggleActive  = (ad)  => { updateAd({ ...ad, active:!ad.active }); toast.success(lang==="ar"?"تم التحديث":"Updated"); };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="text-2xl font-black text-white">{t("dashboard.ads")}</h1>
        <button onClick={openAdd} className="btn-gold text-sm px-5 py-2.5">
          <Plus size={16}/>
          {t("dashboard.addAd")}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {ads.map((ad, i) => (
          <motion.div key={ad.id} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:i*0.08 }}
            className="rounded-2xl overflow-hidden hover-lift"
            style={{ background:"var(--dark-100)", border:"1px solid rgba(200,151,58,0.1)" }}>
            <div className="relative h-44 overflow-hidden">
              <img src={ad.img} alt="" className="w-full h-full object-cover"/>
              <div className="absolute inset-0" style={{ background:"linear-gradient(to top,rgba(0,0,0,0.85),transparent)" }}/>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h3 className="font-black text-sm">{lang==="ar"?ad.titleAr:ad.titleEn}</h3>
                <p className="text-xs text-gray-300 mt-0.5 truncate">{lang==="ar"?ad.descAr:ad.descEn}</p>
              </div>
              <div className="absolute top-3 right-3">
                <span className="text-xs px-2 py-1 rounded-full font-semibold"
                  style={{
                    background: ad.active ? "rgba(16,185,129,0.2)" : "rgba(255,255,255,0.1)",
                    color:      ad.active ? "#10b981" : "#888",
                    border:     ad.active ? "1px solid rgba(16,185,129,0.3)" : "1px solid rgba(255,255,255,0.1)",
                  }}>
                  {ad.active ? t("dashboard.active") : t("dashboard.inactive")}
                </span>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <button onClick={() => toggleActive(ad)}
                className="flex items-center gap-1.5 text-sm font-semibold transition-colors"
                style={{ color: ad.active ? "#10b981" : "#888" }}>
                {ad.active ? <ToggleRight size={20}/> : <ToggleLeft size={20}/>}
                {ad.active ? t("dashboard.active") : t("dashboard.inactive")}
              </button>
              <div className="flex gap-2">
                <button onClick={() => openEdit(ad)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-blue-400 hover:bg-blue-400/10 transition-colors">
                  <Edit size={15}/>
                </button>
                <button onClick={() => setConfirmId(ad.id)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-400/10 transition-colors">
                  <Trash2 size={15}/>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background:"rgba(0,0,0,0.85)", backdropFilter:"blur(8px)" }}>
            <motion.div initial={{ scale:0.9 }} animate={{ scale:1 }} exit={{ scale:0.9 }}
              className="w-full max-w-md rounded-3xl p-6 max-h-[90vh] overflow-y-auto"
              style={{ background:"var(--dark-200)", border:"1px solid rgba(200,151,58,0.2)" }}
              onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-black text-white text-lg">
                  {editing ? t("dashboard.edit") : t("dashboard.addAd")}
                </h3>
                <button onClick={() => setModal(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white"
                  style={{ background:"rgba(255,255,255,0.05)" }}>
                  <X size={16}/>
                </button>
              </div>
              <form onSubmit={handleSave} className="space-y-4">
                {[
                  { key:"titleAr", label:t("dashboard.adTitleAr"), ph:"عنوان الاعلان", dir:"rtl" },
                  { key:"titleEn", label:t("dashboard.adTitleEn"), ph:"Ad Title",       dir:"ltr" },
                  { key:"descAr",  label:t("dashboard.adDescAr"),  ph:"وصف الاعلان",   dir:"rtl", ta:true },
                  { key:"descEn",  label:t("dashboard.adDescEn"),  ph:"Ad Description",dir:"ltr", ta:true },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color:"var(--gold)" }}>
                      {f.label}
                    </label>
                    {f.ta
                      ? <textarea rows={2} value={form[f.key]} onChange={e => setForm({...form,[f.key]:e.target.value})}
                          className="input-dark text-sm resize-none" placeholder={f.ph} dir={f.dir}/>
                      : <input value={form[f.key]} onChange={e => setForm({...form,[f.key]:e.target.value})}
                          className="input-dark text-sm" placeholder={f.ph} dir={f.dir}/>
                    }
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color:"var(--gold)" }}>
                    {t("dashboard.imageUrl")}
                  </label>
                  <input required value={form.img} onChange={e => setForm({...form, img:e.target.value})}
                    className="input-dark text-sm" placeholder="https://..." dir="ltr"/>
                  {form.img && (
                    <img src={form.img} alt="" className="mt-3 w-full h-28 object-cover rounded-xl"
                      style={{ border:"1px solid rgba(200,151,58,0.2)" }}/>
                  )}
                </div>
                <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl"
                  style={{ background:"rgba(200,151,58,0.05)", border:"1px solid rgba(200,151,58,0.1)" }}>
                  <input type="checkbox" checked={form.active} onChange={e => setForm({...form, active:e.target.checked})}
                    className="w-4 h-4 accent-yellow-500"/>
                  <span className="text-sm font-semibold" style={{ color:"var(--gold)" }}>{t("dashboard.active")}</span>
                </label>
                <div className="flex gap-3 pt-2">
                  <button type="submit" className="btn-gold flex-1 py-3 text-sm justify-center">
                    {t("dashboard.save")}
                  </button>
                  <button type="button" onClick={() => setModal(false)}
                    className="flex-1 py-3 rounded-xl font-bold text-sm text-gray-400 hover:text-white transition-colors"
                    style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)" }}>
                    {t("dashboard.cancel")}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confirmId && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background:"rgba(0,0,0,0.85)", backdropFilter:"blur(8px)" }}>
            <motion.div initial={{ scale:0.9 }} animate={{ scale:1 }} exit={{ scale:0.9 }}
              className="w-full max-w-sm rounded-3xl p-6 text-center"
              style={{ background:"var(--dark-200)", border:"1px solid rgba(239,68,68,0.3)" }}>
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background:"rgba(239,68,68,0.1)", color:"#ef4444" }}>
                <Trash2 size={24}/>
              </div>
              <h3 className="font-black text-white text-lg mb-2">{t("dashboard.confirm")}</h3>
              <div className="flex gap-3 mt-5">
                <button onClick={() => handleDelete(confirmId)}
                  className="flex-1 py-3 rounded-xl font-black text-white text-sm"
                  style={{ background:"#ef4444" }}>
                  {t("dashboard.delete")}
                </button>
                <button onClick={() => setConfirmId(null)}
                  className="flex-1 py-3 rounded-xl font-bold text-gray-400 text-sm hover:text-white transition-colors"
                  style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)" }}>
                  {t("dashboard.cancel")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
