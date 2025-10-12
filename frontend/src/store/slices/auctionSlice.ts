import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { AppDispatch } from "../store";
import {
  API_URL,
  API_ROUTES_PREFIX,
  AUCTION_ITEM,
  AUCTION_ROUTES,
} from "../../constants/api-constants";
import { NewAuctionPayload } from "../../types/api-types";

const auctionSlice = createSlice({
  name: "auction",
  initialState: {
    loading: false,
    itemDetail: {},
    auctionDetail: {},
    auctionBidders: {},
    myAuctions: [],
    allAuctions: [],
  },
  reducers: {
    createAuctionRequest(state) {
      state.loading = true;
    },
    createAuctionSuccess(state) {
      state.loading = false;
    },
    createAuctionFailed(state) {
      state.loading = false;
    },
    getAllAuctionItemRequest(state) {
      state.loading = true;
    },
    getAllAuctionItemSuccess(state, action) {
      state.loading = false;
      state.allAuctions = action.payload;
    },
    getAllAuctionItemFailed(state) {
      state.loading = false;
    },
    getAuctionDetailRequest(state) {
      state.loading = true;
    },
    getAuctionDetailSuccess(state, action) {
      state.loading = false;
      state.auctionDetail = action.payload.auctionItem;
      state.auctionBidders = action.payload.bidders;
    },
    getAuctionDetailFailed(state) {
      state.loading = false;
      state.auctionDetail = state.auctionDetail;
      state.auctionBidders = state.auctionBidders;
    },
    getMyAuctionsRequest(state) {
      state.loading = true;
      state.myAuctions = [];
    },
    getMyAuctionsSuccess(state, action) {
      state.loading = false;
      state.myAuctions = action.payload;
    },
    getMyAuctionsFailed(state) {
      state.loading = false;
      state.myAuctions = [];
    },
    deleteAuctionItemRequest(state) {
      state.loading = true;
    },
    deleteAuctionItemSuccess(state) {
      state.loading = false;
    },
    deleteAuctionItemFailed(state) {
      state.loading = false;
    },
    republishItemRequest(state) {
      state.loading = true;
    },
    republishItemSuccess(state) {
      state.loading = false;
    },
    republishItemFailed(state) {
      state.loading = false;
    },

    resetSlice(state) {
      state.loading = false;
      state.auctionDetail = state.auctionDetail;
      state.itemDetail = state.itemDetail;
      state.myAuctions = state.myAuctions;
      state.allAuctions = state.allAuctions;
    },
  },
});

export const createAuction =
  (data: NewAuctionPayload) => async (dispatch: AppDispatch) => {
    dispatch(auctionSlice.actions.createAuctionRequest());
    try {
      const response = await axios.post(
        `${API_URL}/${API_ROUTES_PREFIX}/${AUCTION_ITEM}/${AUCTION_ROUTES.CREATE}`,
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      dispatch(auctionSlice.actions.createAuctionSuccess());
      toast.success(response.data.message);
      dispatch(auctionSlice.actions.resetSlice());
    } catch (error: any) {
      dispatch(auctionSlice.actions.createAuctionFailed());
      toast.error(error.response.data.message);
      dispatch(auctionSlice.actions.resetSlice());
    }
  };

export const republishAuction =
  (data: NewAuctionPayload, id: Number) => async (dispatch: AppDispatch) => {
    dispatch(auctionSlice.actions.republishItemRequest());
    try {
      const response = await axios.put(
        `${API_URL}/${API_ROUTES_PREFIX}/${AUCTION_ITEM}/${AUCTION_ROUTES.REPUBLISH_ITEM}/${id}`,
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      dispatch(auctionSlice.actions.republishItemSuccess());
      toast.success(response.data.message);
      dispatch(auctionSlice.actions.resetSlice());
    } catch (error: any) {
      dispatch(auctionSlice.actions.republishItemFailed());
      toast.error(error.response.data.message);
      dispatch(auctionSlice.actions.resetSlice());
    }
  };

export const deleteAuction = (id: Number) => async (dispatch: AppDispatch) => {
  dispatch(auctionSlice.actions.deleteAuctionItemRequest());
  try {
    const response = await axios.delete(
      `${API_URL}/${API_ROUTES_PREFIX}/${AUCTION_ITEM}/${AUCTION_ROUTES.DELETE_ITEM}/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch(auctionSlice.actions.deleteAuctionItemSuccess());
    toast.success(response.data.message);
    dispatch(auctionSlice.actions.resetSlice());
  } catch (error: any) {
    dispatch(auctionSlice.actions.deleteAuctionItemFailed());
    toast.error(error.response.data.message);
    dispatch(auctionSlice.actions.resetSlice());
  }
};

export const getAllAuctionItems = () => async (dispatch: AppDispatch) => {
  dispatch(auctionSlice.actions.getAllAuctionItemRequest());
  try {
    const response = await axios.get(
      `${API_URL}/${API_ROUTES_PREFIX}/${AUCTION_ITEM}/${AUCTION_ROUTES.ALL_ITEMS}`,
      {
        withCredentials: true,
      }
    );
    dispatch(
      auctionSlice.actions.getAllAuctionItemSuccess(response.data.items)
    );
    toast.success(response.data.message);
    dispatch(auctionSlice.actions.resetSlice());
  } catch (error: any) {
    dispatch(auctionSlice.actions.getAllAuctionItemFailed());
    toast.error(error.response.data.message);
    dispatch(auctionSlice.actions.resetSlice());
  }
};

export const getMyAuctionItems = () => async (dispatch: AppDispatch) => {
  dispatch(auctionSlice.actions.getMyAuctionsRequest());
  try {
    const response = await axios.get(
      `${API_URL}/${API_ROUTES_PREFIX}/${AUCTION_ITEM}/${AUCTION_ROUTES.MY_ITEMS}`,
      {
        withCredentials: true,
      }
    );
    dispatch(auctionSlice.actions.getMyAuctionsSuccess(response.data.items));
    toast.success(response.data.message);
    dispatch(auctionSlice.actions.resetSlice());
  } catch (error: any) {
    dispatch(auctionSlice.actions.getMyAuctionsFailed());
    toast.error(error.response.data.message);
    dispatch(auctionSlice.actions.resetSlice());
  }
};

export const getAuctionDetail =
  (id: String) => async (dispatch: AppDispatch) => {
    dispatch(auctionSlice.actions.getAuctionDetailRequest());
    try {
      const response = await axios.get(
        `${API_URL}/${API_ROUTES_PREFIX}/${AUCTION_ITEM}/${AUCTION_ROUTES.AUCTION_DETAILS}/${id}`,
        {
          withCredentials: true,
        }
      );
      dispatch(auctionSlice.actions.getAuctionDetailSuccess(response.data));
      toast.success(response.data.message);
      dispatch(auctionSlice.actions.resetSlice());
    } catch (error: any) {
      dispatch(auctionSlice.actions.getAuctionDetailFailed());
      toast.error(error.response.data.message);
      dispatch(auctionSlice.actions.resetSlice());
    }
  };

export default auctionSlice.reducer;
