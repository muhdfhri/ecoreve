<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Service Categories Table
        Schema::create('service_categories', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('icon_name')->nullable();
            $table->timestamps();
        });

        // 2. Services Table (Clean & Simplified for Shadcn UI Scrollable Dialog Modal)
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->foreignId('service_category_id')->nullable()->constrained('service_categories')->onDelete('set null');
            $table->string('title'); // Contoh: "On-Site Mechanical & Piping Installation"
            $table->string('slug')->unique();
            $table->text('short_desc')->nullable(); // Paragraf deskripsi pada Card

            // 3 Kolom Metric / Stat Impact Card
            $table->string('metric_label')->nullable(); // Contoh: "IMMERSY" / "ZLD EFFICIENCY"
            $table->string('metric_value')->nullable(); // Contoh: "+2" / "99.5%"
            $table->text('metric_desc')->nullable();   // Contoh: "Operations expanded..."

            // Single Scrollable Content Column (Untuk Shadcn UI Dialog Modal)
            $table->longText('content')->nullable(); // 1 Kolom deskripsi/konten lengkap untuk Shadcn Scrollable Dialog

            $table->string('image_url')->nullable(); // Cover image
            $table->string('icon_name')->nullable(); // Nama Icon Lucide (Wrench, Sliders, ShieldCheck)
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('services');
        Schema::dropIfExists('service_categories');
    }
};
