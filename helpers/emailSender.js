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

const sendEmail = async (email, otp) => {
  await transporter.sendMail({
    from: "amr1313mk@gmail.com",
    to: email,
    subject: "OTP",
    html: `<h1>OTP: ${otp}</h1>`,
  });
};


module.exports = sendEmail;
