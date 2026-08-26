<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Standalone Product Categories Table (Mendukung CRUD Kategori)
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->timestamps();
        });

        // 2. Main Products Table (General & Dynamic Schema)
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Nama Produk
            $table->string('slug')->unique();
            $table->text('short_desc')->nullable(); // Deskripsi Singkat
            $table->longText('full_desc')->nullable(); // Deskripsi Lengkap

            // Atribut General Rating & Verification Badge
            $table->string('rating')->nullable(); // Contoh: "4.9/5"
            $table->string('rating_count')->nullable(); // Contoh: "9649 plant audits"
            $table->string('badge_text')->nullable(); // Contoh: "ISO 9001 Verified®"

            // Atribut General Harga & Catatan
            $table->string('price_label')->nullable(); // Contoh: "SKID LEASE RATE"
            $table->string('price')->nullable(); // Contoh: "Starting at $950/month"
            $table->text('note')->nullable(); // Contoh: "A shipment typically lasts..."

            // Grid Pilihan Varian / Kapasitas (General JSON Array)
            $table->json('options')->nullable(); // JSON Varian: [{"title": "N or N+1", "sub": "Under 50 m³/h"}, ...]

            // Section Menu Lipat Accordion Dinamis (General JSON Array: Bisa tambah berapa saja accordion!)
            $table->json('accordions')->nullable(); // JSON: [{"title": "Size + pack details", "content": "..."}, ...]

            // Media & Files
            $table->string('spec_pdf_url')->nullable(); // Opsional PDF Datasheet
            $table->string('image_url')->nullable(); // Cover Image / Foto Utama
            $table->json('gallery_images')->nullable(); // List Foto Galeri Multi-Image (JSON Array)

            $table->boolean('is_featured')->default(false);
            $table->timestamps();
        });

        // 3. Multi-Category Pivot Table (Many-to-Many)
        Schema::create('category_product', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('category_product');
        Schema::dropIfExists('products');
        Schema::dropIfExists('categories');
    }
};
