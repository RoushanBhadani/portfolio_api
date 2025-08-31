import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, unique: true },
  description: { type: String }
});

const subscriberSchema = new mongoose.Schema({
  fullname: { type: String, required },
  dob: { type: Date, required },
  email: { type: String, required: true, unique:true }
})

const Subscriber = mongoose.models.Subscriber || mongoose.model('Subscriber', subscriberSchema)
const Portfolio = mongoose.models.Portfolio || mongoose.model('Portfolio', portfolioSchema);

export {Subscriber, Portfolio}