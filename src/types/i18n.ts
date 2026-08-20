export type LanguageCode = "EN" | "ID" | "MS" | "ZH" | "TH";

export interface LanguageOption {
  code: LanguageCode;
  country: string;
  name: string;
}

export interface Dictionary {
  nav: {
    home: string;
    products: string;
    aboutUs: string;
    service: string;
    news: string;
    contact: string;
    whyEcoReve: string;
    waterSolutions: string;
    systemDemos: string;
    consultation: string;
    searchPlaceholder: string;
  };
  hero: {
    badge: string;
    headlineLine1: string;
    headlineLine2: string;
    headlineLine3: string;
    headlineLine4: string;
    subtitle: string;
    trustedBadgeTitle: string;
    solutionsBadgeTitle: string;
    consultationBadgeTitle: string;
  };
  problems: {
    badge: string;
    title: string;
    subtitle: string;
  };
  solutions: {
    badge: string;
    title: string;
  };
  catalog: {
    badge: string;
    title: string;
  };
  videos: {
    badge: string;
    title: string;
    watchDemo: string;
  };
  cleanWater: {
    title: string;
    subtitle: string;
    metric1: string;
    metric1Label: string;
    metric2: string;
    metric2Label: string;
    metric3: string;
    metric3Label: string;
  };
  footer: {
    equipmentLabel: string;
    commitmentText: string;
    marketText: string;
    chinaOfficeTitle: string;
    chinaOfficeName: string;
    chinaOfficeAddress: string;
    malaysiaOfficeTitle: string;
    malaysiaOfficeName: string;
    malaysiaOfficeAddress: string;
    followUs: string;
    allRightsReserved: string;
  };
}
