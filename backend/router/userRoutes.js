import express from "express";
import {
  fetchLeaderboard,
  getProfile,
  login,
  logout,
  register,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { USER_ROUTES } from "../constants/routes.js";

const router = express.Router();

router.post(USER_ROUTES.REGISTER, register);
router.post(USER_ROUTES.LOGIN, login);
router.get(USER_ROUTES.PROFILE, isAuthenticated, getProfile);
router.get(USER_ROUTES.LOGOUT, isAuthenticated, logout);
router.get(USER_ROUTES.LEADERBOARD, fetchLeaderboard);

export default router;
