import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_DB_URL}`)
    console.log("Success: Connected to MongoDB")
  } catch {
    console.log("Failure: Unconnected to MongoDB")
    throw new Error("接続に失敗しました")
  }
}

export default connectDB
