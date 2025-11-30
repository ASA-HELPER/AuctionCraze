import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import {
  getSinglePaymentProofDetail,
  updatePaymentProof,
} from "../../../../store/slices/adminSlice";
import { useAppDispatch } from "../../../../hooks/storeHooks";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./updatePaymentProof-styles.scss";
import { Typography } from "@mui/material";
import dashboardCopy from "../../dashboard.copy";
import CustomInput from "../../../../components/input/CustomInput";
import CustomButton from "../../../../components/button/CustomButton";
import CustomDropdown from "../../../../components/dropdown/CustomDropdown";
import { statusOptions } from "../../../../constants/common-constants";
import { toast } from "react-toastify";
import { ROUTES } from "../../../../constants/route-constants";

const UpdatePaymentProof = () => {
  const { id } = useParams<{ id: string }>();
  const { singlePaymentProof, loading } = useSelector(
    (state: RootState) => state.admin
  );
  const [amount, setAmount] = useState(singlePaymentProof.amount || "");
  const [status, setStatus] = useState(singlePaymentProof.status || "");

  const dispatch = useAppDispatch();
  const navigateTo = useNavigate();

  const handlePaymentProofUpdate = () => {
    dispatch(updatePaymentProof(singlePaymentProof._id, status, amount));
    toast.success(dashboardCopy.paymentProofModal.paymentSuccess);
    navigateTo(ROUTES.DASHBOARD);
  };

  useEffect(() => {
    dispatch(getSinglePaymentProofDetail(id));
  }, [id, dispatch]);

  return (
    <div className="updatePaymentProof__container">
      <div className="updatePaymentProof__header">
        <Typography className="updatePaymentProof__title">
          {dashboardCopy.paymentProofModal.title}
        </Typography>
      </div>

      <Typography className="updatePaymentProof__subtitle">
        {dashboardCopy.paymentProofModal.subtitle}
      </Typography>

      <div className="updatePaymentProof__inputsContainer">
        <CustomInput
          handleChange={() => {}}
          value={singlePaymentProof.userId || ""}
          disabled
          label={dashboardCopy.paymentProofModal.userId}
          inputLabelClass="updatePaymentProof__inputLabel"
        />

        <CustomInput
          handleChange={(e) => setAmount(e.target.value)}
          value={amount}
          label={dashboardCopy.paymentProofModal.amount}
          isRequired
          inputLabelClass="updatePaymentProof__inputLabel"
        />

        <CustomDropdown
          data={statusOptions}
          setValue={(value) => setStatus(value)}
          placeholder={dashboardCopy.paymentProofModal.selectStatus}
          value={status}
          label={dashboardCopy.paymentProofModal.status}
          isRequired
        />

        <CustomInput
          handleChange={() => {}}
          value={singlePaymentProof.comment || ""}
          label={dashboardCopy.paymentProofModal.comment}
          disabled
          isMultiline
          inputLabelClass="updatePaymentProof__inputLabel"
        />
      </div>
      <div className="updatePaymentProof__buttonsContainer">
        <Link
          to={singlePaymentProof.proof?.url || ""}
          className="updatePaymentProof__proofButton"
          target="_blank"
        >
          {dashboardCopy.paymentProofModal.paymentProofLink}
        </Link>
        <CustomButton
          title={
            loading
              ? dashboardCopy.paymentProofModal.updatingPayment
              : dashboardCopy.paymentProofModal.title
          }
          className="updatePaymentProof__updateButton"
          handleClick={handlePaymentProofUpdate}
        />
      </div>
    </div>
  );
};

export default UpdatePaymentProof;
