import React, { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { AppLayout } from "@/Layouts/AppLayout";
import { SEOHead } from "@/Components/common/SEOHead";
import { ArrowUpRight, Clock } from "lucide-react";
import heroBannerImg from "@/assets/hero-banner.webp";
import bannerFooterImg from "@/assets/banner-footer.webp";
import news1Img from "@/assets/news/news1.png";
import news2Img from "@/assets/news/news2.png";
import news3Img from "@/assets/news/news3.png";
import news4Img from "@/assets/news/news4.png";
import newsBgMonochrome from "@/assets/news-bg-monochrome.png";
import newsBgSecondary from "@/assets/news-bg-secondary.png";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Article } from "@/data/newsArticles";
import { NewsDetailView } from "@/components/news/NewsDetailView";
import { useTranslation } from "@/i18n/useTranslation";
import { getTrans } from "@/utils/transHelper";

interface NewsPageProps {
  dbArticles?: Article[];
  dbCategories?: string[];
  slug?: string;
}

export const NewsPage: React.FC<NewsPageProps> = ({ dbArticles, dbCategories, slug }) => {
  const { t, currentLanguage } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedDetailArticle, setSelectedDetailArticle] = useState<Article | null>(null);
  const ITEMS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const articlesToUse = dbArticles || [];

  // Auto select article when slug is present in URL or props
  useEffect(() => {
    if (slug && articlesToUse.length > 0) {
      const found = articlesToUse.find((a) => a.slug === slug || String(a.id) === String(slug));
      setSelectedDetailArticle(found ?? null);
    } else if (!slug) {
      setSelectedDetailArticle(null);
    }
  }, [slug, dbArticles]);

  const featuredArticle = articlesToUse.find((a) => (a as any).is_featured) || articlesToUse[0];

  const handleArticleClick = (article: Article) => {
    setSelectedDetailArticle(article);
    window.scrollTo({ top: 0, behavior: "smooth" });
    const targetSlug = article.slug || String(article.id);
    if (window.location.pathname !== `/news/${targetSlug}`) {
      router.visit(`/news/${targetSlug}`, {
        preserveState: true,
        preserveScroll: true,
      });
    }
  };

  const handleBackToNewsList = () => {
    setSelectedDetailArticle(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
    router.visit("/news", {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const categories = [
    { name: "Partnership", count: articlesToUse.filter((a) => getTrans(a.category, 'en') === "Partnership").length },
    { name: "Research", count: articlesToUse.filter((a) => getTrans(a.category, 'en') === "Research").length },
    { name: "Funding", count: articlesToUse.filter((a) => getTrans(a.category, 'en') === "Funding").length },
    { name: "Technology", count: articlesToUse.filter((a) => getTrans(a.category, 'en') === "Technology").length },
    { name: "Innovation", count: articlesToUse.filter((a) => getTrans(a.category, 'en') === "Innovation").length },
  ];

  const filteredArticles =
    selectedCategory === "All"
      ? articlesToUse
      : articlesToUse.filter((article) => getTrans(article.category, 'en') === selectedCategory);

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);

  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategorySelect = (catName: string) => {
    setSelectedCategory(catName);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 600, behavior: "smooth" });
  };

  if (selectedDetailArticle) {
    return (
      <AppLayout activeNav="News">
        <NewsDetailView
          article={selectedDetailArticle}
          allArticles={articlesToUse}
          onBack={handleBackToNewsList}
          onSelectArticle={handleArticleClick}
        />
      </AppLayout>
    );
  }

  return (
    <AppLayout activeNav="News">
      <SEOHead
        title="News & Research — EcoReve"
        description="Latest green technology research, industrial partnerships, zero liquid discharge innovations, and environmental engineering company updates."
        url="https://ecoreve.premier-engineering.co.id/news"
      />
      <div className="w-full min-h-screen bg-background text-foreground pb-20 pt-3 relative">
      {/* 1. Primary Background Monochrome Industrial Image Overlay */}
      <div className="absolute top-28 left-0 w-full lg:w-[34%] bottom-10 pointer-events-none z-0 overflow-hidden opacity-32 dark:opacity-22">
        <img
          src={newsBgMonochrome}
          alt="EcoReve Industrial Water Architecture Background"
          className="w-full h-full object-cover object-left filter grayscale contrast-120 brightness-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
      </div>

      {/* 2. Secondary Clean Monochrome Image Overlay */}
      <div className="absolute top-0 left-0 w-full lg:w-[35%] h-[450px] pointer-events-none z-0 overflow-hidden opacity-18 dark:opacity-12">
        <img
          src={newsBgSecondary}
          alt="EcoReve Pure Monochrome Graphic Background"
          className="w-full h-full object-cover object-left-top filter grayscale contrast-110 brightness-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      </div>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8 space-y-12 relative z-10">
        
        {/* TOP FEATURED ANNOUNCEMENTS BANNER */}
        {featuredArticle && (
          <div className="pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
              <div
                onClick={() => handleArticleClick(featuredArticle)}
                className="animate-element animate-delay-100 rounded-3xl bg-[#005883] text-white p-8 sm:p-10 md:p-12 flex flex-col justify-between min-h-[400px] sm:min-h-[460px] shadow-2xl border border-white/20 relative overflow-hidden group cursor-pointer"
              >
                <div className="animate-element animate-delay-200 flex items-center gap-2.5 z-10">
                  <span className="inline-flex items-center gap-2 bg-white/10 text-white/90 text-xs font-semibold px-3.5 py-1.5 rounded-full backdrop-blur-md border border-white/20">
                    <span className="h-2 w-2 rounded-full bg-[#008193] animate-pulse" />
                    {getTrans(featuredArticle.category, currentLanguage)}
                  </span>
                  <span className="bg-white/10 text-white/90 text-xs font-semibold px-3.5 py-1.5 rounded-full backdrop-blur-md border border-white/20">
                    {getTrans(featuredArticle.date, currentLanguage)}
                  </span>
                </div>

                <div className="animate-element animate-delay-300 my-auto py-8 z-10">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight max-w-xl drop-shadow-md">
                    {getTrans(featuredArticle.title, currentLanguage)}
                  </h2>
                </div>

                <div className="animate-element animate-delay-400 z-10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleArticleClick(featuredArticle);
                    }}
                    className="inline-flex items-center gap-3 bg-white text-[#005883] pl-5 pr-2 py-2 rounded-xl font-bold text-sm shadow-md hover:bg-slate-100 hover:-translate-y-0.5 transition-all group/btn cursor-pointer"
                  >
                    <span>{t.newsUI.readNow || "Read Now"}</span>
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#005883] text-white transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
                      <ArrowUpRight className="h-5 w-5 stroke-[2.5]" />
                    </div>
                  </button>
                </div>
              </div>

              <div
                onClick={() => handleArticleClick(featuredArticle)}
                className="animate-element animate-delay-200 rounded-3xl relative overflow-hidden min-h-[400px] sm:min-h-[460px] shadow-xl border border-white/10 group cursor-pointer"
              >
                <img
                  src={featuredArticle.image || heroBannerImg}
                  alt={getTrans(featuredArticle.title, currentLanguage)}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
              </div>
            </div>
          </div>
        )}

        {/* SECOND SECTION: Latest Updates (With 30% Sticky Filter + 70% News Grid) */}
        <div className="space-y-8 pt-6 border-t border-border/40">
          <div className="reveal pt-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#005883] dark:text-white">
              {t.newsUI.latestUpdatesTitle || "Latest Updates"}
            </h2>
          </div>

          {/* Split 2-Column Layout (Left 30% Sticky Filter + Right 70% News Grid) */}
          <div className="grid gap-10 lg:grid-cols-12 items-start">
          
          {/* LEFT COLUMN (30% Width): Sticky Category Filter Sidebar (Fixed CSS Sticky) */}
          <div className="reveal lg:col-span-4 lg:sticky lg:top-28 self-start space-y-6 z-20">
            <div className="space-y-3">
              <p className="text-xs font-mono font-bold tracking-wider text-muted-foreground uppercase">
                {t.newsUI.filterByCategory || "Filter by category"}
              </p>

              {/* Category Filter Pills Grid (Side-by-side count badge in parentheses) */}
              <div className="flex flex-wrap items-center gap-2">
                {/* All Button */}
                <button
                  onClick={() => handleCategorySelect("All")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer ${
                    selectedCategory === "All"
                      ? "bg-[#005883] text-white shadow-md font-bold"
                      : "bg-card/90 backdrop-blur-md text-foreground border border-border/80 hover:bg-secondary hover:border-primary/40"
                  }`}
                >
                  <span>{t.newsUI.filterAll || "All"}</span>
                  <span className={`text-[11px] font-mono ${selectedCategory === "All" ? "text-white/90" : "text-muted-foreground"}`}>
                    ({articlesToUse.length})
                  </span>
                </button>

                {categories.map((cat) => {
                  const catKeyMap: { [key: string]: string } = {
                    Partnership: t.newsUI.filterPartnership || "Partnership",
                    Research: t.newsUI.filterResearch || "Research",
                    Funding: t.newsUI.filterFunding || "Funding",
                    Technology: t.newsUI.filterTechnology || "Technology",
                    Innovation: t.newsUI.filterInnovation || "Innovation",
                  };
                  return (
                    <button
                      key={cat.name}
                      onClick={() => handleCategorySelect(cat.name)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer ${
                        selectedCategory === cat.name
                          ? "bg-[#005883] text-white shadow-md font-bold"
                          : "bg-card/90 backdrop-blur-md text-foreground border border-border/80 hover:bg-secondary hover:border-primary/40"
                      }`}
                    >
                      <span>{catKeyMap[cat.name] || cat.name}</span>
                      <span className={`text-[11px] font-mono ${selectedCategory === cat.name ? "text-white/90" : "text-muted-foreground"}`}>
                        ({cat.count})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Category Filter Section without Reset Filters Link */}
          </div>

          {/* RIGHT COLUMN (70% Width): Responsive News Articles Grid (Clean 400x400 Square Image Layout with 8 Items / Page) */}
          <div className="lg:col-span-8 space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
              {paginatedArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => handleArticleClick(article)}
                  className="reveal group cursor-pointer space-y-2.5 flex flex-col justify-start"
                >
                  {/* Clean 400x400 Aspect Square Image Container (100% Match to Reference Screenshot) */}
                  <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-secondary shadow-xs">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                    />

                    {/* Floating READ MORE Overlay Button (White initially, slide-up corporate blue bg fill on button hover) */}
                    <div className="absolute bottom-3 right-3 z-10 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleArticleClick(article);
                        }}
                        className="relative overflow-hidden rounded-xl bg-white px-4 py-2.5 text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-wider text-[#005883] shadow-md transition-colors duration-300 group/btn cursor-pointer"
                      >
                        {/* Slide-Up Corporate Blue Background Overlay */}
                        <span className="absolute inset-0 bg-[#005883] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out z-0" />
                        
                        {/* Button Text Label */}
                        <span className="relative z-10 transition-colors duration-300 group-hover/btn:text-white">
                          {t.common.readMore}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Category & Read Time Eyebrow Labels */}
                  <div className="pt-1 flex items-center justify-between gap-2">
                    <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-muted-foreground uppercase">
                      {getTrans(article.category, currentLanguage)}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-mono text-muted-foreground font-medium">
                      <Clock className="h-3 w-3 text-[#005883] dark:text-sky-400" />
                      {getTrans(article.readTime, currentLanguage) || "5 MIN READ"}
                    </span>
                  </div>

                  {/* Article Title (Clean Bold Typography) */}
                  <h3 className="text-xl sm:text-2xl font-extrabold text-foreground group-hover:text-[#005883] dark:group-hover:text-sky-400 transition-colors leading-tight tracking-tight font-sans">
                    {getTrans(article.title, currentLanguage)}
                  </h3>

                  {/* Article Summary Description */}
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed line-clamp-2">
                    {getTrans(article.description, currentLanguage)}
                  </p>
                </div>
              ))}
            </div>

            {/* PAGINATION UI (Matching Products Page Style 100%) */}
            {totalPages > 1 && (
              <div className="pt-8 pb-2 flex justify-center border-t border-border/60">
                <Pagination className="justify-center">
                  <PaginationContent className="gap-1.5">
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-40 rounded-xl border border-border/80 text-xs font-sans font-semibold"
                            : "cursor-pointer rounded-xl border border-border/80 hover:bg-[#005883] hover:text-white transition-colors text-xs font-sans font-semibold"
                        }
                      >
                        {t.productsUI.paginationPrevious || "Previous"}
                      </PaginationPrevious>
                    </PaginationItem>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          isActive={currentPage === page}
                          onClick={() => handlePageChange(page)}
                          className={`cursor-pointer rounded-xl font-sans font-semibold transition-all text-xs sm:text-sm ${
                            currentPage === page
                              ? "bg-[#005883] text-white border-[#005883] shadow-xs"
                              : "border border-border/80 hover:bg-[#005883]/10 hover:border-[#005883]"
                          }`}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-40 rounded-xl border border-border/80 text-xs font-sans font-semibold"
                            : "cursor-pointer rounded-xl border border-border/80 hover:bg-[#005883] hover:text-white transition-colors text-xs font-sans font-semibold"
                        }
                      >
                        {t.productsUI.paginationNext || "Next"}
                      </PaginationNext>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
    </div>
  </AppLayout>
);
};

export default NewsPage;
