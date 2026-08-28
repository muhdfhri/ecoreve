<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OfficeSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('offices')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        DB::table('offices')->insert([
            [
                'badge' => json_encode([
                    'en' => 'China Office',
                    'id' => 'Kantor China',
                    'ms' => 'Pejabat China',
                    'th' => 'สำนักงานประเทศจีน',
                    'zh' => '中国总部与生产基地'
                ], JSON_UNESCAPED_UNICODE),
                'name' => json_encode([
                    'en' => 'Qingdao EcoReve Environmental Technology Co., LTD',
                    'id' => 'Qingdao EcoReve Environmental Technology Co., LTD',
                    'ms' => 'Qingdao EcoReve Environmental Technology Co., LTD',
                    'th' => 'บริษัท ชิงเต่า อีโค่รีฟ เอ็นไวรอนเมนทัล เทคโนโลยี จำกัด',
                    'zh' => '青岛青绿环保科技有限公司'
                ], JSON_UNESCAPED_UNICODE),
                'address' => json_encode([
                    'en' => 'No. 117 Wannian Quan Road, Licang District, Qingdao City, Shandong Province, China',
                    'id' => 'No. 117 Wannian Quan Road, Distrik Licang, Kota Qingdao, Provinsi Shandong, China',
                    'ms' => 'No. 117 Wannian Quan Road, Daerah Licang, Bandar Qingdao, Wilayah Shandong, China',
                    'th' => 'เลขที่ 117 ถนนว่านเนียนฉวน เขตหลี่ช่าง เมืองชิงเต่า มณฑลซานตง ประเทศจีน',
                    'zh' => '中国山东省青岛市李沧区万年泉路117号'
                ], JSON_UNESCAPED_UNICODE),
                'phone' => '+86 (0532) 8000-8888',
                'email' => 'info@ecoreve.com',
                'footer_desc_1' => json_encode([
                    'en' => 'EcoReve focuses on the field of environmental protection equipment and is committed to providing customers with efficient, energy-saving, environmentally friendly, and high-quality products.',
                    'id' => 'EcoReve berfokus pada bidang peralatan perlindungan lingkungan dan berkomitmen untuk menyediakan produk yang efisien, hemat energi, ramah lingkungan, dan berkualitas tinggi kepada pelanggan.',
                    'ms' => 'EcoReve memberi tumpuan kepada bidang peralatan perlindungan alam sekitar dan komited untuk menyediakan produk yang cekap, menjimatkan tenaga, mesra alam dan berkualiti tinggi kepada pelanggan.',
                    'th' => 'EcoReve มุ่งเน้นในด้านอุปกรณ์ปกป้องสิ่งแวดล้อม และมุ่งมั่นที่จะมอบผลิตภัณฑ์ที่มีประสิทธิภาพ ประหยัดพลังงาน เป็นมิตรต่อสิ่งแวดล้อม และมีคุณภาพสูงให้แก่ลูกค้า',
                    'zh' => 'EcoReve 专注于环保设备领域，致力于为客户提供高效、节能、环保及高品质的产品与技术解决方案。'
                ], JSON_UNESCAPED_UNICODE),
                'footer_desc_2' => json_encode([
                    'en' => 'By gradually integrating solutions that are useful for the environment, we aim to drive our willingness to expand into new markets. Committed to helping businesses increase profits, improve recycling rates, and promote resource utilization.',
                    'id' => 'Dengan mengintegrasikan solusi yang bermanfaat bagi lingkungan secara bertahap, kami bertujuan untuk mendorong ekspansi ke pasar baru. Berkomitmen untuk membantu bisnis meningkatkan keuntungan, tingkat daur ulang, dan pemanfaatan sumber daya.',
                    'ms' => 'Dengan menyepadukan penyelesaian yang berguna untuk alam sekitar secara beransur-ansur, kami bertujuan untuk memacu keinginan kami untuk berkembang ke pasaran baharu. Komited untuk membantu perniagaan meningkatkan keuntungan, kadar kitar semula dan penggunaan sumber.',
                    'th' => 'ด้วยการบูรณาการโซลูชันที่เป็นประโยชน์ต่อสิ่งแวดล้อมอย่างต่อเนื่อง เรามุ่งมั่นที่จะขยายธุรกิจไปยังตลาดใหม่ พร้อมช่วยให้องค์กรเพิ่มผลกำไร ปรับปรุงอัตราการรีไซเคิล และส่งเสริมการใช้ทรัพยากรอย่างคุ้มค่า',
                    'zh' => '通过不断融入对环境有益的综合解决方案，拓展全球新市场。致力于帮助企业提升盈利能力、提高资源回收利用率，推动可持续发展。'
                ], JSON_UNESCAPED_UNICODE),
                'sort_order' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'badge' => json_encode([
                    'en' => 'Malaysia Office',
                    'id' => 'Kantor Malaysia',
                    'ms' => 'Pejabat Malaysia',
                    'th' => 'สำนักงานประเทศมาเลเซีย',
                    'zh' => '马来西亚分公司'
                ], JSON_UNESCAPED_UNICODE),
                'name' => json_encode([
                    'en' => 'EcoReve Environmental Sdn. Bhd.',
                    'id' => 'EcoReve Environmental Sdn. Bhd.',
                    'ms' => 'EcoReve Environmental Sdn. Bhd.',
                    'th' => 'บริษัท อีโค่รีฟ เอ็นไวรอนเมนทัล (มาเลเซีย) จำกัด',
                    'zh' => 'EcoReve 环境（马来西亚）私人有限公司'
                ], JSON_UNESCAPED_UNICODE),
                'address' => json_encode([
                    'en' => 'No. 15 Jalan Industrial 3, Taman Sains, 47100 Puchong, Selangor, Malaysia',
                    'id' => 'No. 15 Jalan Industrial 3, Taman Sains, 47100 Puchong, Selangor, Malaysia',
                    'ms' => 'No. 15 Jalan Industrial 3, Taman Sains, 47100 Puchong, Selangor, Malaysia',
                    'th' => 'เลขที่ 15 ถนนอุตสาหกรรม 3 สวนวิทยาศาสตร์ 47100 พูชอง รัฐสลังงอร์ ประเทศมาเลเซีย',
                    'zh' => '马来西亚雪兰莪州蒲种科技园工业3路15号'
                ], JSON_UNESCAPED_UNICODE),
                'phone' => '+60 3-8000 9999',
                'email' => 'malaysia@ecoreve.com',
                'footer_desc_1' => null,
                'footer_desc_2' => null,
                'sort_order' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
