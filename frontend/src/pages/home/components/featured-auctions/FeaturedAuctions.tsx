import { useSelector } from "react-redux";
import "./featuredAuctions-styles.scss";
import { RootState } from "../../../../store/store";
import { FeaturedAuctionCard } from "../../../../components";
import { Typography } from "@mui/material";
import homeCopy from "../../home.copy";

const FeaturedAuctions = () => {
  const { allAuctions } = useSelector((state: RootState) => state.auction);

  return (
    <div className="featuredAuctions__container">
      <Typography className="featuredAuctions__title">
        {homeCopy.section2.title}
      </Typography>
      <div
        className={`${
          allAuctions.length > 0
            ? "featuredAuctions__subContainer"
            : "featuredAuctions__emptyContainer"
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
          <Typography className="featuredAuctions__emptyData">
            {homeCopy.section2.noDataAvailable}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default FeaturedAuctions;
