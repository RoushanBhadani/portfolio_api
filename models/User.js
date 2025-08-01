import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, unique: true },
  description: { type: String }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
