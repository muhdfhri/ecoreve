<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        // 1. Featured Products from database
        $featuredProducts = DB::table('products')
            ->leftJoin('category_product', 'products.id', '=', 'category_product.product_id')
            ->leftJoin('categories', 'category_product.category_id', '=', 'categories.id')
            ->select(
                'products.*',
                'categories.name as category_title',
                'categories.slug as category_slug'
            )
            ->where('products.is_featured', true)
            ->orderBy('products.id', 'asc')
            ->get()
            ->map(function ($p) {
                if (isset($p->options) && is_string($p->options)) {
                    $p->options = json_decode($p->options, true) ?? [];
                }
                if (isset($p->accordions) && is_string($p->accordions)) {
                    $p->accordions = json_decode($p->accordions, true) ?? [];
                }
                return $p;
            });

        // Fallback: If no products marked featured yet, get first 6 products
        if ($featuredProducts->isEmpty()) {
            $featuredProducts = DB::table('products')
                ->leftJoin('category_product', 'products.id', '=', 'category_product.product_id')
                ->leftJoin('categories', 'category_product.category_id', '=', 'categories.id')
                ->select(
                    'products.*',
                    'categories.name as category_title',
                    'categories.slug as category_slug'
                )
                ->orderBy('products.id', 'asc')
                ->take(6)
                ->get();
        }

        // 2. 8 Latest News Articles from database
        $latestNews = DB::table('news')
            ->leftJoin('news_categories', 'news.news_category_id', '=', 'news_categories.id')
            ->select(
                'news.*',
                'news_categories.name as category',
                'news_categories.slug as category_slug'
            )
            ->orderBy('news.published_at', 'desc')
            ->orderBy('news.id', 'desc')
            ->take(8)
            ->get();

        return Inertia::render('Home/Index', [
            'meta' => [
                'title' => 'EcoReve - High-Purity Water Treatment & Industrial Telemetry',
                'description' => 'Zero liquid discharge (ZLD) plants, DAF flotation systems, and automated SCADA telemetry.',
            ],
            'featuredProducts' => $featuredProducts,
            'latestNews' => $latestNews,
        ]);
    }
}
