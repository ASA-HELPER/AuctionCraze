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
import { GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";

const Leaderboard = () => {
  const dispatch = useAppDispatch();
  const { leaderboard, loading } = useSelector(
    (store: RootState) => store.user
  );

  useEffect(() => {
    dispatch(fetchLeaderboard());
  }, [dispatch]);

  const transformedLeaderboardData = leaderboard.map((item) => ({
    id: item._id,
    name: item.name,
    iconImage: item.profileImage?.url,
    bidExpenditure: item.moneySpent,
    auctionsWon: item.auctionsWon,
  }));

  const BIDDER_LEADERBOARD_TABLE_FIELDS: ExtendedColumn[] = [
    {
      field: "iconImage",
      headerName: leaderboardCopy.profilePic,
      flex: 1,
      renderCell: (
        params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
      ) => (
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
      headerName: leaderboardCopy.username,
      flex: 1,
    },
    {
      field: "bidExpenditure",
      headerName: leaderboardCopy.bidExpenditure,
      flex: 1,
    },
    {
      field: "auctionsWon",
      headerName: leaderboardCopy.auctionsWon,
      flex: 1,
    },
  ];

  return (
    <div className="leaderboard__container">
      <div className="leaderboard__headerContainer">
        <Typography className="leaderboard__headerTitle" variant="h3">
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
