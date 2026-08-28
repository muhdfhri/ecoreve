<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(): Response
    {
        $products = DB::table('products')
            ->leftJoin('category_product', 'products.id', '=', 'category_product.product_id')
            ->leftJoin('categories', 'category_product.category_id', '=', 'categories.id')
            ->select(
                'products.*',
                'categories.id as category_id',
                'categories.name as category_title',
                'categories.slug as category_slug'
            )
            ->orderBy('products.id', 'asc')
            ->get()
            ->map(function ($p) {
                if (isset($p->options) && is_string($p->options)) {
                    $p->options = json_decode($p->options, true) ?? [];
                }
                if (isset($p->accordions) && is_string($p->accordions)) {
                    $p->accordions = json_decode($p->accordions, true) ?? [];
                }
                if (isset($p->gallery_images) && is_string($p->gallery_images)) {
                    $p->gallery_images = json_decode($p->gallery_images, true) ?? [];
                }
                return $p;
            });

        $categories = DB::table('categories')
            ->orderBy('id', 'asc')
            ->get();

        return Inertia::render('ProductsPage', [
            'meta' => [
                'title' => 'Products & Equipment Catalog - EcoReve',
                'description' => 'Demineral plants, DAF flotation units, chemical dosing pumps, and online water turbidity analyzers.',
            ],
            'products' => $products,
            'categories' => $categories,
        ]);
    }

    public function show(string $slug): Response
    {
        $products = DB::table('products')
            ->leftJoin('category_product', 'products.id', '=', 'category_product.product_id')
            ->leftJoin('categories', 'category_product.category_id', '=', 'categories.id')
            ->select(
                'products.*',
                'categories.id as category_id',
                'categories.name as category_title',
                'categories.slug as category_slug'
            )
            ->orderBy('products.id', 'asc')
            ->get()
            ->map(function ($p) {
                if (isset($p->options) && is_string($p->options)) {
                    $p->options = json_decode($p->options, true) ?? [];
                }
                if (isset($p->accordions) && is_string($p->accordions)) {
                    $p->accordions = json_decode($p->accordions, true) ?? [];
                }
                if (isset($p->gallery_images) && is_string($p->gallery_images)) {
                    $p->gallery_images = json_decode($p->gallery_images, true) ?? [];
                }
                return $p;
            });

        $categories = DB::table('categories')
            ->orderBy('id', 'asc')
            ->get();

        $selectedProduct = $products->firstWhere('slug', $slug);

        return Inertia::render('ProductsPage', [
            'meta' => [
                'title' => $selectedProduct ? (json_decode($selectedProduct->name, true)['en'] ?? 'Product Details') . ' - EcoReve' : 'Products & Equipment Catalog - EcoReve',
                'description' => 'Demineral plants, DAF flotation units, chemical dosing pumps, and online water turbidity analyzers.',
            ],
            'products' => $products,
            'categories' => $categories,
            'slug' => $slug,
            'selectedProduct' => $selectedProduct,
        ]);
    }

    public function create(): Response
    {
        $categories = DB::table('categories')->orderBy('id', 'asc')->get();
        return Inertia::render('Admin/Products/ProductFormPage', [
            'mode' => 'create',
            'product' => null,
            'categories' => $categories,
        ]);
    }

    public function edit(int $id): Response
    {
        $product = DB::table('products')
            ->leftJoin('category_product', 'products.id', '=', 'category_product.product_id')
            ->select('products.*', 'category_product.category_id')
            ->where('products.id', $id)
            ->first();

        if (!$product) {
            abort(404, 'Product not found');
        }

        if (isset($product->options) && is_string($product->options)) {
            $product->options = json_decode($product->options, true) ?? [];
        }

        $categories = DB::table('categories')->orderBy('id', 'asc')->get();

        return Inertia::render('Admin/Products/ProductFormPage', [
            'mode' => 'edit',
            'product' => $product,
            'categories' => $categories,
        ]);
    }

    /**
     * Helper to clean options array/text into standardized JSON
     */
    private function processOptionsPayload($inputOptions)
    {
        $optionsArr = [];
        if (is_array($inputOptions)) {
            foreach ($inputOptions as $idx => $opt) {
                $title = $opt['title'] ?? $opt['name'] ?? '';
                $range = $opt['sub'] ?? $opt['range'] ?? '';
                if (!empty($title) || !empty($range)) {
                    $optionsArr[] = [
                        'id' => (string)($idx + 1),
                        'name' => $title,
                        'range' => $range,
                    ];
                }
            }
        } elseif (is_string($inputOptions)) {
            // Check if string is already JSON
            $decoded = json_decode($inputOptions, true);
            if (is_array($decoded)) {
                return json_encode($decoded);
            }
            // Parse line-by-line format "Title : Capacity"
            $lines = array_filter(array_map('trim', explode("\n", $inputOptions)));
            foreach ($lines as $idx => $line) {
                if (str_contains($line, ':')) {
                    list($title, $range) = explode(':', $line, 2);
                    $optionsArr[] = [
                        'id' => (string)($idx + 1),
                        'name' => trim($title),
                        'range' => trim($range),
                    ];
                } else {
                    $optionsArr[] = [
                        'id' => (string)($idx + 1),
                        'name' => trim($line),
                        'range' => 'Standard Capacity',
                    ];
                }
            }
        }

        if (count($optionsArr) === 0) {
            $optionsArr = [
                ['id' => '1', 'name' => 'Standard', 'range' => 'Default Option']
            ];
        }

        return json_encode(array_values($optionsArr));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'category_id' => 'nullable|integer',
            'short_desc' => 'nullable',
            'full_desc' => 'nullable',
            'rating' => 'nullable|string|max:255',
            'rating_count' => 'nullable',
            'badge_text' => 'nullable',
            'price_label' => 'nullable',
            'price' => 'nullable|string|max:255',
            'note' => 'nullable',
            'options' => 'nullable',
            'accordions' => 'nullable',
            'image_url' => 'nullable|string|max:255',
            'is_featured' => 'nullable|boolean',
        ]);

        $nameJson = json_encode(\App\Traits\HasTranslatableFields::fillMissingTranslations($validated['name']));
        $shortDescJson = json_encode(\App\Traits\HasTranslatableFields::fillMissingTranslations($validated['short_desc'] ?? 'High-efficiency industrial water system'));
        $fullDescJson = json_encode(\App\Traits\HasTranslatableFields::fillMissingTranslations($validated['full_desc'] ?? ($validated['short_desc'] ?? 'EcoReve industrial solution')));
        $badgeTextJson = json_encode(\App\Traits\HasTranslatableFields::fillMissingTranslations($validated['badge_text'] ?? 'ISO 9001 Verified®'));
        $priceLabelJson = json_encode(\App\Traits\HasTranslatableFields::fillMissingTranslations($validated['price_label'] ?? 'SKID LEASE RATE'));
        $noteJson = json_encode(\App\Traits\HasTranslatableFields::fillMissingTranslations($validated['note'] ?? 'A shipment typically lasts one month of heavy industrial operation'));

        $enName = is_array($validated['name']) ? ($validated['name']['en'] ?? 'product') : $validated['name'];
        $slug = Str::slug((string)$enName) . '-' . rand(100, 999);
        $optionsJson = $this->processOptionsPayload($validated['options'] ?? null);

        $prodId = DB::table('products')->insertGetId([
            'name' => $nameJson,
            'slug' => $slug,
            'short_desc' => $shortDescJson,
            'full_desc' => $fullDescJson,
            'rating' => $validated['rating'] ?? '4.9/5',
            'rating_count' => json_encode(\App\Traits\HasTranslatableFields::fillMissingTranslations($validated['rating_count'] ?? 'based on 9,649 plant audits')),
            'badge_text' => $badgeTextJson,
            'price_label' => $priceLabelJson,
            'price' => $validated['price'] ?? 'Starting at $950/month',
            'note' => $noteJson,
            'options' => $optionsJson,
            'image_url' => $validated['image_url'] ?? '@/assets/hero-banner.webp',
            'is_featured' => $validated['is_featured'] ?? false,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        if (!empty($validated['category_id'])) {
            DB::table('category_product')->insertOrIgnore([
                'product_id' => $prodId,
                'category_id' => $validated['category_id'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        return redirect()->back()->with('success', 'Product created successfully.');
    }

    public function update(Request $request, int $id)
    {
        $validated = $request->validate([
            'name' => 'required',
            'category_id' => 'nullable|integer',
            'short_desc' => 'nullable',
            'full_desc' => 'nullable',
            'rating' => 'nullable|string|max:255',
            'rating_count' => 'nullable',
            'badge_text' => 'nullable',
            'price_label' => 'nullable',
            'price' => 'nullable|string|max:255',
            'note' => 'nullable',
            'options' => 'nullable',
            'accordions' => 'nullable',
            'image_url' => 'nullable|string|max:255',
            'is_featured' => 'nullable|boolean',
        ]);

        $optionsJson = $this->processOptionsPayload($validated['options'] ?? null);

        $updatePayload = [
            'name' => json_encode(\App\Traits\HasTranslatableFields::fillMissingTranslations($validated['name'])),
            'short_desc' => json_encode(\App\Traits\HasTranslatableFields::fillMissingTranslations($validated['short_desc'] ?? 'High-efficiency industrial water system')),
            'full_desc' => json_encode(\App\Traits\HasTranslatableFields::fillMissingTranslations($validated['full_desc'] ?? ($validated['short_desc'] ?? 'EcoReve industrial solution'))),
            'badge_text' => json_encode(\App\Traits\HasTranslatableFields::fillMissingTranslations($validated['badge_text'] ?? 'ISO 9001 Verified®')),
            'price' => $validated['price'] ?? 'Starting at $950/month',
            'note' => json_encode(\App\Traits\HasTranslatableFields::fillMissingTranslations($validated['note'] ?? 'A shipment typically lasts one month of heavy industrial operation')),
            'options' => $optionsJson,
            'is_featured' => isset($validated['is_featured']) ? (bool)$validated['is_featured'] : false,
            'updated_at' => now(),
        ];

        DB::table('products')->where('id', $id)->update($updatePayload);

        if (!empty($validated['category_id'])) {
            DB::table('category_product')->where('product_id', $id)->delete();
            DB::table('category_product')->insertOrIgnore([
                'product_id' => $id,
                'category_id' => $validated['category_id'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        return redirect()->back()->with('success', 'Product updated successfully.');
    }

    public function destroy(int $id)
    {
        DB::table('category_product')->where('product_id', $id)->delete();
        DB::table('products')->where('id', $id)->delete();

        return redirect()->back()->with('success', 'Product deleted successfully.');
    }
}
