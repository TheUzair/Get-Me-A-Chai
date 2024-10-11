"use server"
import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("MongoDB already connected.");
    return;
  }
  try {
    const conn = await mongoose.connect(`mongodb://localhost:27017/patreon`);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error: ", error.message);
    process.exit(1);
  }
};


export default connectDB;
