import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, LayoutDashboard, ChevronDown } from "lucide-react";

export default function Navbar() {
  const { t }                    = useTranslation();
  const { lang, toggleLang, isAdmin } = useApp();
  const [open, setOpen]          = useState(false);
  const [scrolled, setScrolled]  = useState(false);
  const location                 = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => setOpen(false), [location]);

  const links = [
    { to: "/",         label: t("nav.home")     },
    { to: "/products", label: t("nav.products") },
    { to: "/about",    label: t("nav.about")    },
    { to: "/services", label: t("nav.services") },
    { to: "/contact",  label: t("nav.contact")  },
  ];

  const isActive = (p) => location.pathname === p;

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0,    opacity: 1  }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(10,10,10,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(200,151,58,0.1)" : "none",
          padding: scrolled ? "0.75rem 0" : "1.5rem 0",
        }}
      >
        <div className="container flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center
                            shadow-gold-sm group-hover:shadow-gold-md transition-shadow duration-300">
              <span className="text-black font-black text-lg" style={{ fontFamily: "Cairo,sans-serif" }}>خ</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-black text-lg leading-none gold-text">
                {lang === "ar" ? "خبراء الخزائن" : "Khobara Khazaen"}
              </div>
              <div className="text-xs tracking-widest uppercase opacity-50 text-gray-400">
                {lang === "ar" ? "Luxury Cabinets" : "منذ 2010"}
              </div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link key={l.to} to={l.to}
                className="relative px-4 py-2 text-sm font-semibold transition-colors duration-300 rounded-lg group"
                style={{ color: isActive(l.to) ? "var(--gold)" : "rgba(232,232,232,0.75)" }}
              >
                <span className="relative z-10 group-hover:text-gold-400 transition-colors"
                  style={{ color: isActive(l.to) ? "var(--gold)" : undefined }}>
                  {l.label}
                </span>
                {isActive(l.to) && (
                  <motion.div layoutId="nav-indicator"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: "rgba(200,151,58,0.1)", border: "1px solid rgba(200,151,58,0.2)" }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
            {isAdmin && (
              <Link to="/dashboard"
                className="px-4 py-2 text-sm font-semibold flex items-center gap-1.5 rounded-lg transition-colors"
                style={{ color: "var(--gold)", background: "rgba(200,151,58,0.08)", border: "1px solid rgba(200,151,58,0.2)" }}>
                <LayoutDashboard size={15} />
                {t("nav.dashboard")}
              </Link>
            )}
            <button onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-bold transition-all duration-300 ms-2"
              style={{ color: "var(--gold)", background: "rgba(200,151,58,0.08)", border: "1px solid rgba(200,151,58,0.2)" }}>
              <Globe size={14} />
              {lang === "ar" ? "EN" : "عر"}
            </button>
          </div>

          <button className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: "var(--gold)", background: "rgba(200,151,58,0.08)" }}
            onClick={() => setOpen(true)}>
            <Menu size={22} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: lang === "ar" ? "-100%" : "100%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              exit={{   x: lang === "ar" ? "-100%" : "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 bottom-0 z-50 w-72 flex flex-col"
              style={{
                [lang === "ar" ? "right" : "left"]: 0,
                background: "var(--dark-100)",
                borderLeft: lang === "ar" ? "1px solid rgba(200,151,58,0.15)" : "none",
                borderRight: lang !== "ar" ? "1px solid rgba(200,151,58,0.15)" : "none",
              }}
            >
              <div className="flex items-center justify-between p-5 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center">
                    <span className="text-black font-black text-sm">خ</span>
                  </div>
                  <span className="font-bold gold-text text-sm">
                    {lang === "ar" ? "خبراء الخزائن" : "Khobara Khazaen"}
                  </span>
                </div>
                <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg text-gray-400 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                {links.map((l, i) => (
                  <motion.div key={l.to}
                    initial={{ opacity:0, x: lang === "ar" ? -20 : 20 }}
                    animate={{ opacity:1, x:0 }}
                    transition={{ delay: i * 0.06 + 0.1 }}
                  >
                    <Link to={l.to}
                      className="flex items-center px-4 py-3 rounded-xl font-semibold text-sm transition-all"
                      style={{
                        color:      isActive(l.to) ? "var(--gold)" : "rgba(232,232,232,0.7)",
                        background: isActive(l.to) ? "rgba(200,151,58,0.1)" : "transparent",
                        border:     isActive(l.to) ? "1px solid rgba(200,151,58,0.2)" : "1px solid transparent",
                      }}
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
                {isAdmin && (
                  <Link to="/dashboard"
                    className="flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm"
                    style={{ color: "var(--gold)", background: "rgba(200,151,58,0.08)", border: "1px solid rgba(200,151,58,0.15)" }}>
                    <LayoutDashboard size={16} />
                    {t("nav.dashboard")}
                  </Link>
                )}
              </nav>

              <div className="p-4 border-t border-white/5">
                <button onClick={toggleLang}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all"
                  style={{ color: "var(--gold)", background: "rgba(200,151,58,0.08)", border: "1px solid rgba(200,151,58,0.2)" }}>
                  <Globe size={16} />
                  {lang === "ar" ? "Switch to English" : "التبديل للعربية"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
