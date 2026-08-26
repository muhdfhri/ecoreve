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
                'question' => 'DO YOU MANUFACTURE THE EQUIPMENT USED TO BUILD THE WATER TREATMENT PLANTS?',
                'answer' => "Yes. We're a true OEM, not a broker. We own the design, the engineering, and the supply chain for all industrial water & wastewater infrastructure.",
                'sort_order' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'question' => 'WHAT PRODUCTS DO YOU OFFER?',
                'answer' => 'We engineer containerized & skid-mounted Demineralization Plants, Softener Systems, Horizontal & Vertical DAF Flotation units, Geotube Dewatering systems, PE Storage Tanks, Chemical Dosing Pumps, and zero-leakage High-Performance Butterfly Valves.',
                'sort_order' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'question' => 'CAN YOU HANDLE CUSTOM SPECS?',
                'answer' => 'Absolutely. Every industrial plant requires unique flow rates, chemical pH tolerances, and telemetry integration. Our engineering team custom builds systems according to your exact plant discharge parameters and SCADA specifications.',
                'sort_order' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'question' => 'WHAT KINDS OF PROJECTS DO YOU WORK ON?',
                'answer' => 'We serve large-scale manufacturing facilities, chemical plants, food & beverage processing plants, textiles, power stations, and municipal wastewater facilities requiring Zero Liquid Discharge (ZLD) or high-efficiency water recirculation.',
                'sort_order' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'question' => 'WHERE ARE YOU LOCATED & DO YOU SUPPORT INTERNATIONAL DEPLOYMENTS?',
                'answer' => 'Headquartered with major R&D hubs in Qingdao, we deploy and service industrial water infrastructure across Southeast Asia, East Asia, and globally with 24/7 on-site operator training and telemetry support.',
                'sort_order' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
