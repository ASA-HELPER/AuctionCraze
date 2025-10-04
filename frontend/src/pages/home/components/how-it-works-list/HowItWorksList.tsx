import { Typography } from "@mui/material";
import { howItWorksList } from "../../../../constants/common-constants";
import "./howItWorksList-styles.scss";
import homeCopy from "../../home.copy";

const HowItWorksList = () => {
  return (
    <div className="howItWorksList__container">
      <Typography className="howItWorksList__title">
        {homeCopy.section1.title}
      </Typography>
      <div className="howItWorksList__subContainer">
        {howItWorksList.map((item) => (
          <div key={item.title} className="howItWorksList__card">
            <Typography className="howItWorksList__cardTitle">
              {item.title}
            </Typography>
            <Typography className="howItWorksList__cardDescription">
              {item.description}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorksList;
