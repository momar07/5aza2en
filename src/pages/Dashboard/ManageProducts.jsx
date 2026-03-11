import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { Plus, Edit, Trash2, X, Search } from "lucide-react";

const EMPTY = { titleAr:"", titleEn:"", category:"bedroom", img:"" };
const CATS  = ["bedroom","living","kids","custom"];

export default function ManageProducts() {
  const { t }                   = useTranslation();
  const { lang, products, addProduct, updateProduct, deleteProduct } = useApp();
  const [search, setSearch]     = useState("");
  const [modal, setModal]       = useState(false);
  const [form, setForm]         = useState(EMPTY);
  const [editing, setEditing]   = useState(null);
  const [confirmId, setConfirmId] = useState(null);

  const filtered = products.filter(p =>
    (lang==="ar"?p.titleAr:p.titleEn).toLowerCase().includes(search.toLowerCase())
  );

  const openAdd  = () => { setForm(EMPTY); setEditing(null); setModal(true); };
  const openEdit = (p) => { setForm({ titleAr:p.titleAr, titleEn:p.titleEn, category:p.category, img:p.img }); setEditing(p.id); setModal(true); };

  const handleSave = (e) => {
    e.preventDefault();
    if (editing) { updateProduct({ ...form, id:editing }); toast.success(lang==="ar"?"تم التعديل":"Updated"); }
    else         { addProduct(form);                        toast.success(lang==="ar"?"تمت الاضافة":"Added");   }
    setModal(false);
  };

  const handleDelete = (id) => {
    deleteProduct(id);
    setConfirmId(null);
    toast.success(lang==="ar"?"تم الحذف":"Deleted");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="text-2xl font-black text-white">{t("dashboard.products")}</h1>
        <button onClick={openAdd} className="btn-gold text-sm px-5 py-2.5">
          <Plus size={16}/>
          {t("dashboard.addProduct")}
        </button>
      </div>

      <div className="p-4 rounded-2xl mb-5" style={{ background:"var(--dark-100)", border:"1px solid rgba(200,151,58,0.08)" }}>
        <div className="relative">
          <Search size={16} className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-500"/>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder={t("dashboard.search")}
            className="input-dark pr-11 text-sm"/>
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background:"var(--dark-100)", border:"1px solid rgba(200,151,58,0.08)" }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background:"rgba(200,151,58,0.05)", borderBottom:"1px solid rgba(200,151,58,0.08)" }}>
              <th className="px-4 py-3 text-right text-xs font-bold tracking-widest uppercase" style={{ color:"var(--gold)" }}>
                {lang==="ar"?"الصورة":"Image"}
              </th>
              <th className="px-4 py-3 text-right text-xs font-bold tracking-widest uppercase" style={{ color:"var(--gold)" }}>
                {t("dashboard.nameAr")}
              </th>
              <th className="px-4 py-3 text-right text-xs font-bold tracking-widest uppercase hidden md:table-cell" style={{ color:"var(--gold)" }}>
                {t("dashboard.category")}
              </th>
              <th className="px-4 py-3 text-right text-xs font-bold tracking-widest uppercase" style={{ color:"var(--gold)" }}>
                {lang==="ar"?"اجراءات":"Actions"}
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <motion.tr key={p.id} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:i*0.03 }}
                className="border-t transition-colors hover:bg-white/3"
                style={{ borderColor:"rgba(200,151,58,0.06)" }}>
                <td className="px-4 py-3">
                  <img src={p.img} alt="" className="w-12 h-12 rounded-xl object-cover"
                    style={{ border:"1px solid rgba(200,151,58,0.15)" }}/>
                </td>
                <td className="px-4 py-3">
                  <div className="font-semibold text-white text-sm">{lang==="ar"?p.titleAr:p.titleEn}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{lang==="ar"?p.titleEn:p.titleAr}</div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="tag-gold text-xs">{t(`products.${p.category}`)}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(p)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors text-blue-400 hover:bg-blue-400/10">
                      <Edit size={15}/>
                    </button>
                    <button onClick={() => setConfirmId(p.id)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors text-red-400 hover:bg-red-400/10">
                      <Trash2 size={15}/>
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-500">{t("dashboard.noItems")}</div>
        )}
      </div>

      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background:"rgba(0,0,0,0.8)", backdropFilter:"blur(8px)" }}>
            <motion.div initial={{ scale:0.9, opacity:0 }} animate={{ scale:1, opacity:1 }}
              exit={{ scale:0.9, opacity:0 }}
              className="w-full max-w-md rounded-3xl p-6"
              style={{ background:"var(--dark-200)", border:"1px solid rgba(200,151,58,0.2)" }}
              onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-black text-white text-lg">
                  {editing ? t("dashboard.edit") : t("dashboard.addProduct")}
                </h3>
                <button onClick={() => setModal(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                  style={{ background:"rgba(255,255,255,0.05)" }}>
                  <X size={16}/>
                </button>
              </div>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color:"var(--gold)" }}>
                    {t("dashboard.nameAr")}
                  </label>
                  <input required value={form.titleAr} onChange={e => setForm({...form, titleAr:e.target.value})}
                    className="input-dark text-sm" placeholder="الاسم بالعربي"/>
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color:"var(--gold)" }}>
                    {t("dashboard.nameEn")}
                  </label>
                  <input required value={form.titleEn} onChange={e => setForm({...form, titleEn:e.target.value})}
                    className="input-dark text-sm" placeholder="Name in English" dir="ltr"/>
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color:"var(--gold)" }}>
                    {t("dashboard.category")}
                  </label>
                  <select value={form.category} onChange={e => setForm({...form, category:e.target.value})}
                    className="input-dark text-sm">
                    {CATS.map(c => <option key={c} value={c}>{t(`products.${c}`)}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color:"var(--gold)" }}>
                    {t("dashboard.imageUrl")}
                  </label>
                  <input required value={form.img} onChange={e => setForm({...form, img:e.target.value})}
                    className="input-dark text-sm" placeholder="https://..." dir="ltr"/>
                  {form.img && (
                    <img src={form.img} alt="" className="mt-3 w-full h-32 object-cover rounded-xl"
                      style={{ border:"1px solid rgba(200,151,58,0.2)" }}/>
                  )}
                </div>
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
            style={{ background:"rgba(0,0,0,0.8)", backdropFilter:"blur(8px)" }}>
            <motion.div initial={{ scale:0.9 }} animate={{ scale:1 }} exit={{ scale:0.9 }}
              className="w-full max-w-sm rounded-3xl p-6 text-center"
              style={{ background:"var(--dark-200)", border:"1px solid rgba(239,68,68,0.3)" }}>
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background:"rgba(239,68,68,0.1)", color:"#ef4444" }}>
                <Trash2 size={24}/>
              </div>
              <h3 className="font-black text-white text-lg mb-2">{t("dashboard.confirm")}</h3>
              <p className="text-gray-400 text-sm mb-6">
                {lang==="ar"?"لا يمكن التراجع عن هذا الاجراء":"This action cannot be undone"}
              </p>
              <div className="flex gap-3">
                <button onClick={() => handleDelete(confirmId)}
                  className="flex-1 py-3 rounded-xl font-black text-white text-sm transition-colors"
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
