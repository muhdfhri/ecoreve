import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { newsItems as fallbackNewsItems } from "@/data/newsData";
import { useTranslation } from "@/i18n/useTranslation";
import { router } from "@inertiajs/react";
import { getTrans } from "@/utils/transHelper";

interface NewsItemData {
  id: number | string;
  title: any;
  category?: any;
  published_at?: string;
  created_at?: string;
  image_url?: string;
  image?: string;
  slug?: string;
  bgType?: "image" | "color" | "accent";
  bgAccentColor?: string;
  textColor?: string;
}

interface LatestNewsSectionProps {
  latestNews?: NewsItemData[];
}

export const LatestNewsSection: React.FC<LatestNewsSectionProps> = ({ latestNews = [] }) => {
  const { t, currentLanguage } = useTranslation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.75;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Map DB items or use sample fallback
  const itemsToRender: NewsItemData[] = latestNews && latestNews.length > 0
    ? latestNews.map((n: any) => ({
        id: n.id,
        slug: n.slug,
        title: getTrans(n.title, currentLanguage),
        category: getTrans(n.category, currentLanguage) || "Research & Case Study",
        published_at: n.published_at
          ? new Date(n.published_at).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }).toUpperCase()
          : "AUG 2026",
        image: n.image_url || fallbackNewsItems[0]?.image,
        bgType: "image",
      }))
    : fallbackNewsItems;

  return (
    <section className="w-full bg-background py-10 sm:py-16 md:py-20 overflow-hidden" id="latest-news">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8 space-y-6 sm:space-y-8">
        {/* Section Header Row */}
        <div className="reveal flex items-end justify-between gap-4 mb-4">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground leading-snug max-w-2xl">
            {t.newsUI.heroBadge}
          </h2>

          {/* Top Right Carousel Navigation Controls (< & >) */}
          <div className="flex items-center gap-2 shrink-0 self-end">
            <button
              type="button"
              onClick={() => handleScroll("left")}
              aria-label="Previous News"
              className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-card text-foreground border border-border/80 hover:bg-secondary active:scale-95 transition-all shadow-xs hover:shadow-md cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll("right")}
              aria-label="Next News"
              className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-card text-foreground border border-border/80 hover:bg-secondary active:scale-95 transition-all shadow-xs hover:shadow-md cursor-pointer"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Cards Row */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-4 pt-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {itemsToRender.map((item, idx) => {
            const isImage = item.bgType !== "color";
            const displayCategory = item.category || "Research & Case Study";
            const displayDate = item.published_at || (item as any).date || "AUG 2026";
            const cardImg = item.image || item.image_url || fallbackNewsItems[idx % fallbackNewsItems.length]?.image;

            return (
              <div
                key={item.id || idx}
                onClick={() => router.visit(`/news/${item.slug || item.id}`)}
                className="reveal shrink-0 w-[290px] sm:w-[320px] lg:w-[335px] h-[450px] relative snap-start shadow-xl group cursor-pointer news-card-smooth-notch hover:-translate-y-2"
                style={{
                  backgroundColor: !isImage ? item.bgAccentColor : undefined,
                  color: !isImage ? item.textColor : undefined,
                }}
              >
                {/* Image Background for Image Cards */}
                {isImage && (
                  <>
                    <img
                      src={cardImg}
                      alt={item.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60" />
                  </>
                )}

                {/* Card Top Row Header (Category Badge + Date) */}
                <div className="relative z-10 p-6 flex items-center justify-between font-mono text-[10px] font-extrabold tracking-widest uppercase">
                  <span
                    className={`rounded-md px-2.5 py-1 ${
                      isImage
                        ? "bg-white/20 text-white backdrop-blur-md border border-white/30"
                        : "bg-white/15 text-white/90"
                    }`}
                  >
                    {displayCategory}
                  </span>
                  <span className="text-white/80">
                    {displayDate}
                  </span>
                </div>

                {/* Card Main Content Area */}
                <div className="relative z-10 px-6 pt-2 pb-16 flex flex-col justify-between h-[calc(100%-110px)] text-left">
                  <h3 className="text-lg sm:text-xl font-extrabold tracking-tight leading-snug text-white drop-shadow-xs">
                    {item.title}
                  </h3>
                </div>

                {/* Bottom-Right Corner Action Button (Standardized to 'Explore') */}
                <div className="absolute bottom-5 right-5 z-20">
                  <button
                    type="button"
                    className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-[10px] font-extrabold tracking-widest uppercase shadow-lg transition-all group-hover:scale-105 active:scale-95 bg-white/95 text-black hover:bg-white cursor-pointer"
                  >
                    <span>Explore</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
