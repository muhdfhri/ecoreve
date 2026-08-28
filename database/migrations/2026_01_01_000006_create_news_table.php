<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Standalone News Categories Table (5-Language Multi-Lang JSON Schema)
        Schema::create('news_categories', function (Blueprint $table) {
            $table->id();
            $table->json('name'); // JSON 5 Bahasa: {"en": "...", "id": "...", "ms": "...", "th": "...", "zh": "..."}
            $table->string('slug')->unique();
            $table->timestamps();
        });

        // 2. Main News Articles Table (5-Language Multi-Lang JSON Schema)
        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->foreignId('news_category_id')->nullable()->constrained('news_categories')->onDelete('set null');
            $table->json('title'); // Judul Berita JSON 5 Bahasa
            $table->string('slug')->unique(); // SEO-friendly slug
            $table->json('read_time')->nullable(); // JSON 5 Bahasa (contoh: "5 MIN READ")
            $table->json('summary')->nullable(); // Ringkasan Paragraf JSON 5 Bahasa
            $table->json('content')->nullable(); // Isi Berita Lengkap JSON 5 Bahasa
            $table->json('table_of_contents')->nullable(); // Array JSON Daftar Isi

            // Info Penulis (Author Metadata)
            $table->string('author_name')->nullable();
            $table->json('author_role')->nullable(); // JSON 5 Bahasa
            $table->string('author_avatar')->nullable();

            // Cover Image & Status
            $table->string('image_url')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('news');
        Schema::dropIfExists('news_categories');
    }
};
