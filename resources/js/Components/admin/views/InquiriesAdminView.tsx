import React, { useState, useEffect, useRef } from "react";
import { router } from "@inertiajs/react";
import {
  Search,
  Mail,
  Building,
  CircleDot,
  CheckCircle2,
  Clock,
  Inbox,
  Trash2,
  MessageSquare,
  X,
  Filter,
  ArrowUp,
  ArrowDown,
  ChevronDown,
  Loader2,
  Layers,
} from "lucide-react";
import { EmptyState } from "@/Components/ui/EmptyState";
import { toast } from "@/Components/ui/sonner";
import { AdminCursorPagination, CursorPaginationData } from "../AdminCursorPagination";
import { AdminTableSkeleton } from "../AdminTableSkeleton";
import { DataTable } from "@/Components/ui/data-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";

export interface InquiryData {
  id: number;
  full_name: string;
  work_email: string;
  company_name: string;
  message: string;
  status: "pending" | "in_process" | "closed";
  created_at?: string;
}

interface InquiriesAdminViewProps {
  inquiries?: InquiryData[];
  inquiriesPagination?: CursorPaginationData | null;
  filters?: {
    sort_dir?: "asc" | "desc";
    search?: string;
  };
}

export const InquiriesAdminView: React.FC<InquiriesAdminViewProps> = ({
  inquiries = [],
  inquiriesPagination = null,
  filters = {},
}) => {
  const [searchQuery, setSearchQuery] = useState(filters?.search || "");
  const [sortDir, setSortDir] = useState<"asc" | "desc">(filters?.sort_dir || "desc");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [isFetching, setIsFetching] = useState(false);

  // Debounced Search Reference
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Modal State for View/Respond
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryData | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Auto-reset fetching state when Inertia finishes updating props
  useEffect(() => {
    setIsFetching(false);
  }, [inquiries, inquiriesPagination]);

  const actualInquiries = inquiries || [];

  // Filter inquiries by Search & Status
  const filteredInquiries = actualInquiries.filter((inquiry) => {
    if (!inquiry) return false;
    const name = inquiry.full_name || "";
    const email = inquiry.work_email || "";
    const company = inquiry.company_name || "";
    const msg = inquiry.message || "";
    const query = searchQuery.toLowerCase();

    const matchesSearch =
      name.toLowerCase().includes(query) ||
      email.toLowerCase().includes(query) ||
      company.toLowerCase().includes(query) ||
      msg.toLowerCase().includes(query);

    const matchesStatus = filterStatus === "ALL" || inquiry.status === filterStatus;

    return matchesSearch && matchesStatus;
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
        { tab: "inquiries", search: val, sort_dir: sortDir },
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
      { tab: "inquiries", sort_dir: nextDir, search: searchQuery },
      {
        preserveState: true,
        preserveScroll: true,
        onFinish: () => setIsFetching(false),
      }
    );
  };

  const handleUpdateStatus = (id: number, newStatus: string) => {
    router.post(`/admin/inquiries/${id}/status`, { status: newStatus }, {
      onSuccess: () => {
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry({ ...selectedInquiry, status: newStatus as any });
        }
        toast.success("CRM inquiry status updated successfully!");
      },
    });
  };

  const handleDeleteInquiry = (id: number) => {
    router.post(`/admin/inquiries/${id}/delete`, {}, {
      onSuccess: () => {
        setIsDetailOpen(false);
        setSelectedInquiry(null);
        toast.success("Inquiry deleted from CRM!");
      },
    });
  };

  return (
    <div className="space-y-4 font-sans">
      {/* 1. GAMBAR 2 REFERENCE: TOP STATUS NAVIGATION TABS BAR */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-6 min-w-max pb-2 pt-0.5">
          {[
            { key: "ALL", label: "All Inquiries", icon: Layers },
            { key: "pending", label: "Pending", icon: null },
            { key: "in_process", label: "In Process", icon: null },
            { key: "closed", label: "Closed", icon: null },
          ].map((tab) => {
            const isActive = filterStatus === tab.key;
            const IconComp = tab.icon;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setFilterStatus(tab.key)}
                className={`relative inline-flex items-center gap-2 text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "text-[#005883] dark:text-sky-400"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                {IconComp && <IconComp className="h-4 w-4 shrink-0" />}
                <span>{tab.label}</span>
                {isActive && (
                  <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#005883] dark:bg-sky-400 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. GAMBAR 2 REFERENCE: BOTTOM SEARCH & ACTION CONTROL BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-2">
        {/* Left Side: Active Filter Pill Badge */}
        <div className="flex items-center gap-2">
          {filterStatus !== "ALL" ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#005883]/10 text-[#005883] dark:bg-sky-950/60 dark:text-sky-300 text-xs font-bold border border-[#005883]/30 shrink-0">
              <span>Status: {filterStatus}</span>
              <button
                type="button"
                onClick={() => setFilterStatus("ALL")}
                className="hover:text-rose-500 transition-colors cursor-pointer"
                title="Clear Filter"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div className="text-xs font-semibold text-zinc-400 dark:text-zinc-500">
              Showing all inquiries ({actualInquiries.length})
            </div>
          )}
        </div>

        {/* Right Side: Search Input */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-full sm:w-56 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="w-full h-8.5 pl-8.5 pr-8 rounded-xl border border-[#005883]/40 dark:border-sky-500/40 focus:border-[#005883] dark:focus:border-sky-400 bg-white dark:bg-zinc-900 text-xs font-medium text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-[#005883]/30 transition-all shadow-2xs"
            />
            {isFetching && (
              <Loader2 className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#005883] dark:text-sky-400 animate-spin" />
            )}
          </div>
        </div>
      </div>

      {/* 2. DYNAMIC CONTENT AREA: TABLE OR GLOBAL EMPTY STATE */}
      {filteredInquiries.length === 0 && !isFetching ? (
        <EmptyState
          icon={Inbox}
          title={actualInquiries.length === 0 ? "No Inquiries Received Yet" : "No Matching Inquiries Found"}
          description={
            actualInquiries.length === 0
              ? "Your CRM mailbox is currently clean and empty. Inquiries submitted by clients via the contact page will automatically appear here for your review and follow-up."
              : "No inquiries matched your current search query or status filter. Try clearing the filter parameters."
          }
        />
      ) : isFetching ? (
        <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-2xs overflow-hidden p-4">
          <AdminTableSkeleton columnsCount={7} rowsCount={6} />
        </div>
      ) : (
        <DataTable<InquiryData, any>
          data={filteredInquiries}
          pagination={inquiriesPagination}
          isFetching={isFetching}
          onNavigate={() => setIsFetching(true)}
          onFinish={() => setIsFetching(false)}
          onBatchDelete={(rows) => {
            toast.success(`Batch action: Selected ${rows.length} inquiry(s) for bulk operations.`);
          }}
          columns={[
            {
              id: "id",
              accessorKey: "id",
              header: ({ column }) => (
                <button
                  type="button"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                  className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer group font-bold"
                >
                  <span>ID</span>
                  {column.getIsSorted() === "desc" ? (
                    <ArrowDown className="h-3.5 w-3.5 text-[#005883] font-extrabold" />
                  ) : (
                    <ArrowUp className="h-3.5 w-3.5 text-[#005883] font-extrabold" />
                  )}
                </button>
              ),
              cell: ({ row }) => <span className="font-mono text-zinc-400 font-bold">#{row.original.id}</span>,
            },
            {
              id: "contact_name",
              header: "Contact Name",
              cell: ({ row }) => (
                <div>
                  <div className="font-bold text-zinc-900 dark:text-white">{row.original.full_name || "Anonymous Contact"}</div>
                  <div className="text-[11px] font-normal text-zinc-400 flex items-center gap-1 mt-0.5 font-mono">
                    <Mail className="h-3 w-3 shrink-0" />
                    {row.original.work_email || "N/A"}
                  </div>
                </div>
              ),
            },
            {
              id: "company",
              header: "Company / Organization",
              cell: ({ row }) => (
                <div className="font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-1">
                  <Building className="h-3 w-3 text-zinc-400 shrink-0" />
                  {row.original.company_name || "General Client"}
                </div>
              ),
            },
            {
              id: "message",
              header: "Message Snippet",
              cell: ({ row }) => (
                <span className="font-medium text-zinc-600 dark:text-zinc-300 max-w-xs truncate block">
                  {row.original.message || "No message content"}
                </span>
              ),
            },
            {
              id: "date",
              header: "Date Received",
              cell: ({ row }) => (
                <span className="font-mono text-zinc-500 dark:text-zinc-400">
                  {row.original.created_at && !isNaN(Date.parse(row.original.created_at))
                    ? new Date(row.original.created_at).toLocaleDateString()
                    : "Recently"}
                </span>
              ),
            },
            {
              id: "status",
              header: "CRM Status",
              cell: ({ row }) => (
                <>
                  {row.original.status === "pending" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 text-[11px] font-semibold border border-amber-200/60 dark:border-amber-800/40">
                      <Clock className="h-3 w-3" />
                      Pending
                    </span>
                  )}
                  {row.original.status === "in_process" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 text-[11px] font-semibold border border-blue-200/60 dark:border-blue-800/40">
                      <CircleDot className="h-3 w-3 animate-spin" />
                      In Process
                    </span>
                  )}
                  {row.original.status === "closed" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 text-[11px] font-semibold border border-emerald-200/60 dark:border-emerald-800/40">
                      <CheckCircle2 className="h-3 w-3" />
                      Closed
                    </span>
                  )}
                </>
              ),
            },
            {
              id: "actions",
              header: () => <div className="text-right">Actions</div>,
              cell: ({ row }) => (
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => { setSelectedInquiry(row.original); setIsDetailOpen(true); }}
                    className="px-3 py-1 rounded-xl bg-[#005883] hover:bg-[#003853] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
                  >
                    View Inquiry
                  </button>
                  <button
                    onClick={() => handleDeleteInquiry(row.original.id)}
                    className="p-1.5 rounded-lg border border-rose-200 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 cursor-pointer transition-all"
                    title="Delete Inquiry"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ),
            },
          ]}
        />
      )}

      {/* 3. INQUIRY DETAIL & CRM RESPOND MODAL */}
      {isDetailOpen && selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                Inquiry Details (#{selectedInquiry.id})
              </h3>
              <button
                onClick={() => setIsDetailOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800">
                <div>
                  <span className="text-zinc-400 font-medium">Contact Name</span>
                  <div className="font-bold text-zinc-900 dark:text-white text-sm mt-0.5">{selectedInquiry.full_name}</div>
                </div>
                <div>
                  <span className="text-zinc-400 font-medium">Company Name</span>
                  <div className="font-bold text-zinc-900 dark:text-white text-sm mt-0.5">{selectedInquiry.company_name}</div>
                </div>
                <div className="col-span-2 pt-2 border-t border-zinc-200 dark:border-zinc-700">
                  <span className="text-zinc-400 font-medium">Work Email</span>
                  <div className="font-mono text-zinc-900 dark:text-white mt-0.5">{selectedInquiry.work_email}</div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-zinc-900 dark:text-white">Message / Operational Requirement</label>
                <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {selectedInquiry.message}
                </div>
              </div>

              {/* Status Selector */}
              <div className="space-y-1.5 pt-2">
                <label className="font-bold text-zinc-900 dark:text-white">Update CRM Follow-up Status</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdateStatus(selectedInquiry.id, "pending")}
                    className={`flex-1 py-2 rounded-xl border font-bold text-xs cursor-pointer transition-all ${
                      selectedInquiry.status === "pending"
                        ? "bg-amber-500 text-white border-amber-600 shadow-xs"
                        : "border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                    }`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedInquiry.id, "in_process")}
                    className={`flex-1 py-2 rounded-xl border font-bold text-xs cursor-pointer transition-all ${
                      selectedInquiry.status === "in_process"
                        ? "bg-blue-600 text-white border-blue-700 shadow-xs"
                        : "border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                    }`}
                  >
                    In Process
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedInquiry.id, "closed")}
                    className={`flex-1 py-2 rounded-xl border font-bold text-xs cursor-pointer transition-all ${
                      selectedInquiry.status === "closed"
                        ? "bg-emerald-600 text-white border-emerald-700 shadow-xs"
                        : "border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                    }`}
                  >
                    Closed
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
                <button
                  onClick={() => setIsDetailOpen(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 text-white text-xs font-bold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
