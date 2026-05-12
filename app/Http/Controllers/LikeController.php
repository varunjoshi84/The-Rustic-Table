<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Like;

class LikeController extends Controller
{
    public function like(Request $request, $recipe_id)
    {
        $like = Like::firstOrCreate([
            'user_id' => $request->user()->id,
            'recipe_id' => $recipe_id,
        ]);

        return response()->json(['message' => 'Recipe liked', 'like' => $like], 201);
    }

    public function unlike(Request $request, $recipe_id)
    {
        Like::where('user_id', $request->user()->id)
            ->where('recipe_id', $recipe_id)
            ->delete();

        return response()->json(['message' => 'Recipe unliked']);
    }
}
