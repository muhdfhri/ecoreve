import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { waterTreatmentCategories } from "@/data/productsData";
import { useTranslation } from "@/i18n/useTranslation";
import { getTrans } from "@/utils/transHelper";
import heroBannerImg from "@/assets/hero-banner.webp";
import { Link } from "@inertiajs/react";

interface SolutionCarouselProps {
  featuredProducts?: any[];
}

export const SolutionCarousel: React.FC<SolutionCarouselProps> = ({ featuredProducts = [] }) => {
  const { t, language } = useTranslation();
  const currentLang = language ? language.toLowerCase() : "id";
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Multi-language Solution Categories Fallback Data
  const fallbackCategories = [
    {
      id: "demin-plant",
      slug: "demin-plant",
      img: waterTreatmentCategories[0]?.img || heroBannerImg,
      tags: [
        JSON.stringify({ en: "Aerator", id: "Aerator", ms: "Aerator", th: "เครื่องเติมอากาศ", zh: "曝气机" }),
        JSON.stringify({ en: "DAF System", id: "Sistem DAF", ms: "Sistem DAF", th: "ระบบ DAF", zh: "溶气气浮系统" }),
      ],
      title: JSON.stringify({
        en: "Water & Wastewater Treatment",
        id: "Pengolahan Air & Air Limbah",
        ms: "Rawatan Air & Air Sisa",
        th: "ระบบบำบัดน้ำและน้ำเสีย",
        zh: "水与废水处理系统"
      }),
      desc: JSON.stringify({
        en: "Comprehensive Solutions for Industrial & Municipal Water Systems",
        id: "Solusi Komprehensif untuk Sistem Air Industri & Kotamadya",
        ms: "Penyelesaian Komprehensif untuk Sistem Air Industri & Perbandaran",
        th: "โซลูชันที่ครอบคลุมสำหรับระบบน้ำในอุตสาหกรรมและเทศบาล",
        zh: "用于工业与市政水处理系统的综合解决方案"
      }),
    },
  ];

  // Map DB featured products or use fallback
  const itemsToRender = featuredProducts && featuredProducts.length > 0
    ? featuredProducts.map((p: any) => {
        let parsedOptions: string[] = [];
        if (p.options) {
          if (Array.isArray(p.options)) parsedOptions = p.options;
          else if (typeof p.options === 'string') {
            try { parsedOptions = JSON.parse(p.options); } catch (e) { parsedOptions = []; }
          }
        }
        
        const tags = parsedOptions.length > 0
          ? parsedOptions.slice(0, 3).map(opt => typeof opt === 'object' ? JSON.stringify(opt) : String(opt))
          : [p.category_title || "Featured Equipment"];

        return {
          id: p.id,
          slug: p.slug || p.id,
          img: p.image_url ? p.image_url.replace('/storage/media/products/', '/assets/products/') : heroBannerImg,
          tags: tags,
          title: p.name,
          desc: p.short_desc || p.full_desc || "High-performance industrial purification system",
        };
      })
    : fallbackCategories;

  // Tripled list for seamless infinite loop without rollback
  const infiniteItems = [
    ...itemsToRender,
    ...itemsToRender,
    ...itemsToRender,
  ];

  const getItemWidth = () => {
    return typeof window !== "undefined" && window.innerWidth < 768 ? 320 : 360;
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const el = scrollRef.current;
      const step = getItemWidth();
      const singleSetWidth = itemsToRender.length * step;

      if (direction === "right" && el.scrollLeft >= singleSetWidth * 1.8) {
        el.scrollLeft -= singleSetWidth;
      } else if (direction === "left" && el.scrollLeft <= 50) {
        el.scrollLeft += singleSetWidth;
      }

      const scrollAmount = direction === "left" ? -step : step;
      el.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Auto-scroll 1 item step-by-step marquee forward with pause on hover
  useEffect(() => {
    const timer = setInterval(() => {
      if (isHovered || !scrollRef.current) return;
      const el = scrollRef.current;
      const step = getItemWidth();
      const singleSetWidth = itemsToRender.length * step;

      if (el.scrollLeft >= singleSetWidth * 1.8) {
        el.scrollLeft -= singleSetWidth;
      }

      el.scrollBy({ left: step, behavior: "smooth" });
    }, 2800);

    return () => clearInterval(timer);
  }, [isHovered, itemsToRender.length]);

  return (
    <section className="w-full mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8 py-8 md:py-10" id="solutions">
      <div className="flex items-end justify-between gap-4 mb-6">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground leading-snug max-w-2xl">
          {t.solutions.title}
        </h2>
        <div className="animate-element animate-delay-300 flex items-center gap-2 shrink-0 self-end">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-card text-foreground border border-border/80 hover:bg-secondary active:scale-95 transition-all shadow-xs hover:shadow-md cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-card text-foreground border border-border/80 hover:bg-secondary active:scale-95 transition-all shadow-xs hover:shadow-md cursor-pointer"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
        className="flex gap-5 overflow-x-auto pb-4 pt-2 no-scrollbar scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {infiniteItems.map((item, idx) => (
          <Link
            key={`${item.slug}-${idx}`}
            href={`/products/${item.slug}`}
            className="group relative flex flex-col justify-between shrink-0 w-[300px] md:w-[340px] h-[400px] overflow-hidden rounded-2xl bg-card p-6 shadow-lg border border-white/20 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
          >
            <img
              src={item.img}
              alt={getTrans(item.title, currentLang)}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Glass Badge Tags */}
            <div className="relative z-10 flex flex-wrap gap-1.5">
              {item.tags.map((tag: string, tagIdx: number) => (
                <span
                  key={tagIdx}
                  className="rounded-full text-white px-3 py-1 text-[11px] font-bold shadow-md backdrop-blur-md bg-black/40 border border-white/20"
                >
                  {getTrans(tag, currentLang)}
                </span>
              ))}
            </div>

            <div className="relative z-10 text-white text-left">
              <h3 className="text-lg font-bold leading-snug line-clamp-2">{getTrans(item.title, currentLang)}</h3>
              <p className="mt-1 text-xs text-white/75 line-clamp-2">{getTrans(item.desc, currentLang)}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs font-bold text-white/95">{t.common.exploreSystems}</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#005883] shadow-md transition-transform group-hover:translate-x-1">
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
