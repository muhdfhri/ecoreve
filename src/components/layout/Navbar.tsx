import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import logoImg from "@/assets/logo.png";
import { useTranslation } from "@/i18n/useTranslation";
import { productCategories, serviceCategories } from "@/data/navigationData";
import { LanguageDropdown } from "./LanguageDropdown";

interface NavbarProps {
  activeNav: string;
  onNavigate: (pageName: string) => void;
  onOpenMobileMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeNav,
  onNavigate,
  onOpenMobileMenu,
}) => {
  const { t } = useTranslation();
  const [openDropdown, setOpenDropdown] = useState<"products" | "service" | null>(null);
  const [openLangDropdown, setOpenLangDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-50 py-3 bg-transparent transition-all">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5">
        {/* Left Brand Logo */}
        <div className="flex items-center gap-3">
          <img
            src={logoImg}
            alt="EcoReve Logo"
            className="h-8 md:h-9 w-auto object-contain cursor-pointer drop-shadow-sm"
            onClick={() => onNavigate("Home")}
          />
        </div>

        {/* Center Desktop Navigation Pill Bar */}
        <ul className="hidden lg:flex items-center gap-1.5 rounded-full bg-card/90 px-4 py-2 text-xs shadow-lg backdrop-blur-md border border-border">
          <li
            className={`cursor-pointer transition-all duration-300 rounded-full px-4 py-1.5 font-semibold ${
              activeNav === "Home"
                ? "bg-[#005883] text-white shadow-sm"
                : "text-foreground hover:text-primary"
            }`}
            onClick={() => onNavigate("Home")}
          >
            {t.nav.home}
          </li>

          {/* Products with Dropdown */}
          <li
            className={`relative flex items-center gap-1 cursor-pointer transition-all duration-300 rounded-full px-4 py-1.5 font-semibold group ${
              activeNav.startsWith("Products")
                ? "bg-[#005883] text-white shadow-sm"
                : "text-foreground hover:text-primary"
            }`}
            onMouseEnter={() => setOpenDropdown("products")}
            onMouseLeave={() => setOpenDropdown(null)}
            onClick={() => onNavigate("Products")}
          >
            <span>{t.nav.products}</span>
            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${openDropdown === "products" ? "rotate-180" : ""}`} />

            {/* Products Dropdown Popup */}
            {openDropdown === "products" && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[620px] z-50">
                <div className="rounded-3xl bg-card/98 p-6 shadow-2xl border border-border backdrop-blur-xl grid grid-cols-2 gap-x-8 gap-y-6 text-left">
                  {productCategories.map((cat) => (
                    <div key={cat.category} className="space-y-2">
                      <div className="border-b border-border/80 pb-1.5">
                        <h4 className="text-[11px] font-bold tracking-wider text-primary uppercase">
                          {cat.category}
                        </h4>
                      </div>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        {cat.items.map((item) => (
                          <li key={item}>
                            <a
                              href="#"
                              className="hover:text-black hover:font-bold hover:translate-x-1 transition-all inline-block py-0.5 font-medium"
                              onClick={(e) => {
                                e.stopPropagation();
                                onNavigate(`Products - ${item}`);
                              }}
                            >
                              {item}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </li>

          <li
            className={`cursor-pointer transition-all duration-300 rounded-full px-4 py-1.5 font-semibold ${
              activeNav === "About us"
                ? "bg-[#005883] text-white shadow-sm"
                : "text-foreground hover:text-primary"
            }`}
            onClick={() => onNavigate("About us")}
          >
            {t.nav.aboutUs}
          </li>

          {/* Service with Dropdown */}
          <li
            className={`relative flex items-center gap-1 cursor-pointer transition-all duration-300 rounded-full px-4 py-1.5 font-semibold group ${
              activeNav.startsWith("Service")
                ? "bg-[#005883] text-white shadow-sm"
                : "text-foreground hover:text-primary"
            }`}
            onMouseEnter={() => setOpenDropdown("service")}
            onMouseLeave={() => setOpenDropdown(null)}
            onClick={() => onNavigate("Service")}
          >
            <span>{t.nav.service}</span>
            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${openDropdown === "service" ? "rotate-180" : ""}`} />

            {/* Service Dropdown Popup */}
            {openDropdown === "service" && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[460px] z-50">
                <div className="rounded-3xl bg-card/98 p-4 shadow-2xl border border-border backdrop-blur-xl space-y-1 text-left">
                  {serviceCategories.map((srv) => (
                    <a
                      key={srv.title}
                      href="#"
                      className="group flex flex-col p-2.5 rounded-2xl hover:bg-secondary transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate(`Service - ${srv.title}`);
                      }}
                    >
                      <span className="text-xs font-semibold text-foreground group-hover:text-black transition-colors">
                        {srv.title}
                      </span>
                      <span className="text-[11px] text-muted-foreground group-hover:text-black/80 leading-tight mt-0.5">
                        {srv.desc}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </li>

          <li
            className={`cursor-pointer transition-all duration-300 rounded-full px-4 py-1.5 font-semibold ${
              activeNav === "News"
                ? "bg-[#005883] text-white shadow-sm"
                : "text-foreground hover:text-primary"
            }`}
            onClick={() => onNavigate("News")}
          >
            {t.nav.news}
          </li>
          <li
            className={`cursor-pointer transition-all duration-300 rounded-full px-4 py-1.5 font-semibold ${
              activeNav === "Contact"
                ? "bg-[#005883] text-white shadow-sm"
                : "text-foreground hover:text-primary"
            }`}
            onClick={() => onNavigate("Contact")}
          >
            {t.nav.contact}
          </li>

          {/* Search Input inside navbar */}
          <li className="flex items-center gap-2 pl-2 border-l border-border/80">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search..."
                className="w-24 focus:w-32 transition-all duration-300 rounded-full bg-secondary/80 pl-7 pr-3 py-1 text-[11px] text-foreground placeholder:text-muted-foreground outline-none border border-transparent focus:border-primary/50"
              />
              <Search className="absolute left-2.5 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            </div>
          </li>
        </ul>

        {/* Right Language Selector & Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2">
          {/* Language Selector Dropdown (Visible on Desktop Wide Breakpoint Only) */}
          <LanguageDropdown
            className="hidden lg:block"
            open={openLangDropdown}
            onToggle={() => setOpenLangDropdown(!openLangDropdown)}
            onClose={() => setOpenLangDropdown(false)}
          />

          {/* Mobile / Tablet Circular Hamburger Button (In Primary #005883 Color) */}
          <button
            type="button"
            onClick={onOpenMobileMenu}
            aria-label="Open navigation menu"
            className="flex lg:hidden h-10 w-10 items-center justify-center rounded-full bg-[#005883] text-white shadow-md transition-transform active:scale-95 hover:bg-[#008193]"
          >
            <div className="flex flex-col gap-1 items-center justify-center">
              <span className="h-0.5 w-4 bg-white rounded-full" />
              <span className="h-0.5 w-3 bg-white rounded-full self-start" />
              <span className="h-0.5 w-4 bg-white rounded-full" />
            </div>
          </button>
        </div>
      </nav>
    </header>
  );
};
