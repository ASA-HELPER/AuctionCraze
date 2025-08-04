import jwt from "jsonwebtoken";
import ErrorHandler from "./errorMiddleware.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import { User } from "../models/userSchema.js";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  let token;

  // 1. Get token from cookies (for web apps)
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  // 2. Get token from Authorization header (for mobile apps, Postman, etc.)
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1]; // "Bearer <token>"
  }

  // 3. If no token, throw error
  if (!token) {
    return next(new ErrorHandler("User not authenticated.", 401));
  }

  // 4. Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  // 5. Attach user info to request
  req.user = await User.findById(decoded.id);

  next();
});

export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `${req.user.role} not allowed to access this resouce.`,
          403
        )
      );
    }
    next();
  };
};
