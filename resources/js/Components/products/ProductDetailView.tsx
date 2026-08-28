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
import { getTrans } from "@/utils/transHelper";

export interface ProductDetailProps {
  product?: any;
  onBack?: () => void;
}

export const ProductDetailView: React.FC<ProductDetailProps> = ({
  product,
  onBack,
}) => {
  const { t, currentLanguage } = useTranslation();
  // Default product fallback if opened directly
  const activeProduct = product || {
    id: "demin-plant",
    name: "The Demineralizer",
    categoryTitle: "Water Treatment Series",
    description:
      "High-capacity dual-bed ion exchange demineralizer removing silica (SiO₂) and dissolved ions down to 0.05 µS/cm conductivity.",
    image: heroBannerImg,
    rating: "4.9/5",
    ratingCount: "based on 9649 plant audits",
    badgeText: "ISO 9001 Verified®",
    priceLabel: "SKID LEASE RATE",
    price: "Starting at $950/month",
    note: "A shipment typically lasts one month of heavy industrial plant operation",
    specs: [
      { label: "Capacity", value: "50 - 500 m³/h" },
      { label: "Purity Conductivity", value: "< 0.1 µS/cm" },
      { label: "Silica Leakage", value: "< 0.02 mg/L" },
      { label: "Control System", value: "Siemens S7-1500 PLC" },
    ],
  };

  // Thumbnail List for Interactive Gallery
  const rawThumbnails = (activeProduct.galleryImages && Array.isArray(activeProduct.galleryImages) && activeProduct.galleryImages.length > 0)
    ? activeProduct.galleryImages
    : (activeProduct.image ? [activeProduct.image] : [heroBannerImg]);

  const validThumbnails = Array.from(new Set(rawThumbnails.filter((img: string) => Boolean(img))));

  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number>(0);
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    size: false,
    materials: false,
    why: false,
    warranty: false,
  });

  // Dynamic Size / Capacity Options from DB or Fallback
  const defaultSizeOptions = [
    { title: "N or N+1", subtext: "Under 50 m³/h" },
    { title: "1", subtext: "50-100 m³/h" },
    { title: "2", subtext: "100-250 m³/h" },
    { title: "3", subtext: "250-500 m³/h" },
    { title: "4", subtext: "500-1,000 m³/h" },
    { title: "5", subtext: "1,000-2,000 m³/h" },
    { title: "6", subtext: "2,000-5,000 m³/h" },
    { title: "7", subtext: "Custom OEM Skid" },
  ];

  const sizeOptions = (activeProduct.options && Array.isArray(activeProduct.options) && activeProduct.options.length > 0)
    ? activeProduct.options.map((opt: any) => ({
        title: getTrans(opt.title || opt.name, currentLanguage) || "Option",
        subtext: getTrans(opt.sub || opt.range, currentLanguage) || "Standard",
      }))
    : defaultSizeOptions;

  return (
    <div className="w-full bg-background text-foreground pt-4 pb-8 px-4 sm:px-6 md:px-8">
      <div className="mx-auto max-w-[1320px] space-y-5">
        
        {/* Clean Natural Breadcrumb Navigation Bar */}
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
            {t.productDetailUI.backToProducts || t.nav.products}
          </button>

          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />

          <span className="font-bold text-foreground truncate max-w-[280px] sm:max-w-md">
            {getTrans(activeProduct.name, currentLanguage)}
          </span>
        </nav>
        
        {/* MAIN PRODUCT DETAIL GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 50% COLUMN */}
          <div className="lg:col-span-6 lg:sticky lg:top-28 self-start flex gap-4 items-start">
            {validThumbnails.length > 1 && (
              <div className="flex flex-col gap-3 shrink-0">
                {validThumbnails.map((imgSrc: string, idx: number) => {
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
                        src={imgSrc || heroBannerImg}
                        alt={`Thumbnail ${idx + 1}`}
                        onError={(e) => {
                          (e.target as HTMLElement).parentElement?.remove();
                        }}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}

            <div className="relative flex-1 aspect-square rounded-2xl bg-[#dbe8f5] dark:bg-[#112330] overflow-hidden border border-border/40 shadow-sm group">
              <img
                src={validThumbnails[selectedImageIndex] || activeProduct.image || heroBannerImg}
                alt={getTrans(activeProduct.name, currentLanguage)}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* RIGHT 50% COLUMN */}
          <div className="lg:col-span-6 space-y-6 pt-1">
            <div className="text-center sm:text-left space-y-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0f1c24] dark:text-white leading-none">
                {getTrans(activeProduct.name, currentLanguage)}
              </h1>
            </div>

            {/* Rating Stars & Verification Tag */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs">
              <div className="flex items-center gap-1 text-foreground font-bold">
                <div className="flex text-black dark:text-white">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <span>{activeProduct.rating || "4.9/5"}</span>
              </div>
              {activeProduct.ratingCount && (
                <span className="text-muted-foreground font-medium">
                  {getTrans(activeProduct.ratingCount, currentLanguage) || t.productDetailUI.basedOnAudits}
                </span>
              )}
              {activeProduct.badgeText && (
                <span className="rounded-md bg-secondary border border-border/80 px-2.5 py-0.5 text-[10px] font-mono font-bold text-foreground">
                  {getTrans(activeProduct.badgeText, currentLanguage)}
                </span>
              )}
            </div>

            {/* Clean Corporate Product Brief Preview Description */}
            <div className="space-y-2.5 pt-1 border-y border-border/50 py-3.5">
              <p className="text-xs sm:text-sm font-medium text-foreground/90 leading-relaxed">
                {getTrans(activeProduct.fullDesc || activeProduct.description, currentLanguage)}
              </p>
              {(activeProduct.priceLabel || activeProduct.price) && (
                <div className="flex items-center justify-between text-xs pt-1">
                  {activeProduct.priceLabel && (
                    <span className="font-bold text-muted-foreground uppercase text-[10px] tracking-wider">
                      {getTrans(activeProduct.priceLabel, currentLanguage)}
                    </span>
                  )}
                  {activeProduct.price && (
                    <span className="font-mono font-extrabold text-[#005883] dark:text-sky-400 text-sm">
                      {getTrans(activeProduct.price, currentLanguage)}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* CAPACITY / SIZE SELECTION GRID (Only show if DB options exist) */}
            {activeProduct.options && Array.isArray(activeProduct.options) && activeProduct.options.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-foreground">
                    {t.productDetailUI.pickCapacity || "Pick your capacity"}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {sizeOptions.map((opt: any, idx: number) => {
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
            )}

            {/* Shipment / Operation Guarantee Note */}
            {activeProduct.note && (
              <p className="text-center text-xs font-medium text-muted-foreground pt-1">
                {getTrans(activeProduct.note, currentLanguage)}
              </p>
            )}

            {/* LARGE PRIMARY ACTION BUTTON */}
            <button className="w-full rounded-full bg-[#e2e8f0] dark:bg-secondary text-[#0f1c24] dark:text-white hover:bg-[#005883] hover:text-white py-4 text-xs font-mono font-extrabold uppercase tracking-wider transition-all shadow-xs cursor-pointer active:scale-[0.99]">
              {t.productDetailUI.requestQuotationBtn || "Request Quotation & Technical Inquiry"}
            </button>

            {/* COLLAPSIBLE ACCORDION INFORMATION GROUP (Only show if accordions exist in DB) */}
            {activeProduct.accordions && Array.isArray(activeProduct.accordions) && activeProduct.accordions.length > 0 && (
              <div className="pt-4 border-t border-border/60 divide-y divide-border/60">
                {activeProduct.accordions.map((acc: any, idx: number) => {
                  const accKey = `acc_${idx}`;
                  const isOpen = Boolean(openAccordions[accKey]);
                  const title = typeof acc.title === "object" ? (acc.title[currentLanguage] || acc.title.en) : (acc.title || `Section ${idx + 1}`);
                  const content = typeof acc.content === "object" ? (acc.content[currentLanguage] || acc.content.en) : (acc.content || "");

                  return (
                    <div key={idx} className="py-4">
                      <button
                        onClick={() => setOpenAccordions((prev) => ({ ...prev, [accKey]: !prev[accKey] }))}
                        className="w-full flex items-center justify-between text-left group cursor-pointer"
                      >
                        <span className="text-sm font-semibold text-foreground group-hover:text-[#005883] transition-colors">
                          {title}
                        </span>
                        <span className="text-xl font-light text-foreground/80 group-hover:text-[#005883] transition-colors">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>
                      <div
                        className={`grid transition-all duration-300 ease-in-out ${
                          isOpen
                            ? "grid-rows-[1fr] opacity-100 mt-3"
                            : "grid-rows-[0fr] opacity-0 mt-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">
                            {content}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
