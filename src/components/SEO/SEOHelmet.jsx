import React from "react";
import { Helmet } from "react-helmet-async";
import { useApp } from "../../context/AppContext";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://khobara-khazaen.com";
const OG_IMAGE = "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=630&fit=crop";

// Per-page SEO data
const PAGE_SEO = {
  ar: {
    "/": {
      title: "خبراء الخزائن | تشكيلات فاخرة من الخزائن والدواليب",
      description: "خبراء الخزائن — أرقى تشكيلات الخزائن والدواليب الفاخرة. تصميم مخصص، توصيل وتركيب، ضمان 5 سنوات. الرياض وجدة.",
      keywords: "خزائن فاخرة, دواليب, خزانة غرفة نوم, تصميم مخصص, الرياض, جدة",
    },
    "/products": {
      title: "منتجاتنا | خزائن ودواليب فاخرة — خبراء الخزائن",
      description: "تصفح مجموعتنا الحصرية من الخزائن والدواليب الفاخرة. خزائن غرف النوم، الصالة، أطفال، وتصاميم مخصصة.",
      keywords: "منتجات خزائن, دواليب فاخرة, خزانة غرفة نوم, خزانة صالون, خزانة أطفال",
    },
    "/about": {
      title: "من نحن | خبراء الخزائن منذ 2010",
      description: "تعرف على قصة خبراء الخزائن منذ عام 2010. رحلة من الشغف نحو الكمال في صناعة الخزائن الفاخرة بالرياض وجدة.",
      keywords: "من نحن, قصة خبراء الخزائن, شركة خزائن السعودية",
    },
    "/services": {
      title: "خدماتنا | تصميم وتركيب وضمان — خبراء الخزائن",
      description: "خدمات متكاملة: تصميم مخصص، توصيل وتركيب احترافي، ضمان 5 سنوات، استشارة مجانية، وصيانة دورية.",
      keywords: "خدمات خزائن, تركيب خزائن, تصميم مخصص, ضمان خزائن",
    },
    "/contact": {
      title: "تواصل معنا | خبراء الخزائن — الرياض وجدة",
      description: "تواصل مع فريق خبراء الخزائن عبر واتساب أو الهاتف. نحن في الرياض وجدة، المملكة العربية السعودية.",
      keywords: "تواصل معنا, رقم خبراء الخزائن, واتساب, الرياض, جدة",
    },
  },
  en: {
    "/": {
      title: "Khobara Khazaen | Luxury Cabinet Collections",
      description: "Khobara Khazaen — Finest luxury cabinet collections. Custom design, delivery & installation, 5-year warranty. Riyadh & Jeddah, Saudi Arabia.",
      keywords: "luxury wardrobes, cabinets, bedroom wardrobe, custom design, Riyadh, Jeddah, Saudi Arabia",
    },
    "/products": {
      title: "Our Products | Luxury Wardrobes & Cabinets — Khobara Khazaen",
      description: "Browse our exclusive collection of luxury wardrobes and cabinets. Bedroom, living room, kids, and custom designs.",
      keywords: "luxury cabinets, wardrobes, bedroom cabinet, living room cabinet, kids wardrobe",
    },
    "/about": {
      title: "About Us | Khobara Khazaen Since 2010",
      description: "Learn about Khobara Khazaen's story since 2010. A journey of passion towards perfection in luxury cabinet craftsmanship.",
      keywords: "about Khobara Khazaen, luxury furniture Saudi Arabia",
    },
    "/services": {
      title: "Our Services | Design, Installation & Warranty — Khobara Khazaen",
      description: "Complete services: custom design, professional delivery & installation, 5-year warranty, free consultation, and maintenance.",
      keywords: "cabinet services, installation, custom design, warranty",
    },
    "/contact": {
      title: "Contact Us | Khobara Khazaen — Riyadh & Jeddah",
      description: "Contact the Khobara Khazaen team via WhatsApp or phone. We are in Riyadh and Jeddah, Saudi Arabia.",
      keywords: "contact Khobara Khazaen, WhatsApp, Riyadh, Jeddah",
    },
  },
};

export default function SEOHelmet({ title, description, image }) {
  const { lang } = useApp();
  const { pathname } = useLocation();

  const pageSEO = PAGE_SEO[lang]?.[pathname] || PAGE_SEO[lang]?.["/"];
  const finalTitle       = title       || pageSEO.title;
  const finalDescription = description || pageSEO.description;
  const finalKeywords    = pageSEO.keywords;
  const finalImage       = image || OG_IMAGE;
  const canonicalUrl     = `${SITE_URL}${pathname}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    "name": "خبراء الخزائن",
    "alternateName": "Khobara Khazaen",
    "url": SITE_URL,
    "logo": `${SITE_URL}/logo.png`,
    "image": OG_IMAGE,
    "telephone": "+9963765347",
    "priceRange": "$$$$",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "SA",
      "addressRegion": "Riyadh",
      "addressLocality": "الرياض",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "24.7136",
      "longitude": "46.6753",
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday"],
        "opens": "09:00",
        "closes": "22:00",
      },
    ],
    "sameAs": [
      "https://www.instagram.com/khobaraKhazaen",
      "https://www.twitter.com/khobaraKhazaen",
      "https://www.facebook.com/khobaraKhazaen",
    ],
    "hasMap": "https://maps.google.com/?q=خبراء+الخزائن+الرياض",
    "currenciesAccepted": "SAR",
    "paymentAccepted": "Cash, Credit Card",
    "areaServed": ["Riyadh", "Jeddah", "Saudi Arabia"],
    "description": "أرقى تشكيلات الخزائن والدواليب الفاخرة في المملكة العربية السعودية منذ 2010",
  };

  return (
    <Helmet>
      <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"} />
      <title>{finalTitle}</title>
      <meta name="description"  content={finalDescription} />
      <meta name="keywords"     content={finalKeywords} />
      <meta name="robots"       content="index, follow" />
      <meta name="author"       content="خبراء الخزائن" />
      <link rel="canonical"     href={canonicalUrl} />

      {/* hreflang */}
      <link rel="alternate" hreflang="ar" href={`${SITE_URL}${pathname}`} />
      <link rel="alternate" hreflang="en" href={`${SITE_URL}/en${pathname}`} />
      <link rel="alternate" hreflang="x-default" href={`${SITE_URL}${pathname}`} />

      {/* Open Graph */}
      <meta property="og:type"        content="website" />
      <meta property="og:site_name"   content="خبراء الخزائن" />
      <meta property="og:url"         content={canonicalUrl} />
      <meta property="og:title"       content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image"       content={finalImage} />
      <meta property="og:image:width"  content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale"      content={lang === "ar" ? "ar_SA" : "en_US"} />

      {/* Twitter Card */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image"       content={finalImage} />

      {/* JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
