import React, { useState } from "react";

export const VisitorsChartCard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<"3months" | "30days" | "7days">("3months");

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-zinc-900 dark:text-white">Total Visitors</h3>
          <p className="text-xs text-zinc-400 dark:text-zinc-500">Total for the last 3 months</p>
        </div>

        {/* Period Pill Buttons */}
        <div className="inline-flex p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold">
          <button
            onClick={() => setSelectedPeriod("3months")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              selectedPeriod === "3months"
                ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs font-bold"
                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            Last 3 months
          </button>
          <button
            onClick={() => setSelectedPeriod("30days")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              selectedPeriod === "30days"
                ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs font-bold"
                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            Last 30 days
          </button>
          <button
            onClick={() => setSelectedPeriod("7days")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              selectedPeriod === "7days"
                ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs font-bold"
                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            Last 7 days
          </button>
        </div>
      </div>

      {/* Area Chart Wave Visual */}
      <div className="h-48 w-full flex items-end pt-4">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 800 180" preserveAspectRatio="none">
          <defs>
            <linearGradient id="visitorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#005883" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#005883" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path
            d="M0,150 Q100,120 200,90 T400,130 T600,40 T800,80 L800,180 L0,180 Z"
            fill="url(#visitorGradient)"
          />
          <path
            d="M0,150 Q100,120 200,90 T400,130 T600,40 T800,80"
            fill="none"
            stroke="#005883"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};
