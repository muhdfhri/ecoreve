import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { problems } from "@/data/problemsData";
import { useTranslation } from "@/i18n/useTranslation";
import problemBgImg from "@/assets/problem-bg.png";

export const ProblemSection: React.FC = () => {
  const { t } = useTranslation();
  const [activeProblem, setActiveProblem] = useState<number>(1);

  return (
    <section className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8 py-8 md:py-10">
      <div className="rounded-3xl bg-[#1a2328] text-white p-6 sm:p-8 md:p-12 border border-border/20 shadow-xl relative overflow-hidden">
        {/* Top-Right Generated Industrial Background Image (Positioned in marked red area) */}
        <div className="absolute top-0 right-0 w-full sm:w-[55%] lg:w-[48%] h-[240px] md:h-[280px] pointer-events-none z-0 overflow-hidden rounded-tr-3xl">
          <img
            src={problemBgImg}
            alt="Industrial Water Treatment Equipment Background"
            className="w-full h-full object-cover object-right-top opacity-55 mix-blend-luminosity hover:scale-105 transition-transform duration-700"
          />
          {/* Smooth Gradient Overlays to blend image naturally into dark card */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#1a2328]/70 to-[#1a2328]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a2328] via-[#1a2328]/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a2328]/40 via-transparent to-[#1a2328]" />
        </div>

        {/* Header Content Row */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <span className="inline-block rounded-lg bg-[#005883] border border-white/20 px-3.5 py-1.5 text-xs font-mono font-bold text-white shadow-xs">
              {t.problems.badge}
            </span>
            <h2 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight max-w-xl leading-tight text-white drop-shadow-sm">
              {t.problems.title}
            </h2>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-white/80 font-medium">
            {t.problems.subtitle}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="relative z-10 mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((prob, idx) => {
            const isActive = activeProblem === idx + 1;
            return (
              <div
                key={prob.n}
                onClick={() => setActiveProblem(idx + 1)}
                className={`group cursor-pointer rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between min-h-[220px] ${
                  isActive
                    ? "bg-[#005883] text-white shadow-lg ring-2 ring-white/20"
                    : "bg-white/5 backdrop-blur-xs hover:bg-white/10 text-white/80 border border-white/10"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl sm:text-4xl font-mono font-extrabold tracking-wider text-white">
                    {prob.n}
                  </span>
                  <span className={`flex h-9 w-9 items-center justify-center rounded-full transition-all ${
                    isActive ? "bg-white text-[#005883] shadow-md" : "bg-white/10 text-white group-hover:bg-white/20"
                  }`}>
                    <ArrowUpRight className={`h-4.5 w-4.5 transition-transform duration-300 ${
                      isActive ? "rotate-45" : "group-hover:rotate-45"
                    }`} />
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-bold leading-snug">
                    {prob.t}
                  </h3>
                  <p className={`mt-2 text-xs leading-relaxed line-clamp-3 ${isActive ? "text-white/90" : "text-white/50"}`}>
                    {prob.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
