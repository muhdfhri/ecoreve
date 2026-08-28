import React, { useState, useRef, useEffect } from "react";
import { router } from "@inertiajs/react";
import {
  LayoutDashboard,
  Package,
  Wrench,
  Inbox,
  HelpCircle,
  Building2,
  Newspaper,
  UserCheck,
  Settings,
  Search,
  MoreHorizontal,
  LogOut,
  User,
  ShieldCheck,
} from "lucide-react";

export type AdminTab =
  | "Overview"
  | "Products"
  | "Services"
  | "Inquiries"
  | "FAQs"
  | "Offices"
  | "News"
  | "Users";

interface AdminSidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  authAdmin?: {
    name?: string;
    email?: string;
    avatar_url?: string;
  };
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  setActiveTab,
  authAdmin = {
    name: "EcoReve Admin",
    email: "admin@ecoreve.com",
    avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
  },
}) => {
  const userName = authAdmin?.name || "EcoReve Admin";
  const userEmail = authAdmin?.email || "admin@ecoreve.com";
  const userAvatar = authAdmin?.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80";

  // User Dropdown State & Ref
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout Handler
  const handleLogout = () => {
    setIsUserMenuOpen(false);
    router.post("/admin/logout", {}, {
      onSuccess: () => {
        toast.info("Signed out successfully", {
          description: "Your session has been terminated.",
        });
      },
    });
  };

  return (
    <aside className="w-full lg:w-64 lg:border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col justify-between p-4 h-full shrink-0 font-sans relative">
      <div className="space-y-6">
        
        {/* Brand Header */}
        <div className="flex items-center gap-2.5 px-2 py-1">
          <img
            src="/logo.webp"
            alt="EcoReve Logo"
            className="h-7 w-auto object-contain shrink-0"
          />
          <span className="font-extrabold text-base tracking-tight text-zinc-900 dark:text-white">
            EcoReve
          </span>
        </div>

        {/* Nav Group 1: Main Platform */}
        <div className="space-y-1">
          <p className="px-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Main Platform
          </p>

          <button
            onClick={() => router.get("/admin?tab=Overview")}
            className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "Overview"
                ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
            }`}
          >
            <LayoutDashboard className="h-4 w-4 text-zinc-500" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => router.get("/admin?tab=products")}
            className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "Products" || activeTab === "products"
                ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
            }`}
          >
            <Package className="h-4 w-4 text-zinc-500" />
            <span>Products Catalog</span>
          </button>

          <button
            onClick={() => router.get("/admin?tab=services")}
            className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "Services" || activeTab === "services"
                ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
            }`}
          >
            <Wrench className="h-4 w-4 text-zinc-500" />
            <span>Services & Solutions</span>
          </button>

          <button
            onClick={() => router.get("/admin?tab=Inquiries")}
            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "Inquiries"
                ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
            }`}
          >
            <div className="flex items-center gap-3">
              <Inbox className="h-4 w-4 text-zinc-500" />
              <span>Inquiries CRM</span>
            </div>
            <span className="px-1.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#005883] dark:text-blue-400 text-[10px] font-bold">
              New
            </span>
          </button>
        </div>

        {/* Nav Group 2: Management */}
        <div className="space-y-1">
          <p className="px-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Management
          </p>

          <button
            onClick={() => router.get("/admin?tab=FAQs")}
            className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "FAQs"
                ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
            }`}
          >
            <HelpCircle className="h-4 w-4 text-zinc-500" />
            <span>FAQs & Support</span>
          </button>

          <button
            onClick={() => router.get("/admin?tab=Offices")}
            className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "Offices"
                ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
            }`}
          >
            <Building2 className="h-4 w-4 text-zinc-500" />
            <span>Offices & Locations</span>
          </button>

          <button
            onClick={() => router.get("/admin?tab=news")}
            className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "News" || activeTab === "news"
                ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
            }`}
          >
            <Newspaper className="h-4 w-4 text-zinc-500" />
            <span>News & Articles</span>
          </button>

          <button
            onClick={() => router.get("/admin?tab=Users")}
            className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "Users"
                ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
            }`}
          >
            <UserCheck className="h-4 w-4 text-zinc-500" />
            <span>Users & Access</span>
          </button>
        </div>

      </div>

      {/* Sidebar User Profile Card */}
      <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 relative" ref={userMenuRef}>

        {/* User Profile Card (Dynamic Auth User) */}
        <div className="flex items-center justify-between gap-3 p-2 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 relative">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <img
              src={userAvatar}
              alt={userName}
              className="h-8 w-8 rounded-full object-cover shrink-0 border border-zinc-200/60 dark:border-zinc-800"
            />
            <div className="flex flex-col truncate">
              <span className="text-xs font-bold text-zinc-900 dark:text-white truncate">{userName}</span>
              <span className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">{userEmail}</span>
            </div>
          </div>
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
              isUserMenuOpen
                ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-300 dark:border-zinc-700 shadow-xs"
                : "border-zinc-200/80 dark:border-zinc-800 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-200/60 dark:hover:bg-zinc-800"
            }`}
            title="Account Options"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>

        {/* Animated Popover Dropdown Menu for Logout */}
        {isUserMenuOpen && (
          <div className="absolute bottom-16 right-0 left-0 z-50 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl p-2 space-y-1 animate-in fade-in zoom-in-95 duration-150">
            {/* User Info Header */}
            <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700/60 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-zinc-900 dark:text-white">{userName}</div>
                <div className="text-[10px] text-zinc-400">{userEmail}</div>
              </div>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/50 text-[#005883] dark:text-blue-400 text-[10px] font-bold">
                <ShieldCheck className="h-3 w-3" />
                Admin
              </span>
            </div>

            <div className="py-1">
              <button
                onClick={() => { setIsUserMenuOpen(false); setActiveTab("Users"); }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <User className="h-4 w-4 text-zinc-500" />
                <span>Account Profile</span>
              </button>
            </div>

            <div className="pt-1 border-t border-zinc-200/80 dark:border-zinc-800">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all cursor-pointer group"
              >
                <LogOut className="h-4 w-4 text-rose-500 group-hover:scale-110 transition-transform" />
                <span>Sign Out / Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>

    </aside>
  );
};

