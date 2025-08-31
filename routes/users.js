




import express from 'express';
import {Portfolio, Subscriber} from '../models/portfolio.js';
import connectDB from '../utils/db.js';

const router = express.Router();

connectDB();

router.get('/', async (req, res) => {
  const portfolio = await Portfolio.find();
  res.status(200).json(portfolio);
});

router.post('/', async (req, res) => {
  const { firstname, lastname, mobile, email, description } = req.body;
  const newPortfolio = new Portfolio({ firstname, lastname, mobile, email, description });
  await newPortfolio.save();
  res.status(201).json(newPortfolio);
});

router.get("/subscribe", async(req, res) => {
  const subcriber = await Subscriber.find();
  res.status(200).json(subcriber)
})

router.post('/subscribe', async(req, res) => {
  const { fullname, dob, email } = res.body;
  const newSubscriber = new Subscriber({ fullname, dob, email });
  await newSubscriber.save();
  res.status(201).json(newSubscriber)
})

export default router;
