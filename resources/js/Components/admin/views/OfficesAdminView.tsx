import React, { useState } from "react";
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
} from "lucide-react";
import { EmptyState } from "@/Components/ui/EmptyState";

export interface OfficeData {
  id: number;
  badge: string;
  name: string;
  address: string;
  phone?: string;
  email?: string;
  footer_desc_1?: string;
  footer_desc_2?: string;
  created_at?: string;
}

interface OfficesAdminViewProps {
  offices?: OfficeData[];
}

export const OfficesAdminView: React.FC<OfficesAdminViewProps> = ({ offices = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Modal States
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Form State
  const [selectedOffice, setSelectedOffice] = useState<OfficeData | null>(null);
  const [formData, setFormData] = useState({
    badge: "China Office",
    name: "",
    address: "",
    phone: "",
    email: "",
    footer_desc_1: "",
    footer_desc_2: "",
  });

  // Default fallback sample offices if DB is empty
  const defaultOffices: OfficeData[] = [
    {
      id: 1,
      badge: "China Office (HQ)",
      name: "Qingdao Topolar New Material Co.,Ltd.",
      address: "No. 188 Topolar Road, High-Tech Industrial Zone, Qingdao, Shandong, China",
      phone: "+86 532-8891-8888",
      email: "info@topolar.cn",
      footer_desc_1: "Qingdao Topolar New Material Co.,Ltd. is a global leader in advanced water treatment and high-purity chemical media.",
      footer_desc_2: "Providing sustainable telemetry, membrane bioreactors, and industrial zero-liquid-discharge engineering worldwide.",
    },
    {
      id: 2,
      badge: "Indonesia Office",
      name: "PT EcoReve Indonesia",
      address: "Soho Capital Tower Lt. 32, Jl. S. Parman Kav. 28, Jakarta Barat, Indonesia",
      phone: "+62 21-5698-5555",
      email: "indonesia@ecoreve.com",
      footer_desc_1: "PT EcoReve Indonesia provides full-lifecycle technical assistance, wastewater automation, and industrial diagnostics.",
      footer_desc_2: "Certified local engineering support for textile, pharmaceutical, food & beverage, and municipal water facilities.",
    },
  ];

  const actualOffices = offices && offices.length > 0 ? offices : defaultOffices;

  // Filter offices by Search
  const filteredOffices = actualOffices.filter(
    (o) =>
      o.badge.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Open Create Modal
  const handleOpenCreate = () => {
    setFormData({
      badge: "Indonesia Office",
      name: "",
      address: "",
      phone: "+62 ",
      email: "@ecoreve.com",
      footer_desc_1: "Providing sustainable telemetry and water engineering support.",
      footer_desc_2: "Certified technical assistance for industrial and municipal plants.",
    });
    setIsCreateOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (office: OfficeData) => {
    setSelectedOffice(office);
    setFormData({
      badge: office.badge || "",
      name: office.name || "",
      address: office.address || "",
      phone: office.phone || "",
      email: office.email || "",
      footer_desc_1: office.footer_desc_1 || "",
      footer_desc_2: office.footer_desc_2 || "",
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
      },
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
      },
    });
  };

  // Submit Delete Office
  const handleSubmitDelete = () => {
    if (!selectedOffice) return;

    router.post(`/admin/offices/${selectedOffice.id}/delete`, {}, {
      onSuccess: () => {
        setIsDeleteOpen(false);
        setSelectedOffice(null);
      },
    });
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. TOP TOOLBAR & CONTROLS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search office locations, badge, or address..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Action Button */}
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#005883] hover:bg-[#003853] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Add Office Location</span>
        </button>
      </div>

      {/* 2. OFFICES DATA TABLE OR EMPTY STATE */}
      {filteredOffices.length === 0 ? (
        <EmptyState
          icon={Building2}
          title="No Office Locations Found"
          description={
            searchQuery
              ? `No office locations matched your search query "${searchQuery}". Try searching with another city or entity name.`
              : "No office locations created yet. Click the 'Add Office Location' button above to create one."
          }
          actionLabel={searchQuery ? "Clear Search Filter" : "Add Office Location"}
          onAction={searchQuery ? () => setSearchQuery("") : handleOpenCreate}
        />
      ) : (
        <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-zinc-600 dark:text-zinc-300">
              <thead className="bg-zinc-50/80 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 font-semibold border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="p-3.5 font-bold">Office Badge & Entity</th>
                  <th className="p-3.5 font-bold">Full Address</th>
                  <th className="p-3.5 font-bold">Phone / Email</th>
                  <th className="p-3.5 font-bold">Footer Description 1 & 2</th>
                  <th className="p-3.5 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/70 dark:divide-zinc-800/70">
                {filteredOffices.map((office) => (
                  <tr key={office.id} className="hover:bg-zinc-50/70 dark:hover:bg-zinc-800/40 transition-colors">
                    <td className="p-3.5 font-bold text-zinc-900 dark:text-white max-w-xs">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-blue-600 shrink-0" />
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 text-[11px] font-bold">
                          {office.badge}
                        </span>
                      </div>
                      <div className="text-[11px] text-zinc-500 font-medium mt-1 truncate">{office.name}</div>
                    </td>
                    <td className="p-3.5 text-zinc-500 dark:text-zinc-400 max-w-xs">
                      <div className="flex items-start gap-1">
                        <MapPin className="h-3.5 w-3.5 text-zinc-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{office.address}</span>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-1 text-zinc-800 dark:text-zinc-200 font-mono">
                        <Phone className="h-3 w-3 text-zinc-400 shrink-0" />
                        {office.phone || "N/A"}
                      </div>
                      <div className="flex items-center gap-1 text-zinc-400 font-mono text-[11px] mt-0.5">
                        <Mail className="h-3 w-3 text-zinc-400 shrink-0" />
                        {office.email || "N/A"}
                      </div>
                    </td>
                    <td className="p-3.5 text-zinc-400 max-w-xs text-[11px]">
                      <div className="truncate font-medium text-zinc-600 dark:text-zinc-300">{office.footer_desc_1 || "N/A"}</div>
                      <div className="truncate text-zinc-400 mt-0.5">{office.footer_desc_2 || "N/A"}</div>
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(office)}
                          className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-all cursor-pointer"
                          title="Edit Office"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(office)}
                          className="p-1.5 rounded-lg border border-rose-200 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 transition-all cursor-pointer"
                          title="Delete Office"
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
      )}

      {/* 3. CREATE OFFICE MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Plus className="h-5 w-5 text-blue-600" />
                Add Office Location
              </h3>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitCreate} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Office Badge <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="e.g. Indonesia Office"
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Official Entity Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. PT EcoReve Indonesia"
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Full Address <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="e.g. Soho Capital Tower Lt. 32, Jl. S. Parman Kav. 28, Jakarta"
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +62 21-5698-5555"
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Official Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. indonesia@ecoreve.com"
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Footer Description Paragraph 1</label>
                <textarea
                  rows={2}
                  value={formData.footer_desc_1}
                  onChange={(e) => setFormData({ ...formData, footer_desc_1: e.target.value })}
                  placeholder="First paragraph text for website footer..."
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Footer Description Paragraph 2</label>
                <textarea
                  rows={2}
                  value={formData.footer_desc_2}
                  onChange={(e) => setFormData({ ...formData, footer_desc_2: e.target.value })}
                  placeholder="Second paragraph text for website footer..."
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
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  Save Location
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. EDIT OFFICE MODAL */}
      {isEditOpen && selectedOffice && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Edit className="h-5 w-5 text-blue-600" />
                Edit Office Location (#{selectedOffice.id})
              </h3>
              <button
                onClick={() => setIsEditOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitEdit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Office Badge</label>
                  <input
                    type="text"
                    required
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Official Entity Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Full Address</label>
                <textarea
                  rows={2}
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Official Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Footer Description Paragraph 1</label>
                <textarea
                  rows={2}
                  value={formData.footer_desc_1}
                  onChange={(e) => setFormData({ ...formData, footer_desc_1: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Footer Description Paragraph 2</label>
                <textarea
                  rows={2}
                  value={formData.footer_desc_2}
                  onChange={(e) => setFormData({ ...formData, footer_desc_2: e.target.value })}
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
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  Update Location
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. DELETE CONFIRMATION MODAL */}
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
              "{selectedOffice.badge} - {selectedOffice.name}"
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
