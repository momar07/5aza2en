import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useApp } from "../context/AppContext";
import { motion } from "framer-motion";
import { Eye, EyeOff, LogIn } from "lucide-react";

export default function Login() {
  const { t }        = useTranslation();
  const { login }    = useApp();
  const navigate     = useNavigate();
  const [form, setForm]   = useState({ user:"", pass:"" });
  const [showPw, setShowPw] = useState(false);
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    if (login(form.user, form.pass)) {
      navigate("/dashboard");
    } else {
      setError(t("login.error"));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background:"var(--dark)" }}>
      <div className="hidden lg:flex w-1/2 relative overflow-hidden items-center justify-center"
        style={{ background:"var(--dark-100)", borderRight:"1px solid rgba(200,151,58,0.1)" }}>
        <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900"
          alt="" className="absolute inset-0 w-full h-full object-cover opacity-20"/>
        <div className="absolute inset-0"
          style={{ background:"linear-gradient(135deg,rgba(10,10,10,0.9),rgba(10,10,10,0.6))" }}/>
        <div className="relative text-center px-12 z-10">
          <motion.div initial={{ scale:0.5, opacity:0 }} animate={{ scale:1, opacity:1 }}
            transition={{ duration:0.8, ease:"easeOut" }}
            className="w-28 h-28 rounded-full gold-gradient flex items-center justify-center mx-auto mb-6 shadow-gold-xl">
            <span className="text-black font-black text-5xl" style={{ fontFamily:"Cairo,sans-serif" }}>خ</span>
          </motion.div>
          <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:0.3 }}
            className="text-4xl font-black mb-2 gold-text" style={{ fontFamily:"Cairo,sans-serif" }}>
            خبراء الخزائن
          </motion.h1>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:0.5 }}
            transition={{ delay:0.5 }}
            className="text-gray-400 tracking-widest text-sm uppercase"
            style={{ fontFamily:"Cormorant Garamond,serif" }}>
            Luxury Cabinet Experts
          </motion.p>
          <motion.div initial={{ scaleX:0 }} animate={{ scaleX:1 }}
            transition={{ delay:0.7, duration:0.8 }}
            className="mt-8 h-px w-32 mx-auto"
            style={{ background:"linear-gradient(90deg,transparent,var(--gold),transparent)" }}/>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }}
            transition={{ delay:1 }}
            className="mt-6 text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
            لوحة التحكم الخاصة بادارة المحتوى والمنتجات
          </motion.p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.6 }} className="w-full max-w-md">
          <div className="lg:hidden text-center mb-10">
            <div className="w-16 h-16 rounded-full gold-gradient flex items-center justify-center mx-auto mb-4 shadow-gold-md">
              <span className="text-black font-black text-2xl">خ</span>
            </div>
            <h1 className="text-2xl font-black gold-text">خبراء الخزائن</h1>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-black text-white mb-2">{t("login.title")}</h2>
            <p className="text-gray-400">{t("login.subtitle")}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold tracking-widest uppercase mb-2"
                style={{ color:"var(--gold)" }}>{t("login.user")}</label>
              <input required value={form.user}
                onChange={e => setForm({...form, user:e.target.value})}
                className="input-dark" placeholder="admin" dir="ltr"/>
            </div>
            <div>
              <label className="block text-xs font-bold tracking-widest uppercase mb-2"
                style={{ color:"var(--gold)" }}>{t("login.pass")}</label>
              <div className="relative">
                <input required type={showPw?"text":"password"} value={form.pass}
                  onChange={e => setForm({...form, pass:e.target.value})}
                  className="input-dark" placeholder="••••••••" dir="ltr"/>
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-500 hover:text-gray-300 transition-colors">
                  {showPw ? <EyeOff size={18}/> : <Eye size={18}/>}
                </button>
              </div>
            </div>

            {error && (
              <motion.p initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }}
                className="text-red-400 text-sm text-center py-2 px-4 rounded-xl"
                style={{ background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)" }}>
                {error}
              </motion.p>
            )}

            <motion.button type="submit" whileTap={{ scale:0.97 }} disabled={loading}
              className="w-full py-4 rounded-2xl font-black text-base flex items-center justify-center gap-3 transition-all"
              style={{
                background: loading ? "rgba(200,151,58,0.3)" : "linear-gradient(135deg,#7a5418,#C8973A,#E8B96A)",
                color: "var(--dark)",
                boxShadow: loading ? "none" : "0 8px 30px rgba(200,151,58,0.3)",
              }}>
              {loading
                ? <span className="animate-pulse">{" جاري الدخول..."}</span>
                : <><LogIn size={20}/>{t("login.btn")}</>
              }
            </motion.button>
          </form>

          <div className="mt-6 p-4 rounded-2xl text-center text-sm"
            style={{ background:"rgba(200,151,58,0.05)", border:"1px dashed rgba(200,151,58,0.2)" }}>
            <span className="text-gray-500">Demo: </span>
            <span style={{ color:"var(--gold)" }}>admin</span>
            <span className="text-gray-600 mx-2">/</span>
            <span style={{ color:"var(--gold)" }}>khobara2024</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
