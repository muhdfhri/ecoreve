<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    public function index(): Response
    {
        $services = DB::table('services')
            ->leftJoin('service_categories', 'services.service_category_id', '=', 'service_categories.id')
            ->select(
                'services.*',
                'service_categories.title as category_title',
                'service_categories.slug as category_slug',
                'service_categories.icon_name as category_icon'
            )
            ->orderBy('services.id', 'asc')
            ->get()
            ->map(function ($s) {
                // Decode JSON fields if present
                if (isset($s->features) && is_string($s->features)) {
                    $s->features = json_decode($s->features, true) ?? [];
                }
                if (isset($s->deliverables) && is_string($s->deliverables)) {
                    $s->deliverables = json_decode($s->deliverables, true) ?? [];
                }
                return $s;
            });

        $serviceCategories = DB::table('service_categories')
            ->orderBy('id', 'asc')
            ->get();

        return Inertia::render('ServicesPage', [
            'meta' => [
                'title' => 'Technical Engineering Services - EcoReve',
                'description' => 'System integration, installation, plant commissioning, SOP operator training, and 24/7 telemetry maintenance.',
            ],
            'services' => $services,
            'serviceCategories' => $serviceCategories,
        ]);
    }

    public function show(string $slug): Response
    {
        return $this->index();
    }

    public function create(): Response
    {
        $serviceCategories = DB::table('service_categories')->orderBy('id', 'asc')->get();
        return Inertia::render('Admin/Services/ServiceFormPage', [
            'mode' => 'create',
            'service' => null,
            'serviceCategories' => $serviceCategories,
        ]);
    }

    public function edit(int $id): Response
    {
        $service = DB::table('services')->where('id', $id)->first();
        if (!$service) {
            abort(404, 'Service not found');
        }

        $serviceCategories = DB::table('service_categories')->orderBy('id', 'asc')->get();

        return Inertia::render('Admin/Services/ServiceFormPage', [
            'mode' => 'edit',
            'service' => $service,
            'serviceCategories' => $serviceCategories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required',
            'service_category_id' => 'nullable|integer',
            'category' => 'nullable',
            'short_desc' => 'nullable',
            'full_desc' => 'nullable',
            'metric_label' => 'nullable',
            'metric_value' => 'nullable|string|max:255',
            'metric_desc' => 'nullable',
            'turnaround_time' => 'nullable',
            'features' => 'nullable',
            'deliverables' => 'nullable',
            'icon_name' => 'nullable|string|max:255',
            'image_url' => 'nullable|string|max:255',
        ]);

        $enTitle = is_array($validated['title']) ? ($validated['title']['en'] ?? 'service') : $validated['title'];
        $slug = Str::slug((string)$enTitle) . '-' . rand(100, 999);

        // Resolve service_category_id
        $catId = $validated['service_category_id'] ?? null;

        // Process features into JSON string
        $featuresArr = [];
        if (is_array($validated['features'] ?? null)) {
            $featuresArr = $validated['features'];
        } elseif (is_string($validated['features'] ?? null)) {
            $featuresArr = array_filter(array_map('trim', explode("\n", $validated['features'])));
        }

        // Process deliverables into JSON string
        $deliverablesArr = [];
        if (is_array($validated['deliverables'] ?? null)) {
            $deliverablesArr = $validated['deliverables'];
        } elseif (is_string($validated['deliverables'] ?? null)) {
            $deliverablesArr = array_filter(array_map('trim', explode("\n", $validated['deliverables'])));
        }

        DB::table('services')->insert([
            'service_category_id' => $catId,
            'title' => json_encode(\App\Traits\HasTranslatableFields::fillMissingTranslations($validated['title'])),
            'slug' => $slug,
            'short_desc' => json_encode(\App\Traits\HasTranslatableFields::fillMissingTranslations($validated['short_desc'] ?? 'Professional water treatment solution')),
            'full_desc' => json_encode(\App\Traits\HasTranslatableFields::fillMissingTranslations($validated['full_desc'] ?? ($validated['short_desc'] ?? 'Professional water treatment solution'))),
            'metric_label' => json_encode(\App\Traits\HasTranslatableFields::fillMissingTranslations($validated['metric_label'] ?? 'ECOREVE')),
            'metric_value' => $validated['metric_value'] ?? '100%',
            'metric_desc' => json_encode(\App\Traits\HasTranslatableFields::fillMissingTranslations($validated['metric_desc'] ?? ($validated['short_desc'] ?? ''))),
            'turnaround_time' => json_encode(\App\Traits\HasTranslatableFields::fillMissingTranslations($validated['turnaround_time'] ?? '3 - 5 Business Days')),
            'features' => json_encode(count($featuresArr) > 0 ? array_values($featuresArr) : ['ISO 9001 Certified Engineering']),
            'deliverables' => json_encode(count($deliverablesArr) > 0 ? array_values($deliverablesArr) : ['Standard Inspection Certificate']),
            'icon_name' => $validated['icon_name'] ?? 'Wrench',
            'image_url' => $validated['image_url'] ?? '@/assets/hero-banner.webp',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Service created successfully.');
    }

    public function update(Request $request, int $id)
    {
        $validated = $request->validate([
            'title' => 'required',
            'service_category_id' => 'nullable|integer',
            'category' => 'nullable',
            'short_desc' => 'nullable',
            'full_desc' => 'nullable',
            'metric_label' => 'nullable',
            'metric_value' => 'nullable|string|max:255',
            'metric_desc' => 'nullable',
            'turnaround_time' => 'nullable',
            'features' => 'nullable',
            'deliverables' => 'nullable',
            'icon_name' => 'nullable|string|max:255',
            'image_url' => 'nullable|string|max:255',
        ]);

        $catId = $validated['service_category_id'] ?? null;

        $featuresArr = [];
        if (is_array($validated['features'] ?? null)) {
            $featuresArr = $validated['features'];
        } elseif (is_string($validated['features'] ?? null)) {
            $featuresArr = array_filter(array_map('trim', explode("\n", $validated['features'])));
        }

        $deliverablesArr = [];
        if (is_array($validated['deliverables'] ?? null)) {
            $deliverablesArr = $validated['deliverables'];
        } elseif (is_string($validated['deliverables'] ?? null)) {
            $deliverablesArr = array_filter(array_map('trim', explode("\n", $validated['deliverables'])));
        }

        $updatePayload = [
            'title' => json_encode(\App\Traits\HasTranslatableFields::fillMissingTranslations($validated['title'])),
            'short_desc' => json_encode(\App\Traits\HasTranslatableFields::fillMissingTranslations($validated['short_desc'] ?? 'Professional water treatment solution')),
            'full_desc' => json_encode(\App\Traits\HasTranslatableFields::fillMissingTranslations($validated['full_desc'] ?? ($validated['short_desc'] ?? 'Professional water treatment solution'))),
            'metric_label' => json_encode(\App\Traits\HasTranslatableFields::fillMissingTranslations($validated['metric_label'] ?? 'ECOREVE')),
            'metric_value' => $validated['metric_value'] ?? '100%',
            'metric_desc' => json_encode(\App\Traits\HasTranslatableFields::fillMissingTranslations($validated['metric_desc'] ?? ($validated['short_desc'] ?? ''))),
            'turnaround_time' => json_encode(\App\Traits\HasTranslatableFields::fillMissingTranslations($validated['turnaround_time'] ?? '3 - 5 Business Days')),
            'icon_name' => $validated['icon_name'] ?? 'Wrench',
            'updated_at' => now(),
        ];

        if ($catId) {
            $updatePayload['service_category_id'] = $catId;
        }

        if (count($featuresArr) > 0) {
            $updatePayload['features'] = json_encode(array_values($featuresArr));
        }

        if (count($deliverablesArr) > 0) {
            $updatePayload['deliverables'] = json_encode(array_values($deliverablesArr));
        }

        DB::table('services')->where('id', $id)->update($updatePayload);

        return redirect()->back()->with('success', 'Service updated successfully.');
    }

    public function destroy(int $id)
    {
        DB::table('services')->where('id', $id)->delete();

        return redirect()->back()->with('success', 'Service deleted successfully.');
    }
}
