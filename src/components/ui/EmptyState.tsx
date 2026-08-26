import React from "react";
import { Inbox, LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = Inbox,
  title = "No Data Available",
  description = "There are currently no records found in the system. Check back later or create a new record.",
  actionLabel,
  onAction,
  className = "",
}) => {
  return (
    <div
      className={`p-12 text-center rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs flex flex-col items-center justify-center space-y-4 font-sans ${className}`}
    >
      {/* Icon Circle */}
      <div className="h-14 w-14 rounded-2xl bg-[#005883]/10 dark:bg-zinc-800/80 text-zinc-500 dark:text-zinc-400 flex items-center justify-center shadow-xs border border-[#005883]/20 dark:border-zinc-700/50">
        <Icon className="h-7 w-7 text-[#005883] dark:text-blue-400" />
      </div>

      {/* Text Info */}
      <div className="max-w-md space-y-1">
        <h3 className="text-base font-bold text-zinc-900 dark:text-white tracking-tight">
          {title}
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Optional Action Button */}
      {actionLabel && onAction && (
        <div className="pt-2">
          <button
            onClick={onAction}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#005883] hover:bg-[#003853] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
          >
            {actionLabel}
          </button>
        </div>
      )}
    </div>
  );
};
