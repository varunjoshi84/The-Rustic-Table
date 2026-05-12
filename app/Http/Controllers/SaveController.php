<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\SavedRecipe;

class SaveController extends Controller
{
    public function save(Request $request, $recipe_id)
    {
        $save = SavedRecipe::firstOrCreate([
            'user_id' => $request->user()->id,
            'recipe_id' => $recipe_id,
        ]);

        return response()->json(['message' => 'Recipe saved', 'save' => $save], 201);
    }

    public function unsave(Request $request, $recipe_id)
    {
        SavedRecipe::where('user_id', $request->user()->id)
            ->where('recipe_id', $recipe_id)
            ->delete();

        return response()->json(['message' => 'Recipe removed from saved']);
    }
}
