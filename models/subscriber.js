import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  dob: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
});

export default mongoose.models.Subscriber ||
  mongoose.model("Subscriber", subscriberSchema);
