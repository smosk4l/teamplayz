const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

async function sendMail(email, activationCode, type) {
  const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  let subject, text;

  if (type === 'activation') {
    subject = 'Potwierdzenie konta';
    text = `Aby potwierdzić swoje konto, kliknij w link poniżej: http://localhost:8000/api/users/activate/${activationCode}`;
  } else if (type === 'passwordReset') {
    subject = 'Resetowanie hasła';
    text = `Aby zresetować hasło, kliknij w link poniżej: http://localhost:8000/api/users/reset-password/${activationCode}`;
  } else {
    throw new Error('Nieprawidłowy typ wiadomości');
  }

  await transporter.sendMail({
    from: '"Teamplayz" <f:teamplayzverify@gmail.com>',
    to: `${email}`,
    subject: subject,
    text: text,
  });
}

module.exports = sendMail;
