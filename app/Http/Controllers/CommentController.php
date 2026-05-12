<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Comment;

class CommentController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'recipe_id' => 'required|exists:recipes,id',
            'content' => 'required|string|max:1000',
        ]);

        $comment = $request->user()->comments()->create($validated);

        return response()->json($comment->load('user'), 201);
    }

    public function destroy(Request $request, string $id)
    {
        $comment = Comment::findOrFail($id);

        if ($request->user()->id !== $comment->user_id && $request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $comment->delete();

        return response()->json(['message' => 'Comment deleted successfully']);
    }
}
