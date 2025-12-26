import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Auction } from "../models/auctionSchema.js";
import { Bid } from "../models/bidSchema.js";
import { User } from "../models/userSchema.js";

export const placeBid = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { amount } = req.body;

  const auctionItem = await Auction.findById(id);
  if (!auctionItem) {
    return next(new ErrorHandler("Auction Item not found.", 404));
  }

  if (!amount) {
    return next(new ErrorHandler("Please place your bid.", 400));
  }

  if (amount <= auctionItem.currentBid) {
    return next(
      new ErrorHandler("Bid amount must be greater than the current bid.", 400)
    );
  }

  if (amount < auctionItem.startingBid) {
    return next(
      new ErrorHandler("Bid amount must be greater than starting bid.", 400)
    );
  }

  const existingBid = await Bid.findOne({
    "bidder.id": req.user._id,
    auctionItem: auctionItem._id,
  });

  const existingBidInAuction = auctionItem.bids.find(
    (bid) => bid.userId.toString() === req.user._id.toString()
  );

  if (existingBid && existingBidInAuction) {
    existingBid.amount = amount;
    existingBidInAuction.amount = amount;
    await existingBid.save();
  } else {
    const bidderDetail = await User.findById(req.user._id);

    await Bid.create({
      amount,
      bidder: {
        id: bidderDetail._id,
        userName: bidderDetail.userName,
        profileImage: bidderDetail.profileImage?.url,
      },
      auctionItem: auctionItem._id,
    });

    auctionItem.bids.push({
      userId: bidderDetail._id,
      userName: bidderDetail.userName,
      profileImage: bidderDetail.profileImage?.url,
      amount,
    });
  }

  auctionItem.currentBid = amount;
  await auctionItem.save();

  res.status(201).json({
    success: true,
    message: "Bid placed.",
    currentBid: auctionItem.currentBid,
  });
});
