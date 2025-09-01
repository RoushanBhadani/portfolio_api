import connectDB from '../utils/db.js';
import Cors from 'cors';
import initMiddleware from '../utils/init-middleware.js';
import Portfolio from '../models/portfolio.js';
import emailjs from 'emailjs-com';

const cors = initMiddleware(
  Cors({
    origin: '*', 
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

export default async function handler(req, res) {
  await cors(req, res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await connectDB();

    if (req.method === 'GET') {
      const portfolio = await Portfolio.find();
      return res.status(200).json(portfolio);
    }

    if (req.method === 'POST') {
      const { firstname, lastname, mobile, email, description } = req.body;
      const newPortfolio = new Portfolio({ firstname, lastname, mobile, email, description });
      await newPortfolio.save();
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Portfolio Submission',
          text: `Name: ${firstname} ${lastname || ""}\nMessage: ${description}\nTime: ${new Date().toLocaleString()}`,
        });

        console.log('Email sent successfully');
      } catch (err) {
        console.error('Email Error:', err);
      }
      return res.status(201).json(newPortfolio);
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}

