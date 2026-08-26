import React, { useState } from "react";
import { router } from "@inertiajs/react";
import {
  Plus,
  Search,
  Newspaper,
  Clock,
  User,
  Edit,
  Trash2,
  Filter,
  X,
  AlertTriangle,
  FolderPlus,
} from "lucide-react";
import { EmptyState } from "@/Components/ui/EmptyState";

export interface NewsCategoryData {
  id: number;
  name: string;
  slug?: string;
}

export interface NewsData {
  id: number;
  title: string;
  category?: string;
  read_time?: string;
  author_name?: string;
  author_role?: string;
  summary?: string;
  content?: string;
  published_at?: string;
  created_at?: string;
}

interface NewsAdminViewProps {
  news?: NewsData[];
  newsCategories?: NewsCategoryData[];
}

export const NewsAdminView: React.FC<NewsAdminViewProps> = ({
  news = [],
  newsCategories = [],
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("ALL");

  // News Modals
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // News Category Modal State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categoryFormData, setCategoryFormData] = useState({ id: 0, name: "" });
  const [isEditingCategory, setIsEditingCategory] = useState(false);

  // Form State for News
  const [selectedArticle, setSelectedArticle] = useState<NewsData | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "Certification",
    read_time: "5 min read",
    author_name: "Dr. Elena Rostova",
    author_role: "Chief Water Engineer",
    summary: "",
    content: "",
  });

  // Default fallback sample news categories
  const defaultCategories: NewsCategoryData[] = [
    { id: 1, name: "Certification" },
    { id: 2, name: "Innovation" },
    { id: 3, name: "Case Study" },
  ];

  const actualCategories = newsCategories && newsCategories.length > 0 ? newsCategories : defaultCategories;

  // Default fallback sample news articles
  const defaultNews: NewsData[] = [
    {
      id: 1,
      title: "EcoReve Achieves ISO 15839 Certification for Real-Time Telemetry & Water Diagnostics",
      category: "Certification",
      read_time: "5 min read",
      author_name: "Dr. Elena Rostova",
      author_role: "Chief Water Engineer",
      summary: "EcoReve has official ISO 15839 certification for high-accuracy telemetry sensor arrays.",
      published_at: "May 07, 2026",
    },
    {
      id: 2,
      title: "Next-Gen Ceramic Membrane Filtration Reduces Chemical Effluent Operating Expenses by 30%",
      category: "Innovation",
      read_time: "4 min read",
      author_name: "David Chen",
      author_role: "R&D Director",
      summary: "New submerged ceramic bioreactors dramatically cut back chemical wash frequencies.",
      published_at: "April 22, 2026",
    },
    {
      id: 3,
      title: "Zero Liquid Discharge (ZLD) Systems Deployed at Major Southeast Asian Chemical Park",
      category: "Case Study",
      read_time: "6 min read",
      author_name: "EcoReve Editorial",
      author_role: "Industrial Case Study",
      summary: "Turnkey ZLD crystallizers commissioned for 500,000 GPD chemical wastewater streams.",
      published_at: "March 15, 2026",
    },
  ];

  const actualNews = news && news.length > 0 ? news : defaultNews;

  // Filter news articles by Search & Category
  const filteredNews = actualNews.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (a.category && a.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (a.author_name && a.author_name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = filterCategory === "ALL" || a.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  // News Actions
  const handleOpenCreate = () => {
    setFormData({
      title: "",
      category: "Certification",
      read_time: "5 min read",
      author_name: "Dr. Elena Rostova",
      author_role: "Chief Water Engineer",
      summary: "Short preview summary of the research article...",
      content: "Full detailed article content body text...",
    });
    setIsCreateOpen(true);
  };

  const handleOpenEdit = (article: NewsData) => {
    setSelectedArticle(article);
    setFormData({
      title: article.title || "",
      category: article.category || "Certification",
      read_time: article.read_time || "5 min read",
      author_name: article.author_name || "",
      author_role: article.author_role || "",
      summary: article.summary || "",
      content: article.content || "",
    });
    setIsEditOpen(true);
  };

  const handleOpenDelete = (article: NewsData) => {
    setSelectedArticle(article);
    setIsDeleteOpen(true);
  };

  const handleSubmitCreate = (e: React.FormEvent) => {
    e.preventDefault();
    router.post("/admin/news", formData, { onSuccess: () => setIsCreateOpen(false) });
  };

  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedArticle) return;
    router.post(`/admin/news/${selectedArticle.id}/update`, formData, { onSuccess: () => { setIsEditOpen(false); setSelectedArticle(null); } });
  };

  const handleSubmitDelete = () => {
    if (!selectedArticle) return;
    router.post(`/admin/news/${selectedArticle.id}/delete`, {}, { onSuccess: () => { setIsDeleteOpen(false); setSelectedArticle(null); } });
  };

  // Category Actions
  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditingCategory && categoryFormData.id) {
      router.post(`/admin/categories/news/${categoryFormData.id}/update`, {
        name: categoryFormData.name,
      }, {
        onSuccess: () => setCategoryFormData({ id: 0, name: "" }),
      });
    } else {
      router.post("/admin/categories/news", {
        name: categoryFormData.name,
      }, {
        onSuccess: () => setCategoryFormData({ id: 0, name: "" }),
      });
    }
  };

  const handleDeleteCategory = (id: number) => {
    router.post(`/admin/categories/news/${id}/delete`);
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
            placeholder="Search news by title, category, or author..."
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
              {actualCategories.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
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
            <span>Create Article</span>
          </button>
        </div>
      </div>

      {/* 2. NEWS ARTICLES DATA TABLE OR EMPTY STATE */}
      {filteredNews.length === 0 ? (
        <EmptyState
          icon={Newspaper}
          title="No Articles Found"
          description={
            searchQuery
              ? `No news articles matched your search query "${searchQuery}". Try searching with another keyword or category.`
              : "No news articles created yet. Click the 'Create Article' button above to publish one."
          }
          actionLabel={searchQuery ? "Clear Search Filter" : "Create Article"}
          onAction={searchQuery ? () => setSearchQuery("") : handleOpenCreate}
        />
      ) : (
        <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-zinc-600 dark:text-zinc-300">
              <thead className="bg-zinc-50/80 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 font-semibold border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="p-3.5 font-bold">Article Title</th>
                  <th className="p-3.5 font-bold">Category</th>
                  <th className="p-3.5 font-bold">Read Time</th>
                  <th className="p-3.5 font-bold">Author Metadata</th>
                  <th className="p-3.5 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/70 dark:divide-zinc-800/70">
                {filteredNews.map((article) => (
                  <tr key={article.id} className="hover:bg-zinc-50/70 dark:hover:bg-zinc-800/40 transition-colors">
                    <td className="p-3.5 font-bold text-zinc-900 dark:text-white max-w-xs">
                      <div className="flex items-center gap-2">
                        <Newspaper className="h-4 w-4 text-blue-600 shrink-0" />
                        <span className="line-clamp-2">{article.title}</span>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <span className="inline-block px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-[11px] font-medium border border-zinc-200/60 dark:border-zinc-700">
                        {article.category || "General"}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className="inline-flex items-center gap-1 text-zinc-500 font-medium">
                        <Clock className="h-3 w-3 text-zinc-400" />
                        {article.read_time || "5 min read"}
                      </span>
                    </td>
                    <td className="p-3.5">
                      {article.author_name ? (
                        <div>
                          <div className="font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-1">
                            <User className="h-3 w-3 text-zinc-400" />
                            {article.author_name}
                          </div>
                          <div className="text-[11px] text-zinc-400 font-normal">{article.author_role}</div>
                        </div>
                      ) : (
                        <span className="text-zinc-400 italic text-[11px]">EcoReve Team</span>
                      )}
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(article)}
                          className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-all cursor-pointer"
                          title="Edit Article"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(article)}
                          className="p-1.5 rounded-lg border border-rose-200 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 transition-all cursor-pointer"
                          title="Delete Article"
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
          <div className="w-full max-w-xl bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[85vh] flex flex-col">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between shrink-0">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <FolderPlus className="h-5 w-5 text-blue-600" />
                News Categories Manager
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
                  {isEditingCategory ? "Edit News Category" : "Add New News Category"}
                </h4>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={categoryFormData.name}
                    onChange={(e) => setCategoryFormData({ ...categoryFormData, name: e.target.value })}
                    placeholder="Category Name (e.g. Environmental Policy)"
                    className="flex-1 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                  {isEditingCategory && (
                    <button
                      type="button"
                      onClick={() => { setIsEditingCategory(false); setCategoryFormData({ id: 0, name: "" }); }}
                      className="px-3 py-1 rounded-lg border border-zinc-200 text-xs font-semibold text-zinc-600 hover:bg-zinc-100"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-3.5 py-1 rounded-lg bg-[#005883] hover:bg-[#003853] text-white text-xs font-bold shadow-xs"
                  >
                    {isEditingCategory ? "Update" : "Add"}
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
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200/70 dark:divide-zinc-800/70">
                    {actualCategories.map((cat) => (
                      <tr key={cat.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                        <td className="p-3 font-mono text-zinc-400">#{cat.id}</td>
                        <td className="p-3 font-bold text-zinc-900 dark:text-white">{cat.name}</td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => { setIsEditingCategory(true); setCategoryFormData({ id: cat.id, name: cat.name }); }}
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

      {/* 4. CREATE ARTICLE MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between sticky top-0 bg-white dark:bg-zinc-900 z-10">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Plus className="h-5 w-5 text-blue-600" />
                Create News Article
              </h3>
              <button onClick={() => setIsCreateOpen(false)} className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitCreate} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Article Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Next-Gen Ceramic Membrane Water Filtration"
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
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Read Time</label>
                  <input
                    type="text"
                    value={formData.read_time}
                    onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Author Name</label>
                  <input
                    type="text"
                    value={formData.author_name}
                    onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Author Role</label>
                  <input
                    type="text"
                    value={formData.author_role}
                    onChange={(e) => setFormData({ ...formData, author_role: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Short Summary Preview</label>
                <textarea
                  rows={2}
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Full Article Content</label>
                <textarea
                  rows={4}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-end gap-3">
                <button type="button" onClick={() => setIsCreateOpen(false)} className="px-4 py-2 rounded-xl border text-xs font-semibold text-zinc-600">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold">Publish Article</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. EDIT ARTICLE MODAL */}
      {isEditOpen && selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between sticky top-0 bg-white dark:bg-zinc-900 z-10">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Edit className="h-5 w-5 text-blue-600" />
                Edit Article (#{selectedArticle.id})
              </h3>
              <button onClick={() => setIsEditOpen(false)} className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitEdit} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Article Title</label>
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
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Read Time</label>
                  <input
                    type="text"
                    value={formData.read_time}
                    onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Author Name</label>
                  <input
                    type="text"
                    value={formData.author_name}
                    onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Author Role</label>
                  <input
                    type="text"
                    value={formData.author_role}
                    onChange={(e) => setFormData({ ...formData, author_role: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Short Summary Preview</label>
                <textarea
                  rows={2}
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Full Article Content</label>
                <textarea
                  rows={4}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-end gap-3">
                <button type="button" onClick={() => setIsEditOpen(false)} className="px-4 py-2 rounded-xl border text-xs font-semibold text-zinc-600">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold">Update Article</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. DELETE CONFIRMATION MODAL */}
      {isDeleteOpen && selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden p-6 space-y-4 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="p-3 rounded-full bg-rose-50 dark:bg-rose-950/40">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">Delete News Article</h3>
                <p className="text-xs text-zinc-500">Are you sure you want to remove this article?</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200">
              "{selectedArticle.title}"
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
