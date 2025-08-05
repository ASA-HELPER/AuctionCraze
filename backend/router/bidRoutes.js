import express from "express";
import { placeBid } from "../controllers/bidController.js";
import {
  isAuthenticated,
  isAuthorized,
} from "../middlewares/authMiddleware.js";
import { checkAuctionEndTime } from "../middlewares/checkAuctionEndTime.js";
import { BID_ROUTES } from "../constants/routes.js";

const router = express.Router();

router.post(
  BID_ROUTES.PLACE_BID,
  isAuthenticated,
  isAuthorized("Bidder"),
  checkAuctionEndTime,
  placeBid
);

export default router;
