import React, { useState } from "react";
import { LANG_OPTIONS, LanguageKey } from "./MultiLangInput";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { ChevronDown, Check, Languages } from "lucide-react";

interface MultiLangTextareaProps {
  label?: string;
  required?: boolean;
  rows?: number;
  value: Record<string, any> | string;
  onChange: (val: Record<string, string>) => void;
  placeholder?: string;
  className?: string;
}

export const MultiLangTextarea: React.FC<MultiLangTextareaProps> = ({
  label,
  required = false,
  rows = 3,
  value,
  onChange,
  placeholder = "",
  className = "",
}) => {
  const [activeTab, setActiveTab] = useState<LanguageKey>("en");

  // Ensure value is normalized object
  const valueDict: Record<string, string> =
    typeof value === "object" && value !== null && !Array.isArray(value)
      ? (value as Record<string, string>)
      : { en: typeof value === "string" ? value : "", id: "", ms: "", th: "", zh: "" };

  const activeLangOption = LANG_OPTIONS.find((l) => l.code === activeTab) || LANG_OPTIONS[0];

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newVal = e.target.value;
    onChange({
      ...valueDict,
      [activeTab]: newVal,
    });
  };

  return (
    <div className="space-y-1.5 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 min-h-[26px]">
        {label && (
          <label className="font-bold text-zinc-800 dark:text-zinc-200 text-xs tracking-tight">
            {label} {required && <span className="text-rose-500">*</span>}
          </label>
        )}

        {/* Sleek Shadcn UI Radix Dropdown Language Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-[11px] font-bold text-zinc-800 dark:text-zinc-200 transition-all cursor-pointer shadow-none shrink-0 self-start sm:self-auto"
              title="Select Language"
            >
              <Languages className="h-3.5 w-3.5 text-[#005883] dark:text-sky-400 shrink-0" />
              <span>{activeLangOption.flag}</span>
              <span className="text-zinc-800 dark:text-zinc-200 font-bold">{activeLangOption.name}</span>
              <ChevronDown className="h-3 w-3 text-zinc-400 ml-0.5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="z-50 min-w-[160px] p-1 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-0.5"
          >
            <div className="px-2 py-1 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
              <Languages className="h-3 w-3 text-[#005883] dark:text-sky-400" />
              <span>Select Language</span>
            </div>
            {LANG_OPTIONS.map((lang) => {
              const isActive = activeTab === lang.code;
              const hasValue = Boolean(valueDict[lang.code as LanguageKey]?.trim());

              return (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setActiveTab(lang.code as LanguageKey)}
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer outline-none transition-colors ${
                    isActive
                      ? "bg-[#005883]/10 text-[#005883] dark:bg-sky-950/60 dark:text-sky-300 font-bold"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Languages className={`h-3.5 w-3.5 ${isActive ? "text-[#005883] dark:text-sky-400" : "text-zinc-400"}`} />
                    <span className="text-sm">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {hasValue && !isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" title="Content available" />
                    )}
                    {isActive && <Check className="h-3.5 w-3.5 text-[#005883] dark:text-sky-400" />}
                  </div>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <textarea
        rows={rows}
        required={required && activeTab === "en"}
        value={valueDict[activeTab] || ""}
        onChange={handleTextChange}
        placeholder={placeholder ? `${placeholder} (${activeLangOption.name})` : `Enter details in ${activeLangOption.name}...`}
        className={`w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#005883] shadow-none ${className}`}
      />
    </div>
  );
};
