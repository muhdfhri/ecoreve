<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NewsSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Clear existing news & categories to avoid duplicates
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('news')->truncate();
        DB::table('news_categories')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // 2. Insert Kategori Berita Utama (JSON 5 Languages)
        $catPartnership = DB::table('news_categories')->insertGetId([
            'name' => json_encode([
                'en' => 'Partnership',
                'id' => 'Kemitraan',
                'ms' => 'Rakan Kongsi',
                'th' => 'พันธมิตร',
                'zh' => '合作动态'
            ], JSON_UNESCAPED_UNICODE),
            'slug' => 'partnership',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $catResearch = DB::table('news_categories')->insertGetId([
            'name' => json_encode([
                'en' => 'Research',
                'id' => 'Riset',
                'ms' => 'Penyelidikan',
                'th' => 'งานวิจัย',
                'zh' => '工程研究'
            ], JSON_UNESCAPED_UNICODE),
            'slug' => 'research',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $catFunding = DB::table('news_categories')->insertGetId([
            'name' => json_encode([
                'en' => 'Funding',
                'id' => 'Pendanaan',
                'ms' => 'Pembiayaan',
                'th' => 'การลงทุน',
                'zh' => '融资与投资'
            ], JSON_UNESCAPED_UNICODE),
            'slug' => 'funding',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $catTechnology = DB::table('news_categories')->insertGetId([
            'name' => json_encode([
                'en' => 'Technology',
                'id' => 'Teknologi',
                'ms' => 'Teknologi',
                'th' => 'เทคโนโลยี',
                'zh' => '核心技术'
            ], JSON_UNESCAPED_UNICODE),
            'slug' => 'technology',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $catInnovation = DB::table('news_categories')->insertGetId([
            'name' => json_encode([
                'en' => 'Innovation',
                'id' => 'Inovasi',
                'ms' => 'Inovasi',
                'th' => 'นวัตกรรม',
                'zh' => '前沿创新'
            ], JSON_UNESCAPED_UNICODE),
            'slug' => 'innovation',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // 3. Insert Articles with Rich Multi-Language Content across 5 Languages
        $articles = [
            [
                'id' => 1,
                'news_category_id' => $catResearch,
                'title' => json_encode([
                    'en' => 'EcoReve & DTCC ZLD System: Rationale & Current State in Wastewater Recirculation',
                    'id' => 'Sistem ZLD EcoReve & DTCC: Alasan & Status Terkini Resirkulasi Air Limbah',
                    'ms' => 'Sistem ZLD EcoReve & DTCC: Rasional & Status Terkini Kitar Semula Air Sisa',
                    'th' => 'ระบบ EcoReve & DTCC ZLD: เหตุผลและสถานะปัจจุบันในการหมุนเวียนน้ำเสีย',
                    'zh' => 'EcoReve 与 DTCC ZLD 零排放系统：废水循环利用的背景与现状分析'
                ], JSON_UNESCAPED_UNICODE),
                'slug' => 'ecoreve-dtcc-zld-system-rationale-current-state',
                'read_time' => json_encode([
                    'en' => '6 MIN READ',
                    'id' => 'BACA 6 MENIT',
                    'ms' => 'BACA 6 MINIT',
                    'th' => 'อ่าน 6 นาที',
                    'zh' => '阅读需 6 分钟'
                ], JSON_UNESCAPED_UNICODE),
                'summary' => json_encode([
                    'en' => 'In-depth research on closed-loop industrial water purification and high-efficiency anion exchanger plants.',
                    'id' => 'Riset mendalam tentang pemurnian air industri sirkulasi tertutup dan instalasi penukar anion efisiensi tinggi.',
                    'ms' => 'Penyelidikan mendalam mengenai pembersihan air industri kitaran tertutup dan loji penukar anion kecekapan tinggi.',
                    'th' => 'วิจัยเจาะลึกเกี่ยวกับการกรองน้ำหมุนเวียนในอุตสาหกรรม และโรงงานแลกเปลี่ยนแอนไอออนประสิทธิภาพสูง',
                    'zh' => '深入研究工业闭环水净化与高效阴离子交换器设备。'
                ], JSON_UNESCAPED_UNICODE),
                'content' => json_encode([
                    'en' => "1. Closed-Loop Recirculation Principles\nIndustrial wastewater recirculation has evolved from a regulatory compliance requirement into a core competitive advantage for modern manufacturing facilities. As fresh water tariffs escalate and discharge quotas tighten across industrial corridors, plant managers must optimize every cubic meter of effluent.\n\n2. Anion Exchanger Chemistry & Selectivity\nAt EcoReve, our zero liquid discharge architecture integrates dual-stage anion and cation demineralizers with automated DAF pre-treatment skids. By isolating heavy metals, silica (SiO2), and dissolved conductivities down to sub-0.1 µS/cm levels, enterprise facilities can safely recycle up to 98% of process water directly back into high-pressure cooling towers and boiler feed loops.\n\n3. Operating Energy Costs & Trial Results\nAutomated telemetry feedback loops cut manual chemical dosing errors by 60%, delivering consistent effluent quality even under erratic surge loads. The operational cost savings deliver full payback within 18 months of commissioning.",
                    'id' => "1. Prinsip Resirkulasi Sirkulasi Tertutup\nResirkulasi air limbah industri telah berkembang dari persyaratan kepatuhan regulasi menjadi keunggulan kompetitif inti untuk fasilitas manufaktur modern. Seiring meningkatnya tarif air bersih dan pengetatan kuota pembuangan, manajer pabrik harus mengoptimalkan setiap meter kubik efluen.\n\n2. Kimia & Selektivitas Penukar Anion\nDi EcoReve, arsitektur zero liquid discharge kami mengintegrasikan demineraliser anion dan kation dua tahap dengan skid pra-pengolahan DAF otomatis. Dengan mengisolasi logam berat, silika (SiO2), dan konduktivitas terlarut hingga tingkat di bawah 0,1 µS/cm, pabrik dapat mendaur ulang hingga 98% air proses secara aman kembali ke menara pendingin bertekanan tinggi.\n\n3. Biaya Energi Operasional & Hasil Uji Coba\nLoop umpan balik telemetri otomatis mengurangi kesalahan dosis kimia manual sebesar 60%, memberikan kualitas efluen yang konsisten bahkan di bawah lonjakan beban yang tidak menentu. Penghematan biaya operasional memberikan pengembalian modal penuh dalam 18 bulan.",
                    'ms' => "1. Prinsip Kitar Semula Kitaran Tertutup\nKitar semula air sisa industri telah berkembang daripada keperluan mematuhi piawaian kepada kelebihan daya saing teras bagi fasiliti pembuatan moden. Apabila tarif air bersih meningkat dan kuota pelepasan diperketat, pengurus loji mesti mengoptimumkan setiap meter padu efluen.\n\n2. Kimia & Selektiviti Penukar Anion\nDi EcoReve, seni bina zero liquid discharge kami menyepadukan demineraliser anion dan kation dua peringkat dengan skid pra-rawatan DAF automatik. Dengan mengasingkan logam berat, silika (SiO2), dan kekonduksian terlarut sehingga tahap bawah 0.1 µS/cm, loji boleh mendaur semula sehingga 98% air proses secara selamat kembali ke menara pendingin bertekanan tinggi.\n\n3. Kos Tenaga Operasi & Keputusan Ujian\nGelung maklum balas telemetri automatik mengurangkan ralat dos bahan kimia manual sebanyak 60%, memberikan kualiti efluen yang konsisten walaupun di bawah lonjakan beban yang tidak menentu. Penjimatan kos operasi memberikan pulangan modal penuh dalam tempoh 18 bulan.",
                    'th' => "1. หลักการหมุนเวียนน้ำแบบระบบปิด\nการหมุนเวียนน้ำเสียในอุตสาหกรรมได้วิวัฒนาการจากการปฏิบัติตามข้อกำหนดทางกฎหมายมาเป็นความได้เปรียบทางการแข่งขันหลักสำหรับโรงงานผลิตสมัยใหม่ เมื่อค่าน้ำประปาสูงขึ้นและโควต้าการปล่อยน้ำเสียเข้มงวดขึ้น ผู้จัดการโรงงานต้องปรับปรุงการใช้น้ำเสียทุกลูกบาศก์เมตรให้เกิดประโยชน์สูงสุด\n\n2. เคมีและความสามารถในการแลกเปลี่ยนแอนไอออน\nที่ EcoReve สถาปัตยกรรม Zero Liquid Discharge ของเราผสานรวมเครื่องขจัดแร่ธาตุแอนไอออนและแคตไอออนแบบสองขั้นตอนเข้ากับระบบกรอง DAF อัตโนมัติ โดยขจัดโลหะหนัก ซิลิกา (SiO2) และการนำไฟฟ้าลงจนต่ำกว่า 0.1 µS/cm ช่วยให้โรงงานหมุนเวียนน้ำกระบวนการผลิตกลับมาใช้ในคูลลิ่งทาวเวอร์ได้อย่างปลอดภัยสูงสุดถึง 98%\n\n3. ต้นทุนพลังงานและผลการทดสอบ\nระบบมอนิเตอร์อัตโนมัติช่วยลดความผิดพลาดในการจ่ายสารเคมีลง 60% รักษาคุณภาพน้ำทิ้งให้คงที่แม้ยามภาระงานสวิง การประหยัดต้นทุนคืนทุนเต็มจำนวนภายใน 18 เดือน",
                    'zh' => "1. 闭环循环利用原则\n工业废水循环利用已从单纯的环保合规要求演变为现代制造工厂的核心竞争优势。随着自来水水费上涨和排放配额收紧，工厂管理者必须优化每立方米的出水。\n\n2. 阴离子交换化学与选择性\n在 EcoReve，我们的零液体排放（ZLD）架构将双级阴阳离子脱盐设备与自动化 DAF 预处理撬装相结合。通过将重金属、二氧化硅 (SiO2) 和溶解电导率降至 0.1 µS/cm 以下，企业设施可以安全地将高达 98% 的工艺水直接循环回高压冷却塔和锅炉给水回路。\n\n3. 运行能源成本与试验结果\n自动化遥测反馈闭环将手动加药误差减少了 60%，即使在冲击负荷下也能提供稳定的出水水质。运行成本的节省可在调试后 18 个月内实现完全收回投资。"
                ], JSON_UNESCAPED_UNICODE),
                'table_of_contents' => json_encode([
                    ['id' => 'sec-1', 'title' => '1. Closed-Loop Recirculation Principles'],
                    ['id' => 'sec-2', 'title' => '2. Anion Exchanger Chemistry & Selectivity'],
                    ['id' => 'sec-3', 'title' => '3. Operating Energy Costs & Trial Results']
                ]),
                'author_name' => json_encode([
                    'en' => 'Dr. Lin Xiao',
                    'id' => 'Dr. Lin Xiao',
                    'ms' => 'Dr. Lin Xiao',
                    'th' => 'ดร. หลิน เสี่ยว',
                    'zh' => '林肖 博士'
                ], JSON_UNESCAPED_UNICODE),
                'author_role' => json_encode([
                    'en' => 'Chief Process Engineer',
                    'id' => 'Kepala Insinyur Proses',
                    'ms' => 'Ketua Jurutera Proses',
                    'th' => 'หัวหน้าวิศวกรกระบวนการ',
                    'zh' => '首席工艺工程师'
                ], JSON_UNESCAPED_UNICODE),
                'author_avatar' => null,
                'image_url' => '/assets/hero-banner.webp',
                'is_featured' => true,
                'published_at' => '2026-05-25 10:00:00',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'news_category_id' => $catPartnership,
                'title' => json_encode([
                    'en' => 'Global Clean Water Expansion: EcoReve Moves Deeper Into South East Asia Wastewater Market',
                    'id' => 'Ekspansi Air Bersih Global: EcoReve Masuk Lebih Dalam ke Pasar Air Limbah Asia Tenggara',
                    'ms' => 'Peluasan Air Bersih Global: EcoReve Melangkah Lebih Dalam ke Pasaran Air Sisa Asia Tenggara',
                    'th' => 'ขยายระบบน้ำสะอาดระดับโลก: EcoReve รุกตลาดบำบัดน้ำเสียในเอเชียตะวันออกเฉียงใต้',
                    'zh' => '全球清洁水拓展：EcoReve 进一步深入东南亚工业废水处理市场'
                ], JSON_UNESCAPED_UNICODE),
                'slug' => 'global-clean-water-expansion-southeast-asia',
                'read_time' => json_encode([
                    'en' => '5 MIN READ',
                    'id' => 'BACA 5 MENIT',
                    'ms' => 'BACA 5 MINIT',
                    'th' => 'อ่าน 5 นาที',
                    'zh' => '阅读需 5 分钟'
                ], JSON_UNESCAPED_UNICODE),
                'summary' => json_encode([
                    'en' => 'Strategic partnerships with leading industrial zones to deploy containerized DAF & Geotube dewatering units.',
                    'id' => 'Kemitraan strategis dengan kawasan industri terkemuka untuk menerapkan unit kontainer DAF & dewatering Geotube.',
                    'ms' => 'Rakan kongsi strategik dengan kawasan industri terkemuka untuk menempatkan unit kontena DAF & dewatering Geotube.',
                    'th' => 'พันธมิตรเชิงกลยุทธ์กับเขตอุตสาหกรรมชั้นนำเพื่อติดตั้งระบบ DAF แบบตู้คอนเทนเนอร์และถุงกรอง Geotube',
                    'zh' => '与领先工业园区建立战略合作，部署集装箱式 DAF 气浮与 Geotube 污泥脱水单元。'
                ], JSON_UNESCAPED_UNICODE),
                'content' => json_encode([
                    'en' => "1. Regional Market Demands\nRapid industrial growth in Southeast Asia has created urgent demand for scalable wastewater treatment skids. Local environmental regulations now penalize untreated industrial discharge heavily, pushing manufacturing conglomerates to adopt turnkey treatment systems.\n\n2. Containerized DAF Deployment\nEcoReve has deployed containerized Dissolved Air Flotation (DAF) units capable of processing up to 1,200 m³/day per skid. These plug-and-play modules reduce site civil works duration by 70% and can be commissioned in under 14 days.\n\n3. Sustainability & Compliance Goals\nBy pairing DAF clarification with high-volume Geotube sludge dewatering bags, regional textile and chemical factories achieve zero sludge runoff and 95% water clarification efficiency.",
                    'id' => "1. Permintaan Pasar Regional\nPertumbuhan industri yang pesat di Asia Tenggara telah menciptakan permintaan mendesak akan skid pengolahan air limbah yang dapat disesuaikan skala kapabilitasnya. Regulasi lingkungan setempat kini mengenakan sanksi berat pada pembuangan limbah tanpa pengolahan.\n\n2. Penerapan DAF Berbentuk Kontainer\nEcoReve telah menerapkan unit Dissolved Air Flotation (DAF) kontainer yang mampu memproses hingga 1.200 m³/hari per skid. Modul plug-and-play ini mengurangi durasi pekerjaan sipil lokasi hingga 70% dan dapat di-komisioning kurang dari 14 hari.\n\n3. Target Keberlanjutan & Kepatuhan\nDengan memasangkan klarifikasi DAF dan kantong dewatering lumpur Geotube, pabrik tekstil dan kimia regional mencapai pemisahan lumpur total dan 95% efisiensi kejernihan air.",
                    'ms' => "1. Permintaan Pasaran Regional\nPertumbuhan industri yang pesat di Asia Tenggara telah mewujudkan permintaan mendesak untuk skid rawatan air sisa boleh skala. Peraturan alam sekitar tempatan kini mengenakan hukuman berat kepada pelepasan industri tanpa rawatan.\n\n2. Penempatan DAF Kontena\nEcoReve telah menempatkan unit Dissolved Air Flotation (DAF) berbekas yang mampu memproses sehingga 1,200 m³/hari setiap skid. Modul sedia guna ini mengurangkan kerja awam di tapak sebanyak 70% dan boleh dipentauliahkan dalam masa kurang dari 14 hari.\n\n3. Matlamat Kelestarian & Mematuhi Piawaian\nDengan menggabungkan penjelasan DAF dengan beg dewatering enapcemar Geotube, kilang tekstil dan kimia tempatan mencapai kecekapan kejernihan air 95%.",
                    'th' => "1. ความต้องการของตลาดในภูมิภาค\nการเติบโตอย่างรวดเร็วของอุตสาหกรรมในเอเชียตะวันออกเฉียงใต้สร้างความต้องการเร่งด่วนสำหรับระบบบำบัดน้ำเสียที่ขยายขนาดได้ กฎหมายสิ่งแวดล้อมท้องถิ่นลงโทษการปล่อยน้ำเสียรุนแรงขึ้น\n\n2. การติดตั้งระบบ DAF แบบตู้คอนเทนเนอร์\nEcoReve ได้ติดตั้งยูนิต DAF แบบตู้คอนเทนเนอร์ที่สามารถจัดการน้ำเสียได้ถึง 1,200 ลบ.ม./วัน ต่อชุด โมดูลสำเร็จรูปนี้ลดเวลาการก่อสร้างหน้างานลง 70% และพร้อมเดินระบบได้ในเวลาไม่ถึง 14 วัน\n\n3. เป้าหมายความยั่งยืนและการปฏิบัติตามกฎหมาย\nการจับคู่ระบบ DAF เข้ากับถุงกรองตะกอน Geotube ช่วยให้โรงงานสิ่งทอและเคมีบรรลุประสิทธิภาพการทำให้น้ำใสสูงถึง 95%",
                    'zh' => "1. 区域市场需求\n东南亚迅速的工业增长创造了对可扩展废水处理撬装设备的迫切需求。当地环保法规对未处理的工业排放予以重罚，促使制造集团采用交钥匙处理系统。\n\n2. 集装箱式 DAF 气浮部署\nEcoReve 已部署集装箱式溶气气浮 (DAF) 单元，单撬每日可处理高达 1,200 m³ 的废水。这些即插即用模块将现场土建工程时间缩短了 70%，且可在 14 天内完成调试。\n\n3. 可持续性与合规目标\n通过将 DAF 澄清池与大容量 Geotube 污泥脱水袋结合，区域纺织和化学工厂实现了零污泥径流和 95% 的水质澄清效率。"
                ], JSON_UNESCAPED_UNICODE),
                'table_of_contents' => json_encode([
                    ['id' => 'sec-1', 'title' => '1. Regional Market Demands'],
                    ['id' => 'sec-2', 'title' => '2. Containerized DAF Deployment'],
                    ['id' => 'sec-3', 'title' => '3. Sustainability & Compliance Goals']
                ]),
                'author_name' => json_encode([
                    'en' => 'Sarah Jenkins',
                    'id' => 'Sarah Jenkins',
                    'ms' => 'Sarah Jenkins',
                    'th' => 'ซาร่าห์ เจนกินส์',
                    'zh' => '莎拉·詹金斯'
                ], JSON_UNESCAPED_UNICODE),
                'author_role' => json_encode([
                    'en' => 'VP Global Partnerships',
                    'id' => 'VP Kemitraan Global',
                    'ms' => 'VP Rakan Kongsi Global',
                    'th' => 'รองประธานฝ่ายพันธมิตรระดับโลก',
                    'zh' => '全球合作副总裁'
                ], JSON_UNESCAPED_UNICODE),
                'author_avatar' => null,
                'image_url' => '/assets/banner-footer.webp',
                'is_featured' => true,
                'published_at' => '2026-05-10 14:30:00',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'news_category_id' => $catFunding,
                'title' => json_encode([
                    'en' => 'Qingdao Topolar Secures $25M Environmental Innovation Facility for Membrane R&D',
                    'id' => 'Qingdao Topolar Raih Pendanaan Inovasi Lingkungan $25 Juta untuk R&D Membran',
                    'ms' => 'Qingdao Topolar Peroleh Kemudahan Inovasi Alam Sekitar $25M Untuk R&D Membran',
                    'th' => 'Qingdao Topolar คว้าทุนนวัตกรรมสิ่งแวดล้อม 25 ล้านดอลลาร์เพื่อวิจัยเมมเบรน',
                    'zh' => '青岛拓普拉获得 2,500 万美元环保创新资金，用于薄膜研发'
                ], JSON_UNESCAPED_UNICODE),
                'slug' => 'qingdao-topolar-secures-25m-innovation-facility',
                'read_time' => json_encode([
                    'en' => '4 MIN READ',
                    'id' => 'BACA 4 MENIT',
                    'ms' => 'BACA 4 MINIT',
                    'th' => 'อ่าน 4 นาที',
                    'zh' => '阅读需 4 分钟'
                ], JSON_UNESCAPED_UNICODE),
                'summary' => json_encode([
                    'en' => 'Accelerating ceramic membrane MBR development to withstand extreme chemical pH and acidic factory discharge.',
                    'id' => 'Akselerasi pengembangan MBR membran keramik untuk menahan pH kimia ekstrem dan pembuangan asam pabrik.',
                    'ms' => 'Mempercepat pembangunan MBR membran seramik untuk menahan pH kimia ekstrim dan pelepasan asid kilang.',
                    'th' => 'เร่งพัฒนาเยื่อกรองเซรามิก MBR เพื่อทนต่อสารเคมี pH รุนแรงและน้ำเสียกรดจากโรงงาน',
                    'zh' => '加速陶瓷膜 MBR 研发，使其能够承受极端化学 pH 值和酸性工厂排放。'
                ], JSON_UNESCAPED_UNICODE),
                'content' => json_encode([
                    'en' => "1. Series B Facility Terms\nQingdao Topolar New Material Co.,Ltd. has secured $25 million in environmental innovation funding led by regional clean technology ventures. The facility will directly fund automated membrane sintering production lines.\n\n2. Ceramic Membrane Material Breakthroughs\nUnlike conventional polymeric hollow fibers that degrade under pH extremes, Topolar's ceramic flat-sheet membranes withstand concentrated nitric and sulfuric wash acid while maintaining a steady flux rate above 45 L/m²·h.",
                    'id' => "1. Ketentuan Fasilitas Seri B\nQingdao Topolar New Material Co.,Ltd. telah memperoleh pendanaan inovasi lingkungan senilai $25 juta yang dipimpin oleh usaha teknologi bersih regional. Fasilitas ini akan membiayai langsung lini produksi sintering membran otomatis.\n\n2. Terobosan Bahan Membran Keramik\nBerbeda dengan serat berongga polimer konvensional yang terdegradasi di bawah pH ekstrem, membran lembaran datar keramik Topolar menahan asam nitrat dan sulfat pekat sambil mempertahankan laju fluks stabil di atas 45 L/m²·h.",
                    'ms' => "1. Syarat Kemudahan Siri B\nQingdao Topolar New Material Co.,Ltd. telah memperoleh pembiayaan inovasi alam sekitar senilai $25 juta yang diterajui oleh syarikat teknologi bersih serantau. Kemudahan ini akan membiayai terus talian pengeluaran sintering membran automatik.\n\n2. Kemajuan Bahan Membran Seramik\nBerbeza dengan gentian berongga polimer konvensional yang rosak di bawah pH ekstrim, membran kepingan rata seramik Topolar menahan asid nitrik dan sulfurik pekat sambil mengekalkan kadar fluks stabil di atas 45 L/m²·h.",
                    'th' => "1. เงื่อนไขเงินทุน Series B\nQingdao Topolar New Material Co.,Ltd. ได้รับเงินทุนนวัตกรรมสิ่งแวดล้อมจำนวน 25 ล้านดอลลาร์ เพื่อนำไปลงทุนในสายการผลิตการเผาผนึกเมมเบรนอัตโนมัติโดยตรง\n\n2. ความก้าวหน้าของวัสดุเมมเบรนเซรามิก\nแผ่นกรองเซรามิกแบบแบนของ Topolar ทนทานต่อกรดไนตริกและกรดซัลฟิวริกเข้มข้นได้ดีโดยรักษาอัตราการไหลคงที่เหนือ 45 L/m²·h",
                    'zh' => "1. B 轮融资条款\n青岛拓普拉新材料有限公司获得由区域清洁技术创投领投的 2,500 万美元环保创新资金。该笔资金将直接用于自动化薄膜烧结生产线的建设。\n\n2. 陶瓷膜材料突破\n与在极端 pH 值下易降解的传统聚合物中空纤维不同，拓普拉的陶瓷平板膜能够承受浓硝酸和浓硫酸的清洗，同时保持 45 L/m²·h 以上的稳定通量。"
                ], JSON_UNESCAPED_UNICODE),
                'table_of_contents' => json_encode([
                    ['id' => 'sec-1', 'title' => '1. Series B Facility Terms'],
                    ['id' => 'sec-2', 'title' => '2. Ceramic Membrane Material Breakthroughs']
                ]),
                'author_name' => json_encode([
                    'en' => 'Michael Zhang',
                    'id' => 'Michael Zhang',
                    'ms' => 'Michael Zhang',
                    'th' => 'ไมเคิล จาง',
                    'zh' => '张麦克'
                ], JSON_UNESCAPED_UNICODE),
                'author_role' => json_encode([
                    'en' => 'Chief Financial Officer',
                    'id' => 'Direktur Keuangan',
                    'ms' => 'Ketua Pegawai Kewangan',
                    'th' => 'ประธานเจ้าหน้าที่ฝ่ายการเงิน',
                    'zh' => '首席财务官'
                ], JSON_UNESCAPED_UNICODE),
                'author_avatar' => null,
                'image_url' => '/assets/news/news1.png',
                'is_featured' => false,
                'published_at' => '2026-04-18 09:15:00',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 4,
                'news_category_id' => $catTechnology,
                'title' => json_encode([
                    'en' => 'Autonomous SCADA APIs & Real-Time COD Sensors Integrated Across 500+ Enterprise Sites',
                    'id' => 'API SCADA Otonom & Sensor COD Real-Time Terintegrasi di 500+ Lokasi Perusahaan',
                    'ms' => 'API SCADA Otonom & Sensor COD Masa Nyata Disepadukan Di 500+ Tapak Syarikat',
                    'th' => 'API SCADA อัตโนมัติและเซนเซอร์ COD แบบเรียลไทม์ได้รับการติดตั้งในโรงงานกว่า 500แห่ง',
                    'zh' => '自主 SCADA API 与实时 COD 传感器已成功集成于 500+ 企业现场'
                ], JSON_UNESCAPED_UNICODE),
                'slug' => 'autonomous-scada-apis-realtime-cod-sensors',
                'read_time' => json_encode([
                    'en' => '7 MIN READ',
                    'id' => 'BACA 7 MENIT',
                    'ms' => 'BACA 7 MINIT',
                    'th' => 'อ่าน 7 นาที',
                    'zh' => '阅读需 7 分钟'
                ], JSON_UNESCAPED_UNICODE),
                'summary' => json_encode([
                    'en' => 'Next-generation water quality command center providing instant telemetry and automated dosing valve controls.',
                    'id' => 'Pusat komando kualitas air generasi berikutnya yang menyediakan telemetri instan dan kontrol katup dosis otomatis.',
                    'ms' => 'Pusat kawalan kualiti air generasi seterusnya yang menyediakan telemetri serta-merta dan kawalan injap dos automatik.',
                    'th' => 'ศูนย์ควบคุมคุณภาพน้ำยุคใหม่ที่ให้ข้อมูลวัดระยะไกลแบบทันทีและควบคุมวาล์วสารเคมีอัตโนมัติ',
                    'zh' => '下一代水质指挥中心，提供即时遥测与自动化加药阀门控制。'
                ], JSON_UNESCAPED_UNICODE),
                'content' => json_encode([
                    'en' => "1. IoT Sensor Network Architecture\nEcoReve's cloud telemetry platform connects inline UV-Vis spectrophotometric sensors across hundreds of factory sites. Data streams are encrypted via Modbus TCP/IP and ingested into central monitoring dashboards every 15 seconds.\n\n2. Automated Chemical Dosing Algorithms\nWhen incoming effluent COD spikes above set thresholds, the system automatically modulates variable-speed dosing pumps for PAC and PAM polymers, reducing chemical waste by 28%.",
                    'id' => "1. Arsitektur Jaringan Sensor IoT\nPlatform telemetri awan EcoReve menghubungkan sensor spektrofotometri UV-Vis inline di ratusan lokasi pabrik. Aliran data dienkripsi melalui Modbus TCP/IP dan dimuat ke dasbor pemantauan pusat setiap 15 detik.\n\n2. Algoritma Dosis Kimia Otomatis\nKetika COD efluen yang masuk melonjak di atas ambang batas yang ditetapkan, sistem secara otomatis menyesuaikan pompa dosis PAC dan PAM, mengurangi limbah kimia sebesar 28%.",
                    'ms' => "1. Seni Bina Rangkaian Sensor IoT\nPlatform telemetri awan EcoReve menghubungkan sensor spektrofotometri UV-Vis dalam talian di ratusan tapak kilang. Aliran data dienkripsi melalui Modbus TCP/IP dan dimasukkan ke papan pemantauan pusat setiap 15 saat.\n\n2. Algoritma Dos Kimia Automatik\nApabila COD efluen meningkat melebihi ambang yang ditetapkan, sistem melaraskan pam dos PAC dan PAM secara automatik, mengurangkan sisa kimia sebanyak 28%.",
                    'th' => "1. สถาปัตยกรรมเครือข่ายเซนเซอร์ IoT\nแพลตฟอร์มมอนิเตอร์บนคลาวด์ของ EcoReve เชื่อมต่อเซนเซอร์ UV-Vis เข้ากับโรงงานหลายร้อยแห่ง สตรีมข้อมูลถูกเข้ารหัสและส่งไปยังแดชบอร์ดส่วนกลางทุกๆ 15 วินาที\n\n2. อัลกอริทึมการจ่ายสารเคมีอัตโนมัติ\nเมื่อค่า COD ในน้ำเสียสูงเกินเกณฑ์ ระบบจะปรับปั๊มตวงสารเคมี PAC และ PAM โดยอัตโนมัติ ช่วยลดการสูญเสียสารเคมีลง 28%",
                    'zh' => "1. 物联网传感器网络架构\nEcoReve 云遥测平台连接了数百个工厂现场的在线紫外-可见分光光度传感器。数据流通过 Modbus TCP/IP 进行加密，每 15 秒存入中央监控仪表板一次。\n\n2. 自动化学加药算法\n当进水 COD 飙升至设定阈值以上时，系统会自动调节 PAC 和 PAM 聚合物的变频加药泵，从而将化学浪费减少 28%。"
                ], JSON_UNESCAPED_UNICODE),
                'table_of_contents' => json_encode([
                    ['id' => 'sec-1', 'title' => '1. IoT Sensor Network Architecture'],
                    ['id' => 'sec-2', 'title' => '2. Automated Chemical Dosing Algorithms']
                ]),
                'author_name' => json_encode([
                    'en' => 'David Chen',
                    'id' => 'David Chen',
                    'ms' => 'David Chen',
                    'th' => 'เดวิด เฉิน',
                    'zh' => '陈大卫'
                ], JSON_UNESCAPED_UNICODE),
                'author_role' => json_encode([
                    'en' => 'Director of Automation Systems',
                    'id' => 'Direktur Sistem Otomasi',
                    'ms' => 'Pengarah Sistem Automasi',
                    'th' => 'ผู้อำนวยการระบบอัตโนมัติ',
                    'zh' => '自动化系统总监'
                ], JSON_UNESCAPED_UNICODE),
                'author_avatar' => null,
                'image_url' => '/assets/news/news2.png',
                'is_featured' => false,
                'published_at' => '2026-04-02 11:45:00',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 5,
                'news_category_id' => $catPartnership,
                'title' => json_encode([
                    'en' => 'EcoReve Awarded Global Water Excellence Trophy at Qingdao Environmental Expo',
                    'id' => 'EcoReve Dianugerahi Trofi Keunggulan Air Global di Expo Lingkungan Qingdao',
                    'ms' => 'EcoReve Dianugerahkan Trofi Kecemerlangan Air Global di Ekspo Alam Sekitar Qingdao',
                    'th' => 'EcoReve คว้าถ้วยรางวัลความเป็นเลิศด้านน้ำระดับโลกในงาน Qingdao Environmental Expo',
                    'zh' => 'EcoReve 在青岛环保博览会上荣获全球卓越水技术奖章'
                ], JSON_UNESCAPED_UNICODE),
                'slug' => 'ecoreve-awarded-global-water-excellence-trophy',
                'read_time' => json_encode([
                    'en' => '5 MIN READ',
                    'id' => 'BACA 5 MENIT',
                    'ms' => 'BACA 5 MINIT',
                    'th' => 'อ่าน 5 นาที',
                    'zh' => '阅读需 5 分钟'
                ], JSON_UNESCAPED_UNICODE),
                'summary' => json_encode([
                    'en' => 'Recognized by international environmental committees for cutting chemical dosing costs by 38% annually.',
                    'id' => 'Diakui oleh komite lingkungan internasional karena memangkas biaya dosis kimia sebesar 38% per tahun.',
                    'ms' => 'Diiktiraf oleh jawatankuasa alam sekitar antarabangsa kerana mengurangkan kos dos kimia sebanyak 38% setahun.',
                    'th' => 'ได้รับการยอมรับจากคณะกรรมการสิ่งแวดล้อมระหว่างประเทศในการลดต้นทุนสารเคมีลง 38% ต่อปี',
                    'zh' => '因每年减少 38% 的化学加药成本而获得国际环保委员会的表彰。'
                ], JSON_UNESCAPED_UNICODE),
                'content' => json_encode([
                    'en' => "1. Expo Committee Recognition\nAt the annual Qingdao International Environmental Technology Expo, EcoReve received the Global Water Excellence Trophy in the Industrial Wastewater Innovation category.\n\n2. 38% Chemical Cost Reduction Case Study\nThe award-winning entry highlighted a major chemical park installation where automated coagulant metering decreased annual operational expenditures by 38% while achieving zero compliance violations.",
                    'id' => "1. Pengakuan Komite Expo\nPada Qingdao International Environmental Technology Expo tahunan, EcoReve menerima Trofi Keunggulan Air Global dalam kategori Inovasi Air Limbah Industri.\n\n2. Studi Kasus Pengurangan Biaya Kimia 38%\nEntri pemenang penghargaan menyoroti instalasi taman kimia besar di mana pengukuran koagulan otomatis menurunkan pengeluaran operasional tahunan sebesar 38% tanpa pelanggaran kepatuhan.",
                    'ms' => "1. Pengiktirafan Jawatankuasa Ekspo\nDi Ekspo Teknologi Alam Sekitar Antarabangsa Qingdao tahunan, EcoReve menerima Trofi Kecemerlangan Air Global dalam kategori Inovasi Air Sisa Industri.\n\n2. Kajian Kes Pengurangan Kos Kimia 38%\nEntri yang memenangi anugerah itu menonjolkan pemasangan taman kimia utama di mana meter koagulan automatik mengurangkan perbelanjaan operasi tahunan sebanyak 38%.",
                    'th' => "1. การยอมรับจากคณะกรรมการ Expo\nในงาน Qingdao International Environmental Technology Expo ประจำปี EcoReve ได้รับถ้วยรางวัลความเป็นเลิศด้านน้ำระดับโลกในสาขานวัตกรรมน้ำเสียอุตสาหกรรม\n\n2. กรณีศึกษาการลดต้นทุนสารเคมี 38%\nผลงานที่ได้รับรางวัลเน้นย้ำถึงการติดตั้งในสวนอุตสาหกรรมเคมีขนาดใหญ่ ซึ่งการจ่ายสารสร้างตะกอนแบบอัตโนมัติช่วยลดค่าใช้จ่ายดำเนินงานลง 38%",
                    'zh' => "1. 博览会委员会认可\n在年度青岛国际环保技术博览会上，EcoReve 荣获工业废水创新类“全球卓越水技术奖章”。\n\n2. 38% 化学成本降低案例研究\n获奖项目重点展示了某大型化工园区的安装实例，其中自动混凝剂计量使年度运营支出减少了 38%，同时实现了零合规违规。"
                ], JSON_UNESCAPED_UNICODE),
                'table_of_contents' => json_encode([
                    ['id' => 'sec-1', 'title' => '1. Expo Committee Recognition'],
                    ['id' => 'sec-2', 'title' => '2. 38% Chemical Cost Reduction Case Study']
                ]),
                'author_name' => json_encode([
                    'en' => 'Elena Rostova',
                    'id' => 'Elena Rostova',
                    'ms' => 'Elena Rostova',
                    'th' => 'เอเลน่า รอสตาวา',
                    'zh' => '埃琳娜·罗斯托娃'
                ], JSON_UNESCAPED_UNICODE),
                'author_role' => json_encode([
                    'en' => 'Principal Chemical R&D Lead',
                    'id' => 'Kepala Tim R&D Kimia Utama',
                    'ms' => 'Ketua R&D Kimia Utama',
                    'th' => 'หัวหน้าทีม R&D สารเคมี',
                    'zh' => '首席化学研发负责人'
                ], JSON_UNESCAPED_UNICODE),
                'author_avatar' => null,
                'image_url' => '/assets/news/news3.png',
                'is_featured' => false,
                'published_at' => '2026-03-28 16:00:00',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 6,
                'news_category_id' => $catResearch,
                'title' => json_encode([
                    'en' => 'High-Performance Zero-Leakage Butterfly Valves in Harsh Chemical Environments',
                    'id' => 'Katup Kupu-Kupu Tanpa Kebocoran Performa Tinggi di Lingkungan Kimia Keras',
                    'ms' => 'Injap Kupu-Kupu Tanpa Kebocoran Berprestasi Tinggi Dalam Persekitaran Kimia Keras',
                    'th' => 'วาล์วผีเสื้อประสิทธิภาพสูงไร้การรั่วซึมในสภาพแวดล้อมสารเคมีรุนแรง',
                    'zh' => '恶劣化学环境下高性能零泄漏蝶阀的应用研究'
                ], JSON_UNESCAPED_UNICODE),
                'slug' => 'high-performance-zero-leakage-butterfly-valves',
                'read_time' => json_encode([
                    'en' => '6 MIN READ',
                    'id' => 'BACA 6 MENIT',
                    'ms' => 'BACA 6 MINIT',
                    'th' => 'อ่าน 6 นาที',
                    'zh' => '阅读需 6 分钟'
                ], JSON_UNESCAPED_UNICODE),
                'summary' => json_encode([
                    'en' => 'Engineering analysis of PE mixing tanks and precision chemical dosing pumps under extreme pressure.',
                    'id' => 'Analisis rekayasa tangki pencampur PE dan pompa dosis kimia presisi di bawah tekanan ekstrem.',
                    'ms' => 'Analisis kejuruteraan tangki pencampur PE dan pam dos kimia ketepatan di bawah tekanan ekstrim.',
                    'th' => 'การวิเคราะห์ทางวิศวกรรมของถังผสม PE และปั๊มตวงสารเคมีแม่นยำสูงภายใต้แรงดันสูง',
                    'zh' => '极端压力下 PE 混合罐及精密化学加药泵的工程技术分析。'
                ], JSON_UNESCAPED_UNICODE),
                'content' => json_encode([
                    'en' => "1. Valve Seal Degradation Stress Tests\nControlling corrosive acidic fluids requires specialized valve geometry. Extended 2,000-hour pressure cycling tests demonstrated that PTFE-lined lug-type butterfly valves maintain 100% bubble-tight shutoff under 1.6 MPa working pressure.\n\n2. PTFE vs EPDM Material Benchmarks\nComparative metallurgical analysis showed zero pitting or elastomeric swelling in PTFE seats exposed to concentrated sodium hypochlorite and 98% sulfuric acid.",
                    'id' => "1. Uji Tekanan Degradasi Segel Katup\nPengendalian cairan asam korosif memerlukan geometri katup khusus. Pengujian siklus tekanan 2.000 jam yang diperpanjang menunjukkan bahwa katup kupu-kupu tipe lug berlapis PTFE mempertahankan penutupan rapat 100% di bawah tekanan kerja 1,6 MPa.\n\n2. Tolok Ukur Bahan PTFE vs EPDM\nAnalisis metalurgi komparatif menunjukkan nol korosi atau pembengkakan elastomer pada dudukan PTFE yang terpapar natrium hipoklorit pekat dan 98% asam sulfat.",
                    'ms' => "1. Ujian Tekanan Degradasi Meterai Injap\nKawalan cecair asid kakisan memerlukan geometri injap khusus. Ujian kitaran tekanan 2,000 jam menunjukkan bahawa injap kupu-kupu jenis lug bersalut PTFE mengekalkan penutupan kedap 100% di bawah tekanan kerja 1.6 MPa.\n\n2. Penanda Aras Bahan PTFE lwn EPDM\nAnalisis metalurgi perbandingan menunjukkan tiada kakisan atau pembengkakan elastomer pada tempat duduk PTFE yang terdedah kepada natrium hipoklorit pekat dan 98% asid sulfurik.",
                    'th' => "1. การทดสอบการเสื่อมสภาพของซีลวาล์ว\nการควบคุมของเหลวกรดกัดกร่อนต้องการโครงสร้างวาล์วพิเศษ การทดสอบแรงดัน 2,000 ชั่วโมงแสดงให้เห็นว่าวาล์วผีเสื้อซับด้วย PTFE รักษาการปิดสนิท 100% ภายใต้แรงดัน 1.6 MPa\n\n2. เปรียบเทียบวัสดุ PTFE กับ EPDM\nการวิเคราะห์ทางโลหวิทยาพบว่าเบาะ PTFE ไม่มีการกัดกร่อนหรือการบวมเมื่อสัมผัสกับโซเดียมไฮโปคลอไรต์เข้มข้นและกรดซัลฟิวริก 98%",
                    'zh' => "1. 阀门密封降解压力测试\n控制腐蚀性酸性流体需要专门的阀门结构。长达 2,000 小时的压力循环测试表明，衬 PTFE 对夹式蝶阀在 1.6 MPa 工作压力下能保持 100% 的气密关闭。\n\n2. PTFE 与 EPDM 材料对比标杆\n对比冶金分析表明，暴露于浓次氯酸钠和 98% 硫酸中的 PTFE 阀座没有点蚀或弹性体膨胀现象。"
                ], JSON_UNESCAPED_UNICODE),
                'table_of_contents' => json_encode([
                    ['id' => 'sec-1', 'title' => '1. Valve Seal Degradation Stress Tests'],
                    ['id' => 'sec-2', 'title' => '2. PTFE vs EPDM Material Benchmarks']
                ]),
                'author_name' => json_encode([
                    'en' => 'Arthur Vance',
                    'id' => 'Arthur Vance',
                    'ms' => 'Arthur Vance',
                    'th' => 'อาร์เธอร์ แวนซ์',
                    'zh' => '亚瑟·范斯'
                ], JSON_UNESCAPED_UNICODE),
                'author_role' => json_encode([
                    'en' => 'Senior Valve Metallurgist',
                    'id' => 'Ahli Metalurgi Katup Senior',
                    'ms' => 'Pakar Metalurgi Injap Kanan',
                    'th' => 'นักโลหะวิทยาวาล์วอาวุโส',
                    'zh' => '资深阀门冶金专家'
                ], JSON_UNESCAPED_UNICODE),
                'author_avatar' => null,
                'image_url' => '/assets/news/news4.png',
                'is_featured' => false,
                'published_at' => '2026-03-12 13:20:00',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ];

        foreach ($articles as $art) {
            DB::table('news')->insert($art);
        }
    }
}
