import React from "react";
import heroBannerImg from "@/assets/hero-banner.webp";
import { useTranslation } from "@/i18n/useTranslation";

export const HeroSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-7xl px-5 pb-8 pt-4">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-[#e5e5e7] p-8 md:p-12 min-h-[560px] flex flex-col justify-between">
        {/* Background Hero Banner Image */}
        <img
          src={heroBannerImg}
          alt="EcoReve Water Treatment Banner"
          className="absolute inset-0 h-full w-full object-cover object-right opacity-95"
        />

        {/* Left Dark Gradient Overlay for Maximum Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-0 max-w-3xl" />

        {/* Top Hero Pill Tag */}
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold text-white shadow-lg border border-white/30 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#8ec63f] animate-pulse" />
            {t.hero.badge}
          </span>
        </div>

        {/* Main Hero Headline Text & Subtitle */}
        <div className="relative z-10 my-auto py-8 max-w-2xl">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl text-white leading-[1.05] drop-shadow-md">
            {t.hero.headlineLine1}
            <br />
            {t.hero.headlineLine2}
            <br />
            {t.hero.headlineLine3}
            <br />
            {t.hero.headlineLine4}
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/95 font-medium drop-shadow">
            {t.hero.subtitle}
          </p>
        </div>

        {/* Bottom Floating Badges & Real Metrics */}
        <div className="relative z-10 grid gap-3 sm:grid-cols-3 max-w-3xl">
          {/* Badge 1: User Avatars & Enterprise Clients */}
          <div className="flex items-center gap-3.5 rounded-2xl bg-black/65 p-3.5 shadow-xl backdrop-blur-md border border-white/20 text-white">
            <div className="flex -space-x-2 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Client User Avatar 1"
                className="h-8 w-8 rounded-full border-2 border-white object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                alt="Client User Avatar 2"
                className="h-8 w-8 rounded-full border-2 border-white object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                alt="Client User Avatar 3"
                className="h-8 w-8 rounded-full border-2 border-white object-cover"
              />
            </div>
            <div>
              <p className="text-xs font-bold text-white leading-tight">
                {t.hero.trustedBadgeTitle}
              </p>
              <p className="text-[10px] text-white/70">Wastewater & Utilities</p>
            </div>
          </div>

          {/* Badge 2: Treatment Solutions */}
          <div className="flex items-center gap-3.5 rounded-2xl bg-black/65 p-3.5 shadow-xl backdrop-blur-md border border-white/20 text-white">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#008193] text-white shrink-0 font-extrabold text-xs shadow-inner">
              50+
            </div>
            <div>
              <p className="text-xs font-bold text-white leading-tight">
                {t.hero.solutionsBadgeTitle}
              </p>
              <p className="text-[10px] text-white/70">Customized Engineering</p>
            </div>
          </div>

          {/* Badge 3: Fast Response Consultation */}
          <div className="flex items-center gap-3.5 rounded-2xl bg-black/65 p-3.5 shadow-xl backdrop-blur-md border border-white/20 text-white">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#8ec63f] text-black shrink-0 font-extrabold text-xs shadow-inner">
              15m
            </div>
            <div>
              <p className="text-xs font-bold text-white leading-tight">
                {t.hero.consultationBadgeTitle}
              </p>
              <p className="text-[10px] text-white/70">Technical Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
