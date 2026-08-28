<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $offices = DB::table('offices')
            ->orderBy('sort_order', 'asc')
            ->orderBy('id', 'asc')
            ->get();

        // 1. Navbar Product Categories & Items
        $navProductCategories = DB::table('categories')
            ->orderBy('id', 'asc')
            ->get()
            ->map(function ($cat) {
                $catSlug = $cat->slug ?? Str::slug($cat->name ?? 'water-treatment');
                $items = DB::table('products')
                    ->join('category_product', 'products.id', '=', 'category_product.product_id')
                    ->where('category_product.category_id', $cat->id)
                    ->select('products.id', 'products.name', 'products.short_desc as desc', 'products.slug')
                    ->orderBy('products.id', 'asc')
                    ->get()
                    ->map(function ($p) use ($catSlug) {
                        return [
                            'name' => $p->name,
                            'desc' => $p->desc ?? 'High-efficiency industrial solution',
                            'link' => $p->slug ? '/products/' . $p->slug : '/products?category=' . $catSlug,
                            'slug' => $p->slug,
                        ];
                    });

                $catTitle = $cat->name ?? $cat->title ?? 'Product Category';
                return [
                    'id' => $catSlug,
                    'title' => $catTitle,
                    'items' => $items,
                ];
            });

        // 2. Navbar Service Categories & Items
        $navServiceCategories = DB::table('service_categories')
            ->orderBy('id', 'asc')
            ->get()
            ->map(function ($cat) {
                $catSlug = $cat->slug ?? Str::slug($cat->title ?? 'system-integration');
                $items = DB::table('services')
                    ->where('service_category_id', $cat->id)
                    ->select('services.id', 'services.title as name', 'services.short_desc as desc', 'services.slug')
                    ->orderBy('services.id', 'asc')
                    ->get()
                    ->map(function ($s) use ($catSlug) {
                        return [
                            'name' => $s->name,
                            'desc' => $s->desc ?? 'Industrial technical service & engineering',
                            'link' => $s->slug ? '/service/' . $s->slug : '/service?category=' . $catSlug,
                            'slug' => $s->slug,
                        ];
                    });

                $catTitle = $cat->title ?? $cat->name ?? 'Service Category';
                return [
                    'id' => $catSlug,
                    'title' => $catTitle,
                    'items' => $items,
                ];
            });

        return array_merge(parent::share($request), [
            'appName' => config('app.name', 'EcoReve'),
            'offices' => $offices,
            'navProductCategories' => $navProductCategories,
            'navServiceCategories' => $navServiceCategories,
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
        ]);
    }
}
