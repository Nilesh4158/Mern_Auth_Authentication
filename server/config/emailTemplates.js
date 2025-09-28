// emailTemplates.js

export const EMAIL_VERIFY_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
  <style>
    .container {
      font-family: Arial, sans-serif;
      max-width: 500px;
      margin: auto;
      padding: 20px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      background: #f9f9f9;
    }
    .otp {
      font-size: 22px;
      font-weight: bold;
      color: #2c3e50;
      padding: 10px 20px;
      background: #ecf0f1;
      border-radius: 6px;
      display: inline-block;
      margin: 15px 0;
    }
    .footer {
      margin-top: 20px;
      font-size: 12px;
      color: #7f8c8d;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Email Verification</h2>
    <p>Hello <b>{{email}}</b>,</p>
    <p>Use the OTP below to verify your email address:</p>
    <div class="otp">{{otp}}</div>
    <p>This OTP is valid for 24 hours.</p>
    <p class="footer">If you didn’t request this, you can ignore this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
  <style>
    .container {
      font-family: Arial, sans-serif;
      max-width: 500px;
      margin: auto;
      padding: 20px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      background: #f9f9f9;
    }
    .otp {
      font-size: 22px;
      font-weight: bold;
      color: #c0392b;
      padding: 10px 20px;
      background: #fdecea;
      border-radius: 6px;
      display: inline-block;
      margin: 15px 0;
    }
    .footer {
      margin-top: 20px;
      font-size: 12px;
      color: #7f8c8d;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Password Reset Request</h2>
    <p>Hello <b>{{email}}</b>,</p>
    <p>Use the OTP below to reset your password:</p>
    <div class="otp">{{otp}}</div>
    <p>This OTP is valid for 1 hour.</p>
    <p class="footer">If you didn’t request this, please secure your account.</p>
  </div>
</body>
</html>
`;

export const WELCOME_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
  <style>
    .container {
      font-family: Arial, sans-serif;
      max-width: 500px;
      margin: auto;
      padding: 20px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      background: #f9f9f9;
    }
    .title {
      font-size: 20px;
      font-weight: bold;
      color: #27ae60;
    }
    .footer {
      margin-top: 20px;
      font-size: 12px;
      color: #7f8c8d;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2 class="title">🎉 Welcome to Real World!</h2>
    <p>Hi <b>{{email}}</b>,</p>
    <p>We’re excited to have you on board. Your account has been created successfully.</p>
    <p>Explore and enjoy the journey 🚀</p>
    <p class="footer">If this wasn’t you, please contact support immediately.</p>
  </div>
</body>
</html>
`;
