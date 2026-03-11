import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Package, Megaphone, Settings, LogOut, Menu, X, ChevronRight } from "lucide-react";

export default function DashboardLayout() {
  const { t }             = useTranslation();
  const { lang, logout }  = useApp();
  const navigate          = useNavigate();
  const [sideOpen, setSideOpen] = useState(false);

  const handleLogout = () => { logout(); navigate("/login"); };

  const navItems = [
    { to:"/dashboard",          label:t("dashboard.overview"),  icon:<LayoutDashboard size={19}/>, end:true },
    { to:"/dashboard/products", label:t("dashboard.products"),  icon:<Package size={19}/>               },
    { to:"/dashboard/ads",      label:t("dashboard.ads"),       icon:<Megaphone size={19}/>              },
    { to:"/dashboard/settings", label:t("dashboard.settings"),  icon:<Settings size={19}/>               },
  ];

  const Sidebar = ({ mobile=false }) => (
    <div className="flex flex-col h-full" style={{ background:"var(--dark-100)", borderRight:"1px solid rgba(200,151,58,0.08)" }}>
      <div className="p-5 flex items-center justify-between border-b" style={{ borderColor:"rgba(200,151,58,0.08)" }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full gold-gradient flex items-center justify-center shadow-gold-sm">
            <span className="text-black font-black text-base">خ</span>
          </div>
          <div>
            <div className="font-black text-sm gold-text">خبراء الخزائن</div>
            <div className="text-gray-500 text-xs">Admin Panel</div>
          </div>
        </div>
        {mobile && (
          <button onClick={() => setSideOpen(false)} className="text-gray-400 hover:text-white transition-colors p-1">
            <X size={18}/>
          </button>
        )}
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map(item => (
          <NavLink key={item.to} to={item.to} end={item.end}
            onClick={() => mobile && setSideOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 group ${
                isActive
                  ? "text-black shadow-gold-sm"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`
            }
            style={({ isActive }) => isActive
              ? { background:"linear-gradient(135deg,#7a5418,#C8973A,#E8B96A)" }
              : {}
            }
          >
            {item.icon}
            <span className="flex-1">{item.label}</span>
            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ transform: lang==="ar" ? "rotate(180deg)" : "none" }}/>
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t" style={{ borderColor:"rgba(200,151,58,0.08)" }}>
        <button onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300
                     hover:bg-red-900/10 transition-all w-full text-sm font-semibold">
          <LogOut size={19}/>
          {t("dashboard.logout")}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden" style={{ background:"var(--dark-200)" }}>
      <div className="hidden md:block w-60 flex-shrink-0 h-full">
        <Sidebar />
      </div>

      <AnimatePresence>
        {sideOpen && (
          <>
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setSideOpen(false)}/>
            <motion.div
              initial={{ x: lang==="ar" ? "-100%" : "100%" }}
              animate={{ x:"0%" }}
              exit={{   x: lang==="ar" ? "-100%" : "100%" }}
              transition={{ type:"spring", damping:30, stiffness:300 }}
              className="fixed top-0 bottom-0 w-60 z-50 md:hidden"
              style={{ [lang==="ar"?"right":"left"]:0 }}>
              <Sidebar mobile/>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="px-6 py-4 flex items-center justify-between flex-shrink-0"
          style={{ background:"var(--dark-100)", borderBottom:"1px solid rgba(200,151,58,0.08)" }}>
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 rounded-xl text-gray-400 hover:text-white transition-colors"
              style={{ background:"rgba(200,151,58,0.06)", border:"1px solid rgba(200,151,58,0.1)" }}
              onClick={() => setSideOpen(true)}>
              <Menu size={20}/>
            </button>
            <div>
              <div className="font-black text-white text-sm">
                {t("dashboard.welcome")} — <span style={{ color:"var(--gold)" }}>{lang==="ar"?"المدير":"Admin"}</span>
              </div>
              <div className="text-xs text-gray-500">
                {new Date().toLocaleDateString(lang==="ar"?"ar-SA":"en-US",
                  { weekday:"long", year:"numeric", month:"long", day:"numeric" })}
              </div>
            </div>
          </div>
          <div className="w-9 h-9 rounded-full gold-gradient flex items-center justify-center shadow-gold-sm">
            <span className="text-black font-black text-base">A</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
