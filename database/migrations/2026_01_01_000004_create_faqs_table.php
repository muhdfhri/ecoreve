<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // FAQ Table (Question, Answer & Custom Sort Order - 5-Language JSON Schema)
        Schema::create('faqs', function (Blueprint $table) {
            $table->id();
            $table->json('question'); // Pertanyaan JSON 5 Bahasa: {"en": "...", "id": "...", "ms": "...", "th": "...", "zh": "..."}
            $table->json('answer');   // Jawaban JSON 5 Bahasa
            $table->integer('sort_order')->default(0); // Urutan Tampil
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('faqs');
    }
};
