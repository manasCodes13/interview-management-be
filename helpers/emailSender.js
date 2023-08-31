const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "amr1313mk@gmail.com",
    pass: "ywjkvdpxuumvyval",
  },
});

const sendEmail = async (email, html, subject) => {
  await transporter.sendMail({
    from: "amr1313mk@gmail.com",
    to: email,
    subject: subject,
    html: html,
  });
};


module.exports = sendEmail;
