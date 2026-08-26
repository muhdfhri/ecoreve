<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Table for Contact Page Inquiries (Matches 100% of Contact Form screenshot fields!)
        Schema::create('inquiries', function (Blueprint $table) {
            $table->id();
            $table->string('full_name'); // Input 1: Full Name
            $table->string('work_email'); // Input 2: Work Email
            $table->string('company_name'); // Input 3: Company Name
            $table->text('message'); // Input 4: Message / Operational Requirements
            $table->string('status')->default('pending'); // Status Tindak Lanjut: pending, contacted, closed
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('inquiries');
    }
};
