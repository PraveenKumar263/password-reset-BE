const nodemailer = require('nodemailer');
const { EMAIL_ID, EMAIL_PWD } = require('./config');

// Create a transporter object
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_ID,
    pass: EMAIL_PWD,
  },
});

module.exports = transporter;
