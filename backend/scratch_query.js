import mongoose from "mongoose";
import dotenv from "dotenv";
import Message from "./models/Message.js";

dotenv.config();

try {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("✅ Connected");

  const messages = await Message.find({}).sort({ createdAt: -1 }).limit(10);
  console.log("=== Last 10 Messages ===");
  messages.forEach((msg, idx) => {
    console.log(`\n--- Message ${idx + 1} ---`);
    console.log(`ID: ${msg._id}`);
    console.log(`Text: "${msg.text}"`);
    console.log(`MessageType: "${msg.messageType}"`);
    console.log(`Attachments:`, JSON.stringify(msg.attachments, null, 2));
  });

  process.exit(0);
} catch (err) {
  console.error("Error:", err);
  process.exit(1);
}
