import React, { useEffect, useState } from "react";
import "./submitCommission-styles.scss";
import { Typography } from "@mui/material";
import CustomInput from "../../components/input/CustomInput";
import { InputPresets, InputVariant } from "../../constants/input-constants";
import CustomButton from "../../components/button/CustomButton";
import { useAppDispatch } from "../../hooks/storeHooks";
import { commissionProof } from "../../store/slices/commissionSlice";
import submitCommissionCopy from "./submitCommission.copy";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ROLES } from "../../constants/common-constants";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/route-constants";

const SubmitCommission = () => {
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");
  const [proofImage, setProofImage] = useState<File | null>(null);

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.user
  );
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== ROLES[0]) {
      navigateTo(ROUTES.HOME);
    }
  }, [isAuthenticated]);

  const proofHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setProofImage(file);
      };
    }
  };

  const handleSubmitCommission = () => {
    const formData = new FormData();
    formData.append("amount", amount);
    if (proofImage) {
      formData.append("proofImage", proofImage);
    }
    formData.append("comment", comment);
    dispatch(commissionProof(formData));
  };

  return (
    <div className="submitCommission__container">
      <Typography className="submitCommission__title">
        {submitCommissionCopy.uploadPaymentProof}
      </Typography>
      <div className="submitCommission__subcontainer">
        <CustomInput
          value={amount}
          handleChange={(e) => setAmount(e.target.value)}
          preset={InputPresets.Text}
          variant={InputVariant.Outlined}
          hasBorder
          label={submitCommissionCopy.amount}
          inputLabelClass="submitCommission__inputLabels"
        />
        <div className="submitCommission__proofContainer">
          <Typography className="submitCommission__proofTitle">
            {submitCommissionCopy.paymentProof}
          </Typography>
          <div>
            <input type="file" onChange={proofHandler} />
          </div>
        </div>
        <CustomInput
          handleChange={(e) => setComment(e.target.value)}
          label={submitCommissionCopy.comments}
          value={comment}
          preset={InputPresets.Text}
          variant={InputVariant.Outlined}
          hasBorder
          inputLabelClass="submitCommission__inputLabels"
        />
        <CustomButton
          handleClick={handleSubmitCommission}
          title={submitCommissionCopy.uploadPaymentProof}
          buttonClass="submitCommission__buttonStyle"
        />
      </div>
    </div>
  );
};

export default SubmitCommission;
