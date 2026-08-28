import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  X,
  Upload,
  Image as ImageIcon,
  Search,
  Check,
  Trash2,
  RefreshCw,
  Loader2,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface MediaItem {
  id: number;
  filename: string;
  original_name: string;
  file_path: string;
  file_size: string;
  mime_type: string;
  dimensions?: string;
  alt_text?: string;
  created_at: string;
}

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (mediaUrl: string, mediaItem?: MediaItem) => void;
  title?: string;
}

export const MediaPickerModal: React.FC<MediaPickerModalProps> = ({
  isOpen,
  onClose,
  onSelectImage,
  title = "Select Media Asset",
}) => {
  const [activeTab, setActiveTab] = useState<"upload" | "library">("library");
  const [activeFolder, setActiveFolder] = useState<"all" | "products" | "news">("all");
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [altText, setAltText] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      fetchMedia();
    }
  }, [isOpen, activeFolder]);

  const fetchMedia = async (search = searchQuery, folder = activeFolder) => {
    setIsLoading(true);
    try {
      const response = await axios.get("/admin/api/media", {
        params: { search, mime_type: "image", folder: folder !== "all" ? folder : undefined },
      });
      const items = response.data.data || [];
      setMediaList(items);
      if (items.length > 0 && !selectedItem) {
        setSelectedItem(items[0]);
        setAltText(items[0].alt_text || "");
      }
    } catch (error) {
      console.error("Failed to load media library:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    fetchMedia(val);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const response = await axios.post("/admin/api/media", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percent);
          }
        },
      });

      const newMedia: MediaItem = response.data.data;
      setMediaList((prev) => [newMedia, ...prev]);
      setSelectedItem(newMedia);
      setAltText(newMedia.alt_text || "");
      setActiveTab("library");
    } catch (error) {
      console.error("Failed to upload media file:", error);
      alert("Failed to upload image. Please ensure valid file format (JPG, PNG, WEBP) & max 10MB size.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleSelect = (item: MediaItem) => {
    setSelectedItem(item);
    setAltText(item.alt_text || "");
  };

  const handleSaveAltText = async () => {
    if (!selectedItem) return;
    try {
      await axios.put(`/admin/api/media/${selectedItem.id}`, {
        alt_text: altText,
      });
      setMediaList((prev) =>
        prev.map((m) => (m.id === selectedItem.id ? { ...m, alt_text: altText } : m))
      );
      setSelectedItem((prev) => (prev ? { ...prev, alt_text: altText } : null));
    } catch (error) {
      console.error("Failed to update alt text:", error);
    }
  };

  const handleDeletePermanent = async () => {
    if (!selectedItem) return;
    if (
      !confirm(
        `Are you sure you want to permanently delete "${selectedItem.original_name}"?`
      )
    ) {
      return;
    }

    try {
      await axios.delete(`/admin/api/media/${selectedItem.id}`);
      const filtered = mediaList.filter((m) => m.id !== selectedItem.id);
      setMediaList(filtered);
      setSelectedItem(filtered[0] || null);
    } catch (error) {
      console.error("Failed to delete media file:", error);
      alert("Failed to delete media file.");
    }
  };

  const handleConfirmSelect = () => {
    if (!selectedItem) return;
    onSelectImage(selectedItem.file_path, selectedItem);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-card border border-border/80 rounded-2xl shadow-2xl w-full max-w-5xl h-[88vh] flex flex-col overflow-hidden text-foreground">
        
        {/* MODAL HEADER */}
        <div className="px-6 py-4 border-b border-border/60 flex items-center justify-between bg-muted/40">
          <h2 className="text-lg font-extrabold tracking-tight text-foreground">{title}</h2>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* TABS NAVIGATION */}
        <div className="px-6 pt-3 border-b border-border/60 flex items-center gap-2 bg-background">
          <button
            onClick={() => setActiveTab("upload")}
            className={`px-4 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 cursor-pointer ${
              activeTab === "upload"
                ? "border-[#005883] text-[#005883] dark:text-sky-400 font-bold bg-secondary/50"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Upload Files
          </button>
          <button
            onClick={() => setActiveTab("library")}
            className={`px-4 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 cursor-pointer ${
              activeTab === "library"
                ? "border-[#005883] text-[#005883] dark:text-sky-400 font-bold bg-secondary/50"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Media Library
          </button>
        </div>

        {/* MAIN MODAL BODY */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* TAB 1: UNGGAH FILE */}
          {activeTab === "upload" && (
            <div className="flex-1 p-8 sm:p-12 flex flex-col items-center justify-center text-center space-y-6">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full max-w-xl p-10 border-2 border-dashed border-border/80 hover:border-[#005883] dark:hover:border-sky-400 rounded-2xl bg-muted/20 hover:bg-secondary/40 transition-all flex flex-col items-center justify-center space-y-4 cursor-pointer group"
              >
                <div className="h-16 w-16 rounded-2xl bg-[#005883]/10 dark:bg-white/10 flex items-center justify-center text-[#005883] dark:text-white group-hover:scale-110 transition-transform">
                  <Upload className="h-8 w-8 stroke-[2.2]" />
                </div>
                <div className="space-y-1">
                  <p className="text-base font-bold text-foreground">
                    Drop files anywhere to upload
                  </p>
                  <p className="text-xs text-muted-foreground">
                    or click to select files from your computer
                  </p>
                </div>
                <span className="text-[11px] font-mono text-muted-foreground bg-card px-3 py-1 rounded-md border border-border/60">
                  Maximum upload file size: 10 MB. (JPG, PNG, WEBP, GIF)
                </span>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {isUploading && (
                <div className="w-full max-w-xs space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="flex items-center gap-1.5 text-[#005883] dark:text-sky-400">
                      <Loader2 className="h-4 w-4 animate-spin" /> Uploading...
                    </span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full bg-[#005883] transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PERPUSTAKAAN MEDIA */}
          {activeTab === "library" && (
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
              
              {/* LEFT MAIN AREA: FILTER BAR + GRID THUMBNAILS */}
              <div className="flex-1 flex flex-col p-4 sm:p-6 overflow-hidden space-y-4">
                
                {/* FILTER BAR WITH FOLDER CATEGORY TABS */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 pb-1">
                  {/* Folder Sub-Tabs (All, Products, News) */}
                  <div className="flex items-center gap-1.5 bg-muted/60 p-1 rounded-xl border border-border/60">
                    <button
                      type="button"
                      onClick={() => setActiveFolder("all")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        activeFolder === "all"
                          ? "bg-[#005883] text-white shadow-xs"
                          : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                      }`}
                    >
                      All Media
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveFolder("products")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        activeFolder === "products"
                          ? "bg-[#005883] text-white shadow-xs"
                          : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                      }`}
                    >
                      Products Assets
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveFolder("news")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        activeFolder === "news"
                          ? "bg-[#005883] text-white shadow-xs"
                          : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                      }`}
                    >
                      News Assets
                    </button>
                  </div>

                  <div className="flex items-center gap-2 flex-1 sm:max-w-xs">
                    <div className="relative w-full">
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Search media items..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="pl-9 h-9 text-xs rounded-xl border-border/80 focus:border-[#005883]"
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fetchMedia()}
                      className="h-9 px-3 rounded-xl border-border/80 text-xs gap-1.5 shrink-0"
                    >
                      <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
                    </Button>
                  </div>
                </div>

                {/* THUMBNAIL GRID */}
                <div className="flex-1 overflow-y-auto pr-1">
                  {isLoading ? (
                    <div className="h-64 flex items-center justify-center text-muted-foreground gap-2 text-xs">
                      <Loader2 className="h-5 w-5 animate-spin text-[#005883]" />
                      Loading media library...
                    </div>
                  ) : mediaList.length === 0 ? (
                    <div className="h-64 flex flex-col items-center justify-center text-muted-foreground space-y-2">
                      <ImageIcon className="h-10 w-10 opacity-40 stroke-[1.5]" />
                      <p className="text-sm font-semibold">No media items found</p>
                      <Button
                        size="sm"
                        onClick={() => setActiveTab("upload")}
                        className="bg-[#005883] hover:bg-[#008193] text-white text-xs rounded-xl mt-2"
                      >
                        Upload New File
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                      {mediaList.map((item) => {
                        const isSelected = selectedItem?.id === item.id;
                        return (
                          <div
                            key={item.id}
                            onClick={() => handleSelect(item)}
                            className={`relative aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all group bg-secondary/30 ${
                              isSelected
                                ? "border-[#005883] dark:border-sky-400 ring-2 ring-[#005883]/30 shadow-md"
                                : "border-border/60 hover:border-border"
                            }`}
                          >
                            <img
                              src={item.file_path}
                              alt={item.alt_text || item.original_name}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />

                            {/* SELECTION CHECKMARK BADGE */}
                            {isSelected && (
                              <div className="absolute top-1.5 right-1.5 h-6 w-6 rounded-md bg-[#005883] text-white flex items-center justify-center shadow-md">
                                <Check className="h-4 w-4 stroke-[3]" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT SIDEBAR: DETAIL LAMPIRAN */}
              <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-border/60 bg-muted/20 p-5 flex flex-col justify-between overflow-y-auto">
                {selectedItem ? (
                  <div className="space-y-5">
                    <p className="text-xs font-mono font-extrabold uppercase tracking-wider text-muted-foreground">
                      Attachment Details
                    </p>

                    {/* Preview Thumbnail */}
                    <div className="rounded-xl overflow-hidden border border-border/80 aspect-video bg-background flex items-center justify-center p-2 shadow-xs">
                      <img
                        src={selectedItem.file_path}
                        alt={selectedItem.original_name}
                        className="max-h-full max-w-full object-contain rounded-md"
                      />
                    </div>

                    {/* Metadata Info Text */}
                    <div className="space-y-1.5 text-xs">
                      <p className="font-bold text-foreground truncate" title={selectedItem.original_name}>
                        {selectedItem.original_name}
                      </p>
                      <p className="text-muted-foreground font-mono text-[11px]">
                        {new Date(selectedItem.created_at).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                      <p className="text-muted-foreground font-mono text-[11px]">
                        {selectedItem.file_size}
                      </p>
                      {selectedItem.dimensions && (
                        <p className="text-muted-foreground font-mono text-[11px] font-semibold text-[#005883] dark:text-sky-400">
                          {selectedItem.dimensions}
                        </p>
                      )}
                    </div>

                    {/* Alt Text Input */}
                    <div className="space-y-2 pt-2 border-t border-border/60">
                      <label className="text-xs font-bold text-foreground block">
                        Alternative Text (Alt Text)
                      </label>
                      <Input
                        type="text"
                        placeholder="Describe the image..."
                        value={altText}
                        onChange={(e) => setAltText(e.target.value)}
                        onBlur={handleSaveAltText}
                        className="text-xs rounded-xl h-9 border-border/80 focus:border-[#005883]"
                      />
                      <p className="text-[10px] text-muted-foreground leading-tight">
                        Describe the purpose of the image for accessibility & SEO.
                      </p>
                    </div>

                    {/* Action Links */}
                    <div className="pt-2">
                      <button
                        onClick={handleDeletePermanent}
                        className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete permanently
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-xs text-muted-foreground text-center">
                    Select an image to view attachment details
                  </div>
                )}
              </div>

            </div>
          )}

        </div>

        {/* MODAL FOOTER */}
        <div className="px-6 py-3.5 border-t border-border/60 bg-muted/40 flex items-center justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="h-9 rounded-xl border-border/80 text-xs px-4"
          >
            Cancel
          </Button>
          <Button
            disabled={!selectedItem || activeTab === "upload"}
            onClick={handleConfirmSelect}
            className="h-9 rounded-xl bg-[#005883] hover:bg-[#008193] text-white text-xs px-5 shadow-sm"
          >
            Select Image Asset
          </Button>
        </div>

      </div>
    </div>
  );
};
