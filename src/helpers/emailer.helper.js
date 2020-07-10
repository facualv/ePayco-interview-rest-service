const nodemailer = require('nodemailer');
const { EMAIL_PASSWORD, EMAIL_USER } = require('../config');

function sendEmailWithToken(clientEmail, token, sessionId) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD
    }
  });
  var mailOptions = {
    from: 'virtualwallet007@gmail.com',
    to: clientEmail,
    subject: 'Email para confirmar el pago',
    text: `SECURITY TOKEN: ${token} 
    SESSION_ID: ${sessionId}`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = sendEmailWithToken;
