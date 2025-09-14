import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAppDispatch } from "./hooks/storeHooks";
import {
  About,
  AuctionItem,
  Auctions,
  Contact,
  CreateAuction,
  Dashboard,
  Home,
  HowItWorks,
  Leaderboard,
  Login,
  NotFound,
  Profile,
  Register,
  SubmitCommission,
  ViewAuctionDetails,
  ViewMyAuctions,
} from "./pages";
import { ROUTES } from "./constants/route-constants";
import { useEffect } from "react";
import { fetchLeaderboard, fetchUser } from "./store/slices/userSlice";
import { getAllAuctionItems } from "./store/slices/auctionSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(getAllAuctionItems());
    dispatch(fetchLeaderboard());
  }, []);

  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.SIGN_UP} element={<Register />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />

        <Route path={ROUTES.AUCTIONS} element={<Auctions />} />
        <Route path={ROUTES.CREATE_AUCTION} element={<CreateAuction />} />
        <Route path={ROUTES.MY_AUCTIONS} element={<ViewMyAuctions />} />
        <Route path={ROUTES.AUCTION_ITEM()} element={<AuctionItem />} />
        <Route
          path={ROUTES.AUCTION_DETAILS()}
          element={<ViewAuctionDetails />}
        />

        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTES.PROFILE} element={<Profile />} />

        <Route path={ROUTES.ABOUT} element={<About />} />
        <Route path={ROUTES.HOW_IT_WORKS} element={<HowItWorks />} />
        <Route path={ROUTES.LEADERBOARD} element={<Leaderboard />} />

        <Route path={ROUTES.CONTACT} element={<Contact />} />
        <Route path={ROUTES.SUBMIT_COMMISSION} element={<SubmitCommission />} />

        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      </Routes>
      <ToastContainer position="top-right" theme="dark" />
    </Router>
  );
}

export default App;
