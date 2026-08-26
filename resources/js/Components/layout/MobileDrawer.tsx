import React, { useState } from "react";
import { X, ChevronRight } from "lucide-react";
import logoImg from "@/assets/logo.png";
import { useTranslation } from "@/i18n/useTranslation";
import { ecoProductCategories, ecoServiceCategories } from "@/data/navigationData";
import { LanguageDropdown } from "./LanguageDropdown";

interface MobileDrawerProps {
  isOpen: boolean;
  activeNav: string;
  onClose: () => void;
  onNavigate: (pageName: string) => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  activeNav,
  onClose,
  onNavigate,
}) => {
  const { t } = useTranslation();
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileServiceOpen, setMobileServiceOpen] = useState(false);
  const [openLangDropdown, setOpenLangDropdown] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex flex-col justify-start items-center p-3 sm:p-4 overflow-y-auto animate-in fade-in-0 duration-200">
      {/* Expanded Menu Card (100% Matched to Reference Screenshot) */}
      <div className="w-full max-w-lg bg-card text-foreground rounded-[2rem] border border-border/80 shadow-2xl p-5 sm:p-7 space-y-5 relative animate-in slide-in-from-top-3 duration-300 my-auto sm:my-4">
        
        {/* Top Bar Header Row (Logo + Language Selector + Action CTA + Close Icon) */}
        <div className="flex items-center justify-between gap-2 pb-3.5 border-b border-border/60">
          {/* Left Brand Logo */}
          <img
            src={logoImg}
            alt="EcoReve Logo"
            className="h-7 sm:h-8 w-auto object-contain cursor-pointer"
            onClick={() => {
              onNavigate("Home");
              onClose();
            }}
          />

          {/* Right Controls: Language Selector + Action CTA + Close Icon */}
          <div className="flex items-center gap-2">
            <LanguageDropdown
              open={openLangDropdown}
              onToggle={() => setOpenLangDropdown(!openLangDropdown)}
              onClose={() => setOpenLangDropdown(false)}
            />

            <button
              type="button"
              onClick={() => {
                onNavigate("Contact");
                onClose();
              }}
              className="rounded-xl bg-[#005883] hover:bg-[#00486e] text-white text-xs font-extrabold px-3 py-2 shadow-xs transition-all cursor-pointer active:scale-95 whitespace-nowrap"
            >
              {t.nav.portalTitle || "Get Started"}
            </button>

            {/* Close Button (X) */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close navigation menu"
              className="h-9 w-9 flex items-center justify-center rounded-full text-foreground hover:bg-secondary transition-colors cursor-pointer"
            >
              <X className="h-5 w-5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Main Vertical Navigation Links List (Matching Reference Screenshot 100%) */}
        <div className="space-y-0.5 text-left">
          
          {/* Item 1: Products (Expandable) */}
          <div className="border-b border-border/40">
            <button
              type="button"
              onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
              className="w-full py-3.5 flex items-center justify-between text-base font-extrabold text-foreground hover:text-[#005883] transition-colors cursor-pointer"
            >
              <span>{t.nav.products}</span>
              <ChevronRight
                className={`h-4 w-4 text-muted-foreground/70 transition-transform duration-200 ${
                  mobileProductsOpen ? "rotate-90 text-[#005883]" : ""
                }`}
              />
            </button>

            {mobileProductsOpen && (
              <div className="pb-3 pl-3 space-y-3 text-xs animate-in fade-in-0 duration-200 border-t border-border/30 pt-3">
                {ecoProductCategories.map((cat) => (
                  <div key={cat.category} className="space-y-1">
                    <p className="font-extrabold text-[#005883] text-[10px] uppercase tracking-wider">
                      {cat.category}
                    </p>
                    <div className="space-y-1 pl-1">
                      {cat.items.map((item) => (
                        <a
                          key={item.name}
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            onNavigate(`Products - ${item.name}`);
                            onClose();
                          }}
                          className="block py-1 text-foreground/80 hover:text-[#005883] font-semibold transition-colors"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Item 2: Service / Solutions (Expandable) */}
          <div className="border-b border-border/40">
            <button
              type="button"
              onClick={() => setMobileServiceOpen(!mobileServiceOpen)}
              className="w-full py-3.5 flex items-center justify-between text-base font-extrabold text-foreground hover:text-[#005883] transition-colors cursor-pointer"
            >
              <span>{t.nav.service}</span>
              <ChevronRight
                className={`h-4 w-4 text-muted-foreground/70 transition-transform duration-200 ${
                  mobileServiceOpen ? "rotate-90 text-[#005883]" : ""
                }`}
              />
            </button>

            {mobileServiceOpen && (
              <div className="pb-3 pl-3 space-y-2 text-xs animate-in fade-in-0 duration-200 border-t border-border/30 pt-3">
                {ecoServiceCategories.map((srv) => (
                  <a
                    key={srv.title}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(`Service - ${srv.title}`);
                      onClose();
                    }}
                    className="block py-1 text-foreground/80 hover:text-[#005883] font-semibold transition-colors"
                  >
                    {srv.title}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Item 3: About Us */}
          <div className="border-b border-border/40">
            <button
              type="button"
              onClick={() => {
                onNavigate("About us");
                onClose();
              }}
              className="w-full py-3.5 flex items-center justify-between text-base font-extrabold text-foreground hover:text-[#005883] transition-colors cursor-pointer"
            >
              <span>{t.nav.aboutUs}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground/70" />
            </button>
          </div>

          {/* Item 4: News */}
          <div className="border-b border-border/40">
            <button
              type="button"
              onClick={() => {
                onNavigate("News");
                onClose();
              }}
              className="w-full py-3.5 flex items-center justify-between text-base font-extrabold text-foreground hover:text-[#005883] transition-colors cursor-pointer"
            >
              <span>{t.nav.news}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground/70" />
            </button>
          </div>

          {/* Item 5: Contact */}
          <div>
            <button
              type="button"
              onClick={() => {
                onNavigate("Contact");
                onClose();
              }}
              className="w-full py-3.5 flex items-center justify-between text-base font-extrabold text-foreground hover:text-[#005883] transition-colors cursor-pointer"
            >
              <span>{t.nav.contact}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground/70" />
            </button>
          </div>

        </div>

        {/* Bottom Right Secondary Action Button (Matching Reference Screenshot 100%) */}
        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={() => {
              onNavigate("Contact");
              onClose();
            }}
            className="rounded-2xl bg-[#005883] hover:bg-[#00486e] text-white text-xs font-extrabold px-6 py-3 shadow-sm cursor-pointer transition-all active:scale-95"
          >
            {t.nav.contact}
          </button>
        </div>

      </div>
    </div>
  );
};
