import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useApp } from "../context/AppContext";
import { motion } from "framer-motion";
import PageLayout from "../components/Layout/PageLayout";
import AnimatedSection from "../components/UI/AnimatedSection";
import SectionHeader from "../components/UI/SectionHeader";
import { MessageCircle, Phone, MapPin, Send } from "lucide-react";

const WA = "9963765347";

export default function Contact() {
  const { t }    = useTranslation();
  const { lang } = useApp();
  const [form, setForm]   = useState({ name:"", phone:"", msg:"" });
  const [sending, setSending] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 800));
    const text = encodeURIComponent(
      lang === "ar"
        ? `السلام عليكم، انا ${form.name}
رقمي: ${form.phone}
${form.msg}`
        : `Hello, I am ${form.name}
Phone: ${form.phone}
${form.msg}`
    );
    window.open(`https://wa.me/${WA}?text=${text}`, "_blank");
    setSending(false);
  };

  return (
    <PageLayout>
      <div style={{ paddingTop:"100px", background:"var(--dark)", minHeight:"100vh" }}>
        <div className="container py-16">
          <SectionHeader badge={t("contact.badge")} title={t("contact.title")} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <AnimatedSection direction="right">
              <div className="card-dark rounded-3xl p-8">
                <h3 className="font-black text-white text-xl mb-6">
                  {lang==="ar"?"ارسل لنا رسالة":"Send Us a Message"}
                </h3>
                <form onSubmit={handleSend} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase mb-2"
                      style={{ color:"var(--gold)" }}>{t("contact.name")}</label>
                    <input required value={form.name}
                      onChange={e => setForm({...form, name:e.target.value})}
                      className="input-dark" placeholder={t("contact.name")}/>
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase mb-2"
                      style={{ color:"var(--gold)" }}>{t("contact.phone")}</label>
                    <input required value={form.phone}
                      onChange={e => setForm({...form, phone:e.target.value})}
                      className="input-dark" placeholder="+966 5x xxx xxxx" dir="ltr"/>
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase mb-2"
                      style={{ color:"var(--gold)" }}>{t("contact.msg")}</label>
                    <textarea required rows={5} value={form.msg}
                      onChange={e => setForm({...form, msg:e.target.value})}
                      className="input-dark resize-none" placeholder={t("contact.msg")}/>
                  </div>
                  <motion.button type="submit" whileTap={{ scale:0.97 }}
                    disabled={sending}
                    className="w-full py-4 rounded-2xl font-black text-base flex items-center justify-center gap-3 transition-all"
                    style={{
                      background: sending ? "rgba(200,151,58,0.3)" : "linear-gradient(135deg,#075e54,#128c7e,#25D366)",
                      color: "white",
                      boxShadow: sending ? "none" : "0 8px 30px rgba(37,211,102,0.3)",
                    }}>
                    {sending
                      ? <span className="animate-pulse">{lang==="ar"?"جاري الارسال...":"Sending..."}</span>
                      : <><MessageCircle size={20}/>{t("contact.send")}</>
                    }
                  </motion.button>
                </form>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="left" delay={0.2}>
              <div className="space-y-5">
                <div className="card-dark p-6 rounded-2xl">
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    {lang==="ar"
                      ?"نحن هنا لخدمتكم على مدار الساعة. تواصلوا معنا بأي طريقة تناسبكم وسنرد عليكم في اقرب وقت."
                      :"We are here to serve you around the clock. Contact us in any way that suits you and we will respond as soon as possible."}
                  </p>
                  <div className="space-y-4">
                    <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer"
                      className="flex items-center gap-4 p-4 rounded-xl transition-all hover:shadow-gold-sm group"
                      style={{ background:"rgba(37,211,102,0.06)", border:"1px solid rgba(37,211,102,0.15)" }}>
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background:"rgba(37,211,102,0.15)", color:"#25D366" }}>
                        <MessageCircle size={20}/>
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">{t("contact.wa")}</div>
                        <div className="text-gray-400 text-xs" dir="ltr">{WA}</div>
                      </div>
                    </a>

                    <a href={`tel:+${WA}`}
                      className="flex items-center gap-4 p-4 rounded-xl transition-all hover:shadow-gold-sm"
                      style={{ background:"rgba(200,151,58,0.06)", border:"1px solid rgba(200,151,58,0.15)" }}>
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background:"rgba(200,151,58,0.15)", color:"var(--gold)" }}>
                        <Phone size={20}/>
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">{t("contact.call")}</div>
                        <div className="text-gray-400 text-xs" dir="ltr">+{WA}</div>
                      </div>
                    </a>

                    <div className="flex items-center gap-4 p-4 rounded-xl"
                      style={{ background:"rgba(200,151,58,0.06)", border:"1px solid rgba(200,151,58,0.15)" }}>
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background:"rgba(200,151,58,0.15)", color:"var(--gold)" }}>
                        <MapPin size={20}/>
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">{t("contact.address")}</div>
                        <div className="text-gray-400 text-xs">
                          {lang==="ar"?"الرياض | جدة — المملكة العربية السعودية":"Riyadh | Jeddah — Saudi Arabia"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
