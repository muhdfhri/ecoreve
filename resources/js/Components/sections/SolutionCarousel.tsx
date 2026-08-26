import React, { useRef, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { waterTreatmentCategories } from "@/data/productsData";
import { useTranslation } from "@/i18n/useTranslation";

// Tripled list for seamless infinite loop without rollback
const infiniteCategories = [
  ...waterTreatmentCategories,
  ...waterTreatmentCategories,
  ...waterTreatmentCategories,
];

export const SolutionCarousel: React.FC = () => {
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const getItemWidth = () => {
    return typeof window !== "undefined" && window.innerWidth < 768 ? 320 : 360;
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const el = scrollRef.current;
      const step = getItemWidth();
      const singleSetWidth = waterTreatmentCategories.length * step;

      if (direction === "right" && el.scrollLeft >= singleSetWidth * 1.8) {
        el.scrollLeft -= singleSetWidth;
      } else if (direction === "left" && el.scrollLeft <= 50) {
        el.scrollLeft += singleSetWidth;
      }

      const scrollAmount = direction === "left" ? -step : step;
      el.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Auto-scroll 1 item step-by-step marquee forward
  useEffect(() => {
    const timer = setInterval(() => {
      if (isHovered || !scrollRef.current) return;
      const el = scrollRef.current;
      const step = getItemWidth();
      const singleSetWidth = waterTreatmentCategories.length * step;

      // Silent reset if near the end of duplicated sets, keeping motion seamless
      if (el.scrollLeft >= singleSetWidth * 1.8) {
        el.scrollLeft -= singleSetWidth;
      }

      el.scrollBy({ left: step, behavior: "smooth" });
    }, 2600);

    return () => clearInterval(timer);
  }, [isHovered]);

  return (
    <section className="w-full mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8 py-8 md:py-10" id="solutions">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <span
            className="inline-block rounded-full px-3.5 py-1 text-xs font-bold text-white shadow-sm"
            style={{ backgroundColor: "#005883" }}
          >
            {t.solutions.badge}
          </span>
          <h2 className="mt-2 text-2xl md:text-3xl font-extrabold tracking-tight">
            {t.solutions.title}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm hover:bg-secondary transition-colors"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex gap-5 overflow-x-auto pb-4 pt-2 no-scrollbar scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {infiniteCategories.map((cat, idx) => (
          <div
            key={`${cat.title}-${idx}`}
            className="group relative flex flex-col justify-between shrink-0 w-[300px] md:w-[340px] h-[400px] overflow-hidden rounded-2xl bg-card p-6 shadow-md border border-border transition-all hover:shadow-xl hover:-translate-y-1"
          >
            <img
              src={cat.img}
              alt={cat.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

            {/* Solid Primary Blue Badge Tags */}
            <div className="relative z-10 flex flex-wrap gap-1.5">
              {cat.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full text-white px-3.5 py-1 text-xs font-bold shadow-md border border-white/30"
                  style={{ backgroundColor: "#005883" }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="relative z-10 text-white">
              <h3 className="text-lg font-bold leading-snug">{cat.title}</h3>
              <p className="mt-1 text-xs text-white/70 line-clamp-2">{cat.desc}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs font-semibold text-white/90">{t.common.exploreSystems}</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition-transform group-hover:translate-x-1">
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
