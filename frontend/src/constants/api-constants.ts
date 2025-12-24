export const API_URL = "https://auctioncraze.onrender.com";
export const API_ROUTES_PREFIX = "api/v1";
export const USER = "user";
export const ADMIN = "admin";
export const LOGIN = "login";
export const LOGOUT = "logout";
export const REGISTER = "register";
export const PROFILE = "profile";
export const LEADERBOARD = "leaderboard";
export const AUCTION_ITEM = "auctionitem";
export const COMMISSION = "commission";
export const BID = "bid";

export const AUCTION_ROUTES = {
  CREATE: "create",
  ALL_ITEMS: "allitems",
  MY_ITEMS: "myitems",
  AUCTION_DETAILS: "auction",
  DELETE_ITEM: "delete",
  REPUBLISH_ITEM: "item/republish",
};

export const COMMISSION_ROUTES = {
  PROOF: "proof",
};

export const BID_ROUTES = {
  PLACE_BID: "placebid",
};

export const ADMIN_ROUTES = {
  DELETE_AUCTION_ITEM: "auctionitem/delete",
  GET_ALL_PAYMENT_PROOFS: "paymentproofs/getall",
  GET_PAYMENT_PROOF_DETAIL: "paymentproof",
  UPDATE_PROOF_STATUS: "paymentproof/status/update",
  DELETE_PAYMENT_PROOF: "paymentproof/delete",
  GET_ALL_USERS: "users/getall",
  GET_MONTHLY_REVENUE: "monthlyincome",
};
