import React from "react";
import { Plus, Menu } from "lucide-react";

interface AdminHeaderProps {
  title: string;
  onQuickCreate?: () => void;
  onToggleMobileSidebar?: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  title,
  onQuickCreate,
  onToggleMobileSidebar,
}) => {
  return (
    <header className="h-16 px-4 sm:px-8 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-white dark:bg-zinc-900 shrink-0 font-sans">
      <div className="flex items-center gap-3">
        {/* Mobile Sidebar Hamburger Toggle */}
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
          title="Open Navigation Menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <h1 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
          {title}
        </h1>
      </div>

      {/* Quick Create Action Button */}
      <button
        onClick={onQuickCreate}
        className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl bg-[#005883] hover:bg-[#003853] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
        title="Open Command Palette (Ctrl+K)"
      >
        <Plus className="h-4 w-4" />
        <span className="hidden sm:inline">Quick Create</span>
        <span className="sm:hidden">Create</span>
        <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded-md bg-white/20 text-white font-mono text-[10px] font-bold border border-white/30 ml-1">
          Ctrl K
        </kbd>
      </button>
    </header>
  );
};
