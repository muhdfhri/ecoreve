<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    public function index(): Response
    {
        $faqs = DB::table('faqs')->orderBy('sort_order', 'asc')->get();

        return Inertia::render('AboutUsPage', [
            'meta' => [
                'title' => 'About EcoReve - Qingdao Topolar Water Technology Co., Ltd.',
                'description' => 'Global industrial water treatment infrastructure, zero liquid discharge research, and regional innovation hubs.',
            ],
            'faqs' => $faqs,
        ]);
    }
}
