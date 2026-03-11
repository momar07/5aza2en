import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import toast from "react-hot-toast";
import { Save, Eye, EyeOff, Globe, Phone, Type } from "lucide-react";

export default function Settings() {
  const { t }               = useTranslation();
  const { lang, toggleLang } = useApp();
  const [showPw, setShowPw] = useState(false);
  const [form, setForm]     = useState({
    siteName: "خبراء الخزائن",
    whatsapp: "9963765347",
    newPass:  "",
  });

  const handleSave = (e) => {
    e.preventDefault();
    toast.success(t("dashboard.saved"));
  };

  return (
    <div>
      <h1 className="text-2xl font-black text-white mb-6">{t("dashboard.settings")}</h1>
      <div className="max-w-lg">
        <form onSubmit={handleSave}
          className="rounded-2xl p-6 space-y-6"
          style={{ background:"var(--dark-100)", border:"1px solid rgba(200,151,58,0.08)" }}>

          <div>
            <label className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase mb-3"
              style={{ color:"var(--gold)" }}>
              <Type size={14}/>
              {t("dashboard.siteName")}
            </label>
            <input value={form.siteName} onChange={e => setForm({...form, siteName:e.target.value})}
              className="input-dark text-sm"/>
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase mb-3"
              style={{ color:"var(--gold)" }}>
              <Phone size={14}/>
              {t("dashboard.whatsapp")}
            </label>
            <input value={form.whatsapp} onChange={e => setForm({...form, whatsapp:e.target.value})}
              className="input-dark text-sm" placeholder="9963765347" dir="ltr"/>
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase mb-3"
              style={{ color:"var(--gold)" }}>
              <Globe size={14}/>
              {t("dashboard.language")}
            </label>
            <div className="grid grid-cols-2 gap-3">
              {["ar","en"].map(l => (
                <button key={l} type="button"
                  onClick={() => lang !== l && toggleLang()}
                  className="py-3 rounded-xl font-bold text-sm transition-all"
                  style={{
                    background: lang===l ? "linear-gradient(135deg,#7a5418,#C8973A,#E8B96A)" : "rgba(255,255,255,0.04)",
                    color:      lang===l ? "var(--dark)" : "var(--gold)",
                    border:     lang===l ? "1px solid transparent" : "1px solid rgba(200,151,58,0.2)",
                    boxShadow:  lang===l ? "0 4px 20px rgba(200,151,58,0.3)" : "none",
                  }}>
                  {l==="ar" ? "العربية" : "English"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase mb-3"
              style={{ color:"var(--gold)" }}>
              <Eye size={14}/>
              {t("dashboard.newPass")}
            </label>
            <div className="relative">
              <input type={showPw?"text":"password"} value={form.newPass}
                onChange={e => setForm({...form, newPass:e.target.value})}
                className="input-dark text-sm" placeholder="••••••••" dir="ltr"/>
              <button type="button" onClick={() => setShowPw(!showPw)}
                className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-500 hover:text-gray-300 transition-colors">
                {showPw ? <EyeOff size={16}/> : <Eye size={16}/>}
              </button>
            </div>
          </div>

          <div className="h-px" style={{ background:"linear-gradient(90deg,transparent,rgba(200,151,58,0.3),transparent)" }}/>

          <button type="submit" className="btn-gold w-full py-3.5 text-sm justify-center">
            <Save size={16}/>
            {t("dashboard.save")}
          </button>
        </form>
      </div>
    </div>
  );
}
