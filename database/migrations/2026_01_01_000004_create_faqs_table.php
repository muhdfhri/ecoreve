<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // FAQ Table (Question, Answer & Custom Sort Order)
        Schema::create('faqs', function (Blueprint $table) {
            $table->id();
            $table->text('question'); // Pertanyaan
            $table->text('answer');   // Jawaban
            $table->integer('sort_order')->default(0); // Urutan Tampil (Custom Position: 1, 2, 3...)
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('faqs');
    }
};
