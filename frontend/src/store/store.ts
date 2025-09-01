import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice'
import adminReducer from './slices/adminSlice'
import bidReducer from './slices/bidSlice'
import commissionReducer from './slices/commissionSlice'
import auctionReducer from './slices/auctionSlice'

export const store = configureStore({
    reducer:{
        admin: adminReducer,
        auction: auctionReducer,
        bid: bidReducer,
        commission: commissionReducer,
        user:userReducer,
    }
})
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;