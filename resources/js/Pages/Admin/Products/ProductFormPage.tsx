import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import {
  ArrowLeft,
  Save,
  Package,
  Star,
  Layers,
  Plus,
  Trash2,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Building2,
  FileText,
} from "lucide-react";
import { AdminLayout } from "@/Components/admin/layout/AdminLayout";
import { MultiLangInput } from "@/Components/ui/MultiLangInput";
import { MultiLangTextarea } from "@/Components/ui/MultiLangTextarea";
import { toast } from "@/Components/ui/sonner";
import { getTrans } from "@/utils/transHelper";
import { ImageSelectorInput } from "@/Components/admin/media/ImageSelectorInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";

interface OptionRow {
  title: string;
  sub: string;
}

interface ProductFormPageProps {
  mode: "create" | "edit";
  product?: any;
  categories?: any[];
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

export default function ProductFormPage({
  mode,
  product,
  categories = [],
}: ProductFormPageProps) {
  const isEdit = mode === "edit";

  const [formData, setFormData] = useState({
    name: isEdit ? extractMultiLangDict(product?.name) : { en: "", id: "", ms: "", th: "", zh: "" },
    category_id: isEdit ? (product?.category_id || categories[0]?.id || 1) : (categories[0]?.id || 1),
    short_desc: isEdit ? extractMultiLangDict(product?.short_desc) : { en: "", id: "", ms: "", th: "", zh: "" },
    full_desc: isEdit ? extractMultiLangDict(product?.full_desc || product?.short_desc) : { en: "", id: "", ms: "", th: "", zh: "" },
    rating: isEdit ? (product?.rating || "") : "",
    rating_count: isEdit ? extractMultiLangDict(product?.rating_count) : { en: "", id: "", ms: "", th: "", zh: "" },
    badge_text: isEdit ? extractMultiLangDict(product?.badge_text) : { en: "", id: "", ms: "", th: "", zh: "" },
    price_label: isEdit ? extractMultiLangDict(product?.price_label) : { en: "", id: "", ms: "", th: "", zh: "" },
    price: isEdit ? (product?.price || "") : "",
    note: isEdit ? extractMultiLangDict(product?.note) : { en: "", id: "", ms: "", th: "", zh: "" },
    image_url: isEdit ? (product?.image_url || "") : "",
    is_featured: isEdit ? Boolean(product?.is_featured) : false,
  });

  const [optionRows, setOptionRows] = useState<OptionRow[]>(() => {
    if (isEdit && product?.options) {
      if (Array.isArray(product.options)) return product.options;
      if (typeof product.options === "string") {
        try {
          const parsed = JSON.parse(product.options);
          if (Array.isArray(parsed)) return parsed;
        } catch (e) {}
      }
    }
    return [];
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddOption = () => {
    setOptionRows([...optionRows, { title: "", sub: "" }]);
  };

  const handleUpdateOption = (index: number, field: "title" | "sub", value: string) => {
    const next = [...optionRows];
    next[index][field] = value;
    setOptionRows(next);
  };

  const handleRemoveOption = (index: number) => {
    setOptionRows(optionRows.filter((_, idx) => idx !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      ...formData,
      options: optionRows,
    };

    const targetUrl = isEdit ? `/admin/products/${product.id}/update` : "/admin/products";

    router.post(targetUrl, payload, {
      onSuccess: () => {
        toast.success(isEdit ? "Product equipment updated successfully!" : "New product equipment published!");
        router.get("/admin?tab=products");
      },
      onError: () => {
        setIsSubmitting(false);
        toast.error("Failed to save product equipment. Please check input fields.");
      },
    });
  };

  return (
    <AdminLayout
      activeTab="Products"
      setActiveTab={() => router.get("/admin?tab=products")}
      breadcrumbs={[
        { label: "Products", href: "/admin?tab=products" },
        { label: isEdit ? "Edit Product" : "Add New Product" },
      ]}
    >
      <div className="space-y-6 font-sans">
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* MAIN 2-COLUMN GRID FORM CONTENT (IDENTICAL TO OVERVIEW GRID GAP-6 & ALIGNMENT) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* MAIN CONTENT AREA: MULTI-LANGUAGE FORM (8 Cols / 65%) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Main Content Card with 5-Language Tab Switching */}
              <div className="p-2.5 sm:p-3 rounded-2xl bg-zinc-100/80 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/80 space-y-2 transition-all">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[13px] font-semibold text-zinc-600 dark:text-zinc-300 tracking-tight truncate">
                    Multilingual Equipment Specifications (5 Locales)
                  </span>
                </div>

                <div className="p-3.5 sm:p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 shadow-2xs space-y-6">
                  <p className="text-xs text-zinc-500 -mt-2">
                    Enter technical details per language. Leaving any non-English field blank will automatically fall back to the primary English copy.
                  </p>

                  <MultiLangInput
                    label="Equipment Name"
                    required
                    value={formData.name}
                    onChange={(val) => setFormData({ ...formData, name: val as any })}
                    placeholder="e.g. Demineralization Plant (Anion & Cation)"
                  />

                  <MultiLangTextarea
                    label="Catalog Card Short Summary"
                    required
                    rows={3}
                    value={formData.short_desc}
                    onChange={(val) => setFormData({ ...formData, short_desc: val as any })}
                    placeholder="High-capacity dual-bed ion exchange demineralizer removing silica..."
                  />

                  <MultiLangTextarea
                    label="Full Technical Engineering Description"
                    rows={6}
                    value={formData.full_desc}
                    onChange={(val) => setFormData({ ...formData, full_desc: val as any })}
                    placeholder="EcoReve Pressure Sand & Anthracite multi-layer depth filtration vessels..."
                  />

                  <MultiLangInput
                    label="Operational Guarantee Note"
                    value={formData.note}
                    onChange={(val) => setFormData({ ...formData, note: val as any })}
                    placeholder="A shipment typically lasts one month of heavy industrial operation"
                  />
                </div>
              </div>

              {/* Media URL Card */}
              <div className="p-2.5 sm:p-3 rounded-2xl bg-zinc-100/80 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/80 space-y-2 transition-all">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[13px] font-semibold text-zinc-600 dark:text-zinc-300 tracking-tight truncate">
                    Product Banner Image Asset
                  </span>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 shadow-2xs space-y-3">
                  <ImageSelectorInput
                    label="Product Equipment Image"
                    modalTitle="Atur Gambar Produk"
                    value={formData.image_url}
                    onChange={(url) => setFormData({ ...formData, image_url: url })}
                  />
                </div>
              </div>

            </div>

            {/* SIDEBAR METADATA CONTROLS (4 Cols / 35%) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Category & Status Card */}
              <div className="p-2.5 sm:p-3 rounded-2xl bg-zinc-100/80 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/80 space-y-2 transition-all">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[13px] font-semibold text-zinc-600 dark:text-zinc-300 tracking-tight truncate">
                    Category & Showcase
                  </span>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 shadow-2xs space-y-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-zinc-800 dark:text-zinc-200 text-xs">
                      Product Category <span className="text-rose-500">*</span>
                    </label>
                    <Select
                      value={String(formData.category_id)}
                      onValueChange={(val) => setFormData({ ...formData, category_id: Number(val) })}
                    >
                      <SelectTrigger className="w-full h-10 px-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-900 dark:text-white focus:ring-[#005883]">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent className="z-50 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl">
                        {categories.map((c) => (
                          <SelectItem key={c.id} value={String(c.id)} className="text-xs font-semibold cursor-pointer">
                            {getTrans(c.name, "en")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/40 flex items-center justify-between">
                    <div>
                      <label htmlFor="is_featured" className="font-bold text-zinc-900 dark:text-white text-xs cursor-pointer">
                        Featured Equipment
                      </label>
                      <p className="text-[11px] text-zinc-500 leading-tight">Showcase on Home Page capabilities</p>
                    </div>
                    <input
                      type="checkbox"
                      id="is_featured"
                      checked={formData.is_featured}
                      onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                      className="h-4 w-4 text-amber-600 rounded border-zinc-300 focus:ring-amber-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Pricing & Lease Terms Card */}
              <div className="p-2.5 sm:p-3 rounded-2xl bg-zinc-100/80 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/80 space-y-2 transition-all">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[13px] font-semibold text-zinc-600 dark:text-zinc-300 tracking-tight truncate">
                    Commercial & Rates
                  </span>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 shadow-2xs space-y-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-zinc-800 dark:text-zinc-200 text-xs">Starting Base Rate / Price</label>
                    <input
                      type="text"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="Starting at $950/month"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#005883]"
                    />
                  </div>

                  <MultiLangInput
                    label="Badge Label (Card Pill)"
                    value={formData.badge_text}
                    onChange={(val) => setFormData({ ...formData, badge_text: val as any })}
                    placeholder="e.g. ISO 9001 Verified®"
                  />

                  <MultiLangInput
                    label="Rate Header Tag"
                    value={formData.price_label}
                    onChange={(val) => setFormData({ ...formData, price_label: val as any })}
                    placeholder="e.g. SKID LEASE RATE"
                  />
                </div>
              </div>

              {/* Variant Capacity Options Builder */}
              <div className="p-2.5 sm:p-3 rounded-2xl bg-zinc-100/80 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/80 space-y-2 transition-all">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[13px] font-semibold text-zinc-600 dark:text-zinc-300 tracking-tight truncate">
                    Variant Capacity Grid (2x4)
                  </span>
                  <button
                    type="button"
                    onClick={handleAddOption}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#005883] hover:bg-[#003853] text-white text-[11px] font-bold cursor-pointer transition-all"
                  >
                    <span>+ Add Variant</span>
                  </button>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 shadow-2xs space-y-3">
                  <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                    {optionRows.map((row, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          required
                          value={row.title}
                          onChange={(e) => handleUpdateOption(idx, "title", e.target.value)}
                          placeholder="Variant Title (e.g. N or N+1)"
                          className="flex-1 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-[#005883] font-semibold"
                        />
                        <input
                          type="text"
                          required
                          value={row.sub}
                          onChange={(e) => handleUpdateOption(idx, "sub", e.target.value)}
                          placeholder="Capacity Range"
                          className="flex-1 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-[#005883] font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveOption(idx)}
                          className="p-1.5 rounded-lg border border-rose-200 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* BOTTOM FORM STICKY ACTION BAR */}
          <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-end gap-3">
            <Link
              href="/admin?tab=products"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border-2 border-black/80 dark:border-white/80 bg-white dark:bg-zinc-900 text-xs font-bold text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all cursor-pointer shadow-none whitespace-nowrap"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#005883] hover:bg-[#003853] text-white text-xs font-bold shadow-xs transition-all cursor-pointer whitespace-nowrap disabled:opacity-50"
            >
              <Save className="h-4 w-4 shrink-0" />
              <span>{isSubmitting ? "Saving..." : isEdit ? "Save Changes" : "Publish Product"}</span>
            </button>
          </div>
        </form>

      </div>
    </AdminLayout>
  );
}
