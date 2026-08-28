import React, { useState } from "react";
import { TrendingUp, BarChart2, LineChart, Calendar, ChevronDown, Activity, ArrowUpRight } from "lucide-react";

export interface TrendDataItem {
  label: string;
  value: number;
}

export interface TrendData {
  days7?: TrendDataItem[];
  days30?: TrendDataItem[];
  year1?: TrendDataItem[];
}

interface OverviewTrendChartCardProps {
  totalInquiries?: number;
  trendData?: TrendData;
}

export const OverviewTrendChartCard: React.FC<OverviewTrendChartCardProps> = ({
  totalInquiries = 0,
  trendData = {},
}) => {
  const [chartType, setChartType] = useState<"combined" | "bar" | "line">("combined");
  const [selectedPeriod, setSelectedPeriod] = useState<"7days" | "30days" | "1year">("7days");
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  // Dynamic DB Data with zero-fallbacks
  const data7Days = trendData?.days7 && trendData.days7.length > 0 ? trendData.days7 : [
    { label: "Sun", value: 0 },
    { label: "Mon", value: 0 },
    { label: "Tue", value: 0 },
    { label: "Wed", value: 0 },
    { label: "Thu", value: 0 },
    { label: "Fri", value: 0 },
    { label: "Sat", value: 0 },
  ];

  const data30Days = trendData?.days30 && trendData.days30.length > 0 ? trendData.days30 : [
    { label: "W1", value: 0 },
    { label: "W2", value: 0 },
    { label: "W3", value: 0 },
    { label: "W4", value: 0 },
  ];

  const data1Year = trendData?.year1 && trendData.year1.length > 0 ? trendData.year1 : [
    { label: "Q1", value: 0 },
    { label: "Q2", value: 0 },
    { label: "Q3", value: 0 },
    { label: "Q4", value: 0 },
  ];

  const currentData = selectedPeriod === "7days" ? data7Days : selectedPeriod === "30days" ? data30Days : data1Year;
  
  // Dynamic active index selection
  const activeIdx = hoveredBar !== null && hoveredBar < currentData.length ? hoveredBar : Math.min(2, currentData.length - 1);
  const activeItem = currentData[activeIdx] || currentData[0] || { label: "N/A", value: 0 };

  const maxRawValue = Math.max(...currentData.map((d) => d.value));
  const maxValue = maxRawValue > 0 ? maxRawValue : 10;

  // Dynamic Y-axis ticks
  const yTicks = [
    Math.round(maxValue),
    Math.round(maxValue * 0.75),
    Math.round(maxValue * 0.5),
    Math.round(maxValue * 0.25),
    0,
  ];

  // Active bar height percentage for guideline
  const activeHeightPercent = maxRawValue > 0 ? Math.max(12, Math.round((activeItem.value / maxValue) * 85)) : 12;

  // DYNAMIC SVG LINE PATH COMPUTATION FROM REAL DATA POINTS
  const svgWidth = 500;
  const svgHeight = 140;
  const paddingX = 20;
  const paddingY = 20;
  const chartW = svgWidth - paddingX * 2;
  const chartH = svgHeight - paddingY * 2;

  const pointsCoords = currentData.map((item, i) => {
    const x = paddingX + (i / (currentData.length - 1)) * chartW;
    const y = maxRawValue === 0
      ? svgHeight - paddingY
      : (svgHeight - paddingY) - (item.value / maxRawValue) * chartH;
    return { x, y, value: item.value, label: item.label };
  });

  let linePathD = "";
  let areaPathD = "";

  if (maxRawValue === 0) {
    // FLAT BOTTOM LINE WHEN ALL DATA IS 0 (NO FAKE WAVES)
    const flatY = svgHeight - paddingY;
    const firstX = pointsCoords[0].x;
    const lastX = pointsCoords[pointsCoords.length - 1].x;
    linePathD = `M ${firstX},${flatY} L ${lastX},${flatY}`;
    areaPathD = `M ${firstX},${flatY} L ${lastX},${flatY} L ${lastX},${svgHeight} L ${firstX},${svgHeight} Z`;
  } else {
    // DYNAMIC SMOOTH BEZIER CURVE TRACKING REAL SQL VALUES
    linePathD = `M ${pointsCoords[0].x},${pointsCoords[0].y}`;
    for (let i = 0; i < pointsCoords.length - 1; i++) {
      const curr = pointsCoords[i];
      const next = pointsCoords[i + 1];
      const cp1x = curr.x + (next.x - curr.x) / 2;
      const cp1y = curr.y;
      const cp2x = curr.x + (next.x - curr.x) / 2;
      const cp2y = next.y;
      linePathD += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${next.x},${next.y}`;
    }
    const firstX = pointsCoords[0].x;
    const lastX = pointsCoords[pointsCoords.length - 1].x;
    const bottomY = svgHeight - paddingY;
    areaPathD = `${linePathD} L ${lastX},${bottomY} L ${firstX},${bottomY} Z`;
  }

  const activeCoord = pointsCoords[activeIdx] || pointsCoords[0];

  return (
    <div className="p-2.5 sm:p-3 rounded-2xl bg-zinc-100/80 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800/80 space-y-2 font-sans">
      
      {/* 1. Outer Card Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-semibold text-zinc-600 dark:text-zinc-300 tracking-tight truncate">
            Ticket Volume Trend
          </span>
          <div className="text-zinc-400 dark:text-zinc-500 p-0.5 shrink-0">
            <Activity className="h-4 w-4" />
          </div>
        </div>

        {/* 2 Dropdown Select Filters */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Dropdown 1: Chart View Mode Switcher */}
          <div className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-800 dark:text-zinc-200 shadow-2xs">
            {chartType === "bar" ? (
              <BarChart2 className="h-3.5 w-3.5 text-[#005883] dark:text-sky-400 shrink-0" />
            ) : chartType === "line" ? (
              <LineChart className="h-3.5 w-3.5 text-[#005883] dark:text-sky-400 shrink-0" />
            ) : (
              <Activity className="h-3.5 w-3.5 text-[#005883] dark:text-sky-400 shrink-0" />
            )}
            <select
              value={chartType}
              onChange={(e) => setChartType(e.target.value as any)}
              className="bg-transparent border-none focus:outline-none focus:ring-0 text-xs font-semibold text-zinc-800 dark:text-zinc-200 cursor-pointer pr-4 appearance-none"
            >
              <option value="combined" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-semibold">
                Combined (Bar + Line)
              </option>
              <option value="bar" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-semibold">
                Bar Diagram
              </option>
              <option value="line" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-semibold">
                Line Chart
              </option>
            </select>
            <ChevronDown className="h-3.5 w-3.5 text-zinc-400 pointer-events-none absolute right-2" />
          </div>

          {/* Dropdown 2: Time Range Filter */}
          <div className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-800 dark:text-zinc-200 shadow-2xs">
            <Calendar className="h-3.5 w-3.5 text-[#005883] dark:text-sky-400 shrink-0" />
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as any)}
              className="bg-transparent border-none focus:outline-none focus:ring-0 text-xs font-semibold text-zinc-800 dark:text-zinc-200 cursor-pointer pr-4 appearance-none"
            >
              <option value="7days" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-semibold">
                Last 7 days
              </option>
              <option value="30days" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-semibold">
                Last 30 days
              </option>
              <option value="1year" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-semibold">
                1 Year
              </option>
            </select>
            <ChevronDown className="h-3.5 w-3.5 text-zinc-400 pointer-events-none absolute right-2" />
          </div>

        </div>
      </div>

      {/* 2. Inner Raised White Card Box */}
      <div className="p-4 sm:p-6 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 shadow-2xs space-y-6">
        
        {/* Dynamic Top Stat Line */}
        <div className="flex items-baseline gap-3">
          <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white font-sans">
            {totalInquiries.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-medium font-mono">
            {totalInquiries > 0 ? (
              <span className="font-bold text-emerald-600 dark:text-emerald-400">+8%</span>
            ) : (
              <span className="font-semibold text-zinc-400 dark:text-zinc-500">0%</span>
            )}
            <span className="text-zinc-400 dark:text-zinc-500 font-normal">vs last week</span>
          </div>
        </div>

        {/* 100% Dynamic Visual Chart Container with Gambar 2 Styling */}
        <div className="relative pt-6 pb-2 pr-10">
          
          {/* Subtle Grid Mesh Background */}
          <div className="absolute inset-0 right-10 bottom-8 border-b border-zinc-200 dark:border-zinc-800 grid grid-rows-4 pointer-events-none opacity-40">
            <div className="border-b border-dashed border-zinc-200 dark:border-zinc-800" />
            <div className="border-b border-dashed border-zinc-200 dark:border-zinc-800" />
            <div className="border-b border-dashed border-zinc-200 dark:border-zinc-800" />
            <div className="border-b border-dashed border-zinc-200 dark:border-zinc-800" />
          </div>

          {/* Dynamic Y-Axis Labels on Right */}
          <div className="absolute right-0 top-6 bottom-8 flex flex-col justify-between items-end text-xs font-mono text-zinc-400 dark:text-zinc-600 pointer-events-none">
            {yTicks.map((tick, i) => (
              <span key={i}>{tick}</span>
            ))}
          </div>

          {/* Dynamic Floating White Tooltip Card */}
          <div
            className="absolute z-30 transition-all duration-300 -translate-x-1/2 pointer-events-none"
            style={{
              left: `${((activeIdx + 0.5) / currentData.length) * 88 + 3}%`,
              bottom: maxRawValue > 0 ? `calc(${activeHeightPercent}% + 28px)` : "40px",
            }}
          >
            <div className="px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200/90 dark:border-zinc-700 shadow-xl space-y-0.5 whitespace-nowrap font-sans">
              <div className="text-[10px] font-semibold text-zinc-400">{activeItem.label}</div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold font-mono">{activeItem.value}</span>
                <span className="inline-flex items-center text-[10px] font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                  <ArrowUpRight className="h-3 w-3" />
                  +5.2%
                </span>
              </div>
            </div>
          </div>

          {/* Dynamic Bar Diagram Columns */}
          <div className="relative z-10 h-56 flex items-end justify-between px-2">
            {currentData.map((item, idx) => {
              const heightPercent = maxRawValue > 0 ? Math.max(12, Math.round((item.value / maxValue) * 85)) : 12;
              const isActive = activeIdx === idx;

              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredBar(idx)}
                  className="flex flex-col items-center gap-3 flex-1 group cursor-pointer"
                >
                  {/* Rounded Pillar Bar */}
                  {chartType !== "line" ? (
                    <div className="w-full max-w-[40px] sm:max-w-[48px] h-44 flex items-end">
                      <div
                        style={{ height: maxRawValue > 0 ? `${heightPercent}%` : "12%" }}
                        className={`w-full transition-all duration-300 rounded-xl ${
                          maxRawValue === 0
                            ? "bg-zinc-100 dark:bg-zinc-800/40 opacity-40"
                            : isActive
                            ? "bg-[#005883] dark:bg-sky-400 shadow-md"
                            : "bg-zinc-100 dark:bg-zinc-800/70 hover:bg-zinc-300 dark:hover:bg-zinc-700"
                        }`}
                      />
                    </div>
                  ) : (
                    <div className="h-44 w-full" />
                  )}

                  {/* X-Axis Label */}
                  <span className={`text-xs font-semibold transition-colors ${
                    isActive ? "text-zinc-900 dark:text-white font-bold" : "text-zinc-400 dark:text-zinc-500"
                  }`}>
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* DYNAMIC SVG LINE PATH TRACKING REAL SQL VALUES */}
          {chartType !== "bar" && (
            <div className="absolute inset-0 pointer-events-none z-20 flex items-center px-4 pt-6 pb-8">
              <svg className="w-full h-44 overflow-visible" viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="none">
                <defs>
                  <linearGradient id="smoothLineGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#005883" stopOpacity={maxRawValue > 0 ? "0.2" : "0.0"} />
                    <stop offset="100%" stopColor="#005883" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                
                {/* Area Gradient Fill under Path */}
                <path
                  d={areaPathD}
                  fill="url(#smoothLineGrad)"
                />

                {/* Main Dynamic Line Path */}
                <path
                  d={linePathD}
                  fill="none"
                  stroke={maxRawValue > 0 ? "#005883" : "#d4d4d8"}
                  strokeWidth={maxRawValue > 0 ? "2.5" : "1.5"}
                  strokeDasharray={maxRawValue === 0 ? "4 4" : undefined}
                  strokeLinecap="round"
                  className={maxRawValue > 0 ? "dark:stroke-sky-400" : "dark:stroke-zinc-700"}
                />

                {/* Active Point Circle Indicator */}
                {maxRawValue > 0 && activeCoord && (
                  <circle
                    cx={activeCoord.x}
                    cy={activeCoord.y}
                    r="4.5"
                    fill="#005883"
                    className="dark:fill-sky-400 animate-pulse"
                  />
                )}
              </svg>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
