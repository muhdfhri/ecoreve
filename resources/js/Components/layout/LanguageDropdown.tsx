import React from "react";
import ReactCountryFlag from "react-country-flag";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";
import { languages } from "@/data/navigationData";
import { LanguageCode } from "@/types/i18n";

interface LanguageDropdownProps {
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  className?: string;
  dropDirection?: "down" | "up";
}

export const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
  open,
  onToggle,
  onClose,
  className = "",
  dropDirection = "down",
}) => {
  const { language, setLanguage } = useTranslation();
  const currentLangObj = languages.find((l) => l.code === language) ?? languages[0];
  const countryCode = currentLangObj?.country ?? "GB";
  const countryName = currentLangObj?.name ?? "English";
  const langCode = currentLangObj?.code ?? "EN";

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center gap-1.5 h-9 px-3 rounded-full bg-secondary/80 text-foreground border border-border/80 hover:bg-secondary transition-colors text-xs font-bold cursor-pointer"
      >
        <ReactCountryFlag
          countryCode={countryCode}
          svg
          style={{ width: "1.1em", height: "1.1em", borderRadius: "2px", objectFit: "cover" }}
          aria-label={countryName}
        />
        <span>{langCode}</span>
        <ChevronDown className={`h-3 w-3 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          className={`absolute right-0 ${
            dropDirection === "up" ? "bottom-full mb-2" : "top-full mt-2"
          } w-44 rounded-2xl bg-card p-1.5 shadow-2xl border border-border backdrop-blur-xl z-50 animate-fadeIn`}
        >
          {languages.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  setLanguage(lang.code as LanguageCode);
                  onClose();
                }}
                className={`flex items-center gap-3 w-full px-3 py-2.5 text-xs rounded-xl text-left transition-colors ${
                  isSelected
                    ? "bg-[#005883] text-white font-bold"
                    : "hover:bg-secondary text-foreground font-semibold"
                }`}
              >
                <ReactCountryFlag
                  countryCode={lang.country}
                  svg
                  style={{ width: "1.3em", height: "1.3em", borderRadius: "2px", objectFit: "cover" }}
                  aria-label={lang.name}
                />
                <span className="flex-1">{lang.name}</span>
                <span className="text-[10px] opacity-75">{lang.code}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
