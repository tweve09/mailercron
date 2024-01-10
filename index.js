const cron = require('node-cron');
const nodemailer = require('nodemailer');
const path = require('path');
const dotenv = require('dotenv').config();

// Configure your email service
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    ciphers: 'SSLv3',
  },
});

// Email options
const mailOptions = {
  from: {
    name: "Emmanuel",
    adress: 'emmanueltweve09@gmail.com' 
  },
  to: ['emmanueltweve09@gmail.com'], // list of receivers
  subject: 'Test email from cron job',
  text: 'Email body',
  attachments: [{
    filename: "avatar.jpg",
    path: path.join(__dirname,"avatar.jpg"),
    contentType: "image/jpeg"
  },{
    filename: "flow.pdf",
    path: path.join(__dirname,"flow.pdf"),
    contentType: "application/pdf"
  }

]
};

// Schedule the cron job to run every day at 7 pm
cron.schedule('0 7 * * *', () => {
  console.log('Cron job scheduled to send a good email every day at 7 am.');
  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
});


