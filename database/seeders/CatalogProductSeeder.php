<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CatalogProductSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('category_product')->truncate();
        DB::table('products')->truncate();
        DB::table('categories')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $categoryJson = <<<'JSON'
{
  "pumps-fluid-transfer": {
    "name": {
      "en": "Pumps & Fluid Transfer",
      "id": "Pompa & Transfer Cairan",
      "ms": "Pam & Pemindahan Cecair",
      "th": "ปั๊มและการส่งถ่ายของเหลว",
      "zh": "泵与流体输送设备"
    },
    "description": {
      "en": "Industrial pumps, submersible sewage pumps, dosing & metering pumps for fluid transfer.",
      "id": "Pompa industri, pompa celup limbah, dan pompa metering dosis untuk transfer fluida.",
      "ms": "Pam industri, pam tenggelam air sisa, dan pam meter pendosan.",
      "th": "ปั๊มอุตสาหกรรม ปั๊มจุ่มน้ำเสีย และปั๊มตวงสารเคมีสำหรับการส่งถ่ายของเหลว",
      "zh": "工业泵、潜水排污泵及精密计量加药泵。"
    }
  },
  "valves-actuators": {
    "name": {
      "en": "Valves & Actuators",
      "id": "Katup & Pengendali Aliran",
      "ms": "Injap & Penggerak",
      "th": "วาล์วและหัวขับวาล์ว",
      "zh": "阀门与执行机构"
    },
    "description": {
      "en": "Zero-leakage butterfly valves, ball valves, check valves, gate valves, and pneumatic actuators.",
      "id": "Katup kupu-kupu bebas bocor, katup bola, check valve, katup gate, dan aktuator pneumatik.",
      "ms": "Injap rama-rama bebas kebocoran, injap bebola, injap semakan, dan penggerak pneumatik.",
      "th": "วาล์วผีเสื้อป้องกันการรั่วซึม วาล์วบอล เช็ควาล์ว และหัวขับนิวแมติก",
      "zh": "零泄漏蝶阀、球阀、止回阀及气动执行器。"
    }
  },
  "aeration-air-systems": {
    "name": {
      "en": "Aeration & Air Systems",
      "id": "Aerasi, Blower & Kompresor",
      "ms": "Pengudaraan & Sistem Udara",
      "th": "ระบบเติมอากาศและระบบลม",
      "zh": "曝气与风机系统"
    },
    "description": {
      "en": "Roots blowers, high-speed turbo fans, fine bubble diffusers, and surface jet aerators.",
      "id": "Blower roots, blower turbo kecepatan tinggi, diffuser gelembung halus, dan aerator jet.",
      "ms": "Penghembus roots, kipas turbo kelajuan tinggi, dan pembaur gelembung halus.",
      "th": "โบลเวอร์โรตารี โบลเวอร์เทอร์โบความเร็วสูง และหัวดิฟฟิวเซอร์เติมอากาศ",
      "zh": "罗茨风机、高速涡轮风机、微孔曝气器及表面喷射曝气机。"
    }
  },
  "electrical-process-sensors": {
    "name": {
      "en": "Electrical & Process Sensors",
      "id": "Sensor, Transmitter & Pengukuran Listrik",
      "ms": "Penderia Elektrik & Proses",
      "th": "เซนเซอร์ไฟฟ้าและเซนเซอร์วัดกระบวนการ",
      "zh": "电气与过程传感器"
    },
    "description": {
      "en": "Pressure transmitters, radar level meters, temperature sensors, and digital power meters.",
      "id": "Transmitter tekanan, meter level radar, sensor suhu, dan meter daya listrik digital.",
      "ms": "Penghantar tekanan, meter aras radar, penderia suhu, dan meter kuasa digital.",
      "th": "เพรสเชอร์ทรานสมิตเตอร์ เครื่องวัดระดับด้วยเรดาร์ และเซนเซอร์วัดอุณหภูมิ",
      "zh": "压力变送器、雷达物位计、温度传感器及数字电力仪表。"
    }
  },
  "water-process-analyzers": {
    "name": {
      "en": "Water & Process Analyzers",
      "id": "Instrumen Analisis Kualitas Air & Gas",
      "ms": "Penganalisis Air & Proses",
      "th": "เครื่องมือวิเคราะห์คุณภาพน้ำและแก๊ส",
      "zh": "水质与过程分析仪"
    },
    "description": {
      "en": "Online COD, pH/ORP, TDS, TSS, turbidity analyzers and electromagnetic flow meters.",
      "id": "Penganalisis COD, pH/ORP, TDS, TSS, kekeruhan online dan meter aliran elektromagnetik.",
      "ms": "Penganalisis COD, pH/ORP, TDS, TSS online dan meter aliran elektromagnetik.",
      "th": "เครื่องตรวจวัด COD, pH/ORP, TDS, TSS ความขุ่นออนไลน์ และเครื่องวัดการไหลแม่เหล็กไฟฟ้า",
      "zh": "在线 COD、pH/ORP、TDS、TSS、浊度分析仪及电磁流量计。"
    }
  },
  "filtration-dewatering": {
    "name": {
      "en": "Filtration & Dewatering",
      "id": "Filtrasi, Pemisahan Mekanis & Dewatering",
      "ms": "Penapisan & Penyahairan",
      "th": "ระบบกรองและการรีดน้ำตะกอน",
      "zh": "过滤与污泥脱水设备"
    },
    "description": {
      "en": "Multi-disk screw press, belt filter press, decanter centrifuge, bag filters & geotube bags.",
      "id": "Screw press multi-disk, belt filter press, decanter sentrifus, filter bag & kantung geotube.",
      "ms": "Penyahair skru berbilang cakera, penekan penapis tali sawat, dan beg geotube.",
      "th": "เครื่องรีดน้ำตะกอนสครูว์เพรส เครื่องอัดกรองแบบสายพาน ดีแคนเตอร์ และถุงจีโอทูป",
      "zh": "叠螺式污泥脱水机、带式压滤机、卧螺离心机及土工管袋。"
    }
  },
  "membranes-ion-exchange": {
    "name": {
      "en": "Membranes & Ion Exchange",
      "id": "Teknologi Membran & Resin",
      "ms": "Membran & Pertukaran Ion",
      "th": "เทคโนโลยีเมมเบรนและเรซิน",
      "zh": "膜组件与离子交换树脂"
    },
    "description": {
      "en": "Tubular ceramic membranes, MBR flat sheet elements, and strong base anion/cation resins.",
      "id": "Membran keramik tubular, elemen flat sheet MBR, dan resin penukar anion/kation.",
      "ms": "Membran seramik tiub, elemen lembaran rata MBR, dan resin pertukaran ion.",
      "th": "เมมเบรนเซรามิก แผ่นเมมเบรน MBR และเรซินแลกเปลี่ยนไอออน",
      "zh": "管式陶瓷膜、MBR平板膜组件及强酸强碱离子交换树脂。"
    }
  },
  "treatment-plants-systems": {
    "name": {
      "en": "Treatment Plants & Systems",
      "id": "Instalasi Paket Sistem Pengolahan Limbah",
      "ms": "Loji & Sistem Rawatan",
      "th": "ระบบบำบัดแบบสำเร็จรูป",
      "zh": "成套水处理厂与系统"
    },
    "description": {
      "en": "Horizontal & vertical DAF clarifiers, two-bed demineralization plants & water softeners.",
      "id": "Clarifier DAF horizontal & vertikal, plant demineralisasi dua tangki & pelunak air.",
      "ms": "Penjelas DAF horizontal & menegak, loji demineralisasi & pelembut air.",
      "th": "ระบบ DAF แนวนอนและแนวตั้ง ระบบผลิตน้ำบริสุทธิ์ Demineralization และระบบทำให้น้ำอ่อน",
      "zh": "卧式与立式 DAF 气浮澄清池、双床去离子纯水设备及软化水系统。"
    }
  },
  "chemicals-chemical-feeding": {
    "name": {
      "en": "Chemicals & Chemical Feeding",
      "id": "Bahan Kimia & Penakaran Otomatis",
      "ms": "Bahan Kimia & Penyuapan Kimia",
      "th": "สารเคมีและระบบจ่ายสารเคมีอัตโนมัติ",
      "zh": "水处理药剂与加药系统"
    },
    "description": {
      "en": "PAC 30%, PAM flocculants, alum, soda ash, dry powder feeders, and mixing tanks.",
      "id": "PAC 30%, flokulan PAM, tawas, soda ash, pengumpan bubuk kering, dan tangki pengaduk.",
      "ms": "PAC 30%, flokulan PAM, tawas, soda ash, dan tangki pencampur.",
      "th": "สารเคมี PAC 30%, โพลิเมอร์ PAM, สารส้ม, โซดาแอช และถังผสมสารเคมี",
      "zh": "PAC 聚合氯化铝、PAM 聚丙烯酰胺、明矾、纯碱及自动加药设备。"
    }
  },
  "power-auxiliary-equipment": {
    "name": {
      "en": "Power & Auxiliary Equipment",
      "id": "Pembangkit Daya & Peralatan Pendukung",
      "ms": "Kuasa & Peralatan Sampingan",
      "th": "ระบบพลังงานและอุปกรณ์สนับสนุน",
      "zh": "工业 HMI 人机界面、LiFePO4 磷酸铁锂电池组、550W 太阳能板及风力发电机。"
    },
    "description": {
      "en": "HMI display screens, LiFePO4 battery packs, 550W solar panels, and wind turbines.",
      "id": "Layar HMI industri, pak baterai LiFePO4, panel surya 550W, dan turbin angin.",
      "ms": "Skrin paparan HMI industri, pek bateri LiFePO4, panel solar 550W, dan turbin angin.",
      "th": "หน้าจอสัมผัส HMI ชุดแบตเตอรี่ LiFePO4 แผงโซลาร์เซลล์ 550W และกังหันลม",
      "zh": "工业 HMI 人机界面、LiFePO4 磷酸铁锂电池组、550W 太阳能板及风力发电机。"
    }
  }
}
JSON;

        $productsJson = <<<'JSON'
[
  {
    "name": {
      "en": "Chemical Dosing Pump",
      "id": "Pompa Dosing Kimia",
      "ms": "Pam Pendos Kimia",
      "th": "ปั๊มจ่ายสารเคมี",
      "zh": "化学加药计量泵"
    },
    "slug": "pumps-fluid-transfer",
    "short_desc": {
      "en": "High-performance chemical dosing pump designed for industrial water treatment and demanding engineering operations.",
      "id": "Pompa Dosing Kimia performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Pam Pendos Kimia berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "ปั๊มจ่ายสารเคมี ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能化学加药计量泵，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/chemicaldosingpump.webp",
    "gallery_images": [
      "/assets/products/chemicaldosingpump.webp",
      "/assets/products/chemicaldosingpump_detail_1.webp",
      "/assets/products/chemicaldosingpump_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Submersible Cutter Pump",
      "id": "Pompa Celup Pemotong",
      "ms": "Pam Tenggelam Pemotong",
      "th": "ปั๊มจุ่มตัดขยะ",
      "zh": "潜水切割泵"
    },
    "slug": "pumps-fluid-transfer",
    "short_desc": {
      "en": "High-performance submersible cutter pump designed for industrial water treatment and demanding engineering operations.",
      "id": "Pompa Celup Pemotong performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Pam Tenggelam Pemotong berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "ปั๊มจุ่มตัดขยะ ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能潜水切割泵，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/cutterpump.webp",
    "gallery_images": [
      "/assets/products/cutterpump.webp",
      "/assets/products/cutterpump_detail_1.webp",
      "/assets/products/cutterpump_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Diaphragm Metering Pump",
      "id": "Pompa Metering Diafragma",
      "ms": "Pam Meter Diafragma",
      "th": "ปั๊มสูบจ่ายแบบไดอะแฟรม",
      "zh": "机械隔膜计量泵"
    },
    "slug": "pumps-fluid-transfer",
    "short_desc": {
      "en": "High-performance diaphragm metering pump designed for industrial water treatment and demanding engineering operations.",
      "id": "Pompa Metering Diafragma performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Pam Meter Diafragma berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "ปั๊มสูบจ่ายแบบไดอะแฟรม ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能机械隔膜计量泵，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/diaphragmmeteringpump.webp",
    "gallery_images": [
      "/assets/products/diaphragmmeteringpump.webp",
      "/assets/products/diaphragmmeteringpump_detail_1.webp",
      "/assets/products/diaphragmmeteringpump_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Industrial Dosing Pump",
      "id": "Pompa Dosing Industri",
      "ms": "Pam Dosing Industri",
      "th": "ปั๊มโดสซิ่งอุตสาหกรรม",
      "zh": "工业定量投加泵"
    },
    "slug": "pumps-fluid-transfer",
    "short_desc": {
      "en": "High-performance industrial dosing pump designed for industrial water treatment and demanding engineering operations.",
      "id": "Pompa Dosing Industri performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Pam Dosing Industri berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "ปั๊มโดสซิ่งอุตสาหกรรม ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能工业定量投加泵，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/dosingpump.webp",
    "gallery_images": [
      "/assets/products/dosingpump.webp",
      "/assets/products/dosingpump_detail_1.webp",
      "/assets/products/dosingpump_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Industrial Gear Pump",
      "id": "Pompa Roda Gigi Industri",
      "ms": "Pam Gear Industri",
      "th": "ปั๊มเฟืองอุตสาหกรรม",
      "zh": "工业齿轮泵"
    },
    "slug": "pumps-fluid-transfer",
    "short_desc": {
      "en": "High-performance industrial gear pump designed for industrial water treatment and demanding engineering operations.",
      "id": "Pompa Roda Gigi Industri performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Pam Gear Industri berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "ปั๊มเฟืองอุตสาหกรรม ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能工业齿轮泵，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/gearpump.webp",
    "gallery_images": [
      "/assets/products/gearpump.webp",
      "/assets/products/gearpump_detail_1.webp",
      "/assets/products/gearpump_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Horizontal Centrifugal Pump",
      "id": "Pompa Sentrifugal Horizontal",
      "ms": "Pam Empar Mendatar",
      "th": "ปั๊มหอยโข่งแนวนอน",
      "zh": "卧式离心泵"
    },
    "slug": "pumps-fluid-transfer",
    "short_desc": {
      "en": "High-performance horizontal centrifugal pump designed for industrial water treatment and demanding engineering operations.",
      "id": "Pompa Sentrifugal Horizontal performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Pam Empar Mendatar berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "ปั๊มหอยโข่งแนวนอน ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能卧式离心泵，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/horizontalcentrifugalpump.webp",
    "gallery_images": [
      "/assets/products/horizontalcentrifugalpump.webp",
      "/assets/products/horizontalcentrifugalpump_detail_1.webp",
      "/assets/products/horizontalcentrifugalpump_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Heavy-Duty Mud Pump",
      "id": "Pompa Lumpur Heavy-Duty",
      "ms": "Pam Lumpur Tugas Berat",
      "th": "ปั๊มดูดโคลนงานหนัก",
      "zh": "重型泥浆泵"
    },
    "slug": "pumps-fluid-transfer",
    "short_desc": {
      "en": "High-performance heavy-duty mud pump designed for industrial water treatment and demanding engineering operations.",
      "id": "Pompa Lumpur Heavy-Duty performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Pam Lumpur Tugas Berat berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "ปั๊มดูดโคลนงานหนัก ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能重型泥浆泵，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/mudpump.webp",
    "gallery_images": [
      "/assets/products/mudpump.webp",
      "/assets/products/mudpump_detail_1.webp",
      "/assets/products/mudpump_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Sludge Reflux Pump",
      "id": "Pompa Refluks Lumpur",
      "ms": "Pam Refluks Enap Cemar",
      "th": "ปั๊มสูบเวียนตะกอน (Reflux)",
      "zh": "污泥回流泵"
    },
    "slug": "pumps-fluid-transfer",
    "short_desc": {
      "en": "High-performance sludge reflux pump designed for industrial water treatment and demanding engineering operations.",
      "id": "Pompa Refluks Lumpur performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Pam Refluks Enap Cemar berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "ปั๊มสูบเวียนตะกอน (Reflux) ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能污泥回流泵，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/refluxpump.webp",
    "gallery_images": [
      "/assets/products/refluxpump.webp",
      "/assets/products/refluxpump_detail_1.webp",
      "/assets/products/refluxpump_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Progressive Cavity Screw Pump",
      "id": "Pompa Ulir Rongga Progresif",
      "ms": "Pam Skru Rongga Progresif",
      "th": "ปั๊มสกรู (Progressive Cavity)",
      "zh": "单螺杆泵 / 渐进腔泵"
    },
    "slug": "pumps-fluid-transfer",
    "short_desc": {
      "en": "High-performance progressive cavity screw pump designed for industrial water treatment and demanding engineering operations.",
      "id": "Pompa Ulir Rongga Progresif performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Pam Skru Rongga Progresif berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "ปั๊มสกรู (Progressive Cavity) ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能单螺杆泵 / 渐进腔泵，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/screwpump.webp",
    "gallery_images": [
      "/assets/products/screwpump.webp",
      "/assets/products/screwpump_detail_1.webp",
      "/assets/products/screwpump_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Industrial Submersible Sewage Pump",
      "id": "Pompa Celup Limbah Industri",
      "ms": "Pam Kumbahan Tenggelam Industri",
      "th": "ปั๊มจุ่มน้ำเสียอุตสาหกรรม",
      "zh": "工业潜水排污泵"
    },
    "slug": "pumps-fluid-transfer",
    "short_desc": {
      "en": "High-performance industrial submersible sewage pump designed for industrial water treatment and demanding engineering operations.",
      "id": "Pompa Celup Limbah Industri performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Pam Kumbahan Tenggelam Industri berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "ปั๊มจุ่มน้ำเสียอุตสาหกรรม ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能工业潜水排污泵，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/submersiblepump.webp",
    "gallery_images": [
      "/assets/products/submersiblepump.webp",
      "/assets/products/submersiblepump_detail_1.webp",
      "/assets/products/submersiblepump_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Industrial Ball Valve",
      "id": "Katup Bola Industri",
      "ms": "Injap Bebola Industri",
      "th": "บอลวาล์วอุตสาหกรรม",
      "zh": "工业球阀"
    },
    "slug": "valves-actuators",
    "short_desc": {
      "en": "High-performance industrial ball valve designed for industrial water treatment and demanding engineering operations.",
      "id": "Katup Bola Industri performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Injap Bebola Industri berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "บอลวาล์วอุตสาหกรรม ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能工业球阀，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/ballvalves.webp",
    "gallery_images": [
      "/assets/products/ballvalves.webp",
      "/assets/products/ballvalves_detail_1.webp",
      "/assets/products/ballvalves_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Wafer Butterfly Valve",
      "id": "Katup Kupu-Kupu Tipe Wafer",
      "ms": "Injap Rama-Rama Wafer",
      "th": "บัตเตอร์ฟลายวาล์วแบบเวเฟอร์",
      "zh": "对夹式蝶阀"
    },
    "slug": "valves-actuators",
    "short_desc": {
      "en": "High-performance wafer butterfly valve designed for industrial water treatment and demanding engineering operations.",
      "id": "Katup Kupu-Kupu Tipe Wafer performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Injap Rama-Rama Wafer berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "บัตเตอร์ฟลายวาล์วแบบเวเฟอร์ ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能对夹式蝶阀，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/butterflyvalves.webp",
    "gallery_images": [
      "/assets/products/butterflyvalves.webp",
      "/assets/products/butterflyvalves_detail_1.webp",
      "/assets/products/butterflyvalves_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Disco Check Valve",
      "id": "Katup Satu Arah Disco",
      "ms": "Injap Semak Disko",
      "th": "ดิสก์เช็ควาล์ว",
      "zh": "超薄对夹式止回阀 (Disco Check)"
    },
    "slug": "valves-actuators",
    "short_desc": {
      "en": "High-performance disco check valve designed for industrial water treatment and demanding engineering operations.",
      "id": "Katup Satu Arah Disco performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Injap Semak Disko berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "ดิสก์เช็ควาล์ว ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能超薄对夹式止回阀 (Disco Check)，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/discocheckvalve.webp",
    "gallery_images": [
      "/assets/products/discocheckvalve.webp",
      "/assets/products/discocheckvalve_detail_1.webp",
      "/assets/products/discocheckvalve_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Electromagnetic Solenoid Valve",
      "id": "Katup Elektromagnetik",
      "ms": "Injap Solenoid Elektromagnet",
      "th": "วาล์วควบคุมแม่เหล็กไฟฟ้า",
      "zh": "电磁控制换向阀"
    },
    "slug": "valves-actuators",
    "short_desc": {
      "en": "High-performance electromagnetic solenoid valve designed for industrial water treatment and demanding engineering operations.",
      "id": "Katup Elektromagnetik performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Injap Solenoid Elektromagnet berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "วาล์วควบคุมแม่เหล็กไฟฟ้า ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能电磁控制换向阀，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/electromagneticvalve.webp",
    "gallery_images": [
      "/assets/products/electromagneticvalve.webp",
      "/assets/products/electromagneticvalve_detail_1.webp",
      "/assets/products/electromagneticvalve_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Flanged Gate Valve",
      "id": "Katup Sorong Flange",
      "ms": "Injap Pintu Bebibir",
      "th": "เกทวาล์วแบบหน้าแปลน",
      "zh": "法兰式闸阀"
    },
    "slug": "valves-actuators",
    "short_desc": {
      "en": "High-performance flanged gate valve designed for industrial water treatment and demanding engineering operations.",
      "id": "Katup Sorong Flange performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Injap Pintu Bebibir berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "เกทวาล์วแบบหน้าแปลน ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能法兰式闸阀，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/gatevalves.webp",
    "gallery_images": [
      "/assets/products/gatevalves.webp",
      "/assets/products/gatevalves_detail_1.webp",
      "/assets/products/gatevalves_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Control Globe Valve",
      "id": "Katup Globe Pengendali",
      "ms": "Injap Glob Kawalan",
      "th": "โกลบวาล์วควบคุมการไหล",
      "zh": "截止控制阀 (Globe Valve)"
    },
    "slug": "valves-actuators",
    "short_desc": {
      "en": "High-performance control globe valve designed for industrial water treatment and demanding engineering operations.",
      "id": "Katup Globe Pengendali performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Injap Glob Kawalan berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "โกลบวาล์วควบคุมการไหล ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能截止控制阀 (Globe Valve)，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/globevalves.webp",
    "gallery_images": [
      "/assets/products/globevalves.webp",
      "/assets/products/globevalves_detail_1.webp",
      "/assets/products/globevalves_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "High Performance Butterfly Valve",
      "id": "Katup Kupu-Kupu Performa Tinggi",
      "ms": "Injap Rama-Rama Berprestasi Tinggi",
      "th": "บัตเตอร์ฟลายวาล์วสมรรถนะสูง",
      "zh": "高性能三偏心蝶阀"
    },
    "slug": "valves-actuators",
    "short_desc": {
      "en": "High-performance high performance butterfly valve designed for industrial water treatment and demanding engineering operations.",
      "id": "Katup Kupu-Kupu Performa Tinggi performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Injap Rama-Rama Berprestasi Tinggi berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "บัตเตอร์ฟลายวาล์วสมรรถนะสูง ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能高性能三偏心蝶阀，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/highperformancebutterflyvalve.webp",
    "gallery_images": [
      "/assets/products/highperformancebutterflyvalve.webp",
      "/assets/products/highperformancebutterflyvalve_detail_1.webp",
      "/assets/products/highperformancebutterflyvalve_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "High Performance Butterfly Valve Series 2",
      "id": "Katup Kupu-Kupu Performa Tinggi Seri 2",
      "ms": "Injap Rama-Rama Berprestasi Tinggi Siri 2",
      "th": "บัตเตอร์ฟลายวาล์วสมรรถนะสูง ซีรีส์ 2",
      "zh": "高性能三偏心蝶阀 第二代"
    },
    "slug": "valves-actuators",
    "short_desc": {
      "en": "High-performance high performance butterfly valve series 2 designed for industrial water treatment and demanding engineering operations.",
      "id": "Katup Kupu-Kupu Performa Tinggi Seri 2 performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Injap Rama-Rama Berprestasi Tinggi Siri 2 berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "บัตเตอร์ฟลายวาล์วสมรรถนะสูง ซีรีส์ 2 ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能高性能三偏心蝶阀 第二代，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/highperformancebutterflyvalve2.webp",
    "gallery_images": [
      "/assets/products/highperformancebutterflyvalve2.webp",
      "/assets/products/highperformancebutterflyvalve2_detail_1.webp",
      "/assets/products/highperformancebutterflyvalve2_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Pneumatic Valve Actuator",
      "id": "Aktuator Pneumatik Katup",
      "ms": "Penggerak Injap Pneumatik",
      "th": "หัวขับลมวาล์ว (Pneumatic)",
      "zh": "气动阀门执行器"
    },
    "slug": "valves-actuators",
    "short_desc": {
      "en": "High-performance pneumatic valve actuator designed for industrial water treatment and demanding engineering operations.",
      "id": "Aktuator Pneumatik Katup performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Penggerak Injap Pneumatik berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "หัวขับลมวาล์ว (Pneumatic) ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能气动阀门执行器，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/pneumaticactuators.webp",
    "gallery_images": [
      "/assets/products/pneumaticactuators.webp",
      "/assets/products/pneumaticactuators_detail_1.webp",
      "/assets/products/pneumaticactuators_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Pilot Operated Solenoid Valve",
      "id": "Katup Solenoid Pilot",
      "ms": "Injap Solenoid Pandu",
      "th": "โซลินอยด์วาล์วควบคุมทิศทาง",
      "zh": "先导式电磁阀"
    },
    "slug": "valves-actuators",
    "short_desc": {
      "en": "High-performance pilot operated solenoid valve designed for industrial water treatment and demanding engineering operations.",
      "id": "Katup Solenoid Pilot performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Injap Solenoid Pandu berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "โซลินอยด์วาล์วควบคุมทิศทาง ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能先导式电磁阀，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/solenoidvalve.webp",
    "gallery_images": [
      "/assets/products/solenoidvalve.webp",
      "/assets/products/solenoidvalve_detail_1.webp",
      "/assets/products/solenoidvalve_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Swing Check Valve",
      "id": "Katup Cek Ayun (Swing Check)",
      "ms": "Injap Semak Ayun",
      "th": "สวิงเช็ควาล์วกันน้ำย้อน",
      "zh": "旋启式止回阀 (Swing Check)"
    },
    "slug": "valves-actuators",
    "short_desc": {
      "en": "High-performance swing check valve designed for industrial water treatment and demanding engineering operations.",
      "id": "Katup Cek Ayun (Swing Check) performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Injap Semak Ayun berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "สวิงเช็ควาล์วกันน้ำย้อน ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能旋启式止回阀 (Swing Check)，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/swingcheckvalve.webp",
    "gallery_images": [
      "/assets/products/swingcheckvalve.webp",
      "/assets/products/swingcheckvalve_detail_1.webp",
      "/assets/products/swingcheckvalve_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Smart Valve Positioner",
      "id": "Positioner Katup Cerdas",
      "ms": "Penentu Kedudukan Injap Pintar",
      "th": "สมาร์ทโพซิชันเนอร์วาล์ว",
      "zh": "智能电气阀门定位器"
    },
    "slug": "valves-actuators",
    "short_desc": {
      "en": "High-performance smart valve positioner designed for industrial water treatment and demanding engineering operations.",
      "id": "Positioner Katup Cerdas performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Penentu Kedudukan Injap Pintar berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "สมาร์ทโพซิชันเนอร์วาล์ว ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能智能电气阀门定位器，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/valvepositioner.webp",
    "gallery_images": [
      "/assets/products/valvepositioner.webp",
      "/assets/products/valvepositioner_detail_1.webp",
      "/assets/products/valvepositioner_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Rotary Screw Air Compressor",
      "id": "Kompresor Udara Ulir Rotari",
      "ms": "Pemampat Udara Skru Berputar",
      "th": "ปั๊มลมสกรูอุตสาหกรรม",
      "zh": "螺杆式空气压缩机"
    },
    "slug": "aeration-air-systems",
    "short_desc": {
      "en": "High-performance rotary screw air compressor designed for industrial water treatment and demanding engineering operations.",
      "id": "Kompresor Udara Ulir Rotari performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Pemampat Udara Skru Berputar berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "ปั๊มลมสกรูอุตสาหกรรม ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能螺杆式空气压缩机，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/aircompressor.webp",
    "gallery_images": [
      "/assets/products/aircompressor.webp",
      "/assets/products/aircompressor_detail_1.webp",
      "/assets/products/aircompressor_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Industrial Air Radiator Cooler",
      "id": "Radiator Pendingin Udara Industri",
      "ms": "Penyejuk Radiator Udara Industri",
      "th": "เครื่องระบายความร้อนหม้อน้ำอุตสาหกรรม",
      "zh": "工业风冷式散热器"
    },
    "slug": "aeration-air-systems",
    "short_desc": {
      "en": "High-performance industrial air radiator cooler designed for industrial water treatment and demanding engineering operations.",
      "id": "Radiator Pendingin Udara Industri performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Penyejuk Radiator Udara Industri berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "เครื่องระบายความร้อนหม้อน้ำอุตสาหกรรม ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能工业风冷式散热器，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/airradiator.webp",
    "gallery_images": [
      "/assets/products/airradiator.webp",
      "/assets/products/airradiator_detail_1.webp",
      "/assets/products/airradiator_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Centrifugal Blower Fan",
      "id": "Blower Sentrifugal Tekanan Tinggi",
      "ms": "Kipas Peniup Empar",
      "th": "โบลเวอร์แบบแรงเหวี่ยงหนีศูนย์",
      "zh": "离心式鼓风机"
    },
    "slug": "aeration-air-systems",
    "short_desc": {
      "en": "High-performance centrifugal blower fan designed for industrial water treatment and demanding engineering operations.",
      "id": "Blower Sentrifugal Tekanan Tinggi performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Kipas Peniup Empar berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "โบลเวอร์แบบแรงเหวี่ยงหนีศูนย์ ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能离心式鼓风机，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/centrifugalblowerfan.webp",
    "gallery_images": [
      "/assets/products/centrifugalblowerfan.webp",
      "/assets/products/centrifugalblowerfan_detail_1.webp",
      "/assets/products/centrifugalblowerfan_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Fine Bubble Diffused Aerator",
      "id": "Diffuser Aerasi Gelembung Halus",
      "ms": "Pengudara Resapan Buih Halus",
      "th": "หัวกระจายอากาศฟองละเอียด",
      "zh": "微孔微泡曝气器 (Diffuser)"
    },
    "slug": "aeration-air-systems",
    "short_desc": {
      "en": "High-performance fine bubble diffused aerator designed for industrial water treatment and demanding engineering operations.",
      "id": "Diffuser Aerasi Gelembung Halus performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Pengudara Resapan Buih Halus berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "หัวกระจายอากาศฟองละเอียด ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能微孔微泡曝气器 (Diffuser)，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/diffusedairaerator.webp",
    "gallery_images": [
      "/assets/products/diffusedairaerator.webp",
      "/assets/products/diffusedairaerator_detail_1.webp",
      "/assets/products/diffusedairaerator_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Floating Fountain Aerator",
      "id": "Aerator Air Mancur Terapung",
      "ms": "Pengudara Pancutan Terapung",
      "th": "กังหันน้ำพุเติมอากาศผิวน้ำ",
      "zh": "浮水喷泉式曝气机"
    },
    "slug": "aeration-air-systems",
    "short_desc": {
      "en": "High-performance floating fountain aerator designed for industrial water treatment and demanding engineering operations.",
      "id": "Aerator Air Mancur Terapung performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Pengudara Pancutan Terapung berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "กังหันน้ำพุเติมอากาศผิวน้ำ ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能浮水喷泉式曝气机，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/fountaionaerator.webp",
    "gallery_images": [
      "/assets/products/fountaionaerator.webp",
      "/assets/products/fountaionaerator_detail_1.webp",
      "/assets/products/fountaionaerator_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "High Speed Surface Aerator",
      "id": "Aerator Permukaan Kecepatan Tinggi",
      "ms": "Pengudara Permukaan Berkelajuan Tinggi",
      "th": "เครื่องเติมอากาศผิวน้ำรอบเร็ว",
      "zh": "高速表面曝气机"
    },
    "slug": "aeration-air-systems",
    "short_desc": {
      "en": "High-performance high speed surface aerator designed for industrial water treatment and demanding engineering operations.",
      "id": "Aerator Permukaan Kecepatan Tinggi performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Pengudara Permukaan Berkelajuan Tinggi berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "เครื่องเติมอากาศผิวน้ำรอบเร็ว ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能高速表面曝气机，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/highspeedaerator.webp",
    "gallery_images": [
      "/assets/products/highspeedaerator.webp",
      "/assets/products/highspeedaerator_detail_1.webp",
      "/assets/products/highspeedaerator_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "High Speed Turbo Blower Fan",
      "id": "Blower Turbo Kecepatan Tinggi",
      "ms": "Peniup Turbo Kelajuan Tinggi",
      "th": "เทอร์โบโบลเวอร์ประสิทธิภาพสูง",
      "zh": "高速磁悬浮/空气悬浮透平鼓风机"
    },
    "slug": "aeration-air-systems",
    "short_desc": {
      "en": "High-performance high speed turbo blower fan designed for industrial water treatment and demanding engineering operations.",
      "id": "Blower Turbo Kecepatan Tinggi performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Peniup Turbo Kelajuan Tinggi berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "เทอร์โบโบลเวอร์ประสิทธิภาพสูง ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能高速磁悬浮/空气悬浮透平鼓风机，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/highspeedturbofan.webp",
    "gallery_images": [
      "/assets/products/highspeedturbofan.webp",
      "/assets/products/highspeedturbofan_detail_1.webp",
      "/assets/products/highspeedturbofan_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Microbubble Generator System",
      "id": "Pembangkit Gelembung Mikro",
      "ms": "Sistem Penjana Buih Mikro",
      "th": "ระบบกำเนิดฟองอากาศไมโครบับเบิ้ล",
      "zh": "微纳米气泡发生系统"
    },
    "slug": "aeration-air-systems",
    "short_desc": {
      "en": "High-performance microbubble generator system designed for industrial water treatment and demanding engineering operations.",
      "id": "Pembangkit Gelembung Mikro performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Sistem Penjana Buih Mikro berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "ระบบกำเนิดฟองอากาศไมโครบับเบิ้ล ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能微纳米气泡发生系统，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/microbubble.webp",
    "gallery_images": [
      "/assets/products/microbubble.webp",
      "/assets/products/microbubble_detail_1.webp",
      "/assets/products/microbubble_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Submersible Push Flow Aerator",
      "id": "Aerator Aliran Dorong Submersible",
      "ms": "Pengudara Aliran Tolak Tenggelam",
      "th": "เครื่องเติมอากาศแบบขับดันแนวนอน",
      "zh": "潜水推流式曝气机"
    },
    "slug": "aeration-air-systems",
    "short_desc": {
      "en": "High-performance submersible push flow aerator designed for industrial water treatment and demanding engineering operations.",
      "id": "Aerator Aliran Dorong Submersible performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Pengudara Aliran Tolak Tenggelam berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "เครื่องเติมอากาศแบบขับดันแนวนอน ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能潜水推流式曝气机，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/pushflowaerator.webp",
    "gallery_images": [
      "/assets/products/pushflowaerator.webp",
      "/assets/products/pushflowaerator_detail_1.webp",
      "/assets/products/pushflowaerator_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Tri-Lobe Roots Blower",
      "id": "Roots Blower Tiga Lobe",
      "ms": "Peniup Akar Tiga Kuping",
      "th": "รูทส์โบลเวอร์แบบ 3 พู",
      "zh": "三叶罗茨鼓风机"
    },
    "slug": "aeration-air-systems",
    "short_desc": {
      "en": "High-performance tri-lobe roots blower designed for industrial water treatment and demanding engineering operations.",
      "id": "Roots Blower Tiga Lobe performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Peniup Akar Tiga Kuping berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "รูทส์โบลเวอร์แบบ 3 พู ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能三叶罗茨鼓风机，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/rootsblower.webp",
    "gallery_images": [
      "/assets/products/rootsblower.webp",
      "/assets/products/rootsblower_detail_1.webp",
      "/assets/products/rootsblower_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Surface Jet Aerator",
      "id": "Aerator Jet Permukaan",
      "ms": "Pengudara Pancutan Permukaan",
      "th": "เครื่องเติมอากาศแบบเจ็ทผิวน้ำ",
      "zh": "自吸式表面射流曝气机"
    },
    "slug": "aeration-air-systems",
    "short_desc": {
      "en": "High-performance surface jet aerator designed for industrial water treatment and demanding engineering operations.",
      "id": "Aerator Jet Permukaan performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Pengudara Pancutan Permukaan berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "เครื่องเติมอากาศแบบเจ็ทผิวน้ำ ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能自吸式表面射流曝气机，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/surfacejetaerator.webp",
    "gallery_images": [
      "/assets/products/surfacejetaerator.webp",
      "/assets/products/surfacejetaerator_detail_1.webp",
      "/assets/products/surfacejetaerator_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "DC Current Transmitter Isolated",
      "id": "Transmitter Arus DC Terisolasi",
      "ms": "Pemancar Arus DC Terasing",
      "th": "ทรานสมิตเตอร์วัดกระแสไฟฟ้า DC",
      "zh": "直流电流隔离变送器"
    },
    "slug": "electrical-process-sensors",
    "short_desc": {
      "en": "High-performance dc current transmitter isolated designed for industrial water treatment and demanding engineering operations.",
      "id": "Transmitter Arus DC Terisolasi performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Pemancar Arus DC Terasing berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "ทรานสมิตเตอร์วัดกระแสไฟฟ้า DC ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能直流电流隔离变送器，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/dccurrenttransmitter.webp",
    "gallery_images": [
      "/assets/products/dccurrenttransmitter.webp",
      "/assets/products/dccurrenttransmitter_detail_1.webp",
      "/assets/products/dccurrenttransmitter_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Differential Pressure Transmitter",
      "id": "Sensor Beda Tekanan Presisi",
      "ms": "Penderia Tekanan Pembeza",
      "th": "ทรานสมิตเตอร์วัดแรงดันแตกต่าง (DP)",
      "zh": "微差压 / 差压变送器"
    },
    "slug": "electrical-process-sensors",
    "short_desc": {
      "en": "High-performance differential pressure transmitter designed for industrial water treatment and demanding engineering operations.",
      "id": "Sensor Beda Tekanan Presisi performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Penderia Tekanan Pembeza berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "ทรานสมิตเตอร์วัดแรงดันแตกต่าง (DP) ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能微差压 / 差压变送器，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/differentialpressuresensor.webp",
    "gallery_images": [
      "/assets/products/differentialpressuresensor.webp",
      "/assets/products/differentialpressuresensor_detail_1.webp",
      "/assets/products/differentialpressuresensor_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Digital Single-Phase Ampere Meter",
      "id": "Amperemeter Digital 1 Fasa",
      "ms": "Meter Ampere Digital Satu Fasa",
      "th": "แอมมิเตอร์ดิจิตอล 1 เฟส",
      "zh": "单相数显电流表"
    },
    "slug": "electrical-process-sensors",
    "short_desc": {
      "en": "High-performance digital single-phase ampere meter designed for industrial water treatment and demanding engineering operations.",
      "id": "Amperemeter Digital 1 Fasa performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Meter Ampere Digital Satu Fasa berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "แอมมิเตอร์ดิจิตอล 1 เฟส ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能单相数显电流表，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/digitalamperesinglephase.webp",
    "gallery_images": [
      "/assets/products/digitalamperesinglephase.webp",
      "/assets/products/digitalamperesinglephase_detail_1.webp",
      "/assets/products/digitalamperesinglephase_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Digital Three-Phase Ampere Meter",
      "id": "Amperemeter Digital 3 Fasa",
      "ms": "Meter Ampere Digital Tiga Fasa",
      "th": "แอมมิเตอร์ดิจิตอล 3 เฟส",
      "zh": "三相数显电流表"
    },
    "slug": "electrical-process-sensors",
    "short_desc": {
      "en": "High-performance digital three-phase ampere meter designed for industrial water treatment and demanding engineering operations.",
      "id": "Amperemeter Digital 3 Fasa performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Meter Ampere Digital Tiga Fasa berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "แอมมิเตอร์ดิจิตอล 3 เฟส ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能三相数显电流表，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/digitalamperethreephase.webp",
    "gallery_images": [
      "/assets/products/digitalamperethreephase.webp",
      "/assets/products/digitalamperethreephase_detail_1.webp",
      "/assets/products/digitalamperethreephase_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Digital Temperature Indicator Panel",
      "id": "Panel Indikator Suhu Digital",
      "ms": "Panel Penunjuk Suhu Digital",
      "th": "หน้าจอแสดงผลอุณหภูมิดิจิตอล",
      "zh": "数显温控仪表"
    },
    "slug": "electrical-process-sensors",
    "short_desc": {
      "en": "High-performance digital temperature indicator panel designed for industrial water treatment and demanding engineering operations.",
      "id": "Panel Indikator Suhu Digital performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Panel Penunjuk Suhu Digital berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "หน้าจอแสดงผลอุณหภูมิดิจิตอล ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能数显温控仪表，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/digitaldisplaytemperature.webp",
    "gallery_images": [
      "/assets/products/digitaldisplaytemperature.webp",
      "/assets/products/digitaldisplaytemperature_detail_1.webp",
      "/assets/products/digitaldisplaytemperature_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Digital Power Frequency Meter",
      "id": "Pengukur Frekuensi Listrik Digital",
      "ms": "Meter Frekuensi Kuasa Digital",
      "th": "เครื่องวัดความถี่ไฟฟ้าดิจิตอล",
      "zh": "数显电网电力频率表"
    },
    "slug": "electrical-process-sensors",
    "short_desc": {
      "en": "High-performance digital power frequency meter designed for industrial water treatment and demanding engineering operations.",
      "id": "Pengukur Frekuensi Listrik Digital performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Meter Frekuensi Kuasa Digital berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "เครื่องวัดความถี่ไฟฟ้าดิจิตอล ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能数显电网电力频率表，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/digitalfrequencymeter.webp",
    "gallery_images": [
      "/assets/products/digitalfrequencymeter.webp",
      "/assets/products/digitalfrequencymeter_detail_1.webp",
      "/assets/products/digitalfrequencymeter_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Digital Single-Phase Voltmeter",
      "id": "Voltmeter Digital 1 Fasa",
      "ms": "Meter Voltan Digital Satu Fasa",
      "th": "โวลต์มิเตอร์ดิจิตอล 1 เฟส",
      "zh": "单相数显电压表"
    },
    "slug": "electrical-process-sensors",
    "short_desc": {
      "en": "High-performance digital single-phase voltmeter designed for industrial water treatment and demanding engineering operations.",
      "id": "Voltmeter Digital 1 Fasa performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Meter Voltan Digital Satu Fasa berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "โวลต์มิเตอร์ดิจิตอล 1 เฟส ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能单相数显电压表，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/digitalvoltagesinglephase.webp",
    "gallery_images": [
      "/assets/products/digitalvoltagesinglephase.webp",
      "/assets/products/digitalvoltagesinglephase_detail_1.webp",
      "/assets/products/digitalvoltagesinglephase_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Digital Three-Phase Voltmeter",
      "id": "Voltmeter Digital 3 Fasa",
      "ms": "Meter Voltan Digital Tiga Fasa",
      "th": "โวลต์มิเตอร์ดิจิตอล 3 เฟส",
      "zh": "三相数显电压表"
    },
    "slug": "electrical-process-sensors",
    "short_desc": {
      "en": "High-performance digital three-phase voltmeter designed for industrial water treatment and demanding engineering operations.",
      "id": "Voltmeter Digital 3 Fasa performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Meter Voltan Digital Tiga Fasa berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "โวลต์มิเตอร์ดิจิตอล 3 เฟส ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能三相数显电压表，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/digitalvoltagethreephase.webp",
    "gallery_images": [
      "/assets/products/digitalvoltagethreephase.webp",
      "/assets/products/digitalvoltagethreephase_detail_1.webp",
      "/assets/products/digitalvoltagethreephase_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Earth Fault Protection Relay",
      "id": "Relay Proteksi Kebocoran Tanah",
      "ms": "Geganti Perlindungan Kerosakan Bumi",
      "th": "รีเลย์ป้องกันไฟรั่วลงดิน (Earth Fault)",
      "zh": "接地漏电保护继电器"
    },
    "slug": "electrical-process-sensors",
    "short_desc": {
      "en": "High-performance earth fault protection relay designed for industrial water treatment and demanding engineering operations.",
      "id": "Relay Proteksi Kebocoran Tanah performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Geganti Perlindungan Kerosakan Bumi berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "รีเลย์ป้องกันไฟรั่วลงดิน (Earth Fault) ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能接地漏电保护继电器，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/earthfaultyrelay.webp",
    "gallery_images": [
      "/assets/products/earthfaultyrelay.webp",
      "/assets/products/earthfaultyrelay_detail_1.webp",
      "/assets/products/earthfaultyrelay_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Magnetic Liquid Float Switch",
      "id": "Saklar Pelampung Level Magnetik",
      "ms": "Suis Pelampung Cecair Magnetik",
      "th": "สวิตช์ลูกลอยวัดระดับของเหลว",
      "zh": "磁性浮球液位开关"
    },
    "slug": "electrical-process-sensors",
    "short_desc": {
      "en": "High-performance magnetic liquid float switch designed for industrial water treatment and demanding engineering operations.",
      "id": "Saklar Pelampung Level Magnetik performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Suis Pelampung Cecair Magnetik berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "สวิตช์ลูกลอยวัดระดับของเหลว ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能磁性浮球液位开关，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/floatswitch.webp",
    "gallery_images": [
      "/assets/products/floatswitch.webp",
      "/assets/products/floatswitch_detail_1.webp",
      "/assets/products/floatswitch_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Non-Contact Infrared Temperature Sensor",
      "id": "Sensor Suhu Inframerah Non-Kontak",
      "ms": "Penderia Suhu Inframerah Tanpa Sentuhan",
      "th": "เซนเซอร์วัดอุณหภูมิอินฟราเรดไร้สัมผัส",
      "zh": "非接触式红外温度传感器"
    },
    "slug": "electrical-process-sensors",
    "short_desc": {
      "en": "High-performance non-contact infrared temperature sensor designed for industrial water treatment and demanding engineering operations.",
      "id": "Sensor Suhu Inframerah Non-Kontak performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Penderia Suhu Inframerah Tanpa Sentuhan berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "เซนเซอร์วัดอุณหภูมิอินฟราเรดไร้สัมผัส ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能非接触式红外温度传感器，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/infraredtempsensor.webp",
    "gallery_images": [
      "/assets/products/infraredtempsensor.webp",
      "/assets/products/infraredtempsensor_detail_1.webp",
      "/assets/products/infraredtempsensor_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Magnetic Flap Level Gauge Indicator",
      "id": "Indikator Level Magnetic Flap",
      "ms": "Penunjuk Paras Flap Magnetik",
      "th": "เกจวัดระดับแบบแถบแม่เหล็กพลิก",
      "zh": "磁翻板液位计"
    },
    "slug": "electrical-process-sensors",
    "short_desc": {
      "en": "High-performance magnetic flap level gauge indicator designed for industrial water treatment and demanding engineering operations.",
      "id": "Indikator Level Magnetic Flap performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Penunjuk Paras Flap Magnetik berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "เกจวัดระดับแบบแถบแม่เหล็กพลิก ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能磁翻板液位计，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/magneticflap.webp",
    "gallery_images": [
      "/assets/products/magneticflap.webp",
      "/assets/products/magneticflap_detail_1.webp",
      "/assets/products/magneticflap_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Monocrystalline Silicon Pressure Sensor",
      "id": "Sensor Tekanan Silikon Monokristalin",
      "ms": "Penderia Tekanan Silikon Monohablur",
      "th": "เซนเซอร์วัดแรงดันซิลิคอนโมโนคริสตัลไลน์",
      "zh": "单晶硅高精度压力变送器"
    },
    "slug": "electrical-process-sensors",
    "short_desc": {
      "en": "High-performance monocrystalline silicon pressure sensor designed for industrial water treatment and demanding engineering operations.",
      "id": "Sensor Tekanan Silikon Monokristalin performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Penderia Tekanan Silikon Monohablur berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "เซนเซอร์วัดแรงดันซิลิคอนโมโนคริสตัลไลน์ ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能单晶硅高精度压力变送器，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/monocrystalinesliconesensor.webp",
    "gallery_images": [
      "/assets/products/monocrystalinesliconesensor.webp",
      "/assets/products/monocrystalinesliconesensor_detail_1.webp",
      "/assets/products/monocrystalinesliconesensor_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Signal Potentiometer Isolator",
      "id": "Isolator Sinyal Potensiometer",
      "ms": "Pengasing Isyarat Potentiometer",
      "th": "ตัวแยกสัญญาณโพเทนชิออมิเตอร์",
      "zh": "电位计信号隔离变送器"
    },
    "slug": "electrical-process-sensors",
    "short_desc": {
      "en": "High-performance signal potentiometer isolator designed for industrial water treatment and demanding engineering operations.",
      "id": "Isolator Sinyal Potensiometer performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Pengasing Isyarat Potentiometer berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "ตัวแยกสัญญาณโพเทนชิออมิเตอร์ ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能电位计信号隔离变送器，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/potentiometerisolator.webp",
    "gallery_images": [
      "/assets/products/potentiometerisolator.webp",
      "/assets/products/potentiometerisolator_detail_1.webp",
      "/assets/products/potentiometerisolator_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Digital Power Factor Cos Phi Meter",
      "id": "Meter Faktor Daya Digital",
      "ms": "Meter Faktor Kuasa Digital",
      "th": "เพาเวอร์แฟกเตอร์มิเตอร์ (Cos φ)",
      "zh": "数显功率因数表 (Cos φ)"
    },
    "slug": "electrical-process-sensors",
    "short_desc": {
      "en": "High-performance digital power factor cos phi meter designed for industrial water treatment and demanding engineering operations.",
      "id": "Meter Faktor Daya Digital performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Meter Faktor Kuasa Digital berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "เพาเวอร์แฟกเตอร์มิเตอร์ (Cos φ) ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能数显功率因数表 (Cos φ)，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/powerfactormeter.webp",
    "gallery_images": [
      "/assets/products/powerfactormeter.webp",
      "/assets/products/powerfactormeter_detail_1.webp",
      "/assets/products/powerfactormeter_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Industrial Pressure Transmitter 4-20mA",
      "id": "Transmitter Tekanan Industri 4-20mA",
      "ms": "Pemancar Tekanan Industri 4-20mA",
      "th": "เพรสเชอร์ทรานสมิตเตอร์ 4-20mA",
      "zh": "工业压力变送器 (4-20mA / RS485)"
    },
    "slug": "electrical-process-sensors",
    "short_desc": {
      "en": "High-performance industrial pressure transmitter 4-20ma designed for industrial water treatment and demanding engineering operations.",
      "id": "Transmitter Tekanan Industri 4-20mA performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Pemancar Tekanan Industri 4-20mA berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "เพรสเชอร์ทรานสมิตเตอร์ 4-20mA ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能工业压力变送器 (4-20mA / RS485)，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/pressuretransmitter.webp",
    "gallery_images": [
      "/assets/products/pressuretransmitter.webp",
      "/assets/products/pressuretransmitter_detail_1.webp",
      "/assets/products/pressuretransmitter_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Radar Level Meter for Solids & Liquids",
      "id": "Pengukur Level Material Gelombang Radar",
      "ms": "Meter Paras Radar untuk Pepejal & Cecair",
      "th": "เรดาร์วัดระดับของแข็งและของเหลว",
      "zh": "高频雷达物位计 / 液位计 (80GHz)"
    },
    "slug": "electrical-process-sensors",
    "short_desc": {
      "en": "High-performance radar level meter for solids & liquids designed for industrial water treatment and demanding engineering operations.",
      "id": "Pengukur Level Material Gelombang Radar performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Meter Paras Radar untuk Pepejal & Cecair berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "เรดาร์วัดระดับของแข็งและของเหลว ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能高频雷达物位计 / 液位计 (80GHz)，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/radarmaterialmeter.webp",
    "gallery_images": [
      "/assets/products/radarmaterialmeter.webp",
      "/assets/products/radarmaterialmeter_detail_1.webp",
      "/assets/products/radarmaterialmeter_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Head-Mounted Temperature Transmitter",
      "id": "Transmitter Suhu Head-Mounted",
      "ms": "Pemancar Suhu Pasang Kepala",
      "th": "ทรานสมิตเตอร์วัดอุณหภูมิแบบติดหัวเซนเซอร์",
      "zh": "一体化温度变送器模块"
    },
    "slug": "electrical-process-sensors",
    "short_desc": {
      "en": "High-performance head-mounted temperature transmitter designed for industrial water treatment and demanding engineering operations.",
      "id": "Transmitter Suhu Head-Mounted performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Pemancar Suhu Pasang Kepala berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "ทรานสมิตเตอร์วัดอุณหภูมิแบบติดหัวเซนเซอร์ ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能一体化温度变送器模块，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/temptransmitter.webp",
    "gallery_images": [
      "/assets/products/temptransmitter.webp",
      "/assets/products/temptransmitter_detail_1.webp",
      "/assets/products/temptransmitter_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Ultrasonic Level Transmitter",
      "id": "Pengukur Level Ultrasonik",
      "ms": "Pemancar Paras Ultrasonik",
      "th": "อัลตร้าโซนิควัดระดับแบบไม่สัมผัส",
      "zh": "超声波物位计 / 液位计"
    },
    "slug": "electrical-process-sensors",
    "short_desc": {
      "en": "High-performance ultrasonic level transmitter designed for industrial water treatment and demanding engineering operations.",
      "id": "Pengukur Level Ultrasonik performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Pemancar Paras Ultrasonik berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "อัลตร้าโซนิควัดระดับแบบไม่สัมผัส ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能超声波物位计 / 液位计，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/ultrasonicmaterialmeter.webp",
    "gallery_images": [
      "/assets/products/ultrasonicmaterialmeter.webp",
      "/assets/products/ultrasonicmaterialmeter_detail_1.webp",
      "/assets/products/ultrasonicmaterialmeter_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Thermal Mass Air Flow Meter",
      "id": "Pengukur Aliran Udara Termal",
      "ms": "Meter Aliran Udara Jisim Terma",
      "th": "เครื่องวัดอัตราการไหลของอากาศ",
      "zh": "热式气体质量流量计"
    },
    "slug": "water-process-analyzers",
    "short_desc": {
      "en": "High-performance thermal mass air flow meter designed for industrial water treatment and demanding engineering operations.",
      "id": "Pengukur Aliran Udara Termal performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Meter Aliran Udara Jisim Terma berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "เครื่องวัดอัตราการไหลของอากาศ ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能热式气体质量流量计，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/airflowmeter.webp",
    "gallery_images": [
      "/assets/products/airflowmeter.webp",
      "/assets/products/airflowmeter_detail_1.webp",
      "/assets/products/airflowmeter_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Online COD Water Quality Analyzer",
      "id": "Penganalisis Kualitas Air COD Online",
      "ms": "Penganalisis Kualiti Air COD Dalam Talian",
      "th": "เครื่องวิเคราะห์ค่า COD น้ำเสียแบบออนไลน์",
      "zh": "在线COD水质自动监测分析仪 (紫外/消解法)"
    },
    "slug": "water-process-analyzers",
    "short_desc": {
      "en": "High-performance online cod water quality analyzer designed for industrial water treatment and demanding engineering operations.",
      "id": "Penganalisis Kualitas Air COD Online performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Penganalisis Kualiti Air COD Dalam Talian berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "เครื่องวิเคราะห์ค่า COD น้ำเสียแบบออนไลน์ ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能在线COD水质自动监测分析仪 (紫外/消解法)，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/codmeter(online).webp",
    "gallery_images": [
      "/assets/products/codmeter(online).webp",
      "/assets/products/codmeter(online)_detail_1.webp",
      "/assets/products/codmeter(online)_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Laboratory Desktop COD Meter",
      "id": "COD Meter Desktop Laboratorium",
      "ms": "Meter COD Atas Meja Makmal",
      "th": "เครื่องวัดค่า COD ในห้องปฏิบัติการ",
      "zh": "台式多参数COD快速测定仪"
    },
    "slug": "water-process-analyzers",
    "short_desc": {
      "en": "High-performance laboratory desktop cod meter designed for industrial water treatment and demanding engineering operations.",
      "id": "COD Meter Desktop Laboratorium performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Meter COD Atas Meja Makmal berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "เครื่องวัดค่า COD ในห้องปฏิบัติการ ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能台式多参数COD快速测定仪，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/codmeter.webp",
    "gallery_images": [
      "/assets/products/codmeter.webp",
      "/assets/products/codmeter_detail_1.webp",
      "/assets/products/codmeter_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Electromagnetic Digital Flow Meter",
      "id": "Pengukur Aliran Fluida Elektromagnetik",
      "ms": "Meter Aliran Digital Elektromagnet",
      "th": "มิเตอร์วัดอัตราการไหลของเหลวแบบแม่เหล็กไฟฟ้า",
      "zh": "智能电磁流量计"
    },
    "slug": "water-process-analyzers",
    "short_desc": {
      "en": "High-performance electromagnetic digital flow meter designed for industrial water treatment and demanding engineering operations.",
      "id": "Pengukur Aliran Fluida Elektromagnetik performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Meter Aliran Digital Elektromagnet berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "มิเตอร์วัดอัตราการไหลของเหลวแบบแม่เหล็กไฟฟ้า ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能智能电磁流量计，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/digitalflowmeter.webp",
    "gallery_images": [
      "/assets/products/digitalflowmeter.webp",
      "/assets/products/digitalflowmeter_detail_1.webp",
      "/assets/products/digitalflowmeter_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Dissolved Oxygen Electrode Sensor",
      "id": "Sensor Elektroda Oksigen Terlarut",
      "ms": "Penderia Elektrod Oksigen Terlarut",
      "th": "หัววัดออกซิเจนละลายน้ำ (DO Sensor)",
      "zh": "荧光法/覆膜法溶解氧电极传感器"
    },
    "slug": "water-process-analyzers",
    "short_desc": {
      "en": "High-performance dissolved oxygen electrode sensor designed for industrial water treatment and demanding engineering operations.",
      "id": "Sensor Elektroda Oksigen Terlarut performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Penderia Elektrod Oksigen Terlarut berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "หัววัดออกซิเจนละลายน้ำ (DO Sensor) ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能荧光法/覆膜法溶解氧电极传感器，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/dissolvedoxygen.webp",
    "gallery_images": [
      "/assets/products/dissolvedoxygen.webp",
      "/assets/products/dissolvedoxygen_detail_1.webp",
      "/assets/products/dissolvedoxygen_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Industrial Dissolved Oxygen Controller",
      "id": "Kontroller Oksigen Terlarut Industri",
      "ms": "Pengawal Oksigen Terlarut Industri",
      "th": "เครื่องควบคุมค่าออกซิเจนละลายน้ำ (DO Meter)",
      "zh": "工业在线溶解氧监测仪"
    },
    "slug": "water-process-analyzers",
    "short_desc": {
      "en": "High-performance industrial dissolved oxygen controller designed for industrial water treatment and demanding engineering operations.",
      "id": "Kontroller Oksigen Terlarut Industri performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Pengawal Oksigen Terlarut Industri berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "เครื่องควบคุมค่าออกซิเจนละลายน้ำ (DO Meter) ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能工业在线溶解氧监测仪，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/dissolvedoxygenmeter.webp",
    "gallery_images": [
      "/assets/products/dissolvedoxygenmeter.webp",
      "/assets/products/dissolvedoxygenmeter_detail_1.webp",
      "/assets/products/dissolvedoxygenmeter_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Online Industrial pH/ORP Controller",
      "id": "Kontroller pH/ORP Industri Online",
      "ms": "Pengawal pH/ORP Industri Dalam Talian",
      "th": "เครื่องวัดและควบคุมค่า pH/ORP ออนไลน์",
      "zh": "工业在线pH/ORP控制器"
    },
    "slug": "water-process-analyzers",
    "short_desc": {
      "en": "High-performance online industrial ph/orp controller designed for industrial water treatment and demanding engineering operations.",
      "id": "Kontroller pH/ORP Industri Online performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Pengawal pH/ORP Industri Dalam Talian berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "เครื่องวัดและควบคุมค่า pH/ORP ออนไลน์ ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能工业在线pH/ORP控制器，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/phmeter.webp",
    "gallery_images": [
      "/assets/products/phmeter.webp",
      "/assets/products/phmeter_detail_1.webp",
      "/assets/products/phmeter_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Portable Handheld pH/Temp Meter",
      "id": "pH Meter Portabel Genggam",
      "ms": "Meter pH/Suhu Pegang Mudah Alih",
      "th": "เครื่องวัดค่า pH แบบพกพา",
      "zh": "便携式手持pH/温度测定仪"
    },
    "slug": "water-process-analyzers",
    "short_desc": {
      "en": "High-performance portable handheld ph/temp meter designed for industrial water treatment and demanding engineering operations.",
      "id": "pH Meter Portabel Genggam performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Meter pH/Suhu Pegang Mudah Alih berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "เครื่องวัดค่า pH แบบพกพา ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能便携式手持pH/温度测定仪，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/phmeterportable.webp",
    "gallery_images": [
      "/assets/products/phmeterportable.webp",
      "/assets/products/phmeterportable_detail_1.webp",
      "/assets/products/phmeterportable_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Online TDS / Conductivity Controller",
      "id": "Kontroller TDS / Konduktivitas Online",
      "ms": "Pengawal TDS / Kekonduksian Dalam Talian",
      "th": "เครื่องวัดค่า TDS / ความนำไฟฟ้าออนไลน์",
      "zh": "在线电导率 / TDS / 盐度水质控制器"
    },
    "slug": "water-process-analyzers",
    "short_desc": {
      "en": "High-performance online tds / conductivity controller designed for industrial water treatment and demanding engineering operations.",
      "id": "Kontroller TDS / Konduktivitas Online performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Pengawal TDS / Kekonduksian Dalam Talian berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "เครื่องวัดค่า TDS / ความนำไฟฟ้าออนไลน์ ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能在线电导率 / TDS / 盐度水质控制器，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/tdsmeter.webp",
    "gallery_images": [
      "/assets/products/tdsmeter.webp",
      "/assets/products/tdsmeter_detail_1.webp",
      "/assets/products/tdsmeter_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Online Suspended Solids (TSS) Analyzer",
      "id": "Penganalisis Padatan Tersuspensi (TSS) Online",
      "ms": "Penganalisis Pepejal Terampai (TSS) Dalam Talian",
      "th": "เครื่องวิเคราะห์ปริมาณตะกอนแขวนลอย (TSS)",
      "zh": "在线悬浮物浓度计 / 污泥浓度计 (MLSS/TSS)"
    },
    "slug": "water-process-analyzers",
    "short_desc": {
      "en": "High-performance online suspended solids (tss) analyzer designed for industrial water treatment and demanding engineering operations.",
      "id": "Penganalisis Padatan Tersuspensi (TSS) Online performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Penganalisis Pepejal Terampai (TSS) Dalam Talian berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "เครื่องวิเคราะห์ปริมาณตะกอนแขวนลอย (TSS) ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能在线悬浮物浓度计 / 污泥浓度计 (MLSS/TSS)，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/tssmeter.webp",
    "gallery_images": [
      "/assets/products/tssmeter.webp",
      "/assets/products/tssmeter_detail_1.webp",
      "/assets/products/tssmeter_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Online Turbidity Meter Sensor",
      "id": "Sensor Turbiditas Kekeruhan Online",
      "ms": "Penderia Meter Kekeruhan Dalam Talian",
      "th": "เซนเซอร์วัดความขุ่นของน้ำ (Turbidity)",
      "zh": "在线浊度分析仪 (散射光法)"
    },
    "slug": "water-process-analyzers",
    "short_desc": {
      "en": "High-performance online turbidity meter sensor designed for industrial water treatment and demanding engineering operations.",
      "id": "Sensor Turbiditas Kekeruhan Online performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Penderia Meter Kekeruhan Dalam Talian berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "เซนเซอร์วัดความขุ่นของน้ำ (Turbidity) ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能在线浊度分析仪 (散射光法)，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/turbiditymeter.webp",
    "gallery_images": [
      "/assets/products/turbiditymeter.webp",
      "/assets/products/turbiditymeter_detail_1.webp",
      "/assets/products/turbiditymeter_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Automatic Water Hardness Analyzer",
      "id": "Penganalisis Kesadahan Air Otomatis",
      "ms": "Penganalisis Kekerasan Air Automatik",
      "th": "เครื่องวิเคราะห์ความกระด้างของน้ำอัตโนมัติ",
      "zh": "在线水质硬度自动分析仪"
    },
    "slug": "water-process-analyzers",
    "short_desc": {
      "en": "High-performance automatic water hardness analyzer designed for industrial water treatment and demanding engineering operations.",
      "id": "Penganalisis Kesadahan Air Otomatis performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Penganalisis Kekerasan Air Automatik berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "เครื่องวิเคราะห์ความกระด้างของน้ำอัตโนมัติ ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能在线水质硬度自动分析仪，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/waterhardnessanaylzer.webp",
    "gallery_images": [
      "/assets/products/waterhardnessanaylzer.webp",
      "/assets/products/waterhardnessanaylzer_detail_1.webp",
      "/assets/products/waterhardnessanaylzer_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Portable Water Hardness Titrator Kit",
      "id": "Kit Pengukur Kesadahan Air Portabel",
      "ms": "Kit Penganalisis Kekerasan Air Mudah Alih",
      "th": "ชุดตรวจวัดความกระด้างของน้ำแบบพกพา",
      "zh": "便携式水质硬度快速测定仪"
    },
    "slug": "water-process-analyzers",
    "short_desc": {
      "en": "High-performance portable water hardness titrator kit designed for industrial water treatment and demanding engineering operations.",
      "id": "Kit Pengukur Kesadahan Air Portabel performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Kit Penganalisis Kekerasan Air Mudah Alih berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "ชุดตรวจวัดความกระด้างของน้ำแบบพกพา ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能便携式水质硬度快速测定仪，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/waterhardnessanaylzerportable.webp",
    "gallery_images": [
      "/assets/products/waterhardnessanaylzerportable.webp",
      "/assets/products/waterhardnessanaylzerportable_detail_1.webp",
      "/assets/products/waterhardnessanaylzerportable_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Stainless Steel Bag Filter Housing",
      "id": "Rumah Filter Kantong Stainless Steel",
      "ms": "Perumah Penapis Beg Keluli Tahan Karat",
      "th": "กระบอกกรองถุงสแตนเลส (Bag Filter)",
      "zh": "不锈钢精密袋式过滤器系统"
    },
    "slug": "filtration-dewatering",
    "short_desc": {
      "en": "High-performance stainless steel bag filter housing designed for industrial water treatment and demanding engineering operations.",
      "id": "Rumah Filter Kantong Stainless Steel performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Perumah Penapis Beg Keluli Tahan Karat berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "กระบอกกรองถุงสแตนเลส (Bag Filter) ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能不锈钢精密袋式过滤器系统，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/bagfiltersystem.webp",
    "gallery_images": [
      "/assets/products/bagfiltersystem.webp",
      "/assets/products/bagfiltersystem_detail_1.webp",
      "/assets/products/bagfiltersystem_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Continuous Belt Filter Press Dewatering",
      "id": "Mesin Press Sabuk Pengering Lumpur",
      "ms": "Mesin Penekan Penapis Tali Pinggang",
      "th": "เครื่องรีดตะกอนแบบสายพาน (Belt Press)",
      "zh": "重型连续式带式压滤浓缩脱水一体机"
    },
    "slug": "filtration-dewatering",
    "short_desc": {
      "en": "High-performance continuous belt filter press dewatering designed for industrial water treatment and demanding engineering operations.",
      "id": "Mesin Press Sabuk Pengering Lumpur performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Mesin Penekan Penapis Tali Pinggang berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "เครื่องรีดตะกอนแบบสายพาน (Belt Press) ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能重型连续式带式压滤浓缩脱水一体机，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/belttypedewateringmachine.webp",
    "gallery_images": [
      "/assets/products/belttypedewateringmachine.webp",
      "/assets/products/belttypedewateringmachine_detail_1.webp",
      "/assets/products/belttypedewateringmachine_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Automatic Self-Cleaning Brush Strainer",
      "id": "Saringan Sikat Otomatis Self-Cleaning",
      "ms": "Penyaring Berus Pembersihan Sendiri Automatik",
      "th": "สเตรนเนอร์กรองน้ำแบบแปรงทำความสะอาดอัตโนมัติ",
      "zh": "全自动刷式自清洗过滤器 (Brush Strainer)"
    },
    "slug": "filtration-dewatering",
    "short_desc": {
      "en": "High-performance automatic self-cleaning brush strainer designed for industrial water treatment and demanding engineering operations.",
      "id": "Saringan Sikat Otomatis Self-Cleaning performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Penyaring Berus Pembersihan Sendiri Automatik berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "สเตรนเนอร์กรองน้ำแบบแปรงทำความสะอาดอัตโนมัติ ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能全自动刷式自清洗过滤器 (Brush Strainer)，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/brushstrainer.webp",
    "gallery_images": [
      "/assets/products/brushstrainer.webp",
      "/assets/products/brushstrainer_detail_1.webp",
      "/assets/products/brushstrainer_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Industrial 3-Phase Decanter Centrifuge",
      "id": "Sentrifus Dekanter 3 Fasa Industri",
      "ms": "Sentrifug Dekanter 3 Fasa Industri",
      "th": "เครื่องเซนตริฟิวจ์แยกกากตะกอน (Decanter Centrifuge)",
      "zh": "工业三相卧式螺旋沉降离心机 (Decanter)"
    },
    "slug": "filtration-dewatering",
    "short_desc": {
      "en": "High-performance industrial 3-phase decanter centrifuge designed for industrial water treatment and demanding engineering operations.",
      "id": "Sentrifus Dekanter 3 Fasa Industri performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Sentrifug Dekanter 3 Fasa Industri berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "เครื่องเซนตริฟิวจ์แยกกากตะกอน (Decanter Centrifuge) ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能工业三相卧式螺旋沉降离心机 (Decanter)，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/decanter.webp",
    "gallery_images": [
      "/assets/products/decanter.webp",
      "/assets/products/decanter_detail_1.webp",
      "/assets/products/decanter_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Geotextile Dewatering Sludge Tube",
      "id": "Kantung Geotekstil Pengering Lumpur Geotube",
      "ms": "Tiub Geotekstil Penyahairan Enap Cemar",
      "th": "ท่อผ้าจีโอเท็กซ์ไทล์ดักตะกอน (Geotube)",
      "zh": "高强土工管袋污泥脱水固化管袋 (Geotube)"
    },
    "slug": "filtration-dewatering",
    "short_desc": {
      "en": "High-performance geotextile dewatering sludge tube designed for industrial water treatment and demanding engineering operations.",
      "id": "Kantung Geotekstil Pengering Lumpur Geotube performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Tiub Geotekstil Penyahairan Enap Cemar berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "ท่อผ้าจีโอเท็กซ์ไทล์ดักตะกอน (Geotube) ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能高强土工管袋污泥脱水固化管袋 (Geotube)，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/geotube.webp",
    "gallery_images": [
      "/assets/products/geotube.webp",
      "/assets/products/geotube_detail_1.webp",
      "/assets/products/geotube_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Automatic Backwash Multi-Media Sand Filter",
      "id": "Filter Pasir Otomatis Multi-Media",
      "ms": "Penapis Pasir Pelbagai Media Basuh Balik Automatik",
      "th": "ถังกรองทรายมัลติมีเดียล้างย้อนอัตโนมัติ",
      "zh": "全自动反冲洗多介质砂滤器 / 机械过滤器"
    },
    "slug": "filtration-dewatering",
    "short_desc": {
      "en": "High-performance automatic backwash multi-media sand filter designed for industrial water treatment and demanding engineering operations.",
      "id": "Filter Pasir Otomatis Multi-Media performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Penapis Pasir Pelbagai Media Basuh Balik Automatik berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "ถังกรองทรายมัลติมีเดียล้างย้อนอัตโนมัติ ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能全自动反冲洗多介质砂滤器 / 机械过滤器，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/sandfilter.webp",
    "gallery_images": [
      "/assets/products/sandfilter.webp",
      "/assets/products/sandfilter_detail_1.webp",
      "/assets/products/sandfilter_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Multi-Disk Sludge Dewatering Screw Press",
      "id": "Mesin Pengering Lumpur Multi-Disk Screw Press",
      "ms": "Penekan Skru Penyahairan Enap Cemar Cakera Berbilang",
      "th": "เครื่องรีดตะกอนแบบสกรูเพรส (Screw Press)",
      "zh": "叠螺式污泥脱水机 (Multi-Disk Screw Press)"
    },
    "slug": "filtration-dewatering",
    "short_desc": {
      "en": "High-performance multi-disk sludge dewatering screw press designed for industrial water treatment and demanding engineering operations.",
      "id": "Mesin Pengering Lumpur Multi-Disk Screw Press performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Penekan Skru Penyahairan Enap Cemar Cakera Berbilang berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "เครื่องรีดตะกอนแบบสกรูเพรส (Screw Press) ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能叠螺式污泥脱水机 (Multi-Disk Screw Press)，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/screwdewatering.webp",
    "gallery_images": [
      "/assets/products/screwdewatering.webp",
      "/assets/products/screwdewatering_detail_1.webp",
      "/assets/products/screwdewatering_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "High-Frequency Vibrating Screen Separator",
      "id": "Ayakan Getar Separator Frekuensi Tinggi",
      "ms": "Pemisah Skrin Bergetar Frekuensi Tinggi",
      "th": "ตะแกรงร่อนสั่นคัดแยกของแข็ง",
      "zh": "高频旋振筛 / 固液分离振动筛"
    },
    "slug": "filtration-dewatering",
    "short_desc": {
      "en": "High-performance high-frequency vibrating screen separator designed for industrial water treatment and demanding engineering operations.",
      "id": "Ayakan Getar Separator Frekuensi Tinggi performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Pemisah Skrin Bergetar Frekuensi Tinggi berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "ตะแกรงร่อนสั่นคัดแยกของแข็ง ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能高频旋振筛 / 固液分离振动筛，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/vibratingscreen.webp",
    "gallery_images": [
      "/assets/products/vibratingscreen.webp",
      "/assets/products/vibratingscreen_detail_1.webp",
      "/assets/products/vibratingscreen_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Strong Base Anion Exchange Resin",
      "id": "Resin Penukar Anion Basa Kuat",
      "ms": "Resin Pertukaran Anion Bes Kuat",
      "th": "เรซินแลกเปลี่ยนประจุลบ (Anion Resin)",
      "zh": "强碱性阴离子交换树脂 (201x7 / D201)"
    },
    "slug": "membranes-ion-exchange",
    "short_desc": {
      "en": "High-performance strong base anion exchange resin designed for industrial water treatment and demanding engineering operations.",
      "id": "Resin Penukar Anion Basa Kuat performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Resin Pertukaran Anion Bes Kuat berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "เรซินแลกเปลี่ยนประจุลบ (Anion Resin) ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能强碱性阴离子交换树脂 (201x7 / D201)，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/anionresin.webp",
    "gallery_images": [
      "/assets/products/anionresin.webp",
      "/assets/products/anionresin_detail_1.webp",
      "/assets/products/anionresin_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Strong Acid Cation Exchange Resin",
      "id": "Resin Penukar Kation Asam Kuat",
      "ms": "Resin Pertukaran Kation Asid Kuat",
      "th": "เรซินแลกเปลี่ยนประจุบวก (Cation Resin)",
      "zh": "强酸性阳离子交换树脂 (001x7 / 732)"
    },
    "slug": "membranes-ion-exchange",
    "short_desc": {
      "en": "High-performance strong acid cation exchange resin designed for industrial water treatment and demanding engineering operations.",
      "id": "Resin Penukar Kation Asam Kuat performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Resin Pertukaran Kation Asid Kuat berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "เรซินแลกเปลี่ยนประจุบวก (Cation Resin) ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能强酸性阳离子交换树脂 (001x7 / 732)，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/cationresin.webp",
    "gallery_images": [
      "/assets/products/cationresin.webp",
      "/assets/products/cationresin_detail_1.webp",
      "/assets/products/cationresin_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Inorganic Tubular Ceramic Membrane Module",
      "id": "Modul Membran Keramik Anorganik",
      "ms": "Modul Membran Seramik Tiub Tak Organik",
      "th": "โมดูลเมมเบรนเซรามิกทนสารเคมี",
      "zh": "无机管式陶瓷膜超滤/微滤组件"
    },
    "slug": "membranes-ion-exchange",
    "short_desc": {
      "en": "High-performance inorganic tubular ceramic membrane module designed for industrial water treatment and demanding engineering operations.",
      "id": "Modul Membran Keramik Anorganik performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Modul Membran Seramik Tiub Tak Organik berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "โมดูลเมมเบรนเซรามิกทนสารเคมี ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能无机管式陶瓷膜超滤/微滤组件，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/ceramicmembrane.webp",
    "gallery_images": [
      "/assets/products/ceramicmembrane.webp",
      "/assets/products/ceramicmembrane_detail_1.webp",
      "/assets/products/ceramicmembrane_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "MBR Flat Sheet Membrane Element",
      "id": "Elemen Membran MBR Flat Sheet",
      "ms": "Elemen Membran Kepingan Rata MBR",
      "th": "แผ่นเมมเบรน MBR (Flat Sheet)",
      "zh": "MBR平板膜元件 / 膜生物反应器组件 (PVDF)"
    },
    "slug": "membranes-ion-exchange",
    "short_desc": {
      "en": "High-performance mbr flat sheet membrane element designed for industrial water treatment and demanding engineering operations.",
      "id": "Elemen Membran MBR Flat Sheet performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Elemen Membran Kepingan Rata MBR berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "แผ่นเมมเบรน MBR (Flat Sheet) ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能MBR平板膜元件 / 膜生物反应器组件 (PVDF)，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/flatsheetmembrane.webp",
    "gallery_images": [
      "/assets/products/flatsheetmembrane.webp",
      "/assets/products/flatsheetmembrane_detail_1.webp",
      "/assets/products/flatsheetmembrane_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Cross-Flow Tubular Membrane Module",
      "id": "Modul Membran Tubular Cross-Flow",
      "ms": "Modul Membran Tiub Aliran Silang",
      "th": "โมดูลเมมเบรนแบบท่อ (Tubular Membrane)",
      "zh": "管式超滤膜组件 (Tubular Membrane)"
    },
    "slug": "membranes-ion-exchange",
    "short_desc": {
      "en": "High-performance cross-flow tubular membrane module designed for industrial water treatment and demanding engineering operations.",
      "id": "Modul Membran Tubular Cross-Flow performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Modul Membran Tiub Aliran Silang berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "โมดูลเมมเบรนแบบท่อ (Tubular Membrane) ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能管式超滤膜组件 (Tubular Membrane)，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/tubularmembrane.webp",
    "gallery_images": [
      "/assets/products/tubularmembrane.webp",
      "/assets/products/tubularmembrane_detail_1.webp",
      "/assets/products/tubularmembrane_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Horizontal Dissolved Air Flotation (DAF) Unit",
      "id": "Unit Flotasi Udara Terlarut (DAF) Horizontal",
      "ms": "Unit Pengapungan Udara Terlarut (DAF) Mendatar",
      "th": "ระบบบำบัดน้ำเสีย DAF แนวนอน",
      "zh": "平流式溶气气浮机 (Horizontal DAF)"
    },
    "slug": "treatment-plants-systems",
    "short_desc": {
      "en": "High-performance horizontal dissolved air flotation (daf) unit designed for industrial water treatment and demanding engineering operations.",
      "id": "Unit Flotasi Udara Terlarut (DAF) Horizontal performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Unit Pengapungan Udara Terlarut (DAF) Mendatar berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "ระบบบำบัดน้ำเสีย DAF แนวนอน ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能平流式溶气气浮机 (Horizontal DAF)，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/dafhorizontal.webp",
    "gallery_images": [
      "/assets/products/dafhorizontal.webp",
      "/assets/products/dafhorizontal_detail_1.webp",
      "/assets/products/dafhorizontal_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Compact Vertical DAF Clarifier System",
      "id": "Sistem Clarifier DAF Vertikal Kompak",
      "ms": "Sistem Penjernih DAF Menegak Padat",
      "th": "ระบบบำบัด DAF ทรงกระบอกแนวตั้ง",
      "zh": "竖流式高效溶气气浮沉淀一体机 (Vertical DAF)"
    },
    "slug": "treatment-plants-systems",
    "short_desc": {
      "en": "High-performance compact vertical daf clarifier system designed for industrial water treatment and demanding engineering operations.",
      "id": "Sistem Clarifier DAF Vertikal Kompak performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Sistem Penjernih DAF Menegak Padat berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "ระบบบำบัด DAF ทรงกระบอกแนวตั้ง ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能竖流式高效溶气气浮沉淀一体机 (Vertical DAF)，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/dafvertical.webp",
    "gallery_images": [
      "/assets/products/dafvertical.webp",
      "/assets/products/dafvertical_detail_1.webp",
      "/assets/products/dafvertical_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Two-Bed Demineralization Plant System",
      "id": "Sistem Pabrik Demineralisasi Dua Tangki",
      "ms": "Sistem Loji Penyahmineralan Dua Katil",
      "th": "ระบบผลิตน้ำปราศจากแร่ธาตุ (Demineral Plant)",
      "zh": "双床/混床复床工业除盐水处理系统 (Demineral Plant)"
    },
    "slug": "treatment-plants-systems",
    "short_desc": {
      "en": "High-performance two-bed demineralization plant system designed for industrial water treatment and demanding engineering operations.",
      "id": "Sistem Pabrik Demineralisasi Dua Tangki performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Sistem Loji Penyahmineralan Dua Katil berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "ระบบผลิตน้ำปราศจากแร่ธาตุ (Demineral Plant) ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能双床/混床复床工业除盐水处理系统 (Demineral Plant)，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/demineralplant.webp",
    "gallery_images": [
      "/assets/products/demineralplant.webp",
      "/assets/products/demineralplant_detail_1.webp",
      "/assets/products/demineralplant_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Automatic Industrial Water Softener Plant",
      "id": "Pabrik Pelunak Air Sadah Otomatis Industri",
      "ms": "Loji Pelembut Air Industri Automatik",
      "th": "ระบบปรับสภาพน้ำกระด้างอัตโนมัติ (Water Softener)",
      "zh": "全自动工业锅炉软化水设备系统 (Softener Plant)"
    },
    "slug": "treatment-plants-systems",
    "short_desc": {
      "en": "High-performance automatic industrial water softener plant designed for industrial water treatment and demanding engineering operations.",
      "id": "Pabrik Pelunak Air Sadah Otomatis Industri performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Loji Pelembut Air Industri Automatik berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "ระบบปรับสภาพน้ำกระด้างอัตโนมัติ (Water Softener) ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能全自动工业锅炉软化水设备系统 (Softener Plant)，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/softenerplant.webp",
    "gallery_images": [
      "/assets/products/softenerplant.webp",
      "/assets/products/softenerplant_detail_1.webp",
      "/assets/products/softenerplant_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Wet Electrostatic Precipitator (WESP) System",
      "id": "Sistem Presipitator Elektrostatik Basah (WESP)",
      "ms": "Sistem Pemendap Elektrostatik Basah (WESP)",
      "th": "ระบบดักฝุ่นและละอองน้ำแบบไฟฟ้าสถิตเปียก (WESP)",
      "zh": "湿式静电除尘除雾器系统 (WESP)"
    },
    "slug": "treatment-plants-systems",
    "short_desc": {
      "en": "High-performance wet electrostatic precipitator (wesp) system designed for industrial water treatment and demanding engineering operations.",
      "id": "Sistem Presipitator Elektrostatik Basah (WESP) performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Sistem Pemendap Elektrostatik Basah (WESP) berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "ระบบดักฝุ่นและละอองน้ำแบบไฟฟ้าสถิตเปียก (WESP) ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能湿式静电除尘除雾器系统 (WESP)，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/wetelectrostatic.webp",
    "gallery_images": [
      "/assets/products/wetelectrostatic.webp",
      "/assets/products/wetelectrostatic_detail_1.webp",
      "/assets/products/wetelectrostatic_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "FRP Packed Column Wet Scrubber System",
      "id": "Sistem Wet Scrubber Kolom FRP",
      "ms": "Sistem Penyental Basah Turus FRP",
      "th": "ระบบบำบัดกลิ่นและไอเสียแบบสแครบเบอร์เปียก (Wet Scrubber)",
      "zh": "酸碱废气填料喷淋吸收净化塔 (Wet Scrubber)"
    },
    "slug": "treatment-plants-systems",
    "short_desc": {
      "en": "High-performance frp packed column wet scrubber system designed for industrial water treatment and demanding engineering operations.",
      "id": "Sistem Wet Scrubber Kolom FRP performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Sistem Penyental Basah Turus FRP berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "ระบบบำบัดกลิ่นและไอเสียแบบสแครบเบอร์เปียก (Wet Scrubber) ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能酸碱废气填料喷淋吸收净化塔 (Wet Scrubber)，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/wetscrubber.webp",
    "gallery_images": [
      "/assets/products/wetscrubber.webp",
      "/assets/products/wetscrubber_detail_1.webp",
      "/assets/products/wetscrubber_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Granular Aluminum Sulphate (Alum)",
      "id": "Aluminium Sulfat Granular (Tawas)",
      "ms": "Aluminium Sulfat Berbutir (Tawas)",
      "th": "สารส้มอลูมิเนียมซัลเฟต (Alum)",
      "zh": "固体工业聚合硫酸铝 / 明矾 (Alum)"
    },
    "slug": "chemicals-chemical-feeding",
    "short_desc": {
      "en": "High-performance granular aluminum sulphate (alum) designed for industrial water treatment and demanding engineering operations.",
      "id": "Aluminium Sulfat Granular (Tawas) performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Aluminium Sulfat Berbutir (Tawas) berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "สารส้มอลูมิเนียมซัลเฟต (Alum) ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能固体工业聚合硫酸铝 / 明矾 (Alum)，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/aluminumsuplhate.webp",
    "gallery_images": [
      "/assets/products/aluminumsuplhate.webp",
      "/assets/products/aluminumsuplhate_detail_1.webp",
      "/assets/products/aluminumsuplhate_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Chemical Dosing Mixing Agitation Tank",
      "id": "Tangki Pengaduk Pencampur Bahan Kimia",
      "ms": "Tangki Pembancuh Kimia Berpengaduk",
      "th": "ถังผสมและกวนสารเคมีอุตสาหกรรม",
      "zh": "PE/不锈钢立式加药搅拌储罐一体机"
    },
    "slug": "chemicals-chemical-feeding",
    "short_desc": {
      "en": "High-performance chemical dosing mixing agitation tank designed for industrial water treatment and demanding engineering operations.",
      "id": "Tangki Pengaduk Pencampur Bahan Kimia performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Tangki Pembancuh Kimia Berpengaduk berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "ถังผสมและกวนสารเคมีอุตสาหกรรม ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能PE/不锈钢立式加药搅拌储罐一体机，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/mixingtank.webp",
    "gallery_images": [
      "/assets/products/mixingtank.webp",
      "/assets/products/mixingtank_detail_1.webp",
      "/assets/products/mixingtank_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Poly Aluminium Chloride (PAC) Powder 30%",
      "id": "Bubuk Poly Aluminium Chloride (PAC) 30%",
      "ms": "Serbuk Poli Aluminium Klorida (PAC) 30%",
      "th": "โพลีอะลูมิเนียมคลอไรด์ (PAC ผง 30%)",
      "zh": "聚合氯化铝 (PAC) 30% 饮水/工业级净水絮凝剂"
    },
    "slug": "chemicals-chemical-feeding",
    "short_desc": {
      "en": "High-performance poly aluminium chloride (pac) powder 30% designed for industrial water treatment and demanding engineering operations.",
      "id": "Bubuk Poly Aluminium Chloride (PAC) 30% performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Serbuk Poli Aluminium Klorida (PAC) 30% berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "โพลีอะลูมิเนียมคลอไรด์ (PAC ผง 30%) ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能聚合氯化铝 (PAC) 30% 饮水/工业级净水絮凝剂，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/pac.webp",
    "gallery_images": [
      "/assets/products/pac.webp",
      "/assets/products/pac_detail_1.webp",
      "/assets/products/pac_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Polyacrylamide (PAM) Flocculant Polymer",
      "id": "Polimer Flokulan Polyacrylamide (PAM)",
      "ms": "Polimer Flokulan Poliakrilamida (PAM)",
      "th": "สารช่วยตกตะกอนโพลิเมอร์ (PAM)",
      "zh": "聚丙烯酰胺 (PAM) 阴/阳/非离子高分子有机絮凝剂"
    },
    "slug": "chemicals-chemical-feeding",
    "short_desc": {
      "en": "High-performance polyacrylamide (pam) flocculant polymer designed for industrial water treatment and demanding engineering operations.",
      "id": "Polimer Flokulan Polyacrylamide (PAM) performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Polimer Flokulan Poliakrilamida (PAM) berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "สารช่วยตกตะกอนโพลิเมอร์ (PAM) ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能聚丙烯酰胺 (PAM) 阴/阳/非离子高分子有机絮凝剂，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/pam.webp",
    "gallery_images": [
      "/assets/products/pam.webp",
      "/assets/products/pam_detail_1.webp",
      "/assets/products/pam_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Automatic Dry Chemical Powder Feeder",
      "id": "Pengumpan Bubuk Kimia Kering Otomatis",
      "ms": "Pemberi Makanan Serbuk Kimia Kering Automatik",
      "th": "เครื่องป้อนผงเคมีแห้งอัตโนมัติ",
      "zh": "全自动干粉投加机 / PAM三箱连续式泡药系统"
    },
    "slug": "chemicals-chemical-feeding",
    "short_desc": {
      "en": "High-performance automatic dry chemical powder feeder designed for industrial water treatment and demanding engineering operations.",
      "id": "Pengumpan Bubuk Kimia Kering Otomatis performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Pemberi Makanan Serbuk Kimia Kering Automatik berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "เครื่องป้อนผงเคมีแห้งอัตโนมัติ ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能全自动干粉投加机 / PAM三箱连续式泡药系统，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/powderfeeding.webp",
    "gallery_images": [
      "/assets/products/powderfeeding.webp",
      "/assets/products/powderfeeding_detail_1.webp",
      "/assets/products/powderfeeding_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Dense Soda Ash (Sodium Carbonate 99.2%)",
      "id": "Soda Ash Padat (Natrium Karbonat 99.2%)",
      "ms": "Abu Soda Padat (Natrium Karbonat 99.2%)",
      "th": "โซดาแอชบริสุทธิ์ (Sodium Carbonate 99.2%)",
      "zh": "重质纯碱 (碳酸钠 99.2% pH调节助凝剂)"
    },
    "slug": "chemicals-chemical-feeding",
    "short_desc": {
      "en": "High-performance dense soda ash (sodium carbonate 99.2%) designed for industrial water treatment and demanding engineering operations.",
      "id": "Soda Ash Padat (Natrium Karbonat 99.2%) performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Abu Soda Padat (Natrium Karbonat 99.2%) berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "โซดาแอชบริสุทธิ์ (Sodium Carbonate 99.2%) ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能重质纯碱 (碳酸钠 99.2% pH调节助凝剂)，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/sodaash.webp",
    "gallery_images": [
      "/assets/products/sodaash.webp",
      "/assets/products/sodaash_detail_1.webp",
      "/assets/products/sodaash_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Submersible Mixer Agitator",
      "id": "Pengaduk Submersible Mixer Agitator",
      "ms": "Pengaduk Pembancuh Tenggelam",
      "th": "เครื่องกวนใต้น้ำความเร็วรอบต่ำ/สูง (Submersible Mixer)",
      "zh": "潜水搅拌机 / 低速推流搅拌器 (QJB)"
    },
    "slug": "chemicals-chemical-feeding",
    "short_desc": {
      "en": "High-performance submersible mixer agitator designed for industrial water treatment and demanding engineering operations.",
      "id": "Pengaduk Submersible Mixer Agitator performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Pengaduk Pembancuh Tenggelam berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "เครื่องกวนใต้น้ำความเร็วรอบต่ำ/สูง (Submersible Mixer) ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能潜水搅拌机 / 低速推流搅拌器 (QJB)，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/submersiblemixing.webp",
    "gallery_images": [
      "/assets/products/submersiblemixing.webp",
      "/assets/products/submersiblemixing_detail_1.webp",
      "/assets/products/submersiblemixing_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Industrial Touchscreen HMI Display",
      "id": "Layar Tampilan HMI Layar Sentuh Industri",
      "ms": "Paparan Skrin Sentuh HMI Industri",
      "th": "หน้าจอสัมผัสควบคุมอุตสาหกรรม HMI",
      "zh": "工业触摸屏人机界面显示终端 (HMI)"
    },
    "slug": "power-auxiliary-equipment",
    "short_desc": {
      "en": "High-performance industrial touchscreen hmi display designed for industrial water treatment and demanding engineering operations.",
      "id": "Layar Tampilan HMI Layar Sentuh Industri performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Paparan Skrin Sentuh HMI Industri berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "หน้าจอสัมผัสควบคุมอุตสาหกรรม HMI ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能工业触摸屏人机界面显示终端 (HMI)，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/displayscreen.webp",
    "gallery_images": [
      "/assets/products/displayscreen.webp",
      "/assets/products/displayscreen_detail_1.webp",
      "/assets/products/displayscreen_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Explosion-Proof Fiber Optic Protective Tube",
      "id": "Tabung Pelindung Serat Optik Anti-Ledakan",
      "ms": "Tiub Pelindung Gentian Optik Kalis Letupan",
      "th": "ท่อร้อยสายไฟเบอร์ออปติกกันระเบิด",
      "zh": "防爆型光纤保护套管 / 阻火防爆穿线导管"
    },
    "slug": "power-auxiliary-equipment",
    "short_desc": {
      "en": "High-performance explosion-proof fiber optic protective tube designed for industrial water treatment and demanding engineering operations.",
      "id": "Tabung Pelindung Serat Optik Anti-Ledakan performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Tiub Pelindung Gentian Optik Kalis Letupan berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "ท่อร้อยสายไฟเบอร์ออปติกกันระเบิด ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能防爆型光纤保护套管 / 阻火防爆穿线导管，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/fiberexplosiontube.webp",
    "gallery_images": [
      "/assets/products/fiberexplosiontube.webp",
      "/assets/products/fiberexplosiontube_detail_1.webp",
      "/assets/products/fiberexplosiontube_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Industrial Deep Cycle Lithium LiFePO4 Battery Pack",
      "id": "Pak Baterai Lithium LiFePO4 Industri",
      "ms": "Pek Bateri Litium LiFePO4 Kitaran Dalam Industri",
      "th": "ชุดแบตเตอรี่ลิเธียม LiFePO4 สำหรับอุตสาหกรรม",
      "zh": "工业级磷酸铁锂电池储能电池组 (LiFePO4)"
    },
    "slug": "power-auxiliary-equipment",
    "short_desc": {
      "en": "High-performance industrial deep cycle lithium lifepo4 battery pack designed for industrial water treatment and demanding engineering operations.",
      "id": "Pak Baterai Lithium LiFePO4 Industri performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Pek Bateri Litium LiFePO4 Kitaran Dalam Industri berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "ชุดแบตเตอรี่ลิเธียม LiFePO4 สำหรับอุตสาหกรรม ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能工业级磷酸铁锂电池储能电池组 (LiFePO4)，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/lithiumbattery.webp",
    "gallery_images": [
      "/assets/products/lithiumbattery.webp",
      "/assets/products/lithiumbattery_detail_1.webp",
      "/assets/products/lithiumbattery_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "High Efficiency Monocrystalline Solar Panel 550W",
      "id": "Panel Surya Monokristalin Efisiensi Tinggi 550W",
      "ms": "Panel Suria Monohablur Berkecekapan Tinggi 550W",
      "th": "แผงโซลาร์เซลล์โมโนคริสตัลไลน์ 550W",
      "zh": "高效单晶硅太阳能光伏组件 (550W Half-Cell)"
    },
    "slug": "power-auxiliary-equipment",
    "short_desc": {
      "en": "High-performance high efficiency monocrystalline solar panel 550w designed for industrial water treatment and demanding engineering operations.",
      "id": "Panel Surya Monokristalin Efisiensi Tinggi 550W performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Panel Suria Monohablur Berkecekapan Tinggi 550W berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "แผงโซลาร์เซลล์โมโนคริสตัลไลน์ 550W ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能高效单晶硅太阳能光伏组件 (550W Half-Cell)，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/solarpanel.webp",
    "gallery_images": [
      "/assets/products/solarpanel.webp",
      "/assets/products/solarpanel_detail_1.webp",
      "/assets/products/solarpanel_detail_2.webp"
    ]
  },
  {
    "name": {
      "en": "Off-Grid Industrial Horizontal Wind Turbine 1kW",
      "id": "Turbin Angin Horizontal Industri Off-Grid 1kW",
      "ms": "Turbin Angin Mendatar Industri Luar Grid 1kW",
      "th": "กังหันลมผลิตไฟฟ้าแนวนอน 1kW",
      "zh": "离网型水平轴微风动力风力发电机 (1kW)"
    },
    "slug": "power-auxiliary-equipment",
    "short_desc": {
      "en": "High-performance off-grid industrial horizontal wind turbine 1kw designed for industrial water treatment and demanding engineering operations.",
      "id": "Turbin Angin Horizontal Industri Off-Grid 1kW performa tinggi yang dirancang untuk pengolahan air industri dan operasional rekayasa beban berat.",
      "ms": "Turbin Angin Mendatar Industri Luar Grid 1kW berprestasi tinggi yang direka untuk rawatan air industri dan operasi kejuruteraan.",
      "th": "กังหันลมผลิตไฟฟ้าแนวนอน 1kW ประสิทธิภาพสูง ออกแบบมาสำหรับระบบบำบัดน้ำเสียและงานวิศวกรรมอุตสาหกรรม",
      "zh": "高性能离网型水平轴微风动力风力发电机 (1kW)，专为工业水处理工程及严苛工业工况设计打造。"
    },
    "full_desc": {
      "en": "Industrial-grade technical solution engineered with premium corrosion-resistant materials and ISO 9001 quality assurance. Provides maximum hydraulic/process efficiency, seamless continuous 24/7 duty cycle, and extended maintenance intervals.",
      "id": "Solusi teknis tingkat industri yang dirancang dengan material tahan korosi premium dan sertifikasi mutu ISO 9001. Memberikan efisiensi proses maksimal, operasional kontinu 24/7 tanpa henti, serta interval pemeliharaan yang panjang.",
      "ms": "Penyelesaian teknikal gred industri yang dibina dengan bahan tahan kakisan dan jaminan kualiti ISO 9001 untuk operasi 24/7 berterusan.",
      "th": "โซลูชันทางวิศวกรรมเกรดอุตสาหกรรม ผลิตจากวัสดุทนต่อการกัดกร่อนมาตรฐาน ISO 9001 รองรับการทำงานหนักต่อเนื่อง 24 ชั่วโมงได้อย่างมีเสถียรภาพ",
      "zh": "工业级重载技术解决方案，采用高等级耐腐蚀材质制造，严格遵循 ISO 9001 质量管理体系。具备优异的工艺运行效率，支持 24/7 全天候连续运行，维护周期长。"
    },
    "rating": "4.9/5",
    "rating_count": {
      "en": "1,250 plant audits",
      "id": "1.250 audit pabrik",
      "ms": "1,250 audit loji",
      "th": "1,250 การตรวจสอบโรงงาน",
      "zh": "1,250 次工厂审核"
    },
    "note": {
      "en": "Includes 12-month standard manufacturer warranty and on-site commissioning technical assistance.",
      "id": "Termasuk garansi resmi pabrik 12 bulan dan dukungan teknis komisioning pengujian di lokasi.",
      "ms": "Termasuk waranti standard pengilang 12 bulan dan bantuan teknikal pentauliahan di tapak.",
      "th": "รับประกันมาตรฐานจากโรงงานผู้ผลิต 12 เดือน พร้อมบริการสนับสนุนด้านเทคนิคและการทดสอบระบบหน้างาน",
      "zh": "包含12个月原厂标准质保及现场技术调试与开机指导服务。"
    },
    "image_url": "/assets/products/windturbine.webp",
    "gallery_images": [
      "/assets/products/windturbine.webp",
      "/assets/products/windturbine_detail_1.webp",
      "/assets/products/windturbine_detail_2.webp"
    ]
  }
]
JSON;

        $categoryMap = json_decode($categoryJson, true);
        $rawProducts = json_decode($productsJson, true);

        $categoryIds = [];
        foreach ($categoryMap as $slug => $catData) {
            $catId = DB::table('categories')->insertGetId([
                'name' => json_encode($catData['name']),
                'slug' => $slug,
                'description' => json_encode($catData['description'] ?? null),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            $categoryIds[$slug] = $catId;
        }

        foreach ($rawProducts as $index => $item) {
            $catSlug = $item['slug'];
            $catId = $categoryIds[$catSlug] ?? null;

            $slugName = $item['image_url'] ? str_replace(['/assets/products/', '.webp'], '', $item['image_url']) : ('product-' . ($index + 1));

            $productId = DB::table('products')->insertGetId([
                'name' => json_encode($item['name']),
                'slug' => $slugName,
                'short_desc' => json_encode($item['short_desc']),
                'full_desc' => json_encode($item['full_desc']),
                'rating' => $item['rating'] ?? '4.9/5',
                'rating_count' => json_encode($item['rating_count'] ?? ['en' => '1,250 plant audits', 'id' => '1.250 audit pabrik', 'ms' => '1,250 audit loji', 'th' => '1,250 การตรวจสอบโรงงาน', 'zh' => '1,250 次工厂审核']),
                'note' => json_encode($item['note'] ?? null),
                'image_url' => $item['image_url'] ?? null,
                'gallery_images' => isset($item['gallery_images']) ? json_encode($item['gallery_images']) : null,
                'is_featured' => $index < 6,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            if ($catId) {
                DB::table('category_product')->insert([
                    'product_id' => $productId,
                    'category_id' => $catId,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
