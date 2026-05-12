<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ContactMessage;
use App\Mail\ContactAdminNotification;
use App\Mail\ContactUserConfirmation;
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

        // Notify Admin
        Mail::to('joshivarun266@gmail.com')->send(new ContactAdminNotification($message));
        
        // Notify User
        Mail::to($validated['email'])->send(new ContactUserConfirmation($message));

        return response()->json(['message' => 'Your message has been sent successfully!']);
    }
}
