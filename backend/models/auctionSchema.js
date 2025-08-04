import mongoose from "mongoose";

const auctionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    startingBid: {
      type: Number,
      required: true,
    },
    category: String,
    condition: {
      type: String,
      enum: ["New", "Used"],
    },
    currentBid: { type: Number, default: 0 },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    image: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bids: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Bid",
        },
        userName: String,
        profileImage: String,
        amount: Number,
      },
    ],
    highestBidder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    commissionCalculated: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Auction = mongoose.model("Auction", auctionSchema);
