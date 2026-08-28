import React, { useState } from "react";
import { AdminSidebar, AdminTab } from "./AdminSidebar";
import { AdminHeader, BreadcrumbItem } from "./AdminHeader";
import { X } from "lucide-react";
import { Toaster } from "@/Components/ui/sonner";

interface AdminLayoutProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  breadcrumbs?: BreadcrumbItem[];
  children: React.ReactNode;
  onQuickCreate?: () => void;
  authAdmin?: any;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  activeTab,
  setActiveTab,
  breadcrumbs,
  children,
  onQuickCreate,
  authAdmin,
}) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleSelectTab = (tab: AdminTab) => {
    setActiveTab(tab);
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-zinc-950 flex font-sans antialiased text-zinc-900 dark:text-zinc-100 overflow-hidden relative">
      
      {/* 1. Desktop Fixed Sidebar */}
      <div className="hidden lg:block shrink-0">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} authAdmin={authAdmin} />
      </div>

      {/* 2. Mobile Slide-Over Sidebar Drawer */}
      {isMobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex animate-in fade-in duration-200">
          <div className="w-80 max-w-[85vw] bg-white dark:bg-zinc-900 h-full shadow-2xl flex flex-col relative animate-in slide-in-from-left duration-200 border-r border-zinc-200 dark:border-zinc-800 overflow-hidden">
            {/* Clean Floating Close Button */}
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="absolute right-3.5 top-3.5 z-20 p-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 text-zinc-500 hover:text-zinc-900 dark:hover:text-white cursor-pointer shadow-xs border border-zinc-200/60 dark:border-zinc-700/50"
              title="Close Menu"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="h-full overflow-y-auto w-full">
              <AdminSidebar activeTab={activeTab} setActiveTab={handleSelectTab} authAdmin={authAdmin} />
            </div>
          </div>
          <div className="flex-1" onClick={() => setIsMobileSidebarOpen(false)} />
        </div>
      )}

      {/* 3. Main Content Container */}
      <main className="flex-1 flex flex-col min-w-0 bg-white dark:bg-zinc-950 overflow-y-auto">
        {/* Top Header */}
        <AdminHeader
          title={activeTab}
          breadcrumbs={breadcrumbs}
          onQuickCreate={onQuickCreate}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        />

        {/* Dynamic Body Content */}
        <div className="px-3 sm:px-4 lg:px-6 py-6 w-full max-w-full flex-1">
          {children}
        </div>
      </main>

      <Toaster />
    </div>
  );
};
