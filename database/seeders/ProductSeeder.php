<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Seed Product Categories
        $catWater = DB::table('categories')->insertGetId([
            'name' => 'Water Treatment Series',
            'slug' => 'water-treatment-series',
            'description' => 'Industrial high-purity water demineralization & ion exchange systems.',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $catWastewater = DB::table('categories')->insertGetId([
            'name' => 'Wastewater Pre-Treatment',
            'slug' => 'wastewater-pre-treatment',
            'description' => 'High-capacity suspended solids & oil flotation pre-treatment cells.',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $catValves = DB::table('categories')->insertGetId([
            'name' => 'Valves & Actuators',
            'slug' => 'valves-actuators',
            'description' => 'Heavy-duty pneumatic & motorized industrial flow control valves.',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $catAutomation = DB::table('categories')->insertGetId([
            'name' => 'Measurement & Automation',
            'slug' => 'measurement-automation',
            'description' => 'Real-time online water quality sensors, COD meters, and telemetry.',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // 2. Seed Products (Complete Data Matching ProductDetailView Modal 100%)
        $prodDemin = DB::table('products')->insertGetId([
            'name' => 'Pressure Sand & Anthracite Filtration Vessel',
            'slug' => 'demineral-plant',
            'short_desc' => 'Pressure sand and anthracite multi-layer depth filtration vessel for suspended solids and turbidity removal.',
            'full_desc' => 'EcoReve Pressure Sand & Anthracite vessels are engineered for high-throughput industrial pre-filtration. Designed to eliminate suspended solids, turbidity, and colloidal particles prior to RO or ion-exchange treatment.',
            'rating' => '4.9/5',
            'rating_count' => 'based on 9,649 plant audits',
            'badge_text' => 'ISO 9001 Verified®',
            'price_label' => 'SKID LEASE RATE',
            'price' => 'Starting at $950/month',
            'note' => 'A shipment typically lasts one month of heavy industrial plant operation',
            'options' => json_encode([
                ['id' => 'N', 'name' => 'N or N+1', 'range' => 'Under 50 m³/h'],
                ['id' => '1', 'name' => '1', 'range' => '50-100 m³/h'],
                ['id' => '2', 'name' => '2', 'range' => '100-250 m³/h'],
                ['id' => '3', 'name' => '3', 'range' => '250-500 m³/h'],
                ['id' => '4', 'name' => '4', 'range' => '500-1,000 m³/h'],
                ['id' => '5', 'name' => '5', 'range' => '1,000-2,000 m³/h'],
                ['id' => '6', 'name' => '6', 'range' => '2,000-5,000 m³/h'],
                ['id' => '7', 'name' => '7', 'range' => 'Custom OEM Skid'],
            ]),
            'accordions' => json_encode([
                [
                    'title' => 'Size + pack details',
                    'content' => 'Vessel Diameter: 1200mm - 3600mm. Operating Pressure: 0.6 MPa - 1.0 MPa. Shipped in IPPC-certified wooden crate container skid.'
                ],
                [
                    'title' => 'Clean materials & specs',
                    'content' => 'Shell: Q235B Carbon Steel lined with Rubber / SUS316L. Internal Nozzles: ABS / Stainless Steel 316. Filter Media: Select Quartz Sand & High-Grade Anthracite Coal.'
                ],
                [
                    'title' => 'Why we love it',
                    'content' => 'Automated differential pressure backwash cycle ensures zero operator intervention and 99.8% water recovery.'
                ],
                [
                    'title' => 'Subscriber & OEM exclusive benefits',
                    'content' => 'Includes 24-Month Extended Parts Warranty, 24/7 remote SCADA telemetry monitoring, and priority media replacement service.'
                ],
            ]),
            'spec_pdf_url' => '/storage/datasheets/demineral-plant-spec.pdf',
            'image_url' => '/assets/products/1.webp',
            'gallery_images' => json_encode([
                '/assets/products/1.webp',
                '/assets/products/2.webp',
                '/assets/products/3.webp',
                '/assets/products/4.webp',
            ]),
            'is_featured' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $prodDAF = DB::table('products')->insertGetId([
            'name' => 'Dissolved Air Flotation (DAF) Horizontal Unit',
            'slug' => 'daf-horizontal-flotation',
            'short_desc' => 'High-efficiency micro-bubble flotation cell for oil, grease, and suspended solids separation in industrial wastewater.',
            'full_desc' => 'EcoReve DAF systems produce 20-30 micron micro-bubbles that adhere to emulsified oils and light floc particles, achieving up to 99% TSS and FOG removal rates.',
            'rating' => '4.8/5',
            'rating_count' => 'based on 4,210 industrial installations',
            'badge_text' => 'ASME Section VIII Certified®',
            'price_label' => 'UNIT LEASE RATE',
            'price' => 'Starting at $1,400/month',
            'note' => 'Plug-and-play skid-mounted delivery with chemical dosing unit included',
            'options' => json_encode([
                ['id' => '1', 'name' => 'DAF-10', 'range' => '10 m³/h'],
                ['id' => '2', 'name' => 'DAF-50', 'range' => '50 m³/h'],
                ['id' => '3', 'name' => 'DAF-150', 'range' => '150 m³/h'],
                ['id' => '4', 'name' => 'DAF-300', 'range' => '300 m³/h'],
            ]),
            'accordions' => json_encode([
                [
                    'title' => 'Size + pack details',
                    'content' => 'Footprint: 4.5m x 2.2m x 2.4m. Total Skid Weight: 3,200 kg. Containerized 40ft High-Cube delivery.'
                ],
                [
                    'title' => 'Clean materials & specs',
                    'content' => 'Tank Material: SUS304 / SUS316L Stainless Steel. Dissolved Air Pump: Regenerative Turbine Type 0.75 MPa.'
                ],
            ]),
            'spec_pdf_url' => '/storage/datasheets/daf-unit-spec.pdf',
            'image_url' => '/assets/products/2.webp',
            'gallery_images' => json_encode([
                '/assets/products/2.webp',
                '/assets/products/3.webp',
            ]),
            'is_featured' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $prodMeter = DB::table('products')->insertGetId([
            'name' => 'Online Optical Turbidity & COD Analyzer',
            'slug' => 'online-turbidity-meter',
            'short_desc' => 'Continuous UV-Vis absorption online monitor for real-time COD, BOD, TSS, and Turbidity telemetry.',
            'full_desc' => 'Self-cleaning optical sensor probe with RS485 Modbus telemetry output for 24/7 continuous industrial discharge monitoring.',
            'rating' => '4.9/5',
            'rating_count' => 'based on 12,000 sensor deployments',
            'badge_text' => 'CE & IP68 Waterproof®',
            'price_label' => 'PURCHASE PRICE',
            'price' => '$2,850 / kit',
            'note' => 'Ships globally within 3 business days via express courier',
            'options' => json_encode([
                ['id' => '1', 'name' => 'Standard Probe', 'range' => '0 - 1,000 NTU'],
                ['id' => '2', 'name' => 'High-Range Probe', 'range' => '0 - 4,000 NTU'],
            ]),
            'accordions' => json_encode([
                [
                    'title' => 'Technical specifications',
                    'content' => 'Optical Source: 254nm / 860nm LED. Measurement Accuracy: ±2% F.S. Output: 4-20mA & RS485 Modbus RTU.'
                ],
            ]),
            'spec_pdf_url' => null,
            'image_url' => '/assets/products/3.webp',
            'gallery_images' => json_encode(['/assets/products/3.webp']),
            'is_featured' => false,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $prodValve = DB::table('products')->insertGetId([
            'name' => 'Pneumatic Actuated Lug-Type Butterfly Valve',
            'slug' => 'pneumatic-butterfly-valve',
            'short_desc' => 'High-cycle double-acting pneumatic actuator valve for corrosive chemical and slurry fluid control.',
            'full_desc' => 'EcoReve pneumatic butterfly valves feature Teflon/EPDM resilient seating and hard-chromed stainless steel discs for tight shut-off isolation in water treatment loops.',
            'rating' => '4.7/5',
            'rating_count' => 'based on 18,500 units operating',
            'badge_text' => 'API 609 & SIL3 Certified®',
            'price_label' => 'UNIT PRICE',
            'price' => '$420 / unit',
            'note' => 'Available in stock for immediate dispatch',
            'options' => json_encode([
                ['id' => '1', 'name' => 'DN50 (2")', 'range' => 'PN16 / 150#'],
                ['id' => '2', 'name' => 'DN100 (4")', 'range' => 'PN16 / 150#'],
                ['id' => '3', 'name' => 'DN200 (8")', 'range' => 'PN16 / 150#'],
            ]),
            'accordions' => json_encode([
                [
                    'title' => 'Materials & actuation',
                    'content' => 'Body: Ductile Iron GGG40. Disc: CF8M Stainless Steel. Actuator: Hard Anodized Aluminum Alloy.'
                ],
            ]),
            'spec_pdf_url' => '/storage/datasheets/butterfly-valve-spec.pdf',
            'image_url' => '/assets/products/4.webp',
            'gallery_images' => json_encode(['/assets/products/4.webp']),
            'is_featured' => false,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // 3. Attach Categories Pivot Relations
        DB::table('category_product')->insertOrIgnore([
            ['product_id' => $prodDemin, 'category_id' => $catWater, 'created_at' => now(), 'updated_at' => now()],
            ['product_id' => $prodDAF, 'category_id' => $catWastewater, 'created_at' => now(), 'updated_at' => now()],
            ['product_id' => $prodMeter, 'category_id' => $catAutomation, 'created_at' => now(), 'updated_at' => now()],
            ['product_id' => $prodValve, 'category_id' => $catValves, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
