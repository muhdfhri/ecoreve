import React, { useState, useEffect, useRef } from "react";
import { Cpu, Layers, Eye, ShieldCheck, Award, Globe, Zap, ArrowRight } from "lucide-react";
import heroBannerImg from "@/assets/hero-banner.webp";
import bannerFooterImg from "@/assets/banner-footer.webp";
import { useTranslation } from "@/i18n/useTranslation";

export const AboutUsPage: React.FC = () => {
  const { t } = useTranslation();
  const [parallaxY, setParallaxY] = useState<number>(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const heroRef = useRef<HTMLDivElement>(null);

  const faqData = [
    {
      question: "DO YOU MANUFACTURE THE EQUIPMENT USED TO BUILD THE WATER TREATMENT PLANTS?",
      answer: "Yes. We're a true OEM, not a broker. We own the design, the engineering, and the supply chain for all industrial water & wastewater infrastructure.",
    },
    {
      question: "WHAT PRODUCTS DO YOU OFFER?",
      answer: "We engineer containerized & skid-mounted Demineralization Plants, Softener Systems, Horizontal & Vertical DAF Flotation units, Geotube Dewatering systems, PE Storage Tanks, Chemical Dosing Pumps, and zero-leakage High-Performance Butterfly Valves.",
    },
    {
      question: "CAN YOU HANDLE CUSTOM SPECS?",
      answer: "Absolutely. Every industrial plant requires unique flow rates, chemical pH tolerances, and telemetry integration. Our engineering team custom builds systems according to your exact plant discharge parameters and SCADA specifications.",
    },
    {
      question: "WHAT KINDS OF PROJECTS DO YOU WORK ON?",
      answer: "We serve large-scale manufacturing facilities, chemical plants, food & beverage processing plants, textiles, power stations, and municipal wastewater facilities requiring Zero Liquid Discharge (ZLD) or high-efficiency water recirculation.",
    },
    {
      question: "WHERE ARE YOU LOCATED & DO YOU SUPPORT INTERNATIONAL DEPLOYMENTS?",
      answer: "Headquartered with major R&D hubs in Qingdao, we deploy and service industrial water infrastructure across Southeast Asia, East Asia, and globally with 24/7 on-site operator training and telemetry support.",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top < windowHeight && rect.bottom > 0) {
          const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
          // Moves image upward naturally from 0px to -70px as user scrolls down!
          setParallaxY(progress * -70);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full min-h-screen bg-background text-foreground pb-0 pt-3">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8 space-y-12">
        
        {/* SECTION 1: TOP HERO 50% / 50% SPLIT BANNER (Layout Aligned with News Page, Styling Restored to Original About Us) */}
        <div className="pt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            
            {/* Left Column Card (Hero Title & Tagline - Original Clean White Card Style Restored) */}
            <div className="rounded-2xl bg-card border border-border/80 p-8 sm:p-10 md:p-12 flex flex-col justify-between shadow-sm hover:shadow-md transition-all min-h-[400px] sm:min-h-[460px]">
              <div className="space-y-6">
                {/* Pill Tag Header */}
                <span className="inline-flex items-center gap-2 rounded-full bg-[#005883]/10 dark:bg-white/10 px-4 py-1.5 text-xs font-mono font-bold text-[#005883] dark:text-white uppercase tracking-wider">
                  <Globe className="h-3.5 w-3.5" />
                  QINGDAO TOPOLAR / ECOREVE
                </span>

                {/* Main Headline */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                  {t.aboutUsPage.heroTitle}
                </h1>
              </div>

              {/* Subtext Description */}
              <div className="pt-8 sm:pt-12 border-t border-border/40 mt-8">
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {t.aboutUsPage.heroSubtitle}
                </p>
              </div>
            </div>

            {/* Right Column Hero Visual Card (Original Full-Bleed Image Card Style Restored) */}
            <div className="rounded-2xl relative overflow-hidden shadow-lg border border-border/60 min-h-[400px] sm:min-h-[460px] group flex flex-col justify-end p-8 sm:p-10 md:p-12">
              <img
                src={heroBannerImg}
                alt="EcoReve Industrial Water Architecture"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              {/* Soft Dark Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30 pointer-events-none z-0" />

              {/* Synchronized Bottom Caption Overlay Text */}
              <div className="relative z-10 space-y-3 pt-8 border-t border-white/20">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-tight">
                  {t.aboutUsPage.heroCardTitle}
                </h2>
                <p className="text-xs sm:text-sm text-white/90 font-medium leading-relaxed max-w-lg">
                  {t.aboutUsPage.heroCardDesc}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 2: 50% LEFT (3 STICKY STACKING CARDS) + 50% RIGHT (DIRECT SUPPORT MEDIA CARD WITH 3 BOTTOM CARDS) */}
        <div className="pt-8 space-y-12">
          
          {/* Header Title */}
          <div className="space-y-4 max-w-3xl">
            <p className="text-[11px] font-mono font-extrabold tracking-widest text-[#005883] dark:text-sky-400 uppercase">
              {t.aboutUsPage.pillarsEyebrow}
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
              {t.aboutUsPage.pillarsTitle}
            </h2>
          </div>

          {/* 50% / 50% Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
            
            {/* LEFT 50% COLUMN: 3 Separated Feature Cards with Sticky Stacking Scroll Effect */}
            <div className="lg:col-span-6 space-y-6 relative">
              
              {/* Card 01 */}
              <div className="sticky top-28 z-10 group rounded-2xl bg-card/95 backdrop-blur-md border border-border/80 p-6 sm:p-8 flex items-start gap-6 shadow-md transition-all duration-300 hover:bg-[#005883]/10 dark:hover:bg-[#005883]/20 cursor-pointer">
                <span className="text-5xl sm:text-6xl font-mono font-extrabold text-[#005883] dark:text-sky-400 shrink-0 leading-none group-hover:scale-105 transition-transform">
                  01
                </span>
                <div className="space-y-2 my-auto">
                  <h3 className="text-lg font-extrabold text-foreground group-hover:text-[#005883] dark:group-hover:text-sky-400 transition-colors">
                    AUTONOMOUS OPERATION
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                    Fully automated anion & cation exchanger plants engineered to eliminate silica (SiO₂) and water hardness minerals (Ca²⁺ & Mg²⁺) with zero manual intervention.
                  </p>
                </div>
              </div>

              {/* Card 02 */}
              <div className="sticky top-36 z-20 group rounded-2xl bg-card/95 backdrop-blur-md border border-border/80 p-6 sm:p-8 flex items-start gap-6 shadow-md transition-all duration-300 hover:bg-[#005883]/10 dark:hover:bg-[#005883]/20 cursor-pointer">
                <span className="text-5xl sm:text-6xl font-mono font-extrabold text-[#005883] dark:text-sky-400 shrink-0 leading-none group-hover:scale-105 transition-transform">
                  02
                </span>
                <div className="space-y-2 my-auto">
                  <h3 className="text-lg font-extrabold text-foreground group-hover:text-[#005883] dark:group-hover:text-sky-400 transition-colors">
                    INTELLIGENT DISPATCH
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                    Vertical & horizontal Dissolved Air Flotation paired with high-capacity containerized sludge dewatering for high oil separation and automated valve control.
                  </p>
                </div>
              </div>

              {/* Card 03 */}
              <div className="sticky top-44 z-30 group rounded-2xl bg-card/95 backdrop-blur-md border border-border/80 p-6 sm:p-8 flex items-start gap-6 shadow-md transition-all duration-300 hover:bg-[#005883]/10 dark:hover:bg-[#005883]/20 cursor-pointer">
                <span className="text-5xl sm:text-6xl font-mono font-extrabold text-[#005883] dark:text-sky-400 shrink-0 leading-none group-hover:scale-105 transition-transform">
                  03
                </span>
                <div className="space-y-2 my-auto">
                  <h3 className="text-lg font-extrabold text-foreground group-hover:text-[#005883] dark:group-hover:text-sky-400 transition-colors">
                    FULL TRANSPARENCY
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                    Precision chemical dosing pumps, PE mixing tanks, and zero-leakage high-performance butterfly valves backed by real-time SCADA telemetry APIs.
                  </p>
                </div>
              </div>

            </div>

            {/* RIGHT 50% COLUMN: Sticky Direct Support Media Card with 3 Bottom Cards */}
            <div className="lg:col-span-6 sticky top-28 self-start space-y-4">
              <div className="rounded-2xl bg-card border border-border/80 p-4 sm:p-5 flex flex-col justify-between shadow-lg space-y-4">
                
                {/* Top 70% Height Image Card */}
                <div className="relative overflow-hidden rounded-2xl min-h-[280px] sm:min-h-[320px] p-6 sm:p-8 flex flex-col justify-between group">
                  <img
                    src={heroBannerImg}
                    alt="EcoReve Expert Engineering Guidance"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/25 pointer-events-none z-0" />

                  {/* Top Pill Badge Header */}
                  <div className="relative z-10">
                    <span className="text-[11px] font-mono font-extrabold tracking-widest text-white uppercase bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-md border border-white/10">
                      {t.aboutUsPage.directSupportTag}
                    </span>
                  </div>

                  {/* Main Headline Title */}
                  <div className="relative z-10 pt-8">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-white drop-shadow-md max-w-md">
                      {t.aboutUsPage.expertGuidanceTitle}
                    </h3>
                  </div>
                </div>

                {/* Bottom 3 Cards Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  
                  {/* Card 1: Description Text Card */}
                  <div className="rounded-2xl bg-secondary/80 dark:bg-secondary/40 p-3.5 border border-border/60 flex items-center justify-center text-center sm:text-left">
                    <p className="text-[11px] text-muted-foreground font-semibold leading-relaxed">
                      {t.aboutUsPage.expertGuidanceDesc}
                    </p>
                  </div>

                  {/* Card 2: 15min Response Badge Card */}
                  <div className="rounded-2xl bg-white dark:bg-card p-3.5 border border-border/80 shadow-xs flex items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-extrabold text-foreground leading-none">{t.aboutUsPage.expertResponseTime}</p>
                      <p className="text-[10px] font-bold text-muted-foreground mt-0.5">{t.aboutUsPage.expertResponseLabel}</p>
                    </div>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#005883] text-white shadow-xs">
                      <Zap className="h-3.5 w-3.5 fill-white text-white" />
                    </span>
                  </div>

                  {/* Card 3: Action Button Card */}
                  <a
                    href="#contact"
                    className="rounded-2xl bg-[#008193] hover:bg-[#005883] text-white p-3.5 border border-transparent shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-2 group/btn text-[11px] font-mono font-bold tracking-wider uppercase cursor-pointer"
                  >
                    <span>{t.common.exploreSystems}</span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover/btn:translate-x-1" />
                  </a>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* SECTION 3: FULL-BLEED BACKGROUND SQUARE BLUE STATS BANNER */}
      <div className="w-full bg-[#005883] text-white py-14 sm:py-18 md:py-22 shadow-2xl mt-16 relative overflow-hidden">
        {/* Top-Right Clean Concentric L-Shaped Grid Lines */}
        <div className="absolute top-0 right-0 w-[550px] h-full opacity-25 pointer-events-none z-0 hidden lg:block overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 550 320" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 0 0 L 550 0" stroke="white" strokeWidth="1.5" />
            <path d="M 0 10 L 550 10" stroke="white" strokeWidth="1" />
            <path d="M 0 20 L 550 20" stroke="white" strokeWidth="1" />
            <path d="M 0 30 L 550 30" stroke="white" strokeWidth="1" />
            
            <path d="M 60 0 L 60 40" stroke="white" strokeWidth="1" />
            <path d="M 90 0 L 90 40" stroke="white" strokeWidth="1" />

            <path d="M 120 0 L 120 40 L 550 40" stroke="white" strokeWidth="1" />
            <path d="M 150 0 L 150 65 L 550 65" stroke="white" strokeWidth="1" />
            <path d="M 180 0 L 180 90 L 550 90" stroke="white" strokeWidth="1" />
            <path d="M 210 0 L 210 115 L 550 115" stroke="white" strokeWidth="1" />
            <path d="M 240 0 L 240 140 L 550 140" stroke="white" strokeWidth="1" />
            <path d="M 270 0 L 270 165 L 550 165" stroke="white" strokeWidth="1" />
            <path d="M 300 0 L 300 190 L 550 190" stroke="white" strokeWidth="1" />
            <path d="M 330 0 L 330 215 L 550 215" stroke="white" strokeWidth="1" />
            <path d="M 360 0 L 360 240 L 550 240" stroke="white" strokeWidth="1" />
            <path d="M 390 0 L 390 265 L 550 265" stroke="white" strokeWidth="1" />
            <path d="M 420 0 L 420 290 L 550 290" stroke="white" strokeWidth="1" />
          </svg>
        </div>

        {/* Inner Content Container */}
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8 space-y-12 relative z-10">
          {/* Header Row */}
          <div className="space-y-4 max-w-3xl">
            <p className="text-[11px] font-mono font-extrabold tracking-widest uppercase text-white/80">
              {t.aboutUsPage.statsEyebrow}
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {t.aboutUsPage.statsTitle}
            </h2>
          </div>

          {/* 3 Stats Columns Row */}
          <div className="grid gap-8 sm:grid-cols-3 pt-4">
            {/* Stat 1 */}
            <div className="space-y-4">
              <span className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white block">
                99.5%
              </span>
              <div className="pt-2 relative">
                <div className="flex items-center w-full mb-3">
                  <div className="w-[82%] border-t border-white/60" />
                  <div className="w-[8px] h-[8px] border-r border-b border-white/60 -rotate-45 -ml-1 -mt-2" />
                  <div className="flex-1 border-t border-white/60 mt-2" />
                </div>
                <p className="text-[10px] sm:text-[11px] font-mono font-bold tracking-widest text-white/90 uppercase leading-snug">
                  {t.aboutUsPage.statsMetric1Label}
                </p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="space-y-4">
              <span className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white block">
                1000+
              </span>
              <div className="pt-2 relative">
                <div className="flex items-center w-full mb-3">
                  <div className="w-[82%] border-t border-white/60" />
                  <div className="w-[8px] h-[8px] border-r border-b border-white/60 -rotate-45 -ml-1 -mt-2" />
                  <div className="flex-1 border-t border-white/60 mt-2" />
                </div>
                <p className="text-[10px] sm:text-[11px] font-mono font-bold tracking-widest text-white/90 uppercase leading-snug">
                  {t.aboutUsPage.statsMetric2Label}
                </p>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="space-y-4">
              <span className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white block">
                500+
              </span>
              <div className="pt-2 relative">
                <div className="flex items-center w-full mb-3">
                  <div className="w-[82%] border-t border-white/60" />
                  <div className="w-[8px] h-[8px] border-r border-b border-white/60 -rotate-45 -ml-1 -mt-2" />
                  <div className="flex-1 border-t border-white/60 mt-2" />
                </div>
                <p className="text-[10px] sm:text-[11px] font-mono font-bold tracking-widest text-white/90 uppercase leading-snug">
                  {t.aboutUsPage.statsMetric3Label}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4: FAQs SECTION (PRESERVED 100%) */}
      <div className="w-full bg-background py-16 sm:py-24 border-t border-border/40">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* LEFT COLUMN: FAQs Header, Subtitle & Blue Contact Card */}
            <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
              <div className="space-y-4">
                <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
                  {t.aboutUsPage.faqsTitle}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-md font-medium">
                  {t.aboutUsPage.faqsSubtitle}
                </p>
              </div>

              {/* Blue Contact Card (Matching Reference 100%) */}
              <div className="rounded-2xl bg-[#005883] text-white p-8 sm:p-10 space-y-4 shadow-xl relative overflow-hidden">
                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  {t.aboutUsPage.cantFindAnswerTitle}
                </h3>
                <p className="text-xs sm:text-sm text-white/90 font-medium leading-relaxed">
                  {t.aboutUsPage.cantFindAnswerDesc}
                </p>
                <div className="pt-4">
                  <a
                    href="#contact"
                    className="inline-block border border-white text-white text-xs font-mono font-bold tracking-wider uppercase px-5 py-3 rounded-md hover:bg-white hover:text-[#005883] transition-all cursor-pointer shadow-sm"
                  >
                    {t.common.contactSales}
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Accordion FAQ List (Matching Reference Monospace Blue Question Titles & + / − toggles) */}
            <div className="lg:col-span-7 space-y-6">
              {faqData.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div key={index} className="border-b border-border/70 pb-6 transition-all">
                    {/* Question Header Row */}
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full flex items-center justify-between gap-4 text-left group cursor-pointer"
                    >
                      <span className="font-mono text-xs sm:text-sm font-bold tracking-wider uppercase text-[#005883] dark:text-sky-400 group-hover:text-[#008193] transition-colors leading-relaxed pr-4">
                        {faq.question}
                      </span>
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center text-[#005883] dark:text-sky-400 font-mono text-lg font-bold">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>

                    {/* Smooth Collapsible Answer Container */}
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100 mt-4"
                          : "grid-rows-[0fr] opacity-0 mt-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-xs sm:text-sm text-foreground/90 font-medium leading-relaxed max-w-2xl">
                          {faq.answer}
                        </p>
                      </div>
                    </div>

                    {/* Horizontal Divider Line with Subtle Right Angle Notch (Matching Reference) */}
                    <div className="mt-6 relative">
                      <div className="flex items-center w-full">
                        <div className="w-[95%] border-t border-border/60" />
                        <div className="w-[6px] h-[6px] border-r border-b border-border/60 -rotate-45 -ml-0.5 -mt-1.5" />
                        <div className="flex-1 border-t border-border/60 mt-1" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>

      {/* SECTION 5: FULL-BLEED HERO IMAGE BANNER (banner-footer.webp) WITH SMOOTH PARALLAX SCROLL */}
      <div
        ref={heroRef}
        className="w-full relative overflow-hidden min-h-[580px] sm:min-h-[660px] md:min-h-[720px] flex items-center justify-center py-20 sm:py-28 text-center text-white border-none group mb-0 mt-0"
      >
        {/* Background Image with Smooth Scroll Parallax Upward Motion */}
        <img
          src={bannerFooterImg}
          alt="EcoReve Next-Generation Industrial Water Perspective"
          className="absolute -top-[12%] inset-x-0 h-[125%] w-full object-cover object-center transition-transform duration-100 ease-out will-change-transform group-hover:scale-105"
          style={{
            transform: `translate3d(0, ${parallaxY}px, 0)`,
          }}
        />
        {/* Dark Vignette Overlay for Optimal Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2328] via-black/45 to-black/35 pointer-events-none z-0" />

        {/* Bottom Seamless Gradient Fade to Footer Color (#1a2328) */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#1a2328] via-[#1a2328]/85 to-transparent pointer-events-none z-[1]" />

        {/* Centered Overlay Content */}
        <div className="relative z-10 mx-auto max-w-2xl px-4 flex flex-col items-center space-y-4 transition-all duration-700 group-hover:translate-y-[-4px] -mt-8 sm:-mt-12">
          {/* Top Pill Tag */}
          <span className="inline-flex items-center justify-center rounded-full bg-white/95 backdrop-blur-md px-5 py-1.5 text-xs font-semibold text-black shadow-lg">
            {t.common.aNewPerspective}
          </span>

          {/* Main Hero Headline Title */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1] drop-shadow-md whitespace-pre-line">
            {t.common.extraordinaryMoments}
          </h2>

          {/* Subtitle Caption */}
          <p className="text-xs sm:text-sm text-white/90 font-medium max-w-md leading-relaxed drop-shadow">
            {t.common.extraordinarySub}
          </p>
        </div>
      </div>
    </div>
  );
};
