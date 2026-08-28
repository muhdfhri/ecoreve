<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Standalone Product Categories Table (Mendukung CRUD Kategori 5 Bahasa)
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->json('name'); // JSON 5 Bahasa: {"en": "...", "id": "...", "ms": "...", "th": "...", "zh": "..."}
            $table->string('slug')->unique();
            $table->json('description')->nullable();
            $table->timestamps();
        });

        // 2. Main Products Table (5-Language Multi-Lang JSON Schema)
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->json('name'); // Nama Produk JSON 5 Bahasa
            $table->string('slug')->unique();
            $table->json('short_desc')->nullable(); // Deskripsi Singkat JSON 5 Bahasa
            $table->json('full_desc')->nullable();  // Deskripsi Lengkap JSON 5 Bahasa

            // Atribut General Rating & Verification Badge
            $table->string('rating')->nullable(); // Contoh: "4.9/5"
            $table->json('rating_count')->nullable(); // JSON 5 Bahasa (contoh: "9649 plant audits")
            $table->json('badge_text')->nullable(); // JSON 5 Bahasa (contoh: "ISO 9001 Verified®")

            // Atribut General Harga & Catatan
            $table->json('price_label')->nullable(); // JSON 5 Bahasa (contoh: "SKID LEASE RATE")
            $table->string('price')->nullable(); // Contoh: "Starting at $950/month"
            $table->json('note')->nullable(); // JSON 5 Bahasa

            // Grid Pilihan Varian / Kapasitas (General JSON Array)
            $table->json('options')->nullable(); // JSON Varian

            // Section Menu Lipat Accordion Dinamis
            $table->json('accordions')->nullable(); // JSON Accordions

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
