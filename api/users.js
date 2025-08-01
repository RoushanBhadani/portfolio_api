import express from 'express';
import connectDB from '../utils/db.js';
import User from '../models/User.js';
import serverless from 'serverless-http';

const app = express();
app.use(express.json());

// GET users
app.get('/api/users', async (req, res) => {
  await connectDB();
  const users = await User.find();
  res.status(200).json(users);
});

// POST user
app.post('/api/users', async (req, res) => {
  await connectDB();
  const { firstname, lastname, mobile, email, description } = req.body;
  const newUser = new User({ firstname, lastname, mobile, email, description });
  await newUser.save();
  res.status(201).json(newUser);
});

export default serverless(app);
