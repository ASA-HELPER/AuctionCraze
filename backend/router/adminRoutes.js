import express from "express";
import {
  isAuthenticated,
  isAuthorized,
} from "../middlewares/authMiddleware.js";
import {
  deleteAuctionItem,
  deletePaymentProof,
  fetchAllUsers,
  getAllPaymentProofs,
  getPaymentProofDetail,
  monthlyRevenue,
  updateProofStatus,
} from "../controllers/adminController.js";
import { ADMIN_ROUTES } from "../constants/routes.js";

const router = express.Router();

router.delete(
  ADMIN_ROUTES.DELETE_AUCTION_ITEM,
  isAuthenticated,
  isAuthorized("Admin"),
  deleteAuctionItem
);

router.get(
  ADMIN_ROUTES.GET_ALL_PAYMENT_PROOFS,
  isAuthenticated,
  isAuthorized("Admin"),
  getAllPaymentProofs
);

router.get(
  ADMIN_ROUTES.GET_PAYMENT_PROOF_DETAIL,
  isAuthenticated,
  isAuthorized("Admin"),
  getPaymentProofDetail
);

router.put(
  ADMIN_ROUTES.UPDATE_PROOF_STATUS,
  isAuthenticated,
  isAuthorized("Admin"),
  updateProofStatus
);

router.delete(
  ADMIN_ROUTES.DELETE_PAYMENT_PROOF,
  isAuthenticated,
  isAuthorized("Admin"),
  deletePaymentProof
);

router.get(
  ADMIN_ROUTES.GET_ALL_USERS,
  isAuthenticated,
  isAuthorized("Admin"),
  fetchAllUsers
);

router.get(
  ADMIN_ROUTES.GET_MONTHLY_REVENUE,
  isAuthenticated,
  isAuthorized("Admin"),
  monthlyRevenue
);

export default router;
