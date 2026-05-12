<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Recipe;

class DashboardController extends Controller
{
    public function liked(Request $request)
    {
        $recipes = $request->user()->likes()->with('recipe.user')->latest()->get()->pluck('recipe');
        return response()->json($recipes);
    }

    public function saved(Request $request)
    {
        $recipes = $request->user()->savedRecipes()->with('recipe.user')->latest()->get()->pluck('recipe');
        return response()->json($recipes);
    }

    public function uploaded(Request $request)
    {
        $recipes = $request->user()->recipes()->latest()->get();
        return response()->json($recipes);
    }
}
