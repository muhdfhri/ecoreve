<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Combined Table for Footer Descriptions & Office Cards
        Schema::create('offices', function (Blueprint $table) {
            $table->id();
            $table->text('badge')->nullable(); // JSON 5-Language Badge
            $table->text('name')->nullable();  // JSON 5-Language / String Name
            $table->text('address')->nullable(); // JSON 5-Language Address
            $table->string('phone')->nullable(); // Nomor Telepon Kantor
            $table->string('email')->nullable(); // Email Resmi Kantor

            // 2 Paragraf Deskripsi Footer (Digabung langsung di sini!)
            $table->text('footer_desc_1')->nullable(); // Paragraf 1 (EcoReve focuses on...)
            $table->text('footer_desc_2')->nullable(); // Paragraf 2 (By gradually integrating...)

            $table->integer('sort_order')->default(0); // Urutan Tampil Card di Footer
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('offices');
    }
};
