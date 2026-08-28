import React, { createContext, useState, useEffect, ReactNode } from "react";
import { LanguageCode, Dictionary } from "../types/i18n";
import { en } from "./locales/en";
import { id } from "./locales/id";
import { ms } from "./locales/ms";
import { zh } from "./locales/zh";
import { th } from "./locales/th";

const dictionaries: Record<LanguageCode, Dictionary> = {
  EN: en,
  ID: id,
  MS: ms,
  ZH: zh,
  TH: th,
};

interface LanguageContextType {
  language: LanguageCode;
  currentLanguage: string;
  setLanguage: (lang: LanguageCode) => void;
  t: Dictionary;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: "EN",
  currentLanguage: "en",
  setLanguage: () => {},
  t: en,
});

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>("EN");

  useEffect(() => {
    const savedLang = localStorage.getItem("ecoreve_lang") as LanguageCode | null;
    if (savedLang && dictionaries[savedLang]) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem("ecoreve_lang", lang);
  };

  const t = dictionaries[language] || en;
  const currentLanguage = language.toLowerCase();

  return (
    <LanguageContext.Provider value={{ language, currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
