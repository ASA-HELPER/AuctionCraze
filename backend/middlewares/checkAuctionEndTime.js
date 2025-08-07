import mongoose from "mongoose";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";
import { Auction } from "../models/auctionSchema.js";

export const checkAuctionEndTime = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid ID format.", 400));
  }

  const auction = await Auction.findById(id);
  if (!auction) {
    return next(new ErrorHandler("Auction not found.", 404));
  }

  const currentTime = new Date();
  const auctionStartTime = new Date(auction.startTime);
  const auctionEndTime = new Date(auction.endTime);

  if (auctionStartTime > currentTime) {
    return next(new ErrorHandler("Auction has not started yet.", 400));
  }

  if (auctionEndTime < currentTime) {
    return next(new ErrorHandler("Auction has ended.", 400));
  }

  next();
});
