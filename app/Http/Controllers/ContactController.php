<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ContactMessage;
use App\Mail\ContactAdminNotification;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function submit(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string'
        ]);

        $message = ContactMessage::create($validated);

        Mail::to('joshivarun266@gmail.com')->send(new ContactAdminNotification($message));

        return response()->json(['message' => 'Your message has been sent successfully!']);
    }
}
