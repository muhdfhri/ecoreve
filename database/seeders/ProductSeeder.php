<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        // Clear existing tables
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('category_product')->truncate();
        DB::table('products')->truncate();
        DB::table('categories')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // 1. Seed 5 Official Product Categories (JSON 5 Languages)
        $catWater = DB::table('categories')->insertGetId([
            'name' => json_encode([
                'en' => 'Water Treatment Series',
                'id' => 'Seri Pengolahan Air',
                'ms' => 'Siri Rawatan Air',
                'th' => 'ซีรีส์ระบบบำบัดน้ำ',
                'zh' => '水处理系列设备'
            ]),
            'slug' => 'water-treatment',
            'description' => json_encode([
                'en' => 'Industrial high-purity water demineralization, softening & ion exchange systems.',
                'id' => 'Sistem demineralisasi, pelunakan & pertukaran ion air murni tinggi untuk industri.',
                'ms' => 'Sistem demineralisasi, pelembutan & pertukaran ion air tulen tinggi industri.',
                'th' => 'ระบบกำจัดแร่ธาตุ การทำให้น้ำอ่อน และการแลกเปลี่ยนไอออนความบริสุทธิ์สูง',
                'zh' => '工业高纯水脱盐、软化及离子交换处理系统。'
            ]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $catWastewater = DB::table('categories')->insertGetId([
            'name' => json_encode([
                'en' => 'Wastewater Pre-Treatment',
                'id' => 'Pra-Pengolahan Air Limbah',
                'ms' => 'Pra-Rawatan Air Sisa',
                'th' => 'การเตรียมบำบัดน้ำเสีย',
                'zh' => '废水预处理系统'
            ]),
            'slug' => 'wastewater-pretreatment',
            'description' => json_encode([
                'en' => 'High-capacity DAF flotation, sludge dewatering & MBR membrane cells.',
                'id' => 'Flotasi DAF kapasitas tinggi, dewatering lumpur & sel membran MBR.',
                'ms' => 'Pengapungan DAF kapasiti tinggi, penyahairan enapcemar & sel membran MBR.',
                'th' => 'ระบบ DAF ความจุสูง การรีดน้ำโคลน และเมมเบรน MBR',
                'zh' => '大容量 DAF 气浮、污泥脱水与 MBR 膜组件。'
            ]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $catValves = DB::table('categories')->insertGetId([
            'name' => json_encode([
                'en' => 'Valves & Fittings',
                'id' => 'Katup & Fitting',
                'ms' => 'Injap & Lengkapan',
                'th' => 'วาล์วและอุปกรณ์ท่อ',
                'zh' => '阀门与管件管道'
            ]),
            'slug' => 'valves-fittings',
            'description' => json_encode([
                'en' => 'Heavy-duty pneumatic butterfly valves, pressure vessels & actuators.',
                'id' => 'Katup kupu-kupu pneumatik tugas berat, bejana tekan & aktuator.',
                'ms' => 'Injap rama-rama pneumatik tugas berat, bejana tekanan & penggerak.',
                'th' => 'วาล์วผีเสื้อนิวแมติก ถังแรงดัน และแอคชูเอเตอร์',
                'zh' => '重型气动蝶阀、压力容器与执行器。'
            ]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $catInstruments = DB::table('categories')->insertGetId([
            'name' => json_encode([
                'en' => 'Measurement Instruments',
                'id' => 'Instrumen Pengukuran',
                'ms' => 'Instrumen Pengukuran',
                'th' => 'เครื่องมือวัดและเซนเซอร์',
                'zh' => '测量分析仪器'
            ]),
            'slug' => 'measurement-instruments',
            'description' => json_encode([
                'en' => 'Inline electromagnetic flowmeters, optical turbidity meters & TOC analyzers.',
                'id' => 'Pengukur aliran elektromagnetik inline, pengukur kekeruhan optik & penganalisis TOC.',
                'ms' => 'Meter aliran elektromagnetik segaris, meter kekeruhan optik & penganalisis TOC.',
                'th' => 'เครื่องวัดการไหลแม่เหล็กไฟฟ้า เครื่องวัดความขุ่น และเครื่องวิเคราะห์ TOC',
                'zh' => '在线管道电磁流量计、光学浊度计与 TOC 测量仪。'
            ]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $catAutomation = DB::table('categories')->insertGetId([
            'name' => json_encode([
                'en' => 'Automation & Sensors',
                'id' => 'Otomasi & Sensor',
                'ms' => 'Automatik & Sensor',
                'th' => 'ระบบอัตโนมัติและเซนเซอร์',
                'zh' => '自动化与传感器控制'
            ]),
            'slug' => 'automation-sensors',
            'description' => json_encode([
                'en' => 'Centralized SCADA telemetry PLCs, digital pH sensors & automated dosing skids.',
                'id' => 'PLC telemetri SCADA terpusat, sensor pH digital & skid dosis otomatis.',
                'ms' => 'PLC telemetri SCADA terpusat, sensor pH digital & skid dos automatik.',
                'th' => 'PLC มอนิเตอร์ SCADA เซนเซอร์ pH ดิจิทัล และสคิดจ่ายสารเคมี',
                'zh' => '集中式 SCADA 遥测 PLC、数字 pH 传感器与自动加药框架。'
            ]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Default options array (2x4 grid capacities)
        $defaultOptions = [
            ['id' => 'N', 'name' => 'N or N+1', 'range' => 'Under 50 m³/h'],
            ['id' => '1', 'name' => '1', 'range' => '50-100 m³/h'],
            ['id' => '2', 'name' => '2', 'range' => '100-250 m³/h'],
            ['id' => '3', 'name' => '3', 'range' => '250-500 m³/h'],
            ['id' => '4', 'name' => '4', 'range' => '500-1,000 m³/h'],
            ['id' => '5', 'name' => '5', 'range' => '1,000-2,000 m³/h'],
            ['id' => '6', 'name' => '6', 'range' => '2,000-5,000 m³/h'],
            ['id' => '7', 'name' => '7', 'range' => 'Custom OEM Skid'],
        ];

        // Default accordions array
        $defaultAccordions = [
            [
                'title' => 'Size + pack details',
                'content' => 'Pre-assembled skid frame with Siemens PLC control unit and quick-connect PN16 flanged manifold. Shipped in IPPC-certified container skid.'
            ],
            [
                'title' => 'Clean materials & specs',
                'content' => '100% corrosion-resistant LLDPE / Duplex SS316L vessel shell certified for PN16 pressure ratings with PVDF/PTFE chemical diaphragms.'
            ],
            [
                'title' => 'Why we love it',
                'content' => 'Cuts annual chemical dosing consumption by up to 38%. Zero liquid discharge (ZLD) compliance with real-time SCADA telemetry APIs.'
            ],
            [
                'title' => 'Subscriber & OEM exclusive benefits',
                'content' => "Backed by EcoReve's 5-Year Structural Vessel Warranty & 2-Year Full Electronics Telemetry Replacement Guarantee."
            ],
        ];

        // 2. All 25 Official Products Data
        $rawProducts = [
            [
                'name' => 'Demineralization Plant (Anion & Cation)',
                'slug' => 'demin-plant',
                'cat_id' => $catWater,
                'short_desc' => 'High-capacity dual-bed ion exchange demineralizer removing silica (SiO₂) and dissolved ions down to 0.05 µS/cm conductivity.',
                'featured' => true,
            ],
            [
                'name' => 'Hardness Mineral Softener System',
                'slug' => 'softener-plant',
                'cat_id' => $catWater,
                'short_desc' => 'Automatic counter-current regeneration softener plant engineered for zero-hardness boiler feedwater and cooling towers.',
                'featured' => true,
            ],
            [
                'name' => 'PE High-Density Mixing & Storage Tank',
                'slug' => 'pe-mixing-tank',
                'cat_id' => $catWater,
                'short_desc' => 'Rotationally molded seamless polyethylene dosing & storage tanks with UV stabilization and acid/alkali resistance.',
                'featured' => false,
            ],
            [
                'name' => 'Precision Automatic Chemical Dosing Pump',
                'slug' => 'dosing-pump',
                'cat_id' => $catWater,
                'short_desc' => 'Solenoid & motor-driven diaphragm metering pumps for accurate coagulant, acid, and alkaline chemical injection.',
                'featured' => false,
            ],
            [
                'name' => 'Horizontal Dissolved Air Flotation (DAF)',
                'slug' => 'daf-flotation',
                'cat_id' => $catWastewater,
                'short_desc' => 'High-efficiency micro-bubble flotation system for suspended solids (TSS), oil & grease, and COD pre-treatment reduction.',
                'featured' => true,
            ],
            [
                'name' => 'Containerized Sludge Dewatering Unit',
                'slug' => 'geotube-dewatering',
                'cat_id' => $catWastewater,
                'short_desc' => 'Integrated geotube sludge dewatering system with automated polymer preparation and continuous cake dewatering.',
                'featured' => false,
            ],
            [
                'name' => 'Zero-Leakage High-Performance Butterfly Valve',
                'slug' => 'butterfly-valve',
                'cat_id' => $catValves,
                'short_desc' => 'Double eccentric resilient seated butterfly valves for corrosive chemical pipelines and high-pressure water transmission.',
                'featured' => true,
            ],
            [
                'name' => 'Pneumatic Control Valve Actuator Assembly',
                'slug' => 'pneumatic-actuator',
                'cat_id' => $catValves,
                'short_desc' => 'Rack & pinion double-acting pneumatic actuator with NAMUR solenoid valve interface and optical position indicator.',
                'featured' => false,
            ],
            [
                'name' => 'Industrial Electromagnetic Flow Meter',
                'slug' => 'electromagnetic-flowmeter',
                'cat_id' => $catInstruments,
                'short_desc' => 'High-accuracy inline electromagnetic flow meter with PTFE lining and Hastelloy C electrodes for aggressive fluids.',
                'featured' => false,
            ],
            [
                'name' => 'Digital Online pH & Conductivity Sensor',
                'slug' => 'ph-conductivity-sensor',
                'cat_id' => $catAutomation,
                'short_desc' => 'Industrial glass-free digital sensor probe with automatic temperature compensation for continuous SCADA monitoring.',
                'featured' => false,
            ],
            [
                'name' => 'SCADA Telemetry Controller & PLC Unit',
                'slug' => 'scada-telemetry-plc',
                'cat_id' => $catAutomation,
                'short_desc' => 'Centralized SCADA telemetry cabinet with touchscreen HMI interface, IoT cloud remote sync, and fail-safe safety relays.',
                'featured' => true,
            ],
            [
                'name' => 'Ultrafiltration (UF) Membrane Skid Unit',
                'slug' => 'ultrafiltration-uf',
                'cat_id' => $catWater,
                'short_desc' => 'Containerized hollow-fiber ultrafiltration plant with automatic backwash and air-scour chemical cleaning manifold.',
                'featured' => true,
            ],
            [
                'name' => 'High-Rejection Brackish RO Membrane System',
                'slug' => 'ro-membrane-unit',
                'cat_id' => $catWater,
                'short_desc' => 'Multi-stage reverse osmosis system removing up to 99.7% of total dissolved solids (TDS) for ultra-pure boiler feed.',
                'featured' => false,
            ],
            [
                'name' => 'Zero Liquid Discharge (ZLD) Evaporator Skid',
                'slug' => 'zld-crystallizer',
                'cat_id' => $catWastewater,
                'short_desc' => 'Mechanical vapor recompression (MVR) falling film evaporator converting industrial brine into solid salt crystals.',
                'featured' => true,
            ],
            [
                'name' => 'Submerged MBR Wastewater Membrane Module',
                'slug' => 'submerged-mbr',
                'cat_id' => $catWastewater,
                'short_desc' => 'Submerged flat-sheet membrane bioreactor cassettes designed for high-COD industrial wastewater purification.',
                'featured' => false,
            ],
            [
                'name' => 'Automatic Backwash Multi-Media Sand Filter',
                'slug' => 'multi-media-filter',
                'cat_id' => $catWater,
                'short_desc' => 'Pressure sand and anthracite multi-layer depth filtration vessel for suspended solids and turbidity removal.',
                'featured' => false,
            ],
            [
                'name' => 'Industrial Granular Activated Carbon Vessel',
                'slug' => 'activated-carbon',
                'cat_id' => $catWater,
                'short_desc' => 'High-surface-area virgin coconut shell activated carbon adsorber removing free chlorine, organics, and color.',
                'featured' => false,
            ],
            [
                'name' => 'High-Output Ultraviolet Water Disinfection Unit',
                'slug' => 'uv-sterilizer',
                'cat_id' => $catInstruments,
                'short_desc' => 'Stainless steel SS316L chamber UV sterilizer destroying 99.99% of biological pathogens without chemical additives.',
                'featured' => false,
            ],
            [
                'name' => 'Real-time Online TOC & COD Water Analyzer',
                'slug' => 'toc-analyzer',
                'cat_id' => $catInstruments,
                'short_desc' => 'UV oxidation & NDIR detection online TOC analyzer for ultra-pure water loops and effluent discharge compliance.',
                'featured' => true,
            ],
            [
                'name' => 'Laser Turbidity & TSS Sensor Probe',
                'slug' => 'turbidity-transmitter',
                'cat_id' => $catInstruments,
                'short_desc' => '90° scattered light infrared turbidity sensor probe with wiper self-cleaning mechanism for raw water monitoring.',
                'featured' => false,
            ],
            [
                'name' => 'High-Concentration Industrial Ozone Generator',
                'slug' => 'ozone-generator',
                'cat_id' => $catWater,
                'short_desc' => 'Water-cooled ceramic dielectric tube ozone generator producing high-purity O₃ gas for Advanced Oxidation Processes (AOP).',
                'featured' => false,
            ],
            [
                'name' => 'Multi-Disk Sludge Dehydration Screw Press',
                'slug' => 'sludge-screw-press',
                'cat_id' => $catWastewater,
                'short_desc' => 'Non-clogging volute multi-disk screw press dewatering oily and biological sludge with minimal wash water.',
                'featured' => true,
            ],
            [
                'name' => 'Duplex SS316L RO Membrane Vessel Housing',
                'slug' => 'high-pressure-ro-housing',
                'cat_id' => $catValves,
                'short_desc' => 'ASME certified 8-inch high-pressure membrane pressure vessels engineered for high-salinity seawater RO skids.',
                'featured' => false,
            ],
            [
                'name' => 'Polishing Mixed-Bed Ion Exchange Vessel',
                'slug' => 'ion-exchange-mixed-bed',
                'cat_id' => $catWater,
                'short_desc' => 'Pre-mixed nuclear-grade cation & anion resin polishing vessel guaranteeing 18.2 MΩ·cm ultra-pure water quality.',
                'featured' => false,
            ],
            [
                'name' => 'Dual-Pump Automated Polymer Dosing Skid',
                'slug' => 'chemical-dosing-skid',
                'cat_id' => $catAutomation,
                'short_desc' => 'Fully automated dry powder polymer wetting and liquid dosing system with dual duty/standby diaphragm pumps.',
                'featured' => false,
            ],
        ];

        $thProductNames = [
            'Demineralization Plant (Anion & Cation)' => 'ระบบผลิตน้ำบริสุทธิ์ Demineralization (Anion & Cation)',
            'Hardness Mineral Softener System' => 'ระบบลดความกระด้างของน้ำ (Softener System)',
            'PE High-Density Mixing & Storage Tank' => 'ถังผสมและถังเก็บ PE ความหนาแน่นสูง',
            'Precision Automatic Chemical Dosing Pump' => 'ปั๊มตวงสารเคมีอัตโนมัติความแม่นยำสูง',
            'Horizontal Dissolved Air Flotation (DAF)' => 'ระบบแยกไขมันและตะกอน DAF แบบแนวนอน',
            'Containerized Sludge Dewatering Unit' => 'ระบบรีดน้ำตะกอนแบบคอนเทนเนอร์',
            'Zero-Leakage High-Performance Butterfly Valve' => 'วาล์วผีเสื้อประสิทธิภาพสูงป้องกันการรั่วซึม',
            'Pneumatic Control Valve Actuator Assembly' => 'ชุดแอคชูเอเตอร์วาล์วควบคุมนิวแมติก',
            'Industrial Electromagnetic Flow Meter' => 'เครื่องวัดการไหลแม่เหล็กไฟฟ้าอุตสาหกรรม',
            'Digital Online pH & Conductivity Sensor' => 'ดิจิทัลเซนเซอร์ pH และความนำไฟฟ้าออนไลน์',
            'SCADA Telemetry Controller & PLC Unit' => 'ชุดควบคุม SCADA Telemetry และ PLC',
            'Ultrafiltration (UF) Membrane Skid Unit' => 'ระบบเมมเบรนอัลตราฟิลเตรชัน (UF)',
            'High-Rejection Brackish RO Membrane System' => 'ระบบเมมเบรน RO สำหรับน้ำเค็มกร่อยอัตราแยกสูง',
            'Zero Liquid Discharge (ZLD) Evaporator Skid' => 'เครื่องระเหย Zero Liquid Discharge (ZLD)',
            'Submerged MBR Wastewater Membrane Module' => 'ชุดเมมเบรน MBR แบบจุ่มสำหรับน้ำเสีย',
            'Automatic Backwash Multi-Media Sand Filter' => 'ถังกรองทรายมัลติมีเดียล้างกลับอัตโนมัติ',
            'Industrial Granular Activated Carbon Vessel' => 'ถังกรองคาร์บอนกัมมันต์อุตสาหกรรม',
            'High-Output Ultraviolet Water Disinfection Unit' => 'เครื่องฆ่าเชื้อด้วยรังสีอัลตราไวโอเลตประสิทธิภาพสูง',
            'Real-time Online TOC & COD Water Analyzer' => 'เครื่องวิเคราะห์ TOC & COD แบบออนไลน์เรียลไทม์',
            'Laser Turbidity & TSS Sensor Probe' => 'หัววัดเซนเซอร์ความขุ่นเลเซอร์และ TSS',
            'High-Concentration Industrial Ozone Generator' => 'เครื่องกำเนิดโอโซนอุตสาหกรรมความเข้มข้นสูง',
            'Multi-Disk Sludge Dehydration Screw Press' => 'เครื่องรีดน้ำตะกอนแบบสครูว์เพรส',
            'Duplex SS316L RO Membrane Vessel Housing' => 'ท่ออัดแรงดันเมมเบรน RO สแตนเลส Duplex SS316L',
            'Polishing Mixed-Bed Ion Exchange Vessel' => 'ถังแลกเปลี่ยนไอออน Mixed-Bed บริสุทธิ์สูง',
            'Dual-Pump Automated Polymer Dosing Skid' => 'ชุดจ่ายสารโพลิเมอร์อัตโนมัติปั๊มคู่',
        ];

        $zhProductNames = [
            'Demineralization Plant (Anion & Cation)' => '去离子纯水设备（阴阳离子）',
            'Hardness Mineral Softener System' => '硬水软化系统',
            'PE High-Density Mixing & Storage Tank' => 'PE高密度搅拌与储存储罐',
            'Precision Automatic Chemical Dosing Pump' => '精密自动化学加药计量泵',
            'Horizontal Dissolved Air Flotation (DAF)' => '卧式溶气气浮机（DAF）',
            'Containerized Sludge Dewatering Unit' => '集装箱式污泥脱水设备',
            'Zero-Leakage High-Performance Butterfly Valve' => '零泄漏高性能蝶阀',
            'Pneumatic Control Valve Actuator Assembly' => '气动控制阀执行器组件',
            'Industrial Electromagnetic Flow Meter' => '工业电磁流量计',
            'Digital Online pH & Conductivity Sensor' => '数字在线pH及电导率传感器',
            'SCADA Telemetry Controller & PLC Unit' => 'SCADA遥测控制器及PLC单元',
            'Ultrafiltration (UF) Membrane Skid Unit' => '超滤（UF）膜撬装设备',
            'High-Rejection Brackish RO Membrane System' => '高脱盐率苦咸水反渗透（RO）膜系统',
            'Zero Liquid Discharge (ZLD) Evaporator Skid' => '零液体排放（ZLD）蒸发器撬块',
            'Submerged MBR Wastewater Membrane Module' => '浸没式MBR污水膜组件',
            'Automatic Backwash Multi-Media Sand Filter' => '自动反冲洗多介质砂滤器',
            'Industrial Granular Activated Carbon Vessel' => '工业颗粒活性炭吸附塔',
            'High-Output Ultraviolet Water Disinfection Unit' => '高输出紫外线水消毒设备',
            'Real-time Online TOC & COD Water Analyzer' => '实时在线TOC与COD水质分析仪',
            'Laser Turbidity & TSS Sensor Probe' => '激光浊度及TSS传感器探头',
            'High-Concentration Industrial Ozone Generator' => '高浓度工业臭氧发生器',
            'Multi-Disk Sludge Dehydration Screw Press' => '叠螺式污泥脱水机',
            'Duplex SS316L RO Membrane Vessel Housing' => '双相钢SS316L RO膜压力容器外壳',
            'Polishing Mixed-Bed Ion Exchange Vessel' => '精处理混合床离子交换塔',
            'Dual-Pump Automated Polymer Dosing Skid' => '双泵自动聚合物加药撬块',
        ];

        $idProductNames = [
            'Demineralization Plant (Anion & Cation)' => 'Plant Demineralisasi (Anion & Kation)',
            'Hardness Mineral Softener System' => 'Sistem Pelembut Mineral Kesadahan',
            'PE High-Density Mixing & Storage Tank' => 'Tangki Pencampur & Penyimpanan PE High-Density',
            'Precision Automatic Chemical Dosing Pump' => 'Pompa Dosis Kimia Otomatis Presisi',
            'Horizontal Dissolved Air Flotation (DAF)' => 'Flotasi Udara Terlarut Horizontal (DAF)',
            'Containerized Sludge Dewatering Unit' => 'Unit Dewatering Lumpur Kontainer',
            'Zero-Leakage High-Performance Butterfly Valve' => 'Katup Kupu-Kupu Performa Tinggi Bebas Bocor',
            'Pneumatic Control Valve Actuator Assembly' => 'Rakitan Aktuator Katup Kontrol Pneumatik',
            'Industrial Electromagnetic Flow Meter' => 'Pengukur Aliran Elektromagnetik Industri',
            'Digital Online pH & Conductivity Sensor' => 'Sensor pH & Konduktivitas Online Digital',
            'SCADA Telemetry Controller & PLC Unit' => 'Pengontrol Telemetri SCADA & Unit PLC',
            'Ultrafiltration (UF) Membrane Skid Unit' => 'Unit Skid Membran Ultrafiltrasi (UF)',
            'High-Rejection Brackish RO Membrane System' => 'Sistem Membran RO Air Payau Rejeki Tinggi',
            'Zero Liquid Discharge (ZLD) Evaporator Skid' => 'Skid Evaporator Zero Liquid Discharge (ZLD)',
            'Submerged MBR Wastewater Membrane Module' => 'Modul Membran Air Limbah MBR Submerged',
            'Automatic Backwash Multi-Media Sand Filter' => 'Filter Pasir Multi-Media Backwash Otomatis',
            'Industrial Granular Activated Carbon Vessel' => 'Bejana Karbon Aktif Granular Industri',
            'High-Output Ultraviolet Water Disinfection Unit' => 'Unit Disinfeksi Air Ultraviolet High-Output',
            'Real-time Online TOC & COD Water Analyzer' => 'Penganalisis Air TOC & COD Online Real-Time',
            'Laser Turbidity & TSS Sensor Probe' => 'Probe Sensor Kekeruhan Laser & TSS',
            'High-Concentration Industrial Ozone Generator' => 'Generator Ozon Industri Konsentrasi Tinggi',
            'Multi-Disk Sludge Dehydration Screw Press' => 'Screw Press Dehidrasi Lumpur Multi-Disk',
            'Duplex SS316L RO Membrane Vessel Housing' => 'Housing Bejana Membran RO Duplex SS316L',
            'Polishing Mixed-Bed Ion Exchange Vessel' => 'Bejana Pertukaran Ion Mixed-Bed Polishing',
            'Dual-Pump Automated Polymer Dosing Skid' => 'Skid Dosis Polimer Otomatis Dual-Pump',
        ];

        foreach ($rawProducts as $index => $item) {
            $engName = $item['name'];
            $zhName = $zhProductNames[$engName] ?? $engName;
            $idName = $idProductNames[$engName] ?? $engName;
            $thName = $thProductNames[$engName] ?? $engName;

            $nameJson = json_encode([
                'en' => $engName,
                'id' => $idName,
                'ms' => $idName,
                'th' => $thName,
                'zh' => $zhName,
            ]);
            $shortDescJson = json_encode([
                'en' => $item['short_desc'],
                'id' => $item['short_desc'],
                'ms' => $item['short_desc'],
                'th' => 'ระบบบำบัดน้ำประสิทธิภาพสูงเพื่อขจัดสิ่งเจือปนและมอบคุณภาพน้ำอุตสาหกรรม',
                'zh' => '高容量水处理设备，去除杂质并提供高效工业水质。',
            ]);
            $fullDescJson = json_encode([
                'en' => 'EcoReve ' . $item['name'] . ' is engineered for high-efficiency industrial plant operations.',
                'id' => 'EcoReve ' . $item['name'] . ' dirancang untuk operasi pabrik industri efisiensi tinggi.',
                'ms' => 'EcoReve ' . $item['name'] . ' direka untuk operasi loji industri berkecekapan tinggi.',
                'th' => 'EcoReve ' . $item['name'] . ' ออกแบบมาสำหรับการทำงานในโรงงานอุตสาหกรรมที่มีประสิทธิภาพสูง',
                'zh' => 'EcoReve ' . $item['name'] . ' 专为高效工业工厂运维打造。',
            ]);
            $ratingCountJson = json_encode([
                'en' => 'based on 9,649 plant audits',
                'id' => 'berdasarkan 9.649 audit pabrik',
                'ms' => 'berdasarkan 9,649 audit kilang',
                'th' => 'จากการตรวจสอบโรงงาน 9,649 แห่ง',
                'zh' => '基于 9,649 次工厂审计',
            ]);
            $badgeTextJson = json_encode([
                'en' => 'ISO 9001 Verified®',
                'id' => 'Tersertifikasi ISO 9001®',
                'ms' => 'Bersijil ISO 9001®',
                'th' => 'ได้รับการรับรอง ISO 9001®',
                'zh' => 'ISO 9001 官方认证®',
            ]);
            $priceLabelJson = json_encode([
                'en' => 'SKID LEASE RATE',
                'id' => 'TARIF SEWA SKID',
                'ms' => 'KADAR SEWA SKID',
                'th' => 'อัตราค่าเช่า SKID',
                'zh' => '框架设备租赁费率',
            ]);
            $noteJson = json_encode([
                'en' => 'A shipment typically lasts one month of heavy industrial plant operation',
                'id' => 'Pengiriman biasanya mencakup satu bulan operasi industri berat',
                'ms' => 'Penghantaran biasanya meliputi satu bulan operasi industri berat',
                'th' => 'การจัดส่งครอบคลุมการใช้งานอุตสาหกรรมหนักหนึ่งเดือน',
                'zh' => '装运通常覆盖一整月重工业高负荷运行',
            ]);

            $prodId = DB::table('products')->insertGetId([
                'name' => $nameJson,
                'slug' => $item['slug'],
                'short_desc' => $shortDescJson,
                'full_desc' => $fullDescJson,
                'rating' => '4.9/5',
                'rating_count' => $ratingCountJson,
                'badge_text' => $badgeTextJson,
                'price_label' => $priceLabelJson,
                'price' => 'Starting at $950/month',
                'note' => $noteJson,
                'options' => json_encode($defaultOptions),
                'accordions' => json_encode($defaultAccordions),
                'spec_pdf_url' => '/storage/datasheets/' . $item['slug'] . '-spec.pdf',
                'image_url' => '/assets/products/' . (($index % 4) + 1) . '.webp',
                'gallery_images' => json_encode([
                    '/assets/products/' . (($index % 4) + 1) . '.webp',
                    '/assets/products/' . ((( $index + 1 ) % 4) + 1) . '.webp',
                ]),
                'is_featured' => $item['featured'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // Pivot Table Link
            DB::table('category_product')->insertOrIgnore([
                'product_id' => $prodId,
                'category_id' => $item['cat_id'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
