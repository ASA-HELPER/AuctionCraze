import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { AppDispatch } from "../store";
import { ProofOfCommissionPayload } from "../../types/api-types";
import {
  API_ROUTES_PREFIX,
  API_URL,
  COMMISSION,
  COMMISSION_ROUTES,
} from "../../constants/api-constants";

const commissionSlice = createSlice({
  name: "commission",
  initialState: {
    loading: false,
  },
  reducers: {
    postCommissionProofRequest(state) {
      state.loading = true;
    },
    postCommissionProofSuccess(state) {
      state.loading = false;
    },
    postCommissionProofFailed(state) {
      state.loading = false;
    },
  },
});

export const commissionProof =
  (data: ProofOfCommissionPayload) => async (dispatch: AppDispatch) => {
    dispatch(commissionSlice.actions.postCommissionProofRequest());
    try {
      const response = await axios.post(
        `${API_URL}/${API_ROUTES_PREFIX}/${COMMISSION}/${COMMISSION_ROUTES.PROOF}`,
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      dispatch(commissionSlice.actions.postCommissionProofSuccess());
      toast.success(response.data.message);
    } catch (error: any) {
      dispatch(commissionSlice.actions.postCommissionProofFailed());
      toast.error(error.response.data.message);
    }
  };

export default commissionSlice.reducer;
