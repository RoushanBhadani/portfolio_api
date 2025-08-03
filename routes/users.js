// import express from 'express';
// import User from '../models/User.js';
// import connectDB from '../utils/db.js';

// const router = express.Router();

// router.get('/', async (req, res) => {
//   await connectDB();
//   const users = await User.find();
//   res.status(200).json(users);
// });

// router.post('/', async (req, res) => {
//   await connectDB();
//   const { firstname, lastname, mobile, email, description } = req.body;
//   const newUser = new User({ firstname, lastname, mobile, email, description });
//   await newUser.save();
//   res.status(201).json(newUser);
// });

// export default router;





import express from 'express';
import User from '../models/User.js';
import connectDB from '../utils/db.js';

const router = express.Router();

// Connect once when module loads
connectDB();

router.get('/', async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

router.post('/', async (req, res) => {
  const { firstname, lastname, mobile, email, description } = req.body;
  const newUser = new User({ firstname, lastname, mobile, email, description });
  await newUser.save();
  res.status(201).json(newUser);
});

export default router;
