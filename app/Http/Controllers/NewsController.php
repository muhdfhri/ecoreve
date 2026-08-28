<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class NewsController extends Controller
{
    public function index(): Response
    {
        $articles = \Illuminate\Support\Facades\DB::table('news')
            ->leftJoin('news_categories', 'news.news_category_id', '=', 'news_categories.id')
            ->select(
                'news.id',
                'news.news_category_id',
                'news.title',
                'news.slug',
                'news_categories.name as category',
                'news.read_time as readTime',
                'news.read_time',
                'news.summary as description',
                'news.summary',
                'news.content',
                'news.table_of_contents as tableOfContents',
                'news.table_of_contents',
                'news.author_name as authorName',
                'news.author_name',
                'news.author_role as authorRole',
                'news.author_role',
                'news.author_avatar as authorAvatar',
                'news.author_avatar',
                'news.image_url as image',
                'news.image_url',
                'news.is_featured',
                'news.published_at',
                \Illuminate\Support\Facades\DB::raw("DATE_FORMAT(news.published_at, '%m.%d.%Y') as date")
            )
            ->orderBy('news.id', 'asc')
            ->get();

        $categories = \Illuminate\Support\Facades\DB::table('news_categories')
            ->pluck('name')
            ->toArray();

        return Inertia::render('NewsPage', [
            'dbArticles' => $articles,
            'dbCategories' => $categories,
            'meta' => [
                'title' => 'Latest News & Research Updates - EcoReve',
                'description' => 'Industrial zero liquid discharge whitepapers, SCADA telemetry case studies, and compliance milestones.',
            ],
        ]);
    }

    public function show(string $slug): Response
    {
        $exists = \Illuminate\Support\Facades\DB::table('news')
            ->where('slug', $slug)
            ->orWhere('id', $slug)
            ->exists();

        if (!$exists) {
            return Inertia::render('Error404');
        }

        $articles = \Illuminate\Support\Facades\DB::table('news')
            ->leftJoin('news_categories', 'news.news_category_id', '=', 'news_categories.id')
            ->select(
                'news.id',
                'news.news_category_id',
                'news.title',
                'news.slug',
                'news_categories.name as category',
                'news.read_time as readTime',
                'news.read_time',
                'news.summary as description',
                'news.summary',
                'news.content',
                'news.table_of_contents as tableOfContents',
                'news.table_of_contents',
                'news.author_name as authorName',
                'news.author_name',
                'news.author_role as authorRole',
                'news.author_role',
                'news.author_avatar as authorAvatar',
                'news.author_avatar',
                'news.image_url as image',
                'news.image_url',
                'news.is_featured',
                'news.published_at',
                \Illuminate\Support\Facades\DB::raw("DATE_FORMAT(news.published_at, '%m.%d.%Y') as date")
            )
            ->orderBy('news.id', 'asc')
            ->get();

        $categories = \Illuminate\Support\Facades\DB::table('news_categories')
            ->pluck('name')
            ->toArray();

        return Inertia::render('NewsPage', [
            'slug' => $slug,
            'dbArticles' => $articles,
            'dbCategories' => $categories,
        ]);
    }

    public function create(): Response
    {
        $newsCategories = \Illuminate\Support\Facades\DB::table('news_categories')->orderBy('id', 'asc')->get();
        return Inertia::render('Admin/News/NewsFormPage', [
            'mode' => 'create',
            'article' => null,
            'newsCategories' => $newsCategories,
        ]);
    }

    public function edit(int $id): Response
    {
        $article = \Illuminate\Support\Facades\DB::table('news')->where('id', $id)->first();
        if (!$article) {
            abort(404, 'Article not found');
        }

        $newsCategories = \Illuminate\Support\Facades\DB::table('news_categories')->orderBy('id', 'asc')->get();

        return Inertia::render('Admin/News/NewsFormPage', [
            'mode' => 'edit',
            'article' => $article,
            'newsCategories' => $newsCategories,
        ]);
    }

    /**
     * Auto-generate Table of Contents dari isi Content.
     * Setiap heading dianggap section (baris yang diawali angka + titik, misal "1. Judul"),
     * ID dibuat berurutan (sec-1, sec-2, ...) berdasarkan URUTAN KEMUNCULAN.
     */
    private function generateTableOfContents(?string $content): array
    {
        if (empty($content)) {
            return [];
        }

        $blocks = preg_split('/\n\s*\n/', trim($content));
        $toc = [];
        $counter = 0;

        foreach ($blocks as $block) {
            $lines = explode("\n", trim($block));
            $firstLine = trim($lines[0]);

            if (preg_match('/^([0-9]+)\.\s*(.+)/', $firstLine, $matches)) {
                $counter++;
                $toc[] = [
                    'id' => 'sec-' . $counter,
                    'title' => $firstLine,
                ];
            }
        }

        return $toc;
    }

    public function store(\Illuminate\Http\Request $request)
    {
        $validated = $request->validate([
            'title' => 'required',
            'category' => 'nullable',
            'read_time' => 'nullable',
            'author_name' => 'nullable|string|max:255',
            'author_role' => 'nullable',
            'author_avatar' => 'nullable|string|max:500',
            'image_url' => 'nullable|string|max:500',
            'summary' => 'nullable',
            'content' => 'nullable',
            'is_featured' => 'nullable|boolean',
        ]);

        $catId = null;
        if (!empty($validated['category'])) {
            $cat = \Illuminate\Support\Facades\DB::table('news_categories')
                ->where('name', $validated['category'])
                ->first();
            if ($cat) {
                $catId = $cat->id;
            }
        }

        $enTitle = is_array($validated['title']) ? ($validated['title']['en'] ?? 'article') : $validated['title'];
        $slug = \Illuminate\Support\Str::slug((string)$enTitle) . '-' . rand(100, 999);
        
        $enContent = is_array($validated['content']) ? ($validated['content']['en'] ?? '') : ($validated['content'] ?? '');
        $toc = json_encode($this->generateTableOfContents($enContent));

        \Illuminate\Support\Facades\DB::table('news')->insert([
            'news_category_id' => $catId,
            'title' => json_encode(\App\Traits\HasTranslatableFields::fillMissingTranslations($validated['title'])),
            'slug' => $slug,
            'read_time' => json_encode(\App\Traits\HasTranslatableFields::fillMissingTranslations($validated['read_time'] ?? '5 MIN READ')),
            'summary' => json_encode(\App\Traits\HasTranslatableFields::fillMissingTranslations($validated['summary'] ?? '')),
            'content' => json_encode(\App\Traits\HasTranslatableFields::fillMissingTranslations($validated['content'] ?? '')),
            'table_of_contents' => $toc,
            'author_name' => $validated['author_name'] ?? 'EcoReve Team',
            'author_role' => json_encode(\App\Traits\HasTranslatableFields::fillMissingTranslations($validated['author_role'] ?? 'Technical Editor')),
            'author_avatar' => $validated['author_avatar'] ?? null,
            'image_url' => $validated['image_url'] ?? '/assets/hero-banner.webp',
            'is_featured' => (bool) ($validated['is_featured'] ?? false),
            'published_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Article created successfully.');
    }

    public function update(\Illuminate\Http\Request $request, int $id)
    {
        $validated = $request->validate([
            'title' => 'required',
            'category' => 'nullable',
            'read_time' => 'nullable',
            'author_name' => 'nullable|string|max:255',
            'author_role' => 'nullable',
            'author_avatar' => 'nullable|string|max:500',
            'image_url' => 'nullable|string|max:500',
            'summary' => 'nullable',
            'content' => 'nullable',
            'is_featured' => 'nullable|boolean',
        ]);

        $catId = null;
        if (!empty($validated['category'])) {
            $cat = \Illuminate\Support\Facades\DB::table('news_categories')
                ->where('name', $validated['category'])
                ->first();
            if ($cat) {
                $catId = $cat->id;
            }
        }

        $enTitle = is_array($validated['title']) ? ($validated['title']['en'] ?? 'article') : $validated['title'];
        $newSlug = \Illuminate\Support\Str::slug((string)$enTitle);
        $existing = \Illuminate\Support\Facades\DB::table('news')->where('slug', $newSlug)->where('id', '!=', $id)->first();
        if ($existing) {
            $newSlug .= '-' . rand(100, 999);
        }

        $enContent = is_array($validated['content']) ? ($validated['content']['en'] ?? '') : ($validated['content'] ?? '');
        $toc = json_encode($this->generateTableOfContents($enContent));

        \Illuminate\Support\Facades\DB::table('news')->where('id', $id)->update([
            'news_category_id' => $catId,
            'title' => json_encode(\App\Traits\HasTranslatableFields::fillMissingTranslations($validated['title'])),
            'slug' => $newSlug,
            'read_time' => json_encode(\App\Traits\HasTranslatableFields::fillMissingTranslations($validated['read_time'] ?? '5 MIN READ')),
            'summary' => json_encode(\App\Traits\HasTranslatableFields::fillMissingTranslations($validated['summary'] ?? '')),
            'content' => json_encode(\App\Traits\HasTranslatableFields::fillMissingTranslations($validated['content'] ?? '')),
            'table_of_contents' => $toc,
            'author_name' => $validated['author_name'] ?? 'EcoReve Team',
            'author_role' => json_encode(\App\Traits\HasTranslatableFields::fillMissingTranslations($validated['author_role'] ?? 'Technical Editor')),
            'author_avatar' => $validated['author_avatar'] ?? null,
            'image_url' => $validated['image_url'] ?? '/assets/hero-banner.webp',
            'is_featured' => (bool) ($validated['is_featured'] ?? false),
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
