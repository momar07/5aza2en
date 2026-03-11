import React from "react";
import { Helmet } from "react-helmet-async";
import { useApp } from "../../context/AppContext";

export default function SEOHelmet({ title, description }) {
  const { lang } = useApp();
  const defTitle = lang === "ar"
    ? "خبراء الخزائن | تشكيلات فاخرة من الخزائن والدواليب"
    : "Khobara Khazaen | Luxury Cabinet Collections";
  const defDesc = lang === "ar"
    ? "خبراء الخزائن — ارقى تشكيلات الخزائن والدواليب الفاخرة. تصميم مخصص، توصيل وتركيب، ضمان 5 سنوات."
    : "Khobara Khazaen — Finest luxury cabinet collections. Custom design, delivery & installation, 5-year warranty.";
  return (
    <Helmet>
      <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"} />
      <title>{title || defTitle}</title>
      <meta name="description"         content={description || defDesc} />
      <meta property="og:title"        content={title || defTitle} />
      <meta property="og:description"  content={description || defDesc} />
      <meta property="og:type"         content="website" />
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="robots"              content="index, follow" />
      <script type="application/ld+json">{JSON.stringify({
        "@context":  "https://schema.org",
        "@type":     "FurnitureStore",
        "name":      "خبراء الخزائن",
        "telephone": "+9963765347",
        "address":   { "@type": "PostalAddress", "addressCountry": "SA" },
        "url":       "https://khobara-khazaen.com",
      })}</script>
    </Helmet>
  );
}
