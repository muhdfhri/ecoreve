import React from "react";
import { MetricCardsGroup } from "../dashboard/MetricCardsGroup";
import { VisitorsChartCard } from "../dashboard/VisitorsChartCard";
import { RecentDataTable } from "../dashboard/RecentDataTable";

export const OverviewView: React.FC = () => {
  return (
    <div className="space-y-8 font-sans">
      <MetricCardsGroup />
      <VisitorsChartCard />
      <RecentDataTable />
    </div>
  );
};
