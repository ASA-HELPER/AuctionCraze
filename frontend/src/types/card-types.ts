export interface IFeatureAuctionCardProps {
  imgSrc: string;
  title: string;
  startingBid?: string;
  startTime: string;
  endTime: string;
  id: string | number;
}

export interface IDrawerProps {
  openDrawer: boolean;
  setOpenDrawer: (val: boolean) => void;
  id: string | number;
  loading: boolean;
}

export interface IMyAuctionCardProps {
  imgSrc: string;
  title: string;
  startingBid?: string;
  startTime: string;
  endTime: string;
  id: string | number;
}
