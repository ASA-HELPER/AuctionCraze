export type UserRole = "Bidder" | "Auctioneer" | "Admin";

export interface ICloudImage {
  public_id: string;
  url: string;
}

export interface IUserPayload {
  userName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: UserRole;
  profileImage: ICloudImage;

  // auctioneer-specific fields
  bankAccountNumber?: string;
  bankAccountName?: string;
  bankName?: string;
  easypaisaAccountNumber?: string;
  paypalEmail?: string;
}

export interface IBid {
  _id: string;
  userId: string;
  userName: string;
  profileImage: string;
  amount: number;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface INewAuctionPayload {
  title: string;
  description: string;
  category: string;
  condition: string;
  startingBid: number;
  startTime: string;
  endTime: string;
  image: ICloudImage;
  commissionCalculated: boolean;
  bids: IBid[];
}

export interface IProofOfCommissionPayload {
  amount: number;
  comment: string;
  proof: File;
}

export interface IPlaceBidPayload {
  amount: number;
}

export type IMyAuctions = INewAuctionPayload & {
  highestBidder: string;
};

export interface IUserState {
  loading: boolean;
  isAuthenticated: boolean;
  user: IUserPayload | null;
  leaderboard: IUserPayload[];
}

export interface IAuctionState {
  loading: boolean;
  auctionDetail: INewAuctionPayload | null;
  auctionBidders: IBid[];
  myAuctions: IMyAuctions[];
  allAuctions: INewAuctionPayload[];
}
