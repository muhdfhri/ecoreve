<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OfficeController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'badge' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'phone' => 'nullable|string|max:255',
            'email' => 'nullable|string|max:255',
            'footer_desc_1' => 'nullable|string',
            'footer_desc_2' => 'nullable|string',
        ]);

        DB::table('offices')->insert([
            'badge' => $validated['badge'],
            'name' => $validated['name'],
            'address' => $validated['address'],
            'phone' => $validated['phone'] ?? '',
            'email' => $validated['email'] ?? '',
            'footer_desc_1' => $validated['footer_desc_1'] ?? '',
            'footer_desc_2' => $validated['footer_desc_2'] ?? '',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Office location created successfully.');
    }

    public function update(Request $request, int $id)
    {
        $validated = $request->validate([
            'badge' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'phone' => 'nullable|string|max:255',
            'email' => 'nullable|string|max:255',
            'footer_desc_1' => 'nullable|string',
            'footer_desc_2' => 'nullable|string',
        ]);

        DB::table('offices')->where('id', $id)->update([
            'badge' => $validated['badge'],
            'name' => $validated['name'],
            'address' => $validated['address'],
            'phone' => $validated['phone'] ?? '',
            'email' => $validated['email'] ?? '',
            'footer_desc_1' => $validated['footer_desc_1'] ?? '',
            'footer_desc_2' => $validated['footer_desc_2'] ?? '',
            'updated_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Office location updated successfully.');
    }

    public function destroy(int $id)
    {
        DB::table('offices')->where('id', $id)->delete();

        return redirect()->back()->with('success', 'Office location deleted successfully.');
    }
}
