import connectDB from "../utils/db.js";
import Cors from "cors";
import initMiddleware from "../utils/init-middleware.js";
import { Subscriber } from "../models/portfolio.js";

const cors = initMiddleware(
  Cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

export default async function handler(req, res) {
  await cors(req, res);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    await connectDB();

    if (req.method === "GET") {
      const subscribers = await Subscriber.find();
      return res.status(200).json(subscribers);
    }

    if (req.method === "POST") {
      const { fullname, dob, email } = req.body;

      if (!fullname || !dob || !email) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const newSubscriber = new Subscriber({ fullname, dob, email });
      await newSubscriber.save();

      return res.status(201).json(newSubscriber);
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("Subscriber API Error:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}
