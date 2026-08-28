import React, { useState, useEffect, useRef } from "react";
import { Link, router } from "@inertiajs/react";
import {
  Plus,
  Search,
  Newspaper,
  Clock,
  User,
  Edit,
  Edit3,
  Trash2,
  Filter,
  X,
  AlertTriangle,
  FolderPlus,
  ArrowUp,
  ArrowDown,
  ChevronDown,
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
import { ImageViewerModal } from "../media/ImageViewerModal";
import { DataTable } from "@/Components/ui/data-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";

export interface NewsCategoryData {
  id: number;
  name: string;
  slug?: string;
}

export interface NewsData {
  id: number;
  title: any;
  category?: any;
  read_time?: any;
  author_name?: string;
  author_role?: any;
  author_avatar?: string;
  image_url?: string;
  summary?: any;
  content?: any;
  table_of_contents?: any;
  is_featured?: boolean;
  published_at?: string;
  created_at?: string;
}

interface NewsAdminViewProps {
  news?: NewsData[];
  newsCategories?: NewsCategoryData[];
  newsPagination?: CursorPaginationData | null;
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

export const NewsAdminView: React.FC<NewsAdminViewProps> = ({
  news = [],
  newsCategories = [],
  newsPagination = null,
  filters = {},
}) => {
  const [searchQuery, setSearchQuery] = useState(filters?.search || "");
  const [sortDir, setSortDir] = useState<"asc" | "desc">(filters?.sort_dir || "desc");
  const [filterCategory, setFilterCategory] = useState<string>("ALL");
  const [isFetching, setIsFetching] = useState(false);

  // Debounced Search Reference
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // News Modals
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [previewImageData, setPreviewImageData] = useState<{ isOpen: boolean; url: string; title: string }>({
    isOpen: false,
    url: "",
    title: "",
  });

  // News Category Modal State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categoryFormData, setCategoryFormData] = useState({ id: 0, name: "" });
  const [isEditingCategory, setIsEditingCategory] = useState(false);

  // Form State for News
  const [selectedArticle, setSelectedArticle] = useState<NewsData | null>(null);

  // Auto-reset fetching state when Inertia finishes updating props
  useEffect(() => {
    setIsFetching(false);
  }, [news, newsPagination]);

  const actualCategories = newsCategories || [];
  const actualNews = news || [];

  // Filter news articles by Search & Category (Safe string checks)
  const filteredNews = actualNews.filter((a) => {
    if (!a) return false;
    const title = getTrans(a.title, "en");
    const cat = getTrans(a.category, "en");
    const author = a.author_name || "";
    const query = searchQuery.toLowerCase();

    const matchesSearch =
      title.toLowerCase().includes(query) ||
      cat.toLowerCase().includes(query) ||
      author.toLowerCase().includes(query);

    const matchesCategory = filterCategory === "ALL" || cat === filterCategory;

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
        { tab: "news", search: val, sort_dir: sortDir },
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
      { tab: "news", sort_dir: nextDir, search: searchQuery },
      {
        preserveState: true,
        preserveScroll: true,
        onFinish: () => setIsFetching(false),
      }
    );
  };

  const handleOpenDelete = (article: NewsData) => {
    setSelectedArticle(article);
    setIsDeleteOpen(true);
  };

  const handleSubmitDelete = () => {
    if (!selectedArticle) return;
    router.post(`/admin/news/${selectedArticle.id}/delete`, {}, {
      onSuccess: () => {
        setIsDeleteOpen(false);
        setSelectedArticle(null);
        toast.success("News article deleted successfully!");
      },
      onError: () => toast.error("Failed to delete news article."),
    });
  };

  // Category Actions
  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditingCategory && categoryFormData.id) {
      router.post(`/admin/categories/news/${categoryFormData.id}/update`, {
        name: categoryFormData.name,
      }, {
        onSuccess: () => {
          setCategoryFormData({ id: 0, name: "" });
          setIsEditingCategory(false);
          toast.success("News category updated successfully!");
        },
      });
    } else {
      router.post("/admin/categories/news", {
        name: categoryFormData.name,
      }, {
        onSuccess: () => {
          setCategoryFormData({ id: 0, name: "" });
          toast.success("New news category added!");
        },
      });
    }
  };

  const handleDeleteCategory = (id: number) => {
    router.post(`/admin/categories/news/${id}/delete`, {}, {
      onSuccess: () => toast.success("News category removed!"),
    });
  };

  return (
    <div className="space-y-4 font-sans">
      
      {/* 1. GAMBAR 2 REFERENCE: TOP CATEGORY NAVIGATION TABS BAR */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-6 min-w-max pb-2 pt-0.5">
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
            <span>All Articles</span>
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
      </div>

      {/* 2. GAMBAR 2 REFERENCE: BOTTOM SEARCH & ACTION CONTROL BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-2">
        {/* Left Side: Active Filter Pill Badge */}
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
              Showing all articles
            </div>
          )}
        </div>

        {/* Right Side: Search Input, Manage Folders, & Primary Add Button */}
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
            href="/admin/news/create"
            className="inline-flex items-center gap-1.5 h-8.5 px-4 rounded-xl bg-[#005883] hover:bg-[#003853] text-white text-xs font-bold shadow-2xs transition-all cursor-pointer whitespace-nowrap shrink-0 ml-auto sm:ml-0"
          >
            <Plus className="h-3.5 w-3.5 shrink-0" />
            <span>Create Article</span>
          </Link>
        </div>
      </div>

      {/* 2. NEWS DATA TABLE OR EMPTY STATE */}
      {filteredNews.length === 0 && !isFetching ? (
        <EmptyState
          icon={Newspaper}
          title="No News Articles Found"
          description={
            searchQuery
              ? `No articles matched your search query "${searchQuery}". Try searching with another keyword.`
              : "No articles available in the news database. Click 'Add New Article' to create one."
          }
          actionLabel={searchQuery ? "Clear Search Filter" : "Add New Article"}
          onAction={searchQuery ? () => setSearchQuery("") : () => router.get("/admin/news/create")}
        />
      ) : isFetching ? (
        <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-2xs overflow-hidden p-4">
          <AdminTableSkeleton columnsCount={6} rowsCount={6} />
        </div>
      ) : (
        <DataTable<NewsData, any>
          data={filteredNews}
          pagination={newsPagination}
          isFetching={isFetching}
          onNavigate={() => setIsFetching(true)}
          onFinish={() => setIsFetching(false)}
          onBatchDelete={(rows) => {
            toast.success(`Batch action: Selected ${rows.length} article(s) for bulk operations.`);
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
                const imgPath = row.original.image_url || "/assets/news/1.webp";
                const articleTitle = getTrans(row.original.title, "en") || "Article Cover";
                return (
                  <button
                    type="button"
                    onClick={() => setPreviewImageData({ isOpen: true, url: imgPath, title: articleTitle })}
                    className="h-10 w-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 overflow-hidden shrink-0 transition-transform hover:scale-105 active:scale-95 cursor-pointer block relative group shadow-2xs"
                    title="Click to view article cover image"
                  >
                    <img
                      src={imgPath}
                      alt={articleTitle}
                      className="h-full w-full object-cover"
                    />
                  </button>
                );
              },
            },
            {
              id: "article_title",
              header: "Article Title",
              cell: ({ row }) => (
                <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white">
                  <Newspaper className="h-4 w-4 text-[#005883] dark:text-sky-400 shrink-0" />
                  <span className="line-clamp-2">{getTrans(row.original.title, "en")}</span>
                </div>
              ),
            },
            {
              id: "category",
              header: "Category",
              cell: ({ row }) => (
                <span className="inline-block px-3 py-1 rounded-full bg-[#005883]/10 text-[#005883] dark:bg-sky-950/50 dark:text-sky-300 text-[11px] font-bold border border-[#005883]/20">
                  {getTrans(row.original.category, "en") || "General"}
                </span>
              ),
            },
            {
              id: "read_time",
              header: "Read Time",
              cell: ({ row }) => (
                <span className="inline-flex items-center gap-1 text-zinc-500 font-medium">
                  <Clock className="h-3 w-3 text-zinc-400" />
                  {getTrans(row.original.read_time, "en") || "5 min read"}
                </span>
              ),
            },
            {
              id: "author",
              header: "Author Metadata",
              cell: ({ row }) =>
                row.original.author_name ? (
                  <div>
                    <div className="font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-1">
                      <User className="h-3 w-3 text-zinc-400" />
                      {getTrans(row.original.author_name, "en")}
                    </div>
                    <div className="text-[11px] text-zinc-400 font-normal">{getTrans(row.original.author_role, "en")}</div>
                  </div>
                ) : (
                  <span className="text-zinc-400 italic text-[11px]">EcoReve Team</span>
                ),
            },
            {
              id: "actions",
              header: () => <div className="text-right">Actions</div>,
              cell: ({ row }) => (
                <div className="flex items-center justify-end gap-1.5">
                  <button
                    onClick={() => router.get(`/admin/news/${row.original.id}/edit`)}
                    className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
                    title="Edit Article"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleOpenDelete(row.original)}
                    className="p-1.5 rounded-lg border border-rose-200 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 transition-colors cursor-pointer"
                    title="Delete Article"
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
                        <td className="p-3 font-bold text-zinc-900 dark:text-white">{getTrans(cat.name, "en")}</td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => { setIsEditingCategory(true); setCategoryFormData({ id: cat.id, name: getTrans(cat.name, "en") }); }}
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

      {/* 4. DELETE CONFIRMATION MODAL */}
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

      {/* 5. SHADCN UI IMAGE VIEWER PREVIEW MODAL */}
      <ImageViewerModal
        isOpen={previewImageData.isOpen}
        onClose={() => setPreviewImageData({ isOpen: false, url: "", title: "" })}
        imageUrl={previewImageData.url}
        title={previewImageData.title}
      />

    </div>
  );
};
