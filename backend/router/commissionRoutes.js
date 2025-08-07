import express from "express";
import { proofOfCommission } from "../controllers/commissionController.js";
import {
  isAuthenticated,
  isAuthorized,
} from "../middlewares/authMiddleware.js";
import { COMMISSION_ROUTES } from "../constants/routes.js";

const router = express.Router();

router.post(
  COMMISSION_ROUTES.PROOF,
  isAuthenticated,
  isAuthorized("Auctioneer"),
  proofOfCommission
);

export default router;
