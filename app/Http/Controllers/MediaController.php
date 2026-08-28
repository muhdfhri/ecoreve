<?php

namespace App\Http\Controllers;

use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MediaController extends Controller
{
    /**
     * Get paginated media items with search & filter.
     */
    public function index(Request $request)
    {
        $query = Media::query();

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('original_name', 'like', "%{$search}%")
                  ->orWhere('alt_text', 'like', "%{$search}%");
            });
        }

        if ($request->filled('mime_type')) {
            $mime = $request->input('mime_type');
            if ($mime === 'image') {
                $query->where('mime_type', 'like', 'image/%');
            }
        }

        if ($request->filled('folder')) {
            $folder = $request->input('folder');
            if ($folder === 'products') {
                $query->where('file_path', 'like', '/assets/products/%');
            } elseif ($folder === 'news') {
                $query->where('file_path', 'like', '/assets/news/%');
            }
        }

        $media = $query->orderBy('created_at', 'desc')->paginate(36);

        return response()->json($media);
    }

    /**
     * Store newly uploaded file into public storage & DB.
     */
    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|image|mimes:jpeg,jpg,png,gif,webp,svg|max:10240', // Max 10MB
            'alt_text' => 'nullable|string|max:255',
        ]);

        $file = $request->file('file');
        $originalName = $file->getClientOriginalName();
        $extension = $file->getClientOriginalExtension();
        $filename = time() . '_' . Str::random(8) . '.' . $extension;

        // Save to public storage (storage/app/public/media)
        $path = $file->storeAs('media', $filename, 'public');
        $filePath = '/storage/' . $path;

        // Calculate file size in human-readable KB/MB
        $bytes = $file->getSize();
        $fileSize = $this->formatBytes($bytes);

        // Get Dimensions if image
        $dimensions = null;
        if (str_starts_with($file->getMimeType(), 'image/')) {
            $imageInfo = @getimagesize($file->getRealPath());
            if ($imageInfo) {
                $dimensions = $imageInfo[0] . '×' . $imageInfo[1] . ' piksel';
            }
        }

        $media = Media::create([
            'filename' => $filename,
            'original_name' => $originalName,
            'file_path' => $filePath,
            'file_size' => $fileSize,
            'mime_type' => $file->getMimeType(),
            'dimensions' => $dimensions,
            'alt_text' => $request->input('alt_text', ''),
        ]);

        return response()->json([
            'message' => 'File uploaded successfully',
            'data' => $media,
        ], 201);
    }

    /**
     * Update metadata (alt_text).
     */
    public function update(Request $request, $id)
    {
        $media = Media::findOrFail($id);

        $request->validate([
            'alt_text' => 'nullable|string|max:255',
        ]);

        $media->update([
            'alt_text' => $request->input('alt_text', ''),
        ]);

        return response()->json([
            'message' => 'Media metadata updated successfully',
            'data' => $media,
        ]);
    }

    /**
     * Delete media permanently.
     */
    public function destroy($id)
    {
        $media = Media::findOrFail($id);

        // Delete physical file from storage/app/public/media/...
        $relativeStoragePath = str_replace('/storage/', '', $media->file_path);
        if (Storage::disk('public')->exists($relativeStoragePath)) {
            Storage::disk('public')->delete($relativeStoragePath);
        }

        $media->delete();

        return response()->json([
            'message' => 'Media file permanently deleted',
        ]);
    }

    private function formatBytes($bytes, $precision = 2)
    {
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];
        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, count($units) - 1);
        $bytes /= pow(1024, $pow);
        return round($bytes, $precision) . ' ' . $units[$pow];
    }
}
