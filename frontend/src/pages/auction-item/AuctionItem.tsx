import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaGreaterThan } from "react-icons/fa";
import { RiAuctionFill } from "react-icons/ri";

import "./auctionItem-styles.scss";
import { RootState } from "../../store/store";
import { placeBid } from "../../store/slices/bidSlice";
import { getAuctionDetail } from "../../store/slices/auctionSlice";
import { useAppDispatch } from "../../hooks/storeHooks";
import { ROUTES } from "../../constants/route-constants";
import CustomSpinner from "../../components/spinner/CustomSpinner";
import auctionItemCopy from "./auctionItem.copy";

const AuctionItem = () => {
  const { id } = useParams();
  const { loading, auctionDetail, auctionBidders } = useSelector(
    (state: RootState) => state.auction
  );
  const { isAuthenticated } = useSelector((state: any) => state.user);

  const navigateTo = useNavigate();
  const dispatch = useAppDispatch();

  const [amount, setAmount] = useState(0);

  const handleBid = () => {
    const formData = new FormData();
    formData.append("amount", amount);
    dispatch(placeBid(formData, id));
    dispatch(getAuctionDetail(id));
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo(ROUTES.HOME);
    }
    if (id) {
      dispatch(getAuctionDetail(id));
    }
  }, [isAuthenticated, id]);

  return (
    <div className="auctionItem__container">
      <div className="auctionItem__breadcrumb">
        <Link to={ROUTES.HOME} className="auctionItem__breadcrumb-link">
          {auctionItemCopy.breadcrumbsLinks.home}
        </Link>
        <FaGreaterThan className="auctionItem__breadcrumb-separator" />
        <Link to={ROUTES.AUCTIONS} className="auctionItem__breadcrumb-link">
          {auctionItemCopy.breadcrumbsLinks.auctions}
        </Link>
        <FaGreaterThan className="auctionItem__breadcrumb-separator" />
        <p className="auctionItem__breadcrumb-current">{auctionDetail.title}</p>
      </div>

      {loading ? (
        <CustomSpinner spinnerSize={30} />
      ) : (
        <div className="auctionItem__content">
          <div className="auctionItem__details">
            <div className="auctionItem__top">
              <div className="auctionItem__image-container">
                <img src={auctionDetail.image?.url} alt={auctionDetail.title} />
              </div>
              <div className="auctionItem__info">
                <h3 className="auctionItem__title">{auctionDetail.title}</h3>
                <p className="auctionItem__condition">
                  {auctionItemCopy.condition}
                  <span>{auctionDetail.condition}</span>
                </p>
                <p className="auctionItem__minBid">
                  {auctionItemCopy.minimumBid}
                  <span>
                    {auctionItemCopy.rupees}
                    {auctionDetail.startingBid}
                  </span>
                </p>
              </div>
            </div>

            <p className="auctionItem__description-title">
              {auctionItemCopy.subheading}
            </p>
            <hr className="auctionItem__divider" />
            <ul className="auctionItem__description">
              {auctionDetail.description &&
                auctionDetail.description
                  .split(". ")
                  .map((element: string, index: number) => (
                    <li key={index} className="auctionItem__description-item">
                      {element}
                    </li>
                  ))}
            </ul>
          </div>

          <div className="auctionItem__bids">
            <header className="auctionItem__bids-header">BIDS</header>
            <div className="auctionItem__bids-list">
              {auctionBidders &&
              new Date(auctionDetail.startTime).getTime() < Date.now() &&
              new Date(auctionDetail.endTime).getTime() > Date.now() ? (
                auctionBidders.length > 0 ? (
                  auctionBidders.map((bid: any, index: number) => (
                    <div key={index} className="auctionItem__bid-item">
                      <div className="auctionItem__bid-user">
                        <img
                          src={bid.profileImage}
                          alt={bid.userName}
                          className="auctionItem__bid-avatar"
                        />
                        <p className="auctionItem__bid-name">{bid.userName}</p>
                      </div>
                      <p
                        className={`auctionItem__bid-rank auctionItem__bid-rank--${
                          index + 1
                        }`}
                      >
                        {index === 0
                          ? "1st"
                          : index === 1
                          ? "2nd"
                          : index === 2
                          ? "3rd"
                          : `${index + 1}th`}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="auctionItem__no-bids">
                    {auctionItemCopy.noBidAvailable}
                  </p>
                )
              ) : Date.now() < new Date(auctionDetail.startTime).getTime() ? (
                <img
                  src="/notStarted.png"
                  alt="not-started"
                  className="auctionItem__status-img"
                />
              ) : (
                <img
                  src="/auctionEnded.png"
                  alt="ended"
                  className="auctionItem__status-img"
                />
              )}
            </div>

            <div className="auctionItem__bid-action">
              {Date.now() >= new Date(auctionDetail.startTime).getTime() &&
              Date.now() <= new Date(auctionDetail.endTime).getTime() ? (
                <>
                  <div className="auctionItem__bid-input">
                    <p>{auctionItemCopy.placeBid}</p>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="auctionItem__bid-input-field"
                    />
                  </div>
                  <button
                    className="auctionItem__bid-button"
                    onClick={handleBid}
                  >
                    <RiAuctionFill />
                  </button>
                </>
              ) : new Date(auctionDetail.startTime).getTime() > Date.now() ? (
                <p className="auctionItem__bid-message">
                  {auctionItemCopy.auctionNotStarted}
                </p>
              ) : (
                <p className="auctionItem__bid-message">
                  {auctionItemCopy.auctionEnded}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuctionItem;
