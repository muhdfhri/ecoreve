import React, { useState } from "react";
import { Search, X, ChevronDown } from "lucide-react";
import logoImg from "@/assets/logo.png";
import bannerFooterImg from "@/assets/banner-footer.webp";
import { useTranslation } from "@/i18n/useTranslation";
import { productCategories, serviceCategories } from "@/data/navigationData";
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
    <div className="fixed inset-0 z-50 flex flex-col bg-[#eef3f7] text-[#1a2328] overflow-y-auto animate-overlayFadeIn">
      <div className="flex-1 flex flex-col justify-between max-w-xl mx-auto w-full relative animate-slideInRightToLeft">
        {/* Top Header Row inside Overlay */}
        <div className="py-3 px-5 border-b border-border/40 w-full">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center">
              <img
                src={logoImg}
                alt="EcoReve Logo"
                className="h-8 md:h-9 w-auto object-contain cursor-pointer drop-shadow-sm"
                onClick={() => {
                  onNavigate("Home");
                  onClose();
                }}
              />
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close navigation menu"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#005883] text-white shadow-md transition-transform active:scale-95 hover:bg-[#008193]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Main Content Body inside Overlay */}
        <div className="px-5 py-5 flex-1 flex flex-col justify-between w-full">
          <div>
            {/* Search Bar Row (Pill Input with Circle Search Icon) */}
            <div className="relative mt-2 w-full">
              <input
                type="text"
                placeholder={t.nav.searchPlaceholder}
                className="w-full rounded-full bg-white px-5 py-3 text-xs text-foreground placeholder:text-muted-foreground outline-none border border-border/60 shadow-sm pr-12 focus:ring-2 focus:ring-[#005883]/30"
              />
              <button
                type="button"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-[#005883] text-white shadow-md hover:bg-[#008193] transition-colors"
              >
                <Search className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Clean Professional Navigation Section */}
            <div className="mt-6 space-y-6">
              {/* Main Pill Tabs Row */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => {
                    onNavigate("Home");
                    onClose();
                  }}
                  className={`rounded-full px-4 py-2 transition-all ${
                    activeNav === "Home"
                      ? "bg-[#005883] text-white font-bold shadow-sm"
                      : "bg-white text-[#1a2328] hover:text-[#005883] border border-border/50"
                  }`}
                >
                  {t.nav.home}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileProductsOpen(!mobileProductsOpen);
                    setMobileServiceOpen(false);
                  }}
                  className={`flex items-center gap-1.5 rounded-full px-4 py-2 transition-all ${
                    activeNav.startsWith("Products") || mobileProductsOpen
                      ? "bg-[#005883] text-white font-bold shadow-sm"
                      : "bg-white text-[#1a2328] hover:text-[#005883] border border-border/50"
                  }`}
                >
                  <span>{t.nav.products}</span>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${mobileProductsOpen ? "rotate-180" : ""}`} />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onNavigate("About us");
                    onClose();
                  }}
                  className={`rounded-full px-4 py-2 transition-all ${
                    activeNav === "About us"
                      ? "bg-[#005883] text-white font-bold shadow-sm"
                      : "bg-white text-[#1a2328] hover:text-[#005883] border border-border/50"
                  }`}
                >
                  {t.nav.aboutUs}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileServiceOpen(!mobileServiceOpen);
                    setMobileProductsOpen(false);
                  }}
                  className={`flex items-center gap-1.5 rounded-full px-4 py-2 transition-all ${
                    activeNav.startsWith("Service") || mobileServiceOpen
                      ? "bg-[#005883] text-white font-bold shadow-sm"
                      : "bg-white text-[#1a2328] hover:text-[#005883] border border-border/50"
                  }`}
                >
                  <span>{t.nav.service}</span>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${mobileServiceOpen ? "rotate-180" : ""}`} />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onNavigate("News");
                    onClose();
                  }}
                  className={`rounded-full px-4 py-2 transition-all ${
                    activeNav === "News"
                      ? "bg-[#005883] text-white font-bold shadow-sm"
                      : "bg-white text-[#1a2328] hover:text-[#005883] border border-border/50"
                  }`}
                >
                  {t.nav.news}
                </button>
              </div>

              {/* Expandable Full-Width Clean Products Dropdown Panel */}
              {mobileProductsOpen && (
                <div className="p-4 rounded-2xl bg-white shadow-md border border-border/60 animate-fadeIn space-y-4">
                  <div className="flex items-center justify-between border-b border-border/60 pb-2">
                    <h4 className="text-xs font-extrabold text-[#005883] uppercase tracking-wider">
                      Product Catalog Categories
                    </h4>
                    <button
                      type="button"
                      onClick={() => setMobileProductsOpen(false)}
                      className="text-[10px] text-muted-foreground hover:text-black font-bold"
                    >
                      Close ✕
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    {productCategories.map((cat) => (
                      <div key={cat.category} className="space-y-1.5">
                        <p className="font-bold text-[#005883] text-[11px] uppercase tracking-wider">
                          {cat.category}
                        </p>
                        <div className="space-y-1 text-muted-foreground">
                          {cat.items.map((item) => (
                            <a
                              key={item}
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                onNavigate(`Products - ${item}`);
                                onClose();
                              }}
                              className="block py-0.5 hover:text-black hover:font-bold transition-colors"
                            >
                              {item}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Expandable Full-Width Clean Service Dropdown Panel */}
              {mobileServiceOpen && (
                <div className="p-4 rounded-2xl bg-white shadow-md border border-border/60 animate-fadeIn space-y-3">
                  <div className="flex items-center justify-between border-b border-border/60 pb-2">
                    <h4 className="text-xs font-extrabold text-[#005883] uppercase tracking-wider">
                      Our Technical Services
                    </h4>
                    <button
                      type="button"
                      onClick={() => setMobileServiceOpen(false)}
                      className="text-[10px] text-muted-foreground hover:text-black font-bold"
                    >
                      Close ✕
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {serviceCategories.map((srv) => (
                      <a
                        key={srv.title}
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate(`Service - ${srv.title}`);
                          onClose();
                        }}
                        className="p-2.5 rounded-xl bg-secondary/50 hover:bg-[#eef3f7] group block transition-colors border border-border/30"
                      >
                        <p className="font-bold text-[#005883] group-hover:text-black transition-colors">{srv.title}</p>
                        <p className="text-[11px] text-muted-foreground group-hover:text-black/80 leading-tight mt-0.5">{srv.desc}</p>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Links Section */}
              <div className="pt-2 border-t border-border/40">
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Quick Navigation</p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-[#1a2328]">
                  <a href="#why" onClick={onClose} className="hover:text-[#005883] transition-colors py-0.5">{t.nav.whyEcoReve}</a>
                  <a href="#solutions" onClick={onClose} className="hover:text-[#005883] transition-colors py-0.5">{t.nav.waterSolutions}</a>
                  <a href="#demonstration" onClick={onClose} className="hover:text-[#005883] transition-colors py-0.5">{t.nav.systemDemos}</a>
                  <a href="#consultation" onClick={onClose} className="hover:text-[#005883] transition-colors py-0.5">{t.nav.consultation}</a>
                  <button
                    type="button"
                    onClick={() => {
                      onNavigate("Contact");
                      onClose();
                    }}
                    className="hover:text-[#005883] transition-colors text-left py-0.5 font-bold"
                  >
                    {t.nav.contact}
                  </button>
                </div>
              </div>
            </div>

            {/* Dark/Grey Professional Footer Card (Clean Version) */}
            <div className="mt-6 overflow-hidden rounded-2xl bg-[#1a2328] text-white p-5 shadow-xl border border-white/10 w-full">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#008193]">
                    {t.footer.equipmentLabel}
                  </h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-white/90 font-medium">
                    {t.footer.commitmentText}
                  </p>
                </div>
                <div className="relative h-24 w-full sm:w-32 shrink-0 overflow-hidden rounded-xl bg-white/5 border border-white/10 shadow-md">
                  <img
                    src={bannerFooterImg}
                    alt="EcoReve Water Protection Equipment"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Fullscreen Overlay Bottom Footer */}
          <div className="pt-4 border-t border-border/50 mt-6 flex items-center justify-between gap-4 w-full">
            <div>
              <p className="text-[11px] font-bold text-[#1a2328] mb-2">{t.footer.followUs}</p>
              <div className="flex items-center gap-2">
                <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-[#005883] text-white hover:bg-[#008193] transition-colors shadow-sm">
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </a>
                <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-[#005883] text-white hover:bg-[#008193] transition-colors shadow-sm">
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                </a>
                <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-[#005883] text-white hover:bg-[#008193] transition-colors shadow-sm">
                  <X className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* In-Drawer Language Switcher Dropdown */}
            <LanguageDropdown
              dropDirection="up"
              open={openLangDropdown}
              onToggle={() => setOpenLangDropdown(!openLangDropdown)}
              onClose={() => setOpenLangDropdown(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
