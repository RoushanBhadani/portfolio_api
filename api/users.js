// import connectDB from '../utils/db.js';
// import User from '../models/User.js';

// export default async function handler(req, res) {
//   try {
//     await connectDB();

//     if (req.method === 'GET') {
//       const users = await User.find();
//       return res.status(200).json(users);
//     }

//     if (req.method === 'POST') {
//       const { firstname, lastname, mobile, email, description } = req.body;
//       const newUser = new User({ firstname, lastname, mobile, email, description });
//       await newUser.save();
//       return res.status(201).json(newUser);
//     }

//     return res.status(405).json({ message: 'Method not allowed' });
//   } catch (error) {
//     console.error('API Error:', error);
//     return res.status(500).json({ message: 'Internal Server Error', error: error.message });
//   }
// }



import connectDB from '../utils/db.js';
import User from '../models/User.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await connectDB();

    if (req.method === 'GET') {
      const users = await User.find();
      return res.status(200).json(users);
    }

    if (req.method === 'POST') {
      const { firstname, lastname, mobile, email, description } = req.body;
      const newUser = new User({ firstname, lastname, mobile, email, description });
      await newUser.save();
      return res.status(201).json(newUser);
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
