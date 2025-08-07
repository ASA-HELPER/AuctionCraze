export const BASE_ROUTE = "/api/v1";

export const SERVICE_ROUTES = {
  USER: "/user",
  ADMIN: "/admin",
  BID: "/bid",
  COMMISSION: "/commission",
};

export const USER_ROUTES = {
  REGISTER: "/register",
  LOGIN: "/login",
  PROFILE: "/profile",
  LOGOUT: "/logout",
  LEADERBOARD: "/leaderboard",
};

export const ADMIN_ROUTES = {
  DELETE_AUCTION_ITEM: "/auctionitem/delete/:id",
  GET_ALL_PAYMENT_PROOFS: "/paymentproofs/getall",
  GET_PAYMENT_PROOF_DETAIL: "/paymentproof/:id",
  UPDATE_PROOF_STATUS: "/paymentproof/status/update/:id",
  DELETE_PAYMENT_PROOF: "/paymentproof/delete/:id",
  GET_ALL_USERS: "/users/getall",
  GET_MONTHLY_REVENUE: "/monthlyincome",
};

export const BID_ROUTES = {
  PLACE_BID: "/placebid/:id",
};

export const COMMISSION_ROUTES = {
  PROOF: "/proof",
};
