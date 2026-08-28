import React, { useState } from "react";
import { Image as ImageIcon, Trash2, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MediaPickerModal, MediaItem } from "./MediaPickerModal";

interface ImageSelectorInputProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  modalTitle?: string;
}

export const ImageSelectorInput: React.FC<ImageSelectorInputProps> = ({
  value,
  onChange,
  label = "Product Image",
  modalTitle = "Select Image Asset",
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className="space-y-2">
      {label && <label className="text-xs font-bold text-foreground block">{label}</label>}

      <div className="flex items-start gap-4 p-3 rounded-2xl border border-border/80 bg-card/60">
        {/* Preview Container */}
        <div className="h-24 w-24 rounded-xl border border-border/80 bg-secondary/30 overflow-hidden shrink-0 flex items-center justify-center relative group">
          {value ? (
            <img
              src={value}
              alt="Preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-muted-foreground p-2 text-center">
              <ImageIcon className="h-6 w-6 stroke-[1.5] opacity-50" />
              <span className="text-[10px] mt-1">No image set</span>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="space-y-2 flex-1 pt-1">
          <p className="text-xs text-muted-foreground">
            {value
              ? "Image selected from media library."
              : "Select an image from the media library or upload a new file."}
          </p>

          <div className="flex items-center gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsModalOpen(true)}
              className="h-8 text-xs rounded-xl border-border/80 gap-1.5 hover:bg-[#005883]/10 hover:text-[#005883] dark:hover:text-sky-400 cursor-pointer"
            >
              <FolderOpen className="h-3.5 w-3.5" />
              Select from Media Library
            </Button>

            {value && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onChange("")}
                className="h-8 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl gap-1 cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Remove
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* MEDIA PICKER MODAL */}
      <MediaPickerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectImage={(url: string) => onChange(url)}
        title={modalTitle}
      />
    </div>
  );
};
