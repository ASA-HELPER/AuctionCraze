import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { PlaceBidPayload } from "../../types/api-types";
import { AppDispatch } from "../store";
import {
  API_URL,
  API_ROUTES_PREFIX,
  BID,
  BID_ROUTES,
} from "../../constants/api-constants";

const bidSlice = createSlice({
  name: "bid",
  initialState: {
    loading: false,
  },
  reducers: {
    bidRequest(state) {
      state.loading = true;
    },
    bidSuccess(state) {
      state.loading = false;
    },
    bidFailed(state) {
      state.loading = false;
    },
  },
});

export const placeBid =
  (data: PlaceBidPayload, id: number) => async (dispatch: AppDispatch) => {
    dispatch(bidSlice.actions.bidRequest());
    try {
      const response = await axios.post(
        `${API_URL}/${API_ROUTES_PREFIX}/${BID}/${BID_ROUTES.PLACE_BID}/${id}`,
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch(bidSlice.actions.bidSuccess());
      toast.success(response.data.message);
    } catch (error: any) {
      dispatch(bidSlice.actions.bidFailed());
      toast.error(error.response.data.message);
    }
  };

export default bidSlice.reducer;
