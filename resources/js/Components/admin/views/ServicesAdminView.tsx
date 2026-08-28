import React, { useState, useEffect, useRef } from "react";
import { Link, router } from "@inertiajs/react";
import {
  Plus,
  Search,
  Wrench,
  Sliders,
  ShieldCheck,
  Edit,
  Edit3,
  Trash2,
  Filter,
  X,
  AlertTriangle,
  FolderPlus,
  Clock,
  Sparkles,
  ArrowUp,
  ArrowDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Layers,
} from "lucide-react";
import { EmptyState } from "@/Components/ui/EmptyState";
import { toast } from "@/Components/ui/sonner";
import { getTrans } from "@/utils/transHelper";
import { AdminCursorPagination, CursorPaginationData } from "../AdminCursorPagination";
import { AdminTableSkeleton } from "../AdminTableSkeleton";
import { MultiLangInput } from "@/Components/ui/MultiLangInput";
import { MultiLangTextarea } from "@/Components/ui/MultiLangTextarea";
import { DataTable } from "@/Components/ui/data-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";

export interface ServiceCategoryData {
  id: number;
  title: string;
  slug?: string;
  icon_name?: string;
}

export interface ServiceData {
  id: number;
  title: string;
  service_category_id?: number;
  category_title?: string;
  category_slug?: string;
  short_desc?: string;
  full_desc?: string;
  metric_label?: string;
  metric_value?: string;
  metric_desc?: string;
  turnaround_time?: string;
  features?: string[] | string;
  deliverables?: string[] | string;
  icon_name?: string;
  created_at?: string;
}

interface ServicesAdminViewProps {
  services?: ServiceData[];
  serviceCategories?: ServiceCategoryData[];
  servicesPagination?: CursorPaginationData | null;
  filters?: {
    sort_dir?: "asc" | "desc";
    search?: string;
  };
}

// Helper to safely extract string from multi-lang JSON / object / string
const parseMultiLangField = (fieldData: any, lang: string = "en"): string => {
  if (!fieldData) return "";
  if (typeof fieldData === "string") {
    try {
      const parsed = JSON.parse(fieldData);
      if (typeof parsed === "object" && parsed !== null) {
        return parsed[lang] || parsed["en"] || parsed["id"] || Object.values(parsed)[0] || "";
      }
    } catch (e) {
      return fieldData;
    }
    return fieldData;
  }
  if (typeof fieldData === "object" && fieldData !== null) {
    return fieldData[lang] || fieldData["en"] || fieldData["id"] || Object.values(fieldData)[0] || "";
  }
  return String(fieldData);
};

// Helper to extract 5-lang dictionary object for form state initialization
const extractMultiLangDict = (fieldData: any): { en: string; id: string; ms: string; th: string; zh: string } => {
  return {
    en: parseMultiLangField(fieldData, "en"),
    id: parseMultiLangField(fieldData, "id"),
    ms: parseMultiLangField(fieldData, "ms"),
    th: parseMultiLangField(fieldData, "th"),
    zh: parseMultiLangField(fieldData, "zh"),
  };
};

export const ServicesAdminView: React.FC<ServicesAdminViewProps> = ({
  services = [],
  serviceCategories = [],
  servicesPagination = null,
  filters = {},
}) => {
  const [searchQuery, setSearchQuery] = useState(filters?.search || "");
  const [sortDir, setSortDir] = useState<"asc" | "desc">(filters?.sort_dir || "desc");
  const [filterCategory, setFilterCategory] = useState<string>("ALL");
  const [isFetching, setIsFetching] = useState(false);

  // Scroll container reference for Category Tabs
  const tabsScrollRef = useRef<HTMLDivElement>(null);

  // Debounced Search Reference
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Service Modals
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Service Category Modal State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categoryFormData, setCategoryFormData] = useState({ id: 0, title: "", icon_name: "Wrench" });
  const [isEditingCategory, setIsEditingCategory] = useState(false);

  // Active Language Tab State for Admin Form (Default: English 'en')
  const [activeTabLang, setActiveTabLang] = useState<"en" | "id" | "ms" | "th" | "zh">("en");

  // Form State for Service with 5-Language Support
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);
  const [formData, setFormData] = useState({
    title: { en: "", id: "", ms: "", th: "", zh: "" },
    service_category_id: 0,
    category: "",
    short_desc: { en: "", id: "", ms: "", th: "", zh: "" },
    full_desc: { en: "", id: "", ms: "", th: "", zh: "" },
    metric_label: { en: "", id: "", ms: "", th: "", zh: "" },
    metric_value: "",
    metric_desc: { en: "", id: "", ms: "", th: "", zh: "" },
    turnaround_time: { en: "", id: "", ms: "", th: "", zh: "" },
    features: "",
    deliverables: "",
    icon_name: "Wrench",
  });

  // Auto-reset fetching state when Inertia finishes updating props
  useEffect(() => {
    setIsFetching(false);
  }, [services, servicesPagination]);

  const actualCategories = serviceCategories || [];
  const actualServices = services || [];

  // Filter services by Search & Category
  const filteredServices = actualServices.filter((s) => {
    const sTitle = parseMultiLangField(s.title);
    const sCategory = parseMultiLangField(s.category_title) || parseMultiLangField(s.metric_label);
    const sShortDesc = parseMultiLangField(s.short_desc);
    const matchesSearch =
      sTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sShortDesc.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = filterCategory === "ALL" || sCategory === filterCategory || String(s.service_category_id) === filterCategory;

    return matchesSearch && matchesCategory;
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
        { tab: "services", search: val, sort_dir: sortDir },
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
      { tab: "services", sort_dir: nextDir, search: searchQuery },
      {
        preserveState: true,
        preserveScroll: true,
        onFinish: () => setIsFetching(false),
      }
    );
  };

  // Helper to format array or string list for textareas
  const formatListToString = (items?: string[] | string): string => {
    if (!items) return "";
    if (Array.isArray(items)) return items.join("\n");
    if (typeof items === "string") {
      try {
        const parsed = JSON.parse(items);
        if (Array.isArray(parsed)) return parsed.join("\n");
      } catch (e) {
        return items;
      }
    }
    return String(items);
  };

  // Service Actions
  const handleOpenCreate = () => {
    const firstCat = actualCategories[0];
    setFormData({
      title: { en: "", id: "", ms: "", th: "", zh: "" },
      service_category_id: firstCat?.id || 0,
      category: parseMultiLangField(firstCat?.title, "en") || "System Integration",
      short_desc: { en: "", id: "", ms: "", th: "", zh: "" },
      full_desc: { en: "", id: "", ms: "", th: "", zh: "" },
      metric_label: { en: "ECOREVE", id: "ECOREVE", ms: "ECOREVE", th: "ECOREVE", zh: "ECOREVE" },
      metric_value: "100%",
      metric_desc: { en: "", id: "", ms: "", th: "", zh: "" },
      turnaround_time: { en: "3 - 5 Business Days", id: "3 - 5 Hari Kerja", ms: "3 - 5 Hari Bekerja", th: "3 - 5 วันทำการ", zh: "3 - 5 个工作日" },
      features: "ISO 9001 Certified Engineering\nTurnkey Skid Assembly",
      deliverables: "Standard Inspection Certificate\nOperational Baseline Report",
      icon_name: "Wrench",
    });
    setActiveTabLang("en");
    setIsCreateOpen(true);
  };

  const handleOpenEdit = (service: ServiceData) => {
    setSelectedService(service);
    setFormData({
      title: extractMultiLangDict(service.title),
      service_category_id: service.service_category_id || 0,
      category: parseMultiLangField(service.category_title, "en") || parseMultiLangField(service.metric_label, "en") || parseMultiLangField(actualCategories[0]?.title, "en") || "",
      short_desc: extractMultiLangDict(service.short_desc),
      full_desc: extractMultiLangDict(service.full_desc || service.short_desc),
      metric_label: extractMultiLangDict(service.metric_label),
      metric_value: service.metric_value || "",
      metric_desc: extractMultiLangDict(service.metric_desc),
      turnaround_time: extractMultiLangDict(service.turnaround_time || "3 - 5 Business Days"),
      features: formatListToString(service.features),
      deliverables: formatListToString(service.deliverables),
      icon_name: service.icon_name || "Wrench",
    });
    setActiveTabLang("en");
    setIsEditOpen(true);
  };

  const handleOpenDelete = (service: ServiceData) => {
    setSelectedService(service);
    setIsDeleteOpen(true);
  };

  const handleSubmitCreate = (e: React.FormEvent) => {
    e.preventDefault();
    router.post("/admin/services", formData, {
      onSuccess: () => {
        setIsCreateOpen(false);
        toast.success("Service solution created successfully!", {
          description: `"${parseMultiLangField(formData.title)}" was added to database.`,
        });
      },
      onError: () => toast.error("Failed to create service solution."),
    });
  };

  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;
    router.post(`/admin/services/${selectedService.id}/update`, formData, {
      onSuccess: () => {
        setIsEditOpen(false);
        setSelectedService(null);
        toast.success("Service solution updated successfully!");
      },
      onError: () => toast.error("Failed to update service solution."),
    });
  };

  const handleSubmitDelete = () => {
    if (!selectedService) return;
    router.post(`/admin/services/${selectedService.id}/delete`, {}, {
      onSuccess: () => {
        setIsDeleteOpen(false);
        setSelectedService(null);
        toast.success("Service solution deleted successfully!");
      },
      onError: () => toast.error("Failed to delete service solution."),
    });
  };

  // Category Actions
  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditingCategory && categoryFormData.id) {
      router.post(`/admin/categories/service/${categoryFormData.id}/update`, {
        title: categoryFormData.title,
        icon_name: categoryFormData.icon_name,
      }, {
        onSuccess: () => {
          setCategoryFormData({ id: 0, title: "", icon_name: "Wrench" });
          setIsEditingCategory(false);
          toast.success("Service category updated successfully!");
        },
      });
    } else {
      router.post("/admin/categories/service", {
        title: categoryFormData.title,
        icon_name: categoryFormData.icon_name,
      }, {
        onSuccess: () => {
          setCategoryFormData({ id: 0, title: "", icon_name: "Wrench" });
          toast.success("New service category added!");
        },
      });
    }
  };

  const handleDeleteCategory = (id: number) => {
    router.post(`/admin/categories/service/${id}/delete`, {}, {
      onSuccess: () => toast.success("Service category removed!"),
    });
  };

  return (
    <div className="space-y-4 font-sans">
      
      {/* 1. GAMBAR 2 REFERENCE: TOP CATEGORY NAVIGATION TABS BAR WITH PREV/NEXT SCROLL BUTTONS */}
      <div className="relative flex items-center border-b border-zinc-200 dark:border-zinc-800 group/tabbar">
        {/* Scroll Left Button */}
        <button
          type="button"
          onClick={() => {
            if (tabsScrollRef.current) {
              tabsScrollRef.current.scrollBy({ left: -240, behavior: "smooth" });
            }
          }}
          className="flex h-5.5 w-5.5 items-center justify-center rounded-full text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/60 dark:hover:bg-zinc-800 active:scale-95 transition-all shrink-0 mr-1.5 cursor-pointer z-10"
          title="Scroll Left Categories"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>

        {/* Categories Tab Scroll Container */}
        <div
          ref={tabsScrollRef}
          className="flex items-center gap-6 overflow-x-auto scrollbar-none scroll-smooth py-2 flex-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <button
            type="button"
            onClick={() => setFilterCategory("ALL")}
            className={`relative inline-flex items-center gap-2 text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              filterCategory === "ALL"
                ? "text-[#005883] dark:text-sky-400"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            <Layers className="h-4 w-4 shrink-0" />
            <span>All Services</span>
            {filterCategory === "ALL" && (
              <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#005883] dark:bg-sky-400 rounded-full" />
            )}
          </button>

          {actualCategories.map((cat) => {
            const catTitleStr = getTrans(cat.title, "en");
            const isActive = filterCategory === catTitleStr;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilterCategory(catTitleStr)}
                className={`relative inline-flex items-center gap-2 text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "text-[#005883] dark:text-sky-400"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                <span>{catTitleStr}</span>
                {isActive && (
                  <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#005883] dark:bg-sky-400 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Scroll Right Button */}
        <button
          type="button"
          onClick={() => {
            if (tabsScrollRef.current) {
              tabsScrollRef.current.scrollBy({ left: 240, behavior: "smooth" });
            }
          }}
          className="flex h-5.5 w-5.5 items-center justify-center rounded-full text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/60 dark:hover:bg-zinc-800 active:scale-95 transition-all shrink-0 ml-1.5 cursor-pointer z-10"
          title="Scroll Right Categories"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* 2. GAMBAR 2 REFERENCE: BOTTOM SEARCH & ACTION CONTROL BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-0.5">
        {/* Left Side: Active Filter Pill Badge or Status */}
        <div className="flex items-center gap-2">
          {filterCategory !== "ALL" ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#005883]/10 text-[#005883] dark:bg-sky-950/60 dark:text-sky-300 text-xs font-bold border border-[#005883]/30 shrink-0">
              <span>Category: {filterCategory}</span>
              <button
                type="button"
                onClick={() => setFilterCategory("ALL")}
                className="hover:text-rose-500 transition-colors cursor-pointer"
                title="Clear Filter"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div className="text-xs font-semibold text-zinc-400 dark:text-zinc-500">
              Showing all services
            </div>
          )}
        </div>

        {/* Right Side: Search Input, Manage Categories, & Primary Add Button */}
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

          <button
            type="button"
            onClick={() => setIsCategoryModalOpen(true)}
            className="inline-flex items-center gap-1.5 h-8.5 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 shadow-2xs transition-all cursor-pointer shrink-0"
          >
            <FolderPlus className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
            <span>Manage Categories</span>
          </button>

          <Link
            href="/admin/services/create"
            className="inline-flex items-center gap-1.5 h-8.5 px-4 rounded-xl bg-[#005883] hover:bg-[#003853] text-white text-xs font-bold shadow-2xs transition-all cursor-pointer whitespace-nowrap shrink-0 ml-auto sm:ml-0"
          >
            <Plus className="h-3.5 w-3.5 shrink-0" />
            <span>Add Service</span>
          </Link>
        </div>
      </div>

      {/* 2. SERVICES DATA TABLE OR EMPTY STATE */}
      {filteredServices.length === 0 && !isFetching ? (
        <EmptyState
          icon={Wrench}
          title="No Services Found"
          description={
            searchQuery
              ? `No services matched your search query "${searchQuery}". Try searching with another keyword or category.`
              : "No service solutions available. Click the 'Add New Service' button above to create one."
          }
          actionLabel={searchQuery ? "Clear Search Filter" : "Add New Service"}
          onAction={searchQuery ? () => setSearchQuery("") : () => router.get("/admin/services/create")}
        />
      ) : isFetching ? (
        <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-2xs overflow-hidden p-4">
          <AdminTableSkeleton columnsCount={6} rowsCount={6} />
        </div>
      ) : (
        <DataTable<ServiceData, any>
          data={filteredServices}
          pagination={servicesPagination}
          isFetching={isFetching}
          onNavigate={() => setIsFetching(true)}
          onFinish={() => setIsFetching(false)}
          onBatchDelete={(rows) => {
            toast.success(`Batch action: Selected ${rows.length} service(s) for bulk operations.`);
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
              id: "title",
              header: "Service Title",
              cell: ({ row }) => (
                <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white">
                  <Wrench className="h-4 w-4 text-[#005883] dark:text-sky-400 shrink-0" />
                  <span>{parseMultiLangField(row.original.title)}</span>
                </div>
              ),
            },
            {
              id: "category",
              header: "Category",
              cell: ({ row }) => (
                <span className="inline-block px-3 py-1 rounded-full bg-[#005883]/10 text-[#005883] dark:bg-sky-950/50 dark:text-sky-300 text-[11px] font-bold border border-[#005883]/20">
                  {parseMultiLangField(row.original.category_title) || parseMultiLangField(row.original.metric_label) || "System Integration"}
                </span>
              ),
            },
            {
              id: "metric",
              header: "Metric Marquee",
              cell: ({ row }) => (
                <div className="flex items-center gap-2">
                  <span className="font-bold text-zinc-900 dark:text-white font-mono bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-md text-[11px]">
                    {row.original.metric_value || "100%"}
                  </span>
                  <span className="text-zinc-500 text-[11px] font-semibold truncate max-w-[120px]">
                    {parseMultiLangField(row.original.metric_label) || "ECOREVE"}
                  </span>
                </div>
              ),
            },
            {
              id: "turnaround_time",
              header: "Turnaround Time",
              cell: ({ row }) => (
                <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400 font-mono text-[11px]">
                  <Clock className="h-3 w-3 text-zinc-400" />
                  <span>{parseMultiLangField(row.original.turnaround_time) || "3 - 5 Business Days"}</span>
                </div>
              ),
            },
            {
              id: "actions",
              header: () => <div className="text-right">Actions</div>,
              cell: ({ row }) => (
                <div className="flex items-center justify-end gap-1.5">
                  <button
                    onClick={() => router.get(`/admin/services/${row.original.id}/edit`)}
                    className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
                    title="Edit Service Solution"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleOpenDelete(row.original)}
                    className="p-1.5 rounded-lg border border-rose-200 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 transition-colors cursor-pointer"
                    title="Delete Service"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ),
            },
          ]}
        />
      )}

      {/* 3. CATEGORY MANAGEMENT MODAL */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[85vh] flex flex-col">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between shrink-0">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <FolderPlus className="h-5 w-5 text-blue-600" />
                Service Categories Manager
              </h3>
              <button
                onClick={() => setIsCategoryModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto flex-1">
              <form onSubmit={handleSaveCategory} className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 space-y-3">
                <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                  {isEditingCategory ? "Edit Service Category" : "Add New Service Category"}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={categoryFormData.title}
                    onChange={(e) => setCategoryFormData({ ...categoryFormData, title: e.target.value })}
                    placeholder="Category Title (e.g. System Integration)"
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                  <select
                    value={categoryFormData.icon_name}
                    onChange={(e) => setCategoryFormData({ ...categoryFormData, icon_name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Wrench">Icon: Wrench (Mechanical)</option>
                    <option value="Sliders">Icon: Sliders (Operations)</option>
                    <option value="ShieldCheck">Icon: ShieldCheck (Maintenance)</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  {isEditingCategory && (
                    <button
                      type="button"
                      onClick={() => { setIsEditingCategory(false); setCategoryFormData({ id: 0, title: "", icon_name: "Wrench" }); }}
                      className="px-3 py-1.5 rounded-xl border border-zinc-200 text-xs font-semibold text-zinc-600 hover:bg-zinc-100"
                    >
                      Cancel Edit
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-[#005883] hover:bg-[#003853] text-white text-xs font-bold shadow-xs"
                  >
                    {isEditingCategory ? "Update Category" : "Add Category"}
                  </button>
                </div>
              </form>

              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                <table className="w-full text-left text-xs text-zinc-600 dark:text-zinc-300">
                  <thead className="bg-zinc-100/70 dark:bg-zinc-800/80 font-bold border-b border-zinc-200 dark:border-zinc-800">
                    <tr>
                      <th className="p-3">ID</th>
                      <th className="p-3">Category Title</th>
                      <th className="p-3">Icon</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200/70 dark:divide-zinc-800/70">
                    {actualCategories.map((cat) => (
                      <tr key={cat.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                        <td className="p-3 font-mono text-zinc-400">#{cat.id}</td>
                        <td className="p-3 font-bold text-zinc-900 dark:text-white">{parseMultiLangField(cat.title)}</td>
                        <td className="p-3 font-mono text-zinc-400">{cat.icon_name || "Wrench"}</td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => { setIsEditingCategory(true); setCategoryFormData({ id: cat.id, title: parseMultiLangField(cat.title), icon_name: cat.icon_name || "Wrench" }); }}
                              className="p-1.5 rounded-lg border border-zinc-200 hover:bg-zinc-100 text-zinc-600"
                            >
                              <Edit className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(cat.id)}
                              className="p-1.5 rounded-lg border border-rose-200 hover:bg-rose-50 text-rose-600"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. CREATE SERVICE MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between shrink-0">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Plus className="h-5 w-5 text-blue-600" />
                Add New Service Solution
              </h3>
              <button onClick={() => setIsCreateOpen(false)} className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitCreate} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <MultiLangInput
                  label="Service Solution Title"
                  required
                  value={formData.title}
                  onChange={(val) => setFormData({ ...formData, title: val as any })}
                  placeholder="e.g. On-Site Mechanical & Piping Installation"
                />

                <div className="space-y-1.5">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Category *</label>
                  <select
                    value={formData.service_category_id || formData.category}
                    onChange={(e) => {
                      const selectedCat = actualCategories.find(c => String(c.id) === e.target.value || c.title === e.target.value);
                      setFormData({
                        ...formData,
                        service_category_id: selectedCat?.id || 0,
                        category: parseMultiLangField(selectedCat?.title, "en") || e.target.value,
                      });
                    }}
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                  >
                    {actualCategories.map((c) => (
                      <option key={c.id} value={c.id}>{parseMultiLangField(c.title)}</option>
                    ))}
                  </select>
                </div>
              </div>

              <MultiLangTextarea
                label="Catalog Card Short Description"
                required
                rows={2}
                value={formData.short_desc}
                onChange={(val) => setFormData({ ...formData, short_desc: val as any })}
                placeholder="Short paragraph shown on main service catalog card..."
              />

              <MultiLangTextarea
                label="Modal Full Description"
                rows={3}
                value={formData.full_desc}
                onChange={(val) => setFormData({ ...formData, full_desc: val as any })}
                placeholder="Detailed engineering scope paragraph shown in specification modal..."
              />

              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 space-y-3">
                <div className="flex items-center gap-2 text-blue-600 font-bold">
                  <Sparkles className="h-4 w-4" />
                  <span>Marquee Metric Impact ("What happens after the work goes live")</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <MultiLangInput
                    label="Metric Label"
                    value={formData.metric_label}
                    onChange={(val) => setFormData({ ...formData, metric_label: val as any })}
                    placeholder="e.g. IMMERSY"
                  />

                  <div>
                    <label className="font-semibold text-zinc-600 dark:text-zinc-400">Metric Value (e.g. +2)</label>
                    <input
                      type="text"
                      value={formData.metric_value}
                      onChange={(e) => setFormData({ ...formData, metric_value: e.target.value })}
                      placeholder="e.g. +2"
                      className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <MultiLangInput
                    label="Turnaround Time"
                    value={formData.turnaround_time}
                    onChange={(val) => setFormData({ ...formData, turnaround_time: val as any })}
                    placeholder="e.g. 3 - 7 Business Days"
                  />
                </div>

                <MultiLangInput
                  label="Metric Short Impact Description"
                  value={formData.metric_desc}
                  onChange={(val) => setFormData({ ...formData, metric_desc: val as any })}
                  placeholder="e.g. Operations expanded to 2 additional neighborhoods."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Technical Scope Lines (1 per line)</label>
                  <textarea
                    rows={3}
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    placeholder="High-pressure SS316L piping&#10;Vibration-isolated skid foundation"
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Deliverables & Certificates (1 per line)</label>
                  <textarea
                    rows={3}
                    value={formData.deliverables}
                    onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                    placeholder="As-Built P&ID Diagrams&#10;Pressure Hydro-test Certificate"
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Icon Type</label>
                <select
                  value={formData.icon_name}
                  onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Wrench">Wrench (Mechanical / Installation)</option>
                  <option value="Sliders">Sliders (Commissioning / Operations)</option>
                  <option value="ShieldCheck">ShieldCheck (Maintenance / Security)</option>
                </select>
              </div>

              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-end gap-3 shrink-0">
                <button type="button" onClick={() => setIsCreateOpen(false)} className="px-4 py-2 rounded-xl border text-xs font-semibold text-zinc-600 hover:bg-zinc-50">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-[#005883] hover:bg-[#003853] text-white text-xs font-bold shadow-xs">Save Service Solution</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. EDIT SERVICE MODAL */}
      {isEditOpen && selectedService && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between shrink-0">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Edit className="h-5 w-5 text-blue-600" />
                Edit Service Solution (#{selectedService.id})
              </h3>
              <button onClick={() => setIsEditOpen(false)} className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitEdit} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <MultiLangInput
                  label="Service Solution Title"
                  required
                  value={formData.title}
                  onChange={(val) => setFormData({ ...formData, title: val as any })}
                />

                <div className="space-y-1.5">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Category *</label>
                  <select
                    value={formData.service_category_id || formData.category}
                    onChange={(e) => {
                      const selectedCat = actualCategories.find(c => String(c.id) === e.target.value || c.title === e.target.value);
                      setFormData({
                        ...formData,
                        service_category_id: selectedCat?.id || 0,
                        category: parseMultiLangField(selectedCat?.title, "en") || e.target.value,
                      });
                    }}
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                  >
                    {actualCategories.map((c) => (
                      <option key={c.id} value={c.id}>{parseMultiLangField(c.title)}</option>
                    ))}
                  </select>
                </div>
              </div>

              <MultiLangTextarea
                label="Catalog Card Short Description"
                required
                rows={2}
                value={formData.short_desc}
                onChange={(val) => setFormData({ ...formData, short_desc: val as any })}
              />

              <MultiLangTextarea
                label="Modal Full Description"
                rows={3}
                value={formData.full_desc}
                onChange={(val) => setFormData({ ...formData, full_desc: val as any })}
              />

              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 space-y-3">
                <div className="flex items-center gap-2 text-blue-600 font-bold">
                  <Sparkles className="h-4 w-4" />
                  <span>Marquee Metric Impact ("What happens after the work goes live")</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <MultiLangInput
                    label="Metric Label"
                    value={formData.metric_label}
                    onChange={(val) => setFormData({ ...formData, metric_label: val as any })}
                  />

                  <div>
                    <label className="font-semibold text-zinc-600 dark:text-zinc-400">Metric Value (e.g. +2)</label>
                    <input
                      type="text"
                      value={formData.metric_value}
                      onChange={(e) => setFormData({ ...formData, metric_value: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <MultiLangInput
                    label="Turnaround Time"
                    value={formData.turnaround_time}
                    onChange={(val) => setFormData({ ...formData, turnaround_time: val as any })}
                  />
                </div>

                <MultiLangInput
                  label="Metric Short Impact Description"
                  value={formData.metric_desc}
                  onChange={(val) => setFormData({ ...formData, metric_desc: val as any })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Technical Scope Lines (1 per line)</label>
                  <textarea
                    rows={3}
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Deliverables & Certificates (1 per line)</label>
                  <textarea
                    rows={3}
                    value={formData.deliverables}
                    onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Icon Type</label>
                <select
                  value={formData.icon_name}
                  onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Wrench">Wrench (Mechanical / Installation)</option>
                  <option value="Sliders">Sliders (Commissioning / Operations)</option>
                  <option value="ShieldCheck">ShieldCheck (Maintenance / Security)</option>
                </select>
              </div>

              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-end gap-3 shrink-0">
                <button type="button" onClick={() => setIsEditOpen(false)} className="px-4 py-2 rounded-xl border text-xs font-semibold text-zinc-600 hover:bg-zinc-50">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-[#005883] hover:bg-[#003853] text-white text-xs font-bold shadow-xs">Update Service Solution</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. DELETE CONFIRMATION MODAL */}
      {isDeleteOpen && selectedService && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden p-6 space-y-4 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="p-3 rounded-full bg-rose-50 dark:bg-rose-950/40">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">Delete Service Solution</h3>
                <p className="text-xs text-zinc-500">Are you sure you want to remove this service solution?</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200">
              "{selectedService.title}"
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button type="button" onClick={() => setIsDeleteOpen(false)} className="px-4 py-2 rounded-xl border text-xs font-semibold text-zinc-600">Cancel</button>
              <button type="button" onClick={handleSubmitDelete} className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold">Confirm Delete</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
