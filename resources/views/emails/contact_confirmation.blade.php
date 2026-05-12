<!DOCTYPE html>
<html>
<head>
    <title>We have received your message</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background-color: #fcf9f5; border: 1px solid #e2dcd0; border-radius: 8px; padding: 30px;">
        <h2 style="color: #4a3c31; margin-bottom: 20px;">Hello {{ $contactMessage->name }},</h2>
        
        <p style="font-size: 16px; margin-bottom: 15px;">
            Thank you for reaching out to <strong>The Rustic Table</strong>! We have successfully received your message and our team will get back to you as soon as possible.
        </p>
        
        <div style="background-color: #fff; padding: 20px; border-left: 4px solid #8b5a2b; margin: 25px 0;">
            <p style="margin: 0; color: #666; font-style: italic;">
                "{{ $contactMessage->message }}"
            </p>
        </div>
        
        <p style="font-size: 16px;">
            In the meantime, feel free to explore more of our vintage recipes and culinary traditions.
        </p>
        
        <p style="font-size: 16px; margin-top: 30px;">
            Warm regards,<br>
            <strong>The Rustic Table Team</strong>
        </p>
    </div>
</body>
</html>
