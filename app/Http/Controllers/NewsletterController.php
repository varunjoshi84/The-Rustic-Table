<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\NewsletterSubscriber;
use App\Mail\NewsletterWelcome;
use Illuminate\Support\Facades\Mail;

class NewsletterController extends Controller
{
    public function subscribe(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        $subscriber = NewsletterSubscriber::firstOrCreate(
            ['email' => $request->email]
        );

        if ($subscriber->wasRecentlyCreated) {
            Mail::to($subscriber->email)->send(new NewsletterWelcome($subscriber->email));
            return response()->json(['message' => 'Successfully subscribed!']);
        }

        return response()->json(['message' => 'You are already subscribed.'], 400);
    }
}
