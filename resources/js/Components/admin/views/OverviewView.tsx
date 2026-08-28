import React from "react";
import { OverviewKPIGroup, OverviewStatsData } from "../dashboard/OverviewKPIGroup";
import { OverviewTrendChartCard, TrendData } from "../dashboard/OverviewTrendChartCard";
import { OverviewActivityFeedCard, ActivityItem } from "../dashboard/OverviewActivityFeedCard";
import { OverviewRecentTableCard } from "../dashboard/OverviewRecentTableCard";
import { InquiryData } from "./InquiriesAdminView";

interface OverviewViewProps {
  overviewStats?: OverviewStatsData;
  trendData?: TrendData;
  latestActivityFeed?: ActivityItem[];
  recentInquiriesList?: InquiryData[];
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  overviewStats = {},
  trendData = {},
  latestActivityFeed = [],
  recentInquiriesList = [],
}) => {
  return (
    <div className="space-y-6 font-sans">
      
      {/* 2-COLUMN MAIN DASHBOARD GRID (MATCHING REFERENCE IMAGE LAYOUT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: 3 KPI CARDS + TREND CHART (8 SPAN COLS) */}
        <div className="lg:col-span-8 space-y-6">
          {/* 3 KPI Cards Group */}
          <OverviewKPIGroup stats={overviewStats} />

          {/* Engagement Volume Trend Chart */}
          <OverviewTrendChartCard
            totalInquiries={overviewStats?.totalInquiries}
            trendData={trendData}
          />
        </div>

        {/* RIGHT COLUMN: LATEST UPDATES SIDEBAR (STRETCHES FROM TOP PARALLEL TO CARDS DOWN TO CHART) (4 SPAN COLS) */}
        <div className="lg:col-span-4 h-full">
          <OverviewActivityFeedCard activityFeed={latestActivityFeed} />
        </div>

      </div>

      {/* BOTTOM SECTION: RECENT INQUIRIES MONITORING SNAPSHOT TABLE (FULL 12 COLS WIDTH) */}
      <div>
        <OverviewRecentTableCard recentInquiries={recentInquiriesList} />
      </div>

    </div>
  );
};
