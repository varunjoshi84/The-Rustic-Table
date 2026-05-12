<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NewsletterWelcome extends Mailable
{
    use Queueable, SerializesModels;

    public $email;

    public function __construct($email)
    {
        $this->email = $email;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Welcome to The Rustic Table Newsletter!',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.newsletter',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
