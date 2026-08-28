<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        // Truncate or reset existing entries to ensure clean seeding
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('services')->truncate();
        DB::table('service_categories')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // 1. Seed 3 Official Service Categories (JSON 5 Languages)
        $catSysIntegration = DB::table('service_categories')->insertGetId([
            'title' => json_encode([
                'en' => 'System Integration',
                'id' => 'Integrasi Sistem',
                'ms' => 'Integrasi Sistem',
                'th' => 'การรวมระบบ',
                'zh' => '系统集成服务'
            ]),
            'slug' => 'system-integration',
            'icon_name' => 'Wrench',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $catAutomation = DB::table('service_categories')->insertGetId([
            'title' => json_encode([
                'en' => 'Technical Operations',
                'id' => 'Operasi Teknis',
                'ms' => 'Operasi Teknikal',
                'th' => 'การปฏิบัติการทางเทคนิค',
                'zh' => '技术运维服务'
            ]),
            'slug' => 'technical-operations',
            'icon_name' => 'Sliders',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $catMaintenance = DB::table('service_categories')->insertGetId([
            'title' => json_encode([
                'en' => 'Lifecycle Maintenance',
                'id' => 'Perawatan Siklus Hidup',
                'ms' => 'Penyelenggaraan Kitaran Hayat',
                'th' => 'การบำรุงรักษาตลอดวงจรชีวิต',
                'zh' => '全生命周期运维维护'
            ]),
            'slug' => 'lifecycle-maintenance',
            'icon_name' => 'ShieldCheck',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // 2. Seed 5 Official EcoReve Services (JSON 5 Languages)
        $rawServices = [
            [
                'service_category_id' => $catSysIntegration,
                'title' => 'On-Site Mechanical & Piping Installation',
                'slug' => 'installation',
                'short_desc' => 'Complete turn-key mechanical mounting, high-pressure piping alignment, and electrical skid integration.',
                'full_desc' => 'Our senior mechanical engineers execute precise on-site installation of skid-mounted demineralization plants, DAF flotation units, and chemical dosing pumps. All piping adheres to ISO 15614 welding standards with pressure testing prior to live water introduction.',
                'features' => [
                    'High-pressure SS316L & Duplex piping assembly',
                    'Vibration-isolated skid foundation mounting',
                    'Control cabinet wiring & Profinet telemetry hookup',
                    'Pre-commissioning hydro-test up to 35 Bar',
                ],
                'deliverables' => [
                    'As-Built Piping & Instrumentation Diagram (P&ID)',
                    'Pressure Hydro-test Inspection Certificates',
                    'Electrical Insulation Safety Compliance Audit',
                ],
                'turnaround_time' => '3 - 7 Business Days',
                'metric_label' => 'IMMERSY',
                'metric_value' => '+2',
                'metric_desc' => 'Operations expanded to 2 additional neighborhoods.',
                'content' => 'Full turn-key mechanical mounting, high-pressure piping alignment, and electrical skid integration.',
                'image_url' => '@/assets/hero-banner.webp',
                'icon_name' => 'Wrench',
            ],
            [
                'service_category_id' => $catSysIntegration,
                'title' => 'Water Quality Testing & Plant Commissioning',
                'slug' => 'commissioning',
                'short_desc' => 'Full-system wet testing, membrane flux optimization, and automated SCADA calibration.',
                'full_desc' => 'Rigorous operational commissioning validating effluent water conductivity (< 0.1 µS/cm), turbidity removal, and zero liquid discharge efficiency.',
                'features' => [
                    'Multi-stage membrane flushing & chemical pre-treatment',
                    'SCADA PID loop tuning for chemical dosing pumps',
                    'Automated backwash cycle timing optimization',
                    'Full-capacity 72-hour continuous endurance trial',
                ],
                'deliverables' => [
                    'Certified Water Quality Analysis Report',
                    'PLC Operational Parameter Baseline Sheet',
                    'Final Plant Commissioning Sign-off Certificate',
                ],
                'turnaround_time' => '2 - 5 Business Days',
                'metric_label' => 'CHEMICAL SAVINGS',
                'metric_value' => '38%',
                'metric_desc' => 'Reduced chemical consumption via real-time telemetry feedback loops.',
                'content' => 'Full-system wet testing, membrane flux optimization, and automated SCADA calibration.',
                'image_url' => '@/assets/hero-footer.webp',
                'icon_name' => 'Sliders',
            ],
            [
                'service_category_id' => $catAutomation,
                'title' => 'Certified SOP Operator Training & Control APIs',
                'slug' => 'operator-training',
                'short_desc' => 'Hands-on operator training covering daily SOPs, emergency overrides, and telemetry dashboards.',
                'full_desc' => 'Empower your industrial plant personnel with comprehensive training modules taught by senior OEM engineers.',
                'features' => [
                    'On-site hands-on simulator & live control panel operation',
                    'Clean-In-Place (CIP) chemical batching SOPs',
                    'Troubleshooting guide for valve & pump pressure drops',
                    'Certified operator completion assessment',
                ],
                'deliverables' => [
                    'Customized Plant Operation Manual (PDF & Printed)',
                    'Operator Training Certificates (ISO 9001 standard)',
                    '24/7 Digital Quick-Reference SOP Video Access',
                ],
                'turnaround_time' => '1 - 3 Training Days',
                'metric_label' => 'OPERATOR CONFIDENCE',
                'metric_value' => '95%',
                'metric_desc' => '95%+ operational efficiency after SOP-based simulator training.',
                'content' => 'Hands-on operator training covering daily SOPs, emergency overrides, and telemetry dashboards.',
                'image_url' => '@/assets/hero-banner.webp',
                'icon_name' => 'Sliders',
            ],
            [
                'service_category_id' => $catMaintenance,
                'title' => '24/7 Telemetry Monitoring & Preventative Maintenance',
                'slug' => 'preventative-maintenance',
                'short_desc' => 'Scheduled bi-monthly physical audits, membrane cleaning, and continuous telemetry diagnostics.',
                'full_desc' => 'Proactive maintenance contracts ensuring zero unscheduled plant downtime.',
                'features' => [
                    'Bi-monthly physical plant maintenance visits',
                    'Remote SCADA telemetry fault alert response within 15 min',
                    'Membrane autopsies & chemical CIP rejuvenation',
                    'High-wear component preventative replacement',
                ],
                'deliverables' => [
                    'Bi-monthly Mechanical Health Audit Report',
                    'Predictive Wear & Tear Risk Matrix',
                    'Priority Emergency Technician Dispatch Guarantee',
                ],
                'turnaround_time' => 'Annual Service Contract',
                'metric_label' => 'UPTIME GUARANTEE',
                'metric_value' => '99.9%',
                'metric_desc' => 'Continuous real-time water quality monitoring and predictive maintenance alerts.',
                'content' => 'Scheduled bi-monthly physical audits, membrane cleaning, and continuous telemetry diagnostics.',
                'image_url' => '@/assets/hero-footer.webp',
                'icon_name' => 'ShieldCheck',
            ],
            [
                'service_category_id' => $catMaintenance,
                'title' => 'OEM Spare Parts & Rebuild Kits Supply',
                'slug' => 'spare-parts-supply',
                'short_desc' => 'Genuine EcoReve replacement membranes, PVDF valves, ceramic pump diaphragms, and seal kits.',
                'full_desc' => 'Direct factory inventory access for replacement parts. All components are certified original OEM quality.',
                'features' => [
                    'Express 48-hour global air-freight dispatch',
                    'Original factory PVDF, EPDM, and Hastelloy C spares',
                    'Pre-tested ceramic dosing pump head rebuild kits',
                    'Full 12-month manufacturer replacement warranty',
                ],
                'deliverables' => [
                    'Factory Quality Inspection Certificate',
                    'Component Compatibility Certificate',
                    'Standard Installation Guide & Torque Specs',
                ],
                'turnaround_time' => '24 - 48 Hours Dispatch',
                'metric_label' => 'DISPATCH SPEED',
                'metric_value' => '48 Hours',
                'metric_desc' => 'Express global air-freight dispatch for all genuine spare parts.',
                'content' => 'Genuine EcoReve replacement membranes, PVDF valves, ceramic pump diaphragms, and seal kits.',
                'image_url' => '@/assets/hero-banner.webp',
                'icon_name' => 'Wrench',
            ],
        ];

        $msServicesData = [
            'installation' => [
                'title' => 'Pemasangan Mekanikal & Perpaipan Di Tapak',
                'short_desc' => 'Pemasangan mekanikal kunci serah, penyelarasan paip tekanan tinggi, dan integrasi skid elektrikal.',
                'full_desc' => 'Jurutera mekanikal kanan kami menjalankan pemasangan tepat di tapak untuk loji demineralisasi, unit apungan DAF, dan pam meter kimia.',
                'metric_label' => 'JEJAK PERKHIDMATAN',
                'metric_desc' => 'Operasi berkembang ke 2 kawasan perindustrian tambahan.',
                'turnaround_time' => '3 - 7 Hari Bekerja',
            ],
            'commissioning' => [
                'title' => 'Ujian Kualiti Air & Pentauliahan Loji',
                'short_desc' => 'Ujian basah seluruh sistem, pengoptimuman fluks membran, dan kalibrasi SCADA automatik.',
                'full_desc' => 'Pentauliahan operasi yang ketat mengesahkan kekonduksian air larutan (< 0.1 µS/cm), penghapusan kekeruhan, dan kecekapan pelepasan cecair sifar.',
                'metric_label' => 'PENJIMATAN KIMIA',
                'metric_desc' => 'Pengurangan penggunaan bahan kimia melalui gelung maklum balas telemetri masa nyata.',
                'turnaround_time' => '2 - 5 Hari Bekerja',
            ],
            'operator-training' => [
                'title' => 'Latihan Operator SOP Bertauliah & API Kawalan',
                'short_desc' => 'Latihan operator amali merangkumi SOP harian, pintasan kecemasan, dan papan pemuka telemetri.',
                'full_desc' => 'Empower kakitangan loji perindustrian anda dengan modul latihan komprehensif yang diajar oleh jurutera OEM kanan.',
                'metric_label' => 'KEYAKINAN OPERATOR',
                'metric_desc' => '95%+ kecekapan operasi selepas latihan simulator berasaskan SOP.',
                'turnaround_time' => '1 - 3 Hari Latihan',
            ],
            'preventative-maintenance' => [
                'title' => 'Pemantauan Telemetri 24/7 & Penyelenggaraan Pencegahan',
                'short_desc' => 'Audit fizikal dwibulanan terjadual, pembersihan membran, dan diagnostik telemetri berterusan.',
                'full_desc' => 'Kontrak penyelenggaraan proaktif yang memastikan sifar masa henti loji yang tidak dirancang.',
                'metric_label' => 'JAMINAN MASA KENDALIAN',
                'metric_desc' => 'Pemantauan kualiti air masa nyata berterusan dan amaran penyelenggaraan ramalan.',
                'turnaround_time' => 'Kontrak Perkhidmatan Tahunan',
            ],
            'spare-parts-supply' => [
                'title' => 'Bekalan Alat Ganti Asli OEM & Kit Pembaikan',
                'short_desc' => 'Membran pengganti asli EcoReve, injap PVDF, diafragma pam seramik, dan kit pengedap.',
                'full_desc' => 'Akses inventori kilang terus untuk alat ganti. Semua komponen disahkan kualiti OEM asli.',
                'metric_label' => 'KELAJUAN PENGHANTARAN',
                'metric_desc' => 'Penghantaran ekspres kargo udara global 48 jam untuk semua alat ganti asli.',
                'turnaround_time' => 'Penghantaran 24 - 48 Jam',
            ],
        ];

        $idServicesData = [
            'installation' => [
                'title' => 'Instalasi Mekanikal & Perpipaan Lapangan',
                'short_desc' => 'Pemasangan mekanikal turn-key, penyelarasan pipa tekanan tinggi, dan integrasi skid elektrikal.',
                'full_desc' => 'Insinyur mekanik senior kami menjalankan instalasi presisi di lokasi untuk plant demineralisasi, unit flotasi DAF, dan pompa dosis kimia.',
                'metric_label' => 'JEJAK LAYANAN',
                'metric_desc' => 'Operasi meluas ke 2 kawasan industri tambahan.',
                'turnaround_time' => '3 - 7 Hari Kerja',
            ],
            'commissioning' => [
                'title' => 'Pengujian Kualitas Air & Komisioning Plant',
                'short_desc' => 'Pengujian basah seluruh sistem, optimasi fluks membran, dan kalibrasi SCADA otomatis.',
                'full_desc' => 'Komisioning operasional ketat memvalidasi konduktivitas air hasil (< 0.1 µS/cm), penghapusan kekeruhan, dan efisiensi zero liquid discharge.',
                'metric_label' => 'PENGHEMATAN KIMIA',
                'metric_desc' => 'Pengurangan konsumsi bahan kimia melalui umpan balik telemetri waktu nyata.',
                'turnaround_time' => '2 - 5 Hari Kerja',
            ],
            'operator-training' => [
                'title' => 'Pelatihan Operator SOP Tersertifikasi & API Kontrol',
                'short_desc' => 'Pelatihan operator praktis yang mencakup SOP harian, override darurat, dan dashboard telemetri.',
                'full_desc' => 'Berdayakan personel pabrik industri Anda dengan modul pelatihan komprehensif dari insinyur OEM senior.',
                'metric_label' => 'KEYAKINAN OPERATOR',
                'metric_desc' => 'Efisiensi operasional 95%+ setelah pelatihan simulator berbasis SOP.',
                'turnaround_time' => '1 - 3 Hari Pelatihan',
            ],
            'preventative-maintenance' => [
                'title' => 'Pemantauan Telemetri 24/7 & Pemeliharaan Preventif',
                'short_desc' => 'Audit fisik dua bulanan terjadual, pembersihan membran, dan diagnostik telemetri kontinu.',
                'full_desc' => 'Kontrak pemeliharaan proaktif yang menjamin zero unscheduled downtime pabrik.',
                'metric_label' => 'JAMINAN UPTIME',
                'metric_desc' => 'Pemantauan kualitas air waktu nyata secara kontinu dan peringatan pemeliharaan prediktif.',
                'turnaround_time' => 'Kontrak Layanan Tahunan',
            ],
            'spare-parts-supply' => [
                'title' => 'Pasokan Suku Cadang Asli OEM & Kit Perbaikan',
                'short_desc' => 'Membran pengganti asli EcoReve, katup PVDF, diafragma pompa keramik, dan kit seal.',
                'full_desc' => 'Akses inventaris pabrik langsung untuk suku cadang pengganti. Semua komponen bersertifikasi kualitas OEM asli.',
                'metric_label' => 'KECEPATAN PENGIRIMAN',
                'metric_desc' => 'Pengiriman ekspres kargo udara global 48 jam untuk seluruh suku cadang asli.',
                'turnaround_time' => 'Pengiriman 24 - 48 Jam',
            ],
        ];

        $thServicesData = [
            'installation' => [
                'title' => 'งานวิศวกรรมติดตั้งระบบและท่อแรงดันสูงหน้างาน',
                'short_desc' => 'การติดตั้งระบบเครื่องจักร ท่อแรงดันสูง และการต่อเชื่อมตู้ควบคุมไฟฟ้าแบบครบวงจร',
                'full_desc' => 'ทีมวิศวกรเครื่องกลอาโวโสของเราให้บริการติดตั้งระบบ Demineralization, DAF Flotation และปั๊มตวงสารเคมีหน้างานตามมาตรฐานงานเชื่อม ISO 15614',
                'metric_label' => 'ขอบเขตบริการ',
                'metric_desc' => 'ขยายขอบเขตการดำเนินงานไปยังเขตอุตสาหกรรมเพิ่มเติม 2 แห่ง',
                'turnaround_time' => '3 - 7 วันทำการ',
            ],
            'commissioning' => [
                'title' => 'การทดสอบคุณภาพน้ำและการปรับตั้งระบบ (Commissioning)',
                'short_desc' => 'การทดสอบเดินระบบเปียก การปรับแต่งฟลักซ์เมมเบรน และการเทียบมาตรฐาน SCADA อัตโนมัติ',
                'full_desc' => 'การทดสอบระบบและปรับตั้งค่าการทำงาน เพื่อยืนยันค่านำไฟฟ้าของน้ำ (< 0.1 µS/cm) อัตราการขจัดความขุ่น และประสิทธิภาพ Zero Liquid Discharge',
                'metric_label' => 'ประหยัดสารเคมี',
                'metric_desc' => 'ลดการใช้สารเคมีผ่านระบบฟีดแบ็กการวัดระยะไกลแบบเรียลไทม์',
                'turnaround_time' => '2 - 5 วันทำการ',
            ],
            'operator-training' => [
                'title' => 'การฝึกอบรมคู่มือ SOP ผู้ดูแลระบบพร้อม API ควบคุม',
                'short_desc' => 'การฝึกอบรมปฏิบัติจริงครอบคลุม SOP ประจำวัน การควบคุมกรณีฉุกเฉิน และแดชบอร์ดมอนิเตอร์',
                'full_desc' => 'เสริมศักยภาพทีมผู้ดูแลโรงงานของคุณด้วยหลักสูตรการฝึกอบรมแบบเจาะลึกจากวิศวกรผู้เชี่ยวชาญ',
                'metric_label' => 'ความมั่นใจผู้ปฏิบัติงาน',
                'metric_desc' => 'ประสิทธิภาพการทำงานสูงกว่า 95% หลังการฝึกอบรมระบบจำลอง SOP',
                'turnaround_time' => '1 - 3 วันฝึกอบรม',
            ],
            'preventative-maintenance' => [
                'title' => 'บริการเฝ้าระวังผ่านระบบระยะไกล 24/7 และการบำรุงรักษาเชิงป้องกัน',
                'short_desc' => 'การเข้าตรวจเช็กสภาพโรงงานทุก 2 เดือน การล้างเมมเบรน และการวินิจฉัยผ่านระบบระยะไกลต่อเนื่อง',
                'full_desc' => 'สัญญาการบำรุงรักษาเชิงป้องกันเพื่อรับประกันเวลาหยุดทำงานของโรงงานเป็นศูนย์ (Zero Unscheduled Downtime)',
                'metric_label' => 'รับประกันเวลาทำงาน',
                'metric_desc' => 'เฝ้าระวังคุณภาพน้ำเรียลไทม์ต่อเนื่องและแจ้งเตือนการบำรุงรักษาล่วงหน้า',
                'turnaround_time' => 'สัญญาบริการรายปี',
            ],
            'spare-parts-supply' => [
                'title' => 'การจัดหาอะไหล่แท้ OEM และชุดซ่อมแซม',
                'short_desc' => 'อะไหล่แท้เมมเบรน วาล์ว PVDF ไดอะแฟรมปั๊มเซรามิก และชุดซีลจาก EcoReve',
                'full_desc' => 'เข้าถึงสต็อกอะไหล่แท้จากโรงงานโดยตรง อะไหล่ทุกชิ้นได้รับการรับประกันคุณภาพแท้ 100% จากผู้ผลิต OEM',
                'metric_label' => 'ความเร็วจัดส่ง',
                'metric_desc' => 'จัดส่งด่วนทางอากาศทั่วโลกภายใน 48 ชั่วโมงสำหรับอะไหล่แท้ทุกชิ้น',
                'turnaround_time' => 'จัดส่งภายใน 24 - 48 ชั่วโมง',
            ],
        ];

        $zhServicesData = [
            'installation' => [
                'title' => '现场机械与管道安装工程',
                'short_desc' => '交钥匙式机械安装、高压管道对齐与电气撬装系统集成。',
                'full_desc' => '我们的资深机械工程师执行去离子水设备、DAF气浮机及加药泵的精准现场安装。所有管道均符合ISO 15614焊接标准，并在进水前进行高压水压测试。',
                'metric_label' => '服务覆盖区域',
                'metric_desc' => '业务成功拓展至 2 个新增工业园区。',
                'turnaround_time' => '3 - 7 个工作日',
            ],
            'commissioning' => [
                'title' => '水质检测与全系统调试运行',
                'short_desc' => '全系统湿态测试、膜通量优化与自动化SCADA系统校准。',
                'full_desc' => '严格的运维调试，验证出水电导率（< 0.1 µS/cm）、浊度去除率及零液体排放（ZLD）效率。',
                'metric_label' => '药剂节省率',
                'metric_desc' => '通过实时遥测反馈闭环控制，降低高达38%的化学药剂消耗。',
                'turnaround_time' => '2 - 5 个工作日',
            ],
            'operator-training' => [
                'title' => '专业SOP操作员认证培训与控制API',
                'short_desc' => '实操性操作员培训，涵盖日常SOP、紧急手动覆盖与遥测仪表盘。',
                'full_desc' => '由原厂资深工程师主讲的全面培训课程，全面提升您的工厂运维人员操作技能。',
                'metric_label' => '操作员熟练度',
                'metric_desc' => '完成SOP模拟培训后，工厂运行综合效率达到 95%+。',
                'turnaround_time' => '1 - 3 天培训周期',
            ],
            'preventative-maintenance' => [
                'title' => '24/7全天候遥测监测与预防性维护',
                'short_desc' => '定期双月现场物理审计、膜清洗与连续遥测故障诊断。',
                'full_desc' => '主动式运维保养合同，确保工厂零非计划停机时间。',
                'metric_label' => '系统可用性保证',
                'metric_desc' => '连续实时水质监测与预测性维护预警。',
                'turnaround_time' => '年度运维服务合同',
            ],
            'spare-parts-supply' => [
                'title' => '原厂OEM备品备件与检修包供应',
                'short_desc' => 'EcoReve原厂替代膜元件、PVDF阀门、陶瓷泵隔膜及密封套件。',
                'full_desc' => '工厂直供现货库存，所有备件均通过100%原厂OEM品质认证。',
                'metric_label' => '空运发货速度',
                'metric_desc' => '所有原厂正品备件均提供48小时全球空运快速发货。',
                'turnaround_time' => '24 - 48 小时发货',
            ],
        ];

        foreach ($rawServices as $s) {
            $slug = $s['slug'];
            
            $zh = $zhServicesData[$slug] ?? [];
            $id = $idServicesData[$slug] ?? [];
            $ms = $msServicesData[$slug] ?? [];
            $th = $thServicesData[$slug] ?? [];

            DB::table('services')->insert([
                'service_category_id' => $s['service_category_id'],
                'title' => json_encode(['en' => $s['title'], 'id' => $id['title'] ?? $s['title'], 'ms' => $ms['title'] ?? $s['title'], 'th' => $th['title'] ?? $s['title'], 'zh' => $zh['title'] ?? $s['title']]),
                'slug' => $s['slug'],
                'short_desc' => json_encode(['en' => $s['short_desc'], 'id' => $id['short_desc'] ?? $s['short_desc'], 'ms' => $ms['short_desc'] ?? $s['short_desc'], 'th' => $th['short_desc'] ?? $s['short_desc'], 'zh' => $zh['short_desc'] ?? $s['short_desc']]),
                'full_desc' => json_encode(['en' => $s['full_desc'], 'id' => $id['full_desc'] ?? $s['full_desc'], 'ms' => $ms['full_desc'] ?? $s['full_desc'], 'th' => $th['full_desc'] ?? $s['full_desc'], 'zh' => $zh['full_desc'] ?? $s['full_desc']]),
                'features' => json_encode($s['features']),
                'deliverables' => json_encode($s['deliverables']),
                'turnaround_time' => json_encode(['en' => $s['turnaround_time'], 'id' => $id['turnaround_time'] ?? $s['turnaround_time'], 'ms' => $ms['turnaround_time'] ?? $s['turnaround_time'], 'th' => $th['turnaround_time'] ?? $s['turnaround_time'], 'zh' => $zh['turnaround_time'] ?? $s['turnaround_time']]),
                'metric_label' => json_encode(['en' => $s['metric_label'], 'id' => $id['metric_label'] ?? $s['metric_label'], 'ms' => $ms['metric_label'] ?? $s['metric_label'], 'th' => $th['metric_label'] ?? $s['metric_label'], 'zh' => $zh['metric_label'] ?? $s['metric_label']]),
                'metric_value' => $s['metric_value'],
                'metric_desc' => json_encode(['en' => $s['metric_desc'], 'id' => $id['metric_desc'] ?? $s['metric_desc'], 'ms' => $ms['metric_desc'] ?? $s['metric_desc'], 'th' => $th['metric_desc'] ?? $s['metric_desc'], 'zh' => $zh['metric_desc'] ?? $s['metric_desc']]),
                'content' => json_encode(['en' => $s['content'], 'id' => $id['short_desc'] ?? $s['content'], 'ms' => $ms['short_desc'] ?? $s['content'], 'th' => $th['short_desc'] ?? $s['content'], 'zh' => $zh['short_desc'] ?? $s['content']]),
                'image_url' => $s['image_url'],
                'icon_name' => $s['icon_name'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
