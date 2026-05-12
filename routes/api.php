<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\SaveController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\ContactController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Public routes for Contact & Newsletter
Route::post('/contact', [ContactController::class, 'submit']);
Route::post('/newsletter', [NewsletterController::class, 'subscribe']);

// Public routes for recipes
Route::get('/recipes', [RecipeController::class, 'index']);
Route::get('/recipes/{id}', [RecipeController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    Route::post('/logout', [AuthController::class, 'logout']);

    // Recipes (Create, Update, Delete)
    Route::post('/recipes', [RecipeController::class, 'store']);
    Route::put('/recipes/{id}', [RecipeController::class, 'update']);
    Route::post('/recipes/{id}/_method', [RecipeController::class, 'update']); // For form-data
    Route::delete('/recipes/{id}', [RecipeController::class, 'destroy']);

    // Comments
    Route::post('/comments', [CommentController::class, 'store']);
    Route::delete('/comments/{id}', [CommentController::class, 'destroy']);

    // Likes
    Route::post('/recipes/{id}/like', [LikeController::class, 'like']);
    Route::delete('/recipes/{id}/unlike', [LikeController::class, 'unlike']);

    // Saves
    Route::post('/recipes/{id}/save', [SaveController::class, 'save']);
    Route::delete('/recipes/{id}/unsave', [SaveController::class, 'unsave']);

    // Dashboard
    Route::get('/dashboard/liked', [DashboardController::class, 'liked']);
    Route::get('/dashboard/saved', [DashboardController::class, 'saved']);
    Route::get('/dashboard/uploaded', [DashboardController::class, 'uploaded']);

    // Admin APIs
    Route::middleware('can:admin')->group(function() {
        Route::get('/admin/users', [AdminController::class, 'users']);
        Route::delete('/admin/users/{id}', [AdminController::class, 'deleteUser']);
        Route::delete('/admin/recipes/{id}', [AdminController::class, 'deleteRecipe']);
        Route::delete('/admin/comments/{id}', [AdminController::class, 'deleteComment']);
    });
});
