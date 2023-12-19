const formData = require('form-data');
const Mailgun = require('mailgun.js');

const sendEmail = async (toEmail, userActivationCode) => {
  const mailgun = new Mailgun(formData);
  console.log(userActivationCode);

  const mg = mailgun.client({
    username: 'Teamplayz',
    key:
      process.env.MAILGUN_API_KEY ||
      '7cc41dffca27cfe05c433a39ae7ac3ac-5d2b1caa-2ee1dfb1',
  });

  try {
    const msg = await mg.messages.create(
      'sandbox2263b9fe1fcc48d08ae55890aefe2921.mailgun.org',
      {
        from: 'Excited User <foo@bar.com>',
        to: 'teamplayz@protonmail.com',
        subject: 'Email Activation',
        html: `<p>Click to activate <a href="http://localhost:8000/api/users/activate/${userActivationCode}">Activate Link</a></p>`,
      }
    );

    console.log(msg); // logs response data
    return { success: true, message: 'Email sent successfully' };
  } catch (err) {
    console.error(err); // logs any error
    return { success: false, message: 'Email sending failed' };
  }
};

module.exports = sendEmail;
