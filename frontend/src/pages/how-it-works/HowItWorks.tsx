import React from "react";
import "./howItWorks-styles.scss";
import PersonIcon from "@mui/icons-material/Person";
import GavelIcon from "@mui/icons-material/Gavel";
import EmailIcon from "@mui/icons-material/Email";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import RepeatRoundedIcon from "@mui/icons-material/RepeatRounded";
import { Typography } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";
import howItWorksCopy from "./howItWorks.copy";

const HowItWorks = () => {
  const howItWorksItem = (
    heading: string,
    description: string,
    Icon: SvgIconComponent
  ) => (
    <div>
      <Icon />
      <div className="howItWorks__textContainer">
        <Typography variant="body1" className="howItWorks__heading">
          {heading}
        </Typography>
        <Typography variant="body1" className="howItWorks__description">
          {description}
        </Typography>
      </div>
    </div>
  );
  return (
    <div className="howItWorks__container">
      <div className="about__header">
        <Typography className="about__title">{howItWorksCopy.title}</Typography>
      </div>
      <div className="howItWorks__content">
        {howItWorksItem(
          howItWorksCopy.heading1,
          howItWorksCopy.description1,
          PersonIcon
        )}
        {howItWorksItem(
          howItWorksCopy.heading2,
          howItWorksCopy.description2,
          GavelIcon
        )}
        {howItWorksItem(
          howItWorksCopy.heading3,
          howItWorksCopy.description3,
          EmailIcon
        )}
        {howItWorksItem(
          howItWorksCopy.heading4,
          howItWorksCopy.description4,
          AttachMoneyIcon
        )}
        {howItWorksItem(
          howItWorksCopy.heading5,
          howItWorksCopy.description5,
          ReceiptLongIcon
        )}
        {howItWorksItem(
          howItWorksCopy.heading6,
          howItWorksCopy.description6,
          RepeatRoundedIcon
        )}
      </div>
    </div>
  );
};

export default HowItWorks;
