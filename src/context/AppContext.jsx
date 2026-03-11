import React, { createContext, useContext, useState, useEffect } from "react";
import i18n from "../i18n/index";

const AppContext = createContext();
export const useApp = () => useContext(AppContext);

const DEF_PRODUCTS = [
  { id:1,  titleAr:"خزانة الاميرة الذهبية",    titleEn:"Golden Princess Wardrobe",   category:"bedroom",
    img:"https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80" },
  { id:2,  titleAr:"دولاب الصالون الامبراطوري", titleEn:"Imperial Salon Cabinet",     category:"living",
    img:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80" },
  { id:3,  titleAr:"خزانة احلام الاطفال",       titleEn:"Kids Dream Wardrobe",        category:"kids",
    img:"https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800&q=80" },
  { id:4,  titleAr:"دولاب المشياء الملكي",      titleEn:"Royal Walk-in Wardrobe",     category:"custom",
    img:"https://images.unsplash.com/photo-1615873968403-89e068629265?w=800&q=80" },
  { id:5,  titleAr:"خزانة الكريستال الفاخرة",  titleEn:"Luxury Crystal Wardrobe",    category:"bedroom",
    img:"https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80" },
  { id:6,  titleAr:"خزانة الديوان الكلاسيكي",  titleEn:"Classic Diwan Cabinet",      category:"living",
    img:"https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80" },
  { id:7,  titleAr:"خزانة النجوم للاطفال",     titleEn:"Stars Kids Cabinet",         category:"kids",
    img:"https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80" },
  { id:8,  titleAr:"خزانة المصمم الحصرية",     titleEn:"Exclusive Designer Cabinet", category:"custom",
    img:"https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80" },
  { id:9,  titleAr:"خزانة الياقوت الملكية",    titleEn:"Royal Sapphire Wardrobe",    category:"bedroom",
    img:"https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80" },
  { id:10, titleAr:"دولاب الفن المعاصر",       titleEn:"Contemporary Art Cabinet",   category:"living",
    img:"https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80" },
  { id:11, titleAr:"خزانة الفراشة للاطفال",    titleEn:"Butterfly Kids Wardrobe",    category:"kids",
    img:"https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&q=80" },
  { id:12, titleAr:"خزانة الجناح الرئاسي",    titleEn:"Presidential Suite Cabinet", category:"custom",
    img:"https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80" },
];

const DEF_ADS = [
  { id:1, titleAr:"عرض الموسم الذهبي",   titleEn:"Golden Season Offer",
    descAr:"خصم حصري على جميع خزائن غرف النوم الفاخرة",
    descEn:"Exclusive discount on all luxury bedroom wardrobes",
    img:"https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80", active:true },
  { id:2, titleAr:"مجموعة 2025 الجديدة", titleEn:"New 2025 Collection",
    descAr:"تشكيلة حصرية جديدة من خزائن الصالون الامبراطورية",
    descEn:"Exclusive new collection of imperial salon cabinets",
    img:"https://images.unsplash.com/photo-1615873968403-89e068629265?w=900&q=80", active:true },
  { id:3, titleAr:"تركيب وتوصيل مجاني",  titleEn:"Free Delivery & Install",
    descAr:"عند شراء اي خزانة احصل على توصيل وتركيب مجاني",
    descEn:"Get free delivery and installation with any purchase",
    img:"https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=80", active:true },
];

export function AppProvider({ children }) {
  const [lang, setLang]         = useState("ar");
  const [isAdmin, setIsAdmin]   = useState(false);
  const [products, setProducts] = useState(DEF_PRODUCTS);
  const [ads, setAds]           = useState(DEF_ADS);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  const toggleLang = () => {
    const next = lang === "ar" ? "en" : "ar";
    setLang(next);
    i18n.changeLanguage(next);
    document.documentElement.setAttribute("lang", next);
    document.documentElement.setAttribute("dir", next === "ar" ? "rtl" : "ltr");
  };

  const login  = (u, p) => { if (u==="admin" && p==="khobara2024") { setIsAdmin(true); return true; } return false; };
  const logout = () => setIsAdmin(false);

  const addProduct    = (p)  => setProducts(prev => [...prev, { ...p, id: Date.now() }]);
  const updateProduct = (p)  => setProducts(prev => prev.map(x => x.id===p.id ? p : x));
  const deleteProduct = (id) => setProducts(prev => prev.filter(x => x.id!==id));
  const addAd         = (a)  => setAds(prev => [...prev, { ...a, id: Date.now() }]);
  const updateAd      = (a)  => setAds(prev => prev.map(x => x.id===a.id ? a : x));
  const deleteAd      = (id) => setAds(prev => prev.filter(x => x.id!==id));

  return (
    <AppContext.Provider value={{
      lang, toggleLang, isAdmin, login, logout,
      products, ads, loading,
      addProduct, updateProduct, deleteProduct,
      addAd, updateAd, deleteAd,
    }}>
      {children}
    </AppContext.Provider>
  );
}
