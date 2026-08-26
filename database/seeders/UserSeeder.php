<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('users')->insertOrIgnore([
            [
                'name' => 'EcoReve Admin',
                'email' => 'admin@ecoreve.com',
                'password' => Hash::make('password123'),
                'role' => 'superadmin',
                'avatar_url' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
