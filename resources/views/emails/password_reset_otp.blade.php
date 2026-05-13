<!DOCTYPE html>
<html>
<head>
    <title>Password Reset OTP</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background-color: #fcf9f5; border: 1px solid #e2dcd0; border-radius: 8px; padding: 30px;">
        <h2 style="color: #4a3c31; margin-bottom: 20px; text-align: center;">Password Reset Request</h2>
        
        <p style="font-size: 16px; margin-bottom: 15px;">
            Hello,
        </p>
        <p style="font-size: 16px; margin-bottom: 15px;">
            We received a request to reset your password for <strong>The Rustic Table</strong>. Use the One-Time Password (OTP) below to proceed with resetting your password:
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #8b5a2b; background-color: #fff; padding: 15px 30px; border: 2px dashed #8b5a2b; border-radius: 8px; display: inline-block;">
                {{ $otp }}
            </span>
        </div>
        
        <p style="font-size: 16px; color: #666;">
            <em>Note: This OTP is valid for 15 minutes. If you did not request a password reset, please ignore this email.</em>
        </p>
        
        <p style="font-size: 16px; margin-top: 30px;">
            Warm regards,<br>
            <strong>The Rustic Table Team</strong>
        </p>
    </div>
</body>
</html>
