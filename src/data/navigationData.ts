import { LanguageOption } from "@/types/i18n";
import { ProductCategory } from "@/types/product";
import { ServiceCategory } from "@/types/service";

export const navLinks = ["Home", "Solutions", "Learn", "Reviews", "Support"];

export const languages: LanguageOption[] = [
  { code: "EN", country: "GB", name: "English" },
  { code: "ID", country: "ID", name: "Indonesia" },
  { code: "MS", country: "MY", name: "Malay" },
  { code: "ZH", country: "CN", name: "China" },
  { code: "TH", country: "TH", name: "Thai" },
];

export const productCategories: ProductCategory[] = [
  {
    category: "Water Analysis Instruments",
    items: ["Portable COD Meter", "Online COD Meter"],
  },
  {
    category: "Air & Fluid Flow Equipment",
    items: ["Air Compressor", "Air Flowmeter", "Air Radiator"],
  },
  {
    category: "Valves",
    items: ["Ball Valve", "Butterfly Valve"],
  },
  {
    category: "Chemical Materials & Resin",
    items: ["Aluminium Sulphate", "Anion Resin", "Cation Resin"],
  },
  {
    category: "Filtration & Separation Equipment",
    items: ["Bag Filter System", "Belt Type Dewatering Machine", "Ceramic Membrane", "Brush Strainer"],
  },
  {
    category: "Other Equipment",
    items: ["Centrifugal Blower Fan", "Chemical Dosing Pump"],
  },
];

export const serviceCategories: ServiceCategory[] = [
  {
    title: "Full-Lifecycle Technical Assistance",
    desc: "Automation services & operating cost reduction",
  },
  {
    title: "Installation & Maintenance Support",
    desc: "Equipment installation, debugging, training & spare parts",
  },
  {
    title: "Stage 1: Pretreatment Solutions",
    desc: "Grilles, sedimentation tanks & oil separators for solid removal",
  },
  {
    title: "Stage 2: Aerobic Digestion System",
    desc: "Aerators & activated sludge system for microbial purification",
  },
  {
    title: "Stage 3: Advanced Treatment",
    desc: "MBR, electrocoagulation & reverse osmosis (RO) systems",
  },
  {
    title: "Zero Liquid Discharge & Compliance",
    desc: "Stable emission regulation compliance & resource recovery",
  },
];
