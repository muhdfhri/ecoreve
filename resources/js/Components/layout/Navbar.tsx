import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Droplets,
  Waves,
  Settings,
  Gauge,
  Cpu,
  Layers,
  Wrench,
  Sliders,
  ShieldCheck,
  X,
} from "lucide-react";
import logoImg from "@/assets/logo.png";
import { useTranslation } from "@/i18n/useTranslation";
import { LanguageDropdown } from "./LanguageDropdown";

interface NavbarProps {
  activeNav: string;
  onNavigate: (pageName: string) => void;
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

interface NavSubItem {
  name: string;
  desc: string;
  link: string;
}

interface NavCategory {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: NavSubItem[];
}

export const Navbar: React.FC<NavbarProps> = ({
  activeNav,
  onNavigate,
  isMobileMenuOpen,
  onToggleMobileMenu,
}) => {
  const { t } = useTranslation();
  const [openDropdown, setOpenDropdown] = useState<"products" | "service" | null>(null);
  const [openLangDropdown, setOpenLangDropdown] = useState(false);

  // Active Category Selection state for Products & Service Mega Menu
  const [activeProductCategory, setActiveProductCategory] = useState<string>("water-treatment");
  const [activeServiceCategory, setActiveServiceCategory] = useState<string>("system-integration");

  // Mobile multi-level menu panel state ("main" | "products" | "service")
  const [mobileActivePanel, setMobileActivePanel] = useState<"main" | "products" | "service">("main");

  // Reset mobile menu panel level when drawer opens or closes
  useEffect(() => {
    if (!isMobileMenuOpen) {
      setMobileActivePanel("main");
    }
  }, [isMobileMenuOpen]);

  // Products Category Data Structure with Clean Outline Icons
  const productCategories: NavCategory[] = [
    {
      id: "water-treatment",
      title: "Water Treatment Series",
      icon: Droplets,
      items: [
        { name: "Demineral Plant", desc: "Anion & Cation High-Purity Exchange", link: "Products - Demineral Plant" },
        { name: "Softener Plant", desc: "Hardness Mineral Removal (Ca²⁺ & Mg²⁺)", link: "Products - Softener Plant" },
        { name: "Mixing Tank / PE Tank", desc: "Chemical Grade High-Density Storage", link: "Products - PE Tank" },
        { name: "Chemical Dosing Pump", desc: "Precision Dosing & Automated Controls", link: "Products - Dosing Pump" },
      ],
    },
    {
      id: "wastewater-pretreatment",
      title: "Wastewater Pre-Treatment",
      icon: Waves,
      items: [
        { name: "DAF (Horizontal Flotation)", desc: "High-Capacity Suspended Solids & Oil Separation", link: "Products - DAF Horizontal" },
        { name: "DAF (Vertical Flotation)", desc: "Compact Footprint High-Rate Flotation Cell", link: "Products - DAF Vertical" },
      ],
    },
    {
      id: "valves-fittings",
      title: "Valves & Fittings",
      icon: Settings,
      items: [
        { name: "High Performance Butterfly Valve", desc: "Zero-Leakage Chemical Grade Control Valve", link: "Products - Butterfly Valve" },
        { name: "Disco Check Valve", desc: "Compact Non-Return Check Valve for Piping", link: "Products - Disco Check Valve" },
        { name: "Swing Check Valve", desc: "Heavy Duty Flanged Backflow Preventer", link: "Products - Swing Check Valve" },
      ],
    },
    {
      id: "measurement-instruments",
      title: "Measurement Instruments",
      icon: Gauge,
      items: [
        { name: "Online Turbidity Meter", desc: "Continuous Water Clarity & Suspended Particle Monitor", link: "Products - Turbidity Meter" },
        { name: "Water Hardness Analyzer", desc: "Real-Time Titration & Hardness Concentration", link: "Products - Water Hardness Analyzer" },
      ],
    },
    {
      id: "automation-sensors",
      title: "Automation & Sensors",
      icon: Cpu,
      items: [
        { name: "Magnetic Flap Level Gauge", desc: "High Visibility Tank Liquid Level Telemetry", link: "Products - Level Gauge" },
        { name: "Silicon Pressure Sensor", desc: "High Accuracy Industrial Diaphragm Transmitter", link: "Products - Pressure Sensor" },
      ],
    },
    {
      id: "desludging-sludge",
      title: "Desludging & Sludge",
      icon: Layers,
      items: [
        { name: "Geotube Sludge Dewatering", desc: "Containerized High-Volume Sludge Dewatering Bag", link: "Products - Geotube" },
      ],
    },
  ];

  // Service Category Data Structure
  const serviceCategories: NavCategory[] = [
    {
      id: "system-integration",
      title: "System Integration",
      icon: Wrench,
      items: [
        { name: "Installation (Instalasi)", desc: "On-Site Mechanical & Piping Engineering", link: "Service - Installation" },
        { name: "Commissioning (Uji Operasional)", desc: "Water Quality Testing & Plant Calibration", link: "Service - Commissioning" },
      ],
    },
    {
      id: "technical-operations",
      title: "Technical Operations",
      icon: Sliders,
      items: [
        { name: "Training (Pelatihan Operator)", desc: "Certified SOP Operator Training & Control APIs", link: "Service - Training" },
      ],
    },
    {
      id: "lifecycle-maintenance",
      title: "Lifecycle Maintenance",
      icon: ShieldCheck,
      items: [
        { name: "Maintenance & Support", desc: "24/7 Telemetry Monitoring & Preventative Repairs", link: "Service - Maintenance" },
        { name: "Spare Parts Supply", desc: "OEM Membranes, Valves & Pump Rebuild Kits", link: "Service - Spare Parts" },
      ],
    },
  ];

  // Guaranteed non-null fallback to prevent TS undefined errors
  const currentProductCat = productCategories.find((c) => c.id === activeProductCategory) ?? productCategories[0];
  const currentServiceCat = serviceCategories.find((c) => c.id === activeServiceCategory) ?? serviceCategories[0];

  return (
    <>
      {/* Background Dark Blur Overlay with Smooth Fade In/Out */}
      <div
        onClick={() => {
          setOpenDropdown(null);
          if (isMobileMenuOpen) onToggleMobileMenu();
        }}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ease-in-out cursor-pointer ${
          openDropdown || isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      <header
        className="sticky top-0 z-50 pt-2.5 pb-1 bg-transparent transition-all"
        onMouseLeave={() => setOpenDropdown(null)}
      >
        <div className="mx-auto max-w-[1440px] px-3 sm:px-6 md:px-8 relative">

          {/* Main Top Header Floating Container */}
          <div
            className={`bg-white dark:bg-card border border-border/80 shadow-md transition-[padding,margin,opacity,box-shadow] duration-300 ease-out ${
              openDropdown
                ? "p-6 md:p-8 rounded-[2.5rem]"
                : isMobileMenuOpen
                ? "px-4 sm:px-6 pt-2 pb-5 rounded-[2rem]"
                : "px-4 sm:px-6 py-2 rounded-full"
            }`}
          >
            {/* Top Bar Header Row (Logo + Center Nav Links + Language Selector + Mobile Toggle) */}
            <div className="flex items-center justify-between gap-2.5 sm:gap-4">
              {/* Left Brand Logo */}
              <div className="flex items-center gap-3 shrink-0">
                <img
                  src={logoImg}
                  alt="EcoReve Logo"
                  className="h-7 sm:h-8 md:h-9 w-auto object-contain cursor-pointer drop-shadow-sm"
                  onClick={() => {
                    setOpenDropdown(null);
                    if (isMobileMenuOpen) onToggleMobileMenu();
                    onNavigate("Home");
                  }}
                />
              </div>

              {/* Center Desktop Navigation Item Links */}
              <ul className="hidden lg:flex items-center gap-1.5 text-xs font-semibold">
                <li
                  className={`cursor-pointer transition-all duration-200 rounded-full px-4 py-2 ${
                    activeNav === "Home" && !openDropdown
                      ? "bg-[#005883] text-white shadow-sm font-bold"
                      : "text-foreground hover:text-primary"
                  }`}
                  onClick={() => {
                    setOpenDropdown(null);
                    onNavigate("Home");
                  }}
                >
                  {t.nav.home}
                </li>

                {/* Products Link with Dropdown */}
                <li
                  className={`relative flex items-center gap-1 cursor-pointer transition-all duration-200 rounded-full px-4 py-2 ${
                    activeNav.startsWith("Products") || openDropdown === "products"
                      ? "bg-[#005883] text-white shadow-sm font-bold"
                      : "text-foreground hover:text-primary"
                  }`}
                  onMouseEnter={() => setOpenDropdown("products")}
                  onClick={() => {
                    setOpenDropdown(null);
                    onNavigate("Products");
                  }}
                >
                  <span>{t.nav.products}</span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      openDropdown === "products" ? "rotate-180" : ""
                    }`}
                  />
                </li>

                {/* Service Link with Dropdown */}
                <li
                  className={`relative flex items-center gap-1 cursor-pointer transition-all duration-200 rounded-full px-4 py-2 ${
                    activeNav.startsWith("Service") || openDropdown === "service"
                      ? "bg-[#005883] text-white shadow-sm font-bold"
                      : "text-foreground hover:text-primary"
                  }`}
                  onMouseEnter={() => setOpenDropdown("service")}
                  onClick={() => {
                    setOpenDropdown(null);
                    onNavigate("Service");
                  }}
                >
                  <span>{t.nav.service}</span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      openDropdown === "service" ? "rotate-180" : ""
                    }`}
                  />
                </li>

                <li
                  className={`cursor-pointer transition-all duration-200 rounded-full px-4 py-2 ${
                    activeNav === "About us" && !openDropdown
                      ? "bg-[#005883] text-white shadow-sm font-bold"
                      : "text-foreground hover:text-primary"
                  }`}
                  onClick={() => {
                    setOpenDropdown(null);
                    onNavigate("About us");
                  }}
                >
                  {t.nav.aboutUs}
                </li>

                <li
                  className={`cursor-pointer transition-all duration-200 rounded-full px-4 py-2 ${
                    activeNav === "News" && !openDropdown
                      ? "bg-[#005883] text-white shadow-sm font-bold"
                      : "text-foreground hover:text-primary"
                  }`}
                  onClick={() => {
                    setOpenDropdown(null);
                    onNavigate("News");
                  }}
                >
                  {t.nav.news}
                </li>

                <li
                  className={`cursor-pointer transition-all duration-200 rounded-full px-4 py-2 ${
                    activeNav === "Contact" && !openDropdown
                      ? "bg-[#005883] text-white shadow-sm font-bold"
                      : "text-foreground hover:text-primary"
                  }`}
                  onClick={() => {
                    setOpenDropdown(null);
                    onNavigate("Contact");
                  }}
                >
                  {t.nav.contact}
                </li>
              </ul>

              {/* Right Controls: Language Selector + Mobile Toggle */}
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                {/* Language Dropdown Selector */}
                <LanguageDropdown
                  open={openLangDropdown}
                  onToggle={() => setOpenLangDropdown(!openLangDropdown)}
                  onClose={() => setOpenLangDropdown(false)}
                />

                {/* Mobile Hamburger / Close Toggle Button */}
                <button
                  type="button"
                  onClick={onToggleMobileMenu}
                  aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                  className={`flex lg:hidden h-9 w-9 items-center justify-center rounded-full shadow-xs transition-all duration-200 active:scale-95 cursor-pointer ${
                    isMobileMenuOpen
                      ? "bg-secondary text-foreground hover:bg-muted"
                      : "bg-[#005883] text-white hover:bg-[#00486e]"
                  }`}
                >
                  {isMobileMenuOpen ? (
                    <X className="h-5 w-5 stroke-[2.5]" />
                  ) : (
                    <div className="flex flex-col gap-1 items-center justify-center">
                      <span className="h-0.5 w-4 bg-white rounded-full" />
                      <span className="h-0.5 w-4 bg-white rounded-full" />
                      <span className="h-0.5 w-4 bg-white rounded-full" />
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* PRODUCTS Mega Menu Panel Content (Desktop Only) */}
            {openDropdown === "products" && (
              <div className="pt-8 mt-6 border-t border-border/60 animate-in fade-in-0 slide-in-from-top-1 duration-200 grid grid-cols-12 gap-8 items-stretch text-left hidden lg:grid">
                {/* Left 8 Columns (Split into Left Category Tabs List + Right Sub-items List) */}
                <div className="col-span-12 lg:col-span-8 grid grid-cols-12 gap-6 border-r border-border/50 pr-4">
                  {/* Left Column (Category Tabs List with Clean Outline Icons) */}
                  <div className="col-span-12 sm:col-span-5 border-r border-border/40 pr-3 space-y-1.5">
                    <p className="text-[10px] font-extrabold tracking-widest text-muted-foreground uppercase mb-3 px-3">
                      {t.nav.categories}
                    </p>
                    {productCategories.map((cat) => {
                      const IconComp = cat.icon;
                      const isActive = activeProductCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setActiveProductCategory(cat.id)}
                          onMouseEnter={() => setActiveProductCategory(cat.id)}
                          className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                            isActive
                              ? "bg-white dark:bg-card border border-border/90 text-foreground font-extrabold shadow-xs"
                              : "border border-transparent text-foreground hover:bg-secondary hover:text-[#005883]"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <IconComp className="h-4.5 w-4.5 shrink-0 text-[#005883] dark:text-sky-400 stroke-[2.2]" />
                            <span className="truncate">{cat.title}</span>
                          </div>
                          <ChevronRight
                            className={`h-3.5 w-3.5 shrink-0 transition-transform ${
                              isActive ? "translate-x-0.5 text-[#005883] dark:text-sky-400" : "opacity-30"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>

                  {/* Right Column (Sub-Items Pure Text List without Arrow Icons) */}
                  <div className="col-span-12 sm:col-span-7 pl-1 space-y-4">
                    {/* Header Row */}
                    <div className="flex items-center justify-between border-b border-border/40 pb-2.5">
                      <h3 className="text-sm font-extrabold text-foreground tracking-tight">
                        {currentProductCat?.title}
                      </h3>
                      <button
                        onClick={() => {
                          setOpenDropdown(null);
                          onNavigate("Products");
                        }}
                        className="text-[10px] font-extrabold tracking-wider text-[#005883] dark:text-sky-400 uppercase hover:underline cursor-pointer border border-[#005883]/30 px-3 py-1 rounded-md hover:bg-[#005883]/10 transition-all"
                      >
                        {t.common.viewAll}
                      </button>
                    </div>

                    {/* Sub-Items Clean Text-Only List */}
                    <div className="space-y-1.5 max-h-[340px] overflow-y-auto pr-1">
                      {currentProductCat?.items.map((item) => (
                        <a
                          key={item.name}
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setOpenDropdown(null);
                            onNavigate(item.link);
                          }}
                          className="group block p-2.5 rounded-xl hover:bg-[#005883]/10 dark:hover:bg-[#005883]/20 border border-transparent hover:border-[#005883]/30 transition-all cursor-pointer"
                        >
                          <div className="space-y-0.5 text-left">
                            <h4 className="text-xs font-extrabold text-foreground group-hover:text-[#005883] dark:group-hover:text-sky-400 transition-colors">
                              {item.name}
                            </h4>
                            <p className="text-[11px] text-muted-foreground leading-snug line-clamp-1">
                              {item.desc}
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Featured Visual Portal Banner Card */}
                <div className="col-span-12 lg:col-span-4 rounded-[2rem] bg-[#0d222e] text-white p-7 flex flex-col justify-between relative overflow-hidden shadow-xl border border-white/10 group min-h-[300px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#005883] via-[#008193]/50 to-[#08131a] z-0" />
                  <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-[#008193]/50 blur-3xl z-0" />

                  <div className="relative z-10">
                    <span className="inline-block rounded-full bg-white/20 px-3.5 py-1 text-[10px] font-extrabold tracking-wider text-white border border-white/30 backdrop-blur uppercase">
                      ECOREVE PORTAL
                    </span>
                    <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight mt-6">
                      {t.nav.portalTitle}
                    </h3>
                    <p className="mt-3 text-xs text-white/80 leading-relaxed max-w-xs">
                      {t.nav.portalSubtitle}
                    </p>
                  </div>

                  <div className="relative z-10 mt-8">
                    <button
                      onClick={() => {
                        setOpenDropdown(null);
                        onNavigate("Contact");
                      }}
                      className="w-full flex items-center justify-between rounded-full bg-white text-black px-6 py-3.5 text-xs font-bold shadow-lg transition-transform group-hover:scale-[1.02] active:scale-95 cursor-pointer"
                    >
                      <span>{t.nav.requestCatalog}</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SERVICE Mega Menu Panel Content (Desktop Only) */}
            {openDropdown === "service" && (
              <div className="pt-8 mt-6 border-t border-border/60 animate-in fade-in-0 slide-in-from-top-1 duration-200 grid grid-cols-12 gap-8 items-stretch text-left hidden lg:grid">
                {/* Left 8 Columns (Split into Left Category Tabs List + Right Sub-items List) */}
                <div className="col-span-12 lg:col-span-8 grid grid-cols-12 gap-6 border-r border-border/50 pr-4">
                  {/* Left Column (Category Tabs List with Clean Outline Icons) */}
                  <div className="col-span-12 sm:col-span-5 border-r border-border/40 pr-3 space-y-1.5">
                    <p className="text-[10px] font-extrabold tracking-widest text-muted-foreground uppercase mb-3 px-3">
                      {t.nav.serviceCategories}
                    </p>
                    {serviceCategories.map((cat) => {
                      const IconComp = cat.icon;
                      const isActive = activeServiceCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setActiveServiceCategory(cat.id)}
                          onMouseEnter={() => setActiveServiceCategory(cat.id)}
                          className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                            isActive
                              ? "bg-white dark:bg-card border border-border/90 text-foreground font-extrabold shadow-xs"
                              : "border border-transparent text-foreground hover:bg-secondary hover:text-[#005883]"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <IconComp className="h-4.5 w-4.5 shrink-0 text-[#005883] dark:text-sky-400 stroke-[2.2]" />
                            <span className="truncate">{cat.title}</span>
                          </div>
                          <ChevronRight
                            className={`h-3.5 w-3.5 shrink-0 transition-transform ${
                              isActive ? "translate-x-0.5 text-[#005883] dark:text-sky-400" : "opacity-30"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>

                  {/* Right Column (Sub-Items Pure Text List without Arrow Icons) */}
                  <div className="col-span-12 sm:col-span-7 pl-1 space-y-4">
                    {/* Header Row */}
                    <div className="flex items-center justify-between border-b border-border/40 pb-2.5">
                      <h3 className="text-sm font-extrabold text-foreground tracking-tight">
                        {currentServiceCat?.title}
                      </h3>
                      <button
                        onClick={() => {
                          setOpenDropdown(null);
                          onNavigate("Service");
                        }}
                        className="text-[10px] font-extrabold tracking-wider text-[#005883] dark:text-sky-400 uppercase hover:underline cursor-pointer border border-[#005883]/30 px-3 py-1 rounded-md hover:bg-[#005883]/10 transition-all"
                      >
                        {t.common.viewAll}
                      </button>
                    </div>

                    {/* Sub-Items Clean Text-Only List */}
                    <div className="space-y-1.5 max-h-[340px] overflow-y-auto pr-1">
                      {currentServiceCat?.items.map((item) => (
                        <a
                          key={item.name}
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setOpenDropdown(null);
                            onNavigate(item.link);
                          }}
                          className="group block p-2.5 rounded-xl hover:bg-[#005883]/10 dark:hover:bg-[#005883]/20 border border-transparent hover:border-[#005883]/30 transition-all cursor-pointer"
                        >
                          <div className="space-y-0.5 text-left">
                            <h4 className="text-xs font-extrabold text-foreground group-hover:text-[#005883] dark:group-hover:text-sky-400 transition-colors">
                              {item.name}
                            </h4>
                            <p className="text-[11px] text-muted-foreground leading-snug line-clamp-1">
                              {item.desc}
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Featured Visual Portal Banner Card */}
                <div className="col-span-12 lg:col-span-4 rounded-[2rem] bg-[#1a2328] text-white p-7 flex flex-col justify-between relative overflow-hidden shadow-xl border border-white/10 group min-h-[300px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#008193] via-[#005883]/60 to-[#0d222e] z-0" />
                  <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-[#8ec63f]/30 blur-3xl z-0" />

                  <div className="relative z-10">
                    <span className="inline-block rounded-full bg-white/20 px-3.5 py-1 text-[10px] font-extrabold tracking-wider text-white border border-white/30 backdrop-blur uppercase">
                      ENGINEERING SERVICES
                    </span>
                    <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight mt-6">
                      {t.servicesUI.heroBadge}
                    </h3>
                    <p className="mt-3 text-xs text-white/80 leading-relaxed max-w-xs">
                      {t.servicesUI.heroDesc}
                    </p>
                  </div>

                  <div className="relative z-10 mt-8">
                    <button
                      onClick={() => {
                        setOpenDropdown(null);
                        onNavigate("Contact");
                      }}
                      className="w-full flex items-center justify-between rounded-full bg-[#1a2328] text-white px-6 py-3.5 text-xs font-bold shadow-lg transition-transform group-hover:scale-[1.02] active:scale-95 cursor-pointer"
                    >
                      <span>{t.nav.scheduleSupport}</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* MULTI-LEVEL MOBILE MENU CONTAINER (Ultra-Clean Minimal Layout with Proportional Indentation) */}
            <div
              className={`grid transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
                isMobileMenuOpen
                  ? "grid-rows-[1fr] opacity-100 mt-3 pt-3 border-t border-border/40"
                  : "grid-rows-[0fr] opacity-0 mt-0 pt-0 border-t-0"
              }`}
            >
              <div className="overflow-hidden font-sans">
                {/* LEVEL 1: MAIN NAVIGATION LEVEL */}
                {mobileActivePanel === "main" && (
                  <div className="space-y-0.5 text-left animate-in slide-in-from-left-4 fade-in-0 duration-300">
                    {/* Item 1: Products */}
                    <div className="border-b border-border/40">
                      <button
                        type="button"
                        onClick={() => setMobileActivePanel("products")}
                        className="w-full py-3 flex items-center justify-between text-base font-extrabold text-foreground hover:text-[#005883] transition-colors cursor-pointer"
                      >
                        <span>{t.nav.products}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground/70" />
                      </button>
                    </div>

                    {/* Item 2: Service */}
                    <div className="border-b border-border/40">
                      <button
                        type="button"
                        onClick={() => setMobileActivePanel("service")}
                        className="w-full py-3 flex items-center justify-between text-base font-extrabold text-foreground hover:text-[#005883] transition-colors cursor-pointer"
                      >
                        <span>{t.nav.service}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground/70" />
                      </button>
                    </div>

                    {/* Item 3: About Us */}
                    <div className="border-b border-border/40">
                      <button
                        type="button"
                        onClick={() => {
                          onToggleMobileMenu();
                          onNavigate("About us");
                        }}
                        className="w-full py-3 flex items-center justify-between text-base font-extrabold text-foreground hover:text-[#005883] transition-colors cursor-pointer"
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
                          onToggleMobileMenu();
                          onNavigate("News");
                        }}
                        className="w-full py-3 flex items-center justify-between text-base font-extrabold text-foreground hover:text-[#005883] transition-colors cursor-pointer"
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
                          onToggleMobileMenu();
                          onNavigate("Contact");
                        }}
                        className="w-full py-3 flex items-center justify-between text-base font-extrabold text-foreground hover:text-[#005883] transition-colors cursor-pointer"
                      >
                        <span>{t.nav.contact}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground/70" />
                      </button>
                    </div>
                  </div>
                )}

                {/* LEVEL 2: PRODUCTS SUB-MENU PANEL (Clean Outline Icon Header + Gentle Child Indentation) */}
                {mobileActivePanel === "products" && (
                  <div className="space-y-4 text-left animate-in slide-in-from-right-4 fade-in-0 duration-300">
                    {/* Back Button Link */}
                    <button
                      type="button"
                      onClick={() => setMobileActivePanel("main")}
                      className="flex items-center gap-1.5 text-base font-extrabold text-foreground hover:text-[#005883] transition-colors py-1 cursor-pointer"
                    >
                      <ChevronLeft className="h-4.5 w-4.5 text-foreground" />
                      <span>Back</span>
                    </button>

                    {/* Product Categories List */}
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1 pt-1">
                      {productCategories.map((cat) => {
                        const IconComp = cat.icon;
                        return (
                          <div key={cat.id} className="space-y-1">
                            {/* Category Header Row (Clean, minimal outline icon & uppercase header) */}
                            <div className="flex items-center gap-2 pb-1.5 pt-2 border-b border-border/40">
                              <IconComp className="h-4 w-4 shrink-0 text-[#005883] dark:text-sky-400 stroke-[2.2]" />
                              <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
                                {cat.title}
                              </h4>
                            </div>

                            {/* Sub-Items List (Clean gentle indentation) */}
                            <div className="space-y-0.5 pl-3.5 pt-1">
                              {cat.items.map((item) => (
                                <button
                                  key={item.name}
                                  type="button"
                                  onClick={() => {
                                    onToggleMobileMenu();
                                    onNavigate(item.link);
                                  }}
                                  className="w-full text-left py-2 px-3 rounded-xl hover:bg-secondary/70 transition-colors group cursor-pointer"
                                >
                                  <p className="text-sm font-extrabold text-foreground group-hover:text-[#005883] dark:group-hover:text-sky-400 transition-colors">
                                    {item.name}
                                  </p>
                                  <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                                    {item.desc}
                                  </p>
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* LEVEL 2: SERVICE SUB-MENU PANEL (Clean Outline Icon Header + Gentle Child Indentation) */}
                {mobileActivePanel === "service" && (
                  <div className="space-y-4 text-left animate-in slide-in-from-right-4 fade-in-0 duration-300">
                    {/* Back Button Link */}
                    <button
                      type="button"
                      onClick={() => setMobileActivePanel("main")}
                      className="flex items-center gap-1.5 text-base font-extrabold text-foreground hover:text-[#005883] transition-colors py-1 cursor-pointer"
                    >
                      <ChevronLeft className="h-4.5 w-4.5 text-foreground" />
                      <span>Back</span>
                    </button>

                    {/* Service Categories List */}
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1 pt-1">
                      {serviceCategories.map((cat) => {
                        const IconComp = cat.icon;
                        return (
                          <div key={cat.id} className="space-y-1">
                            {/* Category Header Row (Clean, minimal outline icon & uppercase header) */}
                            <div className="flex items-center gap-2 pb-1.5 pt-2 border-b border-border/40">
                              <IconComp className="h-4 w-4 shrink-0 text-[#005883] dark:text-sky-400 stroke-[2.2]" />
                              <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
                                {cat.title}
                              </h4>
                            </div>

                            {/* Sub-Items List (Clean gentle indentation) */}
                            <div className="space-y-0.5 pl-3.5 pt-1">
                              {cat.items.map((item) => (
                                <button
                                  key={item.name}
                                  type="button"
                                  onClick={() => {
                                    onToggleMobileMenu();
                                    onNavigate(item.link);
                                  }}
                                  className="w-full text-left py-2 px-3 rounded-xl hover:bg-secondary/70 transition-colors group cursor-pointer"
                                >
                                  <p className="text-sm font-extrabold text-foreground group-hover:text-[#005883] dark:group-hover:text-sky-400 transition-colors">
                                    {item.name}
                                  </p>
                                  <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                                    {item.desc}
                                  </p>
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>
      </header>
    </>
  );
};