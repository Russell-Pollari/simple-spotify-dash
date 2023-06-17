import { createSlice, configureStore, createAsyncThunk } from '@reduxjs/toolkit';
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

const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        mobileOpen: false,
    },
    reducers: {
        set: (state, action: PayloadAction<boolean>) => {
            state.mobileOpen = action.payload;
        }
    }
});

export const fetchFavourites = createAsyncThunk('favourites/fetchFavourites', async () => {
    const response = await fetch('/api/favourites');
    const data = await response.json();
    return data.artists;
});

const favouritesSlice = createSlice({
    name: 'favourites',
    initialState: [] as Artist[],
    reducers: {
        set: (state, action: PayloadAction<Artist[]>) => {
            state = action.payload;
            return state;
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchFavourites.fulfilled, (state, action: PayloadAction<Artist[]>) => {
            state = action.payload;
            return state;
        });
    }
});


const store = configureStore({
    reducer: {
        token: tokenSlice.reducer,
        timeRange: timeRangeSlice.reducer,
        menu: menuSlice.reducer,
        favourites: favouritesSlice.reducer,
    },
});

export const { set: setToken, unSet } = tokenSlice.actions;
export const { set: setTimeRange } = timeRangeSlice.actions;
export const { set: setMenu } = menuSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;