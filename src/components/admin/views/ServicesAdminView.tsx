import React, { useState } from "react";
import { router } from "@inertiajs/react";
import {
  Plus,
  Search,
  Wrench,
  Edit,
  Trash2,
  CheckCircle2,
  Filter,
  X,
  AlertTriangle,
  FolderPlus,
} from "lucide-react";
import { EmptyState } from "@/Components/ui/EmptyState";

export interface ServiceCategoryData {
  id: number;
  title: string;
  slug?: string;
  icon_name?: string;
}

export interface ServiceData {
  id: number;
  title: string;
  metric_label?: string; // Category
  short_desc?: string;   // Deliverables
  metric_value?: string; // Status
  created_at?: string;
}

interface ServicesAdminViewProps {
  services?: ServiceData[];
  serviceCategories?: ServiceCategoryData[];
}

export const ServicesAdminView: React.FC<ServicesAdminViewProps> = ({
  services = [],
  serviceCategories = [],
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("ALL");

  // Service Modals
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Service Category Modal State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categoryFormData, setCategoryFormData] = useState({ id: 0, title: "", icon_name: "Wrench" });
  const [isEditingCategory, setIsEditingCategory] = useState(false);

  // Form State for Service
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "Water Treatment",
    deliverables: "",
    status: "Active",
  });

  // Default fallback sample service categories
  const defaultCategories: ServiceCategoryData[] = [
    { id: 1, title: "Water Treatment", icon_name: "Wrench" },
    { id: 2, title: "Automation", icon_name: "Sliders" },
    { id: 3, title: "Consultation", icon_name: "ShieldCheck" },
  ];

  const actualCategories = serviceCategories && serviceCategories.length > 0 ? serviceCategories : defaultCategories;

  // Default fallback sample services
  const defaultServices: ServiceData[] = [
    { id: 1, title: "Zero Liquid Discharge (ZLD) Systems", metric_label: "Water Treatment", short_desc: "Crystallizer, RO Integration", metric_value: "Active" },
    { id: 2, title: "Industrial Telemetry & SCADA Automation", metric_label: "Automation", short_desc: "IoT Sensors, Cloud Dashboard", metric_value: "Active" },
    { id: 3, title: "Membrane Bioreactor (MBR) Turnkey", metric_label: "Water Treatment", short_desc: "Submerged Ceramic Membranes", metric_value: "Active" },
    { id: 4, title: "Effluent Water Quality Diagnostics", metric_label: "Consultation", short_desc: "Full COD/BOD Audit Reports", metric_value: "Active" },
  ];

  const actualServices = services && services.length > 0 ? services : defaultServices;

  // Filter services by Search & Category
  const filteredServices = actualServices.filter((s) => {
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.metric_label && s.metric_label.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (s.short_desc && s.short_desc.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = filterCategory === "ALL" || s.metric_label === filterCategory;

    return matchesSearch && matchesCategory;
  });

  // Service Actions
  const handleOpenCreate = () => {
    setFormData({ title: "", category: "Water Treatment", deliverables: "High-performance turnkey system", status: "Active" });
    setIsCreateOpen(true);
  };

  const handleOpenEdit = (service: ServiceData) => {
    setSelectedService(service);
    setFormData({
      title: service.title || "",
      category: service.metric_label || "Water Treatment",
      deliverables: service.short_desc || "",
      status: service.metric_value || "Active",
    });
    setIsEditOpen(true);
  };

  const handleOpenDelete = (service: ServiceData) => {
    setSelectedService(service);
    setIsDeleteOpen(true);
  };

  const handleSubmitCreate = (e: React.FormEvent) => {
    e.preventDefault();
    router.post("/admin/services", formData, { onSuccess: () => setIsCreateOpen(false) });
  };

  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;
    router.post(`/admin/services/${selectedService.id}/update`, formData, { onSuccess: () => { setIsEditOpen(false); setSelectedService(null); } });
  };

  const handleSubmitDelete = () => {
    if (!selectedService) return;
    router.post(`/admin/services/${selectedService.id}/delete`, {}, { onSuccess: () => { setIsDeleteOpen(false); setSelectedService(null); } });
  };

  // Category Actions
  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditingCategory && categoryFormData.id) {
      router.post(`/admin/categories/service/${categoryFormData.id}/update`, {
        title: categoryFormData.title,
        icon_name: categoryFormData.icon_name,
      }, {
        onSuccess: () => setCategoryFormData({ id: 0, title: "", icon_name: "Wrench" }),
      });
    } else {
      router.post("/admin/categories/service", {
        title: categoryFormData.title,
        icon_name: categoryFormData.icon_name,
      }, {
        onSuccess: () => setCategoryFormData({ id: 0, title: "", icon_name: "Wrench" }),
      });
    }
  };

  const handleDeleteCategory = (id: number) => {
    router.post(`/admin/categories/service/${id}/delete`);
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
            placeholder="Search services, categories, or deliverables..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-zinc-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Categories</option>
              <option value="Water Treatment">Water Treatment</option>
              <option value="Automation">Automation</option>
              <option value="Consultation">Consultation</option>
            </select>
          </div>

          {/* Manage Categories Button */}
          <button
            onClick={() => setIsCategoryModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all cursor-pointer"
          >
            <FolderPlus className="h-4 w-4 text-blue-600" />
            <span>Manage Categories ({actualCategories.length})</span>
          </button>

          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#005883] hover:bg-[#003853] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Service</span>
          </button>
        </div>
      </div>

      {/* 2. SERVICES DATA TABLE OR EMPTY STATE */}
      {filteredServices.length === 0 ? (
        <EmptyState
          icon={Wrench}
          title="No Services Found"
          description={
            searchQuery
              ? `No services matched your search query "${searchQuery}". Try searching with another keyword or category.`
              : "No service solutions available. Click the 'Add New Service' button above to create one."
          }
          actionLabel={searchQuery ? "Clear Search Filter" : "Add New Service"}
          onAction={searchQuery ? () => setSearchQuery("") : handleOpenCreate}
        />
      ) : (
        <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-zinc-600 dark:text-zinc-300">
              <thead className="bg-zinc-50/80 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 font-semibold border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="p-3.5 font-bold">ID</th>
                  <th className="p-3.5 font-bold">Service Solution Title</th>
                  <th className="p-3.5 font-bold">Category</th>
                  <th className="p-3.5 font-bold">Key Deliverables</th>
                  <th className="p-3.5 font-bold">Status</th>
                  <th className="p-3.5 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/70 dark:divide-zinc-800/70">
                {filteredServices.map((service) => (
                  <tr key={service.id} className="hover:bg-zinc-50/70 dark:hover:bg-zinc-800/40 transition-colors">
                    <td className="p-3.5 font-mono text-zinc-400">
                      #{service.id}
                    </td>
                    <td className="p-3.5 font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                      <Wrench className="h-4 w-4 text-blue-600 shrink-0" />
                      <span>{service.title}</span>
                    </td>
                    <td className="p-3.5">
                      <span className="inline-block px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-[11px] font-medium border border-zinc-200/60 dark:border-zinc-700">
                        {service.metric_label || "Water Treatment"}
                      </span>
                    </td>
                    <td className="p-3.5 text-zinc-500 dark:text-zinc-400 max-w-xs truncate">
                      {service.short_desc || "Standard Engineering Deliverables"}
                    </td>
                    <td className="p-3.5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 text-[11px] font-semibold">
                        <CheckCircle2 className="h-3 w-3" />
                        {service.metric_value || "Active"}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(service)}
                          className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-all cursor-pointer"
                          title="Edit Service"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(service)}
                          className="p-1.5 rounded-lg border border-rose-200 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 transition-all cursor-pointer"
                          title="Delete Service"
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
              {/* Category Add/Edit Form */}
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
                    placeholder="Category Title (e.g. Wastewater SCADA)"
                    className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={categoryFormData.icon_name}
                    onChange={(e) => setCategoryFormData({ ...categoryFormData, icon_name: e.target.value })}
                    placeholder="Icon Name (e.g. Wrench, Sliders)"
                    className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  {isEditingCategory && (
                    <button
                      type="button"
                      onClick={() => { setIsEditingCategory(false); setCategoryFormData({ id: 0, title: "", icon_name: "Wrench" }); }}
                      className="px-3 py-1 rounded-lg border border-zinc-200 text-xs font-semibold text-zinc-600 hover:bg-zinc-100"
                    >
                      Cancel Edit
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-3.5 py-1 rounded-lg bg-[#005883] hover:bg-[#003853] text-white text-xs font-bold shadow-xs"
                  >
                    {isEditingCategory ? "Update Category" : "Add Category"}
                  </button>
                </div>
              </form>

              {/* Categories Table List */}
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                <table className="w-full text-left text-xs text-zinc-600 dark:text-zinc-300">
                  <thead className="bg-zinc-100/70 dark:bg-zinc-800/80 font-bold border-b border-zinc-200 dark:border-zinc-800">
                    <tr>
                      <th className="p-3">ID</th>
                      <th className="p-3">Category Title</th>
                      <th className="p-3">Icon Name</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200/70 dark:divide-zinc-800/70">
                    {actualCategories.map((cat) => (
                      <tr key={cat.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                        <td className="p-3 font-mono text-zinc-400">#{cat.id}</td>
                        <td className="p-3 font-bold text-zinc-900 dark:text-white">{cat.title}</td>
                        <td className="p-3 font-mono text-zinc-400">{cat.icon_name || "Wrench"}</td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => { setIsEditingCategory(true); setCategoryFormData({ id: cat.id, title: cat.title, icon_name: cat.icon_name || "Wrench" }); }}
                              className="p-1 rounded-md border border-zinc-200 hover:bg-zinc-100 text-zinc-600"
                            >
                              <Edit className="h-3 w-3" />
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(cat.id)}
                              className="p-1 rounded-md border border-rose-200 hover:bg-rose-50 text-rose-600"
                            >
                              <Trash2 className="h-3 w-3" />
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
          <div className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Plus className="h-5 w-5 text-blue-600" />
                Add New Service Solution
              </h3>
              <button onClick={() => setIsCreateOpen(false)} className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitCreate} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Service Solution Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Turnkey Industrial Water Treatment"
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                  >
                    {actualCategories.map((c) => (
                      <option key={c.id} value={c.title}>{c.title}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Key Deliverables</label>
                <textarea
                  rows={3}
                  value={formData.deliverables}
                  onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-end gap-3">
                <button type="button" onClick={() => setIsCreateOpen(false)} className="px-4 py-2 rounded-xl border text-xs font-semibold text-zinc-600">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-[#005883] hover:bg-[#003853] text-white text-xs font-bold">Save Service</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. EDIT SERVICE MODAL */}
      {isEditOpen && selectedService && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Edit className="h-5 w-5 text-blue-600" />
                Edit Service Solution (#{selectedService.id})
              </h3>
              <button onClick={() => setIsEditOpen(false)} className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitEdit} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Service Solution Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                  >
                    {actualCategories.map((c) => (
                      <option key={c.id} value={c.title}>{c.title}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Key Deliverables</label>
                <textarea
                  rows={3}
                  value={formData.deliverables}
                  onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-end gap-3">
                <button type="button" onClick={() => setIsEditOpen(false)} className="px-4 py-2 rounded-xl border text-xs font-semibold text-zinc-600">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold">Update Service</button>
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
              <button type="button" onClick={handleSubmitDelete} className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold">Confirm Delete</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
