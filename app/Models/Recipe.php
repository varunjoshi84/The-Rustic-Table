<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['user_id', 'title', 'description', 'ingredients', 'cooking_steps', 'cuisine_type', 'difficulty', 'cooking_time', 'thumbnail_path', 'youtube_url'])]
class Recipe extends Model
{
    protected function casts(): array
    {
        return [
            'ingredients' => 'array',
            'cooking_steps' => 'array',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function savedBy()
    {
        return $this->hasMany(SavedRecipe::class);
    }
}
