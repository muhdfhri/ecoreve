<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Services/Index', [
            'meta' => [
                'title' => 'Technical Engineering Services - EcoReve',
                'description' => 'System integration, installation, plant commissioning, SOP operator training, and 24/7 telemetry maintenance.',
            ],
        ]);
    }

    public function show(string $slug): Response
    {
        return Inertia::render('Services/Show', [
            'slug' => $slug,
        ]);
    }

    public function store(\Illuminate\Http\Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'nullable|string|max:255',
            'deliverables' => 'nullable|string',
            'status' => 'nullable|string',
        ]);

        $slug = \Illuminate\Support\Str::slug($validated['title']) . '-' . rand(100, 999);

        \Illuminate\Support\Facades\DB::table('services')->insert([
            'title' => $validated['title'],
            'slug' => $slug,
            'short_desc' => $validated['deliverables'] ?? 'Professional water treatment solution',
            'metric_label' => $validated['category'] ?? 'Water Treatment',
            'metric_value' => $validated['status'] ?? 'Active',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Service created successfully.');
    }

    public function update(\Illuminate\Http\Request $request, int $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'nullable|string|max:255',
            'deliverables' => 'nullable|string',
            'status' => 'nullable|string',
        ]);

        \Illuminate\Support\Facades\DB::table('services')->where('id', $id)->update([
            'title' => $validated['title'],
            'short_desc' => $validated['deliverables'] ?? 'Professional water treatment solution',
            'metric_label' => $validated['category'] ?? 'Water Treatment',
            'metric_value' => $validated['status'] ?? 'Active',
            'updated_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Service updated successfully.');
    }

    public function destroy(int $id)
    {
        \Illuminate\Support\Facades\DB::table('services')->where('id', $id)->delete();

        return redirect()->back()->with('success', 'Service deleted successfully.');
    }
}
