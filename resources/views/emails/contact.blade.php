<!DOCTYPE html>
<html>
<head>
    <title>New Contact Submission</title>
</head>
<body style="font-family: Arial, sans-serif; color: #333;">
    <h2>New Message from The Rustic Table</h2>
    <p><strong>Name:</strong> {{ $contactMessage->name }}</p>
    <p><strong>Email:</strong> {{ $contactMessage->email }}</p>
    <hr>
    <p><strong>Message:</strong></p>
    <p>{!! nl2br(e($contactMessage->message)) !!}</p>
</body>
</html>
