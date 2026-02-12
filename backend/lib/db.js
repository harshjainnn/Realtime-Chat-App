import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URI);
    console.log(`Connection established: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};
