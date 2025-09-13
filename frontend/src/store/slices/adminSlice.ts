import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  API_URL,
  API_ROUTES_PREFIX,
  ADMIN,
  ADMIN_ROUTES,
} from "../../constants/api-constants";
import { AppDispatch } from "../store";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    loading: false,
    monthlyRevenue: [],
    totalAuctioneers: [],
    totalBidders: [],
    paymentProofs: [],
    singlePaymentProof: {},
  },
  reducers: {
    requestForMonthlyRevenue(state) {
      state.loading = true;
      state.monthlyRevenue = [];
    },
    successForMonthlyRevenue(state, action) {
      state.loading = false;
      state.monthlyRevenue = action.payload;
    },
    failedForMonthlyRevenue(state) {
      state.loading = false;
      state.monthlyRevenue = [];
    },
    requestForAllUsers(state) {
      state.loading = true;
      state.totalAuctioneers = [];
      state.totalBidders = [];
    },
    successForAllUsers(state, action) {
      state.loading = false;
      state.totalAuctioneers = action.payload.auctioneersArray;
      state.totalBidders = action.payload.biddersArray;
    },
    failureForAllUsers(state) {
      state.loading = false;
      state.totalAuctioneers = [];
      state.totalBidders = [];
    },
    requestForPaymentProofs(state) {
      state.loading = true;
      state.paymentProofs = [];
    },
    successForPaymentProofs(state, action) {
      state.loading = false;
      state.paymentProofs = action.payload;
    },
    failureForPaymentProofs(state) {
      state.loading = false;
      state.paymentProofs = [];
    },
    requestForDeletePaymentProof(state) {
      state.loading = true;
    },
    successForDeletePaymentProof(state) {
      state.loading = false;
    },
    failureForDeletePaymentProof(state) {
      state.loading = false;
    },
    requestForSinglePaymentProofDetail(state) {
      state.loading = true;
      state.singlePaymentProof = {};
    },
    successForSinglePaymentProofDetail(state, action) {
      state.loading = false;
      state.singlePaymentProof = action.payload;
    },
    failureForSinglePaymentProofDetail(state) {
      state.loading = false;
      state.singlePaymentProof = {};
    },
    requestForUpdatePaymentProof(state) {
      state.loading = true;
    },
    successForUpdatePaymentProof(state) {
      state.loading = false;
    },
    failureForUpdatePaymentProof(state) {
      state.loading = false;
    },
    requestForAuctionItemDelete(state) {
      state.loading = true;
    },
    successForAuctionItemDelete(state) {
      state.loading = false;
    },
    failureForAuctionItemDelete(state) {
      state.loading = false;
    },
    clearAllErrors(state) {
      state.loading = false;
      state.monthlyRevenue = state.monthlyRevenue;
      state.paymentProofs = state.paymentProofs;
      state.totalAuctioneers = state.totalAuctioneers;
      state.totalBidders = state.totalBidders;
      state.singlePaymentProof = {};
    },
  },
});

export const getMonthlyRevenue = () => async (dispatch: AppDispatch) => {
  dispatch(adminSlice.actions.requestForMonthlyRevenue());
  try {
    const response = await axios.get(
      `${API_URL}/${API_ROUTES_PREFIX}/${ADMIN}/${ADMIN_ROUTES.GET_MONTHLY_REVENUE}`,
      { withCredentials: true }
    );
    dispatch(
      adminSlice.actions.successForMonthlyRevenue(
        response.data.totalMonthlyRevenue
      )
    );
  } catch (error: any) {
    dispatch(adminSlice.actions.failedForMonthlyRevenue());
    console.error(error.response.data.message);
  }
};

export const getAllUsers = () => async (dispatch: AppDispatch) => {
  dispatch(adminSlice.actions.requestForAllUsers());
  try {
    const response = await axios.get(
      `${API_URL}/${API_ROUTES_PREFIX}/${ADMIN}/${ADMIN_ROUTES.GET_ALL_USERS}`,
      { withCredentials: true }
    );
    dispatch(adminSlice.actions.successForAllUsers(response.data));
  } catch (error: any) {
    dispatch(adminSlice.actions.failureForAllUsers());
    console.error(error.response.data.message);
  }
};

export const getAllPaymentProofs = () => async (dispatch: AppDispatch) => {
  dispatch(adminSlice.actions.requestForPaymentProofs());
  try {
    const response = await axios.get(
      `${API_URL}/${API_ROUTES_PREFIX}/${ADMIN}/${ADMIN_ROUTES.GET_ALL_PAYMENT_PROOFS}`,
      { withCredentials: true }
    );
    dispatch(
      adminSlice.actions.successForPaymentProofs(response.data.paymentProofs)
    );
  } catch (error: any) {
    dispatch(adminSlice.actions.failureForPaymentProofs());
    console.error(error.response.data.message);
  }
};

export const getSinglePaymentProofDetail =
  (id: number) => async (dispatch: AppDispatch) => {
    dispatch(adminSlice.actions.requestForSinglePaymentProofDetail());
    try {
      const response = await axios.get(
        `${API_URL}/${API_ROUTES_PREFIX}/${ADMIN}/${ADMIN_ROUTES.GET_PAYMENT_PROOF_DETAIL}/${id}`,
        { withCredentials: true }
      );
      dispatch(
        adminSlice.actions.successForSinglePaymentProofDetail(
          response.data.paymentProofDetail
        )
      );
    } catch (error: any) {
      dispatch(adminSlice.actions.failureForSinglePaymentProofDetail());
      console.error(error.response.data.message);
    }
  };

export default adminSlice.reducer;
