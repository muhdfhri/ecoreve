import React from "react";
import { ArrowLeft, Calendar, User, Clock, Share2, ArrowUpRight, CheckCircle2, ShieldCheck, Home, ChevronRight } from "lucide-react";
import { Article } from "@/data/newsArticles";
import heroBannerImg from "@/assets/hero-banner.webp";
import heroFooterImg from "@/assets/hero-footer.webp";
import { useTranslation } from "@/i18n/useTranslation";
import { getTrans } from "@/utils/transHelper";

interface NewsDetailViewProps {
  article: Article;
  allArticles?: Article[];
  onBack: () => void;
  onSelectArticle?: (article: Article) => void;
}

export const NewsDetailView: React.FC<NewsDetailViewProps> = ({
  article,
  allArticles,
  onBack,
  onSelectArticle,
}) => {
  const { t, currentLanguage } = useTranslation();

  const articlesToFilter = Array.isArray(allArticles) ? allArticles : [];
  const currentId = String(article?.id || "");
  const currentSlug = String(article?.slug || "");

  const sameCategory = articlesToFilter.filter(
    (a) => String(a.id) !== currentId && String(a.slug || "") !== currentSlug && a.category === article?.category
  );
  const otherCategory = articlesToFilter.filter(
    (a) => String(a.id) !== currentId && String(a.slug || "") !== currentSlug && a.category !== article?.category
  );
  const relatedArticles = [...sameCategory, ...otherCategory].slice(0, 3);

  // Parse Table of Contents from Database (JSON array or string)
  let tocItems: { id: string; title: string }[] = [];
  const rawToc = article.tableOfContents || article.table_of_contents;
  if (Array.isArray(rawToc)) {
    tocItems = rawToc;
  } else if (typeof rawToc === "string") {
    try {
      tocItems = JSON.parse(rawToc);
    } catch (e) {
      tocItems = [];
    }
  }

  const translatedTitle = getTrans(article.title, currentLanguage);
  const translatedCategory = getTrans(article.category, currentLanguage);
  const translatedDate = getTrans(article.date, currentLanguage);
  const translatedReadTime = getTrans(article.readTime || (article as any).read_time, currentLanguage) || "5 MIN READ";
  const translatedDesc = getTrans(article.description || (article as any).summary, currentLanguage);
  const translatedContent = getTrans(article.content, currentLanguage);
  const translatedAuthorName = getTrans(article.authorName || (article as any).author_name, currentLanguage) || "ECOREVE TECHNICAL ENGINEERING TEAM";
  const translatedAuthorRole = getTrans(article.authorRole || (article as any).author_role, currentLanguage);

  return (
    <div className="w-full min-h-screen bg-background text-foreground pb-0 mb-0 animate-fade-in">
      
      {/* 1. HERO HEADER WITH OVERLAID BANNER BOX (100% Match to Reference Screenshot) */}
      <div className="w-full text-white -mt-20 sm:-mt-24 md:-mt-28 px-4 sm:px-6 md:px-8 relative overflow-hidden pt-28 sm:pt-32 md:pt-40 pb-16 sm:pb-20">
        
        {/* Pure Original Background Photo Base (No color tint/overlay added) */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <img
            src={article.image || heroBannerImg}
            alt={translatedTitle}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Content Container */}
        <div className="mx-auto max-w-[1440px] relative z-10">
          
          {/* SOLID COLOR OVERLAID BANNER CONTAINER (100% Match to Reference Screenshot) */}
          <div className="rounded-3xl bg-[#004f77] dark:bg-[#003853] border border-white/20 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[440px] sm:min-h-[500px]">
            
            {/* Left 7-Columns: Category Eyebrow & Huge Impact Title */}
            <div className="lg:col-span-7 p-8 sm:p-12 md:p-14 flex flex-col justify-between space-y-6 relative z-10">
              
              {/* Category Pill Tag & Date */}
              <div className="flex items-center gap-3">
                <span className="bg-[#003853] text-white text-xs font-sans font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-md border border-white/15 shadow-xs">
                  {translatedCategory}
                </span>
                <span className="text-xs font-mono font-bold tracking-wider text-white/80 uppercase">
                  {translatedDate}
                </span>
                <span className="text-xs font-mono font-bold tracking-wider text-white/80 uppercase flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-sky-300" />
                  {translatedReadTime}
                </span>
              </div>

              {/* Main Headline */}
              <div className="my-auto py-4">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-tight font-sans">
                  {translatedTitle}
                </h1>
              </div>

            </div>

            {/* Right 5-Columns: Pure Clean White Container with Author Credit */}
            <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-white/20 relative flex flex-col justify-between bg-white text-[#0d0d0d] overflow-hidden">
              
              <div className="flex-1" />

              {/* Author Credit Flush at Very Bottom Edge */}
              <div className="px-4 py-3 sm:px-6 sm:py-3.5 border-t border-black/10 flex items-center gap-3 bg-white">
                {(article.authorAvatar || (article as any).author_avatar) ? (
                  <img
                    src={article.authorAvatar || (article as any).author_avatar}
                    alt={translatedAuthorName}
                    className="h-9 w-9 rounded-full object-cover border border-black/10 shrink-0"
                  />
                ) : (
                  <div className="h-9 w-9 rounded-full bg-[#005883]/10 text-[#005883] border border-[#005883]/20 flex items-center justify-center shrink-0">
                    <User className="h-4.5 w-4.5" />
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-xs font-sans font-extrabold text-[#0d0d0d] uppercase tracking-wider leading-tight">
                    BY {translatedAuthorName}
                  </span>
                  {translatedAuthorRole && (
                    <span className="text-[10px] font-mono text-muted-foreground font-medium">
                      {translatedAuthorRole}
                    </span>
                  )}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* 2. MAIN ARTICLE CONTENT BODY */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8 pt-12 space-y-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-8 space-y-8 font-sans w-full">
            
            <nav className="flex items-center gap-2 text-xs sm:text-sm font-sans font-medium text-muted-foreground pt-1 pb-1">
              <button
                onClick={onBack}
                className="hover:text-foreground transition-colors flex items-center gap-1 cursor-pointer"
                title="Home / News"
              >
                <Home className="h-4 w-4 shrink-0 text-[#005883] dark:text-sky-400" />
              </button>

              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />

              <button
                onClick={onBack}
                className="hover:text-[#005883] dark:hover:text-sky-400 transition-colors font-semibold underline underline-offset-4 decoration-border hover:decoration-[#005883] cursor-pointer"
              >
                {t.nav.news}
              </button>

              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />

              <span className="font-bold text-foreground truncate max-w-[280px] sm:max-w-md">
                {translatedTitle}
              </span>
            </nav>

            {/* Article Intro Lead Paragraph */}
            {translatedDesc ? (
              <p className="text-lg sm:text-xl font-medium text-foreground/90 leading-relaxed font-sans pb-2">
                {translatedDesc}
              </p>
            ) : null}

            <div className="prose dark:prose-invert max-w-none space-y-6 text-foreground/90 text-base sm:text-lg leading-relaxed font-sans">
              {(() => {
                let sectionCounter = 0;
                return translatedContent && (
                  <div className="space-y-6">
                    {translatedContent.split("\n\n").map((block, idx) => {
                      const lines = block.trim().split("\n");
                      const firstLine = lines[0];
                      const restText = lines.slice(1).join("\n");

                      // Check if block starts with a section number e.g. "1. ", "2. "
                      const headerMatch = firstLine.match(/^([0-9]+)\.\s*(.*)/);

                      if (headerMatch) {
                        sectionCounter++;
                        const secId = `sec-${sectionCounter}`;
                        return (
                          <div key={idx} id={secId} className="space-y-3 pt-4 scroll-mt-32">
                            <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight font-sans">
                              {firstLine}
                            </h2>
                            {restText && (
                              <p className="whitespace-pre-line leading-relaxed text-foreground/80 font-normal">
                                {restText}
                              </p>
                            )}
                          </div>
                        );
                      }

                    // Check if block is a quote
                    if (block.trim().startsWith('"') || block.trim().startsWith('“')) {
                      return (
                        <blockquote key={idx} className="border-l-2 border-[#005883] dark:border-sky-400 pl-4 py-1.5 my-4 italic text-foreground/90 font-medium">
                          {block.trim()}
                        </blockquote>
                      );
                    }

                    return (
                      <p key={idx} className="whitespace-pre-line leading-relaxed text-foreground/80 font-normal">
                        {block}
                      </p>
                    );
                  })}
                </div>
              );
            })()}
            </div>

            {/* Share & Social Action Footer */}
            <div className="pt-8 border-t border-border/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-sans font-bold uppercase tracking-wider text-muted-foreground">
                  {t.common.shareThis}
                </span>
                <button className="p-2.5 rounded-xl bg-secondary hover:bg-muted text-foreground transition-all cursor-pointer">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Sidebar Column (Desktop Only: Hidden on Mobile with hidden lg:block) */}
          <div className="hidden lg:block lg:col-span-4 space-y-8 lg:sticky lg:top-28">
            
            {/* Table of Contents Container */}
            {tocItems && tocItems.length > 0 && (
              <div className="border-l-2 border-border/80 pl-6 space-y-6 font-sans">
                <p className="text-xs font-mono font-bold tracking-widest text-muted-foreground uppercase">
                  {t.common.tableOfContents}
                </p>

                <nav className="space-y-4 text-sm font-medium">
                  {tocItems.map((item, idx) => (
                    <a
                      key={item.id || idx}
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById(item.id);
                        if (el) {
                          el.scrollIntoView({ behavior: "smooth", block: "start" });
                        }
                      }}
                      className={`block transition-all leading-relaxed cursor-pointer ${
                        idx === 0
                          ? "text-[#005883] dark:text-sky-400 font-bold"
                          : "text-muted-foreground hover:text-foreground font-medium"
                      }`}
                    >
                      {getTrans(item.title, currentLanguage)}
                    </a>
                  ))}
                </nav>
              </div>
            )}

          </div>

        </div>

        {/* 3. RELATED ARTICLES GRID (Full 100% Container Width Spanning Across 3 Columns) */}
        {relatedArticles.length > 0 && (
          <div className="pt-12 border-t border-border/60 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground font-sans">
                {t.common.relatedArticles}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              {relatedArticles.map((rel, idx) => (
                <div
                  key={rel.id || idx}
                  onClick={() => onSelectArticle && onSelectArticle(rel)}
                  className="group cursor-pointer space-y-2.5 flex flex-col justify-start"
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-secondary shadow-xs">
                    <img
                      src={rel.image || (rel as any).image_url || heroBannerImg}
                      alt={getTrans(rel.title, currentLanguage) || "Related Article"}
                      className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>
                  <span className="text-[11px] font-mono font-bold tracking-widest text-muted-foreground uppercase pt-1">
                    {getTrans(rel.category, currentLanguage) || "Engineering"}
                  </span>
                  <h4 className="text-base sm:text-lg font-extrabold text-foreground group-hover:text-[#005883] dark:group-hover:text-sky-400 transition-colors leading-snug line-clamp-2 font-sans">
                    {getTrans(rel.title, currentLanguage) || "Engineering Research Update"}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 4. EXTRAORDINARY MOMENTS BANNER SECTION (Full-Bleed Edge-to-Edge & Seamless Footer Blend Matching About Us 100%) */}
      <div className="w-full relative overflow-hidden min-h-[380px] sm:min-h-[440px] flex items-center justify-center py-16 sm:py-20 text-center text-white group mt-16 mb-0">
        {/* Background Image with Hover Scale */}
        <img
          src={heroFooterImg}
          alt="EcoReve Extraordinary Moments Industrial Architecture"
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Dark Vignette Overlay for Optimal Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2328] via-black/45 to-black/35 pointer-events-none z-0" />

        {/* Bottom Seamless Gradient Fade to Footer Color (#1a2328) */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#1a2328] via-[#1a2328]/85 to-transparent pointer-events-none z-[1]" />

        {/* Centered Overlay Content (Matching About Us Section 5 Typography 100%) */}
        <div className="relative z-10 mx-auto max-w-2xl px-4 flex flex-col items-center space-y-3.5 transition-transform duration-500 group-hover:translate-y-[-2px]">
          {/* Top Pill Tag */}
          <span className="inline-flex items-center justify-center rounded-full bg-white/95 backdrop-blur-md px-5 py-1.5 text-xs font-semibold text-black shadow-lg">
            {t.common.aNewPerspective}
          </span>

          {/* Main Hero Headline Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.1] drop-shadow-md font-sans whitespace-pre-line">
            {t.common.extraordinaryMoments}
          </h2>

          {/* Subtitle Caption */}
          <p className="text-xs sm:text-sm text-white/90 font-medium max-w-md leading-relaxed drop-shadow">
            {t.common.extraordinarySub}
          </p>
        </div>
      </div>

    </div>
  );
};
