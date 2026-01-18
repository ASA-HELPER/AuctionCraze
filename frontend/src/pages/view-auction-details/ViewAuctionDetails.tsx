import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaGreaterThan } from "react-icons/fa";
import auctionNotStarted from "../../assets/auctionNotStarted.png";
import auctionEndedImg from "../../assets/auctionEnded.png";

import "./viewAuctionDetails-styles.scss";
import { getAuctionDetail } from "../../store/slices/auctionSlice";
import { useAppDispatch } from "../../hooks/storeHooks";
import CustomSpinner from "../../components/spinner/CustomSpinner";
import { RootState } from "../../store/store";
import { ROUTES } from "../../constants/route-constants";
import viewAuctionsDetailsCopy from "./viewAuctionsDetails.copy";
import { ROLES } from "../../constants/common-constants";
import { Typography } from "@mui/material";

const ViewAuctionDetails = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigateTo = useNavigate();

  const { loading, auctionDetail, auctionBidders } = useSelector(
    (state: any) => state.auction
  );
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (!isAuthenticated || user?.role === ROLES[1]) {
      navigateTo(ROUTES.HOME);
      return;
    }
    if (id) {
      dispatch(getAuctionDetail(id));
    }
  }, [isAuthenticated, id, dispatch, navigateTo, user?.role]);

  const renderBreadcrumbs = () => (
    <div className="auctionDetails__breadcrumb">
      <Link to={ROUTES.HOME} className="auctionDetails__breadcrumbLink">
        {viewAuctionsDetailsCopy.breadcrumbsLinks.home}
      </Link>
      <FaGreaterThan className="auctionDetails__breadcrumb-separator" />
      <Link to={ROUTES.MY_AUCTIONS} className="auctionDetails__breadcrumbLink">
        {viewAuctionsDetailsCopy.breadcrumbsLinks.myAuctions}
      </Link>
      <FaGreaterThan className="auctionDetails__breadcrumb-separator" />
      <p className="auctionDetails__text">{auctionDetail?.title}</p>
    </div>
  );

  const renderBidderRank = (index: number) => {
    if (index === 0)
      return (
        <p className="auctionDetails__rank auctionDetails__rank--first">
          {viewAuctionsDetailsCopy.bidderRanks.first}
        </p>
      );
    if (index === 1)
      return (
        <p className="auctionDetails__rank auctionDetails__rank--second">
          {viewAuctionsDetailsCopy.bidderRanks.second}
        </p>
      );
    if (index === 2)
      return (
        <p className="auctionDetails__rank auctionDetails__rank--third">
          {viewAuctionsDetailsCopy.bidderRanks.third}
        </p>
      );
    return (
      <p className="auctionDetails__rank auctionDetails__rank--other">
        {index + 1}th
      </p>
    );
  };

  const renderBidders = () => {
    const auctionStarted =
      new Date(auctionDetail?.startTime).getTime() < Date.now();
    const auctionEnded =
      new Date(auctionDetail?.endTime).getTime() < Date.now();

    if (
      auctionBidders &&
      auctionBidders.length > 0 &&
      auctionStarted &&
      !auctionEnded
    ) {
      return auctionBidders.map((bidder: any, index: number) => (
        <div key={index} className="auctionDetails__bidItem">
          <div className="auctionDetails__bidUser">
            <img
              src={bidder.profileImage}
              alt={bidder.userName}
              className="auctionDetails__bidAvatar"
            />
            <Typography className="auctionDetails__bidName">
              {bidder.userName}
            </Typography>
          </div>
          <Typography className="auctionDetails__bidAmount">
            {bidder.amount}
          </Typography>
          {renderBidderRank(index)}
        </div>
      ));
    } else if (!auctionStarted) {
      return (
        <img
          src={auctionNotStarted}
          alt="auction-not-started"
          className="auctionDetails__statusImage"
        />
      );
    } else {
      return (
        <img
          src={auctionEndedImg}
          alt="auction-ended"
          className="auctionDetails__statusImage"
        />
      );
    }
  };

  return (
    <div className="auctionDetails__container">
      {renderBreadcrumbs()}
      {loading ? (
        <CustomSpinner spinnerSize={30} />
      ) : (
        <div className="auctionDetails__content">
          <div className="auctionItem__detailsContainer">
            <div className="auctionItem__detailsContainerTopSection">
              <img
                src={auctionDetail?.image?.url}
                alt={auctionDetail?.title}
                className="auctionDetails__image"
              />
              <div className="auctionDetails__info">
                <Typography className="auctionDetails__title">
                  {auctionDetail?.title}
                </Typography>
                <Typography className="auctionDetails__condition">
                  {viewAuctionsDetailsCopy.condition}
                  <span>{auctionDetail?.condition}</span>
                </Typography>
                <Typography className="auctionDetails__minBid">
                  {viewAuctionsDetailsCopy.minimumBid}
                  <span>
                    {viewAuctionsDetailsCopy.rupees}
                    {auctionDetail?.startingBid}
                  </span>
                </Typography>
              </div>
            </div>

            <div className="auctionDetails__detailsContainerBottomSection">
              <Typography className="auctionDetails__title">
                {viewAuctionsDetailsCopy.subheading}
              </Typography>
              <hr className="auctionDetails__divider" />
              <ul className="auctionDetails__description">
                {auctionDetail?.description &&
                  auctionDetail.description
                    .split(". ")
                    .map((element: string, index: number) => (
                      <li
                        key={index}
                        className="auctionDetails__descriptionItem"
                      >
                        {element}
                      </li>
                    ))}
              </ul>
            </div>
          </div>

          <div className="auctionDetails__bids">
            <header className="auctionDetails__bidsHeader">
              {viewAuctionsDetailsCopy.bidsHeading}
            </header>
            <div className="auctionDetails__bidsList">{renderBidders()}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAuctionDetails;
