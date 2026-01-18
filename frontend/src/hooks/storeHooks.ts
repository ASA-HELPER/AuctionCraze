import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useGlobalLoading = () => {
  const userLoading = useSelector((state: RootState) => state.user.loading);
  const auctionLoading = useSelector(
    (state: RootState) => state.auction.loading,
  );

  return userLoading || auctionLoading;
};
