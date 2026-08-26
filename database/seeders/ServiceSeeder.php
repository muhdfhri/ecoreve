<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Seed Service Categories
        $catSysIntegration = DB::table('service_categories')->insertGetId([
            'title' => 'System Integration',
            'slug' => 'system-integration',
            'icon_name' => 'Wrench',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $catAutomation = DB::table('service_categories')->insertGetId([
            'title' => 'Technical Operations',
            'slug' => 'technical-operations',
            'icon_name' => 'Sliders',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $catMaintenance = DB::table('service_categories')->insertGetId([
            'title' => 'Lifecycle Maintenance',
            'slug' => 'lifecycle-maintenance',
            'icon_name' => 'ShieldCheck',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // 2. Seed Services (Includes Card Paragraphs, 3 Metric Impact Card fields & Shadcn Modal Content!)
        DB::table('services')->insertOrIgnore([
            [
                'service_category_id' => $catSysIntegration,
                'title' => 'On-Site Mechanical & Piping Installation',
                'slug' => 'on-site-mechanical-piping-installation',
                'short_desc' => 'Our senior mechanical engineers execute precise on-site installation of skid-mounted demineralization plants, DAF flotation units, and chemical dosing pumps. All piping adheres to ISO 15614 welding standards with pressure testing prior to live water introduction.',
                'metric_label' => 'IMMERSY',
                'metric_value' => '+2',
                'metric_desc' => 'Operations expanded to 2 additional neighborhoods.',
                'content' => '<h3>Technical Scope of Work</h3><p>Full-turnkey piping and skid installation conforming to ISO 15614 welding specifications. Includes hydrostatic pressure testing, pipe alignment, valve actuation tuning, and pre-commissioning water flushing.</p><h4>Deliverables & Guarantees</h4><ul><li>Hydrostatic Test Certificate & ISO Weld Inspection Report</li><li>As-Built 3D Piping ISO Drawings</li><li>24-Month Structural Joint Leak Guarantee</li></ul>',
                'image_url' => '/assets/services_bg.png',
                'icon_name' => 'Wrench',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'service_category_id' => $catAutomation,
                'title' => 'Automated Chemical Dosing & Sensor Calibration',
                'slug' => 'automated-chemical-dosing-calibration',
                'short_desc' => 'Precision tuning of online COD, pH, Turbidity, and ORP meters with automated coagulant and polymer dosing feedback loops. Reduces chemical consumption by up to 38% while ensuring continuous discharge compliance.',
                'metric_label' => 'CHEMICAL SAVINGS',
                'metric_value' => '38%',
                'metric_desc' => 'Reduced chemical consumption via real-time telemetry feedback loops.',
                'content' => '<h3>Precision Dosing Optimization</h3><p>Our automation specialists calibrate online optical sensors and configure PID feedback control algorithms. Ensures precise chemical coagulant dosing matching real-time raw water turbidity fluctuations.</p>',
                'image_url' => '/assets/hero-footer.webp',
                'icon_name' => 'Sliders',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'service_category_id' => $catMaintenance,
                'title' => '24/7 Remote Telemetry & SCADA Monitoring',
                'slug' => 'remote-telemetry-scada-monitoring',
                'short_desc' => 'Around-the-clock remote monitoring of industrial effluent parameters, pump vibration diagnostics, and membrane differential pressure. Instant SMS & WhatsApp alarm dispatches prevent unscheduled plant downtime.',
                'metric_label' => 'UPTIME GUARANTEE',
                'metric_value' => '99.9%',
                'metric_desc' => 'Continuous real-time water quality monitoring and predictive maintenance alerts.',
                'content' => '<h3>24/7 SCADA Operations Center</h3><p>Real-time cloud telemetry streaming of flow rates, energy consumption, membrane fouling indices, and effluent discharge compliance. Includes 15-minute emergency technician response SLAs.</p>',
                'image_url' => '/assets/hero-banner.webp',
                'icon_name' => 'ShieldCheck',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
