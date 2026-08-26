import React, { useState } from "react";
import { router } from "@inertiajs/react";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Tag,
  PackageCheck,
  PackageSearch,
  X,
  AlertTriangle,
  FolderPlus,
} from "lucide-react";
import { EmptyState } from "@/Components/ui/EmptyState";

export interface ProductCategoryData {
  id: number;
  name: string;
  slug?: string;
  description?: string;
}

export interface ProductData {
  id: number;
  name: string;
  badge_text?: string;
  price?: string;
  note?: string;
  options?: any;
  created_at?: string;
}

interface ProductsAdminViewProps {
  products?: ProductData[];
  productCategories?: ProductCategoryData[];
}

export const ProductsAdminView: React.FC<ProductsAdminViewProps> = ({
  products = [],
  productCategories = [],
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBadge, setFilterBadge] = useState<string>("ALL");

  // Product Modals
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Category Modal State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categoryFormData, setCategoryFormData] = useState({ id: 0, name: "", description: "" });
  const [isEditingCategory, setIsEditingCategory] = useState(false);

  // Form State for Product
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    badge_text: "",
    price: "",
    note: "",
    options: "",
  });

  // Default fallback sample categories
  const defaultCategories: ProductCategoryData[] = [
    { id: 1, name: "Industrial Monitoring", description: "Water diagnostics & telemetry" },
    { id: 2, name: "Filtration Systems", description: "MBR and ceramic membrane units" },
    { id: 3, name: "Dosing & Pumping", description: "Chemical metering & dosing pumps" },
  ];

  const actualCategories = productCategories && productCategories.length > 0 ? productCategories : defaultCategories;

  // Default fallback sample products
  const defaultProducts: ProductData[] = [
    { id: 1, name: "Portable COD Meter", badge_text: "Most Popular", price: "$799.00", note: "Standard Shipment Note A", options: "100mL, 250mL" },
    { id: 2, name: "Online COD Analyzer", badge_text: "Industrial Grade", price: "$1,899.00", note: "Heavy Duty Freight", options: "RS485, Modbus" },
    { id: 3, name: "Centrifugal Blower Fan", badge_text: "High Airflow", price: "$1,299.00", note: "Pallet Delivery", options: "5.5kW, 7.5kW" },
    { id: 4, name: "Ceramic Membrane Module", badge_text: "MBR Filtration", price: "$1,699.00", note: "Cleanroom Packed", options: "0.1 Micron" },
    { id: 5, name: "Chemical Dosing Pump System", badge_text: "Precision Control", price: "$950.00", note: "Express Air Delivery", options: "Digital, Analog" },
  ];

  const actualProducts = products && products.length > 0 ? products : defaultProducts;

  // Filter products by Search & Badge
  const filteredProducts = actualProducts.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.badge_text && p.badge_text.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.price && p.price.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesBadge = filterBadge === "ALL" || p.badge_text === filterBadge;

    return matchesSearch && matchesBadge;
  });

  // Product Actions
  const handleOpenCreate = () => {
    setFormData({ name: "", badge_text: "Most Popular", price: "$950.00", note: "Standard Shipment Note", options: "Standard Option" });
    setIsCreateOpen(true);
  };

  const handleOpenEdit = (product: ProductData) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name || "",
      badge_text: product.badge_text || "",
      price: product.price || "",
      note: product.note || "",
      options: typeof product.options === "string" ? product.options : JSON.stringify(product.options || ""),
    });
    setIsEditOpen(true);
  };

  const handleOpenDelete = (product: ProductData) => {
    setSelectedProduct(product);
    setIsDeleteOpen(true);
  };

  const handleSubmitCreate = (e: React.FormEvent) => {
    e.preventDefault();
    router.post("/admin/products", formData, { onSuccess: () => setIsCreateOpen(false) });
  };

  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;
    router.post(`/admin/products/${selectedProduct.id}/update`, formData, { onSuccess: () => { setIsEditOpen(false); setSelectedProduct(null); } });
  };

  const handleSubmitDelete = () => {
    if (!selectedProduct) return;
    router.post(`/admin/products/${selectedProduct.id}/delete`, {}, { onSuccess: () => { setIsDeleteOpen(false); setSelectedProduct(null); } });
  };

  // Category Actions
  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditingCategory && categoryFormData.id) {
      router.post(`/admin/categories/product/${categoryFormData.id}/update`, {
        name: categoryFormData.name,
        description: categoryFormData.description,
      }, {
        onSuccess: () => setCategoryFormData({ id: 0, name: "", description: "" }),
      });
    } else {
      router.post("/admin/categories/product", {
        name: categoryFormData.name,
        description: categoryFormData.description,
      }, {
        onSuccess: () => setCategoryFormData({ id: 0, name: "", description: "" }),
      });
    }
  };

  const handleDeleteCategory = (id: number) => {
    router.post(`/admin/categories/product/${id}/delete`);
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
            placeholder="Search products by name, badge, or price..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-zinc-400" />
            <select
              value={filterBadge}
              onChange={(e) => setFilterBadge(e.target.value)}
              className="px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Badges</option>
              <option value="Most Popular">Most Popular</option>
              <option value="Industrial Grade">Industrial Grade</option>
              <option value="MBR Filtration">MBR Filtration</option>
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
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* 2. PRODUCTS DATA TABLE OR EMPTY STATE */}
      {filteredProducts.length === 0 ? (
        <EmptyState
          icon={PackageSearch}
          title="No Products Found"
          description={
            searchQuery
              ? `No products matched your search query "${searchQuery}". Try searching with another keyword or resetting the filter.`
              : "No products available in the catalog. Click the 'Add New Product' button above to create one."
          }
          actionLabel={searchQuery ? "Clear Search Filter" : "Add New Product"}
          onAction={searchQuery ? () => setSearchQuery("") : handleOpenCreate}
        />
      ) : (
        <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-zinc-600 dark:text-zinc-300">
              <thead className="bg-zinc-50/80 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 font-semibold border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="p-3.5 font-bold">ID</th>
                  <th className="p-3.5 font-bold">Product Name</th>
                  <th className="p-3.5 font-bold">Badge Text</th>
                  <th className="p-3.5 font-bold">Starting Price</th>
                  <th className="p-3.5 font-bold">Options / Capacities</th>
                  <th className="p-3.5 font-bold">Shipment Note</th>
                  <th className="p-3.5 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/70 dark:divide-zinc-800/70">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-zinc-50/70 dark:hover:bg-zinc-800/40 transition-colors">
                    <td className="p-3.5 font-mono text-zinc-400">
                      #{product.id}
                    </td>
                    <td className="p-3.5 font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                      <PackageCheck className="h-4 w-4 text-blue-600 shrink-0" />
                      <span>{product.name}</span>
                    </td>
                    <td className="p-3.5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 text-[11px] font-semibold border border-blue-200/60 dark:border-blue-800/40">
                        <Tag className="h-3 w-3" />
                        {product.badge_text || "Standard"}
                      </span>
                    </td>
                    <td className="p-3.5 font-mono font-bold text-zinc-900 dark:text-white">
                      {product.price || "$950.00"}
                    </td>
                    <td className="p-3.5 text-zinc-500 dark:text-zinc-400 max-w-xs truncate">
                      {typeof product.options === "string" ? product.options : JSON.stringify(product.options || "Default")}
                    </td>
                    <td className="p-3.5 text-zinc-400 max-w-xs truncate text-[11px]">
                      {product.note || "N/A"}
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(product)}
                          className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-all cursor-pointer"
                          title="Edit Product"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(product)}
                          className="p-1.5 rounded-lg border border-rose-200 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 transition-all cursor-pointer"
                          title="Delete Product"
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
                Product Categories Manager
              </h3>
              <button
                onClick={() => setIsCategoryModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto flex-1">
              {/* Category Add/Edit Form */}
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
                    className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={categoryFormData.description}
                    onChange={(e) => setCategoryFormData({ ...categoryFormData, description: e.target.value })}
                    placeholder="Description (Optional)"
                    className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  {isEditingCategory && (
                    <button
                      type="button"
                      onClick={() => { setIsEditingCategory(false); setCategoryFormData({ id: 0, name: "", description: "" }); }}
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
                      <th className="p-3">Category Name</th>
                      <th className="p-3">Description</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200/70 dark:divide-zinc-800/70">
                    {actualCategories.map((cat) => (
                      <tr key={cat.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                        <td className="p-3 font-mono text-zinc-400">#{cat.id}</td>
                        <td className="p-3 font-bold text-zinc-900 dark:text-white">{cat.name}</td>
                        <td className="p-3 text-zinc-400 truncate max-w-xs">{cat.description || "N/A"}</td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => { setIsEditingCategory(true); setCategoryFormData({ id: cat.id, name: cat.name, description: cat.description || "" }); }}
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

      {/* 4. CREATE PRODUCT MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Plus className="h-5 w-5 text-blue-600" />
                Add New Product
              </h3>
              <button onClick={() => setIsCreateOpen(false)} className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitCreate} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Product Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. High-Pressure Reverse Osmosis Unit"
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Badge Text</label>
                  <input
                    type="text"
                    value={formData.badge_text}
                    onChange={(e) => setFormData({ ...formData, badge_text: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Starting Price</label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Options / Capacities</label>
                <input
                  type="text"
                  value={formData.options}
                  onChange={(e) => setFormData({ ...formData, options: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Shipment / Delivery Note</label>
                <textarea
                  rows={2}
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-end gap-3">
                <button type="button" onClick={() => setIsCreateOpen(false)} className="px-4 py-2 rounded-xl border text-xs font-semibold text-zinc-600">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-[#005883] hover:bg-[#003853] text-white text-xs font-bold">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. EDIT PRODUCT MODAL */}
      {isEditOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Edit className="h-5 w-5 text-blue-600" />
                Edit Product (#{selectedProduct.id})
              </h3>
              <button onClick={() => setIsEditOpen(false)} className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitEdit} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Product Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Badge Text</label>
                  <input
                    type="text"
                    value={formData.badge_text}
                    onChange={(e) => setFormData({ ...formData, badge_text: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Price</label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Options / Capacities</label>
                <input
                  type="text"
                  value={formData.options}
                  onChange={(e) => setFormData({ ...formData, options: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Note</label>
                <textarea
                  rows={2}
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-end gap-3">
                <button type="button" onClick={() => setIsEditOpen(false)} className="px-4 py-2 rounded-xl border text-xs font-semibold text-zinc-600">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold">Update Product</button>
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
              <button type="button" onClick={handleSubmitDelete} className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold">Confirm Delete</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
