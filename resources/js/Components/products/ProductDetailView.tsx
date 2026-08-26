import React, { useState } from "react";
import {
  ArrowLeft,
  Check,
  Star,
  ShieldCheck,
  Zap,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Award,
  Home,
} from "lucide-react";
import heroBannerImg from "@/assets/hero-banner.webp";
import heroFooterImg from "@/assets/hero-footer.webp";
import { useTranslation } from "@/i18n/useTranslation";

export interface ProductDetailProps {
  product?: {
    id: string;
    name: string;
    categoryTitle: string;
    description: string;
    image: string;
    specs: { label: string; value: string }[];
  };
  onBack?: () => void;
}

export const ProductDetailView: React.FC<ProductDetailProps> = ({
  product,
  onBack,
}) => {
  const { t } = useTranslation();
  // Default product fallback if opened directly
  const activeProduct = product || {
    id: "demin-plant",
    name: "The Demineralizer",
    categoryTitle: "Water Treatment Series",
    description:
      "High-capacity dual-bed ion exchange demineralizer removing silica (SiO₂) and dissolved ions down to 0.05 µS/cm conductivity.",
    image: heroBannerImg,
    specs: [
      { label: "Capacity", value: "50 - 500 m³/h" },
      { label: "Purity Conductivity", value: "< 0.1 µS/cm" },
      { label: "Silica Leakage", value: "< 0.02 mg/L" },
      { label: "Control System", value: "Siemens S7-1500 PLC" },
    ],
  };

  // Thumbnail List for Interactive Gallery (Matching Left Column of Reference)
  const thumbnails = [
    activeProduct.image,
    heroFooterImg,
    heroBannerImg,
    heroFooterImg,
    heroBannerImg,
    heroFooterImg,
  ];

  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number>(0);
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    size: false,
    materials: false,
    why: false,
    warranty: false,
  });

  // Size / Capacity Options (Matching Reference 2x4 Grid Layout)
  const sizeOptions = [
    { title: "N or N+1", subtext: "Under 50 m³/h" },
    { title: "1", subtext: "50-100 m³/h" },
    { title: "2", subtext: "100-250 m³/h" },
    { title: "3", subtext: "250-500 m³/h" },
    { title: "4", subtext: "500-1,000 m³/h" },
    { title: "5", subtext: "1,000-2,000 m³/h" },
    { title: "6", subtext: "2,000-5,000 m³/h" },
    { title: "7", subtext: "Custom OEM Skid" },
  ];

  return (
    <div className="w-full bg-background text-foreground pt-4 pb-8 px-4 sm:px-6 md:px-8">
      <div className="mx-auto max-w-[1320px] space-y-5">
        
        {/* Clean Natural Breadcrumb Navigation Bar (Without artificial border divider) */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm font-sans font-medium text-muted-foreground pt-1 pb-1">
          <button
            onClick={onBack}
            className="hover:text-foreground transition-colors flex items-center gap-1 cursor-pointer"
            title="Home / Products"
          >
            <Home className="h-4 w-4 shrink-0 text-[#005883] dark:text-sky-400" />
          </button>

          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />

          <button
            onClick={onBack}
            className="hover:text-[#005883] dark:hover:text-sky-400 transition-colors font-semibold underline underline-offset-4 decoration-border hover:decoration-[#005883] cursor-pointer"
          >
            {t.nav.products}
          </button>

          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />

          <span className="font-bold text-foreground truncate max-w-[280px] sm:max-w-md">
            {activeProduct.name}
          </span>
        </nav>
        
        {/* MAIN PRODUCT DETAIL GRID (Left 50% Image Gallery + Right 50% Info/Selector Panel) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 50% COLUMN: Vertical Thumbnail Bar + Main Product Image Canvas (Sticky on Desktop Scroll) */}
          <div className="lg:col-span-6 lg:sticky lg:top-28 self-start flex gap-4 items-start">
            
            {/* Far Left Vertical Thumbnail Strip (Matching Reference 100%) */}
            <div className="flex flex-col gap-3 shrink-0">
              {thumbnails.map((imgSrc, idx) => {
                const isSelected = selectedImageIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-muted ${
                      isSelected
                        ? "border-[#005883] dark:border-sky-400 ring-2 ring-[#005883]/20 shadow-sm scale-105"
                        : "border-border/70 hover:border-black/50 dark:hover:border-white/50 opacity-80 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={imgSrc}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {idx === 0 && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-white/90 flex items-center justify-center">
                          <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-6 border-l-black ml-0.5" />
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Main Product Canvas Display (1:1 Aspect Ratio 1024x1024 Full Bleed Canvas) */}
            <div className="relative flex-1 aspect-square rounded-2xl bg-[#dbe8f5] dark:bg-[#112330] overflow-hidden border border-border/40 shadow-sm group">
              
              {/* Main Product Image (Full Cover 100% Fit Without Gaps) */}
              <img
                src={thumbnails[selectedImageIndex]}
                alt={activeProduct.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

          </div>

          {/* RIGHT 50% COLUMN: Product Info & Configuration Selector Panel */}
          <div className="lg:col-span-6 space-y-6 pt-1">
            
            {/* Header Title & Subtitle (Matching Reference Font Hierarchy 100%) */}
            <div className="text-center sm:text-left space-y-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0f1c24] dark:text-white leading-none">
                {activeProduct.name}
              </h1>
            </div>

            {/* Rating Stars & Verification Tag (Matching Reference 100%) */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs">
              <div className="flex items-center gap-1 text-foreground font-bold">
                <div className="flex text-black dark:text-white">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <span>4.9/5</span>
              </div>
              <span className="text-muted-foreground font-medium">based on 9649 plant audits</span>
              <span className="rounded-md bg-secondary border border-border/80 px-2.5 py-0.5 text-[10px] font-mono font-bold text-foreground">
                ISO 9001 Verified®
              </span>
            </div>

            {/* Clean Corporate Product Brief Preview Description */}
            <div className="space-y-2.5 pt-1 border-y border-border/50 py-3.5">
              <p className="text-xs sm:text-sm font-medium text-foreground/90 leading-relaxed">
                {activeProduct.description || "Mainly used for filtering and purifying industrial water and process fluids, capturing suspended solids through multi-stage membrane filtration, achieving zero liquid discharge separation, meeting strict environmental compliance standards, and recovering valuable process resources."}
              </p>
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="font-bold text-muted-foreground uppercase text-[10px] tracking-wider">Skid Lease Rate</span>
                <span className="font-mono font-extrabold text-[#005883] dark:text-sky-400 text-sm">Starting at $950/month</span>
              </div>
            </div>

            {/* CAPACITY / SIZE SELECTION GRID (Matching Reference 2x4 Box Grid 100%) */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-foreground">Pick your capacity</span>
              </div>

              {/* 2x4 Option Box Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {sizeOptions.map((opt, idx) => {
                  const isSelected = selectedSizeIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedSizeIndex(idx)}
                      className={`rounded-xl p-3 text-left transition-all cursor-pointer flex flex-col justify-between min-h-[64px] ${
                        isSelected
                          ? "bg-card border-2 border-black dark:border-white shadow-xs"
                          : "bg-card border border-border/80 hover:border-black/50 dark:hover:border-white/50"
                      }`}
                    >
                      <span className={`text-xs font-extrabold ${isSelected ? "text-foreground font-black" : "text-foreground"}`}>
                        {opt.title}
                      </span>
                      <span className="text-[10px] font-medium text-muted-foreground">
                        {opt.subtext}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Shipment / Operation Guarantee Note */}
            <p className="text-center text-xs font-medium text-muted-foreground pt-1">
              A shipment typically lasts one month of heavy industrial plant operation
            </p>

            {/* LARGE PRIMARY ACTION BUTTON (Matching Reference Pill Shape Button) */}
            <button className="w-full rounded-full bg-[#e2e8f0] dark:bg-secondary text-[#0f1c24] dark:text-white hover:bg-[#005883] hover:text-white py-4 text-xs font-mono font-extrabold uppercase tracking-wider transition-all shadow-xs cursor-pointer active:scale-[0.99]">
              Choose a Capacity & Request Quotation
            </button>

            {/* COLLAPSIBLE ACCORDION INFORMATION GROUP (Smooth CSS Grid Animation) */}
            <div className="pt-4 border-t border-border/60 divide-y divide-border/60">
              
              {/* Accordion 1: Size + pack details */}
              <div className="py-4">
                <button
                  onClick={() => setOpenAccordions((prev) => ({ ...prev, size: !prev["size"] }))}
                  className="w-full flex items-center justify-between text-left group cursor-pointer"
                >
                  <span className="text-sm font-semibold text-foreground group-hover:text-[#005883] transition-colors">
                    Size + pack details
                  </span>
                  <span className="text-xl font-light text-foreground/80 group-hover:text-[#005883] transition-colors">
                    {openAccordions["size"] ? "−" : "+"}
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    openAccordions["size"]
                      ? "grid-rows-[1fr] opacity-100 mt-3"
                      : "grid-rows-[0fr] opacity-0 mt-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="text-xs text-muted-foreground leading-relaxed space-y-2">
                      <p>
                        Pre-assembled skid frame with dual-bed anion/cation resin columns, Siemens PLC control unit, and quick-connect PN16 flanged manifold.
                      </p>
                      <div className="rounded-xl bg-secondary/60 p-3 border border-border/40 space-y-1 font-mono text-[11px]">
                        <div className="flex justify-between"><span>Dry Weight:</span><span className="font-bold text-foreground">1,200 kg - 4,500 kg</span></div>
                        <div className="flex justify-between"><span>Footprint:</span><span className="font-bold text-foreground">20ft / 40ft Containerized</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accordion 2: Clean ingredients & materials */}
              <div className="py-4">
                <button
                  onClick={() => setOpenAccordions((prev) => ({ ...prev, materials: !prev["materials"] }))}
                  className="w-full flex items-center justify-between text-left group cursor-pointer"
                >
                  <span className="text-sm font-semibold text-foreground group-hover:text-[#005883] transition-colors">
                    Clean materials & specs
                  </span>
                  <span className="text-xl font-light text-foreground/80 group-hover:text-[#005883] transition-colors">
                    {openAccordions["materials"] ? "−" : "+"}
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    openAccordions["materials"]
                      ? "grid-rows-[1fr] opacity-100 mt-3"
                      : "grid-rows-[0fr] opacity-0 mt-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="text-xs text-muted-foreground leading-relaxed space-y-1.5">
                      <p>• 100% corrosion-resistant LLDPE tanks & PVDF/PTFE chemical pump diaphragms.</p>
                      <p>• Duplex Stainless Steel SS316L vessel shell certified for PN16 / PN25 pressure ratings.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accordion 3: Why we love it */}
              <div className="py-4">
                <button
                  onClick={() => setOpenAccordions((prev) => ({ ...prev, why: !prev["why"] }))}
                  className="w-full flex items-center justify-between text-left group cursor-pointer"
                >
                  <span className="text-sm font-semibold text-foreground group-hover:text-[#005883] transition-colors">
                    Why we love it
                  </span>
                  <span className="text-xl font-light text-foreground/80 group-hover:text-[#005883] transition-colors">
                    {openAccordions["why"] ? "−" : "+"}
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    openAccordions["why"]
                      ? "grid-rows-[1fr] opacity-100 mt-3"
                      : "grid-rows-[0fr] opacity-0 mt-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="text-xs text-muted-foreground leading-relaxed space-y-1.5">
                      <p>• Cuts annual chemical dosing consumption by up to 38%.</p>
                      <p>• Zero liquid discharge (ZLD) compliance with real-time SCADA telemetry APIs.</p>
                      <p>• Plug-and-play installation with 24/7 on-site operator training.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accordion 4: Subscriber exclusive benefits & OEM Warranty */}
              <div className="py-4">
                <button
                  onClick={() => setOpenAccordions((prev) => ({ ...prev, warranty: !prev["warranty"] }))}
                  className="w-full flex items-center justify-between text-left group cursor-pointer"
                >
                  <span className="text-sm font-semibold text-foreground group-hover:text-[#005883] transition-colors">
                    Subscriber & OEM exclusive benefits
                  </span>
                  <span className="text-xl font-light text-foreground/80 group-hover:text-[#005883] transition-colors">
                    {openAccordions["warranty"] ? "−" : "+"}
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    openAccordions["warranty"]
                      ? "grid-rows-[1fr] opacity-100 mt-3"
                      : "grid-rows-[0fr] opacity-0 mt-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="text-xs text-muted-foreground leading-relaxed space-y-1.5">
                      <p>Backed by EcoReve's 5-Year Structural Vessel Warranty & 2-Year Full Electronics Telemetry Replacement Guarantee.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
