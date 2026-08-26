import React from "react";
import { ArrowLeft, Calendar, User, Clock, Share2, ArrowUpRight, CheckCircle2, ShieldCheck, Home, ChevronRight } from "lucide-react";
import { Article, newsArticles } from "@/pages/NewsPage";
import heroBannerImg from "@/assets/hero-banner.webp";
import heroFooterImg from "@/assets/hero-footer.webp";
import { useTranslation } from "@/i18n/useTranslation";

interface NewsDetailViewProps {
  article: Article;
  onBack: () => void;
  onSelectArticle?: (article: Article) => void;
}

export const NewsDetailView: React.FC<NewsDetailViewProps> = ({
  article,
  onBack,
  onSelectArticle,
}) => {
  const { t } = useTranslation();
  const relatedArticles = newsArticles
    .filter((a) => a.id !== article.id)
    .slice(0, 3);

  return (
    <div className="w-full min-h-screen bg-background text-foreground pb-0 mb-0 animate-fade-in">
      
      {/* 1. HERO HEADER WITH OVERLAID BANNER BOX (100% Match to Reference Screenshot) */}
      <div className="w-full text-white -mt-20 sm:-mt-24 md:-mt-28 px-4 sm:px-6 md:px-8 relative overflow-hidden pt-28 sm:pt-32 md:pt-40 pb-16 sm:pb-20">
        
        {/* Pure Original Background Photo Base (No color tint/overlay added) */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <img
            src={article.image || heroBannerImg}
            alt={article.title}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Content Container */}
        <div className="mx-auto max-w-[1440px] relative z-10">
          
          {/* SOLID COLOR OVERLAID BANNER CONTAINER (100% Match to Reference Screenshot) */}
          <div className="rounded-3xl bg-[#004f77] dark:bg-[#003853] border border-white/20 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[440px] sm:min-h-[500px]">
            
            {/* Left 7-Columns: Category Eyebrow & Huge Impact Title (Matching Reference Screenshot 100%) */}
            <div className="lg:col-span-7 p-8 sm:p-12 md:p-14 flex flex-col justify-between space-y-6 relative z-10">
              
              {/* Category Pill Tag & Date */}
              <div className="flex items-center gap-3">
                <span className="bg-[#003853] text-white text-xs font-sans font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-md border border-white/15 shadow-xs">
                  {article.category}
                </span>
                <span className="text-xs font-mono font-bold tracking-wider text-white/80 uppercase">
                  {article.date}
                </span>
                <span className="text-xs font-mono font-bold tracking-wider text-white/80 uppercase flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-sky-300" />
                  {article.readTime || "5 MIN READ"}
                </span>
              </div>

              {/* Main Headline (Huge Typography Matching Reference Screenshot 100%) */}
              <div className="my-auto py-4">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-tight font-sans">
                  {article.title}
                </h1>
              </div>

            </div>

            {/* Right 5-Columns: Pure Clean White Container with Author Credit Flush at Very Bottom Edge (100% Match to Reference) */}
            <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-white/20 relative flex flex-col justify-between bg-white text-[#0d0d0d] overflow-hidden">
              
              {/* Empty Space for Ultra-Clean Minimal Layout */}
              <div className="flex-1" />

              {/* Author Credit Flush at Very Bottom Edge */}
              <div className="px-4 py-3 sm:px-6 sm:py-3.5 border-t border-black/10 flex items-center gap-3 bg-white">
                {article.authorAvatar ? (
                  <img
                    src={article.authorAvatar}
                    alt={article.authorName || "EcoReve Author"}
                    className="h-9 w-9 rounded-full object-cover border border-black/10 shrink-0"
                  />
                ) : (
                  <div className="h-9 w-9 rounded-full bg-[#005883]/10 text-[#005883] border border-[#005883]/20 flex items-center justify-center shrink-0">
                    <User className="h-4.5 w-4.5" />
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-xs font-sans font-extrabold text-[#0d0d0d] uppercase tracking-wider leading-tight">
                    BY {article.authorName || "ECOREVE TECHNICAL ENGINEERING TEAM"}
                  </span>
                  {article.authorRole && (
                    <span className="text-[10px] font-mono text-muted-foreground font-medium">
                      {article.authorRole}
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
          
          {/* Main Article Body Column (8 Columns on Desktop, 12 Columns on Mobile) */}
          <div className="lg:col-span-8 space-y-8 font-sans w-full">
            
            {/* Clean Natural Breadcrumb Navigation Bar (Without artificial border divider) */}
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
                {article.title}
              </span>
            </nav>

            {/* Article Intro Lead Paragraph */}
            <p className="text-xl sm:text-2xl font-bold text-foreground leading-relaxed tracking-tight border-l-4 border-[#005883] pl-6 py-1">
              {article.description}
            </p>

            <div className="prose dark:prose-invert max-w-none space-y-6 text-foreground/90 text-base sm:text-lg leading-relaxed font-medium">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight pt-4">
                The Operational Rationale Behind Zero Liquid Discharge (ZLD)
              </h2>

              <p>
                Industrial wastewater recirculation has evolved from a regulatory compliance requirement into a core competitive advantage for modern manufacturing facilities. As fresh water tariffs escalate and discharge quotas tighten across industrial corridors, plant managers must optimize every cubic meter of effluent.
              </p>

              <p>
                At EcoReve, our zero liquid discharge architecture integrates dual-stage anion and cation demineralizers with automated DAF pre-treatment skids. By isolating heavy metals, silica (SiO₂), and dissolved conductivities down to sub-0.1 µS/cm levels, enterprise facilities can safely recycle up to 98% of process water directly back into high-pressure cooling towers and boiler feed loops.
              </p>

              {/* Callout Quote Box */}
              <div className="my-8 rounded-2xl bg-secondary/80 border border-border/80 p-6 sm:p-8 space-y-3 shadow-xs">
                <div className="flex items-center gap-2 text-[#005883] dark:text-sky-400 font-bold text-xs font-mono uppercase tracking-widest">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Key Technical Finding</span>
                </div>
                <p className="text-lg sm:text-xl font-bold text-foreground italic leading-snug">
                  "Automated telemetry feedback loops cut manual chemical dosing errors by 60%, delivering consistent effluent quality even under erratic surge loads."
                </p>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight pt-4">
                Autonomous SCADA Telemetry & 24/7 Remote Monitoring
              </h2>

              <p>
                A major hurdle in traditional water treatment plants is latency in chemical dosage adjustment. Manual titration and periodic lab sampling often result in over-dosing coagulants or under-treating acidic discharge.
              </p>

              <p>
                Our proprietary SCADA integration features inline optical COD sensors and continuous conductivity transmitters linked directly to automated PLC dosing pumps. Every 15 seconds, operational telemetry is transmitted to regional monitoring hubs, triggering automated micro-adjustments before parameter drift occurs.
              </p>
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
            
            {/* Table of Contents Container (100% Match to Reference Screenshot) */}
            <div className="border-l-2 border-border/80 pl-6 space-y-6 font-sans">
              <p className="text-xs font-mono font-bold tracking-widest text-muted-foreground uppercase">
                {t.common.tableOfContents}
              </p>

              <nav className="space-y-4 text-sm font-medium">
                {[
                  { id: "sec-rationale", title: "Operational Rationale Behind Zero Liquid Discharge (ZLD)" },
                  { id: "sec-[#005883]", title: "Dual-Bed Ion Exchange Demineralizer Architecture" },
                  { id: "sec-telemetry", title: "Autonomous SCADA Telemetry & 24/7 Remote Monitoring" },
                  { id: "sec-compliance", title: "Environmental Discharge Compliance & Water Footprint" },
                ].map((item, idx) => (
                  <a
                    key={item.id}
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
                    {item.title}
                  </a>
                ))}
              </nav>
            </div>

          </div>

        </div>

        {/* 3. RELATED ARTICLES GRID */}
        <div className="pt-12 border-t border-border/60 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground font-sans">
              {t.common.relatedArticles}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectArticle && onSelectArticle(rel)}
                className="group cursor-pointer space-y-3 flex flex-col justify-start"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-secondary shadow-xs">
                  <img
                    src={rel.image}
                    alt={rel.title}
                    className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-muted-foreground uppercase pt-1">
                  {rel.category}
                </span>
                <h4 className="text-base font-extrabold text-foreground group-hover:text-[#005883] dark:group-hover:text-sky-400 transition-colors leading-snug line-clamp-2">
                  {rel.title}
                </h4>
              </div>
            ))}
          </div>
        </div>

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
