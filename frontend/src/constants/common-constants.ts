import { ROUTES } from "./route-constants";

export enum ButtonVariant {
  Contained = "contained", // this is small-case as mui components has pre-defined values
  Outlined = "outlined",
  Text = "text",
}

export enum VariantTypes {
  Outlined = "outlined", // this is small-case as mui components has pre-defined values
  Standard = "standard",
}

export const BANKNAMES = ["HDFC", "ICICI", "AXIS"];

export const ROLES = ["Auctioneer", "Bidder"];

export const CATEGORY = ["Car Auction", "Property Auction", "Art Auction", "Jewelry Auction"];

export const CONDITION = ["Old", "New", "Antique"];

export const navbarMenuItems = [
  { label: "Auctions", path: ROUTES.AUCTIONS },
  { label: "Leaderboard", path: ROUTES.LEADERBOARD },
  { label: "How it works", path: ROUTES.HOW_IT_WORKS },
  { label: "About Us", path: ROUTES.ABOUT },
  { label: "Create Auction", path: ROUTES.CREATE_AUCTION },
  { label: "Submit Commission", path: ROUTES.SUBMIT_COMMISSION },
  { label: "View My Auctions", path: ROUTES.MY_AUCTIONS },
  { label: "Profile", path: ROUTES.PROFILE },
  { label: "Dashboard", path: ROUTES.DASHBOARD },
  { label: "Login", path: ROUTES.LOGIN },
  { label: "Register", path: ROUTES.SIGN_UP },
  { label: "Contact Us", path: ROUTES.CONTACT },
];

export const monthLabels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const howItWorksList = [
  { title: "Post Items", description: "Auctioneer posts items for bidding." },
  { title: "Place Bids", description: "Bidders place bids on listed items." },
  {
    title: "Win Notification",
    description: "Highest bidder receives a winning email.",
  },
  {
    title: "Payment & Fees",
    description: "Bidder pays; auctioneer pays 5% fee.",
  },
];
