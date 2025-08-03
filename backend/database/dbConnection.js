import mongoose from "mongoose";

const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "AUCTION_CRAZE",
    })
    .then(() => {
      console.log("Database connection successful.".bgGreen.white);
    })
    .catch((error) => {
      console.log(
        `Some Error occurred while connecting to database: ${error}`.bgRed.white
      );
    });
};

export default dbConnection;
