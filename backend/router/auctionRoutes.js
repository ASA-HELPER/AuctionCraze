import {
  addNewAuctionItem,
  getAllItems,
  getAuctionDetails,
  getMyAuctionItems,
  removeFromAuction,
  republishItem,
} from "../controllers/auctionItemController.js";
import {
  isAuthenticated,
  isAuthorized,
} from "../middlewares/authMiddleware.js";
import express from "express";
import { trackCommissionStatus } from "../middlewares/trackCommissionStatus.js";
import { AUCTION_ROUTES } from "../constants/routes.js";

const router = express.Router();

router.post(
  AUCTION_ROUTES.CREATE,
  isAuthenticated,
  isAuthorized("Auctioneer"),
  trackCommissionStatus,
  addNewAuctionItem
);

router.get(AUCTION_ROUTES.ALL_ITEMS, getAllItems);

router.get(AUCTION_ROUTES.AUCTION_DETAILS, isAuthenticated, getAuctionDetails);

router.get(
  AUCTION_ROUTES.MY_ITEMS,
  isAuthenticated,
  isAuthorized("Auctioneer"),
  getMyAuctionItems
);

router.delete(
  AUCTION_ROUTES.DELETE_ITEM,
  isAuthenticated,
  isAuthorized("Auctioneer"),
  removeFromAuction
);

router.put(
  AUCTION_ROUTES.REPUBLISH_ITEM,
  isAuthenticated,
  isAuthorized("Auctioneer"),
  republishItem
);

export default router;
