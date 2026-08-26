<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('About/Index', [
            'meta' => [
                'title' => 'About EcoReve - Qingdao Topolar Water Technology Co., Ltd.',
                'description' => 'Global industrial water treatment infrastructure, zero liquid discharge research, and regional innovation hubs.',
            ],
        ]);
    }
}
