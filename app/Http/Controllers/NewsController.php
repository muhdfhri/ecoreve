<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class NewsController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('News/Index', [
            'meta' => [
                'title' => 'Latest News & Research Updates - EcoReve',
                'description' => 'Industrial zero liquid discharge whitepapers, SCADA telemetry case studies, and compliance milestones.',
            ],
        ]);
    }

    public function show(string $slug): Response
    {
        return Inertia::render('News/Show', [
            'slug' => $slug,
        ]);
    }

    public function store(\Illuminate\Http\Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'nullable|string|max:255',
            'read_time' => 'nullable|string|max:255',
            'author_name' => 'nullable|string|max:255',
            'author_role' => 'nullable|string|max:255',
            'summary' => 'nullable|string',
            'content' => 'nullable|string',
        ]);

        $slug = \Illuminate\Support\Str::slug($validated['title']) . '-' . rand(100, 999);

        \Illuminate\Support\Facades\DB::table('news')->insert([
            'title' => $validated['title'],
            'slug' => $slug,
            'read_time' => $validated['read_time'] ?? '5 MIN READ',
            'summary' => $validated['summary'] ?? '',
            'content' => $validated['content'] ?? '',
            'author_name' => $validated['author_name'] ?? 'EcoReve Team',
            'author_role' => $validated['author_role'] ?? 'Technical Editor',
            'published_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Article created successfully.');
    }

    public function update(\Illuminate\Http\Request $request, int $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'nullable|string|max:255',
            'read_time' => 'nullable|string|max:255',
            'author_name' => 'nullable|string|max:255',
            'author_role' => 'nullable|string|max:255',
            'summary' => 'nullable|string',
            'content' => 'nullable|string',
        ]);

        \Illuminate\Support\Facades\DB::table('news')->where('id', $id)->update([
            'title' => $validated['title'],
            'read_time' => $validated['read_time'] ?? '5 MIN READ',
            'summary' => $validated['summary'] ?? '',
            'content' => $validated['content'] ?? '',
            'author_name' => $validated['author_name'] ?? 'EcoReve Team',
            'author_role' => $validated['author_role'] ?? 'Technical Editor',
            'updated_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Article updated successfully.');
    }

    public function destroy(int $id)
    {
        \Illuminate\Support\Facades\DB::table('news')->where('id', $id)->delete();

        return redirect()->back()->with('success', 'Article deleted successfully.');
    }
}
