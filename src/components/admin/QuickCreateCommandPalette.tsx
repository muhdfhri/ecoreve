import React, { useState, useEffect } from "react";
import {
  Search,
  Moon,
  Sun,
  Sparkles,
  Package,
  Wrench,
  Newspaper,
  Building2,
  UserCheck,
  LayoutDashboard,
  Inbox,
  HelpCircle,
  X,
} from "lucide-react";
import { AdminTab } from "./layout/AdminSidebar";

interface QuickCreateCommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  setActiveTab: (tab: AdminTab) => void;
  onOpenCreateProduct?: () => void;
  onOpenCreateService?: () => void;
  onOpenCreateNews?: () => void;
  onOpenCreateOffice?: () => void;
  onOpenCreateUser?: () => void;
}

export const QuickCreateCommandPalette: React.FC<QuickCreateCommandPaletteProps> = ({
  isOpen,
  onClose,
  setActiveTab,
  onOpenCreateProduct,
  onOpenCreateService,
  onOpenCreateNews,
  onOpenCreateOffice,
  onOpenCreateUser,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  // Handle Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open trigger handled by parent or state
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter Categories
  const categories = ["All", "Quick Create", "Navigation", "System", "Tools"];

  // Command items
  const favorites = [
    {
      id: "toggle-theme",
      title: "Toggle Dark / Light Theme",
      subtitle: "Switch appearance theme",
      category: "System",
      icon: Moon,
      shortcut: "Alt+T",
      action: () => {
        document.documentElement.classList.toggle("dark");
        onClose();
      },
    },
    {
      id: "ask-ai",
      title: "Ask AI Assistant",
      subtitle: "Get instant AI water treatment insights",
      category: "Tools",
      icon: Sparkles,
      shortcut: "Alt+Q",
      action: () => {
        alert("EcoReve AI Assistant activated!");
        onClose();
      },
    },
  ];

  const commands = [
    // Quick Create Actions
    {
      id: "create-product",
      title: "Create Product",
      subtitle: "Add new water equipment to catalog",
      category: "Quick Create",
      icon: Package,
      shortcut: "Alt+P",
      action: () => {
        setActiveTab("Products");
        if (onOpenCreateProduct) onOpenCreateProduct();
        onClose();
      },
    },
    {
      id: "create-service",
      title: "Create Service Solution",
      subtitle: "Add new engineering service package",
      category: "Quick Create",
      icon: Wrench,
      shortcut: "Alt+S",
      action: () => {
        setActiveTab("Services");
        if (onOpenCreateService) onOpenCreateService();
        onClose();
      },
    },
    {
      id: "create-news",
      title: "Publish News Article",
      subtitle: "Post whitepaper or research news",
      category: "Quick Create",
      icon: Newspaper,
      shortcut: "Alt+N",
      action: () => {
        setActiveTab("News");
        if (onOpenCreateNews) onOpenCreateNews();
        onClose();
      },
    },
    {
      id: "create-office",
      title: "Add Office Location",
      subtitle: "Add new global entity or office",
      category: "Quick Create",
      icon: Building2,
      shortcut: "Alt+O",
      action: () => {
        setActiveTab("Offices");
        if (onOpenCreateOffice) onOpenCreateOffice();
        onClose();
      },
    },
    {
      id: "create-user",
      title: "Add Admin User",
      subtitle: "Grant admin panel access to user",
      category: "Quick Create",
      icon: UserCheck,
      shortcut: "Alt+U",
      action: () => {
        setActiveTab("Users");
        if (onOpenCreateUser) onOpenCreateUser();
        onClose();
      },
    },

    // Navigation Actions
    {
      id: "go-overview",
      title: "Go to Overview",
      subtitle: "View main metrics and analytics dashboard",
      category: "Navigation",
      icon: LayoutDashboard,
      shortcut: "Alt+1",
      action: () => {
        setActiveTab("Overview");
        onClose();
      },
    },
    {
      id: "go-products",
      title: "Go to Products Catalog",
      subtitle: "Manage products and equipment",
      category: "Navigation",
      icon: Package,
      shortcut: "Alt+2",
      action: () => {
        setActiveTab("Products");
        onClose();
      },
    },
    {
      id: "go-services",
      title: "Go to Services & Solutions",
      subtitle: "Manage turnkey services",
      category: "Navigation",
      icon: Wrench,
      shortcut: "Alt+3",
      action: () => {
        setActiveTab("Services");
        onClose();
      },
    },
    {
      id: "go-inquiries",
      title: "Go to Inquiries CRM",
      subtitle: "Review incoming client messages",
      category: "Navigation",
      icon: Inbox,
      shortcut: "Alt+4",
      action: () => {
        setActiveTab("Inquiries");
        onClose();
      },
    },
    {
      id: "go-faqs",
      title: "Go to FAQs & Support",
      subtitle: "Manage customer knowledgebase",
      category: "Navigation",
      icon: HelpCircle,
      shortcut: "Alt+5",
      action: () => {
        setActiveTab("FAQs");
        onClose();
      },
    },
  ];

  // Filtering Logic
  const filteredFavorites = favorites.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeFilter === "All" || item.category === activeFilter;
    return matchesSearch && matchesCategory;
  });

  const filteredCommands = commands.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeFilter === "All" || item.category === activeFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-start justify-center pt-20 px-4 font-sans">
      <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[80vh]">
        
        {/* 1. SEARCH BAR HEADER */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 flex-1">
            <Search className="h-5 w-5 text-zinc-400 shrink-0" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search commands or type / to filter..."
              className="w-full bg-transparent text-sm font-medium text-zinc-900 dark:text-white focus:outline-none placeholder:text-zinc-400"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 text-[11px] text-zinc-400 font-medium bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-lg">
              <span>Ask AI</span>
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 font-mono text-[10px] shadow-xs">
                Tab
              </kbd>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* 2. CATEGORY FILTER PILLS */}
        <div className="px-4 py-2.5 border-b border-zinc-100 dark:border-zinc-800/80 flex items-center gap-1.5 overflow-x-auto shrink-0 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-[#005883] text-white shadow-xs"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* 3. COMMAND ITEMS LIST BODY */}
        <div className="p-3 space-y-4 overflow-y-auto flex-1 text-xs">
          
          {/* Favorites Group */}
          {filteredFavorites.length > 0 && (
            <div className="space-y-1">
              <div className="px-2 py-1 flex items-center justify-between text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                <span>Favorites</span>
                <span>{filteredFavorites.length} items</span>
              </div>
              {filteredFavorites.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 group-hover:bg-[#005883] group-hover:text-white transition-colors">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                          <span>{item.title}</span>
                          <span className="text-[10px] font-normal text-zinc-400">{item.category}</span>
                        </div>
                        <div className="text-[11px] text-zinc-500 font-normal">{item.subtitle}</div>
                      </div>
                    </div>
                    <kbd className="px-2 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono text-[10px] font-bold text-zinc-500">
                      {item.shortcut}
                    </kbd>
                  </button>
                );
              })}
            </div>
          )}

          {/* All Commands Group */}
          {filteredCommands.length > 0 && (
            <div className="space-y-1">
              <div className="px-2 py-1 flex items-center justify-between text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                <span>All Commands & Quick Actions</span>
                <span>{filteredCommands.length} items</span>
              </div>
              {filteredCommands.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 group-hover:bg-[#005883] group-hover:text-white transition-colors">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-bold text-zinc-900 dark:text-white">{item.title}</div>
                        <div className="text-[11px] text-zinc-500 font-normal">{item.subtitle}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-zinc-400 font-medium">{item.category}</span>
                      <kbd className="px-2 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono text-[10px] font-bold text-zinc-500">
                        {item.shortcut}
                      </kbd>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

        </div>

        {/* 4. FOOTER SHORTCUT HINTS */}
        <div className="px-4 py-3 bg-zinc-50/80 dark:bg-zinc-800/50 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400 font-medium shrink-0">
          <div className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 font-mono text-[10px] text-zinc-600 dark:text-zinc-300 shadow-xs">
              ⌘ + K
            </kbd>
            <span>Command Palette</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <span>Navigate</span>
              <kbd className="px-1 py-0.5 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 font-mono text-[10px] text-zinc-600 dark:text-zinc-300">
                ↑
              </kbd>
              <kbd className="px-1 py-0.5 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 font-mono text-[10px] text-zinc-600 dark:text-zinc-300">
                ↓
              </kbd>
            </div>
            <span>|</span>
            <div className="flex items-center gap-1">
              <span>Execute</span>
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 font-mono text-[10px] text-zinc-600 dark:text-zinc-300">
                ↵
              </kbd>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
