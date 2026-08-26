<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Standalone News Categories Table (Mendukung CRUD Kategori Berita di Admin Panel)
        Schema::create('news_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Contoh: "Partnership", "Research", "Funding", "Technology", "Innovation"
            $table->string('slug')->unique();
            $table->timestamps();
        });

        // 2. Main News Articles Table
        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->foreignId('news_category_id')->nullable()->constrained('news_categories')->onDelete('set null');
            $table->string('title'); // Judul Berita
            $table->string('slug')->unique(); // SEO-friendly slug
            $table->string('read_time')->nullable(); // Contoh: "5 MIN READ"
            $table->text('summary')->nullable(); // Ringkasan Paragraf pada Card News Grid
            $table->longText('content')->nullable(); // Isi Berita Lengkap untuk Halaman NewsDetailView
            $table->json('table_of_contents')->nullable(); // Array JSON Daftar Isi Sidebar Desktop

            // Info Penulis (Author Metadata)
            $table->string('author_name')->nullable();
            $table->string('author_role')->nullable();
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
