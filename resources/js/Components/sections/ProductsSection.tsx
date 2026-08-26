import React from "react";
import heroBannerImg from "@/assets/hero-banner.webp";
import heroFooterImg from "@/assets/hero-footer.webp";
import { useTranslation } from "@/i18n/useTranslation";

export const ProductsSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="w-full bg-secondary/30 border-y border-border/60 py-12 md:py-16" id="capabilities">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8">
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="inline-block rounded-full bg-secondary px-3.5 py-1 text-xs font-bold text-primary border border-border/80">
              {t.catalog.badge}
            </span>
            <h2 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              {t.catalog.title}
            </h2>
          </div>
          <p className="max-w-md text-xs md:text-sm text-muted-foreground leading-relaxed">
            {t.catalog.subtitle}
          </p>
        </div>

        {/* Bento Box Grid (Row 1 & Row 2 matching reference layout) */}
        <div className="grid gap-5">
          {/* Top Row: 3 Bento Cards */}
          <div className="grid gap-5 lg:grid-cols-12">
            {/* Card 1: Expert Guidance (5 cols) */}
            <div className="lg:col-span-5 rounded-2xl bg-card p-8 md:p-10 flex flex-col justify-between border border-border/80 shadow-sm hover:shadow-md transition-all">
              <div>
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground leading-tight">
                  {t.catalog.expertTitle}
                </h3>
                <p className="mt-4 text-xs md:text-sm text-muted-foreground leading-relaxed">
                  {t.catalog.expertDesc}
                </p>
              </div>
              <div className="mt-8 pt-4">
                <span className="inline-flex items-center rounded-full bg-[#1a2328] text-white px-5 py-2.5 text-xs font-bold shadow-md">
                  {t.catalog.expertBadge}
                </span>
              </div>
            </div>

            {/* Card 2: Specialist Image Card (4 cols) */}
            <div className="lg:col-span-4 relative overflow-hidden rounded-2xl min-h-[280px] lg:min-h-[340px] border border-border/60 shadow-sm group">
              <img
                src={heroBannerImg}
                alt="EcoReve Technical Specialist"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Card 3: Average Response Time Metric (3 cols) */}
            <div className="lg:col-span-3 rounded-2xl bg-card p-8 flex flex-col justify-between border border-border/80 shadow-sm hover:shadow-md transition-all">
              <div>
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground leading-tight">
                  {t.catalog.responseTimeTitle}
                </h3>
                <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                  {t.catalog.responseTimeDesc}
                </p>
              </div>
              <div className="mt-8 pt-4">
                <span className="text-5xl md:text-6xl font-extrabold tracking-tight text-[#005883] block">
                  {t.catalog.responseTimeValue}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Row: 2 Bento Cards */}
          <div className="grid gap-5 lg:grid-cols-12">
            {/* Card 4: Official Warranty (4 cols) */}
            <div className="lg:col-span-4 rounded-2xl bg-card p-8 flex flex-col justify-between border border-border/80 shadow-sm hover:shadow-md transition-all">
              <div>
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground leading-tight">
                  {t.catalog.warrantyTitle}
                </h3>
                <span className="mt-6 text-3xl md:text-4xl font-extrabold tracking-tight text-[#005883] block">
                  {t.catalog.warrantyValue}
                </span>
              </div>
              <p className="mt-6 text-xs text-muted-foreground leading-relaxed border-t border-border/60 pt-4">
                {t.catalog.warrantyDesc}
              </p>
            </div>

            {/* Card 5: Trust Metric + Facility Image Card (8 cols) */}
            <div className="lg:col-span-8 rounded-2xl bg-card p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center border border-border/80 shadow-sm hover:shadow-md transition-all">
              <div className="md:col-span-6 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
                    {t.catalog.trustTitle}
                  </h3>
                  <p className="mt-4 text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {t.catalog.trustDesc}
                  </p>
                </div>
              </div>
              <div className="md:col-span-6 relative overflow-hidden rounded-2xl h-[200px] md:h-[240px] shadow-sm group">
                <img
                  src={heroFooterImg}
                  alt="EcoReve Industrial Facility"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
