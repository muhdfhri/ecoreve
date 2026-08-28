import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface AdminTableSkeletonProps {
  columnsCount?: number;
  rowsCount?: number;
}

export const AdminTableSkeleton: React.FC<AdminTableSkeletonProps> = ({
  columnsCount = 6,
  rowsCount = 6,
}) => {
  return (
    <tbody className="divide-y divide-zinc-200/70 dark:divide-zinc-800/70 animate-pulse">
      {Array.from({ length: rowsCount }).map((_, rIdx) => (
        <tr key={rIdx} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20">
          {Array.from({ length: columnsCount }).map((_, cIdx) => (
            <td key={cIdx} className="p-3.5">
              <Skeleton className={`h-5 rounded-lg bg-zinc-200/80 dark:bg-zinc-800 ${
                cIdx === 0 ? "w-10" : cIdx === 1 ? "w-48" : "w-28"
              }`} />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
