import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./myAuctionCard-styles.scss";
import { IDrawerProps, IMyAuctionCardProps } from "../../types/card-types";
import {
  deleteAuction,
  republishAuction,
} from "../../store/slices/auctionSlice";
import { useAppDispatch } from "../../hooks/storeHooks";
import CustomButton from "../button/CustomButton";
import { ROUTES } from "../../constants/route-constants";

const MyAuctionCard = ({
  imgSrc,
  title,
  startingBid,
  startTime,
  endTime,
  id,
}: IMyAuctionCardProps) => {
  const dispatch = useAppDispatch();
  const navigateTo = useNavigate();
  const { loading } = useSelector((state: any) => state.auction);
  const isAuctionActive = new Date(endTime).getTime() > Date.now();

  const calculateTimeLeft = () => {
    const now = new Date();
    const startDiff = new Date(startTime).getTime() - now.getTime();
    const endDiff = new Date(endTime).getTime() - now.getTime();
    let timeLeft: any = {};

    if (startDiff > 0) {
      timeLeft = {
        type: "Starts In:",
        days: Math.floor(startDiff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((startDiff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((startDiff / 1000 / 60) % 60),
        seconds: Math.floor((startDiff / 1000) % 60),
      };
    } else if (endDiff > 0) {
      timeLeft = {
        type: "Ends In:",
        days: Math.floor(endDiff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((endDiff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((endDiff / 1000 / 60) % 60),
        seconds: Math.floor((endDiff / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTimeLeft = ({ days, hours, minutes, seconds }: any) => {
    const pad = (num: number) => String(num).padStart(2, "0");
    return `(${days} Days) ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  const handleDeleteAuction = () => {
    dispatch(deleteAuction(id));
  };

  const handleViewAuction = () => {
    navigateTo(`/auction/details/${id}`);
    navigateTo(ROUTES.AUCTION_DETAILS(String(id)));
  };

  return (
    <>
      <div className="myAuctionCard__container">
        <img src={imgSrc} alt={title} className="myAuctionCard__image" />
        <div className="myAuctionCard__content">
          <h5 className="myAuctionCard__title">{title}</h5>
          {startingBid && (
            <p className="myAuctionCard__startingBid">
              Starting Bid:{" "}
              <span className="myAuctionCard__highlight">{startingBid}</span>
            </p>
          )}
          <p className="myAuctionCard__timer">
            {timeLeft.type}
            {Object.keys(timeLeft).length > 1 ? (
              <span className="myAuctionCard__highlight">
                {formatTimeLeft(timeLeft)}
              </span>
            ) : (
              <span className="myAuctionCard__highlight">Time's up!</span>
            )}
          </p>
          <div className="myAuctionCard__actions">
            <CustomButton
              onClick={handleViewAuction}
              className="myAuctionCard__viewBtn"
              title="View Auction"
            />
            <CustomButton
              className="myAuctionCard__deleteBtn"
              onClick={handleDeleteAuction}
              title="Delete Auction"
            />
            <CustomButton
              className="myAuctionCard__republishBtn"
              disabled={isAuctionActive}
              onClick={() => setOpenDrawer(true)}
              title="Republish Auction"
            />
          </div>
        </div>
      </div>
      <Drawer
        id={id}
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        loading={loading}
      />
    </>
  );
};

export default MyAuctionCard;

const Drawer = ({ setOpenDrawer, openDrawer, id, loading }: IDrawerProps) => {
  const dispatch = useAppDispatch();
  const [startTime, setStartTime] = useState<any>("");
  const [endTime, setEndTime] = useState<any>("");

  const handleRepublishAuction = () => {
    const formData = new FormData();
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    dispatch(republishAuction(formData, id));
  };

  return (
    <section
      className={`myAuctionCard__drawer ${
        openDrawer ? "myAuctionCard__drawer--open" : ""
      }`}
    >
      <div className="myAuctionCard__drawerContent">
        <div className="myAuctionCard__drawerInner">
          <h3 className="myAuctionCard__drawerTitle">Republish Auction</h3>
          <p className="myAuctionCard__drawerDesc">
            Let's republish auction with same details but new starting and
            ending time.
          </p>
          <form className="myAuctionCard__drawerForm">
            <div className="myAuctionCard__drawerField">
              <label>Republish Auction Start Time</label>
              <DatePicker
                selected={startTime}
                onChange={(date) => setStartTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h,mm aa"
                className="myAuctionCard__datePicker"
              />
            </div>
            <div className="myAuctionCard__drawerField">
              <label>Republish Auction End Time</label>
              <DatePicker
                selected={endTime}
                onChange={(date) => setEndTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h,mm aa"
                className="myAuctionCard__datePicker"
              />
            </div>
            <CustomButton
              type="button"
              className="myAuctionCard__republishSubmit"
              onClick={handleRepublishAuction}
              title={loading ? "Republishing" : "Republish"}
            />
            <CustomButton
              type="button"
              className="myAuctionCard__cancelBtn"
              onClick={() => setOpenDrawer(false)}
              title="Cancel"
            />
          </form>
        </div>
      </div>
    </section>
  );
};
