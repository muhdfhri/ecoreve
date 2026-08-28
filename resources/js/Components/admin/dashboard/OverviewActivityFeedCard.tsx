import React, { useState } from "react";
import { getTrans } from "@/utils/transHelper";
import {
  Search,
  Inbox,
  Newspaper,
  Package,
  History,
  ChevronRight,
  Activity,
} from "lucide-react";

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: "inquiry" | "news" | "product" | "service";
  status?: string;
}

interface OverviewActivityFeedCardProps {
  activityFeed?: ActivityItem[];
}

export const OverviewActivityFeedCard: React.FC<OverviewActivityFeedCardProps> = ({
  activityFeed = [],
}) => {
  const [activePeriod, setActivePeriod] = useState<"today" | "yesterday" | "week">("today");
  const [searchQuery, setSearchQuery] = useState("");

  const defaultActivities: ActivityItem[] = [
    {
      id: "1",
      title: "New Client Inquiry",
      description: "Qingdao Water Works Corp. requested pricing quote",
      timestamp: "11:20 AM",
      type: "inquiry",
    },
    {
      id: "2",
      title: "Knowledge Article Published",
      description: '"EcoReve & DTCC ZLD System: Rationale & Current State"',
      timestamp: "10:45 AM",
      type: "news",
    },
    {
      id: "3",
      title: "Catalog Asset Updated",
      description: "High-Performance Butterfly Valve specs updated",
      timestamp: "09:30 AM",
      type: "product",
    },
    {
      id: "4",
      title: "Service Solution Added",
      description: "On-Site Mechanical & Piping Installation",
      timestamp: "Yesterday",
      type: "service",
    },
  ];

  const actualFeed = activityFeed && activityFeed.length > 0 ? activityFeed : defaultActivities;

  const filteredFeed = actualFeed.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-2.5 sm:p-3 rounded-2xl bg-zinc-100/80 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/80 space-y-2 transition-all font-sans h-full flex flex-col justify-between">
      
      {/* Outer Header Title & Icon */}
      <div className="flex items-center gap-2 px-1">
        <span className="text-[13px] font-semibold text-zinc-600 dark:text-zinc-300 tracking-tight truncate">
          Latest Updates
        </span>
        <div className="text-zinc-400 dark:text-zinc-500 p-0.5 shrink-0">
          <History className="h-4 w-4" />
        </div>
      </div>

      {/* 2. Inner Raised White Box (Option 3 Design System + Color System) */}
      <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 shadow-2xs flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-3.5">
          {/* Period Selector Tabs (EcoReve Brand Blue #005883 Active State) */}
          <div className="inline-flex w-full p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActivePeriod("today")}
              className={`flex-1 py-1.5 rounded-lg transition-all text-center cursor-pointer ${
                activePeriod === "today"
                  ? "bg-[#005883] text-white dark:bg-sky-500 dark:text-zinc-950 font-bold shadow-xs"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => setActivePeriod("yesterday")}
              className={`flex-1 py-1.5 rounded-lg transition-all text-center cursor-pointer ${
                activePeriod === "yesterday"
                  ? "bg-[#005883] text-white dark:bg-sky-500 dark:text-zinc-950 font-bold shadow-xs"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              Yesterday
            </button>
            <button
              type="button"
              onClick={() => setActivePeriod("week")}
              className={`flex-1 py-1.5 rounded-lg transition-all text-center cursor-pointer ${
                activePeriod === "week"
                  ? "bg-[#005883] text-white dark:bg-sky-500 dark:text-zinc-950 font-bold shadow-xs"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              This week
            </button>
          </div>

          {/* Search Input (Option 3 Clean Border Focus) */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search activities"
              className="w-full pl-8.5 pr-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-medium focus:outline-none focus:border-[#005883] dark:focus:border-white shadow-none transition-colors"
            />
          </div>

          {/* Counter Text Header */}
          <div className="pb-2.5 border-b border-dashed border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
            <span>
              <span className="font-extrabold text-[#005883] dark:text-sky-400 font-mono mr-1">
                {filteredFeed.length}
              </span>
              new activities {activePeriod}
            </span>
            <Activity className="h-3 w-3 text-zinc-400" />
          </div>

          {/* Timeline Feed Items */}
          <div className="space-y-3.5 relative pl-2 overflow-y-auto max-h-[360px] pr-1">
            {/* Dashed Timeline Connector Line */}
            <div className="absolute left-[23px] top-3 bottom-3 w-px border-l border-dashed border-zinc-200 dark:border-zinc-800 pointer-events-none" />

            {filteredFeed.map((activity) => {
              const displayTitle = getTrans(activity.title, "en");
              const displayDesc = getTrans(activity.description, "en");
              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 relative z-10 group cursor-pointer"
                >
                  {/* Type Icon Badge with Brand Accent */}
                  <div className="p-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700/60 shrink-0 text-zinc-700 dark:text-zinc-300 mt-0.5 group-hover:scale-105 transition-transform">
                    {activity.type === "inquiry" ? (
                      <Inbox className="h-3.5 w-3.5 text-[#005883] dark:text-sky-400" />
                    ) : activity.type === "news" ? (
                      <Newspaper className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Package className="h-3.5 w-3.5 text-[#005883] dark:text-sky-400" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-white truncate group-hover:text-[#005883] dark:group-hover:text-sky-400 transition-colors">
                        {displayTitle}
                      </h4>
                      <span className="text-[10px] font-mono text-zinc-400 shrink-0">
                        {activity.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5 font-medium">
                      {displayDesc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer View Logs Button */}
        <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
          <button
            type="button"
            className="w-full py-2 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:bg-[#005883] hover:text-white dark:hover:bg-sky-500 dark:hover:text-zinc-950 transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>View All System Activity Logs</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
