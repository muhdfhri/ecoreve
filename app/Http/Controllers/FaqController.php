<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FaqController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'question' => 'required',
            'answer' => 'required',
            'sort_order' => 'nullable|integer',
        ]);

        $questionJson = json_encode(\App\Traits\HasTranslatableFields::fillMissingTranslations($validated['question']));
        $answerJson = json_encode(\App\Traits\HasTranslatableFields::fillMissingTranslations($validated['answer']));

        DB::table('faqs')->insert([
            'question' => $questionJson,
            'answer' => $answerJson,
            'sort_order' => $validated['sort_order'] ?? 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return redirect()->back()->with('success', 'FAQ created successfully.');
    }

    public function update(Request $request, int $id)
    {
        $validated = $request->validate([
            'question' => 'required',
            'answer' => 'required',
            'sort_order' => 'nullable|integer',
        ]);

        $questionJson = json_encode(\App\Traits\HasTranslatableFields::fillMissingTranslations($validated['question']));
        $answerJson = json_encode(\App\Traits\HasTranslatableFields::fillMissingTranslations($validated['answer']));

        DB::table('faqs')->where('id', $id)->update([
            'question' => $questionJson,
            'answer' => $answerJson,
            'sort_order' => $validated['sort_order'] ?? 1,
            'updated_at' => now(),
        ]);

        return redirect()->back()->with('success', 'FAQ updated successfully.');
    }

    public function destroy(int $id)
    {
        DB::table('faqs')->where('id', $id)->delete();

        return redirect()->back()->with('success', 'FAQ deleted successfully.');
    }
}
