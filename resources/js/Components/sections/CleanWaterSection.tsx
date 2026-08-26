import React from "react";
import heroFooterImg from "@/assets/hero-footer.webp";
import { useTranslation } from "@/i18n/useTranslation";

export const CleanWaterSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="w-full mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8 py-8 md:py-10" id="why">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-[#1a2328] text-white p-6 sm:p-8 md:p-14 min-h-[500px] flex flex-col justify-between shadow-lg border border-border/20">
        {/* Full-Color Background Image (Original Colors Enabled) */}
        <img
          src={heroFooterImg}
          alt="Pioneering Clean Water Background"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-95"
        />

        {/* Subtle Dark Overlay Gradient for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

        {/* Center Content */}
        <div className="relative z-10 flex flex-col items-center text-center my-auto py-10">
          <h2 className="max-w-3xl text-4xl font-extrabold tracking-tight md:text-6xl text-white leading-[1.05] whitespace-pre-line">
            {t.cleanWater.title}
          </h2>
          <p className="mt-5 max-w-md text-xs leading-relaxed text-white/90 font-medium">
            {t.cleanWater.subtitle}
          </p>
        </div>

        {/* Bottom 3 Cards Row */}
        <div className="relative z-10 grid gap-4 sm:grid-cols-3 max-w-4xl mx-auto w-full mt-4">
          {/* Card 1: Recycling Rate */}
          <div className="flex flex-col justify-between rounded-3xl bg-white/95 text-black p-5 backdrop-blur min-h-[130px] shadow-lg">
            <span className="text-3xl font-extrabold tracking-tight text-foreground">{t.cleanWater.metric1}</span>
            <div className="flex items-center justify-between mt-3">
              <span className="text-[11px] font-bold text-muted-foreground">{t.cleanWater.metric1Label}</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#008193] text-white">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
            </div>
          </div>

          {/* Card 2: Online Monitoring */}
          <div className="flex flex-col justify-between rounded-3xl bg-white/95 text-black p-5 backdrop-blur min-h-[130px] shadow-lg">
            <span className="text-3xl font-extrabold tracking-tight text-foreground">{t.cleanWater.metric2}</span>
            <div className="flex items-center justify-between mt-3">
              <span className="text-[11px] font-bold text-muted-foreground">{t.cleanWater.metric2Label}</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#008193] text-white">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
            </div>
          </div>

          {/* Card 3: Energy Savings */}
          <div className="flex flex-col justify-between rounded-3xl bg-[#008193] text-white p-5 min-h-[130px] shadow-lg">
            <span className="text-3xl font-extrabold tracking-tight">{t.cleanWater.metric3}</span>
            <div className="flex items-center justify-between mt-3">
              <span className="text-[11px] font-medium text-white/90">{t.cleanWater.metric3Label}</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#008193]">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
