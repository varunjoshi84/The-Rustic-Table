<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Recipe;

class ContentSeeder extends Seeder
{
    public function run(): void
    {
        $indianNames = [
            ['name' => 'Aarav Sharma', 'email' => 'aarav@example.com'],
            ['name' => 'Priya Patel', 'email' => 'priya@example.com'],
            ['name' => 'Rohan Desai', 'email' => 'rohan@example.com'],
            ['name' => 'Ananya Singh', 'email' => 'ananya@example.com'],
            ['name' => 'Vikram Malhotra', 'email' => 'vikram@example.com'],
            ['name' => 'Kavya Iyer', 'email' => 'kavya@example.com'],
        ];

        $users = [];
        foreach ($indianNames as $userData) {
            $users[] = User::firstOrCreate(
                ['email' => $userData['email']],
                ['name' => $userData['name'], 'password' => bcrypt('password'), 'role' => 'user']
            );
        }

        $recipes = [
            // Indian Classic
            [
                'title' => 'Rustic Butter Chicken',
                'description' => 'A rich, creamy, and mildly spicy classic Indian dish made with tender chicken pieces cooked in a buttery tomato gravy.',
                'ingredients' => ['500g Chicken', '2 cups Tomato Purée', '1/2 cup Heavy Cream', '2 tbsp Butter', 'Garam Masala', 'Ginger Garlic Paste'],
                'cooking_steps' => ['Marinate chicken with spices and yogurt', 'Grill or pan-fry chicken until cooked', 'Simmer tomatoes, butter, and spices for 20 mins', 'Add cream and chicken, cook for 5 mins'],
                'cuisine_type' => 'Indian',
                'difficulty' => 'Medium',
                'cooking_time' => 60,
                'user_id' => $users[0]->id
            ],
            [
                'title' => 'Traditional Palak Paneer',
                'description' => 'Soft paneer cubes simmered in a smooth, vibrant green spinach puree spiced with cumin and garlic.',
                'ingredients' => ['250g Paneer', '500g Fresh Spinach', '1 Onion', '2 Tomatoes', 'Garlic', 'Cumin Seeds'],
                'cooking_steps' => ['Blanch spinach and blend into a puree', 'Sauté onions, tomatoes, and garlic', 'Mix in the spinach puree and simmer', 'Add paneer cubes and serve hot'],
                'cuisine_type' => 'Indian',
                'difficulty' => 'Medium',
                'cooking_time' => 40,
                'user_id' => $users[1]->id
            ],
            [
                'title' => 'Homestyle Dal Makhani',
                'description' => 'A rustic, slow-cooked black lentil dish that is incredibly creamy and full of flavor.',
                'ingredients' => ['1 cup Black Urad Dal', '1/4 cup Kidney Beans', 'Butter', 'Cream', 'Tomato Paste'],
                'cooking_steps' => ['Soak lentils and beans overnight', 'Pressure cook until very soft', 'Simmer on low heat with butter and tomato paste for 2 hours', 'Finish with cream'],
                'cuisine_type' => 'Indian',
                'difficulty' => 'Hard',
                'cooking_time' => 150,
                'user_id' => $users[2]->id
            ],
            [
                'title' => 'Aloo Gobi Masala',
                'description' => 'A comforting and classic vegan Indian dish featuring potatoes and cauliflower cooked with aromatic spices.',
                'ingredients' => ['1 Cauliflower head', '3 Potatoes', 'Turmeric', 'Coriander powder', 'Ginger'],
                'cooking_steps' => ['Cut veggies into bite-sized pieces', 'Sauté ginger and spices', 'Add veggies, cover and cook until tender', 'Garnish with fresh cilantro'],
                'cuisine_type' => 'Indian',
                'difficulty' => 'Easy',
                'cooking_time' => 30,
                'user_id' => $users[3]->id
            ],
            [
                'title' => 'Classic Chicken Biryani',
                'description' => 'A fragrant, royal dish of basmati rice and chicken layered and slow-cooked with saffron and spices.',
                'ingredients' => ['2 cups Basmati Rice', '500g Chicken', 'Biryani Masala', 'Yogurt', 'Saffron', 'Fried Onions'],
                'cooking_steps' => ['Marinate chicken with yogurt and spices', 'Par-boil the rice', 'Layer chicken and rice in a heavy-bottomed pot', 'Cook on dum (low heat) for 40 mins'],
                'cuisine_type' => 'Indian',
                'difficulty' => 'Hard',
                'cooking_time' => 90,
                'user_id' => $users[4]->id
            ],
            // French Country
            [
                'title' => 'Rustic Ratatouille',
                'description' => 'A classic French Provençal stewed vegetable dish, beautifully layered and bursting with Mediterranean flavors.',
                'ingredients' => ['2 Zucchinis', '2 Eggplants', '4 Tomatoes', '1 Bell Pepper', 'Herbes de Provence', 'Olive Oil'],
                'cooking_steps' => ['Slice all vegetables thinly', 'Layer in a baking dish over a tomato sauce base', 'Drizzle with olive oil and herbs', 'Bake at 375F for 45 minutes'],
                'cuisine_type' => 'French',
                'difficulty' => 'Medium',
                'cooking_time' => 60,
                'user_id' => $users[5]->id
            ],
            [
                'title' => 'Coq au Vin',
                'description' => 'A rustic French dish of chicken braised with wine, lardons, mushrooms, and garlic.',
                'ingredients' => ['1 Whole Chicken', '1 bottle Red Wine', 'Bacon/Lardons', 'Mushrooms', 'Pearl Onions'],
                'cooking_steps' => ['Brown the chicken and bacon in a Dutch oven', 'Add vegetables and sauté', 'Pour in wine and bring to a simmer', 'Cover and braise in oven for 1.5 hours'],
                'cuisine_type' => 'French',
                'difficulty' => 'Hard',
                'cooking_time' => 120,
                'user_id' => $users[0]->id
            ],
            [
                'title' => 'Classic French Onion Soup',
                'description' => 'Deeply caramelized onions in a rich beef broth, topped with a rustic crusty bread and melted Gruyere cheese.',
                'ingredients' => ['4 Large Onions', 'Beef Broth', 'Butter', 'Baguette slices', 'Gruyere Cheese'],
                'cooking_steps' => ['Caramelize onions slowly in butter for 45 mins', 'Add broth and simmer', 'Ladle into bowls, top with bread and cheese', 'Broil until cheese is bubbly and brown'],
                'cuisine_type' => 'French',
                'difficulty' => 'Medium',
                'cooking_time' => 80,
                'user_id' => $users[1]->id
            ],
            [
                'title' => 'Quiche Lorraine',
                'description' => 'A traditional French tart with a buttery, flaky crust filled with savory egg custard, bacon, and cheese.',
                'ingredients' => ['Pie crust', '4 Eggs', 'Heavy cream', 'Bacon', 'Gruyere Cheese', 'Nutmeg'],
                'cooking_steps' => ['Blind bake the pie crust', 'Cook the bacon until crisp', 'Whisk eggs, cream, and nutmeg', 'Layer bacon and cheese in crust, pour over eggs, bake for 35 mins'],
                'cuisine_type' => 'French',
                'difficulty' => 'Medium',
                'cooking_time' => 50,
                'user_id' => $users[2]->id
            ],
            [
                'title' => 'Boeuf Bourguignon',
                'description' => 'The ultimate French comfort food: beef chunks braised in red wine with pearl onions and mushrooms.',
                'ingredients' => ['1kg Beef Chuck', 'Red Burgundy Wine', 'Carrots', 'Mushrooms', 'Bouquet Garni'],
                'cooking_steps' => ['Sear beef chunks', 'Sauté vegetables', 'Simmer everything in wine for 3 hours', 'Serve with crusty bread or potatoes'],
                'cuisine_type' => 'French',
                'difficulty' => 'Hard',
                'cooking_time' => 200,
                'user_id' => $users[3]->id
            ],
            // Vintage Desserts
            [
                'title' => 'Vintage Apple Galette',
                'description' => 'A rustic, free-form apple tart with a buttery, flaky crust that feels like it came straight from a farmhouse kitchen.',
                'ingredients' => ['Pie dough', '3 Apples', 'Cinnamon', 'Brown Sugar', 'Butter'],
                'cooking_steps' => ['Roll out dough', 'Slice apples thinly and arrange in the center', 'Fold dough edges over the apples', 'Bake at 400F for 35 minutes'],
                'cuisine_type' => 'Desserts',
                'difficulty' => 'Easy',
                'cooking_time' => 45,
                'user_id' => $users[4]->id
            ],
            [
                'title' => 'Classic Tiramisu',
                'description' => 'An elegant vintage Italian dessert made with espresso-soaked ladyfingers and creamy mascarpone.',
                'ingredients' => ['Ladyfingers', 'Espresso', 'Mascarpone Cheese', 'Eggs', 'Sugar', 'Cocoa Powder'],
                'cooking_steps' => ['Whip egg yolks and sugar, then fold in mascarpone', 'Dip ladyfingers briefly in espresso', 'Layer ladyfingers and cream mixture', 'Chill overnight and dust with cocoa'],
                'cuisine_type' => 'Desserts',
                'difficulty' => 'Medium',
                'cooking_time' => 30,
                'user_id' => $users[5]->id
            ],
            [
                'title' => 'Old-Fashioned Pound Cake',
                'description' => 'A dense, buttery, and incredibly moist cake that uses a pound of each major ingredient, just like Grandma used to make.',
                'ingredients' => ['Butter', 'Sugar', 'Eggs', 'Flour', 'Vanilla Extract'],
                'cooking_steps' => ['Cream butter and sugar until very fluffy', 'Add eggs one at a time', 'Fold in flour gently', 'Bake in a loaf pan at 325F for 1 hour'],
                'cuisine_type' => 'Desserts',
                'difficulty' => 'Easy',
                'cooking_time' => 75,
                'user_id' => $users[0]->id
            ],
            [
                'title' => 'Rustic Berry Cobbler',
                'description' => 'Warm, bubbling mixed berries topped with a golden, biscuit-like crust.',
                'ingredients' => ['Mixed Berries', 'Sugar', 'Flour', 'Butter', 'Baking Powder', 'Milk'],
                'cooking_steps' => ['Mix berries with sugar and place in baking dish', 'Create a biscuit batter', 'Drop spoonfuls of batter over the berries', 'Bake until golden brown'],
                'cuisine_type' => 'Desserts',
                'difficulty' => 'Easy',
                'cooking_time' => 45,
                'user_id' => $users[1]->id
            ],
            [
                'title' => 'Classic Crème Brûlée',
                'description' => 'A rich vanilla custard topped with a contrasting layer of hard caramelized sugar.',
                'ingredients' => ['Heavy Cream', 'Vanilla Bean', 'Egg Yolks', 'Sugar'],
                'cooking_steps' => ['Heat cream with vanilla', 'Whisk yolks and sugar, temper with hot cream', 'Bake in water bath until set', 'Chill, then torch sugar on top'],
                'cuisine_type' => 'Desserts',
                'difficulty' => 'Hard',
                'cooking_time' => 60,
                'user_id' => $users[2]->id
            ],
            // Italian Classic
            [
                'title' => 'Authentic Spaghetti Carbonara',
                'description' => 'A classic Roman pasta dish made with eggs, cheese, pancetta, and black pepper. No cream allowed!',
                'ingredients' => ['Spaghetti', 'Pancetta or Guanciale', 'Pecorino Romano', 'Eggs', 'Black Pepper'],
                'cooking_steps' => ['Boil pasta', 'Fry pancetta until crisp', 'Whisk eggs and cheese', 'Toss hot pasta with pancetta, remove from heat, quickly stir in egg mixture'],
                'cuisine_type' => 'Italian',
                'difficulty' => 'Medium',
                'cooking_time' => 25,
                'user_id' => $users[3]->id
            ],
            [
                'title' => 'Rustic Margherita Pizza',
                'description' => 'A simple, classic Neapolitan pizza with fresh tomatoes, mozzarella, and basil.',
                'ingredients' => ['Pizza Dough', 'San Marzano Tomatoes', 'Fresh Mozzarella', 'Fresh Basil', 'Olive Oil'],
                'cooking_steps' => ['Stretch dough', 'Spread crushed tomatoes', 'Add mozzarella slices', 'Bake in a blazing hot oven for 10 mins, top with basil'],
                'cuisine_type' => 'Italian',
                'difficulty' => 'Medium',
                'cooking_time' => 20,
                'user_id' => $users[4]->id
            ],
            [
                'title' => 'Classic Lasagna Bolognese',
                'description' => 'Layers of flat pasta, rich slow-cooked meat sauce, and creamy béchamel.',
                'ingredients' => ['Lasagna noodles', 'Ground Beef', 'Tomato Sauce', 'Milk', 'Butter', 'Flour', 'Parmesan'],
                'cooking_steps' => ['Cook bolognese sauce for 2 hours', 'Make béchamel sauce', 'Layer noodles, meat sauce, and béchamel', 'Bake for 45 minutes until bubbly'],
                'cuisine_type' => 'Italian',
                'difficulty' => 'Hard',
                'cooking_time' => 180,
                'user_id' => $users[5]->id
            ],
            [
                'title' => 'Penne Arrabbiata',
                'description' => 'A fiery Roman pasta dish featuring a spicy tomato and garlic sauce.',
                'ingredients' => ['Penne Pasta', 'Canned Tomatoes', 'Garlic', 'Red Chili Flakes', 'Olive Oil', 'Parsley'],
                'cooking_steps' => ['Sauté garlic and heavy chili flakes in oil', 'Add tomatoes and simmer for 15 mins', 'Toss with cooked pasta', 'Garnish with fresh parsley'],
                'cuisine_type' => 'Italian',
                'difficulty' => 'Easy',
                'cooking_time' => 20,
                'user_id' => $users[0]->id
            ],
            [
                'title' => 'Risotto alla Milanese',
                'description' => 'A luxurious, creamy Northern Italian rice dish colored beautifully yellow with saffron.',
                'ingredients' => ['Arborio Rice', 'Chicken Broth', 'Saffron threads', 'Butter', 'Parmesan', 'White Wine'],
                'cooking_steps' => ['Toast rice and deglaze with wine', 'Slowly add hot broth a ladle at a time', 'Stir in saffron', 'Finish off heat with generous butter and cheese'],
                'cuisine_type' => 'Italian',
                'difficulty' => 'Medium',
                'cooking_time' => 45,
                'user_id' => $users[1]->id
            ],
        ];

        foreach ($recipes as $recipeData) {
            // Use firstOrCreate so running seed multiple times won't duplicate recipes completely
            // based on the title, or we can just create if it doesn't exist
            $existing = Recipe::where('title', $recipeData['title'])->first();
            if (!$existing) {
                Recipe::create($recipeData);
            }
        }
    }
}
