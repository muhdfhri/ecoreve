<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NewsSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Seed News Categories
        $fundingCatId = DB::table('news_categories')->insertGetId([
            'name' => 'Funding',
            'slug' => 'funding',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $researchCatId = DB::table('news_categories')->insertGetId([
            'name' => 'Research',
            'slug' => 'research',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('news_categories')->insertOrIgnore([
            ['name' => 'Partnership', 'slug' => 'partnership', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Technology', 'slug' => 'technology', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Innovation', 'slug' => 'innovation', 'created_at' => now(), 'updated_at' => now()],
        ]);

        // 2. Seed News Articles
        DB::table('news')->insertOrIgnore([
            [
                'news_category_id' => $fundingCatId,
                'title' => 'EcoReve Secures $15M Series A Funding for High-Volume ZLD Industrial Systems',
                'slug' => 'ecoreve-secures-15m-funding-zld-systems',
                'read_time' => '5 MIN READ',
                'summary' => 'Investment round led by GreenTech Capital will accelerate deployment of automated Zero Liquid Discharge plants across Southeast Asia.',
                'content' => 'EcoReve Environmental Technology announced today the successful closing of a $15 million Series A financing round...',
                'table_of_contents' => json_encode([
                    ['id' => 'sec-1', 'title' => '1. Investment Overview & Key Investors'],
                    ['id' => 'sec-2', 'title' => '2. Scaling Zero Liquid Discharge Infrastructure'],
                    ['id' => 'sec-3', 'title' => '3. Southeast Asia Market Expansion Strategy']
                ]),
                'author_name' => 'Dr. Aris Setiawan',
                'author_role' => 'Lead Wastewater Specialist',
                'is_featured' => true,
                'published_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'news_category_id' => $researchCatId,
                'title' => 'Next-Gen Ceramic Membranes Show 40% Lower Fouling Rate in Heavy Effluent Trials',
                'slug' => 'ceramic-membranes-40-percent-lower-fouling',
                'read_time' => '7 MIN READ',
                'summary' => 'Benchmarking results from 1,000-hour continuous pilot testing in chemical processing wastewater.',
                'content' => 'Our R&D team has published milestone performance benchmarks evaluating ceramic MBR membranes against conventional polymeric hollow-fiber modules...',
                'table_of_contents' => json_encode([
                    ['id' => 'sec-1', 'title' => '1. Pilot Testing Methodology'],
                    ['id' => 'sec-2', 'title' => '2. Fouling Resistance Benchmarks']
                ]),
                'author_name' => 'Elena Rostova',
                'author_role' => 'Principal Chemical R&D Lead',
                'is_featured' => false,
                'published_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
