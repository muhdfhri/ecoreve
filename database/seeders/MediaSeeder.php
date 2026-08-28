<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class MediaSeeder extends Seeder
{
    public function run(): void
    {
        // Truncate media table first for a clean 1-to-1 sync
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('media')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // 1. Scan all physical files in public/assets/products/
        $productsPath = public_path('assets/products');
        if (file_exists($productsPath)) {
            $files = glob($productsPath . '/*.{webp,png,jpg,jpeg,svg}', GLOB_BRACE);
            foreach ($files as $filePath) {
                $filename = basename($filePath);
                $relativePath = '/assets/products/' . $filename;
                $originalName = Str::title(str_replace(['_', '-'], ' ', pathinfo($filename, PATHINFO_FILENAME)));
                $bytes = file_exists($filePath) ? filesize($filePath) : 250880;
                $formattedSize = round($bytes / 1024, 1) . ' KB';

                DB::table('media')->insert([
                    'filename' => $filename,
                    'original_name' => $originalName,
                    'file_path' => $relativePath,
                    'file_size' => $formattedSize,
                    'mime_type' => 'image/webp',
                    'dimensions' => '800x600',
                    'alt_text' => $originalName . ' Product Asset',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        // 2. Scan all physical files in public/assets/news/
        $newsPath = public_path('assets/news');
        if (file_exists($newsPath)) {
            $files = glob($newsPath . '/*.{webp,png,jpg,jpeg,svg}', GLOB_BRACE);
            foreach ($files as $filePath) {
                $filename = basename($filePath);
                $relativePath = '/assets/news/' . $filename;
                $originalName = Str::title(str_replace(['_', '-'], ' ', pathinfo($filename, PATHINFO_FILENAME)));
                $bytes = file_exists($filePath) ? filesize($filePath) : 250880;
                $formattedSize = round($bytes / 1024, 1) . ' KB';

                DB::table('media')->insert([
                    'filename' => $filename,
                    'original_name' => $originalName,
                    'file_path' => $relativePath,
                    'file_size' => $formattedSize,
                    'mime_type' => 'image/webp',
                    'dimensions' => '1200x800',
                    'alt_text' => $originalName . ' News Asset',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
