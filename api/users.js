import connectDB from '../utils/db.js';
import Cors from 'cors';
import initMiddleware from '../utils/init-middleware.js';
import { Portfolio } from '../models/portfolio.js';

const cors = initMiddleware(
  Cors({
    origin: 'https://roushan-porfolio.vercel.app', 
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
      return res.status(201).json(newPortfolio);
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}

