import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null };
}

const dbConnect = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  try {
    const conn = await mongoose.connect(MONGODB_URI);
    console.log("Connected to the MongoDB database");
    cached.conn = conn;
  } catch (err) {
    console.log("Error connecting to the MongoDB database: ", err);
  }

  return cached.conn;
};

export default dbConnect;
