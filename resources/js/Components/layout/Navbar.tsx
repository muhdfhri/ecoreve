import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Droplets,
  Waves,
  Settings,
  Gauge,
  Cpu,
  Layers,
  Wrench,
  Sliders,
  ShieldCheck,
  X,
} from "lucide-react";
import logoImg from "@/assets/logo.png";
import { useTranslation } from "@/i18n/useTranslation";
import { LanguageDropdown } from "./LanguageDropdown";
import { Link, usePage } from "@inertiajs/react";
import { getTrans } from "@/utils/transHelper";

interface NavbarProps {
  activeNav: string;
  onNavigate: (pageName: string) => void;
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

interface NavSubItem {
  name: string;
  desc: string;
  link: string;
}

interface NavCategory {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: NavSubItem[];
}

export const Navbar: React.FC<NavbarProps> = ({
  activeNav,
  onNavigate,
  isMobileMenuOpen,
  onToggleMobileMenu,
}) => {
  const { t, language } = useTranslation();
  const pageProps = usePage<{
    navProductCategories?: any[];
    navServiceCategories?: any[];
  }>().props;

  const [openDropdown, setOpenDropdown] = useState<"products" | "service" | null>(null);
  const [openLangDropdown, setOpenLangDropdown] = useState(false);

  // Default Icons pool for dynamic DB categories
  const productIconPool = [Droplets, Waves, Settings, Gauge, Cpu, Layers];
  const serviceIconPool = [Wrench, Sliders, ShieldCheck];

  // Current active language code for multi-lang parsing (e.g. 'zh', 'en', 'id', 'ms', 'th')
  const currentLang = language ? language.toLowerCase() : "id";

  // Hardcoded fallback product categories with 5-Language Dictionaries
  const fallbackProductCategories: NavCategory[] = [
    {
      id: "water-treatment",
      title: JSON.stringify({ en: "Water Treatment Series", id: "Seri Pengolahan Air", ms: "Siri Rawatan Air", th: "ชุดระบบบำบัดน้ำ", zh: "水处理系列设备" }),
      icon: Droplets,
      items: [
        {
          name: JSON.stringify({ en: "Demineralization Plant (Anion & Cation)", id: "Plant Demineralisasi (Anion & Kation)", ms: "Loji Demineralisasi (Anion & Kation)", th: "ระบบผลิตน้ำบริสุทธิ์ Demineralization", zh: "去离子纯水设备（阴阳离子）" }),
          desc: JSON.stringify({ en: "High-capacity dual-bed ion exchange demineralizer removing silica (SiO₂) and dissolved ions.", id: "Penukar ion dual-bed kapasitas tinggi menghapus silika (SiO₂) dan ion terlarut.", ms: "Penukar ion dual-bed kapasiti tinggi menghapuskan silika (SiO₂) dan ion terlarut.", th: "ระบบแลกเปลี่ยนไอออนความจุสูงถอดซิลิกาและไอออน", zh: "高容量双床离子交换去离子水设备，精准去除二氧化硅及溶解离子。" }),
          link: "/products/demin-plant",
        },
        {
          name: JSON.stringify({ en: "Hardness Mineral Softener System", id: "Sistem Pelembut Mineral Kesadahan", ms: "Sistem Pelembut Mineral Keras", th: "ระบบลดความกระด้างของน้ำ", zh: "硬水软化系统" }),
          desc: JSON.stringify({ en: "Automatic counter-current regeneration softener plant engineered for zero-hardness boiler feedwater.", id: "Plant pelembut regenerasi otomatis untuk air umpan boiler bebas kesadahan.", ms: "Loji pelembut regenerasi automatik untuk air dandang bebas kekerasan.", th: "ระบบฟื้นฟูเรซินอัตโนมัติสำหรับน้ำป้อนหม้อไอน้ำ", zh: "逆流自动再生软化水设备，专为锅炉补给水零硬度设计。" }),
          link: "/products?category=water-treatment",
        },
        {
          name: JSON.stringify({ en: "PE High-Density Mixing & Storage Tank", id: "Tangki Pencampur & Penyimpanan PE High-Density", ms: "Tangki Pencampur & Penyimpanan PE Ketumpatan Tinggi", th: "ถังผสมและถังเก็บ PE ความหนาแน่นสูง", zh: "PE高密度搅拌与储存储罐" }),
          desc: JSON.stringify({ en: "Rotationally molded seamless polyethylene dosing & storage tanks with UV stabilization.", id: "Tangki dosis & penyimpanan polietilena tanpa sambungan dengan stabilisasi UV.", ms: "Tangki dos & penyimpanan polietilena tanpa sambungan dengan stabilisasi UV.", th: "ถังตักสารเคมีและถังเก็บ PE ไร้รอยต่อกัน UV", zh: "滚塑无缝聚乙烯加药与储存罐，具有抗紫外线及耐酸碱特性。" }),
          link: "/products?category=water-treatment",
        },
        {
          name: JSON.stringify({ en: "Precision Automatic Chemical Dosing Pump", id: "Pompa Dosis Kimia Otomatis Presisi", ms: "Pam Dos Kimia Automatik Presisi", th: "ปั๊มตวงสารเคมีอัตโนมัติความแม่นยำสูง", zh: "精密自动化学加药计量泵" }),
          desc: JSON.stringify({ en: "Solenoid & motor-driven diaphragm metering pumps for accurate chemical injection.", id: "Pompa meteran diafragma otomatis untuk injeksi bahan kimia presisi.", ms: "Pam meteran diafragma automatik untuk suntikan bahan kimia presisi.", th: "ปั๊มไดอะแฟรมจ่ายสารเคมีแม่นยำสูง", zh: "电磁及电机驱动隔膜计量泵，用于精准加药与药剂喷射。" }),
          link: "/products?category=water-treatment",
        },
        {
          name: JSON.stringify({ en: "Ultrafiltration (UF) Membrane Skid Unit", id: "Unit Skid Membran Ultrafiltrasi (UF)", ms: "Unit Skid Membran Ultrafiltrasi (UF)", th: "ระบบเมมเบรนอัลตราฟิลเตรชัน (UF)", zh: "超滤（UF）膜撬装设备" }),
          desc: JSON.stringify({ en: "Containerized hollow-fiber ultrafiltration plant with automatic backwash manifold.", id: "Plant ultrafiltrasi serabut berongga kontainer dengan pembersihan otomatis.", ms: "Loji ultrafiltrasi gentian berongga kontena dengan pembersihan automatik.", th: "ระบบเมมเบรน UF แบบตู้คอนเทนเนอร์พร้อมระบบล้างกลับ", zh: "集装箱式中空纤维超滤设备，配备自动反冲洗及气擦洗歧管。" }),
          link: "/products?category=water-treatment",
        },
        {
          name: JSON.stringify({ en: "High-Rejection Brackish RO Membrane System", id: "Sistem Membran RO Air Payau Rejeki Tinggi", ms: "Sistem Membran RO Air Payau Penolakan Tinggi", th: "ระบบรีเวิร์สออสโมซิส (RO) อัตราแยกสูง", zh: "高脱盐率苦咸水反渗透（RO）膜系统" }),
          desc: JSON.stringify({ en: "Multi-stage reverse osmosis system removing up to 99.7% of total dissolved solids.", id: "Sistem reverse osmosis multi-stage menghapus hingga 99.7% total padatan terlarut.", ms: "Sistem reverse osmosis multi-stage menghapuskan sehingga 99.7% jumlah pepejal terlarut.", th: "ระบบ RO หลายขั้นตอนกำจัดสารละลายได้สูงสุด 99.7%", zh: "多级反渗透系统，溶解性总固体（TDS）脱除率高达99.7%。" }),
          link: "/products?category=water-treatment",
        },
      ],
    },
    {
      id: "wastewater-pretreatment",
      title: JSON.stringify({ en: "Wastewater Pre-Treatment", id: "Pra-Pengolahan Air Limbah", ms: "Pra-Rawatan Air Sisa", th: "ระบบบำบัดน้ำเสียขั้นต้น", zh: "废水预处理系统" }),
      icon: Waves,
      items: [
        {
          name: JSON.stringify({ en: "Horizontal Dissolved Air Flotation (DAF)", id: "Flotasi Udara Terlarut Horizontal (DAF)", ms: "Flotasi Udara Terlarut Horizontal (DAF)", th: "ระบบแยกไขมันและตะกอน DAF แบบแนวนอน", zh: "卧式溶气气浮机（DAF）" }),
          desc: JSON.stringify({ en: "High-Capacity Suspended Solids & Oil Separation Cell", id: "Separasi Padatan Tersuspensi & Minyak Kapasitas Tinggi", ms: "Pemisahan Pepejal Terampai & Minyak Kapasiti Tinggi", th: "ระบบแยกน้ำมันและสารแขวนลอยความจุสูง", zh: "高效微气泡气浮系统，用于去除悬浮物（TSS）、油脂及降低COD。" }),
          link: "/products?category=wastewater-pretreatment",
        },
        {
          name: JSON.stringify({ en: "Containerized Sludge Dewatering Unit", id: "Unit Dewatering Lumpur Kontainer", ms: "Unit Pengeringan Lumpur Kontena", th: "ระบบรีดน้ำตะกอนแบบคอนเทนเนอร์", zh: "集装箱式污泥脱水设备" }),
          desc: JSON.stringify({ en: "Integrated geotube sludge dewatering system with automated polymer preparation.", id: "Sistem dewatering lumpur geotube terintegrasi dengan preparasi polimer.", ms: "Sistem dewatering lumpur geotube terintegrasi dengan penyediaan polimer.", th: "ระบบรีดน้ำตะกอนก้อนพร้อมการเตรียมโพลิเมอร์อัตโนมัติ", zh: "集成式土工管袋污泥脱水系统，配备自动聚合物配制设备。" }),
          link: "/products?category=wastewater-pretreatment",
        },
      ],
    },
    {
      id: "valves-fittings",
      title: JSON.stringify({ en: "Valves & Fittings", id: "Katup & Fitting Pipa", ms: "Injap & Kelengkapan Paip", th: "วาล์วและอุปกรณ์ฟิตติ้ง", zh: "阀门与管件管道" }),
      icon: Settings,
      items: [
        {
          name: JSON.stringify({ en: "Zero-Leakage High Performance Butterfly Valve", id: "Katup Kupu-Kupu Performa Tinggi Bebas Bocor", ms: "Injap Rama-Rama Prestasi Tinggi Bebas Bocor", th: "วาล์วผีเสื้อประสิทธิภาพสูงป้องกันการรั่วซึม", zh: "零泄漏高性能蝶阀" }),
          desc: JSON.stringify({ en: "Zero-Leakage Chemical Grade Control Valve for corrosive pipelines.", id: "Katup kontrol kelas kimia bebas bocor untuk pipa korosif.", ms: "Injap kawalan gred kimia bebas bocor untuk paip hakisan.", th: "วาล์วควบคุมเกรดเคมีป้องกันการรั่วซึม", zh: "双偏心软密封蝶阀，用于腐蚀性化学管道及高压输水。" }),
          link: "/products?category=valves-fittings",
        },
        {
          name: JSON.stringify({ en: "Disco Check Valve", id: "Katup Cek Disco", ms: "Injap Semak Disco", th: "ดิสก์เช็ควาล์ว", zh: "迪斯克止回阀" }),
          desc: JSON.stringify({ en: "Compact Non-Return Check Valve for Piping Systems", id: "Katup Cek Non-Return Kompak untuk Sistem Perpipaan", ms: "Injap Semak Kompak untuk Paip", th: "วาล์วกันขากลับขนาดกระทัดรัด", zh: "紧凑型无返流止回阀，适用于管道系统。" }),
          link: "/products?category=valves-fittings",
        },
      ],
    },
    {
      id: "measurement-instruments",
      title: JSON.stringify({ en: "Measurement Instruments", id: "Instrumen Pengukuran & Analisis", ms: "Instrumen Pengukuran", th: "เครื่องมือวัด analysis", zh: "测量分析仪器" }),
      icon: Gauge,
      items: [
        {
          name: JSON.stringify({ en: "Online Turbidity Meter", id: "Meter Kejernihan / Kekeruhan Online", ms: "Meter Kekeruhan Dalam Talian", th: "เครื่องวัดความขุ่นแบบออนไลน์", zh: "在线浊度分析仪" }),
          desc: JSON.stringify({ en: "Continuous Water Clarity & Suspended Particle Monitor", id: "Monitor Kejernihan Air & Partikel Tersuspensi Kontinu", ms: "Pemantauan Kejernihan Air Berterusan", th: "เครื่องวัดความใสของน้ำต่อเนื่อง", zh: "连续光学水质清晰度及悬浮颗粒监测仪。" }),
          link: "/products?category=measurement-instruments",
        },
      ],
    },
    {
      id: "automation-sensors",
      title: JSON.stringify({ en: "Automation & Sensors", id: "Otomasi & Sensor Kontrol", ms: "Automasi & Sensor", th: "ระบบระบบอัตโนมัติและเซนเซอร์", zh: "自动化与传感器控制" }),
      icon: Cpu,
      items: [
        {
          name: JSON.stringify({ en: "Magnetic Flap Level Gauge", id: "Pengukur Level Flap Magnetik", ms: "Tolok Paras Flap Magnetik", th: "เกจวัดระดับแบบแถบแม่เหล็ก", zh: "磁翻板液位计" }),
          desc: JSON.stringify({ en: "High Visibility Tank Liquid Level Telemetry", id: "Telemetri Level Cairan Tangki Visibilitas Tinggi", ms: "Telemetri Paras Cecair Tangki Visibiliti Tinggi", th: "เกจวัดระดับน้ำในถังความแม่นยำสูง", zh: "高能见度罐体液位遥测及远传指示器。" }),
          link: "/products?category=automation-sensors",
        },
      ],
    },
  ];

  // Hardcoded fallback service categories with 5-Language Dictionaries
  const fallbackServiceCategories: NavCategory[] = [
    {
      id: "system-integration",
      title: JSON.stringify({ en: "System Integration", id: "Integrasi Sistem", ms: "Integrasi Sistem", th: "การรวมระบบ", zh: "系统集成服务" }),
      icon: Wrench,
      items: [
        {
          name: JSON.stringify({ en: "Installation (Instalasi)", id: "Instalasi Mekanikal & Perpipaan", ms: "Pemasangan Mekanikal", th: "การติดตั้งระบบและท่อ", zh: "机械与管道安装工程" }),
          desc: JSON.stringify({ en: "On-Site Mechanical & Piping Engineering", id: "Teknik Mekanikal & Perpipaan Lapangan", ms: "Kejuruteraan Mekanikal Lapangan", th: "วิศวกรรมการติดตั้งท่อและเครื่องจักร", zh: "现场机械组装、高压管道铺设与系统集成。" }),
          link: "/service?category=system-integration",
        },
        {
          name: JSON.stringify({ en: "Commissioning (Uji Operasional)", id: "Komisioning & Uji Operasional", ms: "Ujian Operasi & Komisen", th: "การทดสอบและปรับตั้งระบบ", zh: "水质检测与调试运行" }),
          desc: JSON.stringify({ en: "Water Quality Testing & Plant Calibration", id: "Pengujian Kualitas Air & Kalibrasi Plant", ms: "Ujian Kualiti Air & Kalibrasi Loji", th: "การทดสอบคุณภาพน้ำและการปรับแต่งระบบ", zh: "全系统湿态测试、膜通量优化与自动化校准。" }),
          link: "/service?category=system-integration",
        },
      ],
    },
    {
      id: "technical-operations",
      title: JSON.stringify({ en: "Technical Operations", id: "Operasi Teknis & Pelatihan", ms: "Operasi Teknikal", th: "การปฏิบัติการทางเทคนิค", zh: "技术运维与培训" }),
      icon: Sliders,
      items: [
        {
          name: JSON.stringify({ en: "Training (Pelatihan Operator)", id: "Pelatihan Operator & SOP", ms: "Latihan Operator", th: "การฝึกอบรมผู้ดูแลระบบ", zh: "操作员SOP认证培训" }),
          desc: JSON.stringify({ en: "Certified SOP Operator Training & Control APIs", id: "Pelatihan SOP Operator Tersertifikasi & Kontrol", ms: "Latihan SOP Operator Berbertauliah", th: "การฝึกอบรมคู่มือปฏิบัติงาน SOP", zh: "专业SOP操作员培训、数据仪表盘及控制API转交。" }),
          link: "/service?category=technical-operations",
        },
      ],
    },
    {
      id: "lifecycle-maintenance",
      title: JSON.stringify({ en: "Lifecycle Maintenance", id: "Pemeliharaan & Suku Cadang", ms: "Penyelenggaraan Suku Cadang", th: "การบำรุงรักษาตามระยะ", zh: "全生命周期运维与备件" }),
      icon: ShieldCheck,
      items: [
        {
          name: JSON.stringify({ en: "Maintenance & Support", id: "Layanan Pemeliharaan & Dukungan 24/7", ms: "Penyelenggaraan 24/7", th: "บริการบำรุงรักษา 24/7", zh: "24/7遥测监测与预防性维护" }),
          desc: JSON.stringify({ en: "24/7 Telemetry Monitoring & Preventative Repairs", id: "Pemantauan Telemetri 24/7 & Perbaikan Preventif", ms: "Pemantauan Telemetri 24/7 & Pembaikan", th: "การเฝ้าระวังผ่านระบบระบบควบคุมระยะไกล 24/7", zh: "24/7全天候远程遥测监测及定期预防性巡检与维修。" }),
          link: "/service?category=lifecycle-maintenance",
        },
        {
          name: JSON.stringify({ en: "Spare Parts Supply", id: "Pasokan Suku Cadang Asli OEM", ms: "Bekalan Suku Cadang Asli", th: "การจัดหาอะไหล่แท้ OEM", zh: "原厂OEM备品备件供应" }),
          desc: JSON.stringify({ en: "OEM Membranes, Valves & Pump Rebuild Kits", id: "Membran OEM, Katup & Kit Perbaikan Pompa", ms: "Membran OEM, Injak & Kit Pam", th: "เมมเบรน วาล์ว และชุดซ่อมปั๊มแท้ OEM", zh: "原厂膜元件、控制阀门、泵浦检修包及滤芯供应。" }),
          link: "/service?category=lifecycle-maintenance",
        },
      ],
    },
  ];

  // Dynamic Product Categories from DB or Fallback
  const rawProductCategories = pageProps.navProductCategories && pageProps.navProductCategories.length > 0
    ? pageProps.navProductCategories
    : fallbackProductCategories;

  const productCategories: NavCategory[] = rawProductCategories.map((cat: any, idx: number) => ({
    id: cat.id || `prod-cat-${idx}`,
    title: getTrans(cat.title || cat.name, currentLang),
    icon: cat.icon || productIconPool[idx % productIconPool.length],
    items: (cat.items && cat.items.length > 0)
      ? cat.items.map((it: any) => ({
          name: getTrans(it.name, currentLang),
          desc: getTrans(it.desc, currentLang) || "High-efficiency industrial water solution",
          link: it.link || "/products",
        }))
      : [{ name: getTrans("Catalog Equipment", currentLang), desc: getTrans("Industrial purification unit", currentLang), link: "/products" }],
  }));

  // Dynamic Service Categories from DB or Fallback
  const rawServiceCategories = pageProps.navServiceCategories && pageProps.navServiceCategories.length > 0
    ? pageProps.navServiceCategories
    : fallbackServiceCategories;

  const serviceCategories: NavCategory[] = rawServiceCategories.map((cat: any, idx: number) => ({
    id: cat.id || `serv-cat-${idx}`,
    title: getTrans(cat.title || cat.name, currentLang),
    icon: cat.icon || serviceIconPool[idx % serviceIconPool.length],
    items: (cat.items && cat.items.length > 0)
      ? cat.items.map((it: any) => ({
          name: getTrans(it.name, currentLang),
          desc: getTrans(it.desc, currentLang) || "Industrial technical service & engineering",
          link: it.link || "/service",
        }))
      : [{ name: getTrans("Technical Service", currentLang), desc: getTrans("On-site engineering support", currentLang), link: "/service" }],
  }));

  // Active Category Selection state for Products & Service Mega Menu
  const [activeProductCategory, setActiveProductCategory] = useState<string>(productCategories[0]?.id || "water-treatment");
  const [activeServiceCategory, setActiveServiceCategory] = useState<string>(serviceCategories[0]?.id || "system-integration");

  // Keep selected tab in sync if DB data loads dynamically
  useEffect(() => {
    if (productCategories.length > 0 && !productCategories.some(c => c.id === activeProductCategory)) {
      setActiveProductCategory(productCategories[0].id);
    }
  }, [productCategories]);

  useEffect(() => {
    if (serviceCategories.length > 0 && !serviceCategories.some(c => c.id === activeServiceCategory)) {
      setActiveServiceCategory(serviceCategories[0].id);
    }
  }, [serviceCategories]);

  // Mobile multi-level menu panel state ("main" | "products" | "service")
  const [mobileActivePanel, setMobileActivePanel] = useState<"main" | "products" | "service">("main");

  // Reset mobile menu panel level when drawer opens or closes
  useEffect(() => {
    if (!isMobileMenuOpen) {
      setMobileActivePanel("main");
    }
  }, [isMobileMenuOpen]);

  // Guaranteed non-null fallback to prevent TS undefined errors
  const currentProductCat = productCategories.find((c) => c.id === activeProductCategory) ?? productCategories[0];
  const currentServiceCat = serviceCategories.find((c) => c.id === activeServiceCategory) ?? serviceCategories[0];

  return (
    <>
      {/* Background Dark Blur Overlay with Smooth Fade In/Out */}
      <div
        onClick={() => {
          setOpenDropdown(null);
          if (isMobileMenuOpen) onToggleMobileMenu();
        }}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ease-in-out cursor-pointer ${
          openDropdown || isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      <header className="sticky top-0 z-50 pt-2.5 pb-1 bg-transparent transition-all">
        <div className="mx-auto max-w-[1440px] px-3 sm:px-6 md:px-8 relative">

          {/* Main Top Header Floating Container */}
          <div
            onMouseLeave={() => setOpenDropdown(null)}
            className={`bg-white dark:bg-card border border-border/80 shadow-md transition-[padding,margin,opacity,box-shadow] duration-300 ease-out ${
              openDropdown
                ? "p-6 md:p-8 rounded-[2.5rem]"
                : isMobileMenuOpen
                ? "px-4 sm:px-6 pt-2 pb-5 rounded-[2rem]"
                : "px-4 sm:px-6 py-2 rounded-full"
            }`}
          >
            {/* Top Bar Header Row (Logo + Center Nav Links + Language Selector + Mobile Toggle) */}
            <div className="flex items-center justify-between gap-2.5 sm:gap-4">
              {/* Left Brand Logo */}
              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href="/"
                  prefetch
                  onClick={() => {
                    setOpenDropdown(null);
                    if (isMobileMenuOpen) onToggleMobileMenu();
                  }}
                >
                  <img
                    src={logoImg}
                    alt="EcoReve Logo"
                    className="h-7 sm:h-8 md:h-9 w-auto object-contain cursor-pointer drop-shadow-sm"
                  />
                </Link>
              </div>

              {/* Center Desktop Navigation Item Links */}
              <ul className="hidden lg:flex items-center gap-1.5 text-xs font-semibold">
                <li>
                  <Link
                    href="/"
                    prefetch
                    onMouseEnter={() => setOpenDropdown(null)}
                    onClick={() => setOpenDropdown(null)}
                    className={`inline-block cursor-pointer transition-all duration-200 rounded-full px-4 py-2 ${
                      activeNav === "Home" && !openDropdown
                        ? "bg-[#005883] text-white shadow-sm font-bold"
                        : "text-foreground hover:text-primary"
                    }`}
                  >
                    {t.nav.home}
                  </Link>
                </li>

                {/* Products Link with Dropdown */}
                <li
                  className={`relative flex items-center gap-1 cursor-pointer transition-all duration-200 rounded-full px-4 py-2 ${
                    activeNav.startsWith("Products") || openDropdown === "products"
                      ? "bg-[#005883] text-white shadow-sm font-bold"
                      : "text-foreground hover:text-primary"
                  }`}
                  onMouseEnter={() => setOpenDropdown("products")}
                >
                  <Link
                    href="/products"
                    prefetch
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-center gap-1"
                  >
                    <span>{t.nav.products}</span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${
                        openDropdown === "products" ? "rotate-180" : ""
                      }`}
                    />
                  </Link>
                </li>

                {/* Service Link with Dropdown */}
                <li
                  className={`relative flex items-center gap-1 cursor-pointer transition-all duration-200 rounded-full px-4 py-2 ${
                    activeNav.startsWith("Service") || openDropdown === "service"
                      ? "bg-[#005883] text-white shadow-sm font-bold"
                      : "text-foreground hover:text-primary"
                  }`}
                  onMouseEnter={() => setOpenDropdown("service")}
                >
                  <Link
                    href="/service"
                    prefetch
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-center gap-1"
                  >
                    <span>{t.nav.service}</span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${
                        openDropdown === "service" ? "rotate-180" : ""
                      }`}
                    />
                  </Link>
                </li>

                <li>
                  <Link
                    href="/about-us"
                    prefetch
                    onMouseEnter={() => setOpenDropdown(null)}
                    onClick={() => setOpenDropdown(null)}
                    className={`inline-block cursor-pointer transition-all duration-200 rounded-full px-4 py-2 ${
                      activeNav === "About us" && !openDropdown
                        ? "bg-[#005883] text-white shadow-sm font-bold"
                        : "text-foreground hover:text-primary"
                    }`}
                  >
                    {t.nav.aboutUs}
                  </Link>
                </li>

                <li>
                  <Link
                    href="/news"
                    prefetch
                    onClick={() => setOpenDropdown(null)}
                    className={`inline-block cursor-pointer transition-all duration-200 rounded-full px-4 py-2 ${
                      activeNav === "News" && !openDropdown
                        ? "bg-[#005883] text-white shadow-sm font-bold"
                        : "text-foreground hover:text-primary"
                    }`}
                  >
                    {t.nav.news}
                  </Link>
                </li>

                <li>
                  <Link
                    href="/contact"
                    prefetch
                    onClick={() => setOpenDropdown(null)}
                    className={`inline-block cursor-pointer transition-all duration-200 rounded-full px-4 py-2 ${
                      activeNav === "Contact" && !openDropdown
                        ? "bg-[#005883] text-white shadow-sm font-bold"
                        : "text-foreground hover:text-primary"
                    }`}
                  >
                    {t.nav.contact}
                  </Link>
                </li>
              </ul>

              {/* Right Controls: Language Selector + Mobile Toggle */}
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                {/* Language Dropdown Selector */}
                <LanguageDropdown
                  open={openLangDropdown}
                  onToggle={() => setOpenLangDropdown(!openLangDropdown)}
                  onClose={() => setOpenLangDropdown(false)}
                />

                {/* Mobile Hamburger / Close Toggle Button */}
                <button
                  type="button"
                  onClick={onToggleMobileMenu}
                  aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                  className={`flex lg:hidden h-9 w-9 items-center justify-center rounded-full shadow-xs transition-all duration-200 active:scale-95 cursor-pointer ${
                    isMobileMenuOpen
                      ? "bg-secondary text-foreground hover:bg-muted"
                      : "bg-[#005883] text-white hover:bg-[#00486e]"
                  }`}
                >
                  {isMobileMenuOpen ? (
                    <X className="h-5 w-5 stroke-[2.5]" />
                  ) : (
                    <div className="flex flex-col gap-1 items-center justify-center">
                      <span className="h-0.5 w-4 bg-white rounded-full" />
                      <span className="h-0.5 w-4 bg-white rounded-full" />
                      <span className="h-0.5 w-4 bg-white rounded-full" />
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* PRODUCTS Mega Menu Panel Content (Desktop Only) */}
            {openDropdown === "products" && (
              <div className="pt-8 mt-6 border-t border-border/60 animate-in fade-in-0 slide-in-from-top-1 duration-200 grid grid-cols-12 gap-8 items-stretch text-left hidden lg:grid">
                {/* Left 8 Columns (Split into Left Category Tabs List + Right Sub-items List) */}
                <div className="col-span-12 lg:col-span-8 grid grid-cols-12 gap-6 border-r border-border/50 pr-4">
                  {/* Left Column (Category Tabs List with Clean Outline Icons) */}
                  <div className="col-span-12 sm:col-span-5 border-r border-border/40 pr-3 space-y-1.5">
                    <p className="text-[10px] font-extrabold tracking-widest text-muted-foreground uppercase mb-3 px-3">
                      {t.nav.categories}
                    </p>
                    {productCategories.map((cat) => {
                      const IconComp = cat.icon;
                      const isActive = activeProductCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setActiveProductCategory(cat.id)}
                          onMouseEnter={() => setActiveProductCategory(cat.id)}
                          className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                            isActive
                              ? "bg-white dark:bg-card border border-border/90 text-foreground font-extrabold shadow-xs"
                              : "border border-transparent text-foreground hover:bg-secondary hover:text-[#005883]"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <IconComp className="h-4.5 w-4.5 shrink-0 text-[#005883] dark:text-sky-400 stroke-[2.2]" />
                            <span className="truncate">{cat.title}</span>
                          </div>
                          <ChevronRight
                            className={`h-3.5 w-3.5 shrink-0 transition-transform ${
                              isActive ? "translate-x-0.5 text-[#005883] dark:text-sky-400" : "opacity-30"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>

                  {/* Right Column (Sub-Items Pure Text List without Arrow Icons) */}
                  <div className="col-span-12 sm:col-span-7 pl-1 space-y-4">
                    {/* Header Row */}
                    <div className="flex items-center justify-between border-b border-border/40 pb-2.5">
                      <h3 className="text-sm font-extrabold text-foreground tracking-tight">
                        {getTrans(currentProductCat?.title, currentLang)}
                      </h3>
                      <Link
                        href={`/products?category=${currentProductCat?.id || 'water-treatment'}`}
                        onClick={() => setOpenDropdown(null)}
                        className="group/btn relative overflow-hidden text-[10px] font-extrabold tracking-wider uppercase cursor-pointer border border-[#005883]/40 dark:border-sky-400/40 px-3.5 py-1.5 rounded-full transition-all duration-300 shadow-2xs"
                      >
                        {/* Slide-Up Corporate Blue Background Overlay */}
                        <span className="absolute inset-0 bg-[#005883] dark:bg-sky-500 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out z-0" />
                        
                        {/* Button Text Label */}
                        <span className="relative z-10 text-[#005883] dark:text-sky-400 group-hover/btn:text-white transition-colors duration-300">
                          {t.common.viewAll}
                        </span>
                      </Link>
                    </div>

                    {/* Sub-Items Clean Text-Only List */}
                    <div className="space-y-1.5 max-h-[340px] overflow-y-auto pr-1">
                      {currentProductCat?.items.map((item, idx) => (
                        <Link
                          key={item.name + idx}
                          href={item.link || `/products?category=${currentProductCat?.id}`}
                          onClick={() => setOpenDropdown(null)}
                          className="group block w-full text-left p-2.5 rounded-xl hover:bg-[#005883]/10 dark:hover:bg-[#005883]/20 border border-transparent hover:border-[#005883]/30 transition-all cursor-pointer"
                        >
                          <div className="space-y-0.5 text-left">
                            <h4 className="text-xs font-extrabold text-foreground group-hover:text-[#005883] dark:group-hover:text-sky-400 transition-colors">
                              {getTrans(item.name, currentLang)}
                            </h4>
                            <p className="text-[11px] text-muted-foreground leading-snug line-clamp-1">
                              {getTrans(item.desc, currentLang)}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Featured Visual Portal Banner Card */}
                <div className="col-span-12 lg:col-span-4 rounded-[2rem] bg-[#0d222e] text-white p-7 flex flex-col justify-between relative overflow-hidden shadow-xl border border-white/10 group min-h-[300px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#005883] via-[#008193]/50 to-[#08131a] z-0" />
                  <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-[#008193]/50 blur-3xl z-0" />

                  <div className="relative z-10">
                    <span className="inline-block rounded-full bg-white/20 px-3.5 py-1 text-[10px] font-extrabold tracking-wider text-white border border-white/30 backdrop-blur uppercase">
                      ECOREVE PORTAL
                    </span>
                    <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight mt-6">
                      {t.nav.portalTitle}
                    </h3>
                    <p className="mt-3 text-xs text-white/80 leading-relaxed max-w-xs">
                      {t.nav.portalSubtitle}
                    </p>
                  </div>

                  <div className="relative z-10 mt-8">
                    <Link
                      href="/contact"
                      onClick={() => setOpenDropdown(null)}
                      className="w-full flex items-center justify-between rounded-full bg-white text-black px-6 py-3.5 text-xs font-bold shadow-lg transition-transform group-hover:scale-[1.02] active:scale-95 cursor-pointer"
                    >
                      <span>{t.nav.requestCatalog}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* SERVICE Mega Menu Panel Content (Desktop Only) */}
            {openDropdown === "service" && (
              <div className="pt-8 mt-6 border-t border-border/60 animate-in fade-in-0 slide-in-from-top-1 duration-200 grid grid-cols-12 gap-8 items-stretch text-left hidden lg:grid">
                {/* Left 8 Columns (Split into Left Category Tabs List + Right Sub-items List) */}
                <div className="col-span-12 lg:col-span-8 grid grid-cols-12 gap-6 border-r border-border/50 pr-4">
                  {/* Left Column (Category Tabs List with Clean Outline Icons) */}
                  <div className="col-span-12 sm:col-span-5 border-r border-border/40 pr-3 space-y-1.5">
                    <p className="text-[10px] font-extrabold tracking-widest text-muted-foreground uppercase mb-3 px-3">
                      {t.nav.serviceCategories}
                    </p>
                    {serviceCategories.map((cat) => {
                      const IconComp = cat.icon;
                      const isActive = activeServiceCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setActiveServiceCategory(cat.id)}
                          onMouseEnter={() => setActiveServiceCategory(cat.id)}
                          className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                            isActive
                              ? "bg-white dark:bg-card border border-border/90 text-foreground font-extrabold shadow-xs"
                              : "border border-transparent text-foreground hover:bg-secondary hover:text-[#005883]"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <IconComp className="h-4.5 w-4.5 shrink-0 text-[#005883] dark:text-sky-400 stroke-[2.2]" />
                            <span className="truncate">{cat.title}</span>
                          </div>
                          <ChevronRight
                            className={`h-3.5 w-3.5 shrink-0 transition-transform ${
                              isActive ? "translate-x-0.5 text-[#005883] dark:text-sky-400" : "opacity-30"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>

                  {/* Right Column (Sub-Items Pure Text List without Arrow Icons) */}
                  <div className="col-span-12 sm:col-span-7 pl-1 space-y-4">
                    {/* Header Row */}
                    <div className="flex items-center justify-between border-b border-border/40 pb-2.5">
                      <h3 className="text-sm font-extrabold text-foreground tracking-tight">
                        {getTrans(currentServiceCat?.title, currentLang)}
                      </h3>
                      <Link
                        href={`/service?category=${currentServiceCat?.id || 'system-integration'}`}
                        onClick={() => setOpenDropdown(null)}
                        className="group/btn relative overflow-hidden text-[10px] font-extrabold tracking-wider uppercase cursor-pointer border border-[#005883]/40 dark:border-sky-400/40 px-3.5 py-1.5 rounded-full transition-all duration-300 shadow-2xs"
                      >
                        {/* Slide-Up Corporate Blue Background Overlay */}
                        <span className="absolute inset-0 bg-[#005883] dark:bg-sky-500 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out z-0" />
                        
                        {/* Button Text Label */}
                        <span className="relative z-10 text-[#005883] dark:text-sky-400 group-hover/btn:text-white transition-colors duration-300">
                          {t.common.viewAll}
                        </span>
                      </Link>
                    </div>

                    {/* Sub-Items Clean Text-Only List */}
                    <div className="space-y-1.5 max-h-[340px] overflow-y-auto pr-1">
                      {currentServiceCat?.items.map((item, idx) => (
                        <Link
                          key={item.name + idx}
                          href={item.link || `/service?category=${currentServiceCat?.id}`}
                          onClick={() => setOpenDropdown(null)}
                          className="group block w-full text-left p-2.5 rounded-xl hover:bg-[#005883]/10 dark:hover:bg-[#005883]/20 border border-transparent hover:border-[#005883]/30 transition-all cursor-pointer"
                        >
                          <div className="space-y-0.5 text-left">
                            <h4 className="text-xs font-extrabold text-foreground group-hover:text-[#005883] dark:group-hover:text-sky-400 transition-colors">
                              {getTrans(item.name, currentLang)}
                            </h4>
                            <p className="text-[11px] text-muted-foreground leading-snug line-clamp-1">
                              {getTrans(item.desc, currentLang)}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Featured Visual Portal Banner Card */}
                <div className="col-span-12 lg:col-span-4 rounded-[2rem] bg-[#1a2328] text-white p-7 flex flex-col justify-between relative overflow-hidden shadow-xl border border-white/10 group min-h-[300px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#008193] via-[#005883]/60 to-[#0d222e] z-0" />
                  <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-[#8ec63f]/30 blur-3xl z-0" />

                  <div className="relative z-10">
                    <span className="inline-block rounded-full bg-white/20 px-3.5 py-1 text-[10px] font-extrabold tracking-wider text-white border border-white/30 backdrop-blur uppercase">
                      ENGINEERING SERVICES
                    </span>
                    <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight mt-6">
                      {t.servicesUI.heroBadge}
                    </h3>
                    <p className="mt-3 text-xs text-white/80 leading-relaxed max-w-xs">
                      {t.servicesUI.standardsP1 || "High-purity water treatment architecture & 24/7 SCADA telemetry technical support."}
                    </p>
                  </div>

                  <div className="relative z-10 mt-8">
                    <Link
                      href="/contact"
                      onClick={() => setOpenDropdown(null)}
                      className="w-full flex items-center justify-between rounded-full bg-[#1a2328] text-white px-6 py-3.5 text-xs font-bold shadow-lg transition-transform group-hover:scale-[1.02] active:scale-95 cursor-pointer"
                    >
                      <span>{t.nav.scheduleSupport}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* MULTI-LEVEL MOBILE MENU CONTAINER */}
            <div
              className={`grid transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
                isMobileMenuOpen
                  ? "grid-rows-[1fr] opacity-100 mt-3 pt-3 border-t border-border/40"
                  : "grid-rows-[0fr] opacity-0 mt-0 pt-0 border-t-0"
              }`}
            >
              <div className="overflow-hidden font-sans">
                {/* LEVEL 1: MAIN NAVIGATION LEVEL */}
                {mobileActivePanel === "main" && (
                  <div className="space-y-0.5 text-left animate-in slide-in-from-left-4 fade-in-0 duration-300">
                    {/* Item 1: Products */}
                    <div className="border-b border-border/40">
                      <button
                        type="button"
                        onClick={() => setMobileActivePanel("products")}
                        className="w-full py-3 flex items-center justify-between text-base font-extrabold text-foreground hover:text-[#005883] transition-colors cursor-pointer"
                      >
                        <span>{t.nav.products}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground/70" />
                      </button>
                    </div>

                    {/* Item 2: Service */}
                    <div className="border-b border-border/40">
                      <button
                        type="button"
                        onClick={() => setMobileActivePanel("service")}
                        className="w-full py-3 flex items-center justify-between text-base font-extrabold text-foreground hover:text-[#005883] transition-colors cursor-pointer"
                      >
                        <span>{t.nav.service}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground/70" />
                      </button>
                    </div>

                    {/* Item 3: About Us */}
                    <div className="border-b border-border/40">
                      <Link
                        href="/about-us"
                        onClick={onToggleMobileMenu}
                        className="w-full py-3 flex items-center justify-between text-base font-extrabold text-foreground hover:text-[#005883] transition-colors cursor-pointer"
                      >
                        <span>{t.nav.aboutUs}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground/70" />
                      </Link>
                    </div>

                    {/* Item 4: News */}
                    <div className="border-b border-border/40">
                      <Link
                        href="/news"
                        onClick={onToggleMobileMenu}
                        className="w-full py-3 flex items-center justify-between text-base font-extrabold text-foreground hover:text-[#005883] transition-colors cursor-pointer"
                      >
                        <span>{t.nav.news}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground/70" />
                      </Link>
                    </div>

                    {/* Item 5: Contact */}
                    <div>
                      <Link
                        href="/contact"
                        onClick={onToggleMobileMenu}
                        className="w-full py-3 flex items-center justify-between text-base font-extrabold text-foreground hover:text-[#005883] transition-colors cursor-pointer"
                      >
                        <span>{t.nav.contact}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground/70" />
                      </Link>
                    </div>
                  </div>
                )}

                {/* LEVEL 2: PRODUCTS SUB-MENU PANEL */}
                {mobileActivePanel === "products" && (
                  <div className="space-y-4 text-left animate-in slide-in-from-right-4 fade-in-0 duration-300">
                    <button
                      type="button"
                      onClick={() => setMobileActivePanel("main")}
                      className="flex items-center gap-1.5 text-base font-extrabold text-foreground hover:text-[#005883] transition-colors py-1 cursor-pointer"
                    >
                      <ChevronLeft className="h-4.5 w-4.5 text-foreground" />
                      <span>Back</span>
                    </button>

                    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1 pt-1">
                      {productCategories.map((cat) => {
                        const IconComp = cat.icon;
                        return (
                          <div key={cat.id} className="space-y-1">
                            <div className="flex items-center gap-2 pb-1.5 pt-2 border-b border-border/40">
                              <IconComp className="h-4 w-4 shrink-0 text-[#005883] dark:text-sky-400 stroke-[2.2]" />
                              <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
                                {getTrans(cat.title, currentLang)}
                              </h4>
                            </div>

                            <div className="space-y-0.5 pl-3.5 pt-1">
                              {cat.items.map((item, idx) => (
                                <Link
                                  key={item.name + idx}
                                  href={item.link || `/products?category=${cat.id}`}
                                  onClick={onToggleMobileMenu}
                                  className="w-full block text-left py-2 px-3 rounded-xl hover:bg-secondary/70 transition-colors group cursor-pointer"
                                >
                                  <p className="text-sm font-extrabold text-foreground group-hover:text-[#005883] dark:group-hover:text-sky-400 transition-colors">
                                    {getTrans(item.name, currentLang)}
                                  </p>
                                  <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                                    {getTrans(item.desc, currentLang)}
                                  </p>
                                </Link>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* LEVEL 2: SERVICE SUB-MENU PANEL */}
                {mobileActivePanel === "service" && (
                  <div className="space-y-4 text-left animate-in slide-in-from-right-4 fade-in-0 duration-300">
                    <button
                      type="button"
                      onClick={() => setMobileActivePanel("main")}
                      className="flex items-center gap-1.5 text-base font-extrabold text-foreground hover:text-[#005883] transition-colors py-1 cursor-pointer"
                    >
                      <ChevronLeft className="h-4.5 w-4.5 text-foreground" />
                      <span>Back</span>
                    </button>

                    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1 pt-1">
                      {serviceCategories.map((cat) => {
                        const IconComp = cat.icon;
                        return (
                          <div key={cat.id} className="space-y-1">
                            <div className="flex items-center gap-2 pb-1.5 pt-2 border-b border-border/40">
                              <IconComp className="h-4 w-4 shrink-0 text-[#005883] dark:text-sky-400 stroke-[2.2]" />
                              <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
                                {getTrans(cat.title, currentLang)}
                              </h4>
                            </div>

                            <div className="space-y-0.5 pl-3.5 pt-1">
                              {cat.items.map((item, idx) => (
                                <Link
                                  key={item.name + idx}
                                  href={item.link || `/service?category=${cat.id}`}
                                  onClick={onToggleMobileMenu}
                                  className="w-full block text-left py-2 px-3 rounded-xl hover:bg-secondary/70 transition-colors group cursor-pointer"
                                >
                                  <p className="text-sm font-extrabold text-foreground group-hover:text-[#005883] dark:group-hover:text-sky-400 transition-colors">
                                    {getTrans(item.name, currentLang)}
                                  </p>
                                  <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                                    {getTrans(item.desc, currentLang)}
                                  </p>
                                </Link>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>
      </header>
    </>
  );
};