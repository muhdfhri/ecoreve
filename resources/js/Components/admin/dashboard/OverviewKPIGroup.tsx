import React from "react";
import { Package, Inbox, Zap } from "lucide-react";

export interface OverviewStatsData {
  totalProducts?: number;
  totalServices?: number;
  totalInquiries?: number;
  pendingInquiries?: number;
  closedInquiries?: number;
  resolutionRate?: number;
  totalNews?: number;
  totalOffices?: number;
  totalUsers?: number;
  catalogGrowth?: number;
  inquiriesGrowth?: number;
}

interface OverviewKPIGroupProps {
  stats?: OverviewStatsData;
}

export const OverviewKPIGroup: React.FC<OverviewKPIGroupProps> = ({ stats }) => {
  const catalogCount = (stats?.totalProducts || 0) + (stats?.totalServices || 0);
  const inquiriesCount = stats?.totalInquiries || 0;
  const resolutionRate = stats?.resolutionRate ?? 100;

  const catalogGrowth = stats?.catalogGrowth ?? 0;
  const inquiriesGrowth = stats?.inquiriesGrowth ?? 0;

  // Helper for rendering trend growth badge according to mathematical best practice
  const renderTrendBadge = (growthVal: number) => {
    if (growthVal > 0) {
      return (
        <span className="font-bold text-emerald-600 dark:text-emerald-400">
          +{growthVal}%
        </span>
      );
    } else if (growthVal < 0) {
      return (
        <span className="font-bold text-rose-500 dark:text-rose-400">
          {growthVal}%
        </span>
      );
    } else {
      return (
        <span className="font-semibold text-zinc-400 dark:text-zinc-500">
          0%
        </span>
      );
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-sans">
      
      {/* CARD 1: CATALOG ASSETS */}
      <div className="p-2.5 sm:p-3 rounded-2xl bg-zinc-100/80 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/80 space-y-2 transition-all">
        {/* Top Header Row */}
        <div className="flex items-center justify-between px-1">
          <span className="text-[13px] font-semibold text-zinc-600 dark:text-zinc-300 tracking-tight truncate">
            Catalog Assets
          </span>
          <div className="text-zinc-400 dark:text-zinc-500 p-0.5 shrink-0">
            <Package className="h-4 w-4" />
          </div>
        </div>

        {/* Inner Raised White Box */}
        <div className="p-3 sm:p-3.5 pr-3.5 sm:pr-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 shadow-2xs flex items-center justify-between gap-3 overflow-hidden">
          {/* Left Column: Big Stat Number + Trend Sub-text */}
          <div className="space-y-1 min-w-0 shrink-0">
            <div className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white font-sans">
              {catalogCount.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-[11px] font-medium whitespace-nowrap pt-0.5">
              {renderTrendBadge(catalogGrowth)}
              <span className="text-zinc-400 dark:text-zinc-500 font-normal">vs last week</span>
            </div>
          </div>

          {/* Right Column: Smooth Area Sparkline Wave SVG */}
          <div className="h-9 sm:h-10 w-16 sm:w-20 xl:w-22 shrink-0 overflow-hidden pr-1">
            <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
              <defs>
                <linearGradient id="cardGrad1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={catalogGrowth >= 0 ? "0.3" : "0.0"} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M 0 35 L 0 28 Q 15 25, 30 15 T 60 20 T 80 8 T 92 14 L 92 35 Z"
                fill="url(#cardGrad1)"
              />
              <path
                d="M 0 28 Q 15 25, 30 15 T 60 20 T 80 8 T 92 14"
                fill="none"
                stroke={catalogGrowth >= 0 ? "#10b981" : "#a1a1aa"}
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* CARD 2: CLIENT INQUIRIES */}
      <div className="p-2.5 sm:p-3 rounded-2xl bg-zinc-100/80 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/80 space-y-2 transition-all">
        {/* Top Header Row */}
        <div className="flex items-center justify-between px-1">
          <span className="text-[13px] font-semibold text-zinc-600 dark:text-zinc-300 tracking-tight truncate">
            Client Inquiries
          </span>
          <div className="text-zinc-400 dark:text-zinc-500 p-0.5 shrink-0">
            <Inbox className="h-4 w-4" />
          </div>
        </div>

        {/* Inner Raised White Box */}
        <div className="p-3 sm:p-3.5 pr-3.5 sm:pr-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 shadow-2xs flex items-center justify-between gap-3 overflow-hidden">
          {/* Left Column: Big Stat Number + Trend Sub-text */}
          <div className="space-y-1 min-w-0 shrink-0">
            <div className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white font-sans">
              {inquiriesCount.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-[11px] font-medium whitespace-nowrap pt-0.5">
              {renderTrendBadge(inquiriesGrowth)}
              <span className="text-zinc-400 dark:text-zinc-500 font-normal">vs last week</span>
            </div>
          </div>

          {/* Right Column: Smooth Area Sparkline Wave SVG */}
          <div className="h-9 sm:h-10 w-16 sm:w-20 xl:w-22 shrink-0 overflow-hidden pr-1">
            <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
              <defs>
                <linearGradient id="cardGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={inquiriesGrowth >= 0 ? "0.3" : "0.0"} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M 0 35 L 0 30 Q 25 25, 50 18 T 75 10 T 92 16 L 92 35 Z"
                fill="url(#cardGrad2)"
              />
              <path
                d="M 0 30 Q 25 25, 50 18 T 75 10 T 92 16"
                fill="none"
                stroke={inquiriesGrowth >= 0 ? "#10b981" : "#a1a1aa"}
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* CARD 3: SLA RESOLUTION RATE */}
      <div className="p-2.5 sm:p-3 rounded-2xl bg-zinc-100/80 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/80 space-y-2 transition-all">
        {/* Top Header Row */}
        <div className="flex items-center justify-between px-1">
          <span className="text-[13px] font-semibold text-zinc-600 dark:text-zinc-300 tracking-tight truncate">
            SLA Resolution Rate
          </span>
          <div className="text-zinc-400 dark:text-zinc-500 p-0.5 shrink-0">
            <Zap className="h-4 w-4" />
          </div>
        </div>

        {/* Inner Raised White Box */}
        <div className="p-3 sm:p-3.5 pr-3.5 sm:pr-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 shadow-2xs flex items-center justify-between gap-3 overflow-hidden">
          {/* Left Column: Big Stat Number + Trend Sub-text */}
          <div className="space-y-1 min-w-0 shrink-0">
            <div className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white font-sans">
              {resolutionRate}%
            </div>
            <div className="flex items-center gap-1 text-[11px] font-medium whitespace-nowrap pt-0.5">
              <span className="font-semibold text-zinc-400 dark:text-zinc-500">0%</span>
              <span className="text-zinc-400 dark:text-zinc-500 font-normal">vs last week</span>
            </div>
          </div>

          {/* Right Column: Smooth Area Sparkline Wave SVG */}
          <div className="h-9 sm:h-10 w-16 sm:w-20 xl:w-22 shrink-0 overflow-hidden pr-1">
            <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
              <defs>
                <linearGradient id="cardGrad3" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M 0 35 L 0 20 Q 20 28, 40 10 T 68 25 T 92 14 L 92 35 Z"
                fill="url(#cardGrad3)"
              />
              <path
                d="M 0 20 Q 20 28, 40 10 T 68 25 T 92 14"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

    </div>
  );
};
