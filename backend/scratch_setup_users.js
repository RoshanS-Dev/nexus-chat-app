import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

try {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("✅ Connected");

  const user1 = await User.findOne({ email: "roshaikh21@gmail.com" });
  const user2 = await User.findOne({ email: "vadanashaikh19@gmail.com" });

  if (!user1 || !user2) {
    console.error("Could not find user1 or user2");
    process.exit(1);
  }

  // Update passwords (hooks will hash them)
  user1.password = "Password123!";
  user2.password = "Password123!";

  // Make them friends
  if (!user1.friends.includes(user2._id)) {
    user1.friends.push(user2._id);
  }
  if (!user2.friends.includes(user1._id)) {
    user2.friends.push(user1._id);
  }

  // Ensure verified
  user1.isVerified = true;
  user2.isVerified = true;

  await user1.save();
  await user2.save();

  console.log("✅ Users set up successfully!");
  console.log(`User 1 Email: ${user1.email}, Password: Password123!`);
  console.log(`User 2 Email: ${user2.email}, Password: Password123!`);

  process.exit(0);
} catch (err) {
  console.error("Error:", err);
  process.exit(1);
}
