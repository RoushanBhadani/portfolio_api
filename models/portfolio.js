import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, unique: true },
  description: { type: String }
});

export default mongoose.models.Portfolio || mongoose.model('Portfolio', portfolioSchema);
