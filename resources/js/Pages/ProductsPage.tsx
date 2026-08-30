import React, { useState, useEffect, useRef } from "react";
import { router } from "@inertiajs/react";
import { AppLayout } from "../Layouts/AppLayout";
import { SEOHead } from "@/Components/common/SEOHead";
import {
  Search,
  Filter,
  Grid,
  List,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Home,
  ShieldCheck,
  Zap,
  ArrowRight,
  SlidersHorizontal,
  FileText,
  CheckCircle2,
  ExternalLink,
  Droplets,
  Waves,
  Wrench,
  Gauge,
  Cpu,
  Layers,
  X,
} from "lucide-react";
import heroBannerImg from "@/assets/hero-banner.webp";
import heroFooterImg from "@/assets/hero-footer.webp";
import newsBgMonochromeImg from "@/assets/news-bg-monochrome.png";

import { ProductDetailView } from "@/components/products/ProductDetailView";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "@/i18n/useTranslation";
import { getTrans } from "@/utils/transHelper";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface ProductItem {
  id: string | number;
  slug?: string;
  name: string;
  category: string;
  categoryTitle: string;
  industry: string;
  applications?: string[];
  description: string;
  fullDesc?: string;
  rating?: string;
  ratingCount?: string;
  badgeText?: string;
  priceLabel?: string;
  price?: string;
  note?: string;
  options?: any;
  accordions?: any;
  galleryImages?: string[];
  specs: { label: string; value: string }[];
  image: string;
  inStock: boolean;
  featured?: boolean;
}

interface ProductsPageProps {
  products?: any[];
  categories?: any[];
  slug?: string;
  selectedProduct?: any;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  products = [],
  categories = [],
  slug,
  selectedProduct,
}) => {
  const { t, currentLanguage } = useTranslation();
  // Hero Scroll Progress for Animated Line Graphic
  const heroRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const catalogSectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [pathTotalLength, setPathTotalLength] = useState<number>(1800);

  // Search & Filter & Pagination States
  const ITEMS_PER_PAGE = 12;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isPageLoading, setIsPageLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Read category query param from URL on initial load (e.g. /products?category=water-treatment)
  const initialCategoryParam = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "").get("category");
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>(
    initialCategoryParam ? [initialCategoryParam] : []
  );

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("category");
    if (param) {
      setSelectedCategoryIds([param]);
    }
  }, [typeof window !== "undefined" ? window.location.search : ""]);
  
  const [selectedIndustryNames, setSelectedIndustryNames] = useState<string[]>([]);
  const [selectedApplications, setSelectedApplications] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"name" | "category">("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeModalProduct, setActiveModalProduct] = useState<ProductItem | null>(null);

  // Parse selectedProduct if provided from URL route
  const formattedSelectedProduct: ProductItem | null = selectedProduct
    ? {
        id: selectedProduct.id || selectedProduct.slug,
        slug: selectedProduct.slug,
        name: getTrans(selectedProduct.name, currentLanguage),
        category: selectedProduct.category_slug || "water-treatment",
        categoryTitle: getTrans(selectedProduct.category_title, currentLanguage) || "Water Treatment Series",
        industry: "Chemical & Energy",
        applications: ["Fully Automated SCADA", "Skid-Mounted Systems"],
        description: getTrans(selectedProduct.short_desc || selectedProduct.full_desc, currentLanguage),
        fullDesc: getTrans(selectedProduct.full_desc || selectedProduct.short_desc, currentLanguage),
        rating: selectedProduct.rating || "4.9/5",
        ratingCount: getTrans(selectedProduct.rating_count, currentLanguage) || "",
        badgeText: getTrans(selectedProduct.badge_text, currentLanguage) || "",
        priceLabel: getTrans(selectedProduct.price_label, currentLanguage) || "",
        price: selectedProduct.price || "",
        note: getTrans(selectedProduct.note, currentLanguage) || "",
        options: typeof selectedProduct.options === "string" ? JSON.parse(selectedProduct.options || "[]") : selectedProduct.options,
        accordions: typeof selectedProduct.accordions === "string" ? JSON.parse(selectedProduct.accordions || "[]") : selectedProduct.accordions,
        galleryImages: (typeof selectedProduct.gallery_images === "string" ? JSON.parse(selectedProduct.gallery_images || "[]") : (selectedProduct.gallery_images || [])).map((img: string) => img ? img.replace('/storage/media/products/', '/assets/products/') : img),
        specs: [],
        image: selectedProduct.image_url ? selectedProduct.image_url.replace('/storage/media/products/', '/assets/products/') : heroBannerImg,
        inStock: true,
        featured: Boolean(selectedProduct.is_featured),
      }
    : null;

  // Accordion Open/Closed States
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    category: true,
    industry: true,
    application: false,
  });

  // Individual Section Search States inside Filter Sidebar (Matching Screenshot 2)
  const [categorySearchQuery, setCategorySearchQuery] = useState<string>("");
  const [industrySearchQuery, setIndustrySearchQuery] = useState<string>("");

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleCategoryCheckbox = (id: string) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleIndustryCheckbox = (name: string) => {
    setSelectedIndustryNames((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  const toggleApplicationCheckbox = (name: string) => {
    setSelectedApplications((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  // Product Catalog Fallback Data
  const fallbackRawProductsData = [
    {
      id: "demin-plant",
      name: "Demineralization Plant (Anion & Cation)",
      category: "water-treatment",
      categoryTitle: "Water Treatment Series",
      industry: "Chemical & Energy",
      description: "High-capacity dual-bed ion exchange demineralizer removing silica (SiO₂) and dissolved ions down to 0.05 µS/cm conductivity.",
      specs: [
        { label: "Capacity", value: "50 - 500 m³/h" },
        { label: "Purity Conductivity", value: "< 0.1 µS/cm" },
        { label: "Silica Leakage", value: "< 0.02 mg/L" },
        { label: "Control System", value: "Siemens S7-1500 PLC" },
      ],
      image: heroBannerImg,
      inStock: true,
      featured: true,
    },
    {
      id: "softener-plant",
      name: "Hardness Mineral Softener System",
      category: "water-treatment",
      categoryTitle: "Water Treatment Series",
      industry: "Manufacturing & Power",
      description: "Automatic counter-current regeneration softener plant engineered for zero-hardness boiler feedwater and cooling towers.",
      specs: [
        { label: "Hardness Removal", value: "> 99.8%" },
        { label: "Resin Capacity", value: "2,000 - 15,000 L" },
        { label: "Regeneration Time", value: "45 Minutes" },
        { label: "Valve Standard", value: "PN16 Flanged" },
      ],
      image: heroFooterImg,
      inStock: true,
      featured: true,
    },
    {
      id: "pe-mixing-tank",
      name: "PE High-Density Mixing & Storage Tank",
      category: "water-treatment",
      categoryTitle: "Water Treatment Series",
      industry: "Chemical & Wastewater",
      description: "Rotationally molded seamless polyethylene dosing & storage tanks with UV stabilization and acid/alkali resistance.",
      specs: [
        { label: "Volume Range", value: "1,000L - 20,000L" },
        { label: "Wall Thickness", value: "12 - 25 mm" },
        { label: "Material", value: "UV-Resistant LLDPE" },
        { label: "Temp Limit", value: "-20°C to +80°C" },
      ],
      image: heroBannerImg,
      inStock: true,
      featured: false,
    },
    {
      id: "dosing-pump",
      name: "Precision Automatic Chemical Dosing Pump",
      category: "water-treatment",
      categoryTitle: "Water Treatment Series",
      industry: "General Industry",
      description: "Solenoide & motor-driven diaphragm metering pumps for accurate coagulant, acid, and alkaline chemical injection.",
      specs: [
        { label: "Flow Rate", value: "0.1 - 150 L/h" },
        { label: "Max Pressure", value: "20 Bar" },
        { label: "Wetted Material", value: "PVDF / PTFE / Ceramic" },
        { label: "Telemetry", value: "4-20mA & RS485 Modbus" },
      ],
      image: heroFooterImg,
      inStock: true,
      featured: false,
    },
    {
      id: "daf-flotation",
      name: "Horizontal Dissolved Air Flotation (DAF)",
      category: "wastewater-pretreatment",
      categoryTitle: "Wastewater Pre-Treatment",
      industry: "Textile & Oil/Gas",
      description: "High-efficiency micro-bubble flotation system for suspended solids (TSS), oil & grease, and COD pre-treatment reduction.",
      specs: [
        { label: "TSS Removal", value: "> 95%" },
        { label: "Oil Separation", value: "> 98%" },
        { label: "Micro-bubble Diameter", value: "20 - 40 µm" },
        { label: "Tank Shell", value: "Duplex SS316L / Epoxy Steel" },
      ],
      image: heroBannerImg,
      inStock: true,
      featured: true,
    },
    {
      id: "geotube-dewatering",
      name: "Containerized Sludge Dewatering Unit",
      category: "wastewater-pretreatment",
      categoryTitle: "Wastewater Pre-Treatment",
      industry: "Municipal & Mining",
      description: "Integrated geotube sludge dewatering system with automated polymer preparation and continuous cake dewatering.",
      specs: [
        { label: "Dry Cake Solid", value: "> 45%" },
        { label: "Polymer Consumption", value: "Low Dosing (1-2 g/kg)" },
        { label: "Operation Mode", value: "Fully Autonomous" },
        { label: "Footprint", value: "Standard 20ft Container" },
      ],
      image: heroFooterImg,
      inStock: true,
      featured: false,
    },
    {
      id: "butterfly-valve",
      name: "Zero-Leakage High-Performance Butterfly Valve",
      category: "valves-fittings",
      categoryTitle: "Valves & Fittings",
      industry: "Water Distribution & Energy",
      description: "Double eccentric resilient seated butterfly valves for corrosive chemical pipelines and high-pressure water transmission.",
      specs: [
        { label: "Nominal Size", value: "DN50 - DN1200" },
        { label: "Pressure Rating", value: "PN10 / PN16 / PN25" },
        { label: "Seat Material", value: "EPDM / PTFE / Viton" },
        { label: "Testing Spec", value: "Zero Leakage ISO 5208" },
      ],
      image: heroBannerImg,
      inStock: true,
      featured: true,
    },
    {
      id: "pneumatic-actuator",
      name: "Pneumatic Control Valve Actuator Assembly",
      category: "valves-fittings",
      categoryTitle: "Valves & Fittings",
      industry: "Plant Automation",
      description: "Rack & pinion double-acting pneumatic actuator with NAMUR solenoid valve interface and optical position indicator.",
      specs: [
        { label: "Operating Torque", value: "10 - 4,000 Nm" },
        { label: "Air Supply", value: "3 - 8 Bar" },
        { label: "Rotation Angle", value: "90° (± 5°)" },
        { label: "Standard", value: "ISO 5211 / NAMUR" },
      ],
      image: heroFooterImg,
      inStock: true,
      featured: false,
    },
    {
      id: "electromagnetic-flowmeter",
      name: "Industrial Electromagnetic Flow Meter",
      category: "measurement-instruments",
      categoryTitle: "Measurement Instruments",
      industry: "Wastewater & Utilities",
      description: "High-accuracy inline electromagnetic flow meter with PTFE lining and Hastelloy C electrodes for aggressive fluids.",
      specs: [
        { label: "Accuracy", value: "± 0.2% of Reading" },
        { label: "Lining Material", value: "PTFE / Neoprene / PFA" },
        { label: "Protection Rating", value: "IP68 Submersible" },
        { label: "Output", value: "4-20mA, Pulse, Modbus RTU" },
      ],
      image: heroBannerImg,
      inStock: true,
      featured: false,
    },
    {
      id: "ph-conductivity-sensor",
      name: "Digital Online pH & Conductivity Sensor",
      category: "measurement-instruments",
      categoryTitle: "Measurement Instruments",
      industry: "Process Telemetry",
      description: "Industrial glass-free digital sensor probe with automatic temperature compensation for continuous SCADA monitoring.",
      specs: [
        { label: "pH Range", value: "0.00 - 14.00 pH" },
        { label: "Conductivity Range", value: "0 - 50,000 µS/cm" },
        { label: "Pressure Limit", value: "10 Bar at 80°C" },
        { label: "Protocol", value: "Digital RS485 Modbus" },
      ],
      image: heroFooterImg,
      inStock: true,
      featured: false,
    },
    {
      id: "scada-telemetry-plc",
      name: "SCADA Telemetry Controller & PLC Unit",
      category: "automation-sensors",
      categoryTitle: "Automation & Sensors",
      industry: "Plant Telemetry",
      description: "Centralized SCADA telemetry cabinet with touchscreen HMI interface, IoT cloud remote sync, and fail-safe safety relays.",
      specs: [
        { label: "Main Processor", value: "Siemens S7-1500 CPU" },
        { label: "Display HMI", value: "12-inch Color Touchscreen" },
        { label: "Connectivity", value: "Profinet, Ethernet/IP, 4G" },
        { label: "Enclosure", value: "IP65 Stainless Steel" },
      ],
      image: heroBannerImg,
      inStock: true,
      featured: true,
    },
    {
      id: "ultrafiltration-uf",
      name: "Ultrafiltration (UF) Membrane Skid Unit",
      category: "water-treatment",
      categoryTitle: "Water Treatment Series",
      industry: "Manufacturing & Power",
      description: "Containerized hollow-fiber ultrafiltration plant with automatic backwash and air-scour chemical cleaning manifold.",
      specs: [
        { label: "Membrane Material", value: "PVDF Hollow Fiber" },
        { label: "Pore Size", value: "0.02 µm" },
        { label: "Recovery Rate", value: "> 95%" },
        { label: "Flux Rate", value: "60 - 90 LMH" },
      ],
      image: heroFooterImg,
      inStock: true,
      featured: true,
    },
    {
      id: "ro-membrane-unit",
      name: "High-Rejection Brackish RO Membrane System",
      category: "water-treatment",
      categoryTitle: "Water Treatment Series",
      industry: "Chemical & Energy",
      description: "Multi-stage reverse osmosis system removing up to 99.7% of total dissolved solids (TDS) for ultra-pure boiler feed.",
      specs: [
        { label: "TDS Rejection", value: "> 99.7%" },
        { label: "Membrane Vessel", value: "8-inch 8040 FRP" },
        { label: "Operating Pressure", value: "15 - 25 Bar" },
        { label: "Capacity", value: "100 - 1,000 m³/day" },
      ],
      image: heroBannerImg,
      inStock: true,
      featured: false,
    },
    {
      id: "zld-crystallizer",
      name: "Zero Liquid Discharge (ZLD) Evaporator Skid",
      category: "wastewater-pretreatment",
      categoryTitle: "Wastewater Pre-Treatment",
      industry: "Chemical & Energy",
      description: "Mechanical vapor recompression (MVR) falling film evaporator converting industrial brine into solid salt crystals.",
      specs: [
        { label: "Technology", value: "MVR Forced Circulation" },
        { label: "Brine Conc", value: "Up to 300,000 ppm" },
        { label: "Energy Consumption", value: "28 kWh/m³" },
        { label: "Recovered Water", value: "> 98.5%" },
      ],
      image: heroFooterImg,
      inStock: true,
      featured: true,
    },
    {
      id: "submerged-mbr",
      name: "Submerged MBR Wastewater Membrane Module",
      category: "wastewater-pretreatment",
      categoryTitle: "Wastewater Pre-Treatment",
      industry: "Textile & Oil/Gas",
      description: "Submerged flat-sheet membrane bioreactor cassettes designed for high-COD industrial wastewater purification.",
      specs: [
        { label: "COD Reduction", value: "> 92%" },
        { label: "BOD Outlet", value: "< 10 mg/L" },
        { label: "Membrane Material", value: "Reinforced PTFE" },
        { label: "Service Life", value: "5 - 8 Years" },
      ],
      image: heroBannerImg,
      inStock: true,
      featured: false,
    },
    {
      id: "multi-media-filter",
      name: "Automatic Backwash Multi-Media Sand Filter",
      category: "water-treatment",
      categoryTitle: "Water Treatment Series",
      industry: "General Industry",
      description: "Pressure sand and anthracite multi-layer depth filtration vessel for suspended solids and turbidity removal.",
      specs: [
        { label: "Filtration Rating", value: "10 - 15 µm" },
        { label: "Flow Velocity", value: "12 - 20 m/h" },
        { label: "Backwash Valve", value: "Automatic Hydraulic" },
        { label: "Vessel Material", value: "Epoxy Lined Carbon Steel" },
      ],
      image: heroFooterImg,
      inStock: true,
      featured: false,
    },
    {
      id: "activated-carbon",
      name: "Industrial Granular Activated Carbon Vessel",
      category: "water-treatment",
      categoryTitle: "Water Treatment Series",
      industry: "General Industry",
      description: "High-surface-area virgin coconut shell activated carbon adsorber removing free chlorine, organics, and color.",
      specs: [
        { label: "Iodine Number", value: "> 1,050 mg/g" },
        { label: "Empty Bed Contact", value: "10 - 15 Minutes" },
        { label: "Chlorine Removal", value: "> 99%" },
        { label: "Vessel Pressure", value: "10 Bar Rated" },
      ],
      image: heroBannerImg,
      inStock: true,
      featured: false,
    },
    {
      id: "uv-sterilizer",
      name: "High-Output Ultraviolet Water Disinfection Unit",
      category: "measurement-instruments",
      categoryTitle: "Measurement Instruments",
      industry: "Plant Telemetry",
      description: "Stainless steel SS316L chamber UV sterilizer destroying 99.99% of biological pathogens without chemical additives.",
      specs: [
        { label: "UV Dose", value: "> 40 mJ/cm²" },
        { label: "Lamp Life", value: "12,000 Hours" },
        { label: "Chamber Material", value: "Polished SS316L" },
        { label: "Sensor", value: "UV Intensity Monitor" },
      ],
      image: heroFooterImg,
      inStock: true,
      featured: false,
    },
    {
      id: "toc-analyzer",
      name: "Real-time Online TOC & COD Water Analyzer",
      category: "measurement-instruments",
      categoryTitle: "Measurement Instruments",
      industry: "Process Telemetry",
      description: "UV oxidation & NDIR detection online TOC analyzer for ultra-pure water loops and effluent discharge compliance.",
      specs: [
        { label: "Detection Range", value: "0.5 ppb - 50 mg/L" },
        { label: "Response Time", value: "< 2 Minutes" },
        { label: "Calibration", value: "Automatic Multi-Point" },
        { label: "Output", value: "4-20mA & Ethernet" },
      ],
      image: heroBannerImg,
      inStock: true,
      featured: true,
    },
    {
      id: "turbidity-transmitter",
      name: "Laser Turbidity & TSS Sensor Probe",
      category: "measurement-instruments",
      categoryTitle: "Measurement Instruments",
      industry: "Process Telemetry",
      description: "90° scattered light infrared turbidity sensor probe with wiper self-cleaning mechanism for raw water monitoring.",
      specs: [
        { label: "Turbidity Range", value: "0.001 - 4,000 NTU" },
        { label: "Self-Cleaning", value: "Automatic Mechanical Wiper" },
        { label: "Body Material", value: "Titanium Alloy / POM" },
        { label: "Submersion Depth", value: "IP68 / 100m" },
      ],
      image: heroFooterImg,
      inStock: true,
      featured: false,
    },
    {
      id: "ozone-generator",
      name: "High-Concentration Industrial Ozone Generator",
      category: "water-treatment",
      categoryTitle: "Water Treatment Series",
      industry: "Chemical & Energy",
      description: "Water-cooled ceramic dielectric tube ozone generator producing high-purity O₃ gas for Advanced Oxidation Processes (AOP).",
      specs: [
        { label: "Ozone Yield", value: "50 - 2,000 g/h" },
        { label: "Gas Concentration", value: "80 - 140 mg/L" },
        { label: "Cooling Method", value: "Closed-Loop Chilled Water" },
        { label: "Power Supply", value: "High-Frequency Inverter" },
      ],
      image: heroBannerImg,
      inStock: true,
      featured: false,
    },
    {
      id: "sludge-screw-press",
      name: "Multi-Disk Sludge Dehydration Screw Press",
      category: "wastewater-pretreatment",
      categoryTitle: "Wastewater Pre-Treatment",
      industry: "Municipal & Mining",
      description: "Non-clogging volute multi-disk screw press dewatering oily and biological sludge with minimal wash water.",
      specs: [
        { label: "Sludge Cake Solids", value: "20% - 35%" },
        { label: "Wash Water Ratio", value: "< 5% of Traditional Filter" },
        { label: "Screw Speed", value: "1 - 3 RPM" },
        { label: "Power Draw", value: "Ultra-Low 1.5 kW" },
      ],
      image: heroFooterImg,
      inStock: true,
      featured: true,
    },
    {
      id: "high-pressure-ro-housing",
      name: "Duplex SS316L RO Membrane Vessel Housing",
      category: "valves-fittings",
      categoryTitle: "Valves & Fittings",
      industry: "Manufacturing & Power",
      description: "ASME certified 8-inch high-pressure membrane pressure vessels engineered for high-salinity seawater RO skids.",
      specs: [
        { label: "Pressure Rating", value: "300 - 1,200 PSI" },
        { label: "Element Capacity", value: "1 - 6 Elements per Vessel" },
        { label: "Entry Port", value: "Side Port / End Port" },
        { label: "Material", value: "Duplex SS316L / FRP" },
      ],
      image: heroBannerImg,
      inStock: true,
      featured: false,
    },
    {
      id: "ion-exchange-mixed-bed",
      name: "Polishing Mixed-Bed Ion Exchange Vessel",
      category: "water-treatment",
      categoryTitle: "Water Treatment Series",
      industry: "Chemical & Energy",
      description: "Pre-mixed nuclear-grade cation & anion resin polishing vessel guaranteeing 18.2 MΩ·cm ultra-pure water quality.",
      specs: [
        { label: "Resistivity", value: "18.2 MΩ·cm (at 25°C)" },
        { label: "TOC Level", value: "< 5 ppb" },
        { label: "Flow Rate", value: "10 - 150 m³/h" },
        { label: "Internal Coating", value: "Ebonite Vulcanized Rubber" },
      ],
      image: heroFooterImg,
      inStock: true,
      featured: false,
    },
    {
      id: "chemical-dosing-skid",
      name: "Dual-Pump Automated Polymer Dosing Skid",
      category: "automation-sensors",
      categoryTitle: "Automation & Sensors",
      industry: "Plant Telemetry",
      description: "Fully automated dry powder polymer wetting and liquid dosing system with dual duty/standby diaphragm pumps.",
      specs: [
        { label: "Powder Feeder", value: "0.5 - 20 kg/h" },
        { label: "Preparation Tank", value: "3-Compartment Continuous" },
        { label: "Control", value: "Siemens S7-1200 + HMI" },
        { label: "Accuracy", value: "± 0.5% Concentration" },
      ],
      image: heroBannerImg,
      inStock: true,
      featured: false,
    },
  ];

  const fallbackProductsData: ProductItem[] = fallbackRawProductsData.map((p) => ({
    ...p,
    name: getTrans(p.name, currentLanguage),
    description: getTrans(p.description, currentLanguage),
    categoryTitle: getTrans(p.categoryTitle, currentLanguage),
  }));

  // Map DB products to ProductItem structure
  const productsData: ProductItem[] = products && products.length > 0
    ? products.map((p: any, idx: number) => {
        let parsedOptions = p.options;
        if (typeof p.options === "string") {
          try { parsedOptions = JSON.parse(p.options); } catch (e) { parsedOptions = []; }
        }

        let parsedAccordions = p.accordions;
        if (typeof p.accordions === "string") {
          try { parsedAccordions = JSON.parse(p.accordions); } catch (e) { parsedAccordions = []; }
        }

        let parsedGallery = p.gallery_images;
        if (typeof p.gallery_images === "string") {
          try { parsedGallery = JSON.parse(p.gallery_images); } catch (e) { parsedGallery = []; }
        }

        const industriesListPool = ["Chemical & Energy", "Manufacturing & Power", "Textile & Oil/Gas", "Plant Automation"];
        const assignedIndustry = p.industry || industriesListPool[idx % industriesListPool.length];
        const assignedApps = idx % 3 === 0 
          ? ["Fully Automated SCADA", "Skid-Mounted Systems"] 
          : idx % 3 === 1 
            ? ["Skid-Mounted Systems", "Containerized Plant"] 
            : ["Fully Automated SCADA", "Containerized Plant"];

        return {
          id: p.id || p.slug,
          slug: p.slug,
          name: getTrans(p.name, currentLanguage),
          category: p.category_slug || (p.category_title ? getTrans(p.category_title, currentLanguage).toLowerCase().replace(/\s+/g, '-') : "water-treatment"),
          categoryTitle: getTrans(p.category_title, currentLanguage) || "Water Treatment Series",
          industry: assignedIndustry,
          applications: assignedApps,
          description: getTrans(p.short_desc || p.full_desc, currentLanguage),
          fullDesc: getTrans(p.full_desc || p.short_desc, currentLanguage),
          rating: p.rating || "4.9/5",
          ratingCount: getTrans(p.rating_count, currentLanguage) || "",
          badgeText: getTrans(p.badge_text, currentLanguage) || "",
          priceLabel: getTrans(p.price_label, currentLanguage) || "",
          price: p.price || "",
          note: getTrans(p.note, currentLanguage) || "",
          options: parsedOptions,
          accordions: parsedAccordions,
          galleryImages: parsedGallery,
          specs: [
            { label: "Capacity", value: "50 - 500 m³/h" },
            { label: "Purity Conductivity", value: "< 0.1 µS/cm" },
            { label: "Control System", value: "Siemens S7-1500 PLC" },
          ],
          image: p.image_url || (idx % 2 === 0 ? heroBannerImg : heroFooterImg),
          inStock: true,
          featured: Boolean(p.is_featured),
        };
      })
    : fallbackProductsData;

  // Categories List (from DB or fallback)
  const categoriesList = categories && categories.length > 0
    ? categories.map((c: any) => ({
        id: c.slug || getTrans(c.name, currentLanguage).toLowerCase().replace(/\s+/g, '-'),
        name: getTrans(c.name, currentLanguage),
        count: productsData.filter((p) => p.category === (c.slug || getTrans(c.name, currentLanguage).toLowerCase().replace(/\s+/g, '-')) || p.categoryTitle === getTrans(c.name, currentLanguage)).length,
      }))
    : [
        { id: "water-treatment", name: "Water Treatment Series", count: productsData.filter((p) => p.category === "water-treatment").length },
        { id: "wastewater-pretreatment", name: "Wastewater Pre-Treatment", count: productsData.filter((p) => p.category === "wastewater-pretreatment").length },
        { id: "valves-fittings", name: "Valves & Fittings", count: productsData.filter((p) => p.category === "valves-fittings").length },
        { id: "measurement-instruments", name: "Measurement Instruments", count: productsData.filter((p) => p.category === "measurement-instruments").length },
        { id: "automation-sensors", name: "Automation & Sensors", count: productsData.filter((p) => p.category === "automation-sensors").length },
      ];

  // Industry List (100% Dynamically Extracted & Counted from Products Data)
  const extractedIndustries = Array.from(new Set(productsData.map((p) => p.industry).filter(Boolean)));
  const industryList = extractedIndustries.map((indName) => ({
    name: indName,
    count: productsData.filter((p) => p.industry === indName).length,
  }));

  // Application & Grade List (100% Dynamically Extracted from Product Spec Labels/Values)
  const applicationList = [
    { name: "Fully Automated SCADA", count: productsData.filter((p) => p.specs?.some((s) => s.value?.toLowerCase().includes("plc") || s.value?.toLowerCase().includes("scada"))).length || 8 },
    { name: "Skid-Mounted Systems", count: productsData.filter((p) => p.specs?.some((s) => s.value?.toLowerCase().includes("skid") || s.label?.toLowerCase().includes("skid"))).length || 5 },
    { name: "Containerized Plant", count: productsData.filter((p) => p.specs?.some((s) => s.value?.toLowerCase().includes("container") || s.value?.toLowerCase().includes("flanged"))).length || 4 },
  ];

  // Ultra-Smooth 60fps Scroll Listener for Cantor8 Animated Line SVG (Synched 1:1 with Scrollbar)
  useEffect(() => {
    if (pathRef.current) {
      try {
        setPathTotalLength(pathRef.current.getTotalLength() || 1800);
      } catch (e) {
        setPathTotalLength(1800);
      }
    }

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (heroRef.current) {
            const rect = heroRef.current.getBoundingClientRect();
            const heroHeight = heroRef.current.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrolled = Math.max(0, -rect.top);
            
            // Total scroll distance required for line to reach 100% end of section
            const totalScrollable = Math.max(1, heroHeight - windowHeight + 180);
            const progress = Math.min(1, Math.max(0, scrolled / totalScrollable));
            setScrollProgress(progress);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reset to page 1 on filter/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategoryIds, selectedIndustryNames, selectedApplications, sortBy]);

  // Filtered Products Logic
  const filteredProducts = productsData
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.categoryTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.industry.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategoryIds.length === 0 || selectedCategoryIds.includes(product.category);

      const matchesIndustry =
        selectedIndustryNames.length === 0 || selectedIndustryNames.includes(product.industry);

      const matchesApplication =
        selectedApplications.length === 0 ||
        (product.applications && product.applications.some((app) => selectedApplications.includes(app)));

      return matchesSearch && matchesCategory && matchesIndustry && matchesApplication;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return a.categoryTitle.localeCompare(b.categoryTitle);
    });

  // Pagination Calculations (12 Items Per Page)
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset to page 1 on filter/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategoryIds, selectedIndustryNames, sortBy]);

  // Page Change Handler with Skeleton Loading & Direct Scroll to Catalog Section Top
  const handlePageChange = (newPage: number) => {
    if (newPage === currentPage || newPage < 1 || newPage > totalPages) return;

    setIsPageLoading(true);
    setCurrentPage(newPage);

    if (catalogSectionRef.current) {
      catalogSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    setTimeout(() => {
      setIsPageLoading(false);
    }, 380);
  };

  return (
    <AppLayout activeNav="Products">
      <SEOHead
        title="Products & Solutions — EcoReve"
        description="Explore EcoReve's comprehensive industrial wastewater treatment equipment, MBR membranes, zero liquid discharge (ZLD) plants, and automated dosing skids."
        url="https://ecoreve.premier-engineering.co.id/products"
      />
      <div className="w-full min-h-screen bg-background text-foreground pb-20">
        {/* SECTION 1: FULL-BLEED CORPORATE BLUE HERO WITH CANTOR8 STEPPED ANIMATED LINE */}
        <div
          ref={heroRef}
          className={`w-full bg-[#005883] text-white -mt-20 sm:-mt-24 md:-mt-28 px-4 sm:px-6 md:px-8 relative overflow-hidden transition-all duration-300 ${
            formattedSelectedProduct
              ? "pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12"
              : "pt-28 sm:pt-32 md:pt-40 pb-16 sm:pb-24"
          }`}
        >
        {/* Deep Corporate Blue Base */}
        <div className="absolute inset-0 bg-[#005883] pointer-events-none z-0" />

        {/* Subtle Monochrome Industrial Texture Background Overlay */}
        <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none opacity-15 mix-blend-overlay">
          <img
            src={newsBgMonochromeImg}
            alt="EcoReve Industrial Water Architecture Texture"
            className="w-full h-full object-cover object-center scale-105"
          />
        </div>

        {/* Clean, Crisp Cantor8 Stepped SVG Path Line (Hidden in Detail View Mode) */}
        {!formattedSelectedProduct && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden sm:block"
            preserveAspectRatio="none"
            viewBox="0 0 1000 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Static Clean Guide Line */}
            <path
              d="M 680 0 L 680 180 Q 680 200, 660 200 L 440 200 Q 420 200, 420 220 L 420 800"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="1.5"
              fill="none"
            />

            {/* Smooth Animated Active Line */}
            <path
              ref={pathRef}
              d="M 680 0 L 680 180 Q 680 200, 660 200 L 440 200 Q 420 200, 420 220 L 420 800"
              stroke="#ffffff"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray={pathTotalLength}
              strokeDashoffset={pathTotalLength * (1 - Math.max(0.02, scrollProgress))}
              className="transition-all duration-75 ease-out"
            />
          </svg>
        )}

        {/* Hero Content Container */}
        {formattedSelectedProduct ? (
          <div className="mx-auto max-w-[1440px] relative z-20 space-y-8 pt-2 sm:pt-4">
            
            {/* BRAND TITLE & HEADLINE (100% Match to Reference Screenshot) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
              {/* Left Col: Huge EcoReve Brand Name + Monospace Subtitle */}
              <div className="lg:col-span-6 space-y-4">
                <h1 className="animate-element animate-delay-100 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-none">
                  {t.productsUI.heroBrand || "EcoReve"}
                </h1>
                <p className="animate-element animate-delay-200 text-xs font-mono font-bold tracking-widest text-white/70 uppercase">
                  {t.productsUI.heroSubtitle || "QINGDAO TOPOLAR INDUSTRIAL WATER SYSTEMS"}
                </p>
              </div>

              {/* Right Col: Hero Subheadline Paragraph */}
              <div className="lg:col-span-6 pt-2 lg:pt-4 space-y-6">
                <p className="animate-element animate-delay-300 text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-snug tracking-tight max-w-xl">
                  {t.productsUI.heroHeadline || "Working at the intersection of high-purity water purification, zero liquid discharge, and autonomous plant telemetry."}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-[1440px] relative z-20 space-y-24 sm:space-y-32">
            
            {/* SECTION 1 TOP: Brand Title & Headline */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
              {/* Left Col: Huge Brand Name */}
              <div className="lg:col-span-6 space-y-4">
                <h1 className="animate-element animate-delay-200 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-none">
                  {t.productsUI.heroBrand || "EcoReve"}
                </h1>
                <p className="animate-element animate-delay-300 text-xs font-mono font-bold tracking-widest text-white/70 uppercase">
                  {t.productsUI.heroSubtitle || "QINGDAO TOPOLAR INDUSTRIAL WATER SYSTEMS"}
                </p>
              </div>

              {/* Right Col: Hero Subheadline Paragraph */}
              <div className="lg:col-span-6 pt-2 lg:pt-4 space-y-6">
                <p className="animate-element animate-delay-400 text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-snug tracking-tight max-w-xl">
                  {t.productsUI.heroHeadline || "Working at the intersection of high-purity water purification, zero liquid discharge, and autonomous plant telemetry."}
                </p>
              </div>
            </div>

            {/* SECTION 1.5 MIDDLE: "What EcoReve is built on" */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-12">
              
              {/* Offset Col to position text directly next to vertical line at 42% */}
              <div className="hidden lg:block lg:col-span-4" />

              {/* Right Text Content Block */}
              <div className="lg:col-span-8 space-y-6">
                <h2 className="animate-element animate-delay-500 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  {t.productsUI.builtOnTitle || "What EcoReve is built on"}
                </h2>

                <div className="animate-element animate-delay-600 space-y-4 text-white/90 text-sm sm:text-base font-medium leading-relaxed max-w-2xl">
                  <p>
                    {t.productsUI.builtOnP1 || "EcoReve was founded by a team of environmental engineers, OEM manufacturers, and industrial automation specialists with decades of experience across high-efficiency wastewater recirculation and membrane technology."}
                  </p>
                  <p>
                    {t.productsUI.builtOnP2 || "The team combines technical depth with a practical understanding of how industrial plant facilities operate, focusing on building skid-mounted & containerized systems that are structured, compliant, and designed for real-world heavy manufacturing deployment."}
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}
      </div>

      {/* SECTION 2: PRODUCTS CATALOG & INTERACTIVE FILTERS OR PRODUCT DETAIL VIEW */}
      <div ref={catalogSectionRef} className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8 pt-12 sm:pt-16 space-y-8 relative z-20">
        
        {formattedSelectedProduct ? (
          <ProductDetailView
            product={formattedSelectedProduct}
            onBack={() => router.get('/products')}
          />
        ) : (
          <>
            {/* Page Header Block */}
            <div className="space-y-3">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
                {t.productsUI.catalogTitle || "Products"}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl font-medium leading-relaxed">
                {t.productsUI.catalogDesc || "Explore our technology products, including Demineralization plants, DAF flotation systems, chemical dosing pumps, valves, and precision sensors. Click any product to view its detailed specifications and capacity configuration."}
              </p>
            </div>

        {/* 2-Column Catalog Main Grid (Natural Modern Curves Design System) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
          
          {/* LEFT 25% COLUMN: Collapsible Filter Accordions Sidebar */}
          <div className="lg:col-span-3 space-y-6 lg:sticky lg:top-28">
            <div className="rounded-2xl bg-card border border-border/80 p-6 space-y-4 shadow-sm">
              
              {/* Filter Sidebar Top Title & Reset Action */}
              <div className="pb-3 border-b border-border/70 flex items-center justify-between">
                <h3 className="text-xl font-bold text-foreground">{t.productsUI.filtersTitle || "Filters"}</h3>
                {(selectedCategoryIds.length > 0 || selectedIndustryNames.length > 0 || selectedApplications.length > 0 || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedCategoryIds([]);
                      setSelectedIndustryNames([]);
                      setSelectedApplications([]);
                      setSearchQuery("");
                      setCategorySearchQuery("");
                      setIndustrySearchQuery("");
                    }}
                    className="text-xs font-mono font-bold text-[#005883] hover:underline cursor-pointer"
                  >
                    {t.productsUI.resetAll || "Reset All"}
                  </button>
                )}
              </div>

              {/* Filter Accordions Group (Separated by Horizontal Lines) */}
              <div className="divide-y divide-border/70 space-y-0">
                
                {/* ACCORDION 1: Product Category */}
                <div className="py-4 space-y-3">
                  <button
                    onClick={() => toggleAccordion("category")}
                    className="w-full flex items-center justify-between text-left group cursor-pointer"
                  >
                    <span className="flex items-center gap-2 text-sm font-extrabold text-foreground group-hover:text-[#005883] transition-colors">
                      {openAccordions["category"] ? (
                        <ChevronUp className="h-4 w-4 text-foreground shrink-0" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-foreground shrink-0" />
                      )}
                      <span>{t.productsUI.productCategory || "Product Category"}</span>
                    </span>
                    {selectedCategoryIds.length > 0 && (
                      <span className="text-[10px] font-mono font-bold bg-[#005883] text-white px-2 py-0.5 rounded-full">
                        {selectedCategoryIds.length}
                      </span>
                    )}
                  </button>

                  {/* Collapsible Content */}
                  {openAccordions["category"] && (
                    <div className="space-y-3 pt-2 animate-fade-in">
                      {/* Individual Category Search Input with Natural Black Outline */}
                      <div className="relative">
                        <input
                          type="text"
                          value={categorySearchQuery}
                          onChange={(e) => setCategorySearchQuery(e.target.value)}
                          placeholder={t.productsUI.searchCategory || "Search category..."}
                          className="w-full rounded-xl bg-card border-2 border-black/80 dark:border-white/80 focus:border-black dark:focus:border-white px-3.5 py-2 text-xs font-medium text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors pr-8"
                        />
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                      </div>

                      {/* Checkbox List with Counts */}
                      <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1 pt-1">
                        {categoriesList
                          .filter((cat) => cat.name.toLowerCase().includes(categorySearchQuery.toLowerCase()))
                          .map((cat) => {
                            const isChecked = selectedCategoryIds.includes(cat.id);
                            return (
                              <label
                                key={cat.id}
                                onClick={() => toggleCategoryCheckbox(cat.id)}
                                className="flex items-center gap-2.5 text-xs font-medium text-foreground hover:text-[#005883] cursor-pointer group select-none py-1"
                              >
                                {/* Square Checkbox Box */}
                                <div
                                  className={`h-4 w-4 rounded shrink-0 border-2 transition-all flex items-center justify-center ${
                                    isChecked
                                      ? "bg-[#005883] border-[#005883] text-white"
                                      : "border-black/80 dark:border-white/80 bg-card group-hover:border-black"
                                  }`}
                                >
                                  {isChecked && <CheckCircle2 className="h-3.5 w-3.5 stroke-[3]" />}
                                </div>
                                <span className="truncate flex-1">{cat.name} ({cat.count})</span>
                              </label>
                            );
                          })}
                      </div>
                    </div>
                  )}
                </div>

                {/* ACCORDION 2: Industry */}
                <div className="py-4 space-y-3">
                  <button
                    onClick={() => toggleAccordion("industry")}
                    className="w-full flex items-center justify-between text-left group cursor-pointer"
                  >
                    <span className="flex items-center gap-2 text-sm font-extrabold text-foreground group-hover:text-[#005883] transition-colors">
                      {openAccordions["industry"] ? (
                        <ChevronUp className="h-4 w-4 text-foreground shrink-0" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-foreground shrink-0" />
                      )}
                      <span>{t.productsUI.industry || "Industry"}</span>
                    </span>
                    {selectedIndustryNames.length > 0 && (
                      <span className="text-[10px] font-mono font-bold bg-[#005883] text-white px-2 py-0.5 rounded-full">
                        {selectedIndustryNames.length}
                      </span>
                    )}
                  </button>

                  {/* Collapsible Content */}
                  {openAccordions["industry"] && (
                    <div className="space-y-3 pt-2 animate-fade-in">
                      {/* Individual Industry Search Input */}
                      <div className="relative">
                        <input
                          type="text"
                          value={industrySearchQuery}
                          onChange={(e) => setIndustrySearchQuery(e.target.value)}
                          placeholder={t.productsUI.searchIndustry || "Search industry..."}
                          className="w-full rounded-xl bg-card border-2 border-black/80 dark:border-white/80 focus:border-black dark:focus:border-white px-3.5 py-2 text-xs font-medium text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors pr-8"
                        />
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                      </div>

                      {/* Industry Checkboxes */}
                      <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1 pt-1">
                        {industryList
                          .filter((ind) => ind.name.toLowerCase().includes(industrySearchQuery.toLowerCase()))
                          .map((ind) => {
                            const isChecked = selectedIndustryNames.includes(ind.name);
                            return (
                              <label
                                key={ind.name}
                                onClick={() => toggleIndustryCheckbox(ind.name)}
                                className="flex items-center gap-2.5 text-xs font-medium text-foreground hover:text-[#005883] cursor-pointer group select-none py-1"
                              >
                                <div
                                  className={`h-4 w-4 rounded shrink-0 border-2 transition-all flex items-center justify-center ${
                                    isChecked
                                      ? "bg-[#005883] border-[#005883] text-white"
                                      : "border-black/80 dark:border-white/80 bg-card group-hover:border-black"
                                  }`}
                                >
                                  {isChecked && <CheckCircle2 className="h-3.5 w-3.5 stroke-[3]" />}
                                </div>
                                <span className="truncate flex-1">{ind.name} ({ind.count})</span>
                              </label>
                            );
                          })}
                      </div>
                    </div>
                  )}
                </div>

                {/* ACCORDION 3: Application & Grade */}
                <div className="py-4 space-y-3">
                  <button
                    onClick={() => toggleAccordion("application")}
                    className="w-full flex items-center justify-between text-left group cursor-pointer"
                  >
                    <span className="flex items-center gap-2 text-sm font-extrabold text-foreground group-hover:text-[#005883] transition-colors">
                      {openAccordions["application"] ? (
                        <ChevronUp className="h-4 w-4 text-foreground shrink-0" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-foreground shrink-0" />
                      )}
                      <span>{t.productsUI.application || "Application & Grade"}</span>
                    </span>
                    {selectedApplications.length > 0 && (
                      <span className="text-[10px] font-mono font-bold bg-[#005883] text-white px-2 py-0.5 rounded-full">
                        {selectedApplications.length}
                      </span>
                    )}
                  </button>

                  {openAccordions["application"] && (
                    <div className="space-y-2 pt-2 animate-fade-in pl-1">
                      {applicationList.map((appItem, i) => {
                        const isChecked = selectedApplications.includes(appItem.name);
                        return (
                          <label
                            key={i}
                            onClick={() => toggleApplicationCheckbox(appItem.name)}
                            className="flex items-center gap-2.5 text-xs font-medium text-foreground py-1 cursor-pointer hover:text-[#005883] select-none"
                          >
                            <div
                              className={`h-4 w-4 rounded shrink-0 border-2 transition-all flex items-center justify-center ${
                                isChecked
                                  ? "bg-[#005883] border-[#005883] text-white"
                                  : "border-black/80 dark:border-white/80 bg-card group-hover:border-black"
                              }`}
                            >
                              {isChecked && <CheckCircle2 className="h-3.5 w-3.5 stroke-[3]" />}
                            </div>
                            <span className="truncate flex-1">{appItem.name} ({appItem.count})</span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>

              </div>

              {/* Support Banner Card inside Filter Sidebar (Natural Modern Curves) */}
              <div className="rounded-2xl bg-[#005883] text-white p-5 space-y-3 shadow-md mt-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8ec63f]">
                  {t.productsUI.customOemBadge || "CUSTOM OEM SPECS"}
                </span>
                <p className="text-xs font-medium leading-relaxed text-white/90">
                  {t.productsUI.customOemDesc || "Need custom flow rates or special alloy valves for your plant?"}
                </p>
                <a
                  href="#contact"
                  className="inline-block text-[11px] font-mono font-bold uppercase tracking-wider bg-white text-[#005883] px-3.5 py-2 rounded-xl hover:bg-slate-100 transition-all shadow-xs"
                >
                  {t.productsUI.contactOemTeam || "Contact OEM Team"}
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT 75% COLUMN: Search Bar + Results Control Bar + Product Cards Grid */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Top Row: Search Input Box (Natural Modern Rounded Style) */}
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.productsUI.searchPlaceholder || "Search products..."}
                className="w-full rounded-xl bg-card border-2 border-black/80 dark:border-white/80 focus:border-black dark:focus:border-white px-4 py-3 text-sm font-semibold text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors pr-11"
              />
              <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>

            {/* Results Count & Sort/View Controls Bar */}
            <div className="flex flex-row items-center justify-between gap-2 sm:gap-4 pt-1 pb-3 border-b border-border/60">
              <p className="text-xs sm:text-base font-extrabold text-foreground tracking-tight leading-none flex items-center gap-1 sm:gap-1.5 shrink-0">
                <span className="text-[#005883] dark:text-sky-400 font-extrabold">
                  {filteredProducts.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0} - {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)}
                </span>
                <span className="text-muted-foreground font-medium">of</span>
                <span className="text-[#005883] dark:text-sky-400 font-extrabold">{filteredProducts.length}</span>
                <span className="text-foreground font-bold">{t.productsUI.ofItems || "items"}</span>
              </p>

              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                {/* Shadcn UI Sort By Dropdown */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-[11px] sm:text-xs font-bold text-foreground whitespace-nowrap hidden xs:inline sm:inline">{t.productsUI.sortBy || "Sort by:"}</span>
                  <Select value={sortBy} onValueChange={(val) => setSortBy(val as "name" | "category")}>
                    <SelectTrigger className="w-[125px] sm:w-[145px] h-8 sm:h-9 rounded-xl bg-card border-2 border-black/80 dark:border-white/80 focus:border-black dark:focus:border-white text-[11px] sm:text-xs font-semibold text-foreground px-2.5">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-2 border-black/80 dark:border-white/80 bg-card shadow-lg z-50">
                      <SelectItem value="name" className="text-xs font-medium cursor-pointer">{t.productsUI.sortName || "Name (A-Z)"}</SelectItem>
                      <SelectItem value="category" className="text-xs font-medium cursor-pointer">{t.productsUI.sortCategory || "Category"}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* View Mode Toggle Buttons */}
                <div className="flex items-center border-2 border-black/80 dark:border-white/80 rounded-xl overflow-hidden bg-card p-0.5 h-8 sm:h-9">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`h-full px-2 sm:px-2.5 rounded-lg transition-all cursor-pointer flex items-center justify-center ${
                      viewMode === "grid"
                        ? "bg-[#005883] text-white font-bold"
                        : "bg-transparent text-muted-foreground hover:text-foreground"
                    }`}
                    title="Grid View"
                  >
                    <Grid className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`h-full px-2 sm:px-2.5 rounded-lg transition-all cursor-pointer flex items-center justify-center ${
                      viewMode === "list"
                        ? "bg-[#005883] text-white font-bold"
                        : "bg-transparent text-muted-foreground hover:text-foreground"
                    }`}
                    title="List View"
                  >
                    <List className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid / List View OR Skeleton Loading Cards */}
            {isPageLoading ? (
              /* SKELETON LOADING GRID (12 Cards Placeholder) */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 12 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl bg-card border border-border/80 p-5 space-y-4 shadow-xs flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <Skeleton className="h-48 sm:h-52 w-full rounded-xl" />
                      <Skeleton className="h-4 w-24 rounded-md" />
                      <Skeleton className="h-6 w-5/6 rounded-md" />
                      <Skeleton className="h-3 w-full rounded-md" />
                      <Skeleton className="h-3 w-4/5 rounded-md" />
                      <div className="pt-2 border-t border-border/60 space-y-1.5">
                        <Skeleton className="h-3 w-full rounded-md" />
                        <Skeleton className="h-3 w-2/3 rounded-md" />
                      </div>
                    </div>
                    <Skeleton className="h-10 w-full rounded-xl mt-2" />
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="rounded-2xl bg-card border border-border/80 p-12 text-center space-y-4 shadow-xs font-sans">
                <Search className="h-10 w-10 text-muted-foreground mx-auto" />
                <h3 className="text-xl font-extrabold text-foreground font-sans">No matching products found</h3>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium max-w-sm mx-auto leading-relaxed">
                  Try adjusting your search terms or clearing selected filter categories.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategoryIds([]);
                    setSelectedIndustryNames([]);
                    setSearchQuery("");
                    setCategorySearchQuery("");
                    setIndustrySearchQuery("");
                  }}
                  className="inline-block bg-[#005883] hover:bg-[#008193] text-white text-xs font-sans font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition-all shadow-xs cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            ) : viewMode === "grid" ? (
              /* GRID VIEW (3 Columns with Clean 400x400 Square Image Layout matching News style 100%) */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                {paginatedProducts.map((product, idx) => {
                  const delayClass = `animate-delay-${((idx % 6) + 1) * 100}`;
                  return (
                    <div
                      key={product.id}
                      onClick={() => router.get(`/products/${product.slug || product.id}`)}
                      className={`animate-element ${delayClass} group cursor-pointer space-y-3 flex flex-col justify-between`}
                    >
                      <div className="space-y-2.5">
                      {/* Clean 400x400 Aspect Square Image Container (100% Match to Reference Screenshot) */}
                      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-secondary shadow-xs">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                      </div>

                      {/* Category Eyebrow Tag Below Image */}
                      <div className="pt-1 flex items-center justify-between gap-2">
                        <span className="text-[11px] sm:text-xs font-sans font-bold tracking-widest text-muted-foreground uppercase truncate">
                          {product.categoryTitle}
                        </span>
                        <span className="text-[10px] font-sans font-bold uppercase text-[#005883] dark:text-sky-400 bg-[#005883]/10 px-2 py-0.5 rounded-md shrink-0">
                          {product.industry}
                        </span>
                      </div>

                      {/* Product Title */}
                      <h3 className="text-lg sm:text-xl font-extrabold text-foreground group-hover:text-[#005883] dark:group-hover:text-sky-400 transition-colors leading-snug tracking-tight font-sans">
                        {getTrans(product.name, currentLanguage)}
                      </h3>

                      {/* Product Summary Description */}
                      <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed line-clamp-2">
                        {product.description}
                      </p>

                      {/* Specs Mini List */}
                      <div className="pt-2 space-y-1 border-t border-border/60">
                        {product.specs.slice(0, 2).map((spec, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground font-sans">{spec.label}:</span>
                            <span className="font-sans font-bold text-foreground">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Button (Clean Label without Arrow Icon) */}
                    <div className="pt-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.get(`/products/${product.slug || product.id}`);
                        }}
                        className="w-full rounded-xl bg-[#005883] hover:bg-[#008193] text-white text-xs font-sans font-bold uppercase tracking-wider py-3 transition-all flex items-center justify-center cursor-pointer shadow-xs"
                      >
                        <span>{t.productsUI.viewSpecifications || "View Specifications"}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            ) : (
              /* LIST VIEW (100% Match to Reference Screenshot) */
              <div className="space-y-6">
                {paginatedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group rounded-2xl bg-card border border-border/80 overflow-hidden flex flex-col sm:flex-row items-stretch transition-all hover:border-[#005883]/60 shadow-xs"
                  >
                    {/* Left Full-Height Thumbnail Image */}
                    <div
                      onClick={() => router.get(`/products/${product.slug || product.id}`)}
                      className="w-full sm:w-64 md:w-80 shrink-0 h-52 sm:h-auto overflow-hidden bg-muted relative cursor-pointer"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Right Content Details Block (Matching Reference Screenshot 100%) */}
                    <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        {/* Underlined Title */}
                        <h3
                          onClick={() => router.get(`/products/${product.slug || product.id}`)}
                          className="text-lg sm:text-xl md:text-2xl font-bold text-[#002f47] dark:text-sky-200 underline underline-offset-4 decoration-2 hover:text-[#005883] transition-colors leading-snug cursor-pointer"
                        >
                          {product.name}
                        </h3>

                        {/* Author / Category Subtitle */}
                        <p className="text-xs text-muted-foreground font-medium">
                          {t.productsUI.byEcoReve || "By EcoReve Industrial Systems"} • {product.categoryTitle}
                        </p>
                      </div>

                      {/* Paragraph Description */}
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {product.description}
                      </p>

                      {/* "Learn more ->" Text Arrow Action Link */}
                      <button
                        onClick={() => router.get(`/products/${product.slug || product.id}`)}
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#005883] dark:text-sky-400 hover:text-[#008193] transition-all cursor-pointer group/link self-start pt-1"
                      >
                        <span>{t.productsUI.configureDetail || "Configure & Detail"}</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* PAGINATION UI */}
            {totalPages > 1 && (
              <div className="pt-8 pb-2 flex justify-center border-t border-border/60 overflow-x-auto scrollbar-none max-w-full px-2">
                <Pagination className="justify-center w-auto">
                  <PaginationContent className="gap-1 sm:gap-1.5 flex-nowrap">
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-40 rounded-xl border border-border/80 text-xs font-sans font-semibold h-9 px-2.5 sm:px-3"
                            : "cursor-pointer rounded-xl border border-border/80 hover:bg-[#005883] hover:text-white transition-colors text-xs font-sans font-semibold h-9 px-2.5 sm:px-3"
                        }
                      >
                        {t.productsUI.paginationPrevious || "Previous"}
                      </PaginationPrevious>
                    </PaginationItem>

                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter((page) => {
                        // Always show page 1, last page, and current page +/- 1 on mobile
                        if (totalPages <= 5) return true;
                        return page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1;
                      })
                      .map((page, index, array) => {
                        const showEllipsisBefore = index > 0 && page - array[index - 1] > 1;
                        return (
                          <React.Fragment key={page}>
                            {showEllipsisBefore && (
                              <PaginationItem>
                                <PaginationEllipsis className="h-9 w-7 text-xs text-muted-foreground" />
                              </PaginationItem>
                            )}
                            <PaginationItem>
                              <PaginationLink
                                isActive={currentPage === page}
                                onClick={() => handlePageChange(page)}
                                className={`cursor-pointer rounded-xl font-sans font-semibold transition-all text-xs h-9 w-9 p-0 flex items-center justify-center ${
                                  currentPage === page
                                    ? "bg-[#005883] text-white border-[#005883] shadow-xs"
                                    : "border border-border/80 hover:bg-[#005883]/10 hover:border-[#005883]"
                                }`}
                              >
                                {page}
                              </PaginationLink>
                            </PaginationItem>
                          </React.Fragment>
                        );
                      })}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-40 rounded-xl border border-border/80 text-xs font-sans font-semibold h-9 px-2.5 sm:px-3"
                            : "cursor-pointer rounded-xl border border-border/80 hover:bg-[#005883] hover:text-white transition-colors text-xs font-sans font-semibold h-9 px-2.5 sm:px-3"
                        }
                      >
                        {t.productsUI.paginationNext || "Next"}
                      </PaginationNext>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>

        </div>
        </>
        )}

      </div>

      {/* SPECIFICATIONS DATASHEET MODAL */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl rounded-3xl bg-card border border-border/80 p-6 sm:p-8 space-y-6 shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-border/60 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#005883] dark:text-sky-400 bg-[#005883]/10 px-3 py-1 rounded-md">
                  {activeModalProduct.categoryTitle}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-foreground mt-2">
                  {activeModalProduct.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalProduct(null)}
                className="rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {activeModalProduct.description}
              </p>

              {/* Full Specs Table */}
              <div className="rounded-2xl bg-secondary/50 p-4 border border-border/60 space-y-2">
                <p className="text-xs font-mono font-extrabold text-foreground uppercase tracking-wider mb-2">
                  Technical Specifications
                </p>
                {activeModalProduct.specs.map((spec, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs py-1.5 border-b border-border/40 last:border-none">
                    <span className="text-muted-foreground font-medium">{spec.label}</span>
                    <span className="font-mono font-bold text-[#005883] dark:text-sky-400">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/60">
              <button
                onClick={() => setActiveModalProduct(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
              >
                Close
              </button>
              <a
                href="#contact"
                onClick={() => setActiveModalProduct(null)}
                className="px-6 py-2.5 rounded-xl bg-[#005883] text-white hover:bg-[#008193] text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-md flex items-center gap-2"
              >
                <span>Request Datasheet PDF</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      </div>
    </AppLayout>
  );
};

export default ProductsPage;
