const approvePublicReferenceEmail = (userName, referenceName) => `
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
    .footer {
      font-size: 12px;
      color: #777;
      text-align: center;
      margin-top: 20px;
    }
    a {
      color: #007bff;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Reference Data Sharing Confirmation</h2>
    </div>
    <p>Hi <strong>${userName}</strong>,</p>
    <p>
      After carefully reviewing the contents of the reference dataset <strong>${referenceName}</strong> that you requested, we have agreed to allow you to share this reference dataset with the community.
    </p>
    <p>Thank you,</p>
    <p>The ViGenWatch Website</p>
    <div class="footer">
      <p>© 2024 ViGenWatch. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

const closeReferenceEmail = (userName, referenceName) => `
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
.footer {
    font-size: 12px;
    color: #777;
    text-align: center;
    margin-top: 20px;
}
a {
    color: #007bff;
    text-decoration: none;
}
a:hover {
    text-decoration: underline;
}
</style>
</head>
<body>
<div class="container">
    <div class="header">
    <h2>Reference Data Sharing Confirmation</h2>
    </div>
    <p>Hi <strong>${userName}</strong>,</p>
    <p>After carefully reviewing the content of the reference dataset <strong>${referenceName}</strong> that you requested, we regret to inform you that we do not have sufficient grounds to share your dataset with the community.</p>
    <p>We kindly request that you review the content again. We remain ready to receive and process your request and are open to further discussion.</p>
     <p>Thank you,</p>
    <p>The ViGenWatch Website</p>
    <div class="footer">
      <p>© 2024 ViGenWatch. All rights reserved.</p>
    </div>
</div>
</body>
</html>
`;

module.exports = { approvePublicReferenceEmail, closeReferenceEmail };
