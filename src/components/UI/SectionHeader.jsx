import React from "react";
import AnimatedSection from "./AnimatedSection";

export default function SectionHeader({ badge, title, subtitle, light = true, center = true }) {
  return (
    <AnimatedSection className={`mb-14 ${center ? "text-center" : ""}`}>
      {badge && (
        <div className={`inline-flex items-center gap-2 mb-4 ${center ? "justify-center w-full" : ""}`}>
          <div className="h-px w-8 opacity-60" style={{ background: "var(--gold)" }} />
          <span
            className="text-xs font-bold tracking-[0.25em] uppercase px-3 py-1 rounded-full"
            style={{
              color:      "var(--gold)",
              background: "rgba(200,151,58,0.1)",
              border:     "1px solid rgba(200,151,58,0.2)",
            }}
          >
            {badge}
          </span>
          <div className="h-px w-8 opacity-60" style={{ background: "var(--gold)" }} />
        </div>
      )}
      <h2
        className={`text-3xl md:text-5xl font-black mb-4 leading-tight ${light ? "text-white" : "text-gray-900"}`}
        style={{ fontFamily: "Cairo, sans-serif" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg max-w-2xl ${center ? "mx-auto" : ""} ${light ? "text-gray-400" : "text-gray-500"}`}>
          {subtitle}
        </p>
      )}
      <div className={`mt-5 h-px w-24 ${center ? "mx-auto" : ""} opacity-40`}
        style={{ background: "linear-gradient(90deg,transparent,var(--gold),transparent)" }} />
    </AnimatedSection>
  );
}
