const connectDB = require('../utils/db');
const User = require('../models/User');

module.exports = async (req, res) => {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  else if (req.method === 'POST') {
    const { firstname, lastname, email, mobile, description } = req.body;

    try {
      const existingUser = await User.findOne({
        $or: [{ email }, { mobile }]
      });

      if (existingUser) {
        return res.status(409).json({
          error: `User already exists with this ${existingUser.email === email ? 'email' : 'mobile'}`
        });
      }

      const newUser = new User({ firstname, lastname, email, mobile, description });
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
