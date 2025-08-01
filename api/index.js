import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectDB from '../utils/db.js';
import userRoutes from '../routes/users.js';
import serverless from 'serverless-http';

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

await connectDB();

export default serverless(app);
