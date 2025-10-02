import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./featuredAuctionCard-styles.scss";
import { IFeatureAuctionCardProps } from "../../types/card-types";

const FeatureAuctionCard = ({
  imgSrc,
  title,
  startingBid,
  startTime,
  endTime,
  id,
}: IFeatureAuctionCardProps) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const startDifference = new Date(startTime).getTime() - now.getTime();
    const endDifference = new Date(endTime).getTime() - now.getTime();
    let timeLeft: any = {};

    if (startDifference > 0) {
      timeLeft = {
        type: "Starts In:",
        days: Math.floor(startDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((startDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((startDifference / 1000 / 60) % 60),
        seconds: Math.floor((startDifference / 1000) % 60),
      };
    } else if (endDifference > 0) {
      timeLeft = {
        type: "Ends In:",
        days: Math.floor(endDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((endDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((endDifference / 1000 / 60) % 60),
        seconds: Math.floor((endDifference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTimeLeft = ({ days, hours, minutes, seconds }: any) => {
    const pad = (num: number) => String(num).padStart(2, "0");
    return `(${days} Days) ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  return (
    <Link to={`/auction/item/${id}`} className="featureAuctionCard__container">
      <img src={imgSrc} alt={title} className="featureAuctionCard__image" />
      <div className="featureAuctionCard__content">
        <h5 className="featureAuctionCard__title">{title}</h5>
        {startingBid && (
          <p className="featureAuctionCard__startingBid">
            Starting Bid:{" "}
            <span className="featureAuctionCard__highlight">{startingBid}</span>
          </p>
        )}
        <p className="featureAuctionCard__timer">
          {timeLeft.type}
          {Object.keys(timeLeft).length > 1 ? (
            <span className="featureAuctionCard__highlight">
              {formatTimeLeft(timeLeft)}
            </span>
          ) : (
            <span className="featureAuctionCard__highlight">Time's up!</span>
          )}
        </p>
      </div>
    </Link>
  );
};

export default FeatureAuctionCard;
