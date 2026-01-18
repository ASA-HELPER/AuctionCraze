import { useEffect } from "react";
import "./viewMyAuctions-styles.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useAppDispatch } from "../../hooks/storeHooks";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../constants/common-constants";
import { getMyAuctionItems } from "../../store/slices/auctionSlice";
import { Typography } from "@mui/material";
import { MyAuctionCard } from "../../components";
import viewMyAuctionsCopy from "./viewMyAuctions.copy";
import { ROUTES } from "../../constants/route-constants";
import CustomSpinner from "../../components/spinner/CustomSpinner";

const ViewMyAuctions = () => {
  const { myAuctions, loading } = useSelector(
    (state: RootState) => state.auction
  );
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.user
  );

  const dispatch = useAppDispatch();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== ROLES[0]) {
      navigateTo(ROUTES.HOME);
      return;
    }
    dispatch(getMyAuctionItems());
  }, [dispatch, isAuthenticated]);

  return (
    <div className="viewMyAuctions__container">
      {loading ? (
        <CustomSpinner spinnerSize={100} color="red" />
      ) : (
        <>
          <Typography className="viewMyAuctions__title">
            {viewMyAuctionsCopy.pageTitle}
          </Typography>
          <div
            className={`${
              myAuctions.length > 0
                ? "viewMyAuctions__subContainer"
                : "viewMyAuctions__emptyContainer"
            }`}
          >
            {myAuctions.length > 0 ? (
              myAuctions
                .slice(0, 8)
                .map((element: any) => (
                  <MyAuctionCard
                    key={element._id}
                    title={element.title}
                    imgSrc={element.image?.url}
                    startTime={element.startTime}
                    endTime={element.endTime}
                    startingBid={element.startingBid}
                    id={element._id}
                  />
                ))
            ) : (
              <Typography className="viewMyAuctions__emptyData">
                {viewMyAuctionsCopy.noDataAvailable}
              </Typography>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ViewMyAuctions;
