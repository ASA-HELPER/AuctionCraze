import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaGreaterThan } from "react-icons/fa";
import { RiAuctionFill } from "react-icons/ri";
import auctionNotStarted from "../../assets/auctionNotStarted.png";
import auctionEnded from "../../assets/auctionEnded.png";

import "./auctionItem-styles.scss";
import { RootState } from "../../store/store";
import { placeBid } from "../../store/slices/bidSlice";
import { getAuctionDetail } from "../../store/slices/auctionSlice";
import { useAppDispatch } from "../../hooks/storeHooks";
import { ROUTES } from "../../constants/route-constants";
import CustomSpinner from "../../components/spinner/CustomSpinner";
import auctionItemCopy from "./auctionItem.copy";
import { toast } from "react-toastify";
import { Typography } from "@mui/material";

const AuctionItem = () => {
  const { id } = useParams();

  const { loading, auctionDetail, auctionBidders } = useSelector(
    (state: RootState) => state.auction,
  );
  const { isAuthenticated } = useSelector((state: any) => state.user);

  const dispatch = useAppDispatch();
  const navigateTo = useNavigate();

  const [amount, setAmount] = useState(0);

  const handleBid = () => {
    if (!isAuthenticated) {
      toast.error(auctionItemCopy.bidErrorMessage);
      return;
    }
    if (auctionDetail && amount < auctionDetail?.startingBid) {
      toast.error(
        `${auctionItemCopy.minimumBidAmountMessage} ${auctionDetail?.startingBid}`,
      );
      return;
    }

    const formData = new FormData();
    formData.append("amount", String(amount));
    dispatch(placeBid(formData, String(id)));
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      setAmount(Number(value));
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo(ROUTES.HOME);
      return;
    }

    if (id) {
      dispatch(getAuctionDetail(id));
    }
  }, [isAuthenticated]);

  return (
    <div className="auctionItem__container">
      <div className="auctionItem__breadcrumb">
        <Link to={ROUTES.HOME} className="auctionItem__breadcrumbLink">
          {auctionItemCopy.breadcrumbsLinks.home}
        </Link>
        <FaGreaterThan className="auctionItem__breadcrumb-separator" />
        <Link to={ROUTES.AUCTIONS} className="auctionItem__breadcrumbLink">
          {auctionItemCopy.breadcrumbsLinks.auctions}
        </Link>
        <FaGreaterThan className="auctionItem__breadcrumb-separator" />
        <p className="auctionItem__breadcrumb-current">
          {auctionDetail?.title ?? ""}
        </p>
      </div>

      {loading ? (
        <CustomSpinner spinnerSize={100} color="red" />
      ) : (
        <div className="auctionItem__content">
          <div className="auctionItem__detailsContainer">
            <div className="auctionItem__detailsContainerTopSection">
              <img
                src={auctionDetail?.image?.url}
                alt={auctionDetail?.title}
                className="auctionItem__image"
              />
              <div className="auctionItem__info">
                <Typography className="auctionItem__title">
                  {auctionDetail?.title ?? ""}
                </Typography>
                <Typography className="auctionItem__condition">
                  {auctionItemCopy.condition}
                  <span>{auctionDetail?.condition}</span>
                </Typography>
                <Typography className="auctionItem__minBid">
                  {auctionItemCopy.minimumBid}
                  <span>
                    {auctionItemCopy.rupees}
                    {auctionDetail?.startingBid}
                  </span>
                </Typography>
              </div>
            </div>

            <div className="auctionItem__detailsContainerBottomSection">
              <Typography className="auctionItem__title">
                {auctionItemCopy.subheading}
              </Typography>
              <hr className="auctionItem__divider" />
              <ul className="auctionItem__description">
                {auctionDetail?.description &&
                  auctionDetail.description
                    .split(". ")
                    .map((element: string, index: number) => (
                      <li key={index} className="auctionItem__descriptionItem">
                        {element}
                      </li>
                    ))}
              </ul>
            </div>
          </div>

          <div className="auctionItem__bids">
            <header className="auctionItem__bids-header">
              {auctionItemCopy.bidsHeading}
            </header>
            <div className="auctionItem__bidsList">
              {auctionBidders &&
              auctionBidders.length > 0 &&
              auctionDetail &&
              new Date(auctionDetail?.startTime).getTime() < Date.now() &&
              new Date(auctionDetail?.endTime).getTime() > Date.now() ? (
                auctionBidders.length > 0 ? (
                  auctionBidders.map((bid: any, index: number) => (
                    <div key={index} className="auctionItem__bidItem">
                      <div className="auctionItem__bidUser">
                        <img
                          src={bid.profileImage}
                          alt={bid.userName}
                          className="auctionItem__bidAvatar"
                        />
                        <Typography className="auctionItem__bidName">
                          {bid.userName}
                        </Typography>
                        <Typography className="auctionItem__bidAmount">
                          {bid.amount}
                        </Typography>
                      </div>
                      <Typography className="auctionItem__bidRank">
                        {index === 0
                          ? "1st"
                          : index === 1
                            ? "2nd"
                            : index === 2
                              ? "3rd"
                              : `${index + 1}th`}
                      </Typography>
                    </div>
                  ))
                ) : (
                  <Typography className="auctionItem__noBids">
                    {auctionItemCopy.noBidAvailable}
                  </Typography>
                )
              ) : auctionDetail &&
                Date.now() < new Date(auctionDetail?.startTime).getTime() ? (
                <img
                  src={auctionNotStarted}
                  alt="auction-not-started"
                  className="auctionItem__statusImg"
                />
              ) : (
                <img
                  src={auctionEnded}
                  alt="auction-ended"
                  className="auctionItem__statusImg"
                />
              )}
            </div>

            <div>
              {auctionDetail &&
              Date.now() >= new Date(auctionDetail?.startTime).getTime() &&
              Date.now() <= new Date(auctionDetail?.endTime).getTime() ? (
                <div className="auctionItem__bidAction">
                  <div className="auctionItem__bidInput">
                    <Typography className="auctionItem__bidInputFieldLabel">
                      {auctionItemCopy.placeBid}
                    </Typography>
                    <input
                      type="text"
                      value={amount}
                      onChange={handleAmountChange}
                      className="auctionItem__bidInputField"
                    />
                  </div>
                  <RiAuctionFill
                    onClick={handleBid}
                    className="auctionItem__bidIcon"
                  />
                </div>
              ) : auctionDetail &&
                new Date(auctionDetail?.startTime).getTime() > Date.now() ? (
                <Typography className="auctionItem__bidStartEndMessage">
                  {auctionItemCopy.auctionNotStarted}
                </Typography>
              ) : (
                <Typography className="auctionItem__bidStartEndMessage">
                  {auctionItemCopy.auctionEnded}
                </Typography>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuctionItem;
