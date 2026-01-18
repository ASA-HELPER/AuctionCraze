import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FeaturedAuctions from "./components/featured-auctions/FeaturedAuctions";
import TopLeadersList from "./components/top-leaders-list/TopLeadersList";
import HowItWorksList from "./components/how-it-works-list/HowItWorksList";
import { RootState } from "../../store/store";
import "./home-styles.scss";
import { ROUTES } from "../../constants/route-constants";
import CustomButton from "../../components/button/CustomButton";
import homeCopy from "./home.copy";
import { Typography } from "@mui/material";
import CustomSpinner from "../../components/spinner/CustomSpinner";
import { useGlobalLoading } from "../../hooks/storeHooks";

const Home = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const isLoading = useGlobalLoading();

  return (
    <div className="home__container">
      {isLoading ? (
        <CustomSpinner spinnerSize={100} color="red" />
      ) : (
        <>
          <Typography className="home__title">{homeCopy.pageTitle}</Typography>
          <div className="home__subContainer">
            {!isAuthenticated && (
              <div className="home__buttons">
                <CustomButton
                  title={homeCopy.buttonTitles.signup}
                  onClick={() => navigate(ROUTES.SIGN_UP)}
                />
                <CustomButton
                  title={homeCopy.buttonTitles.login}
                  onClick={() => navigate(ROUTES.LOGIN)}
                />
              </div>
            )}
          </div>
          <HowItWorksList />
          <FeaturedAuctions />
          <TopLeadersList />
        </>
      )}
    </div>
  );
};

export default Home;
