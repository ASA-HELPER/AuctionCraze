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

export interface ILeaderboardPayload {
  _id: string;
  name: string;
  profileImage: ICloudImage;
  moneySpent: number;
  auctionsWon: number;
}

export interface IUserState {
  loading: boolean;
  isAuthenticated: boolean;
  user: IUserPayload | null;
  leaderboard: ILeaderboardPayload[];
}

export interface IAuctionState {
  loading: boolean;
  auctionDetail: INewAuctionPayload | null;
  auctionBidders: IBid[];
  myAuctions: IMyAuctions[];
  allAuctions: INewAuctionPayload[];
}

export interface IPaymentProofFile {
  url: string;
  name?: string;
  type?: string;
}

export interface ISinglePaymentProof {
  _id: string;
  userId: string;
  amount: string | number;
  status: string;
  comment?: string;
  proof?: IPaymentProofFile;
  createdAt?: string;
  updatedAt?: string;
}

export interface IAdminState {
  singlePaymentProof: ISinglePaymentProof | null;
  loading: boolean;
  monthlyRevenue: Object;
  totalAuctioneers: Object;
  totalBidders: Object;
  paymentProofs: ISinglePaymentProof[];
}
