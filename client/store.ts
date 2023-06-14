import { createSlice, configureStore } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { SpotifyToken, TimeRange, Artist } from './types';

const initialState: SpotifyToken = {
    access_token: null,
};

const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        set: (state, action: PayloadAction<string>) => {
            console.log('set token', action.payload);
            state.access_token = action.payload;
        },
        unSet: state => {
            state.access_token = null;
        }
    }
});

const timeRangeSlice = createSlice({
    name: 'timeRange',
    initialState: 'long_term' as TimeRange,
    reducers: {
        set: (state, action: PayloadAction<TimeRange>) => {
            state = action.payload;
            return state;
        }
    }
});


const store = configureStore({
    reducer: {
        token: tokenSlice.reducer,
        timeRange: timeRangeSlice.reducer,
    },
});

export const { set: setToken, unSet } = tokenSlice.actions;
export const { set: setTimeRange } = timeRangeSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;