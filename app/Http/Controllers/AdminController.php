<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Recipe;
use App\Models\Comment;

class AdminController extends Controller
{
    public function users()
    {
        $users = User::withCount(['recipes', 'comments'])->get();
        return response()->json($users);
    }

    public function deleteUser($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }

    public function deleteRecipe($id)
    {
        $recipe = Recipe::findOrFail($id);
        $recipe->delete();
        return response()->json(['message' => 'Recipe deleted successfully']);
    }

    public function deleteComment($id)
    {
        $comment = Comment::findOrFail($id);
        $comment->delete();
        return response()->json(['message' => 'Comment deleted successfully']);
    }
}
