import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { useAppDispatch } from "../../../../hooks/storeHooks";
import { deletePaymentProof } from "../../../../store/slices/adminSlice";
import { useNavigate } from "react-router-dom";
import { ExtendedColumn } from "../../../../types/table-types";
import dashboardCopy from "../../dashboard.copy";
import { Typography } from "@mui/material";
import CustomTable from "../../../../components/table/CustomTable";
import "../../dashboard-styles.scss";
import { ROUTES } from "../../../../constants/route-constants";

const PaymentProofsTable = () => {
  const { paymentProofs, loading } = useSelector(
    (state: RootState) => state.admin
  );
  const dispatch = useAppDispatch();
  const navigateTo = useNavigate();

  const transformedPaymentProofsData = paymentProofs.map((item: any) => ({
    id: item._id,
    userId: item.userId,
    status: item.status,
  }));

  const PAYMENT_PROOFS_TABLE_FIELDS: ExtendedColumn[] = [
    {
      field: "userId",
      headerName: dashboardCopy.tableFields.userId,
      type: "string",
      flex: 1,
    },
    {
      field: "status",
      headerName: dashboardCopy.tableFields.status,
      type: "string",
      flex: 1,
    },
  ];

  const handleActionClick = (row: any, actionKey: string) => {
    switch (actionKey) {
      case "delete":
        dispatch(deletePaymentProof(row.id));
        break;
      case "edit":
        navigateTo(ROUTES.PAYMENT_DETAILS(row.id));
        break;
      default:
        break;
    }
  };

  return (
    <div className="dashboard__subContainer">
      <Typography className="dashboard__subTitle">
        {dashboardCopy.tableTitles.paymentProof}
      </Typography>
      <CustomTable
        actions={{
          delete: true,
          edit: true,
        }}
        handleActionClick={handleActionClick}
        columns={PAYMENT_PROOFS_TABLE_FIELDS}
        rows={transformedPaymentProofsData}
        loading={loading}
      />
    </div>
  );
};

export default PaymentProofsTable;
