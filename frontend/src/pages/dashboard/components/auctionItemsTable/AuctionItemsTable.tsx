import { ExtendedColumn } from "../../../../types/table-types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { useAppDispatch } from "../../../../hooks/storeHooks";
import { RootState } from "../../../../store/store";
import { deleteAuctionItem } from "../../../../store/slices/adminSlice";
import CustomTable from "../../../../components/table/CustomTable";
import dashboardCopy from "../../dashboard.copy";
import "../../dashboard-styles.scss";
import { ROUTES } from "../../../../constants/route-constants";
import { GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";

const AuctionItemsTable = () => {
  const dispatch = useAppDispatch();
  const navigateTo = useNavigate();

  const { allAuctions, loading } = useSelector(
    (state: RootState) => state.auction
  );

  const transformedAuctionsData = allAuctions.map((item: any) => ({
    id: item._id,
    title: item.title,
    image: item.image?.url,
  }));

  const DELETE_AUCTION_TABLE_FIELDS: ExtendedColumn[] = [
    {
      field: "image",
      headerName: dashboardCopy.tableFields.image,
      flex: 1,
      renderCell: (
        params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
      ) => (
        <img src={params.value} alt="icon" className="dashboard__tableImage" />
      ),
    },
    {
      field: "title",
      headerName: dashboardCopy.tableFields.title,
      type: "string",
      flex: 1,
    },
  ];

  const handleActionClick = (row: any, actionKey: string) => {
    switch (actionKey) {
      case "delete":
        dispatch(deleteAuctionItem(row.id));
        break;
      case "view":
        navigateTo(ROUTES.AUCTION_ITEM(row.id));
        break;
      default:
        break;
    }
  };

  return (
    <div className="dashboard__subContainer">
      <Typography className="dashboard__subTitle">
        {dashboardCopy.tableTitles.auctionItems}
      </Typography>
      <CustomTable
        actions={{
          delete: true,
          view: true,
        }}
        handleActionClick={handleActionClick}
        columns={DELETE_AUCTION_TABLE_FIELDS}
        rows={transformedAuctionsData}
        loading={loading}
      />
    </div>
  );
};

export default AuctionItemsTable;
