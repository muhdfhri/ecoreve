<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FaqSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('faqs')->insertOrIgnore([
            [
                'question' => json_encode([
                    'en' => 'DO YOU MANUFACTURE THE EQUIPMENT USED TO BUILD THE WATER TREATMENT PLANTS?',
                    'id' => 'APAKAH ANDA MEMANUFAKTUR PERALATAN UNTUK MEMBANGUN INSTALASI PENGOLAHAN AIR?',
                    'ms' => 'ADAKAH ANDA MEMANUFACTUR PERALATAN UNTUK MEMBINA LOJI RAWATAN AIR?',
                    'th' => 'คุณเป็นผู้ผลิตอุปกรณ์ที่ใช้ในโรงงานบำบัดน้ำหรือไม่?',
                    'zh' => '您是否自行制造用于构建水处理厂的设备？'
                ]),
                'answer' => json_encode([
                    'en' => "Yes. We're a true OEM, not a broker. We own the design, the engineering, and the supply chain for all industrial water & wastewater infrastructure.",
                    'id' => "Ya. Kami adalah OEM asli, bukan perantara. Kami memiliki desain, rekayasa, dan rantai pasokan untuk seluruh infrastruktur air & limbah industri.",
                    'ms' => "Ya. Kami adalah OEM tulen, bukan broker. Kami memiliki reka bentuk, kejuruteraan, dan rantai bekalan untuk semua infrastruktur air & air sisa industri.",
                    'th' => "ใช่ เราเป็นผู้ผลิต OEM แท้จริง ไม่ใช่นายหน้า เราเป็นเจ้าของงานออกแบบ วิศวกรรม และห่วงโซ่อุปทานทั้งหมด",
                    'zh' => "是的。我们是真正的 OEM 原厂制造商，非中间商。我们拥有全套工业水与废水处理设施的设计、工程与供应链。"
                ]),
                'sort_order' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'question' => json_encode([
                    'en' => 'WHAT PRODUCTS DO YOU OFFER?',
                    'id' => 'PRODUK APA SAJA YANG ANDA TAWARKAN?',
                    'ms' => 'APAKAH PRODUK YANG ANDA TAWARKAN?',
                    'th' => 'คุณมีผลิตภัณฑ์อะไรบ้าง?',
                    'zh' => '您提供哪些类型的产品？'
                ]),
                'answer' => json_encode([
                    'en' => 'We engineer containerized & skid-mounted Demineralization Plants, Softener Systems, Horizontal & Vertical DAF Flotation units, Geotube Dewatering systems, PE Storage Tanks, Chemical Dosing Pumps, and zero-leakage High-Performance Butterfly Valves.',
                    'id' => 'Kami merancang Instalasi Demineralisasi berskid & kontainer, Sistem Pelunak, Unit Flotasi DAF, Sistem Dewatering Geotube, Tangki PE, Pompa Dosis Kimia, dan Katup Kupu-kupu Kinerja Tinggi.',
                    'ms' => 'Kami mereka bentuk Loji Demineralisasi kontena & skid, Sistem Pelembut, Unit Pengapungan DAF, Sistem Penyahairan Geotube, Tangki PE, dan Injap Rama-rama.',
                    'th' => 'เราออกแบบโรงงานบำบัดน้ำ Demineralization, ระบบทำให้น้ำอ่อน, Unit DAF Flotation, ถังเก็บ PE และวาล์วผีเสื้อประสิทธิภาพสูง',
                    'zh' => '我们工程制造集装箱与框架式脱盐水系统、软化水系统、DAF 气浮设备、污泥脱水系统、PE 储罐与高性能阀门。'
                ]),
                'sort_order' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'question' => json_encode([
                    'en' => 'CAN YOU HANDLE CUSTOM SPECS?',
                    'id' => 'DAPATKAH ANDA MENANGANI SPESIFIKASI KUSTOM?',
                    'ms' => 'BOLEHKAH ANDA MENGENDALIKAN SPESIFIKASI TERSUAI?',
                    'th' => 'คุณสามารถรองรับสเปกตามสั่งได้หรือไม่?',
                    'zh' => '您能否承接定制化的技术规格？'
                ]),
                'answer' => json_encode([
                    'en' => 'Absolutely. Every industrial plant requires unique flow rates, chemical pH tolerances, and telemetry integration. Our engineering team custom builds systems according to your exact plant discharge parameters and SCADA specifications.',
                    'id' => 'Tentu saja. Setiap pabrik industri membutuhkan laju aliran, toleransi pH kimia, dan integrasi telemetri yang unik. Tim rekayasa kami merancang sistem sesuai spesifikasi SCADA dan parameter Anda.',
                    'ms' => 'Tentu sahaja. Setiap kilang industri memerlukan kadar aliran dan toleransi pH yang unik. Pasukan kejuruteraan kami mereka bentuk mengikut parameter khusus anda.',
                    'th' => 'ได้แน่นอน โรงงานอุตสาหกรรมแต่ละแห่งต้องการอัตราการไหลและค่า pH ที่แตกต่างกัน ทีมวิศวกรของเราพร้อมสร้างระบบตามสเปก SCADA ของคุณ',
                    'zh' => '完全可以。每个工业工厂都需要独特的流量、化学 pH 耐受度与遥测集成。我们的工程团队根据您的 SCADA 规范定制建造。'
                ]),
                'sort_order' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
