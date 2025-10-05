import { useSelector } from "react-redux";
import { FeaturedAuctionCard } from "../../components";
import "./auctions-styles.scss";
import { Typography } from "@mui/material";
import { RootState } from "../../store/store";
import auctionsCopy from "./auctions.copy";

const Auctions = () => {
  const { allAuctions, loading } = useSelector(
    (state: RootState) => state.auction
  );

  return (
    <div className="auctions__container">
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
              />
            ))
        ) : (
          <Typography className="auctions__emptyData">
            {auctionsCopy.noDataAvailable}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default Auctions;
