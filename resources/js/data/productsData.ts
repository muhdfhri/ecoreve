import { Product, WaterTreatmentCategory } from "@/types/product";
import prod1 from "@/assets/products/1.webp";
import prod2 from "@/assets/products/2.webp";
import prod3 from "@/assets/products/3.webp";
import prod4 from "@/assets/products/4.webp";
import prod5 from "@/assets/products/5.webp";

export const waterTreatmentCategories: WaterTreatmentCategory[] = [
  {
    img: prod1,
    tags: ["Aerator", "DAF System", "Sludge Dewatering"],
    title: "Water & Wastewater Treatment",
    desc: "Comprehensive Solutions for Industrial & Municipal Water Systems",
  },
  {
    img: prod2,
    tags: ["Butterfly Valves", "Flow Meters", "Pressure Sensors"],
    title: "Valves, Automation & Instrumentation",
    desc: "Precision Flow Control, Monitoring & Smart Industrial Automation",
  },
  {
    img: prod3,
    tags: ["Centrifugal Blower", "Solar Panel", "Air Pollution Control"],
    title: "Utility & Energy Equipment",
    desc: "High-Efficiency Aeration Blowers & Eco-Friendly Energy Systems",
  },
  {
    img: prod4,
    tags: ["Portable COD Meter", "Online COD Meter", "Water Analysis"],
    title: "Water Analysis & Monitoring",
    desc: "Real-time Chemical Oxygen Demand & Water Quality Diagnostic Tools",
  },
  {
    img: prod5,
    tags: ["Bag Filter", "Ceramic Membrane", "Brush Strainer"],
    title: "Filtration & Membrane Systems",
    desc: "Advanced Micro-Filtration & Membrane Bioreactor (MBR) Units",
  },
];

export const products: Product[] = [
  {
    id: 1,
    img: prod1,
    name: "Portable COD Meter",
    price: 799,
    wasPrice: 899,
    tags: ["Water Analysis", "COD Testing"],
    category: "Creators",
  },
  {
    id: 2,
    img: prod2,
    name: "Online COD Analyzer",
    price: 1899,
    wasPrice: 1999,
    tags: ["Continuous Monitoring", "Real-time Data"],
    category: "FPV",
  },
  {
    id: 3,
    img: prod3,
    name: "Centrifugal Blower Fan",
    price: 1299,
    wasPrice: 1499,
    tags: ["Aeration", "High Airflow"],
    category: "Business",
  },
  {
    id: 4,
    img: prod4,
    name: "Ceramic Membrane Module",
    price: 1699,
    wasPrice: 1899,
    tags: ["High Filtration", "Durability"],
    category: "Professional",
  },
  {
    id: 5,
    img: prod5,
    name: "Chemical Dosing Pump System",
    price: 950,
    wasPrice: 1100,
    tags: ["Automated Dosing", "Precision"],
    category: "All Models",
  },
];

export const filters = ["Creators", "FPV", "Business", "Professional", "All Models"];
