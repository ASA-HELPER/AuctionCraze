import AuctionItemsTable from "./components/auctionItemsTable/AuctionItemsTable";
import "./dashboard-styles.scss";
import { Typography } from "@mui/material";
import dashboardCopy from "./dashboard.copy";
import PaymentProofsTable from "./components/paymentProofsTable/PaymentProofsTable";
import BiddersAuctioneersGraph from "./components/biddersAuctioneersGraph/BiddersAuctioneersGraph";
import PaymentGraph from "./components/paymentGraph/PaymentGraph";
import { useAppDispatch } from "../../hooks/storeHooks";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect } from "react";
import {
  clearAllAdminSliceErrors,
  getAllPaymentProofs,
  getAllUsers,
  getMonthlyRevenue,
} from "../../store/slices/adminSlice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/route-constants";
import CustomSpinner from "../../components/spinner/CustomSpinner";
import { ROLES } from "../../constants/common-constants";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const navigateTo = useNavigate();
  const { loading } = useSelector((state: RootState) => state.admin);
  useEffect(() => {
    dispatch(getMonthlyRevenue());
    dispatch(getAllUsers());
    dispatch(getAllPaymentProofs());
    dispatch(clearAllAdminSliceErrors());
  }, []);

  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.user,
  );
  useEffect(() => {
    if ((user && user?.role !== ROLES[2]) || !isAuthenticated) {
      navigateTo(ROUTES.HOME);
    }
  }, [isAuthenticated]);

  return (
    <div className="dashboard__container">
      <Typography className="dashboard__title">
        {dashboardCopy.pageTitle}
      </Typography>
      {loading ? (
        <CustomSpinner spinnerSize={100} color="red" />
      ) : (
        <>
          <BiddersAuctioneersGraph />
          <PaymentGraph />
          <PaymentProofsTable />
          <AuctionItemsTable />
        </>
      )}
    </div>
  );
};

export default Dashboard;
