<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('ContactPage', [
            'meta' => [
                'title' => 'Contact Sales & Technical Support - EcoReve',
                'description' => 'Request equipment datasheets, schedule engineering consultations, or ask for an innovation hub tour.',
            ],
        ]);
    }

    public function storeInquiry(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'nullable|string|max:255',
            'name' => 'nullable|string|max:255',
            'company_name' => 'nullable|string|max:255',
            'company' => 'nullable|string|max:255',
            'work_email' => 'nullable|email|max:255',
            'email' => 'nullable|email|max:255',
            'message' => 'required|string|max:2000',
        ]);

        \Illuminate\Support\Facades\DB::table('inquiries')->insert([
            'full_name' => $validated['full_name'] ?? $validated['name'] ?? 'Client',
            'work_email' => $validated['work_email'] ?? $validated['email'] ?? 'client@example.com',
            'company_name' => $validated['company_name'] ?? $validated['company'] ?? 'Industrial Client',
            'message' => $validated['message'],
            'status' => 'pending',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Your inquiry has been submitted successfully! Our engineering team will contact you within 24 hours.');
    }

    public function updateStatus(Request $request, int $id)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:pending,in_process,closed',
        ]);

        \Illuminate\Support\Facades\DB::table('inquiries')->where('id', $id)->update([
            'status' => $validated['status'],
            'updated_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Inquiry status updated successfully.');
    }

    public function destroy(int $id)
    {
        \Illuminate\Support\Facades\DB::table('inquiries')->where('id', $id)->delete();

        return redirect()->back()->with('success', 'Inquiry deleted successfully.');
    }
}
