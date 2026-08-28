import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import { Save } from "lucide-react";
import { AdminLayout } from "@/Components/admin/layout/AdminLayout";
import { MultiLangInput } from "@/Components/ui/MultiLangInput";
import { MultiLangTextarea } from "@/Components/ui/MultiLangTextarea";
import { toast } from "@/Components/ui/sonner";
import { getTrans } from "@/utils/transHelper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";

interface ServiceFormPageProps {
  mode: "create" | "edit";
  service?: any;
  serviceCategories?: any[];
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

export default function ServiceFormPage({
  mode,
  service,
  serviceCategories = [],
}: ServiceFormPageProps) {
  const isEdit = mode === "edit";

  const [formData, setFormData] = useState({
    title: isEdit ? extractMultiLangDict(service?.title) : { en: "", id: "", ms: "", th: "", zh: "" },
    service_category_id: isEdit ? (service?.service_category_id || serviceCategories[0]?.id || 1) : (serviceCategories[0]?.id || 1),
    short_desc: isEdit ? extractMultiLangDict(service?.short_desc) : { en: "", id: "", ms: "", th: "", zh: "" },
    full_desc: isEdit ? extractMultiLangDict(service?.full_desc || service?.short_desc) : { en: "", id: "", ms: "", th: "", zh: "" },
    metric_label: isEdit ? extractMultiLangDict(service?.metric_label) : { en: "ECOREVE", id: "ECOREVE", ms: "ECOREVE", th: "ECOREVE", zh: "ECOREVE" },
    metric_value: isEdit ? (service?.metric_value || "100%") : "100%",
    metric_desc: isEdit ? extractMultiLangDict(service?.metric_desc) : { en: "", id: "", ms: "", th: "", zh: "" },
    turnaround_time: isEdit ? extractMultiLangDict(service?.turnaround_time) : { en: "3 - 5 Business Days", id: "3 - 5 Hari Kerja", ms: "3 - 5 Hari Bekerja", th: "3 - 5 วันทำการ", zh: "3 - 5 个工作日" },
    features: isEdit ? formatListToString(service?.features) : "ISO 9001 Certified Engineering\nTurnkey Skid Assembly",
    deliverables: isEdit ? formatListToString(service?.deliverables) : "Standard Inspection Certificate\nOperational Baseline Report",
    icon_name: isEdit ? (service?.icon_name || "Wrench") : "Wrench",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const targetUrl = isEdit ? `/admin/services/${service.id}/update` : "/admin/services";

    router.post(targetUrl, formData, {
      onSuccess: () => {
        toast.success(isEdit ? "Service solution updated successfully!" : "New service solution published!");
        router.get("/admin?tab=services");
      },
      onError: () => {
        setIsSubmitting(false);
        toast.error("Failed to save service solution. Please check input fields.");
      },
    });
  };

  return (
    <AdminLayout
      activeTab="Services"
      setActiveTab={() => router.get("/admin?tab=services")}
      breadcrumbs={[
        { label: "Services", href: "/admin?tab=services" },
        { label: isEdit ? "Edit Service" : "Add New Service" },
      ]}
    >
      <div className="space-y-6 font-sans">
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* MAIN 2-COLUMN GRID FORM CONTENT (MATCHING OVERVIEW GRID GAP-6 & ALIGNMENT) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* MAIN CONTENT AREA: MULTI-LANGUAGE SOLUTION DESCRIPTIONS (8 Cols / 65%) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Main Content Card with 5-Language Tab Switching */}
              <div className="p-2.5 sm:p-3 rounded-2xl bg-zinc-100/80 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/80 space-y-2 transition-all">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[13px] font-semibold text-zinc-600 dark:text-zinc-300 tracking-tight truncate">
                    Multilingual Solution Descriptions (5 Locales)
                  </span>
                </div>

                <div className="p-3.5 sm:p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 shadow-2xs space-y-6">
                  <p className="text-xs text-zinc-500 -mt-2">
                    Enter technical details per language. Non-English empty inputs fall back to English automatically.
                  </p>

                  <MultiLangInput
                    label="Service Solution Title"
                    required
                    value={formData.title}
                    onChange={(val) => setFormData({ ...formData, title: val as any })}
                    placeholder="e.g. On-Site Mechanical & Piping Installation"
                  />

                  <MultiLangTextarea
                    label="Catalog Card Summary"
                    required
                    rows={3}
                    value={formData.short_desc}
                    onChange={(val) => setFormData({ ...formData, short_desc: val as any })}
                    placeholder="Short summary paragraph shown on main service catalog..."
                  />

                  <MultiLangTextarea
                    label="Full Engineering Scope Description"
                    rows={6}
                    value={formData.full_desc}
                    onChange={(val) => setFormData({ ...formData, full_desc: val as any })}
                    placeholder="Detailed engineering scope paragraph shown in specification modal..."
                  />
                </div>
              </div>

              {/* Marquee Metric Impact Card */}
              <div className="p-2.5 sm:p-3 rounded-2xl bg-zinc-100/80 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/80 space-y-2 transition-all">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[13px] font-semibold text-zinc-600 dark:text-zinc-300 tracking-tight truncate">
                    Marquee Metric Impact ("After Work Goes Live")
                  </span>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 shadow-2xs space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <MultiLangInput
                      label="Metric Impact Label"
                      value={formData.metric_label}
                      onChange={(val) => setFormData({ ...formData, metric_label: val as any })}
                      placeholder="e.g. IMMERSY"
                    />

                    <div className="space-y-1.5">
                      <label className="font-bold text-zinc-800 dark:text-zinc-200 text-xs">Metric Stat Value</label>
                      <input
                        type="text"
                        value={formData.metric_value}
                        onChange={(e) => setFormData({ ...formData, metric_value: e.target.value })}
                        placeholder="e.g. 100% or +2"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#005883]"
                      />
                    </div>
                  </div>

                  <MultiLangInput
                    label="Metric Short Impact Description"
                    value={formData.metric_desc}
                    onChange={(val) => setFormData({ ...formData, metric_desc: val as any })}
                    placeholder="e.g. Operations expanded to 2 additional neighborhoods."
                  />
                </div>
              </div>

            </div>

            {/* SIDEBAR METADATA & CONTROL (4 Cols / 35%) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Category & Icon Card */}
              <div className="p-2.5 sm:p-3 rounded-2xl bg-zinc-100/80 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/80 space-y-2 transition-all">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[13px] font-semibold text-zinc-600 dark:text-zinc-300 tracking-tight truncate">
                    Category & Icon Visual
                  </span>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 shadow-2xs space-y-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-zinc-800 dark:text-zinc-200 text-xs">
                      Service Category <span className="text-rose-500">*</span>
                    </label>
                    <Select
                      value={String(formData.service_category_id)}
                      onValueChange={(val) => setFormData({ ...formData, service_category_id: Number(val) })}
                    >
                      <SelectTrigger className="w-full h-10 px-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-900 dark:text-white focus:ring-[#005883]">
                        <SelectValue placeholder="Select Service Category" />
                      </SelectTrigger>
                      <SelectContent className="z-50 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl">
                        {serviceCategories.map((c) => (
                          <SelectItem key={c.id} value={String(c.id)} className="text-xs font-semibold cursor-pointer">
                            {getTrans(c.title, "en")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-zinc-800 dark:text-zinc-200 text-xs">Icon Representation</label>
                    <Select
                      value={formData.icon_name}
                      onValueChange={(val) => setFormData({ ...formData, icon_name: val })}
                    >
                      <SelectTrigger className="w-full h-10 px-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-900 dark:text-white focus:ring-[#005883]">
                        <SelectValue placeholder="Select Icon" />
                      </SelectTrigger>
                      <SelectContent className="z-50 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl">
                        <SelectItem value="Wrench" className="text-xs font-semibold cursor-pointer">Wrench (Mechanical & Piping)</SelectItem>
                        <SelectItem value="Sliders" className="text-xs font-semibold cursor-pointer">Sliders (System Commissioning)</SelectItem>
                        <SelectItem value="ShieldCheck" className="text-xs font-semibold cursor-pointer">ShieldCheck (Maintenance & Compliance)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Turnaround Time & Technical Scope Card */}
              <div className="p-2.5 sm:p-3 rounded-2xl bg-zinc-100/80 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/80 space-y-2 transition-all">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[13px] font-semibold text-zinc-600 dark:text-zinc-300 tracking-tight truncate">
                    SLA & Technical Scope
                  </span>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 shadow-2xs space-y-4">
                  <MultiLangInput
                    label="Turnaround Time (SLA)"
                    value={formData.turnaround_time}
                    onChange={(val) => setFormData({ ...formData, turnaround_time: val as any })}
                    placeholder="e.g. 3 - 5 Business Days"
                  />

                  <div className="space-y-1.5">
                    <label className="font-bold text-zinc-800 dark:text-zinc-200 text-xs">
                      Technical Scope Lines (1 item per line)
                    </label>
                    <textarea
                      rows={4}
                      value={formData.features}
                      onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                      placeholder="High-pressure SS316L piping&#10;Vibration-isolated skid foundation"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-mono text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#005883]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-zinc-800 dark:text-zinc-200 text-xs">
                      Deliverables & Certificates (1 item per line)
                    </label>
                    <textarea
                      rows={4}
                      value={formData.deliverables}
                      onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                      placeholder="As-Built P&ID Diagrams&#10;Pressure Hydro-test Certificate"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-mono text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#005883]"
                    />
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* BOTTOM FORM STICKY ACTION BAR */}
          <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-end gap-3">
            <Link
              href="/admin?tab=services"
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
              <span>{isSubmitting ? "Saving..." : isEdit ? "Save Changes" : "Publish Solution"}</span>
            </button>
          </div>
        </form>

      </div>
    </AdminLayout>
  );
}
