<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Products/Index', [
            'meta' => [
                'title' => 'Products & Equipment Catalog - EcoReve',
                'description' => 'Demineral plants, DAF flotation units, chemical dosing pumps, and online water turbidity analyzers.',
            ],
        ]);
    }

    public function show(string $slug): Response
    {
        return Inertia::render('Products/Show', [
            'slug' => $slug,
        ]);
    }

    public function store(\Illuminate\Http\Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'badge_text' => 'nullable|string|max:255',
            'price' => 'nullable|string|max:255',
            'note' => 'nullable|string',
            'options' => 'nullable',
        ]);

        $slug = \Illuminate\Support\Str::slug($validated['name']) . '-' . rand(100, 999);

        \Illuminate\Support\Facades\DB::table('products')->insert([
            'name' => $validated['name'],
            'slug' => $slug,
            'short_desc' => 'High-efficiency industrial solution',
            'badge_text' => $validated['badge_text'] ?? 'Verified',
            'price_label' => 'Starting Price',
            'price' => $validated['price'] ?? '$950.00',
            'note' => $validated['note'] ?? '',
            'options' => is_array($validated['options'] ?? null) ? json_encode($validated['options']) : json_encode([['title' => 'Standard', 'sub' => 'Default Option']]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Product created successfully.');
    }

    public function update(\Illuminate\Http\Request $request, int $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'badge_text' => 'nullable|string|max:255',
            'price' => 'nullable|string|max:255',
            'note' => 'nullable|string',
            'options' => 'nullable',
        ]);

        \Illuminate\Support\Facades\DB::table('products')->where('id', $id)->update([
            'name' => $validated['name'],
            'badge_text' => $validated['badge_text'] ?? 'Verified',
            'price' => $validated['price'] ?? '$950.00',
            'note' => $validated['note'] ?? '',
            'options' => is_array($validated['options'] ?? null) ? json_encode($validated['options']) : json_encode([['title' => 'Standard', 'sub' => 'Default Option']]),
            'updated_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Product updated successfully.');
    }

    public function destroy(int $id)
    {
        \Illuminate\Support\Facades\DB::table('products')->where('id', $id)->delete();

        return redirect()->back()->with('success', 'Product deleted successfully.');
    }
}
