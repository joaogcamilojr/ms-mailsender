export const PASSWORD_RESET_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Request</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 20px; 
        }
        .header { 
            background-color: #f8f9fa; 
            padding: 20px; 
            text-align: center; 
            border-radius: 5px; 
        }
        .content { 
            padding: 20px 0; 
        }
        .button { 
            display: inline-block; 
            background-color: #007bff; 
            color: white; 
            padding: 12px 24px; 
            text-decoration: none; 
            border-radius: 5px; 
            margin: 20px 0; 
        }
        .footer { 
            font-size: 12px; 
            color: #666; 
            border-top: 1px solid #eee; 
            padding-top: 20px; 
            margin-top: 30px; 
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Password Reset Request</h1>
    </div>
    
    <div class="content">
        <p>Hi {{name}},</p>
        
        <p>We received a request to reset your password. If you made this request, click the button below to reset your password:</p>
        
        <p style="text-align: center;">
            <a href="{{reset_link}}" class="button">Reset Password</a>
        </p>
        
        <p>Or copy and paste this link into your browser:</p>
        <p style="word-break: break-all; background-color: #f8f9fa; padding: 10px; border-radius: 3px;">
            {{reset_link}}
        </p>
        
        <p>This link will expire in 24 hours for security reasons.</p>
        
        <p>If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>
        
        <p>Best regards,<br>The Support Team</p>
    </div>
    
    <div class="footer">
        <p>This is an automated message, please do not reply to this email.</p>
        <p>If you're having trouble with the button above, copy and paste the URL into your web browser.</p>
    </div>
</body>
</html>
`;
