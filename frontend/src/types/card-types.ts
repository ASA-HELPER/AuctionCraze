export interface IFeatureAuctionCardProps {
  imgSrc: string;
  title: string;
  startingBid?: string;
  startTime: string;
  endTime: string;
  redirectionLink: string;
}

export interface IDrawerProps {
  openDrawer: boolean;
  setOpenDrawer: (val: boolean) => void;
  id: string;
  loading: boolean;
}

export interface IMyAuctionCardProps {
  imgSrc: string;
  title: string;
  startingBid?: string;
  startTime: string;
  endTime: string;
  id: string;
}
