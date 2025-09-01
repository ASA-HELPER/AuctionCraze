import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import {
  API_ROUTES_PREFIX,
  API_URL,
  LOGIN,
  LOGOUT,
  USER,
  REGISTER,
  LEADERBOARD,
} from "../../constants/api-constants";
import { AppDispatch } from "../store";
import { IRegisterPayload, ILoginPayload } from "../../types/api-types";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: {},
    leaderboard: [],
  },
  reducers: {
    registerRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    registerFailed(state) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
    },
    loginRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    loginFailed(state) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
    },
    fetchUserRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
    },
    fetchUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    fetchUserFailed(state) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
    },
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.user = {};
    },
    logoutFailed(state) {
      state.loading = false;
      state.isAuthenticated = state.isAuthenticated;
      state.user = state.user;
    },
    fetchLeaderboardRequest(state) {
      state.loading = true;
      state.leaderboard = [];
    },
    fetchLeaderboardSuccess(state, action) {
      state.loading = false;
      state.leaderboard = action.payload;
    },
    fetchLeaderboardFailed(state) {
      state.loading = false;
      state.leaderboard = [];
    },
    clearAllErrors(state) {
      state.user = state.user;
      state.isAuthenticated = state.isAuthenticated;
      state.loading = false;
    },
  },
});

export const register =
  (data: IRegisterPayload) => async (dispatch: AppDispatch) => {
    dispatch(userSlice.actions.registerRequest());
    try {
      const response = await axios.post(
        `${API_URL}/${API_ROUTES_PREFIX}/${USER}/${REGISTER}`,
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      dispatch(userSlice.actions.registerSuccess(response.data.user));
      toast.success(response.data.message);
      dispatch(userSlice.actions.clearAllErrors());
    } catch (error: any) {
      dispatch(userSlice.actions.registerFailed());
      toast.error(error.response.data.message);
      dispatch(userSlice.actions.clearAllErrors());
    }
  };

export const login = (data: ILoginPayload) => async (dispatch: AppDispatch) => {
  dispatch(userSlice.actions.loginRequest());
  try {
    const response = await axios.post(
      `${API_URL}/${API_ROUTES_PREFIX}/${USER}/${LOGIN}`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(userSlice.actions.loginSuccess(response.data.user));
    toast.success(response.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error: any) {
    dispatch(userSlice.actions.loginFailed(error.response.data.message));
    toast.error(error.response.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  }
};

export const logout = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(
      `${API_URL}/${API_ROUTES_PREFIX}/${USER}/${LOGOUT}`,
      { withCredentials: true }
    );
    dispatch(userSlice.actions.logoutSuccess(response.data.message));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error: any) {
    dispatch(userSlice.actions.logoutFailed(error.response.data.message));
    dispatch(userSlice.actions.clearAllErrors());
  }
};

export const fetchLeaderboard = () => async (dispatch: AppDispatch) => {
  dispatch(userSlice.actions.fetchLeaderboardRequest());
  try {
    const response = await axios.get(
      `${API_URL}/${API_ROUTES_PREFIX}/${USER}/${LEADERBOARD}`,
      { withCredentials: true }
    );
    dispatch(userSlice.actions.fetchLeaderboardSuccess(response.data.leaderboard));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error: any) {
    dispatch(userSlice.actions.fetchLeaderboardFailed());
    dispatch(userSlice.actions.clearAllErrors());
  }
};

export default userSlice.reducer;
