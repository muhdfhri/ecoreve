<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Service Categories Table (5-Language Multi-Lang JSON Schema)
        Schema::create('service_categories', function (Blueprint $table) {
            $table->id();
            $table->json('title'); // JSON 5 Bahasa: {"en": "...", "id": "...", "ms": "...", "th": "...", "zh": "..."}
            $table->string('slug')->unique();
            $table->string('icon_name')->nullable();
            $table->timestamps();
        });

        // 2. Services Table (5-Language Multi-Lang JSON Schema)
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->foreignId('service_category_id')->nullable()->constrained('service_categories')->onDelete('set null');
            $table->json('title'); // JSON 5 Bahasa: Judul Layanan
            $table->string('slug')->unique();
            $table->json('short_desc')->nullable(); // JSON 5 Bahasa: Paragraf deskripsi pada Card
            $table->json('full_desc')->nullable();  // JSON 5 Bahasa: Deskripsi lengkap pada Modal Detail
            $table->json('features')->nullable();   // Array list cakupan kerja teknis
            $table->json('deliverables')->nullable(); // Array list dokumen & sertifikat
            $table->json('turnaround_time')->nullable(); // JSON 5 Bahasa: Estimasi waktu pengerjaan

            // 3 Kolom Metric / Stat Impact Card
            $table->json('metric_label')->nullable(); // JSON 5 Bahasa
            $table->string('metric_value')->nullable(); // Contoh: "+2" / "99.5%"
            $table->json('metric_desc')->nullable();   // JSON 5 Bahasa

            // Single Scrollable Content Column (Untuk Shadcn UI Dialog Modal)
            $table->json('content')->nullable(); // JSON 5 Bahasa

            $table->string('image_url')->nullable(); // Cover image
            $table->string('icon_name')->nullable(); // Nama Icon Lucide
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('services');
        Schema::dropIfExists('service_categories');
    }
};
