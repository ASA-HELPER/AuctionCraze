export const ROUTES = {
  HOME: "/",

  // Auth
  SIGN_UP: "/auth/sign-up",
  LOGIN: "/auth/login",

  // Auctions
  AUCTIONS: "/auctions",
  CREATE_AUCTION: "/auctions/create",
  MY_AUCTIONS: "/auctions/mine",
  AUCTION_ITEM: (id = ":id") => `/auctions/${id}`,
  AUCTION_DETAILS: (id = ":id") => `/auctions/${id}/details`,

  // User
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",

  // Static
  ABOUT: "/about",
  HOW_IT_WORKS: "/how-it-works",
  LEADERBOARD: "/leaderboard",

  // Others
  CONTACT: "/contact",
  SUBMIT_COMMISSION: "/submit-commission",

  // fallback
  NOT_FOUND: "*",
};
