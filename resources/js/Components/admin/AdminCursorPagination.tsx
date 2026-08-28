import React from "react";
import { ChevronLeft, ChevronRight, Layers } from "lucide-react";
import { router } from "@inertiajs/react";

export interface CursorPaginationData {
  next_page_url?: string | null;
  prev_page_url?: string | null;
  next_cursor?: string | null;
  prev_cursor?: string | null;
  per_page?: number;
  has_more_pages?: boolean;
}

interface AdminCursorPaginationProps {
  pagination?: CursorPaginationData | null;
  currentTab?: string;
  searchQuery?: string;
  sortDir?: "asc" | "desc";
  onNavigate?: () => void;
  onFinish?: () => void;
}

export const AdminCursorPagination: React.FC<AdminCursorPaginationProps> = ({
  pagination,
  currentTab,
  searchQuery,
  sortDir,
  onNavigate,
  onFinish,
}) => {
  if (!pagination) return null;

  const hasNext = Boolean(pagination.next_page_url);
  const hasPrev = Boolean(pagination.prev_page_url);

  const handleGo = (url: string | null | undefined) => {
    if (!url) return;
    if (onNavigate) onNavigate();

    router.get(
      url,
      {},
      {
        preserveState: true,
        preserveScroll: true,
        onFinish: () => {
          if (onFinish) onFinish();
        },
      }
    );
  };

  return (
    <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans">
      <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 font-medium">
        <Layers className="h-4 w-4 text-blue-600 shrink-0" />
        <span>
          Showing up to <strong className="text-zinc-900 dark:text-white font-bold">{pagination.per_page || 20}</strong> items per page (Cursor Index Seek)
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={!hasPrev}
          onClick={() => handleGo(pagination.prev_page_url)}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
            hasPrev
              ? "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 shadow-xs cursor-pointer active:scale-95"
              : "border-zinc-200/50 dark:border-zinc-800/40 bg-zinc-100/50 dark:bg-zinc-900/40 text-zinc-400 dark:text-zinc-600 cursor-not-allowed opacity-60"
          }`}
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </button>

        <button
          type="button"
          disabled={!hasNext}
          onClick={() => handleGo(pagination.next_page_url)}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
            hasNext
              ? "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 shadow-xs cursor-pointer active:scale-95"
              : "border-zinc-200/50 dark:border-zinc-800/40 bg-zinc-100/50 dark:bg-zinc-900/40 text-zinc-400 dark:text-zinc-600 cursor-not-allowed opacity-60"
          }`}
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
