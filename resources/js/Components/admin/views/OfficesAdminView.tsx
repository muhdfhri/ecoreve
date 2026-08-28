import React, { useState, useEffect, useRef } from "react";
import { router } from "@inertiajs/react";
import {
  Plus,
  Search,
  Building2,
  MapPin,
  Phone,
  Mail,
  Edit,
  Trash2,
  X,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  Loader2,
  Layers,
} from "lucide-react";
import { EmptyState } from "@/Components/ui/EmptyState";
import { toast } from "@/Components/ui/sonner";
import { MultiLangInput } from "@/Components/ui/MultiLangInput";
import { MultiLangTextarea } from "@/Components/ui/MultiLangTextarea";
import { getTrans } from "@/utils/transHelper";
import { AdminCursorPagination, CursorPaginationData } from "../AdminCursorPagination";
import { AdminTableSkeleton } from "../AdminTableSkeleton";
import { DataTable } from "@/Components/ui/data-table";

export interface OfficeData {
  id: number;
  badge: any;
  name: any;
  address: any;
  phone?: string;
  email?: string;
  footer_desc_1?: any;
  footer_desc_2?: any;
  created_at?: string;
}

interface OfficesAdminViewProps {
  offices?: OfficeData[];
  officesPagination?: CursorPaginationData | null;
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

export const OfficesAdminView: React.FC<OfficesAdminViewProps> = ({
  offices = [],
  officesPagination = null,
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

  // Form State with MultiLang
  const [selectedOffice, setSelectedOffice] = useState<OfficeData | null>(null);
  const [formData, setFormData] = useState({
    badge: { en: "Indonesia Office", id: "Kantor Indonesia", ms: "Pejabat Indonesia", th: "สำนักงานอินโดนีเซีย", zh: "印度尼西亚办公室" },
    name: { en: "", id: "", ms: "", th: "", zh: "" },
    address: { en: "", id: "", ms: "", th: "", zh: "" },
    phone: "",
    email: "",
    footer_desc_1: { en: "", id: "", ms: "", th: "", zh: "" },
    footer_desc_2: { en: "", id: "", ms: "", th: "", zh: "" },
  });

  // Auto-reset fetching state when Inertia finishes updating props
  useEffect(() => {
    setIsFetching(false);
  }, [offices, officesPagination]);

  const actualOffices = offices || [];

  // Filter offices by Search
  const filteredOffices = actualOffices.filter((o) => {
    if (!o) return false;
    const badge = getTrans(o.badge, "en");
    const name = getTrans(o.name, "en");
    const address = getTrans(o.address, "en");
    const query = searchQuery.toLowerCase();
    return (
      badge.toLowerCase().includes(query) ||
      name.toLowerCase().includes(query) ||
      address.toLowerCase().includes(query)
    );
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
        { tab: "offices", search: val, sort_dir: sortDir },
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
      { tab: "offices", sort_dir: nextDir, search: searchQuery },
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
      badge: { en: "Indonesia Office", id: "Kantor Indonesia", ms: "Pejabat Indonesia", th: "สำนักงานอินโดนีเซีย", zh: "印度尼西亚办公室" },
      name: { en: "", id: "", ms: "", th: "", zh: "" },
      address: { en: "", id: "", ms: "", th: "", zh: "" },
      phone: "+62 ",
      email: "@ecoreve.com",
      footer_desc_1: { en: "Providing sustainable telemetry and water engineering support.", id: "Menyediakan dukungan telemetri dan teknik air yang berkelanjutan.", ms: "Menyediakan sokongan telemetri dan kejuruteraan air mampan.", th: "ให้บริการสนับสนุน telemetry และวิศวกรรมน้ำที่ยั่งยืน", zh: "提供可持续的遥测和水工程支持。" },
      footer_desc_2: { en: "Certified technical assistance for industrial and municipal plants.", id: "Bantuan teknis bersertifikat untuk pabrik industri dan kotamadya.", ms: "Bantuan teknikal bersertifikat untuk loji industri dan perbandaran.", th: "ความช่วยเหลือทางเทคนิคที่ได้รับการรับรองสำหรับโรงงานอุตสาหกรรมและเทศบาล", zh: "为工业和市政工程提供经认证的技术协助。" },
    });
    setIsCreateOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (office: OfficeData) => {
    setSelectedOffice(office);
    setFormData({
      badge: extractMultiLangDict(office.badge),
      name: extractMultiLangDict(office.name),
      address: extractMultiLangDict(office.address),
      phone: office.phone || "",
      email: office.email || "",
      footer_desc_1: extractMultiLangDict(office.footer_desc_1),
      footer_desc_2: extractMultiLangDict(office.footer_desc_2),
    });
    setIsEditOpen(true);
  };

  // Open Delete Modal
  const handleOpenDelete = (office: OfficeData) => {
    setSelectedOffice(office);
    setIsDeleteOpen(true);
  };

  // Submit Create Office
  const handleSubmitCreate = (e: React.FormEvent) => {
    e.preventDefault();
    router.post("/admin/offices", formData, {
      onSuccess: () => {
        setIsCreateOpen(false);
        toast.success("Office location added successfully!");
      },
      onError: () => toast.error("Failed to add office location."),
    });
  };

  // Submit Edit Office
  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOffice) return;

    router.post(`/admin/offices/${selectedOffice.id}/update`, formData, {
      onSuccess: () => {
        setIsEditOpen(false);
        setSelectedOffice(null);
        toast.success("Office location updated successfully!");
      },
      onError: () => toast.error("Failed to update office location."),
    });
  };

  // Submit Delete Office
  const handleSubmitDelete = () => {
    if (!selectedOffice) return;

    router.post(`/admin/offices/${selectedOffice.id}/delete`, {}, {
      onSuccess: () => {
        setIsDeleteOpen(false);
        setSelectedOffice(null);
        toast.success("Office location deleted successfully!");
      },
      onError: () => toast.error("Failed to delete office location."),
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
            <Building2 className="h-4 w-4 shrink-0" />
            <span>All Office Locations</span>
            <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#005883] dark:bg-sky-400 rounded-full" />
          </button>
        </div>
      </div>

      {/* 2. GAMBAR 2 REFERENCE: BOTTOM SEARCH & ACTION CONTROL BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-0.5">
        {/* Left Side: Filter Status Text */}
        <div className="flex items-center gap-2 min-h-8.5">
          <div className="text-xs font-semibold text-zinc-400 dark:text-zinc-500">
            Showing all office locations ({actualOffices.length})
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
              placeholder="Search offices, badge, address..."
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
            <span>Add Office</span>
          </button>
        </div>
      </div>

      {/* 3. OFFICES SHADCN DATA TABLE OR EMPTY STATE */}
      {filteredOffices.length === 0 && !isFetching ? (
        <EmptyState
          icon={Building2}
          title={actualOffices.length === 0 ? "No Office Locations Found" : "No Matching Office Locations"}
          description={
            actualOffices.length === 0
              ? "No office locations created yet. Click the 'Add Office' button above to create one."
              : `No office locations matched your search query "${searchQuery}". Try searching with another city or entity name.`
          }
          actionLabel={searchQuery ? "Clear Search Filter" : "Add Office"}
          onAction={searchQuery ? () => setSearchQuery("") : handleOpenCreate}
        />
      ) : isFetching ? (
        <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-2xs overflow-hidden p-4">
          <AdminTableSkeleton columnsCount={6} rowsCount={6} />
        </div>
      ) : (
        <DataTable<OfficeData, any>
          data={filteredOffices}
          pagination={officesPagination}
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
              id: "badge_and_name",
              header: "Office Badge & Entity",
              cell: ({ row }) => (
                <div className="max-w-xs">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-[#005883] dark:text-sky-400 shrink-0" />
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#005883]/10 text-[#005883] dark:bg-sky-950/60 dark:text-sky-300 text-[11px] font-bold">
                      {getTrans(row.original.badge, "en") || "Office"}
                    </span>
                  </div>
                  <div className="text-[11px] text-zinc-500 font-medium mt-1 truncate">
                    {getTrans(row.original.name, "en") || "N/A"}
                  </div>
                </div>
              ),
            },
            {
              id: "address",
              header: "Full Address",
              cell: ({ row }) => (
                <div className="flex items-start gap-1 max-w-xs text-xs text-zinc-500 dark:text-zinc-400">
                  <MapPin className="h-3.5 w-3.5 text-zinc-400 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{getTrans(row.original.address, "en") || "N/A"}</span>
                </div>
              ),
            },
            {
              id: "contact",
              header: "Phone / Email",
              cell: ({ row }) => (
                <div>
                  <div className="flex items-center gap-1 text-zinc-800 dark:text-zinc-200 font-mono text-xs">
                    <Phone className="h-3 w-3 text-zinc-400 shrink-0" />
                    {row.original.phone || "N/A"}
                  </div>
                  <div className="flex items-center gap-1 text-zinc-400 font-mono text-[11px] mt-0.5">
                    <Mail className="h-3 w-3 text-zinc-400 shrink-0" />
                    {row.original.email || "N/A"}
                  </div>
                </div>
              ),
            },
            {
              id: "footer_desc",
              header: "Footer Descriptions",
              cell: ({ row }) => (
                <div className="max-w-xs text-[11px] text-zinc-400">
                  <div className="truncate font-medium text-zinc-600 dark:text-zinc-300">
                    {getTrans(row.original.footer_desc_1, "en") || "N/A"}
                  </div>
                  <div className="truncate text-zinc-400 mt-0.5">
                    {getTrans(row.original.footer_desc_2, "en") || "N/A"}
                  </div>
                </div>
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
                    title="Edit Office"
                  >
                    <Edit className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleOpenDelete(row.original)}
                    className="p-1.5 rounded-lg border border-rose-200 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 transition-all cursor-pointer"
                    title="Delete Office"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ),
            },
          ]}
        />
      )}

      {/* 4. CREATE OFFICE MODAL (WITH 5 MULTI-LANGUAGES) */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Plus className="h-5 w-5 text-[#005883]" />
                Add Office Location
              </h3>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitCreate} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <MultiLangInput
                label="Office Badge Title"
                required
                value={formData.badge}
                onChange={(val) => setFormData({ ...formData, badge: val as any })}
                placeholder="e.g. Indonesia Office"
              />

              <MultiLangInput
                label="Official Entity Name"
                required
                value={formData.name}
                onChange={(val) => setFormData({ ...formData, name: val as any })}
                placeholder="e.g. PT EcoReve Indonesia"
              />

              <MultiLangTextarea
                label="Full Address"
                required
                rows={2}
                value={formData.address}
                onChange={(val) => setFormData({ ...formData, address: val as any })}
                placeholder="Full street address, building name, unit, and city..."
              />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +62 21-5698-5555"
                    className="w-full h-9 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-1 focus:ring-[#005883]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Official Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. indonesia@ecoreve.com"
                    className="w-full h-9 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-1 focus:ring-[#005883]"
                  />
                </div>
              </div>

              <MultiLangTextarea
                label="Footer Description Paragraph 1"
                rows={2}
                value={formData.footer_desc_1}
                onChange={(val) => setFormData({ ...formData, footer_desc_1: val as any })}
                placeholder="First paragraph text for website footer..."
              />

              <MultiLangTextarea
                label="Footer Description Paragraph 2"
                rows={2}
                value={formData.footer_desc_2}
                onChange={(val) => setFormData({ ...formData, footer_desc_2: val as any })}
                placeholder="Second paragraph text for website footer..."
              />

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
                  className="px-4 py-2 rounded-xl bg-[#005883] hover:bg-[#003853] text-white text-xs font-bold shadow-2xs cursor-pointer"
                >
                  Save Office Location
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. EDIT OFFICE MODAL (WITH 5 MULTI-LANGUAGES) */}
      {isEditOpen && selectedOffice && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Edit className="h-5 w-5 text-[#005883]" />
                Edit Office Location (#{selectedOffice.id})
              </h3>
              <button
                onClick={() => setIsEditOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitEdit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <MultiLangInput
                label="Office Badge Title"
                required
                value={formData.badge}
                onChange={(val) => setFormData({ ...formData, badge: val as any })}
              />

              <MultiLangInput
                label="Official Entity Name"
                required
                value={formData.name}
                onChange={(val) => setFormData({ ...formData, name: val as any })}
              />

              <MultiLangTextarea
                label="Full Address"
                required
                rows={2}
                value={formData.address}
                onChange={(val) => setFormData({ ...formData, address: val as any })}
              />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full h-9 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-1 focus:ring-[#005883]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Official Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-9 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-1 focus:ring-[#005883]"
                  />
                </div>
              </div>

              <MultiLangTextarea
                label="Footer Description Paragraph 1"
                rows={2}
                value={formData.footer_desc_1}
                onChange={(val) => setFormData({ ...formData, footer_desc_1: val as any })}
              />

              <MultiLangTextarea
                label="Footer Description Paragraph 2"
                rows={2}
                value={formData.footer_desc_2}
                onChange={(val) => setFormData({ ...formData, footer_desc_2: val as any })}
              />

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
                  className="px-4 py-2 rounded-xl bg-[#005883] hover:bg-[#003853] text-white text-xs font-bold shadow-2xs cursor-pointer"
                >
                  Update Office Location
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. DELETE CONFIRMATION MODAL */}
      {isDeleteOpen && selectedOffice && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden p-6 space-y-4 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="p-3 rounded-full bg-rose-50 dark:bg-rose-950/40">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">Delete Office Location</h3>
                <p className="text-xs text-zinc-500">Are you sure you want to remove this office location?</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200">
              "{getTrans(selectedOffice.badge, "en")} - {getTrans(selectedOffice.name, "en")}"
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

