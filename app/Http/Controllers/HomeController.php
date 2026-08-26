<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Home/Index', [
            'meta' => [
                'title' => 'EcoReve - High-Purity Water Treatment & Industrial Telemetry',
                'description' => 'Zero liquid discharge (ZLD) plants, DAF flotation systems, and automated SCADA telemetry.',
            ],
        ]);
    }
}
