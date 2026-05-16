const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    // Create Transporter
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587, // Recommended port
      secure: false, // true only for 465
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Send Mail
    const info = await transporter.sendMail({
      from: `"StudyNotion" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    });

    console.log("Mail Sent Successfully");
    console.log(info);

    return info;
  } catch (error) {
    console.log("Error while sending mail:");
    console.log(error);

    throw error;
  }
};

module.exports = mailSender;