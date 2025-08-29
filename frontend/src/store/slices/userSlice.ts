import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { API_ROUTES_PREFIX, API_URL, LOGIN, USER } from "../../constants/api-constants";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: {},
    leaderboard:[]
  },
  reducers: {
    registerRequest(state, _action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    registerFailed(state, _action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
    },
    loginRequest(state, _action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    loginFailed(state, _action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
    },
    fetchUserRequest(state, _action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
    },
    fetchUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    fetchUserFailed(state, _action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
    },
    logoutSuccess(state, _action) {
      state.isAuthenticated = false;
      state.user = {};
    },
    logoutFailed(state, _action) {
      state.loading = false;
      state.isAuthenticated = state.isAuthenticated;
      state.user = state.user;
    },
    fetchLeaderboardRequest(state, _action) {
      state.loading = true;
      state.leaderboard = [];
    },
    fetchLeaderboardSuccess(state, action) {
      state.loading = false;
      state.leaderboard = action.payload;
    },
    fetchLeaderboardFailed(state, _action) {
      state.loading = false;
      state.leaderboard = [];
    },
    clearAllErrors(state, _action) {
      state.user = state.user;
      state.isAuthenticated = state.isAuthenticated;
      state.loading = false;
    },
  },
});

export default userSlice.reducer;