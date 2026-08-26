import { LanguageOption } from "@/types/i18n";

export const navLinks = ["Home", "Products", "Service", "About us", "Contact"];

export const languages: LanguageOption[] = [
  { code: "EN", country: "GB", name: "English" },
  { code: "ID", country: "ID", name: "Indonesia" },
  { code: "MS", country: "MY", name: "Malay" },
  { code: "ZH", country: "CN", name: "China" },
  { code: "TH", country: "TH", name: "Thai" },
];

export const ecoProductCategories = [
  {
    category: "WATER TREATMENT SERIES",
    items: [
      { name: "Demineral Plant", desc: "Automated anion exchanger for silica (SiO₂) removal" },
      { name: "Softener Plant", desc: "Automated cation exchanger for Ca & Mg hardness removal" },
      { name: "Mixing Tank / PE Tank", desc: "Chemical mixing & dosing storage tanks" },
      { name: "Chemical Dosing Pump", desc: "Precision reagent dosing & injection pumps" },
    ],
  },
  {
    category: "WASTEWATER PRE-TREATMENT & DESLUDGING",
    items: [
      { name: "DAF (Dissolved Air Flotation)", desc: "Vertical & Horizontal solid, oil & grease separation" },
      { name: "Geotube Desludging", desc: "Large geotextile container sludge dewatering" },
    ],
  },
  {
    category: "VALVES & FITTINGS",
    items: [
      { name: "High Performance Butterfly Valve", desc: "Heavy-duty flow regulation valves" },
      { name: "Disco Check Valve", desc: "Disc-type backflow prevention valve" },
      { name: "Swing Check Valve", desc: "Swing-type inline backflow prevention valve" },
    ],
  },
  {
    category: "INSTRUMENT & AUTOMATION",
    items: [
      { name: "Online Turbidity Meter", desc: "Continuous optical water clarity measurement" },
      { name: "Water Hardness Analyzer", desc: "Online & portable Ca/Mg hardness analyzer" },
      { name: "Magnetic Flap Level Gauge", desc: "Visual liquid level indicator" },
      { name: "Silicon Pressure Sensor", desc: "Monocrystalline silicon pressure transmitter" },
    ],
  },
];

export const ecoServiceCategories = [
  {
    title: "Installation (Instalasi)",
    desc: "On-site equipment installation and complete system integration for industrial water treatment plants.",
  },
  {
    title: "Commissioning (Uji Operasional)",
    desc: "Performance testing, instrument calibration, and operational tuning prior to full commercial operation.",
  },
  {
    title: "Training (Pelatihan Operator)",
    desc: "Operator education, technical SOP transfer, instrument readings, and basic troubleshooting guidance.",
  },
  {
    title: "Maintenance & Technical Support",
    desc: "Preventive maintenance, periodic inspections, and repair services to maintain peak equipment efficiency.",
  },
  {
    title: "Spare Parts Supply (Suku Cadang)",
    desc: "Genuine replacement parts supply for pumps, valves, filters, membranes, and automation modules.",
  },
];

