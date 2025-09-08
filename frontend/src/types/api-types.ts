export type UserRole = "Bidder" | "Auctioneer" | "Admin";

export interface IRegisterPayload {
  userName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: UserRole;
  profileImage: File;

  // auctioneer-specific fields
  bankAccountNumber?: string;
  bankAccountName?: string;
  bankName?: string;
  easypaisaAccountNumber?: string;
  paypalEmail?: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface NewAuctionPayload {
  title: string;
  description: string;
  category: string;
  condition: string;
  startingBid: number;
  startTime: string;
  endTime: string;
  image: File;
}

export interface ProofOfCommissionPayload {
  amount: number;
  comment: string;
}

export interface PlaceBidPayload {
  amount: number;
}
