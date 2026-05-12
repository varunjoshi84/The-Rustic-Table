<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Recipe;
use Illuminate\Support\Facades\Storage;

class RecipeController extends Controller
{
    public function index(Request $request)
    {
        $query = Recipe::with('user')->withCount('likes', 'comments');

        if ($request->has('search')) {
            $query->where(function($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('cuisine_type', 'like', '%' . $request->search . '%')
                  ->orWhere('ingredients', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->has('cuisine_type')) {
            $query->where('cuisine_type', $request->cuisine_type);
        }

        if ($request->has('difficulty')) {
            $query->where('difficulty', $request->difficulty);
        }

        return response()->json($query->latest()->paginate(9));
    }

    public function show(string $id)
    {
        $recipe = Recipe::with(['user', 'comments.user'])->withCount('likes')->findOrFail($id);
        return response()->json($recipe);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'ingredients' => 'required|json',
            'cooking_steps' => 'required|json',
            'cuisine_type' => 'required|string|max:100',
            'difficulty' => 'required|string|in:Easy,Medium,Hard',
            'cooking_time' => 'required|integer|min:1',
            'thumbnail' => 'nullable|image|max:2048',
            'youtube_url' => 'nullable|url',
        ]);

        $thumbnailPath = null;
        if ($request->hasFile('thumbnail')) {
            $thumbnailPath = $request->file('thumbnail')->store('thumbnails', 'public');
        }

        $recipe = $request->user()->recipes()->create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'ingredients' => json_decode($validated['ingredients'], true),
            'cooking_steps' => json_decode($validated['cooking_steps'], true),
            'cuisine_type' => $validated['cuisine_type'],
            'difficulty' => $validated['difficulty'],
            'cooking_time' => $validated['cooking_time'],
            'thumbnail_path' => $thumbnailPath,
            'youtube_url' => $validated['youtube_url'] ?? null,
        ]);

        return response()->json($recipe, 201);
    }

    public function update(Request $request, string $id)
    {
        $recipe = Recipe::findOrFail($id);
        
        if ($request->user()->id !== $recipe->user_id && $request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'ingredients' => 'sometimes|required|json',
            'cooking_steps' => 'sometimes|required|json',
            'cuisine_type' => 'sometimes|required|string|max:100',
            'difficulty' => 'sometimes|required|string|in:Easy,Medium,Hard',
            'cooking_time' => 'sometimes|required|integer|min:1',
            'thumbnail' => 'nullable|image|max:2048',
            'youtube_url' => 'nullable|url',
        ]);

        if ($request->hasFile('thumbnail')) {
            if ($recipe->thumbnail_path) {
                Storage::disk('public')->delete($recipe->thumbnail_path);
            }
            $recipe->thumbnail_path = $request->file('thumbnail')->store('thumbnails', 'public');
        }

        if (isset($validated['ingredients'])) {
            $validated['ingredients'] = json_decode($validated['ingredients'], true);
        }
        if (isset($validated['cooking_steps'])) {
            $validated['cooking_steps'] = json_decode($validated['cooking_steps'], true);
        }

        $recipe->update($validated);

        return response()->json($recipe);
    }

    public function destroy(Request $request, string $id)
    {
        $recipe = Recipe::findOrFail($id);
        
        if ($request->user()->id !== $recipe->user_id && $request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if ($recipe->thumbnail_path) {
            Storage::disk('public')->delete($recipe->thumbnail_path);
        }

        $recipe->delete();

        return response()->json(['message' => 'Recipe deleted successfully']);
    }
}
