export type LanguageCode = "EN" | "ID" | "MS" | "ZH" | "TH";

export interface LanguageOption {
  code: LanguageCode;
  country: string;
  name: string;
}

export interface Dictionary {
  common: {
    viewAll: string;
    learnMore: string;
    contactSales: string;
    exploreSystems: string;
    readMore: string;
    viewSpecs: string;
    backToOverview: string;
    shareThis: string;
    tableOfContents: string;
    aNewPerspective: string;
    extraordinaryMoments: string;
    extraordinarySub: string;
    byAuthor: string;
    relatedArticles: string;
    noDataFound: string;
    previous: string;
    next: string;
    page: string;
  };
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
    categories: string;
    serviceCategories: string;
    portalTitle: string;
    portalSubtitle: string;
    requestCatalog: string;
    scheduleSupport: string;
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
    subtitle: string;
    expertTitle: string;
    expertDesc: string;
    expertBadge: string;
    responseTimeTitle: string;
    responseTimeDesc: string;
    responseTimeValue: string;
    warrantyTitle: string;
    warrantyValue: string;
    warrantyDesc: string;
    trustTitle: string;
    trustDesc: string;
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
  aboutUsPage: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    heroCardTitle: string;
    heroCardDesc: string;
    pillarsEyebrow: string;
    pillarsTitle: string;
    directSupportTag: string;
    expertGuidanceTitle: string;
    expertGuidanceDesc: string;
    expertResponseTime: string;
    expertResponseLabel: string;
    statsEyebrow: string;
    statsTitle: string;
    statsMetric1Label: string;
    statsMetric2Label: string;
    statsMetric3Label: string;
    faqsTitle: string;
    faqsSubtitle: string;
    cantFindAnswerTitle: string;
    cantFindAnswerDesc: string;
  };
  contactPage: {
    badge: string;
    title: string;
    subtitle: string;
    formName: string;
    formEmail: string;
    formCompany: string;
    formInterest: string;
    formMessage: string;
    formSubmit: string;
    formSubmitting: string;
    formSuccess: string;
    officeQingdao: string;
    officeMalaysia: string;
  };
  productsUI: {
    heroBrand: string;
    heroSubtitle: string;
    catalogBadge: string;
    catalogTitle: string;
    filterAll: string;
    filterWaterTreatment: string;
    filterWastewater: string;
    filterValves: string;
    filterInstruments: string;
    filterAutomation: string;
    emptyStateTitle: string;
    emptyStateDesc: string;
  };
  servicesUI: {
    heroBadge: string;
    heroTitle: string;
    heroDesc: string;
    ctaTitle: string;
    ctaDesc: string;
  };
  newsUI: {
    heroBadge: string;
    heroTitle: string;
    heroDesc: string;
    filterAll: string;
    filterPartnership: string;
    filterResearch: string;
    filterFunding: string;
    filterTechnology: string;
    filterInnovation: string;
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
