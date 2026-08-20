import React from "react";
import logoImg from "@/assets/logo.png";
import { useTranslation } from "@/i18n/useTranslation";

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="mx-auto max-w-7xl px-5 pb-12">
      <div className="rounded-[2.5rem] bg-[#1a2328] text-white p-8 md:p-12 border border-border/20 shadow-2xl">
        {/* Top Grid: Mission Statement & Company Offices */}
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left Column: EcoReve Mission & Environmental Commitment */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <img src={logoImg} alt="EcoReve Logo" className="h-9 w-auto object-contain brightness-0 invert" />
            </div>
            <p className="text-base md:text-lg font-normal leading-relaxed text-white/90">
              {t.footer.commitmentText}
            </p>
            <p className="text-xs md:text-sm text-white/70 leading-relaxed">
              {t.footer.marketText}
            </p>
          </div>

          {/* Right Column: Global Offices & Contact Information */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs leading-relaxed">
            {/* China Office */}
            <div className="rounded-3xl bg-white text-foreground p-6 shadow-xl space-y-3 border border-white">
              <div className="flex items-center gap-2">
                <span className="inline-block rounded-full bg-[#005883] px-3 py-1 text-[10px] font-extrabold text-white">
                  {t.footer.chinaOfficeTitle}
                </span>
              </div>
              <h4 className="font-extrabold text-foreground text-sm leading-snug">
                {t.footer.chinaOfficeName}
              </h4>
              <div className="space-y-1 pt-1">
                <p className="font-bold text-muted-foreground text-[11px] uppercase tracking-wider">Address</p>
                <p className="text-foreground/90 font-medium">{t.footer.chinaOfficeAddress}</p>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-muted-foreground text-[11px] uppercase tracking-wider">Contact</p>
                <p className="text-foreground/90 font-medium">+86 (0532) 8000-8888</p>
                <p className="text-foreground/90 font-medium">info@ecoreve.com</p>
              </div>
            </div>

            {/* Malaysia Office */}
            <div className="rounded-3xl bg-white text-foreground p-6 shadow-xl space-y-3 border border-white">
              <div className="flex items-center gap-2">
                <span className="inline-block rounded-full bg-[#008193] px-3 py-1 text-[10px] font-extrabold text-white">
                  {t.footer.malaysiaOfficeTitle}
                </span>
              </div>
              <h4 className="font-extrabold text-foreground text-sm leading-snug">
                {t.footer.malaysiaOfficeName}
              </h4>
              <div className="space-y-1 pt-1">
                <p className="font-bold text-muted-foreground text-[11px] uppercase tracking-wider">Address</p>
                <p className="text-foreground/90 font-medium">{t.footer.malaysiaOfficeAddress}</p>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-muted-foreground text-[11px] uppercase tracking-wider">Contact</p>
                <p className="text-foreground/90 font-medium">+60 3-8000 9999</p>
                <p className="text-foreground/90 font-medium">malaysia@ecoreve.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Rights Reserved Row */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>{t.footer.allRightsReserved}</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Environmental Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
