import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { products, filters } from "@/data/productsData";
import { useTranslation } from "@/i18n/useTranslation";

export const ProductsSection: React.FC = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState("All Models");

  const filteredProducts = activeFilter === "All Models"
    ? products
    : products.filter((p) => p.category === activeFilter);

  return (
    <section className="mx-auto max-w-7xl px-5 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="inline-block rounded-full bg-secondary px-3.5 py-1 text-xs font-bold text-primary">
            {t.catalog.badge}
          </span>
          <h2 className="mt-2 text-2xl md:text-3xl font-extrabold tracking-tight">
            {t.catalog.title}
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 rounded-full bg-card p-1.5 shadow-sm border border-border">
          {filters.map((flt) => (
            <button
              key={flt}
              onClick={() => setActiveFilter(flt)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                activeFilter === flt
                  ? "bg-[#005883] text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {flt}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((prod) => (
          <div
            key={prod.name}
            className="group flex flex-col justify-between overflow-hidden rounded-[2rem] bg-card p-5 shadow-sm border border-border transition-all hover:shadow-md hover:border-primary/40"
          >
            <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-muted">
              <img
                src={prod.img}
                alt={prod.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                {prod.tags.map((tg) => (
                  <span key={tg} className="rounded-full bg-black/60 px-2 py-0.5 text-[9px] font-semibold text-white backdrop-blur">
                    {tg}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-base font-bold leading-tight group-hover:text-primary transition-colors">
                  {prod.name}
                </h3>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
                <div>
                  <span className="text-xs text-muted-foreground line-through mr-1.5">${prod.wasPrice}</span>
                  <span className="text-base font-extrabold text-foreground">${prod.price}</span>
                </div>
                <button className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-primary hover:bg-[#005883] hover:text-white transition-colors shadow-sm">
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
