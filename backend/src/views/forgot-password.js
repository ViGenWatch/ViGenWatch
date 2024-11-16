const generateResetPasswordEmail = (userName, resetLink) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background-color: #f9f9f9;
    }
    .header {
      text-align: center;
      margin-bottom: 20px;
    }
    .button {
      display: inline-block;
      margin: 20px 0;
      padding: 10px 20px;
      color: #ffffff !important;
      background-color: rgb(33,150,243);
      text-decoration: none;
      border-radius: 5px;
      font-size: 16px;
    }
    .button:hover {
      background-color: #0056b3;
    }
    .footer {
      font-size: 12px;
      color: #777;
      text-align: center;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Reset Your Password</h2>
    </div>
    <p>Hi <strong>${userName}</strong>,</p>
    <p>
      You are receiving this because you (or someone else) requested the reset of your NextPhylo user account.
      Please click the button below to reset your password:
    </p>
    <p>
      <a href="${resetLink}" class="button">Reset Password</a>
    </p>
    <p>
      If you did not request a password reset, you can safely ignore this email.
    </p>
    <p>Thanks,</p>
    <p>The NextPhylo Website</p>
    <div class="footer">
      <p>© 2024 NextPhylo. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

module.exports = { generateResetPasswordEmail };
