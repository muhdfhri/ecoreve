import React from "react";
import heroBannerImg from "@/assets/hero-banner.webp";
import { useTranslation } from "@/i18n/useTranslation";
import { getTrans } from "@/utils/transHelper";

export const HeroSection: React.FC = () => {
  const { t, language } = useTranslation();
  const currentLang = language ? language.toLowerCase() : "id";

  return (
    <section className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8 pb-6 pt-3">
      <div className="relative overflow-hidden rounded-3xl bg-[#e5e5e7] p-6 sm:p-8 md:p-12 min-h-[580px] flex flex-col justify-between shadow-2xl border border-white/20">
        {/* Background Hero Banner Image */}
        <img
          src={heroBannerImg}
          alt="EcoReve Water Treatment Banner"
          className="absolute inset-0 h-full w-full object-cover object-right opacity-95"
        />

        {/* Left Dark Gradient Overlay for Maximum Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent z-0 max-w-3xl" />

        {/* Main Hero Headline Text & Subtitle */}
        <div className="relative z-10 my-auto py-6 max-w-2xl">
          <h1 className="animate-element animate-delay-200 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15] drop-shadow-md">
            {t.hero.headlineLine1}
            <br />
            {t.hero.headlineLine2}
            <br />
            {t.hero.headlineLine3}
            <br />
            {t.hero.headlineLine4}
          </h1>

          <p className="animate-element animate-delay-300 mt-5 max-w-xl text-sm sm:text-base leading-relaxed text-white/90 font-medium drop-shadow-sm">
            {t.hero.subtitle}
          </p>

          {/* Quick CTA Buttons with Glass & Elevated Button Hover Effects */}
          <div className="animate-element animate-delay-400 mt-7 flex flex-wrap items-center gap-3.5">
            <a
              href="/products"
              className="inline-flex items-center justify-center rounded-xl bg-[#005883] hover:bg-[#003853] px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              {t.common.exploreSystems}
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              {t.common.contactSales}
            </a>
          </div>
        </div>

        {/* Bottom Floating Badges & Real Metrics with Entrance Delays & Glass Glassmorphism */}
        <div className="relative z-10 grid gap-3 sm:grid-cols-3 max-w-3xl pt-4">
          {/* Badge 1: User Avatars & Enterprise Clients */}
          <div className="animate-element animate-delay-500 flex items-center gap-3.5 rounded-2xl bg-black/60 hover:bg-black/75 p-3.5 shadow-xl backdrop-blur-xl border border-white/20 text-white transition-all duration-300 hover:-translate-y-1">
            <div className="flex -space-x-2 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Client User Avatar 1"
                className="h-8 w-8 rounded-full border-2 border-white object-cover shadow-sm"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                alt="Client User Avatar 2"
                className="h-8 w-8 rounded-full border-2 border-white object-cover shadow-sm"
              />
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                alt="Client User Avatar 3"
                className="h-8 w-8 rounded-full border-2 border-white object-cover shadow-sm"
              />
            </div>
            <div>
              <p className="text-xs font-bold text-white leading-tight">
                {t.hero.trustedBadgeTitle}
              </p>
              <p className="text-[10px] text-white/70">
                {getTrans(JSON.stringify({
                  en: "Wastewater & Utilities",
                  id: "Air Limbah & Utilitas",
                  ms: "Air Sisa & Utiliti",
                  th: "ระบบน้ำเสียและสาธารณูปโภค",
                  zh: "工业废水与公用事业"
                }), currentLang)}
              </p>
            </div>
          </div>

          {/* Badge 2: Treatment Solutions */}
          <div className="animate-element animate-delay-600 flex items-center gap-3.5 rounded-2xl bg-black/60 hover:bg-black/75 p-3.5 shadow-xl backdrop-blur-xl border border-white/20 text-white transition-all duration-300 hover:-translate-y-1">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#008193] text-white shrink-0 font-extrabold text-xs shadow-inner">
              50+
            </div>
            <div>
              <p className="text-xs font-bold text-white leading-tight">
                {t.hero.solutionsBadgeTitle}
              </p>
              <p className="text-[10px] text-white/70">
                {getTrans(JSON.stringify({
                  en: "Customized Engineering",
                  id: "Rekayasa Terkustomisasi",
                  ms: "Kejuruteraan Tersuai",
                  th: "วิศวกรรมที่กำหนดเอง",
                  zh: "定制化工程方案"
                }), currentLang)}
              </p>
            </div>
          </div>

          {/* Badge 3: Fast Response Consultation */}
          <div className="animate-element animate-delay-700 flex items-center gap-3.5 rounded-2xl bg-black/60 hover:bg-black/75 p-3.5 shadow-xl backdrop-blur-xl border border-white/20 text-white transition-all duration-300 hover:-translate-y-1">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#005883] text-white shrink-0 font-extrabold text-xs shadow-inner border border-white/20">
              15m
            </div>
            <div>
              <p className="text-xs font-bold text-white leading-tight">
                {t.hero.consultationBadgeTitle}
              </p>
              <p className="text-[10px] text-white/70">
                {getTrans(JSON.stringify({
                  en: "Technical Support",
                  id: "Dukungan Teknis",
                  ms: "Sokongan Teknikal",
                  th: "การสนับสนุนทางเทคนิค",
                  zh: "24/7 技术支持"
                }), currentLang)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
