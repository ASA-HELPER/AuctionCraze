import { useSelector } from "react-redux";
import { FeaturedAuctionCard } from "../../components";
import "./auctions-styles.scss";
import { Typography } from "@mui/material";
import { RootState } from "../../store/store";
import auctionsCopy from "./auctions.copy";
import CustomSpinner from "../../components/spinner/CustomSpinner";
import { ROLES } from "../../constants/common-constants";
import { ROUTES } from "../../constants/route-constants";

const Auctions = () => {
  const { allAuctions, loading } = useSelector(
    (state: RootState) => state.auction
  );

  const { user } = useSelector((state: any) => state.user);

  const createLink = (id: string) => {
    return user.role === ROLES[1]
      ? ROUTES.AUCTION_ITEM(id)
      : ROUTES.AUCTION_DETAILS(id);
  };

  return (
    <div className="auctions__container">
      {loading ? (
        <CustomSpinner spinnerSize={100} color="red" />
      ) : (
        <>
          <Typography className="auctions__title">
            {auctionsCopy.pageTitle}
          </Typography>
          <div
            className={`${
              allAuctions.length > 0
                ? "auctions__subContainer"
                : "auctions__emptyContainer"
            }`}
          >
            {allAuctions.length > 0 ? (
              allAuctions
                .slice(0, 8)
                .map((element: any) => (
                  <FeaturedAuctionCard
                    key={element._id}
                    title={element.title}
                    imgSrc={element.image?.url}
                    startTime={element.startTime}
                    endTime={element.endTime}
                    startingBid={element.startingBid}
                    id={element._id}
                    redirectionLink={createLink(String(element._id))}
                  />
                ))
            ) : (
              <Typography className="auctions__emptyData">
                {auctionsCopy.noDataAvailable}
              </Typography>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Auctions;
