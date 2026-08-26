<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OfficeSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('offices')->insertOrIgnore([
            [
                'badge' => 'China Office',
                'name' => 'Qingdao EcoReve Environmental Technology Co., LTD',
                'address' => 'No. 117 Wannian Quan Road, Licang District, Qingdao City, Shandong Province, China',
                'phone' => '+86 (0532) 8000-8888',
                'email' => 'info@ecoreve.com',
                'footer_desc_1' => 'EcoReve focuses on the field of environmental protection equipment and is committed to providing customers with efficient, energy-saving, environmentally friendly, and high-quality products.',
                'footer_desc_2' => 'By gradually integrating solutions that are useful for the environment, we aim to drive our willingness to expand into new markets. Committed to helping businesses increase profits, improve recycling rates, and promote resource utilization.',
                'sort_order' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'badge' => 'Malaysia Office',
                'name' => 'EcoReve Environmental Sdn. Bhd.',
                'address' => 'No. 15 Jalan Industrial 3, Taman Sains, 47100 Puchong, Selangor, Malaysia',
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
