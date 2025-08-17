import mongoose from "mongoose";

let isConnected = false;

const dbConnection = async () => {
  if (isConnected) {
    console.log("Database already connected");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "AUCTION_CRAZE",
    });
    isConnected = true;
    console.log("Database connection successful.".bgGreen.white);
  } catch (error) {
    console.log(
      `Some Error occurred while connecting to database: ${error}`.bgRed.white
    );
  }
};

export default dbConnection;
