import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import { Phone, MessageCircle, MapPin, Instagram, Twitter, Facebook } from "lucide-react";

const WA = "9963765347";

export default function Footer() {
  const { t }    = useTranslation();
  const { lang } = useApp();
  const year     = new Date().getFullYear();

  const links = [
    { to:"/",         label: t("nav.home")     },
    { to:"/products", label: t("nav.products") },
    { to:"/about",    label: t("nav.about")    },
    { to:"/services", label: t("nav.services") },
    { to:"/contact",  label: t("nav.contact")  },
  ];

  return (
    <footer style={{ background: "var(--dark-100)", borderTop: "1px solid rgba(200,151,58,0.1)" }}>
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center shadow-gold-md">
                <span className="text-black font-black text-xl" style={{ fontFamily:"Cairo,sans-serif" }}>خ</span>
              </div>
              <div>
                <div className="font-black text-xl gold-text">
                  {lang === "ar" ? "خبراء الخزائن" : "Khobara Khazaen"}
                </div>
                <div className="text-xs text-gray-500 tracking-widest uppercase">Luxury Since 2010</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">{t("footer.desc")}</p>
            <div className="flex gap-3">
              {[
                { icon: <Instagram size={16}/>, href:"#" },
                { icon: <Twitter   size={16}/>, href:"#" },
                { icon: <Facebook  size={16}/>, href:"#" },
              ].map((s, i) => (
                <a key={i} href={s.href}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-gold-sm"
                  style={{ background:"rgba(200,151,58,0.08)", border:"1px solid rgba(200,151,58,0.2)", color:"var(--gold)" }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-5 text-sm tracking-widest uppercase" style={{ color:"var(--gold)" }}>
              {t("footer.links")}
            </h4>
            <ul className="space-y-3">
              {links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}
                    className="text-sm text-gray-400 hover:text-yellow-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full transition-colors group-hover:bg-yellow-400"
                      style={{ background:"var(--gold)", opacity:0.5 }}/>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-5 text-sm tracking-widest uppercase" style={{ color:"var(--gold)" }}>
              {t("footer.contact")}
            </h4>
            <div className="space-y-4">
              <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer"
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-green-400 transition-colors group">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                  style={{ background:"rgba(37,211,102,0.1)", color:"#25D366" }}>
                  <MessageCircle size={15}/>
                </div>
                {WA}
              </a>
              <a href={`tel:+${WA}`}
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-yellow-400 transition-colors">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background:"rgba(200,151,58,0.1)", color:"var(--gold)" }}>
                  <Phone size={15}/>
                </div>
                +{WA}
              </a>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background:"rgba(200,151,58,0.1)", color:"var(--gold)" }}>
                  <MapPin size={15}/>
                </div>
                {lang === "ar" ? "الرياض | جدة — المملكة العربية السعودية" : "Riyadh | Jeddah — Saudi Arabia"}
              </div>
            </div>
          </div>
        </div>

        <div className="divider-gold mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <span>
            {year} &copy; {lang === "ar" ? "خبراء الخزائن" : "Khobara Khazaen"} — {t("footer.rights")}
          </span>
          <span style={{ color:"var(--gold)", opacity:0.6 }}>
            {t("footer.madeby")} ✦
          </span>
        </div>
      </div>
    </footer>
  );
}
