const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

async function sendMail(email, activationCode) {
  const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  await transporter.sendMail({
    from: '"Teamplayz" <f:teamplayzverify@gmail.com>',
    to: `${email}`,
    subject: 'Witaj w drużynie!',
    text: `Aby potwierdzić swoje konto, kliknij w link poniżej: http://localhost:8000/api/users/activate/${activationCode}`,
  });
}

module.exports = sendMail;
