import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { problems } from "@/data/problemsData";
import { useTranslation } from "@/i18n/useTranslation";

export const ProblemSection: React.FC = () => {
  const { t } = useTranslation();
  const [activeProblem, setActiveProblem] = useState<number>(1);

  return (
    <section className="mx-auto max-w-7xl px-5 py-12">
      <div className="rounded-[2.5rem] bg-[#1a2328] text-white p-8 md:p-12 border border-border/20 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <span className="inline-block rounded-full bg-[#008193]/30 border border-[#008193]/40 px-3 py-1 text-xs font-bold text-[#8ec63f]">
              {t.problems.badge}
            </span>
            <h2 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight max-w-xl leading-tight">
              {t.problems.title}
            </h2>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-white/70">
            {t.problems.subtitle}
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((prob, idx) => {
            const isActive = activeProblem === idx + 1;
            return (
              <div
                key={prob.n}
                onClick={() => setActiveProblem(idx + 1)}
                className={`group cursor-pointer rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between min-h-[220px] ${
                  isActive
                    ? "bg-[#005883] text-white shadow-lg ring-2 ring-white/20"
                    : "bg-white/5 hover:bg-white/10 text-white/80 border border-white/10"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-extrabold ${isActive ? "text-[#8ec63f]" : "text-white/40"}`}>
                    {prob.n}
                  </span>
                  <span className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${
                    isActive ? "bg-white text-[#005883]" : "bg-white/10 text-white group-hover:bg-white/20"
                  }`}>
                    <ArrowUpRight className="h-4 w-4" />
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
