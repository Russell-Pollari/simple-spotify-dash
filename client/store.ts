import { createSlice, configureStore } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type TokenState = {
    token: string | null
};

const initialState: TokenState = {
    token: null,
};

const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        set: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        unSet: state => {
            state.token = null;
        }
    }
});

const timeRangeSlice = createSlice({
    name: 'timeRange',
    initialState: {
        timeRange: 'long_term',
    },
    reducers: {
        set: (state, action: PayloadAction<string>) => {
            state.timeRange = action.payload;
        }
    }
});

const store = configureStore({
    reducer: {
        token: tokenSlice.reducer,
        timeRange: timeRangeSlice.reducer,
    },
});

export const { set, unSet } = tokenSlice.actions;
export const { set: setTimeRange } = timeRangeSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;