import mongoose from 'mongoose';

const connectDB = async (retryCount = 5, delayMs = 5000) => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('❌ CRITICAL DATABASE ERROR: MONGODB_URI is missing in environment variables.');
    process.exit(1);
  }

  for (let attempt = 1; attempt <= retryCount; attempt++) {
    try {
      console.log(`🔌 Attempting MongoDB connection (Attempt ${attempt}/${retryCount})...`);
      const conn = await mongoose.connect(uri);
      console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
      return conn;
    } catch (error) {
      console.error(`❌ MongoDB connection attempt ${attempt} failed. Error: ${error.message}`);
      
      if (attempt === retryCount) {
        console.error('❌ CRITICAL DATABASE ERROR: Max connection attempts reached. Server shutting down.');
        process.exit(1);
      }
      
      console.log(`⏱️ Waiting ${delayMs / 1000} seconds before retrying connection...`);
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
};

export default connectDB;
