import React, { useState } from "react";
import {
  LayoutDashboard,
  RefreshCw,
  BarChart3,
  Folder,
  Users,
  Database,
  FileText,
  Sparkles,
  MoreHorizontal,
  Settings,
  HelpCircle,
  Search,
  Plus,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  Sliders,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  CircleDot,
  Check,
} from "lucide-react";

interface TableRow {
  id: string;
  header: string;
  sectionType: string;
  status: "In Process" | "Done";
  target: number;
  limit: number;
  reviewer: string;
}

export const AdminDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<"3months" | "30days" | "7days">("3months");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [activeTab, setActiveTab] = useState("Dashboard");

  // Sample Table Data (100% Matching Screenshot 2)
  const tableData: TableRow[] = [
    { id: "1", header: "Cover page", sectionType: "Cover page", status: "In Process", target: 18, limit: 5, reviewer: "Eddie Lake" },
    { id: "2", header: "Table of contents", sectionType: "Table of contents", status: "Done", target: 29, limit: 24, reviewer: "Eddie Lake" },
    { id: "3", header: "Executive summary", sectionType: "Narrative", status: "Done", target: 10, limit: 13, reviewer: "Eddie Lake" },
    { id: "4", header: "Technical approach", sectionType: "Narrative", status: "Done", target: 27, limit: 23, reviewer: "Jamik Tashpulatov" },
    { id: "5", header: "Design", sectionType: "Narrative", status: "In Process", target: 2, limit: 16, reviewer: "Jamik Tashpulatov" },
    { id: "6", header: "Capabilities", sectionType: "Narrative", status: "In Process", target: 20, limit: 8, reviewer: "Jamik Tashpulatov" },
    { id: "7", header: "Integration with existing systems", sectionType: "Narrative", status: "In Process", target: 19, limit: 21, reviewer: "Jamik Tashpulatov" },
    { id: "8", header: "Innovation and Advantages", sectionType: "Narrative", status: "Done", target: 25, limit: 26, reviewer: "Assign reviewer" },
    { id: "9", header: "Overview of EMR's Innovative Solutions", sectionType: "Technical content", status: "Done", target: 7, limit: 23, reviewer: "Assign reviewer" },
    { id: "10", header: "Advanced Algorithms and Machine Learning", sectionType: "Narrative", status: "Done", target: 30, limit: 28, reviewer: "Assign reviewer" },
  ];

  const toggleSelectAll = () => {
    if (selectedRows.length === tableData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(tableData.map((r) => r.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rId) => rId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-zinc-950 flex font-sans antialiased text-zinc-900 dark:text-zinc-100">
      
      {/* 1. LEFT SIDEBAR NAVIGATION (100% Aligned to Acme Inc. / EcoReve Screenshot) */}
      <aside className="w-64 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col justify-between p-4 shrink-0 shadow-xs">
        <div className="space-y-6">
          
          {/* Brand Header */}
          <div className="flex items-center gap-2.5 px-2 py-1">
            <div className="h-7 w-7 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center font-bold text-xs shadow-xs">
              ◯
            </div>
            <span className="font-extrabold text-base tracking-tight text-zinc-900 dark:text-white">
              EcoReve Inc.
            </span>
          </div>

          {/* Nav Group 1: Home */}
          <div className="space-y-1">
            <p className="px-2 text-[11px] font-medium text-zinc-400 dark:text-zinc-500">Home</p>
            
            <button
              onClick={() => setActiveTab("Dashboard")}
              className={`w-full flex items-center gap-3 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === "Dashboard"
                  ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-semibold"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
              }`}
            >
              <LayoutDashboard className="h-4 w-4 text-zinc-500" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab("Lifecycle")}
              className={`w-full flex items-center gap-3 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === "Lifecycle"
                  ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-semibold"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
              }`}
            >
              <RefreshCw className="h-4 w-4 text-zinc-500" />
              <span>Lifecycle</span>
            </button>

            <button
              onClick={() => setActiveTab("Analytics")}
              className={`w-full flex items-center gap-3 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === "Analytics"
                  ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-semibold"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
              }`}
            >
              <BarChart3 className="h-4 w-4 text-zinc-500" />
              <span>Analytics</span>
            </button>

            <button
              onClick={() => setActiveTab("Projects")}
              className={`w-full flex items-center gap-3 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === "Projects"
                  ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-semibold"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
              }`}
            >
              <Folder className="h-4 w-4 text-zinc-500" />
              <span>Projects</span>
            </button>

            <button
              onClick={() => setActiveTab("Team")}
              className={`w-full flex items-center gap-3 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === "Team"
                  ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-semibold"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
              }`}
            >
              <Users className="h-4 w-4 text-zinc-500" />
              <span>Team</span>
            </button>
          </div>

          {/* Nav Group 2: Documents */}
          <div className="space-y-1">
            <p className="px-2 text-[11px] font-medium text-zinc-400 dark:text-zinc-500">Documents</p>

            <button
              onClick={() => setActiveTab("Data Library")}
              className={`w-full flex items-center gap-3 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === "Data Library"
                  ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-semibold"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
              }`}
            >
              <Database className="h-4 w-4 text-zinc-500" />
              <span>Data Library</span>
            </button>

            <button
              onClick={() => setActiveTab("Reports")}
              className={`w-full flex items-center gap-3 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === "Reports"
                  ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-semibold"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
              }`}
            >
              <FileText className="h-4 w-4 text-zinc-500" />
              <span>Reports</span>
            </button>

            <button
              onClick={() => setActiveTab("Word Assistant")}
              className={`w-full flex items-center gap-3 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === "Word Assistant"
                  ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-semibold"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
              }`}
            >
              <Sparkles className="h-4 w-4 text-zinc-500" />
              <span>Word Assistant</span>
            </button>

            <button className="w-full flex items-center gap-3 px-2.5 py-1.5 rounded-lg text-sm font-medium text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
              <MoreHorizontal className="h-4 w-4 text-zinc-400" />
              <span>More</span>
            </button>
          </div>

        </div>

        {/* Sidebar Footer Links & User Profile */}
        <div className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <div className="space-y-1">
            <button className="w-full flex items-center gap-3 px-2.5 py-1.5 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
              <Settings className="h-4 w-4 text-zinc-500" />
              <span>Settings</span>
            </button>
            <button className="w-full flex items-center gap-3 px-2.5 py-1.5 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
              <HelpCircle className="h-4 w-4 text-zinc-500" />
              <span>Get Help</span>
            </button>
            <button className="w-full flex items-center gap-3 px-2.5 py-1.5 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
              <Search className="h-4 w-4 text-zinc-500" />
              <span>Search</span>
            </button>
          </div>

          {/* User Profile Card (100% Match to bottom left screenshot) */}
          <div className="flex items-center justify-between gap-3 p-2 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="shadcn"
                className="h-8 w-8 rounded-full object-cover shrink-0"
              />
              <div className="flex flex-col truncate">
                <span className="text-xs font-bold text-zinc-900 dark:text-white truncate">shadcn</span>
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">m@example.com</span>
              </div>
            </div>
            <button className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-200/60 dark:hover:bg-zinc-800">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>

      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 bg-white dark:bg-zinc-950 overflow-y-auto">
        
        {/* Top Header Bar */}
        <header className="h-16 px-8 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-white dark:bg-zinc-900 shrink-0">
          <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Documents
          </h1>

          {/* Quick Create Action Button */}
          <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer">
            <Plus className="h-4 w-4" />
            <span>Quick Create</span>
          </button>
        </header>

        {/* Dashboard Body Container */}
        <div className="p-8 space-y-8 max-w-[1400px]">

          {/* 3. METRICS STAT CARDS GRID (4 TOP CARDS 100% MATCHING SCREENSHOT 1) */}
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
                  Trending up this month <TrendingUp className="h-3.5 w-3.5 inline" />
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
                  Down 20% this period <TrendingDown className="h-3.5 w-3.5 inline" />
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
                  Strong user retention <TrendingUp className="h-3.5 w-3.5 inline" />
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
                  Steady performance increase <TrendingUp className="h-3.5 w-3.5 inline" />
                </p>
                <p className="text-zinc-400 dark:text-zinc-500">Meets growth projections</p>
              </div>
            </div>

          </div>

          {/* 4. TOTAL VISITORS CHART CARD (WITH PERIOD PILL TABS) */}
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
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    selectedPeriod === "3months"
                      ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs font-bold"
                      : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                  }`}
                >
                  Last 3 months
                </button>
                <button
                  onClick={() => setSelectedPeriod("30days")}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    selectedPeriod === "30days"
                      ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs font-bold"
                      : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                  }`}
                >
                  Last 30 days
                </button>
                <button
                  onClick={() => setSelectedPeriod("7days")}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
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
                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,150 Q100,120 200,90 T400,130 T600,40 T800,80 L800,180 L0,180 Z"
                  fill="url(#visitorGradient)"
                />
                <path
                  d="M0,150 Q100,120 200,90 T400,130 T600,40 T800,80"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* 5. DATA TABLE SECTION (100% MATCHING SCREENSHOT 2) */}
          <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-600 dark:text-zinc-300">
                
                {/* Table Header */}
                <thead className="bg-zinc-50/80 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 font-semibold border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th className="p-3.5 w-10 text-center">
                      <input
                        type="checkbox"
                        checked={selectedRows.length === tableData.length}
                        onChange={toggleSelectAll}
                        className="rounded border-zinc-300 dark:border-zinc-700 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                    </th>
                    <th className="p-3.5 font-bold">Header</th>
                    <th className="p-3.5 font-bold">Section Type</th>
                    <th className="p-3.5 font-bold">Status</th>
                    <th className="p-3.5 font-bold text-center">Target</th>
                    <th className="p-3.5 font-bold text-center">Limit</th>
                    <th className="p-3.5 font-bold">Reviewer</th>
                  </tr>
                </thead>

                {/* Table Body Rows */}
                <tbody className="divide-y divide-zinc-200/70 dark:divide-zinc-800/70">
                  {tableData.map((row) => {
                    const isSelected = selectedRows.includes(row.id);
                    return (
                      <tr
                        key={row.id}
                        className={`transition-colors hover:bg-zinc-50/70 dark:hover:bg-zinc-800/40 ${
                          isSelected ? "bg-blue-50/40 dark:bg-blue-950/20" : ""
                        }`}
                      >
                        {/* Drag Handle & Checkbox */}
                        <td className="p-3.5 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <span className="text-zinc-300 dark:text-zinc-700 text-xs font-mono">::</span>
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleSelectRow(row.id)}
                              className="rounded border-zinc-300 dark:border-zinc-700 text-blue-600 focus:ring-blue-500 cursor-pointer"
                            />
                          </div>
                        </td>

                        {/* Header Title */}
                        <td className="p-3.5 font-bold text-zinc-900 dark:text-white">
                          {row.header}
                        </td>

                        {/* Section Type Badge */}
                        <td className="p-3.5">
                          <span className="inline-block px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-[11px] font-medium border border-zinc-200/60 dark:border-zinc-700">
                            {row.sectionType}
                          </span>
                        </td>

                        {/* Status Badge (In Process / Done 100% Match) */}
                        <td className="p-3.5">
                          {row.status === "In Process" ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-[11px] font-medium border border-zinc-200/60 dark:border-zinc-700">
                              <CircleDot className="h-3 w-3 text-amber-500 animate-spin" />
                              In Process
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-[11px] font-medium border border-emerald-200/60 dark:border-emerald-800/40">
                              <CheckCircle2 className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                              Done
                            </span>
                          )}
                        </td>

                        {/* Target Number */}
                        <td className="p-3.5 text-center font-mono text-zinc-700 dark:text-zinc-300">
                          {row.target}
                        </td>

                        {/* Limit Number */}
                        <td className="p-3.5 text-center font-mono text-zinc-700 dark:text-zinc-300">
                          {row.limit}
                        </td>

                        {/* Reviewer Field / Dropdown */}
                        <td className="p-3.5">
                          {row.reviewer === "Assign reviewer" ? (
                            <button className="px-3 py-1 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all text-xs font-medium inline-flex items-center gap-1.5">
                              <span>Assign reviewer</span>
                              <span className="text-[10px]">▼</span>
                            </button>
                          ) : (
                            <span className="font-medium text-zinc-900 dark:text-white">
                              {row.reviewer}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Data Table Footer Pagination Bar (100% Match to Screenshot 2) */}
            <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
              <div>
                <span>{selectedRows.length} of 68 row(s) selected.</span>
              </div>

              <div className="flex items-center gap-6">
                {/* Rows per page selector */}
                <div className="flex items-center gap-2">
                  <span>Rows per page</span>
                  <select
                    value={rowsPerPage}
                    onChange={(e) => setRowsPerPage(Number(e.target.value))}
                    className="px-2 py-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-medium focus:ring-1 focus:ring-blue-500"
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>

                {/* Current Page */}
                <div>
                  <span>Page 1 of 7</span>
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center gap-1">
                  <button className="p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-40" disabled>
                    <ChevronsLeft className="h-4 w-4" />
                  </button>
                  <button className="p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-40" disabled>
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button className="p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  <button className="p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                    <ChevronsRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
};
