import React, { useState, useEffect, useRef } from "react";
import { router } from "@inertiajs/react";
import {
  Plus,
  Search,
  HelpCircle,
  Edit,
  Trash2,
  X,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  Loader2,
} from "lucide-react";
import { EmptyState } from "@/Components/ui/EmptyState";
import { toast } from "@/Components/ui/sonner";
import { MultiLangInput } from "@/Components/ui/MultiLangInput";
import { MultiLangTextarea } from "@/Components/ui/MultiLangTextarea";
import { getTrans } from "@/utils/transHelper";
import { AdminCursorPagination, CursorPaginationData } from "../AdminCursorPagination";
import { AdminTableSkeleton } from "../AdminTableSkeleton";

export interface FaqData {
  id: number;
  question: any;
  answer: any;
  sort_order?: number;
  created_at?: string;
}

interface FaqsAdminViewProps {
  faqs?: FaqData[];
  faqsPagination?: CursorPaginationData | null;
  filters?: {
    sort_dir?: "asc" | "desc";
    search?: string;
  };
}

// Helper to extract 5-language dictionary from string or object
const extractMultiLangDict = (fieldData: any): { en: string; id: string; ms: string; th: string; zh: string } => {
  if (!fieldData) return { en: "", id: "", ms: "", th: "", zh: "" };
  if (typeof fieldData === "object" && fieldData !== null) {
    return {
      en: String(fieldData.en || ""),
      id: String(fieldData.id || ""),
      ms: String(fieldData.ms || ""),
      th: String(fieldData.th || ""),
      zh: String(fieldData.zh || ""),
    };
  }
  if (typeof fieldData === "string") {
    try {
      const parsed = JSON.parse(fieldData);
      if (typeof parsed === "object" && parsed !== null) {
        return {
          en: String(parsed.en || ""),
          id: String(parsed.id || ""),
          ms: String(parsed.ms || ""),
          th: String(parsed.th || ""),
          zh: String(parsed.zh || ""),
        };
      }
    } catch (e) {
      return { en: fieldData, id: fieldData, ms: fieldData, th: fieldData, zh: fieldData };
    }
  }
  return { en: String(fieldData), id: "", ms: "", th: "", zh: "" };
};

import { DataTable } from "@/Components/ui/data-table";
import { Layers } from "lucide-react";

export const FaqsAdminView: React.FC<FaqsAdminViewProps> = ({
  faqs = [],
  faqsPagination = null,
  filters = {},
}) => {
  const [searchQuery, setSearchQuery] = useState(filters?.search || "");
  const [sortDir, setSortDir] = useState<"asc" | "desc">(filters?.sort_dir || "desc");
  const [isFetching, setIsFetching] = useState(false);

  // Debounced Search Reference
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Modal States
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Form State
  const [selectedFaq, setSelectedFaq] = useState<FaqData | null>(null);
  const [formData, setFormData] = useState({
    question: { en: "", id: "", ms: "", th: "", zh: "" },
    answer: { en: "", id: "", ms: "", th: "", zh: "" },
    sort_order: 1,
  });

  // Auto-reset fetching state when Inertia finishes updating props
  useEffect(() => {
    setIsFetching(false);
  }, [faqs, faqsPagination]);

  const actualFaqs = faqs || [];

  // Filter FAQs by Search
  const filteredFaqs = actualFaqs.filter((f) => {
    if (!f) return false;
    const q = getTrans(f.question, "en");
    const a = getTrans(f.answer, "en");
    const query = searchQuery.toLowerCase();
    return q.toLowerCase().includes(query) || a.toLowerCase().includes(query);
  });

  // Debounced Search Effect (300ms)
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      setIsFetching(true);
      router.get(
        "/admin",
        { tab: "faqs", search: val, sort_dir: sortDir },
        {
          preserveState: true,
          preserveScroll: true,
          onFinish: () => setIsFetching(false),
        }
      );
    }, 300);
  };

  // Toggle Sort by ID (ASC / DESC)
  const handleToggleSortId = () => {
    const nextDir = sortDir === "desc" ? "asc" : "desc";
    setSortDir(nextDir);
    setIsFetching(true);

    router.get(
      "/admin",
      { tab: "faqs", sort_dir: nextDir, search: searchQuery },
      {
        preserveState: true,
        preserveScroll: true,
        onFinish: () => setIsFetching(false),
      }
    );
  };

  // Open Create Modal
  const handleOpenCreate = () => {
    setFormData({
      question: { en: "", id: "", ms: "", th: "", zh: "" },
      answer: { en: "", id: "", ms: "", th: "", zh: "" },
      sort_order: actualFaqs.length + 1,
    });
    setIsCreateOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (faq: FaqData) => {
    setSelectedFaq(faq);
    setFormData({
      question: extractMultiLangDict(faq.question),
      answer: extractMultiLangDict(faq.answer),
      sort_order: faq.sort_order || 1,
    });
    setIsEditOpen(true);
  };

  // Open Delete Modal
  const handleOpenDelete = (faq: FaqData) => {
    setSelectedFaq(faq);
    setIsDeleteOpen(true);
  };

  // Submit Create FAQ
  const handleSubmitCreate = (e: React.FormEvent) => {
    e.preventDefault();
    router.post("/admin/faqs", formData, {
      onSuccess: () => {
        setIsCreateOpen(false);
        toast.success("FAQ item created successfully!");
      },
      onError: () => toast.error("Failed to create FAQ item."),
    });
  };

  // Submit Edit FAQ
  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFaq) return;

    router.post(`/admin/faqs/${selectedFaq.id}/update`, formData, {
      onSuccess: () => {
        setIsEditOpen(false);
        setSelectedFaq(null);
        toast.success("FAQ item updated successfully!");
      },
      onError: () => toast.error("Failed to update FAQ item."),
    });
  };

  // Submit Delete FAQ
  const handleSubmitDelete = () => {
    if (!selectedFaq) return;

    router.post(`/admin/faqs/${selectedFaq.id}/delete`, {}, {
      onSuccess: () => {
        setIsDeleteOpen(false);
        setSelectedFaq(null);
        toast.success("FAQ item deleted successfully!");
      },
      onError: () => toast.error("Failed to delete FAQ item."),
    });
  };

  return (
    <div className="space-y-4 font-sans">
      
      {/* 1. GAMBAR 2 REFERENCE: TOP NAVIGATION TABS BAR */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-6 min-w-max pb-2 pt-0.5">
          <button
            type="button"
            className="relative inline-flex items-center gap-2 text-xs font-bold text-[#005883] dark:text-sky-400 cursor-pointer whitespace-nowrap"
          >
            <HelpCircle className="h-4 w-4 shrink-0" />
            <span>All FAQs</span>
            <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#005883] dark:bg-sky-400 rounded-full" />
          </button>
        </div>
      </div>

      {/* 2. GAMBAR 2 REFERENCE: BOTTOM SEARCH & ACTION CONTROL BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-0.5">
        {/* Left Side: Filter Status Text */}
        <div className="flex items-center gap-2 min-h-8.5">
          <div className="text-xs font-semibold text-zinc-400 dark:text-zinc-500">
            Showing all FAQ items ({actualFaqs.length})
          </div>
        </div>

        {/* Right Side: Search Input & Primary Add Button */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Input with Color System Border */}
          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search FAQs by question..."
              className="w-full h-8.5 pl-8.5 pr-8 rounded-xl border border-[#005883]/40 dark:border-sky-500/40 focus:border-[#005883] dark:focus:border-sky-400 bg-white dark:bg-zinc-900 text-xs font-medium text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-[#005883]/30 transition-all shadow-2xs"
            />
            {isFetching && (
              <Loader2 className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#005883] dark:text-sky-400 animate-spin" />
            )}
          </div>

          {/* Primary Action Button */}
          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-1.5 h-8.5 px-4 rounded-xl bg-[#005883] hover:bg-[#003853] text-white text-xs font-bold shadow-2xs transition-all cursor-pointer whitespace-nowrap shrink-0 ml-auto sm:ml-0"
          >
            <Plus className="h-3.5 w-3.5 shrink-0" />
            <span>Add FAQ</span>
          </button>
        </div>
      </div>

      {/* 3. FAQS SHADCN DATA TABLE OR EMPTY STATE */}
      {filteredFaqs.length === 0 && !isFetching ? (
        <EmptyState
          icon={HelpCircle}
          title={actualFaqs.length === 0 ? "No FAQ Items Found" : "No Matching FAQ Items"}
          description={
            actualFaqs.length === 0
              ? "No FAQ items created yet. Click the 'Add FAQ' button above to create one."
              : `No FAQ questions matched your search term "${searchQuery}". Try searching with another keyword.`
          }
          actionLabel={searchQuery ? "Clear Search Filter" : "Add FAQ"}
          onAction={searchQuery ? () => setSearchQuery("") : handleOpenCreate}
        />
      ) : isFetching ? (
        <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-2xs overflow-hidden p-4">
          <AdminTableSkeleton columnsCount={4} rowsCount={6} />
        </div>
      ) : (
        <DataTable<FaqData, any>
          data={filteredFaqs}
          pagination={faqsPagination}
          isFetching={isFetching}
          onNavigate={() => setIsFetching(true)}
          onFinish={() => setIsFetching(false)}
          columns={[
            {
              id: "id",
              header: () => (
                <button
                  type="button"
                  onClick={handleToggleSortId}
                  className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer group font-bold"
                  title="Click to toggle ID sorting (Ascending / Descending)"
                >
                  <span>ID</span>
                  {sortDir === "desc" ? (
                    <ArrowDown className="h-3.5 w-3.5 text-[#005883] dark:text-sky-400 font-extrabold" />
                  ) : (
                    <ArrowUp className="h-3.5 w-3.5 text-[#005883] dark:text-sky-400 font-extrabold" />
                  )}
                </button>
              ),
              cell: ({ row }) => <span className="font-mono text-zinc-400 font-bold">#{row.original.id}</span>,
            },
            {
              id: "question",
              header: "Question Title",
              cell: ({ row }) => (
                <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white max-w-xs">
                  <HelpCircle className="h-4 w-4 text-[#005883] shrink-0" />
                  <span>{getTrans(row.original.question, "en")}</span>
                </div>
              ),
            },
            {
              id: "answer",
              header: "Answer Details",
              cell: ({ row }) => (
                <p className="line-clamp-2 text-zinc-500 dark:text-zinc-400 max-w-md text-xs">
                  {getTrans(row.original.answer, "en")}
                </p>
              ),
            },
            {
              id: "actions",
              header: () => <div className="text-right">Actions</div>,
              cell: ({ row }) => (
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleOpenEdit(row.original)}
                    className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-all cursor-pointer"
                    title="Edit FAQ"
                  >
                    <Edit className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleOpenDelete(row.original)}
                    className="p-1.5 rounded-lg border border-rose-200 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 transition-all cursor-pointer"
                    title="Delete FAQ"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ),
            },
          ]}
        />
      )}

      {/* 3. CREATE FAQ MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Plus className="h-5 w-5 text-[#005883]" />
                Add New FAQ
              </h3>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitCreate} className="p-6 space-y-4">
              <MultiLangInput
                label="Question"
                required
                value={formData.question}
                onChange={(val) => setFormData({ ...formData, question: val as any })}
                placeholder="e.g. WHAT IS THE WARRANTY ON YOUR DAF FLOTATION UNITS?"
              />

              <MultiLangTextarea
                label="Answer Content"
                required
                rows={4}
                value={formData.answer}
                onChange={(val) => setFormData({ ...formData, answer: val as any })}
                placeholder="Write clear, comprehensive answer for clients..."
              />

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Display Sort Order</label>
                <input
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) => setFormData({ ...formData, sort_order: Number(e.target.value) })}
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#005883] hover:bg-[#003853] text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  Save FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. EDIT FAQ MODAL */}
      {isEditOpen && selectedFaq && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Edit className="h-5 w-5 text-[#005883]" />
                Edit FAQ (#{selectedFaq.id})
              </h3>
              <button
                onClick={() => setIsEditOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitEdit} className="p-6 space-y-4">
              <MultiLangInput
                label="Question"
                required
                value={formData.question}
                onChange={(val) => setFormData({ ...formData, question: val as any })}
              />

              <MultiLangTextarea
                label="Answer Content"
                required
                rows={4}
                value={formData.answer}
                onChange={(val) => setFormData({ ...formData, answer: val as any })}
              />

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Display Sort Order</label>
                <input
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) => setFormData({ ...formData, sort_order: Number(e.target.value) })}
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#005883] hover:bg-[#003853] text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  Update FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. DELETE CONFIRMATION MODAL */}
      {isDeleteOpen && selectedFaq && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden p-6 space-y-4 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="p-3 rounded-full bg-rose-50 dark:bg-rose-950/40">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">Delete FAQ</h3>
                <p className="text-xs text-zinc-500">Are you sure you want to remove this question?</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200">
              "{selectedFaq.question}"
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsDeleteOpen(false)}
                className="px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmitDelete}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
