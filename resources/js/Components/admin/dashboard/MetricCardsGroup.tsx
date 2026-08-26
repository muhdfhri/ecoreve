import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export const MetricCardsGroup: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      
      {/* Card 1: Total Revenue */}
      <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <span>Total Revenue</span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono text-[11px] font-bold">
            <TrendingUp className="h-3 w-3 text-emerald-600" />
            +12.5%
          </span>
        </div>
        <div>
          <span className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white font-sans">
            $1,250.00
          </span>
        </div>
        <div className="pt-2 text-xs space-y-0.5">
          <p className="font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-1">
            Trending up this month <TrendingUp className="h-3.5 w-3.5 inline text-emerald-600" />
          </p>
          <p className="text-zinc-400 dark:text-zinc-500">Visitors for the last 6 months</p>
        </div>
      </div>

      {/* Card 2: New Customers */}
      <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <span>New Customers</span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono text-[11px] font-bold">
            <TrendingDown className="h-3 w-3 text-rose-500" />
            -20%
          </span>
        </div>
        <div>
          <span className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white font-sans">
            1,234
          </span>
        </div>
        <div className="pt-2 text-xs space-y-0.5">
          <p className="font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-1">
            Down 20% this period <TrendingDown className="h-3.5 w-3.5 inline text-rose-500" />
          </p>
          <p className="text-zinc-400 dark:text-zinc-500">Acquisition needs attention</p>
        </div>
      </div>

      {/* Card 3: Active Accounts */}
      <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <span>Active Accounts</span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono text-[11px] font-bold">
            <TrendingUp className="h-3 w-3 text-emerald-600" />
            +12.5%
          </span>
        </div>
        <div>
          <span className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white font-sans">
            45,678
          </span>
        </div>
        <div className="pt-2 text-xs space-y-0.5">
          <p className="font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-1">
            Strong user retention <TrendingUp className="h-3.5 w-3.5 inline text-emerald-600" />
          </p>
          <p className="text-zinc-400 dark:text-zinc-500">Engagement exceed targets</p>
        </div>
      </div>

      {/* Card 4: Growth Rate */}
      <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <span>Growth Rate</span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono text-[11px] font-bold">
            <TrendingUp className="h-3 w-3 text-emerald-600" />
            +4.5%
          </span>
        </div>
        <div>
          <span className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white font-sans">
            4.5%
          </span>
        </div>
        <div className="pt-2 text-xs space-y-0.5">
          <p className="font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-1">
            Steady performance increase <TrendingUp className="h-3.5 w-3.5 inline text-emerald-600" />
          </p>
          <p className="text-zinc-400 dark:text-zinc-500">Meets growth projections</p>
        </div>
      </div>

    </div>
  );
};
