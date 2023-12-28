import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD
  }
});

app.post('/send-email', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const time = req.body.time || 'Time not specified'

    const mailOptions = {

      from: {
        name: 'Portfolio',
        address: process.env.EMAIL
      },
      to: process.env.EMAIL,
      subject: `Application from ${name}`,
      html: `<p><strong>Email:</strong> ${email}</p>
             <p><strong>Phone:</strong> ${phone}</p>
             <p><strong>Time:</strong> ${time}</p>
             <p><strong>Message:</strong> ${message}</p>`
    };

    await transporter.sendMail(mailOptions);

    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`💻 Server is running on port ${PORT}`);
});


