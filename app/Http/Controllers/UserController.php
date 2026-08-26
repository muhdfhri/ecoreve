<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'role' => 'required|string|max:255',
            'avatar_url' => 'nullable|string',
        ]);

        DB::table('users')->insert([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
            'avatar_url' => $validated['avatar_url'] ?? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Admin user created successfully.');
    }

    public function update(Request $request, int $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $id,
            'role' => 'required|string|max:255',
            'password' => 'nullable|string|min:6',
            'avatar_url' => 'nullable|string',
        ]);

        $updateData = [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'role' => $validated['role'],
            'updated_at' => now(),
        ];

        if (!empty($validated['password'])) {
            $updateData['password'] = Hash::make($validated['password']);
        }

        if (!empty($validated['avatar_url'])) {
            $updateData['avatar_url'] = $validated['avatar_url'];
        }

        DB::table('users')->where('id', $id)->update($updateData);

        return redirect()->back()->with('success', 'Admin user updated successfully.');
    }

    public function destroy(int $id)
    {
        // Don't allow deleting the superadmin admin@ecoreve.com if only 1 user remains
        $count = DB::table('users')->count();
        if ($count <= 1) {
            return redirect()->back()->withErrors(['error' => 'Cannot delete the last remaining admin user.']);
        }

        DB::table('users')->where('id', $id)->delete();

        return redirect()->back()->with('success', 'Admin user deleted successfully.');
    }
}
