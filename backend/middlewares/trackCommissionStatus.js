import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

export const trackCommissionStatus = catchAsyncErrors(
  async (req, res, next) => {
    const user = await User.findById(req.user._id).select("unpaidCommission");

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    if (user.unpaidCommission > 0) {
      return next(
        new ErrorHandler(
          "You have unpaid commissions. Please pay them before posting a new auction.",
          403
        )
      );
    }

    next();
  }
);
