import React, { useState, useEffect, useRef } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Edit3,
  Trash2,
  Tag,
  PackageCheck,
  PackageSearch,
  X,
  AlertTriangle,
  FolderPlus,
  Layers,
  Star,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { EmptyState } from "@/Components/ui/EmptyState";
import { toast } from "@/Components/ui/sonner";
import { MultiLangInput } from "@/Components/ui/MultiLangInput";
import { MultiLangTextarea } from "@/Components/ui/MultiLangTextarea";
import { getTrans } from "@/utils/transHelper";
import { AdminCursorPagination, CursorPaginationData } from "../AdminCursorPagination";
import { AdminTableSkeleton } from "../AdminTableSkeleton";
import { ImageViewerModal } from "../media/ImageViewerModal";
import { DataTable, ColumnToggleMenu } from "@/Components/ui/data-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";

export interface ProductCategoryData {
  id: number;
  name: any;
  slug?: string;
  description?: any;
}

export interface ProductData {
  id: number;
  name: any;
  category_id?: number;
  category_title?: any;
  short_desc?: any;
  full_desc?: any;
  rating?: string;
  rating_count?: any;
  badge_text?: any;
  price_label?: any;
  price?: string;
  note?: any;
  options?: any;
  accordions?: any;
  image_url?: string;
  is_featured?: boolean;
  created_at?: string;
}

export interface OptionRow {
  title: string;
  sub: string;
}

interface ProductsAdminViewProps {
  products?: ProductData[];
  productCategories?: ProductCategoryData[];
  productsPagination?: CursorPaginationData | null;
  filters?: {
    sort_dir?: "asc" | "desc";
    search?: string;
  };
}

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

export const ProductsAdminView: React.FC<ProductsAdminViewProps> = ({
  products = [],
  productCategories = [],
  productsPagination = null,
  filters = {},
}) => {
  const [searchQuery, setSearchQuery] = useState(filters?.search || "");
  const [sortDir, setSortDir] = useState<"asc" | "desc">(filters?.sort_dir || "desc");
  const [filterCategory, setFilterCategory] = useState<string>("ALL");
  const [isFetching, setIsFetching] = useState(false);

  // Auto-reset fetching state when Inertia finishes updating props
  useEffect(() => {
    setIsFetching(false);
  }, [products, productsPagination]);

  // Scroll container reference for Category Tabs
  const tabsScrollRef = useRef<HTMLDivElement>(null);

  // Debounced Search Reference
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Product Modals
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [previewImageData, setPreviewImageData] = useState<{ isOpen: boolean; url: string; title: string }>({
    isOpen: false,
    url: "",
    title: "",
  });

  // Category Modal State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categoryFormData, setCategoryFormData] = useState({ id: 0, name: "", description: "" });
  const [isEditingCategory, setIsEditingCategory] = useState(false);

  // Active Language Tab State for Admin Form (Default: English 'en')
  const [activeTabLang, setActiveTabLang] = useState<"en" | "id" | "ms" | "th" | "zh">("en");

  // Form State for Product with 5-Language JSON Support
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);
  const [formData, setFormData] = useState({
    name: { en: "", id: "", ms: "", th: "", zh: "" },
    category_id: 0,
    short_desc: { en: "", id: "", ms: "", th: "", zh: "" },
    full_desc: { en: "", id: "", ms: "", th: "", zh: "" },
    rating: "4.9/5",
    rating_count: { en: "based on 9,649 plant audits", id: "berdasarkan 9.649 audit pabrik", ms: "berdasarkan 9,649 audit kilang", th: "จากการตรวจสอบโรงงาน 9,649 แห่ง", zh: "基于 9,649 次工厂审计" },
    badge_text: { en: "ISO 9001 Verified®", id: "Tersertifikasi ISO 9001®", ms: "Bersijil ISO 9001®", th: "ได้รับการรับรอง ISO 9001®", zh: "ISO 9001 官方认证®" },
    price_label: { en: "SKID LEASE RATE", id: "TARIF SEWA SKID", ms: "KADAR SEWA SKID", th: "อัตราค่าเช่า SKID", zh: "框架设备租赁费率" },
    price: "Starting at $950/month",
    note: { en: "A shipment typically lasts one month of heavy industrial operation", id: "Pengiriman biasanya mencakup satu bulan operasi industri berat", ms: "Penghantaran biasanya meliputi satu bulan operasi industri berat", th: "การจัดส่งครอบคลุมการใช้งานอุตสาหกรรมหนักหนึ่งเดือน", zh: "装运通常覆盖一整月重工业高负荷运行" },
    is_featured: false,
  });

  // Dynamic Options Rows State for Easy Admin Editing (No JSON!)
  const [optionRows, setOptionRows] = useState<OptionRow[]>([
    { title: "N or N+1", sub: "Under 50 m³/h" },
    { title: "1", sub: "50-100 m³/h" },
    { title: "2", sub: "100-250 m³/h" },
    { title: "3", sub: "250-500 m³/h" },
  ]);

  // Default fallback sample categories
  const defaultCategories: ProductCategoryData[] = [
    { id: 1, name: "Water Treatment Series", description: "Water demineralization & ion exchange" },
    { id: 2, name: "Wastewater Pre-Treatment", description: "DAF flotation & sludge dewatering" },
    { id: 3, name: "Valves & Fittings", description: "Pneumatic valves & pressure vessels" },
    { id: 4, name: "Measurement Instruments", description: "Flowmeters & online turbidity analyzers" },
    { id: 5, name: "Automation & Sensors", description: "SCADA telemetry & dosing skids" },
  ];

  const actualCategories = productCategories || [];

  const actualProducts = products || [];

  // Filter products by Search & Category
  const filteredProducts = actualProducts.filter((p) => {
    const prodName = getTrans(p.name, "en") || "";
    const catName = getTrans(p.category_title, "en") || "";
    const badgeText = getTrans(p.badge_text, "en") || "";
    const searchLower = (searchQuery || "").toLowerCase();

    const matchesSearch =
      prodName.toLowerCase().includes(searchLower) ||
      catName.toLowerCase().includes(searchLower) ||
      badgeText.toLowerCase().includes(searchLower) ||
      (p.price && String(p.price).toLowerCase().includes(searchLower));

    const matchesCategory = filterCategory === "ALL" || catName === filterCategory || String(p.category_id) === filterCategory;

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
        { tab: "products", search: val, sort_dir: sortDir },
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
      { tab: "products", sort_dir: nextDir, search: searchQuery },
      {
        preserveState: true,
        preserveScroll: true,
        onFinish: () => setIsFetching(false),
      }
    );
  };

  // Convert options field (JSON or array or string) into OptionRow[] for form inputs
  const parseOptionsToRows = (optionsData: any): OptionRow[] => {
    if (!optionsData) {
      return [{ title: "Standard", sub: "Under 50 m³/h" }];
    }
    if (Array.isArray(optionsData)) {
      return optionsData.map(o => ({
        title: o.title || o.name || "Option",
        sub: o.sub || o.range || "Standard",
      }));
    }
    if (typeof optionsData === "string") {
      try {
        const decoded = JSON.parse(optionsData);
        if (Array.isArray(decoded)) {
          return decoded.map((o: any) => ({
            title: o.title || o.name || "Option",
            sub: o.sub || o.range || "Standard",
          }));
        }
      } catch (e) {
        const lines = optionsData.split("\n").filter(l => l.trim().length > 0);
        return lines.map(l => {
          if (l.includes(":")) {
            const parts = l.split(":");
            return { title: parts[0].trim(), sub: parts[1].trim() };
          }
          return { title: l.trim(), sub: "Standard" };
        });
      }
    }
    return [{ title: "Standard", sub: "Default Option" }];
  };

  // Convert OptionRow[] to clean human-readable preview string
  const formatOptionsForTable = (optionsData: any): string => {
    const rows = parseOptionsToRows(optionsData);
    return rows.map(r => `${r.title} (${r.sub})`).join(", ");
  };

  // Option Rows Handlers
  const handleAddOptionRow = () => {
    setOptionRows([...optionRows, { title: "", sub: "" }]);
  };

  const handleUpdateOptionRow = (index: number, field: "title" | "sub", value: string) => {
    const newRows = [...optionRows];
    newRows[index][field] = value;
    setOptionRows(newRows);
  };

  const handleRemoveOptionRow = (index: number) => {
    if (optionRows.length <= 1) {
      toast.error("Product must have at least 1 capacity variant option.");
      return;
    }
    setOptionRows(optionRows.filter((_, i) => i !== index));
  };

  // Product Actions
  const handleOpenCreate = () => {
    const firstCat = actualCategories[0];
    setFormData({
      name: { en: "", id: "", ms: "", th: "", zh: "" },
      category_id: firstCat?.id || 0,
      short_desc: { en: "High-capacity industrial water purification & filtration skid.", id: "Skid pemurnian & filtrasi air industri berkapasitas tinggi.", ms: "Peralatan pemurnian & penapisan air industri berkapasiti tinggi.", th: "เครื่องกรอง dan ทำความสะอาดน้ำอุตสาหกรรมความจุสูง", zh: "高容量工业水净化与过滤框架设备。" },
      full_desc: { en: "EcoReve industrial solution engineered for high-efficiency plant operations and ZLD compliance.", id: "Solusi industri EcoReve dirancang untuk efisiensi tinggi dan kepatuhan ZLD.", ms: "Penyelesaian industri EcoReve direka untuk kecekapan tinggi dan pematuhan ZLD.", th: "โซลูชันอุตสาหกรรม EcoReve ออกแบบเพื่อประสิทธิภาพสูง", zh: "EcoReve 工业解决方案专为高效工厂运营和 ZLD 合规性而设计。" },
      rating: "4.9/5",
      rating_count: { en: "based on 9,649 plant audits", id: "berdasarkan 9.649 audit pabrik", ms: "berdasarkan 9,649 audit kilang", th: "จากการตรวจสอบโรงงาน 9,649 แห่ง", zh: "基于 9,649 次工厂审计" },
      badge_text: { en: "ISO 9001 Verified®", id: "Tersertifikasi ISO 9001®", ms: "Bersijil ISO 9001®", th: "ได้รับการรับรอง ISO 9001®", zh: "ISO 9001 官方认证®" },
      price_label: { en: "SKID LEASE RATE", id: "TARIF SEWA SKID", ms: "KADAR SEWA SKID", th: "อัตราค่าเช่า SKID", zh: "框架设备租赁费率" },
      price: "Starting at $950/month",
      note: { en: "A shipment typically lasts one month of heavy industrial plant operation", id: "Satu pengiriman biasanya mencakup satu bulan operasi industri berat", ms: "Penghantaran biasanya bertahan satu bulan operasi industri berat", th: "การจัดส่งโดยทั่วไปรองรับการใช้งานอุตสาหกรรมหนักหนึ่งเดือน", zh: "一次出货通常可持续供重工业工厂运营一个月" },
      is_featured: true,
    });
    setOptionRows([
      { title: "N or N+1", sub: "Under 50 m³/h" },
      { title: "1", sub: "50-100 m³/h" },
      { title: "2", sub: "100-250 m³/h" },
      { title: "3", sub: "250-500 m³/h" },
    ]);
    setIsCreateOpen(true);
  };

  const handleOpenEdit = (product: ProductData) => {
    setSelectedProduct(product);
    setFormData({
      name: extractMultiLangDict(product.name),
      category_id: product.category_id || actualCategories[0]?.id || 0,
      short_desc: extractMultiLangDict(product.short_desc),
      full_desc: extractMultiLangDict(product.full_desc),
      rating: product.rating || "4.9/5",
      rating_count: extractMultiLangDict(product.rating_count),
      badge_text: extractMultiLangDict(product.badge_text),
      price_label: extractMultiLangDict(product.price_label),
      price: product.price || "Starting at $950/month",
      note: extractMultiLangDict(product.note),
      is_featured: Boolean(product.is_featured),
    });
    setOptionRows(parseOptionsToRows(product.options));
    setIsEditOpen(true);
  };

  const handleOpenDelete = (product: ProductData) => {
    setSelectedProduct(product);
    setIsDeleteOpen(true);
  };

  const handleSubmitCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      options: optionRows,
    };
    router.post("/admin/products", payload, {
      onSuccess: () => {
        setIsCreateOpen(false);
        toast.success("Product created successfully!", {
          description: `"${formData.name}" added to database.`,
        });
      },
      onError: () => toast.error("Failed to create product."),
    });
  };

  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;
    const payload = {
      ...formData,
      options: optionRows,
    };
    router.post(`/admin/products/${selectedProduct.id}/update`, payload, {
      onSuccess: () => {
        setIsEditOpen(false);
        setSelectedProduct(null);
        toast.success("Product updated successfully!");
      },
      onError: () => toast.error("Failed to update product."),
    });
  };

  const handleSubmitDelete = () => {
    if (!selectedProduct) return;
    router.post(`/admin/products/${selectedProduct.id}/delete`, {}, {
      onSuccess: () => {
        setIsDeleteOpen(false);
        setSelectedProduct(null);
        toast.success("Product deleted successfully!");
      },
      onError: () => toast.error("Failed to delete product."),
    });
  };

  // Category Actions
  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditingCategory && categoryFormData.id) {
      router.post(`/admin/categories/product/${categoryFormData.id}/update`, {
        name: categoryFormData.name,
        description: categoryFormData.description,
      }, {
        onSuccess: () => {
          setCategoryFormData({ id: 0, name: "", description: "" });
          setIsEditingCategory(false);
          toast.success("Category updated successfully!");
        },
      });
    } else {
      router.post("/admin/categories/product", {
        name: categoryFormData.name,
        description: categoryFormData.description,
      }, {
        onSuccess: () => {
          setCategoryFormData({ id: 0, name: "", description: "" });
          toast.success("New product category created!");
        },
      });
    }
  };

  const handleDeleteCategory = (id: number) => {
    router.post(`/admin/categories/product/${id}/delete`, {}, {
      onSuccess: () => toast.success("Category removed successfully!"),
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
            <span>All Products</span>
            {filterCategory === "ALL" && (
              <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#005883] dark:bg-sky-400 rounded-full" />
            )}
          </button>

          {actualCategories.map((cat) => {
            const catNameStr = getTrans(cat.name, "en");
            const isActive = filterCategory === catNameStr;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilterCategory(catNameStr)}
                className={`relative inline-flex items-center gap-2 text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "text-[#005883] dark:text-sky-400"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                <span>{catNameStr}</span>
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
                title="Clear Category Filter"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div className="text-xs font-semibold text-zinc-400 dark:text-zinc-500">
              Showing all products
            </div>
          )}
        </div>

        {/* Right Side: Search Input, Manage Categories, & Primary Add Button */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Input */}
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

          {/* Manage Categories Button */}
          <button
            type="button"
            onClick={() => setIsCategoryModalOpen(true)}
            className="inline-flex items-center gap-1.5 h-8.5 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 shadow-2xs transition-all cursor-pointer shrink-0"
          >
            <FolderPlus className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
            <span>Manage Categories</span>
          </button>

          {/* Primary Action Button */}
          <Link
            href="/admin/products/create"
            className="inline-flex items-center gap-1.5 h-8.5 px-4 rounded-xl bg-[#005883] hover:bg-[#003853] text-white text-xs font-bold shadow-2xs transition-all cursor-pointer whitespace-nowrap shrink-0 ml-auto sm:ml-0"
          >
            <Plus className="h-3.5 w-3.5 shrink-0" />
            <span>Add Product</span>
          </Link>
        </div>
      </div>

      {/* 2. PRODUCTS DATA TABLE OR EMPTY STATE */}
      {filteredProducts.length === 0 && !isFetching ? (
        <EmptyState
          icon={PackageSearch}
          title="No Products Found"
          description={
            searchQuery
              ? `No products matched your search query "${searchQuery}". Try searching with another keyword or resetting the filter.`
              : "No products available in the catalog. Click the 'Add New Product' button above to create one."
          }
          actionLabel={searchQuery ? "Clear Search Filter" : "Add New Product"}
          onAction={searchQuery ? () => setSearchQuery("") : () => router.get("/admin/products/create")}
        />
      ) : isFetching ? (
        <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-2xs overflow-hidden p-4">
          <AdminTableSkeleton columnsCount={8} rowsCount={6} />
        </div>
      ) : (
        <DataTable<ProductData, any>
          data={filteredProducts}
          pagination={productsPagination}
          isFetching={isFetching}
          onNavigate={() => setIsFetching(true)}
          onFinish={() => setIsFetching(false)}
          onBatchDelete={(rows) => {
            toast.success(`Batch action: Selected ${rows.length} product(s) for bulk operations.`);
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
              id: "image",
              header: "Image",
              cell: ({ row }) => {
                const imgPath = row.original.image_url || "/assets/products/1.webp";
                const prodName = getTrans(row.original.name, "en") || "Product Image";
                return (
                  <button
                    type="button"
                    onClick={() => setPreviewImageData({ isOpen: true, url: imgPath, title: prodName })}
                    className="h-10 w-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 overflow-hidden shrink-0 transition-transform hover:scale-105 active:scale-95 cursor-pointer block relative group shadow-2xs"
                    title="Click to view image"
                  >
                    <img
                      src={imgPath}
                      alt={prodName}
                      className="h-full w-full object-cover"
                    />
                  </button>
                );
              },
            },
            {
              id: "product_name",
              header: "Product Name",
              cell: ({ row }) => (
                <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white">
                  <PackageCheck className="h-4 w-4 text-[#005883] dark:text-sky-400 shrink-0" />
                  <span>{getTrans(row.original.name, "en")}</span>
                </div>
              ),
            },
            {
              id: "category",
              header: "Category",
              cell: ({ row }) => (
                <span className="inline-block px-3 py-1 rounded-full bg-[#005883]/10 text-[#005883] dark:bg-sky-950/50 dark:text-sky-300 text-[11px] font-bold border border-[#005883]/20">
                  {getTrans(row.original.category_title, "en") || "Water Treatment Series"}
                </span>
              ),
            },
            {
              id: "featured",
              header: "Featured (Home)",
              cell: ({ row }) =>
                row.original.is_featured ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 text-[11px] font-extrabold border border-amber-200/60 dark:border-amber-800/40">
                    <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                    Featured (Home)
                  </span>
                ) : (
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 text-[11px] font-medium">
                    Standard
                  </span>
                ),
            },
            {
              id: "badge",
              header: "Badge Text",
              cell: ({ row }) => (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#005883]/10 text-[#005883] dark:bg-sky-950/40 dark:text-sky-300 text-[11px] font-semibold border border-[#005883]/20">
                  <Tag className="h-3 w-3" />
                  {getTrans(row.original.badge_text, "en") || "ISO 9001 Verified®"}
                </span>
              ),
            },
            {
              id: "price",
              header: "Starting Price",
              cell: ({ row }) => <span className="font-semibold text-zinc-900 dark:text-zinc-100">{row.original.price}</span>,
            },
            {
              id: "actions",
              header: () => <div className="text-right">Actions</div>,
              cell: ({ row }) => (
                <div className="flex items-center justify-end gap-1.5">
                  <button
                    onClick={() => router.get(`/admin/products/${row.original.id}/edit`)}
                    className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
                    title="Edit Product"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleOpenDelete(row.original)}
                    className="p-1.5 rounded-lg border border-rose-200 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 transition-colors cursor-pointer"
                    title="Delete Product"
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
                Product Categories Manager
              </h3>
              <button
                onClick={() => setIsCategoryModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto flex-1 text-xs">
              <form onSubmit={handleSaveCategory} className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 space-y-3">
                <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                  {isEditingCategory ? "Edit Category" : "Add New Product Category"}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={categoryFormData.name}
                    onChange={(e) => setCategoryFormData({ ...categoryFormData, name: e.target.value })}
                    placeholder="Category Name (e.g. Dewatering Systems)"
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={categoryFormData.description}
                    onChange={(e) => setCategoryFormData({ ...categoryFormData, description: e.target.value })}
                    placeholder="Description (Optional)"
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  {isEditingCategory && (
                    <button
                      type="button"
                      onClick={() => { setIsEditingCategory(false); setCategoryFormData({ id: 0, name: "", description: "" }); }}
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
                      <th className="p-3">Category Name</th>
                      <th className="p-3">Description</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200/70 dark:divide-zinc-800/70">
                    {actualCategories.map((cat) => (
                      <tr key={cat.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                        <td className="p-3 font-mono text-zinc-400">#{cat.id}</td>
                        <td className="p-3 font-bold text-zinc-900 dark:text-white">{getTrans(cat.name, "en")}</td>
                        <td className="p-3 text-zinc-400 truncate max-w-xs">{getTrans(cat.description, "en") || "N/A"}</td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => { setIsEditingCategory(true); setCategoryFormData({ id: cat.id, name: getTrans(cat.name, "en"), description: getTrans(cat.description, "en") || "" }); }}
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

      {/* 4. CREATE PRODUCT MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between shrink-0">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Plus className="h-5 w-5 text-blue-600" />
                Add New Product Equipment
              </h3>
              <button onClick={() => setIsCreateOpen(false)} className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitCreate} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs font-sans">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <MultiLangInput
                  label="Product Name"
                  required
                  value={formData.name}
                  onChange={(val) => setFormData({ ...formData, name: val as any })}
                  placeholder="e.g. Demineralization Plant (Anion & Cation)"
                />

                <div className="space-y-1.5">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Category *</label>
                  <select
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                  >
                    {actualCategories.map((c) => (
                      <option key={c.id} value={c.id}>{getTrans(c.name, "en")}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500 shrink-0" />
                  <div>
                    <label htmlFor="create_is_featured" className="font-bold text-zinc-900 dark:text-white text-xs cursor-pointer">
                      Featured Product (Showcase on Home Page)
                    </label>
                    <p className="text-[11px] text-zinc-500">Enable to feature this product on the main Home Page capabilities section.</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  id="create_is_featured"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  className="h-4 w-4 text-amber-600 rounded border-zinc-300 focus:ring-amber-500 cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <MultiLangInput
                  label="Badge Text"
                  value={formData.badge_text}
                  onChange={(val) => setFormData({ ...formData, badge_text: val as any })}
                />

                <MultiLangInput
                  label="Price Label"
                  value={formData.price_label}
                  onChange={(val) => setFormData({ ...formData, price_label: val as any })}
                />

                <div className="space-y-1.5">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Starting Price</label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="Starting at $950/month"
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <MultiLangTextarea
                label="Catalog Card Short Description"
                rows={2}
                value={formData.short_desc}
                onChange={(val) => setFormData({ ...formData, short_desc: val as any })}
              />

              <MultiLangTextarea
                label="Product Detail Full Description"
                rows={3}
                value={formData.full_desc}
                onChange={(val) => setFormData({ ...formData, full_desc: val as any })}
              />

              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#005883] dark:text-sky-400 font-bold">
                    <Layers className="h-4 w-4" />
                    <span>Capacity & Variant Options (Grid 2x4 Builder)</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddOptionRow}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#005883] hover:bg-[#003853] text-white text-[11px] font-bold cursor-pointer transition-all"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Variant</span>
                  </button>
                </div>

                <p className="text-[11px] text-zinc-500">
                  Input title and capacity range for each option (e.g. Title: <span className="font-semibold text-zinc-800 dark:text-zinc-200">N or N+1</span>, Capacity: <span className="font-semibold text-zinc-800 dark:text-zinc-200">Under 50 m³/h</span>).
                </p>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {optionRows.map((row, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        required
                        value={row.title}
                        onChange={(e) => handleUpdateOptionRow(idx, "title", e.target.value)}
                        placeholder="Variant Title (e.g. N or N+1 / DAF-10)"
                        className="flex-1 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500 font-semibold"
                      />
                      <input
                        type="text"
                        required
                        value={row.sub}
                        onChange={(e) => handleUpdateOptionRow(idx, "sub", e.target.value)}
                        placeholder="Capacity Range (e.g. Under 50 m³/h)"
                        className="flex-1 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500 font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveOptionRow(idx)}
                        className="p-1.5 rounded-lg border border-rose-200 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 cursor-pointer"
                        title="Remove option"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <MultiLangInput
                label="Shipment / Operational Guarantee Note"
                value={formData.note}
                onChange={(val) => setFormData({ ...formData, note: val as any })}
                placeholder="A shipment typically lasts one month of heavy industrial operation"
              />

              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-end gap-3 shrink-0">
                <button type="button" onClick={() => setIsCreateOpen(false)} className="px-4 py-2 rounded-xl border text-xs font-semibold text-zinc-600 hover:bg-zinc-50 cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-[#005883] hover:bg-[#003853] text-white text-xs font-bold shadow-xs cursor-pointer">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. EDIT PRODUCT MODAL */}
      {isEditOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between shrink-0">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Edit className="h-5 w-5 text-blue-600" />
                Edit Product Equipment (#{selectedProduct.id})
              </h3>
              <button onClick={() => setIsEditOpen(false)} className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitEdit} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs font-sans">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <MultiLangInput
                  label="Product Name"
                  required
                  value={formData.name}
                  onChange={(val) => setFormData({ ...formData, name: val as any })}
                />

                <div className="space-y-1.5">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Category *</label>
                  <select
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                  >
                    {actualCategories.map((c) => (
                      <option key={c.id} value={c.id}>{getTrans(c.name, "en")}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500 shrink-0" />
                  <div>
                    <label htmlFor="edit_is_featured" className="font-bold text-zinc-900 dark:text-white text-xs cursor-pointer">
                      Featured Product (Showcase on Home Page)
                    </label>
                    <p className="text-[11px] text-zinc-500">Enable to feature this product on the main Home Page capabilities section.</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  id="edit_is_featured"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  className="h-4 w-4 text-amber-600 rounded border-zinc-300 focus:ring-amber-500 cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <MultiLangInput
                  label="Badge Text"
                  value={formData.badge_text}
                  onChange={(val) => setFormData({ ...formData, badge_text: val as any })}
                />

                <MultiLangInput
                  label="Price Label"
                  value={formData.price_label}
                  onChange={(val) => setFormData({ ...formData, price_label: val as any })}
                />

                <div className="space-y-1.5">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Starting Price</label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <MultiLangTextarea
                label="Catalog Card Short Description"
                rows={2}
                value={formData.short_desc}
                onChange={(val) => setFormData({ ...formData, short_desc: val as any })}
              />

              <MultiLangTextarea
                label="Product Detail Full Description"
                rows={3}
                value={formData.full_desc}
                onChange={(val) => setFormData({ ...formData, full_desc: val as any })}
              />

              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#005883] dark:text-sky-400 font-bold">
                    <Layers className="h-4 w-4" />
                    <span>Capacity & Variant Options (Grid 2x4 Builder)</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddOptionRow}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#005883] hover:bg-[#003853] text-white text-[11px] font-bold cursor-pointer transition-all"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Variant</span>
                  </button>
                </div>

                <p className="text-[11px] text-zinc-500">
                  Input title and capacity range for each option (e.g. Title: <span className="font-semibold text-zinc-800 dark:text-zinc-200">N or N+1</span>, Capacity: <span className="font-semibold text-zinc-800 dark:text-zinc-200">Under 50 m³/h</span>).
                </p>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {optionRows.map((row, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        required
                        value={row.title}
                        onChange={(e) => handleUpdateOptionRow(idx, "title", e.target.value)}
                        placeholder="Variant Title (e.g. N or N+1 / DAF-10)"
                        className="flex-1 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500 font-semibold"
                      />
                      <input
                        type="text"
                        required
                        value={row.sub}
                        onChange={(e) => handleUpdateOptionRow(idx, "sub", e.target.value)}
                        placeholder="Capacity Range (e.g. Under 50 m³/h)"
                        className="flex-1 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500 font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveOptionRow(idx)}
                        className="p-1.5 rounded-lg border border-rose-200 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 cursor-pointer"
                        title="Remove option"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <MultiLangInput
                label="Shipment / Operational Guarantee Note"
                value={formData.note}
                onChange={(val) => setFormData({ ...formData, note: val as any })}
              />

              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-end gap-3 shrink-0">
                <button type="button" onClick={() => setIsEditOpen(false)} className="px-4 py-2 rounded-xl border text-xs font-semibold text-zinc-600 hover:bg-zinc-50 cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs cursor-pointer">Update Product</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. DELETE CONFIRMATION MODAL */}
      {isDeleteOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden p-6 space-y-4 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="p-3 rounded-full bg-rose-50 dark:bg-rose-950/40">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">Delete Product</h3>
                <p className="text-xs text-zinc-500">Are you sure you want to remove this product?</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200">
              "{selectedProduct.name}"
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button type="button" onClick={() => setIsDeleteOpen(false)} className="px-4 py-2 rounded-xl border text-xs font-semibold text-zinc-600">Cancel</button>
              <button type="button" onClick={handleSubmitDelete} className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold">Confirm Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* 7. SHADCN UI IMAGE VIEWER PREVIEW MODAL */}
      <ImageViewerModal
        isOpen={previewImageData.isOpen}
        onClose={() => setPreviewImageData({ isOpen: false, url: "", title: "" })}
        imageUrl={previewImageData.url}
        title={previewImageData.title}
      />

    </div>
  );
};
