import React, { useState, useEffect, useRef } from "react";
import { AppLayout } from "../Layouts/AppLayout";
import { SEOHead } from "@/Components/common/SEOHead";
import {
  Wrench,
  Sliders,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Clock,
  FileCheck2,
  Calendar,
  PhoneCall,
  X,
  Search,
  Sparkles,
  Droplets,
} from "lucide-react";
import servicesBgMonochromeImg from "@/assets/services-bg-monochrome.png";
import newsBgMonochromeImg from "@/assets/news-bg-monochrome.png";
import ctaIsoMonochromeImg from "@/assets/cta-iso-monochrome.png";
import heroBannerImg from "@/assets/hero-banner.webp";
import heroFooterImg from "@/assets/hero-footer.webp";
import { useTranslation } from "@/i18n/useTranslation";
import { getTrans } from "@/utils/transHelper";

export interface ServiceItem {
  id: string | number;
  title: string;
  category: string;
  categoryTitle: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  deliverables: string[];
  turnaroundTime: string;
  metricLabel?: string;
  metricValue?: string;
  metricDesc?: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
}

interface ServicesPageProps {
  services?: any[];
  serviceCategories?: any[];
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  services = [],
  serviceCategories = [],
}) => {
  const { t, currentLanguage } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const servicesCatalogRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [pathTotalLength, setPathTotalLength] = useState<number>(2200);

  // Active Category Filter
  const initialCategoryParam = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "").get("category");
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategoryParam || "all");
  
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("category");
    if (param) {
      setSelectedCategory(param);
    }
  }, [typeof window !== "undefined" ? window.location.search : ""]);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<ServiceItem | null>(null);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Expanding Gallery Section State
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0);

  // Fallback Services Catalog Data
  const fallbackServicesList: ServiceItem[] = [
    {
      id: "installation",
      title: "On-Site Mechanical & Piping Installation",
      category: "system-integration",
      categoryTitle: "System Integration",
      shortDesc: "Complete turn-key mechanical mounting, high-pressure piping alignment, and electrical skid integration.",
      fullDesc: "Our senior mechanical engineers execute precise on-site installation of skid-mounted demineralization plants, DAF flotation units, and chemical dosing pumps. All piping adheres to ISO 15614 welding standards with pressure testing prior to live water introduction.",
      features: [
        "High-pressure SS316L & Duplex piping assembly",
        "Vibration-isolated skid foundation mounting",
        "Control cabinet wiring & Profinet telemetry hookup",
        "Pre-commissioning hydro-test up to 35 Bar",
      ],
      deliverables: [
        "As-Built Piping & Instrumentation Diagram (P&ID)",
        "Pressure Hydro-test Inspection Certificates",
        "Electrical Insulation Safety Compliance Audit",
      ],
      turnaroundTime: "3 - 7 Business Days",
      metricLabel: "IMMERSY",
      metricValue: "+2",
      metricDesc: "Operations expanded to 2 additional neighborhoods.",
      icon: Wrench,
      image: heroBannerImg,
    },
    {
      id: "commissioning",
      title: "Water Quality Testing & Plant Commissioning",
      category: "system-integration",
      categoryTitle: "System Integration",
      shortDesc: "Full-system wet testing, membrane flux optimization, and automated SCADA calibration.",
      fullDesc: "Rigorous operational commissioning validating effluent water conductivity (< 0.1 µS/cm), turbidity removal, and zero liquid discharge efficiency. Includes real-time sensor calibration and emergency blowout safety loop verification.",
      features: [
        "Multi-stage membrane flushing & chemical pre-treatment",
        "SCADA PID loop tuning for chemical dosing pumps",
        "Automated backwash cycle timing optimization",
        "Full-capacity 72-hour continuous endurance trial",
      ],
      deliverables: [
        "Certified Water Quality Analysis Report",
        "PLC Operational Parameter Baseline Sheet",
        "Final Plant Commissioning Sign-off Certificate",
      ],
      turnaroundTime: "2 - 5 Business Days",
      metricLabel: "CHEMICAL SAVINGS",
      metricValue: "38%",
      metricDesc: "Reduced chemical consumption via real-time telemetry feedback loops.",
      icon: Sliders,
      image: heroFooterImg,
    },
    {
      id: "operator-training",
      title: "Certified SOP Operator Training & Control APIs",
      category: "technical-operations",
      categoryTitle: "Technical Operations",
      shortDesc: "Hands-on operator training covering daily SOPs, emergency overrides, and telemetry dashboards.",
      fullDesc: "Empower your industrial plant personnel with comprehensive training modules taught by senior OEM engineers. Covers daily membrane chemical cleaning (CIP), valve maintenance, chemical safety, and SCADA remote monitoring API usage.",
      features: [
        "On-site hands-on simulator & live control panel operation",
        "Clean-In-Place (CIP) chemical batching SOPs",
        "Troubleshooting guide for valve & pump pressure drops",
        "Certified operator completion assessment",
      ],
      deliverables: [
        "Customized Plant Operation Manual (PDF & Printed)",
        "Operator Training Certificates (ISO 9001 standard)",
        "24/7 Digital Quick-Reference SOP Video Access",
      ],
      turnaroundTime: "1 - 3 Training Days",
      metricLabel: "OPERATOR CONFIDENCE",
      metricValue: "95%",
      metricDesc: "95%+ operational efficiency after SOP-based simulator training.",
      icon: Sliders,
      image: heroBannerImg,
    },
    {
      id: "preventative-maintenance",
      title: "24/7 Telemetry Monitoring & Preventative Maintenance",
      category: "lifecycle-maintenance",
      categoryTitle: "Lifecycle Maintenance",
      shortDesc: "Scheduled bi-monthly physical audits, membrane cleaning, and continuous telemetry diagnostics.",
      fullDesc: "Proactive maintenance contracts ensuring zero unscheduled plant downtime. EcoReve technicians perform bi-monthly sensor recalibration, O-ring seal inspection, membrane foulant analysis, and valve actuator lubrication.",
      features: [
        "Bi-monthly physical plant maintenance visits",
        "Remote SCADA telemetry fault alert response within 15 min",
        "Membrane autopsies & chemical CIP rejuvenation",
        "High-wear component preventative replacement",
      ],
      deliverables: [
        "Bi-monthly Mechanical Health Audit Report",
        "Predictive Wear & Tear Risk Matrix",
        "Priority Emergency Technician Dispatch Guarantee",
      ],
      turnaroundTime: "Annual Service Contract (24/7 Response)",
      metricLabel: "UPTIME GUARANTEE",
      metricValue: "99.9%",
      metricDesc: "Continuous real-time water quality monitoring and predictive maintenance alerts.",
      icon: ShieldCheck,
      image: heroFooterImg,
    },
    {
      id: "spare-parts-supply",
      title: "OEM Spare Parts & Rebuild Kits Supply",
      category: "lifecycle-maintenance",
      categoryTitle: "Lifecycle Maintenance",
      shortDesc: "Genuine EcoReve replacement membranes, PVDF valves, ceramic pump diaphragms, and seal kits.",
      fullDesc: "Direct factory inventory access for replacement parts. All components are certified original OEM quality, guaranteed for 100% fit and pressure rating compatibility across all EcoReve water treatment skids.",
      features: [
        "Express 48-hour global air-freight dispatch",
        "Original factory PVDF, EPDM, and Hastelloy C spares",
        "Pre-tested ceramic dosing pump head rebuild kits",
        "Full 12-month manufacturer replacement warranty",
      ],
      deliverables: [
        "Factory Quality Inspection Certificate",
        "Component Compatibility Certificate",
        "Standard Installation Guide & Torque Specs",
      ],
      turnaroundTime: "24 - 48 Hours Dispatch",
      metricLabel: "DISPATCH SPEED",
      metricValue: "48 Hours",
      metricDesc: "Express global air-freight dispatch for all genuine spare parts.",
      icon: Wrench,
      image: heroBannerImg,
    },
  ];

  // Map DB services to ServiceItem format or use fallback
  const servicesList: ServiceItem[] = services && services.length > 0
    ? services.map((s: any) => {
        let parsedFeatures: string[] = [];
        if (Array.isArray(s.features)) {
          parsedFeatures = s.features;
        } else if (typeof s.features === "string") {
          try { parsedFeatures = JSON.parse(s.features); } catch (e) { parsedFeatures = [s.features]; }
        }

        let parsedDeliverables: string[] = [];
        if (Array.isArray(s.deliverables)) {
          parsedDeliverables = s.deliverables;
        } else if (typeof s.deliverables === "string") {
          try { parsedDeliverables = JSON.parse(s.deliverables); } catch (e) { parsedDeliverables = [s.deliverables]; }
        }

        return {
          id: s.id || s.slug,
          title: s.title || "",
          category: s.category_slug || (s.metric_label ? s.metric_label.toLowerCase().replace(/\s+/g, '-') : "system-integration"),
          categoryTitle: s.category_title || s.metric_label || "System Integration",
          shortDesc: s.short_desc || "",
          fullDesc: s.full_desc || s.short_desc || "",
          features: parsedFeatures.length > 0 ? parsedFeatures : ["ISO 9001 Certified Engineering", "Turnkey Skid Assembly"],
          deliverables: parsedDeliverables.length > 0 ? parsedDeliverables : ["Standard Inspection Certificate"],
          turnaroundTime: s.turnaround_time || "3 - 5 Business Days",
          metricLabel: s.metric_label || s.category_title || "ECOREVE",
          metricValue: s.metric_value || "100%",
          metricDesc: s.metric_desc || s.short_desc || "",
          icon: s.icon_name === "Sliders" ? Sliders : s.icon_name === "ShieldCheck" ? ShieldCheck : Wrench,
          image: heroBannerImg,
        };
      })
    : fallbackServicesList;

  // FAQ Items
  const faqList = [
    {
      q: "What is included in the EcoReve On-Site Commissioning service?",
      a: "Our commissioning service covers full mechanical piping inspection, sensor calibration, PLC/SCADA control testing, membrane flushing, hydro-testing, and a 72-hour continuous trial run to guarantee effluent water purity standards.",
    },
    {
      q: "How fast can an EcoReve field engineer arrive for emergency repairs?",
      a: "For contracted clients on our Lifecycle Maintenance agreement, we provide 24/7 telemetry alert monitoring with emergency dispatch within 4 to 12 hours depending on facility location.",
    },
    {
      q: "Can EcoReve service non-EcoReve third-party water treatment systems?",
      a: "Yes. Our senior engineering team provides comprehensive audits, membrane retrofits, valve upgrades, and PLC automation retrofits for third-party water treatment and DAF flotation equipment.",
    },
    {
      q: "Are OEM replacement spare parts covered under warranty?",
      a: "All genuine EcoReve replacement parts come with a 12-month full replacement warranty against material defect or pressure failure under standard operational limits.",
    },
  ];

  // Animated Telemetry SVG Path Scroll Listener
  const statementRef = useRef<HTMLDivElement>(null);
  const [statementProgress, setStatementProgress] = useState<number>(0);

  useEffect(() => {
    if (pathRef.current) {
      try {
        setPathTotalLength(pathRef.current.getTotalLength() || 2200);
      } catch (e) {
        setPathTotalLength(2200);
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
            const totalScrollable = Math.max(1, heroHeight - windowHeight + 200);
            const progress = Math.min(1, Math.max(0, scrolled / totalScrollable));
            setScrollProgress(progress);
          }

          if (statementRef.current) {
            const rect = statementRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const startReveal = windowHeight * 0.85;
            const endReveal = windowHeight * 0.30;
            const progress = Math.min(1, Math.max(0, (startReveal - rect.top) / (startReveal - endReveal)));
            setStatementProgress(progress);
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

  const filteredServices = servicesList.filter((s) => {
    const matchesCat = selectedCategory === "all" || s.category === selectedCategory;
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <AppLayout activeNav="Service">
      <SEOHead
        title="Engineering Services — EcoReve"
        description="Turnkey EPC project execution, environmental consulting, on-site plant commissioning, membrane retrofits, and 24/7 telemetry maintenance."
        url="https://ecoreve.premier-engineering.co.id/services"
      />
      <div className="w-full min-h-screen bg-background text-foreground pb-0">
        {/* SECTION 1: FULL-BLEED CORPORATE BLUE HERO WITH DYNAMIC SERVICES TELEMETRY CURVE */}
        <div
          ref={heroRef}
          className="w-full bg-[#005883] text-white -mt-20 sm:-mt-24 md:-mt-28 px-4 sm:px-6 md:px-8 relative overflow-hidden transition-all duration-300 pt-28 sm:pt-32 md:pt-40 pb-16 sm:pb-24"
        >
        {/* Deep Corporate Blue Base */}
        <div className="absolute inset-0 bg-[#005883] pointer-events-none z-0" />

        {/* Custom Services Industrial Engineering Texture Overlay (Using News Monochrome Background) */}
        <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none opacity-20 mix-blend-overlay">
          <img
            src={newsBgMonochromeImg}
            alt="EcoReve Technical Services Engineering Background"
            className="w-full h-full object-cover object-center scale-105"
          />
        </div>

        {/* Sleek Dynamic Services Telemetry Double S-Curve SVG Line */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden sm:block"
          preserveAspectRatio="none"
          viewBox="0 0 1000 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Static Guide Double-S Curve */}
          <path
            d="M 300 0 C 300 220, 780 180, 780 420 C 780 660, 220 580, 220 800"
            stroke="rgba(255, 255, 255, 0.22)"
            strokeWidth="1.5"
            fill="none"
          />

          {/* Smooth Animated Active Line */}
          <path
            ref={pathRef}
            d="M 300 0 C 300 220, 780 180, 780 420 C 780 660, 220 580, 220 800"
            stroke="#ffffff"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray={pathTotalLength}
            strokeDashoffset={pathTotalLength * (1 - Math.max(0.02, scrollProgress))}
            className="transition-all duration-75 ease-out"
          />
        </svg>

        {/* Hero Headline & Corporate Brand Label Container */}
        <div className="mx-auto max-w-[1440px] relative z-20 space-y-24 sm:space-y-32">
          
          {/* SECTION 1 TOP: Brand Title & Headline */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
            {/* Left Col: Huge Brand Name */}
            <div className="lg:col-span-6 space-y-4">
              <h1 className="animate-element animate-delay-200 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-none">
                {t.servicesUI.heroBrand || "EcoReve"}
              </h1>
              <p className="animate-element animate-delay-300 text-xs font-mono font-bold tracking-widest text-white/70 uppercase">
                {t.servicesUI.heroSubtitle || "QINGDAO TOPOLAR INDUSTRIAL WATER SYSTEMS"}
              </p>
            </div>

            {/* Right Col: Hero Subheadline Paragraph */}
            <div className="lg:col-span-6 pt-2 lg:pt-4 space-y-6">
              <p className="animate-element animate-delay-400 text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-snug tracking-tight max-w-xl">
                {t.servicesUI.heroHeadline || "Full-Lifecycle Engineering, System Integration & 24/7 Telemetry Technical Assistance."}
              </p>
            </div>
          </div>

          {/* SECTION 1.5 MIDDLE: Engineering Standards We Deliver */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-12">
            
            {/* Offset Col to position text directly next to vertical line at 42% */}
            <div className="hidden lg:block lg:col-span-4" />

            {/* Right Text Content Block */}
            <div className="lg:col-span-8 space-y-6">
              <h2 className="animate-element animate-delay-500 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {t.servicesUI.standardsTitle || "Engineering standards we deliver"}
              </h2>

              <div className="animate-element animate-delay-600 space-y-4 text-white/90 text-sm sm:text-base font-medium leading-relaxed max-w-2xl">
                <p>
                  {t.servicesUI.standardsP1 || "Our technical service teams combine mechanical precision with deep process engineering expertise. From turnkey piping assembly and ISO 9001 certified plant commissioning to hands-on SOP operator training and 15-minute emergency telemetry response."}
                </p>
                <p>
                  {t.servicesUI.standardsP2 || "Every service engagement is executed by senior OEM specialists committed to maintaining your water treatment and DAF flotation plant at peak efficiency throughout its operational lifecycle."}
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* SECTION 2: OUR TECHNICAL SERVICES */}
      <div ref={servicesCatalogRef} className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8 pt-12 sm:pt-16 space-y-12 relative z-20">
        
        {/* 2-Column Main Sticky Layout Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* LEFT 5-COLUMNS: STICKY NARRATIVE COLUMN */}
          <div className="reveal lg:col-span-5 lg:sticky lg:top-28 self-start flex flex-col justify-start lg:justify-between space-y-3 lg:space-y-0 min-h-0 lg:min-h-[440px]">
            
            {/* Top Headline Block */}
            <div className="space-y-2 text-left">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-snug sm:leading-[1.08] font-sans">
                {t.servicesUI.stickyHeadline || "We work directly with industrial plants to build systems on EcoReve"}
              </h2>
            </div>

            {/* Bottom Paragraph Block */}
            <div className="pt-1 lg:pt-8 lg:mt-auto text-left">
              <p className="text-xs sm:text-sm md:text-base text-foreground/80 font-medium leading-relaxed max-w-sm">
                {t.servicesUI.stickyParagraph || "Our work is shaped by direct collaboration with plant managers, focusing on systems that integrate into existing workflows rather than replacing them."}
              </p>
            </div>

          </div>

          {/* RIGHT 7-COLUMNS: SCROLLABLE BLUE CARDS STACK */}
          <div className="lg:col-span-7 space-y-5">
            {servicesList.map((service, idx) => (
              <div
                key={service.id}
                className="reveal rounded-2xl bg-[#005883] text-white p-6 sm:p-8 shadow-xl border border-white/20 relative overflow-hidden group cursor-pointer hover:bg-[#00486e] hover:-translate-y-1 transition-all duration-300 grid grid-cols-1 sm:grid-cols-12 gap-6 min-h-[220px] sm:min-h-[250px]"
                onClick={() => setSelectedServiceDetail(service)}
              >
                {/* Left Side inside Card: Small White Badge Only */}
                <div className="sm:col-span-4 flex items-start">
                  <span className="inline-block bg-white/95 backdrop-blur-md text-[#005883] px-3.5 py-1.5 rounded-xl text-[10px] sm:text-[11px] font-sans font-bold tracking-wider shadow-md">
                    {getTrans(service.categoryTitle, currentLanguage)}
                  </span>
                </div>

                {/* Right Side inside Card: Top Title + Bottom Paragraph */}
                <div className="sm:col-span-8 flex flex-col justify-between space-y-6 sm:space-y-10">
                  {/* Top: Proportional Title */}
                  <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white leading-snug tracking-tight font-sans text-left">
                    {getTrans(service.title, currentLanguage)}
                  </h3>

                  {/* Bottom: Proportional Description Paragraph */}
                  <p className="text-xs sm:text-sm text-white/90 font-normal leading-relaxed text-left max-w-md pt-2 mt-auto">
                    {getTrans(service.fullDesc, currentLanguage)}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* SECTION 3: REAL IMPACT & PROVEN RESULTS */}
        <div className="reveal pt-16 sm:pt-20 border-t border-border/60 space-y-10">
          
          {/* Header Block (Proportional scaling across mobile & desktop) */}
          <div className="space-y-0.5 text-left">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
              {t.servicesUI.realImpactLine1 || "Real impact."}
            </h2>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
              {t.servicesUI.realImpactLine2 || "Proven results."}
            </h2>
          </div>

          {/* Main Grid: Left Hero Metric Card + Right 2x2 Grid Stack */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-stretch text-left">
            
            {/* Left 4-Columns: Hero Metric Card (Clean, snug padding) */}
            <div className="lg:col-span-4 rounded-2xl bg-card border border-border/80 p-6 sm:p-8 flex flex-col justify-between shadow-xs relative overflow-hidden group">
              {/* Top Row: Primary Corporate Blue Icon (#005883) + Subtle Circle Ring */}
              <div className="flex items-start justify-between w-full">
                <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl bg-[#005883] text-white flex items-center justify-center shadow-xs">
                  <Droplets className="h-5.5 w-5.5 sm:h-6 sm:w-6 stroke-[2.5]" />
                </div>
                <div className="h-3 w-3 rounded-full border-2 border-muted-foreground/30" />
              </div>

              {/* Bottom Text Content Block */}
              <div className="pt-8 sm:pt-10 space-y-1.5 mt-auto">
                <h3 className="text-lg sm:text-xl font-extrabold text-foreground font-sans tracking-tight">
                  {t.servicesUI.heroMetricTitle || "Plant commissioning setup time"}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed">
                  {t.servicesUI.heroMetricDesc || "Reduced from weeks to 48 hours with pre-tested skid architecture"}
                </p>
              </div>
            </div>

            {/* Right 8-Columns: 2-Column Vertical Stacks with Proportional Spacing & No Stray Bottom Borders */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 lg:gap-x-14 gap-y-5 sm:gap-y-10 items-start pt-2 sm:pt-0">
              
              {/* Left Column Stack (Item 1 & Item 2 on Mobile Stack) */}
              <div className="space-y-5 sm:space-y-10">
                {/* Item 1 */}
                <div className="flex items-start gap-3.5 border-b border-border/40 pb-5 sm:pb-10">
                  <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-[#005883] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <CheckCircle2 className="h-4.5 w-4.5" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-sm sm:text-base font-extrabold text-foreground font-sans">
                      {t.servicesUI.item1Title || "Water quality SLA coverage"}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed">
                      {t.servicesUI.item1Desc || "100% automated effluent conductivity & silica leakage telemetry"}
                    </p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex items-start gap-3.5 border-b border-border/40 pb-5 sm:pb-10">
                  <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-[#005883] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Wrench className="h-4.5 w-4.5" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-sm sm:text-base font-extrabold text-foreground font-sans">
                      {t.servicesUI.item2Title || "Maintenance efficiency"}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed">
                      {t.servicesUI.item2Desc || "60% less time spent on manual valve & dosing pump calibration"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column Stack (Item 3 & Item 4 on Mobile Stack) */}
              <div className="space-y-5 sm:space-y-10">
                {/* Item 3 */}
                <div className="flex items-start gap-3.5 border-b border-border/40 pb-5 sm:pb-10">
                  <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-[#005883] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <FileCheck2 className="h-4.5 w-4.5" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-sm sm:text-base font-extrabold text-foreground font-sans">
                      {t.servicesUI.item3Title || "Operator confidence"}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed">
                      {t.servicesUI.item3Desc || "95%+ operational efficiency after SOP-based simulator training"}
                    </p>
                  </div>
                </div>

                {/* Item 4 (Last item, no bottom border on mobile to avoid stray line) */}
                <div className="flex items-start gap-3.5 pb-1 sm:pb-10">
                  <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-[#005883] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <ShieldCheck className="h-4.5 w-4.5" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-sm sm:text-base font-extrabold text-foreground font-sans">
                      {t.servicesUI.item4Title || "Consistent plant uptime"}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed">
                      {t.servicesUI.item4Desc || "Every SCADA telemetry loop meets ISO 9001 standard — even under high pressure"}
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* SECTION 4: WHAT HAPPENS AFTER THE WORK GOES LIVE (100% Proportional Header Layout) */}
        <div className="pt-16 sm:pt-20 border-t border-border/60 space-y-6 sm:space-y-10 overflow-hidden">
          
          {/* Top Header Row (Proportional scaling across mobile & desktop) */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-6 text-left">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-snug sm:leading-[1.1] font-sans">
                {t.servicesUI.marqueeTitle || "What happens after the work goes live."}
              </h2>
            </div>

            <div className="max-w-md md:text-right">
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-medium">
                {t.servicesUI.marqueeSub || "Beyond delivery, our work is designed to perform. The numbers below reflect how what we build behaves in practice, across markets, products, and stages of growth."}
              </p>
            </div>
          </div>

          {/* Animated Horizontal Marquee Container */}
          <div className="relative w-full overflow-hidden pt-4 pb-2">
            
            {/* Inline CSS Keyframe for Smooth Marquee */}
            <style>{`
              @keyframes marquee-scroll {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
              }
              .animate-marquee-smooth {
                display: flex;
                width: max-content;
                animation: marquee-scroll 35s linear infinite;
              }
              .animate-marquee-smooth:hover {
                animation-play-state: paused;
              }
            `}</style>

            {/* Marquee Track (Duplicated set for seamless loop with tight proportional gap) */}
            <div className="animate-marquee-smooth flex gap-2.5 sm:gap-3">
              {(() => {
                const baseMetrics = servicesList.map((s) => ({
                  logo: getTrans(s.metricLabel || s.categoryTitle || s.title, currentLanguage),
                  stat: s.metricValue || "100%",
                  desc: getTrans(s.metricDesc || s.shortDesc || s.title, currentLanguage),
                }));
                // Duplicate track to ensure smooth continuous infinite scroll loop
                return [...baseMetrics, ...baseMetrics, ...baseMetrics];
              })().map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-white dark:bg-card border border-border/60 p-4 sm:p-5 flex flex-col justify-between w-[220px] sm:w-[260px] h-[150px] sm:h-[175px] shrink-0 shadow-xs hover:border-[#005883]/60 transition-all group"
                >
                  {/* Top Logo / Brand Name */}
                  <div className="text-[11px] sm:text-xs font-sans font-bold tracking-wider text-foreground/80 uppercase">
                    {item.logo}
                  </div>

                  {/* Middle Big Stat Metric */}
                  <div className="text-3xl sm:text-4xl font-extrabold text-foreground font-sans tracking-tight pt-1">
                    {item.stat}
                  </div>

                  {/* Bottom Short Description */}
                  <p className="text-[11px] sm:text-xs text-muted-foreground font-medium leading-relaxed line-clamp-2 pt-1">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* SECTION 5: A BRAND IS RECOGNIZED BEFORE IT IS UNDERSTOOD (100% Match to Reference Screenshot with Scroll Opacity Reveal) */}
        <div ref={statementRef} className="pt-16 sm:pt-24 border-t border-border/60 space-y-10 sm:space-y-14">
          
          {/* Main Statement Headline with Silky Smooth Word-by-Word Scroll Reveal (Matching Reference 100%) */}
          <div className="w-full pl-0 sm:pl-16 md:pl-28 lg:pl-36 pr-4 sm:pr-8 text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-semibold tracking-tight leading-snug sm:leading-[1.28] text-foreground font-sans max-w-5xl">
              {(
                t.servicesUI.scrollRevealText ||
                "A brand is recognized before it is understood. Your visual identity shapes how people recognize you, trust you, and remember you. We help define that difference."
              )
                .split(" ")
                .map((word, idx, arr) => {
                  const wordStart = idx / arr.length;
                  const wordProgress = Math.min(1, Math.max(0, (statementProgress - wordStart * 0.65) / 0.35));
                  const opacity = 0.15 + wordProgress * 0.85;

                  return (
                    <span
                      key={idx}
                      style={{ opacity }}
                      className="transition-opacity duration-200 ease-out inline-block mr-[0.25em] text-[#0d0d0d] dark:text-white"
                    >
                      {word}
                    </span>
                  );
                })}
            </h2>
          </div>

          {/* 5-Column Gallery Pillars Stack (Horizontal Swipeable Cards on Mobile matching Reference 100%, Expanding Accordion on Desktop) */}
          <div
            className="flex flex-row overflow-x-auto scrollbar-none snap-x snap-mandatory md:overflow-visible gap-4 items-stretch h-[460px] md:h-[500px] w-full pt-4 pb-4 md:pb-0"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {[
              {
                id: 0,
                tag: t.servicesUI.pillar0Tag || "Branding",
                title: t.servicesUI.pillar0Title || "Strategy matters",
                subtitle: t.servicesUI.pillar0Sub || "Why brand strategy matters, and how to build one",
                image: heroBannerImg,
                badgeBg: "bg-[#4a5d2e]/80",
              },
              {
                id: 1,
                tag: t.servicesUI.pillar1Tag || "Engineering",
                title: t.servicesUI.pillar1Title || "Precision matters",
                subtitle: t.servicesUI.pillar1Sub || "High-purity water treatment architecture & SCADA telemetry",
                image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80",
                badgeBg: "bg-[#005883]/80",
              },
              {
                id: 2,
                tag: t.servicesUI.pillar2Tag || "Integration",
                title: t.servicesUI.pillar2Title || "Execution matters",
                subtitle: t.servicesUI.pillar2Sub || "Turnkey piping & ISO 9001 certified plant commissioning",
                image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
                badgeBg: "bg-[#008193]/80",
              },
              {
                id: 3,
                tag: t.servicesUI.pillar3Tag || "Telemetry",
                title: t.servicesUI.pillar3Title || "Uptime matters",
                subtitle: t.servicesUI.pillar3Sub || "24/7 remote monitoring with 15-minute emergency response",
                image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
                badgeBg: "bg-[#163140]/80",
              },
              {
                id: 4,
                tag: t.servicesUI.pillar4Tag || "Lifecycle",
                title: t.servicesUI.pillar4Title || "Trust matters",
                subtitle: t.servicesUI.pillar4Sub || "Long-term OEM maintenance & genuine spare parts supply",
                image: heroFooterImg,
                badgeBg: "bg-[#005883]/80",
              },
            ].map((pillar, idx) => {
              const isActive = activeGalleryIndex === idx;
              return (
                <div
                  key={pillar.id}
                  onClick={() => setActiveGalleryIndex(idx)}
                  onMouseEnter={() => setActiveGalleryIndex(idx)}
                  className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-out group shrink-0 w-[275px] sm:w-[320px] snap-start md:shrink md:w-auto ${
                    isActive
                      ? "md:flex-[2.8] shadow-xl ring-2 ring-[#005883]/30"
                      : "md:flex-[1] opacity-90 md:opacity-80 hover:opacity-100 hover:md:flex-[1.4]"
                  }`}
                >
                  {/* Background Image Overlay */}
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20" />

                  {/* Top Left Tag Badge (Natural White-Tinted Ambient Glassmorphism) */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-block rounded-md bg-white/15 backdrop-blur-md border border-white/30 text-white px-3.5 py-1.5 text-xs font-mono font-bold shadow-xs">
                      {pillar.tag}
                    </span>
                  </div>

                  {/* Bottom Left Narrative Text Block (Matching Reference Screenshot 100%) */}
                  <div className="absolute bottom-6 left-6 right-6 z-10 space-y-1.5 text-white text-left">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight font-sans tracking-tight">
                      {pillar.title}
                    </h3>

                    <p
                      className={`text-xs sm:text-sm text-white/80 font-mono font-normal leading-relaxed transition-all duration-300 ${
                        isActive
                          ? "opacity-100 max-h-20 pt-0.5"
                          : "opacity-100 max-h-20 pt-0.5 md:opacity-0 md:max-h-0 md:overflow-hidden md:group-hover:opacity-100 md:group-hover:max-h-20"
                      }`}
                    >
                      {pillar.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* SECTION 6: BUILD WITH US / TALK TO SALES (100% Match to Reference Screenshot: Full-Bleed Edge-to-Edge & Bottom-Right CAD Image Overlay) */}
      <div className="w-full bg-[#005883] text-white relative overflow-hidden mt-20 sm:mt-28 py-16 sm:py-24 md:py-28 px-6 sm:px-12 md:px-20 lg:px-28">
        
        {/* Background CAD Blueprint Image Overlay (Shifted Left with Silky Smooth Natural Gradient Mask Fade) */}
        <div className="absolute right-0 top-0 bottom-0 w-full md:w-[84%] lg:w-[80%] pointer-events-none overflow-hidden z-0 opacity-25 mix-blend-overlay [mask-image:linear-gradient(112deg,transparent_0%,transparent_10%,rgba(0,0,0,0.4)_20%,black_38%)] [-webkit-mask-image:linear-gradient(112deg,transparent_0%,transparent_10%,rgba(0,0,0,0.4)_20%,black_38%)]">
          <img
            src={ctaIsoMonochromeImg}
            alt="EcoReve Industrial Architectural Engineering CAD Blueprint"
            className="w-full h-full object-cover object-center scale-105"
          />
        </div>

        {/* Content Block Container (Aligned with Page Grid, Inter Font Style) */}
        <div className="mx-auto max-w-[1440px] relative z-10 space-y-5 font-sans">
          
          {/* Headline (Proportional Typography Size) */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight font-sans max-w-lg">
            {t.servicesUI.buildWithUsTitle || "Build with us"}
          </h2>

          {/* Paragraph */}
          <p className="text-xs sm:text-sm md:text-base text-white/90 font-sans font-medium leading-relaxed max-w-md">
            {t.servicesUI.buildWithUsDesc || "Share a few details and our engineering infrastructure team will follow up within one business day. If you're close to Qingdao, ask about a tour of our Innovation Hub."}
          </p>

          {/* Action Button */}
          <div className="pt-2">
            <a
              href="#contact"
              className="rounded-xl bg-white text-[#005883] hover:bg-slate-100 px-6 py-3 text-xs sm:text-sm font-sans font-bold uppercase tracking-wider transition-all shadow-md inline-block cursor-pointer"
            >
              {t.servicesUI.contactSalesBtn || "CONTACT SALES"}
            </a>
          </div>

        </div>

      </div>

      {/* SERVICE DETAILS & SPECIFICATIONS MODAL */}
      {selectedServiceDetail !== null && (() => {
        const detail = selectedServiceDetail;
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-2xl rounded-3xl bg-card border border-border/80 p-6 sm:p-8 space-y-6 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 border-b border-border/60 pb-4 text-left">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#005883] dark:text-sky-400 bg-[#005883]/10 px-3 py-1 rounded-md">
                    {getTrans(detail.categoryTitle, currentLanguage)}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-foreground mt-2">
                    {getTrans(detail.title, currentLanguage)}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedServiceDetail(null)}
                  className="rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-all cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="space-y-5 text-left">
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-medium">
                  {getTrans(detail.fullDesc, currentLanguage)}
                </p>

                {/* Technical Scope Features */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-bold uppercase text-foreground tracking-wider">
                    {t.servicesUI.modalScopeTitle || "Technical Execution Scope"}
                  </h4>
                  <div className="rounded-2xl bg-secondary/50 p-4 border border-border/60 space-y-2">
                    {detail.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs py-1">
                        <CheckCircle2 className="h-4 w-4 text-[#005883] dark:text-sky-400 shrink-0" />
                        <span className="text-foreground font-medium">{getTrans(feat, currentLanguage)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Official Deliverables */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-bold uppercase text-foreground tracking-wider">
                    {t.servicesUI.modalDeliverablesTitle || "Client Deliverables & Certificates"}
                  </h4>
                  <div className="rounded-2xl bg-secondary/50 p-4 border border-border/60 space-y-2">
                    {detail.deliverables.map((deliv, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs py-1">
                        <FileCheck2 className="h-4 w-4 text-[#8ec63f] shrink-0" />
                        <span className="text-foreground font-medium">{getTrans(deliv, currentLanguage)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer Action */}
              <div className="pt-4 border-t border-border/60 flex items-center justify-between gap-4">
                <div className="text-xs text-muted-foreground font-mono font-semibold">
                  {t.servicesUI.modalEstTurnaround || "Est. Turnaround:"} <span className="font-bold text-foreground">{getTrans(detail.turnaroundTime, currentLanguage)}</span>
                </div>
                <button
                  onClick={() => setSelectedServiceDetail(null)}
                  className="rounded-xl bg-[#005883] text-white text-xs font-sans font-bold px-6 py-2.5 hover:bg-[#008193] transition-all cursor-pointer shadow-xs"
                >
                  {t.servicesUI.modalCloseBtn || "Close Specification"}
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      </div>
    </AppLayout>
  );
};

export default ServicesPage;
