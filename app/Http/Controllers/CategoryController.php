<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    // --- 1. PRODUCT CATEGORIES (categories table) ---
    public function storeProductCategory(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $slug = Str::slug($validated['name']) . '-' . rand(100, 999);

        DB::table('categories')->insert([
            'name' => $validated['name'],
            'slug' => $slug,
            'description' => $validated['description'] ?? '',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Product category created successfully.');
    }

    public function updateProductCategory(Request $request, int $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        DB::table('categories')->where('id', $id)->update([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? '',
            'updated_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Product category updated successfully.');
    }

    public function destroyProductCategory(int $id)
    {
        DB::table('categories')->where('id', $id)->delete();

        return redirect()->back()->with('success', 'Product category deleted successfully.');
    }

    // --- 2. SERVICE CATEGORIES (service_categories table) ---
    public function storeServiceCategory(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'icon_name' => 'nullable|string|max:255',
        ]);

        $slug = Str::slug($validated['title']) . '-' . rand(100, 999);

        DB::table('service_categories')->insert([
            'title' => $validated['title'],
            'slug' => $slug,
            'icon_name' => $validated['icon_name'] ?? 'Wrench',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Service category created successfully.');
    }

    public function updateServiceCategory(Request $request, int $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'icon_name' => 'nullable|string|max:255',
        ]);

        DB::table('service_categories')->where('id', $id)->update([
            'title' => $validated['title'],
            'icon_name' => $validated['icon_name'] ?? 'Wrench',
            'updated_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Service category updated successfully.');
    }

    public function destroyServiceCategory(int $id)
    {
        DB::table('service_categories')->where('id', $id)->delete();

        return redirect()->back()->with('success', 'Service category deleted successfully.');
    }

    // --- 3. NEWS CATEGORIES (news_categories table) ---
    public function storeNewsCategory(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $slug = Str::slug($validated['name']) . '-' . rand(100, 999);

        DB::table('news_categories')->insert([
            'name' => $validated['name'],
            'slug' => $slug,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return redirect()->back()->with('success', 'News category created successfully.');
    }

    public function updateNewsCategory(Request $request, int $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        DB::table('news_categories')->where('id', $id)->update([
            'name' => $validated['name'],
            'updated_at' => now(),
        ]);

        return redirect()->back()->with('success', 'News category updated successfully.');
    }

    public function destroyNewsCategory(int $id)
    {
        DB::table('news_categories')->where('id', $id)->delete();

        return redirect()->back()->with('success', 'News category deleted successfully.');
    }
}
