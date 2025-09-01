




import express from 'express';
import connectDB from '../utils/db.js';
import Subscriber from '../models/subscriber.js';

const router = express.Router();

connectDB();

router.get('/subscribe', async (req, res) => {
  const subscriber = await Subscriber.find();
  res.status(200).json(subscriber);
});

router.post('/subscribe', async (req, res) => {
  const { fullname, dob, email } = req.body;
  const newSubscriber = new Subscriber({ fullname, dob, email });
  await newSubscriber.save();
  res.status(201).json(newSubscriber);
});

export default router;
