<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $admin = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
        ]);

        $user = User::factory()->create([
            'name' => 'Chef Julia',
            'email' => 'julia@example.com',
            'password' => bcrypt('password'),
            'role' => 'user',
        ]);

        \App\Models\Recipe::create([
            'user_id' => $user->id,
            'title' => 'Rustic Italian Pasta',
            'description' => 'A classic handmade pasta with rich tomato basil sauce, slow cooked to perfection.',
            'ingredients' => ['2 cups flour', '3 eggs', '4 tomatoes', 'Fresh basil', 'Olive oil'],
            'cooking_steps' => ['Make the dough', 'Roll and cut pasta', 'Simmer tomatoes for 2 hours', 'Toss together'],
            'cuisine_type' => 'Italian',
            'difficulty' => 'Medium',
            'cooking_time' => 120,
            'youtube_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        ]);

        \App\Models\Recipe::create([
            'user_id' => $user->id,
            'title' => 'Vintage French Bread',
            'description' => 'Crusty on the outside, soft on the inside. A traditional sourdough recipe.',
            'ingredients' => ['Sourdough starter', 'Bread flour', 'Water', 'Salt'],
            'cooking_steps' => ['Mix ingredients', 'Knead and fold', 'Proof overnight', 'Bake in dutch oven'],
            'cuisine_type' => 'French',
            'difficulty' => 'Hard',
            'cooking_time' => 360,
        ]);
    }
}
