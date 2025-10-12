import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaGreaterThan } from "react-icons/fa";

import "./viewAuctionDetails-styles.scss";
import { getAuctionDetail } from "../../store/slices/auctionSlice";
import { useAppDispatch } from "../../hooks/storeHooks";
import CustomSpinner from "../../components/spinner/CustomSpinner";
import { RootState } from "../../store/store";
import { ROUTES } from "../../constants/route-constants";
import viewAuctionsDetailsCopy from "./viewAuctionsDetails.copy";
import { ROLES } from "../../constants/common-constants";

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
    if (!isAuthenticated || user.role === ROLES[1]) {
      navigateTo(ROUTES.HOME);
    }
    if (id) {
      dispatch(getAuctionDetail(id));
    }
  }, [isAuthenticated, id, dispatch, navigateTo, user.role]);

  const renderBreadcrumbs = () => (
    <div className="auctionDetails__breadcrumbs">
      <Link to={ROUTES.HOME} className="auctionDetails__link">
        {viewAuctionsDetailsCopy.breadcrumbsLinks.home}
      </Link>
      <FaGreaterThan className="auctionDetails__icon" />
      <Link to={ROUTES.MY_AUCTIONS} className="auctionDetails__link">
        {viewAuctionsDetailsCopy.breadcrumbsLinks.myAuctions}
      </Link>
      <FaGreaterThan className="auctionDetails__icon" />
      <p className="auctionDetails__text">{auctionDetail.title}</p>
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
      new Date(auctionDetail.startTime).getTime() < Date.now();
    const auctionEnded = new Date(auctionDetail.endTime).getTime() < Date.now();

    if (
      auctionBidders &&
      auctionBidders.length > 0 &&
      auctionStarted &&
      !auctionEnded
    ) {
      return auctionBidders.map((bidder: any, index: number) => (
        <div key={index} className="auctionDetails__bidder">
          <div className="auctionDetails__bidderInfo">
            <img
              src={bidder.profileImage}
              alt={bidder.userName}
              className="auctionDetails__bidderImage"
            />
            <p className="auctionDetails__bidderName">{bidder.userName}</p>
          </div>
          <p className="auctionDetails__bidAmount">{bidder.amount}</p>
          {renderBidderRank(index)}
        </div>
      ));
    } else if (!auctionStarted) {
      return (
        <img
          src="/notStarted.png"
          alt="not-started"
          className="auctionDetails__statusImage"
        />
      );
    } else {
      return (
        <img
          src="/auctionEnded.png"
          alt="ended"
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
          <div className="auctionDetails__left">
            <div className="auctionDetails__itemSection">
              <div className="auctionDetails__imageBox">
                <img
                  src={auctionDetail.image?.url}
                  alt={auctionDetail.title}
                  className="auctionDetails__image"
                />
              </div>
              <div className="auctionDetails__itemInfo">
                <h3 className="auctionDetails__title">{auctionDetail.title}</h3>
                <p className="auctionDetails__detail">
                  {viewAuctionsDetailsCopy.condition}
                  <span className="auctionDetails__highlight">
                    {auctionDetail.condition}
                  </span>
                </p>
                <p className="auctionDetails__detail">
                  {viewAuctionsDetailsCopy.minimumBid}
                  <span className="auctionDetails__highlight">
                    Rs.{auctionDetail.startingBid}
                  </span>
                </p>
              </div>
            </div>

            <p className="auctionDetails__subheading">
              {viewAuctionsDetailsCopy.subheading}
            </p>
            <hr className="auctionDetails__divider" />

            {auctionDetail.description &&
              auctionDetail.description
                .split(". ")
                .map((element: string, index: number) => (
                  <li key={index} className="auctionDetails__descriptionItem">
                    {element}
                  </li>
                ))}
          </div>

          <div className="auctionDetails__right">
            <header className="auctionDetails__bidsHeader">
              {viewAuctionsDetailsCopy.bidsHeading}
            </header>
            <div className="auctionDetails__bidsContainer">
              {renderBidders()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAuctionDetails;
