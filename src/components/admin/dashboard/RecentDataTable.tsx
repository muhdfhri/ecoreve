import React, { useState } from "react";
import {
  CircleDot,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
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

export const RecentDataTable: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

                  <td className="p-3.5 font-bold text-zinc-900 dark:text-white">
                    {row.header}
                  </td>

                  <td className="p-3.5">
                    <span className="inline-block px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-[11px] font-medium border border-zinc-200/60 dark:border-zinc-700">
                      {row.sectionType}
                    </span>
                  </td>

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

                  <td className="p-3.5 text-center font-mono text-zinc-700 dark:text-zinc-300">
                    {row.target}
                  </td>

                  <td className="p-3.5 text-center font-mono text-zinc-700 dark:text-zinc-300">
                    {row.limit}
                  </td>

                  <td className="p-3.5">
                    {row.reviewer === "Assign reviewer" ? (
                      <button className="px-3 py-1 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all text-xs font-medium inline-flex items-center gap-1.5 cursor-pointer">
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

      {/* Data Table Footer Pagination Bar */}
      <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
        <div>
          <span>{selectedRows.length} of 68 row(s) selected.</span>
        </div>

        <div className="flex items-center gap-6">
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

          <div>
            <span>Page 1 of 7</span>
          </div>

          <div className="flex items-center gap-1">
            <button className="p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-40" disabled>
              <ChevronsLeft className="h-4 w-4" />
            </button>
            <button className="p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-40" disabled>
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer">
              <ChevronRight className="h-4 w-4" />
            </button>
            <button className="p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer">
              <ChevronsRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
