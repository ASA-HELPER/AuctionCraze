import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import {
  getSinglePaymentProofDetail,
  updatePaymentProof,
} from "../../../../store/slices/adminSlice";
import { useAppDispatch } from "../../../../hooks/storeHooks";
import { useParams } from "react-router-dom";
import "./updatePaymentProof-styles.scss";

const UpdatePaymentProof = () => {
  const { id } = useParams<{ id: string }>();
  const { singlePaymentProof, loading } = useSelector(
    (state: RootState) => state.admin
  );
  const [amount, setAmount] = useState(singlePaymentProof.amount || "");
  const [status, setStatus] = useState(singlePaymentProof.status || "");

  const dispatch = useAppDispatch();
  const handlePaymentProofUpdate = () => {
    dispatch(updatePaymentProof(singlePaymentProof._id, status, amount));
  };

  useEffect(() => {
    dispatch(getSinglePaymentProofDetail(id));
  }, [id, dispatch]);

  return (
    <div className="updatePaymentProof__container">UpdatePaymentProof</div>
  );
};

export default UpdatePaymentProof;
