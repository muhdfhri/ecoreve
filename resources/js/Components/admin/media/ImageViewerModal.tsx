import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";

interface ImageViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title?: string;
}

export const ImageViewerModal: React.FC<ImageViewerModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  title = "Media Asset Preview",
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 overflow-hidden shadow-2xl duration-75 transition-all">
        <DialogHeader className="pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <DialogTitle className="text-base font-bold text-zinc-900 dark:text-white truncate">
            {title || "Media Asset Preview"}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 flex items-center justify-center rounded-xl bg-zinc-900/5 dark:bg-zinc-950 p-2 border border-zinc-200/60 dark:border-zinc-800/80 min-h-[200px] max-h-[70vh] overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title || "Preview"}
              loading="eager"
              decoding="async"
              className="max-h-[60vh] w-auto max-w-full object-contain rounded-lg shadow-sm"
            />
          ) : (
            <div className="h-48 flex items-center justify-center text-xs text-zinc-400">Loading image...</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
