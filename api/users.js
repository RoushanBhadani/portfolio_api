const mongoose = require('mongoose');
const User = require('../models/User');

let isConnected = false;

// Reuse the connection on hot reloads
async function connectToDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  isConnected = true;
}

// API handler
module.exports = async (req, res) => {
  await connectToDB();

  if (req.method === 'POST') {
    try {
      const { firstname, lastname, email, mobile, description } = req.body;

      // Check for existing email or mobile
      const existing = await User.findOne({
        $or: [{ email }, { mobile }]
      });

      if (existing) {
        return res.status(409).json({ message: "User with this email or mobile already exists." });
      }

      const newUser = new User({ firstname, lastname, email, mobile, description });
      await newUser.save();
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  else if (req.method === 'GET') {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
