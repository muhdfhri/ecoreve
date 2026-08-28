import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import {
  ArrowLeft,
  Save,
  Newspaper,
  User,
  Clock,
  Star,
  FileText,
  Building2,
  Calendar,
} from "lucide-react";
import { AdminLayout } from "@/Components/admin/layout/AdminLayout";
import { MultiLangInput } from "@/Components/ui/MultiLangInput";
import { MultiLangTextarea } from "@/Components/ui/MultiLangTextarea";
import { ImageSelectorInput } from "@/Components/admin/media/ImageSelectorInput";
import { toast } from "@/Components/ui/sonner";
import { getTrans } from "@/utils/transHelper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";

interface NewsFormPageProps {
  mode: "create" | "edit";
  article?: any;
  newsCategories?: any[];
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

export default function NewsFormPage({
  mode,
  article,
  newsCategories = [],
}: NewsFormPageProps) {
  const isEdit = mode === "edit";

  const [formData, setFormData] = useState({
    title: isEdit ? extractMultiLangDict(article?.title) : { en: "", id: "", ms: "", th: "", zh: "" },
    news_category_id: isEdit ? (article?.news_category_id || newsCategories[0]?.id || 1) : (newsCategories[0]?.id || 1),
    summary: isEdit ? extractMultiLangDict(article?.summary) : { en: "", id: "", ms: "", th: "", zh: "" },
    content: isEdit ? extractMultiLangDict(article?.content) : { en: "", id: "", ms: "", th: "", zh: "" },
    read_time: isEdit ? extractMultiLangDict(article?.read_time || "5 Min Read") : { en: "5 Min Read", id: "Baca 5 Min", ms: "Baca 5 Min", th: "อ่าน 5 นาที", zh: "阅读需 5 分钟" },
    author_name: isEdit ? (article?.author_name || "EcoReve Editorial Team") : "EcoReve Editorial Team",
    author_role: isEdit ? extractMultiLangDict(article?.author_role || "Industrial Water Specialist") : { en: "Industrial Water Specialist", id: "Spesialis Air Industri", ms: "Pakar Air Industri", th: "ผู้เชี่ยวชาญด้านน้ำอุตสาหกรรม", zh: "工业水处理专家" },
    author_avatar: isEdit ? (article?.author_avatar || "") : "",
    image_url: isEdit ? (article?.image_url || "") : "",
    is_featured: isEdit ? Boolean(article?.is_featured) : false,
    published_at: isEdit ? (article?.published_at ? article.published_at.substring(0, 10) : new Date().toISOString().substring(0, 10)) : new Date().toISOString().substring(0, 10),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const targetUrl = isEdit ? `/admin/news/${article.id}/update` : "/admin/news";

    router.post(targetUrl, formData, {
      onSuccess: () => {
        toast.success(isEdit ? "Article updated successfully!" : "New article published!");
        router.get("/admin?tab=news");
      },
      onError: () => {
        setIsSubmitting(false);
        toast.error("Failed to save article. Please check input fields.");
      },
    });
  };

  return (
    <AdminLayout
      activeTab="News"
      setActiveTab={() => router.get("/admin?tab=news")}
      breadcrumbs={[
        { label: "News", href: "/admin?tab=news" },
        { label: isEdit ? "Edit Article" : "Add New Article" },
      ]}
    >
      <div className="space-y-6 font-sans">
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* MAIN 2-COLUMN GRID FORM CONTENT (MATCHING OVERVIEW GRID GAP-6 & ALIGNMENT) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* MAIN CONTENT AREA: MULTI-LANGUAGE ARTICLE CONTENT (8 Cols / 65%) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Main Content Card with 5-Language Tab Switching */}
              <div className="p-2.5 sm:p-3 rounded-2xl bg-zinc-100/80 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/80 space-y-2 transition-all">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[13px] font-semibold text-zinc-600 dark:text-zinc-300 tracking-tight truncate">
                    Multilingual Article Content (5 Locales)
                  </span>
                </div>

                <div className="p-3.5 sm:p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 shadow-2xs space-y-6">
                  <p className="text-xs text-zinc-500 -mt-2">
                    Enter headline and article body text per language. Non-English empty inputs fall back to English automatically.
                  </p>

                <MultiLangInput
                  label="Article Title / Headline"
                  required
                  value={formData.title}
                  onChange={(val) => setFormData({ ...formData, title: val as any })}
                  placeholder="e.g. EcoReve Launches Next-Gen Membrane Bio-Reactor"
                />

                <MultiLangTextarea
                  label="Article Excerpt / Card Summary"
                  required
                  rows={3}
                  value={formData.summary}
                  onChange={(val) => setFormData({ ...formData, summary: val as any })}
                  placeholder="Short summary paragraph shown on main news grid..."
                />

                <MultiLangTextarea
                  label="Full Article Body / Content"
                  rows={8}
                  value={formData.content}
                  onChange={(val) => setFormData({ ...formData, content: val as any })}
                  placeholder="Detailed news article body text..."
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
                    Category & Publish Status
                  </span>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 shadow-2xs space-y-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-zinc-800 dark:text-zinc-200 text-xs">
                      Article Category <span className="text-rose-500">*</span>
                    </label>
                    <Select
                      value={String(formData.news_category_id)}
                      onValueChange={(val) => setFormData({ ...formData, news_category_id: Number(val) })}
                    >
                      <SelectTrigger className="w-full h-10 px-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-900 dark:text-white focus:ring-[#005883]">
                        <SelectValue placeholder="Select News Category" />
                      </SelectTrigger>
                      <SelectContent className="z-50 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl">
                        {newsCategories.map((c) => (
                          <SelectItem key={c.id} value={String(c.id)} className="text-xs font-semibold cursor-pointer">
                            {getTrans(c.name, "en")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-zinc-800 dark:text-zinc-200 text-xs">Publish Date</label>
                    <input
                      type="date"
                      value={formData.published_at}
                      onChange={(e) => setFormData({ ...formData, published_at: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#005883]"
                    />
                  </div>

                  <div className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/40 flex items-center justify-between">
                    <div>
                      <label htmlFor="is_featured" className="font-bold text-zinc-900 dark:text-white text-xs cursor-pointer">
                        Featured Article
                      </label>
                      <p className="text-[11px] text-zinc-500 leading-tight">Showcase in News Hero banner</p>
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

              {/* Author & Read Time Card */}
              <div className="p-2.5 sm:p-3 rounded-2xl bg-zinc-100/80 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/80 space-y-2 transition-all">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[13px] font-semibold text-zinc-600 dark:text-zinc-300 tracking-tight truncate">
                    Author & Read Time
                  </span>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 shadow-2xs space-y-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-zinc-800 dark:text-zinc-200 text-xs">Author Name</label>
                    <input
                      type="text"
                      value={formData.author_name}
                      onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                      placeholder="e.g. EcoReve Research Team"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#005883]"
                    />
                  </div>

                  <MultiLangInput
                    label="Author Role Title"
                    value={formData.author_role}
                    onChange={(val) => setFormData({ ...formData, author_role: val as any })}
                    placeholder="e.g. Senior Environmental Engineer"
                  />

                  <MultiLangInput
                    label="Estimated Read Time"
                    value={formData.read_time}
                    onChange={(val) => setFormData({ ...formData, read_time: val as any })}
                    placeholder="e.g. 5 Min Read"
                  />
                </div>
              </div>

              {/* Media URL Assets Card */}
              <div className="p-2.5 sm:p-3 rounded-2xl bg-zinc-100/80 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/80 space-y-2 transition-all">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[13px] font-semibold text-zinc-600 dark:text-zinc-300 tracking-tight truncate">
                    Media Assets Banner
                  </span>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 shadow-2xs space-y-3">
                  <ImageSelectorInput
                    label="Article Cover Image"
                    value={formData.image_url}
                    onChange={(url) => setFormData({ ...formData, image_url: url })}
                  />
                </div>
              </div>

            </div>

          </div>

          {/* BOTTOM FORM STICKY ACTION BAR */}
          <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-end gap-3">
            <Link
              href="/admin?tab=news"
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
              <span>{isSubmitting ? "Saving..." : isEdit ? "Save Changes" : "Publish Article"}</span>
            </button>
          </div>
        </form>

      </div>
    </AdminLayout>
  );
}
