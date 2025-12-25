import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./topLeadersList-styles.scss";
import { RootState } from "../../../../store/store";
import { Typography } from "@mui/material";
import { ExtendedColumn } from "../../../../types/table-types";
import CustomTable from "./../../../../components/table/CustomTable";
import homeCopy from "../../home.copy";
import CustomButton from "../../../../components/button/CustomButton";
import { GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";

const TopLeadersList = () => {
  const navigate = useNavigate();
  const { leaderboard, loading } = useSelector(
    (state: RootState) => state.user
  );

  const transformedLeaderboardData = leaderboard.slice(0, 10).map((item) => ({
    id: item._id,
    name: item.name,
    iconImage: item.profileImage?.url,
    bidExpenditure: item.moneySpent,
    auctionsWon: item.auctionsWon,
  }));

  const BIDDER_LEADERBOARD_TABLE_FIELDS: ExtendedColumn[] = [
    {
      field: "iconImage",
      headerName: homeCopy.section3.profilePic,
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
      headerName: homeCopy.section3.username,
      flex: 1,
    },
    {
      field: "bidExpenditure",
      headerName: homeCopy.section3.bidExpenditure,
      flex: 1,
    },
    {
      field: "auctionsWon",
      headerName: homeCopy.section3.auctionsWon,
      flex: 1,
    },
  ];

  const handleButtonClick = () => {
    navigate("/leaderboard");
  };

  return (
    <div className="topLeadersList__container">
      <div className="topLeadersList__headerContainer">
        <Typography className="topLeadersList__headerTitle">
          {homeCopy.section3.title}
        </Typography>
      </div>
      <CustomTable
        columns={BIDDER_LEADERBOARD_TABLE_FIELDS}
        rows={transformedLeaderboardData}
        loading={loading}
      />
      <CustomButton
        title={homeCopy.section3.linkText}
        handleClick={handleButtonClick}
        buttonClass="topLeadersList__buttonStyle"
      />
    </div>
  );
};

export default TopLeadersList;
