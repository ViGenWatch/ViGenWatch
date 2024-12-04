const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  debug: true,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

const sendEmail = (mailOptions) => {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent to ${mailOptions.to}: ` + info.response);
    }
  });
};

const mailOptionsTemplate = {
  from: {
    name: "ViGenWatch Support",
    address: process.env.MAIL_USER
  },
  to: [""],
  subject: "Email from ViGenWatch",
  html: "",
  attachments: []
};

module.exports = { sendEmail, mailOptionsTemplate };
