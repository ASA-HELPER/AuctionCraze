import { useEffect } from "react";
import "./leaderboard-styles.scss";
import { Typography } from "@mui/material";
import { ExtendedColumn } from "../../types/table-types";
import CustomTable from "../../components/table/CustomTable";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { fetchLeaderboard } from "../../store/slices/userSlice";
import { useAppDispatch } from "../../hooks/storeHooks";
import leaderboardCopy from "./leaderboard.copy";

const Leaderboard = () => {

  const dispatch = useAppDispatch();
  const { leaderboard, loading } = useSelector(
    (store: RootState) => store.user
  );

  useEffect(()=>{
    dispatch(fetchLeaderboard());
  }, [dispatch])

  const transformedLeaderboardData = leaderboard.map((item) => ({
    id: item._id,
    name: item.name,
    iconImage: item.iconImage,
    bidExpenditure: item.bidExpenditure,
    auctionsWon: item.auctionsWon,
  }));

  const BIDDER_LEADERBOARD_TABLE_FIELDS: ExtendedColumn[] = [
    {
      field: "iconImage",
      headerName: "Profile Pic",
      flex: 1,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="icon"
          style={{
            width: 40,
            height: 40,
            objectFit: "cover",
            borderRadius: "50%",
            alignSelf: "center",
          }}
        />
      ),
    },
    {
      field: "name",
      headerName: "Username",
      flex: 1,
    },
    {
      field: "bidExpenditure",
      headerName: "Bid Expenditure",
      flex: 1,
    },
    {
      field: "auctionsWon",
      headerName: "Auctions Won",
      flex: 1,
    },
  ];

  return (
    <div className="leaderboard__container">
      <div className="leaderboard__headerContainer">
        <Typography className="leaderboard__headerTitle" variant="h1">
          {leaderboardCopy.biddersLeaderboard}
        </Typography>
      </div>
      <CustomTable
        columns={BIDDER_LEADERBOARD_TABLE_FIELDS}
        rows={transformedLeaderboardData}
        loading={loading}
      />
    </div>
  );
};

export default Leaderboard;
