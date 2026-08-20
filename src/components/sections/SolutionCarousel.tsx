import React, { useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { waterTreatmentCategories } from "@/data/productsData";
import { useTranslation } from "@/i18n/useTranslation";

export const SolutionCarousel: React.FC = () => {
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-5 py-8" id="solutions">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <span className="inline-block rounded-full bg-secondary px-3.5 py-1 text-xs font-bold text-primary">
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
        className="flex gap-5 overflow-x-auto pb-4 pt-2 no-scrollbar scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {waterTreatmentCategories.map((cat) => (
          <div
            key={cat.title}
            className="group relative flex flex-col justify-between shrink-0 w-[300px] md:w-[340px] h-[400px] overflow-hidden rounded-[2rem] bg-card p-6 shadow-md border border-border transition-all hover:shadow-xl hover:-translate-y-1"
          >
            <img
              src={cat.img}
              alt={cat.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

            <div className="relative z-10 flex flex-wrap gap-1.5">
              {cat.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur">
                  {tag}
                </span>
              ))}
            </div>

            <div className="relative z-10 text-white">
              <h3 className="text-lg font-bold leading-snug">{cat.title}</h3>
              <p className="mt-1 text-xs text-white/70 line-clamp-2">{cat.desc}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs font-semibold text-white/90">Explore Solutions</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition-transform group-hover:translate-x-1">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
