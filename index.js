import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectDB from './utils/db.js';
import userRoutes from './routes/users.js'; 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/users', userRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
