import { createSlice, configureStore } from '@reduxjs/toolkit';
import { To } from 'react-router-dom';

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
        set: (state, action) => {
            state.token = action.payload;
        },
        unSet: state => {
            state.token = null;
        }
    }
});

const store = configureStore({
    reducer: tokenSlice.reducer
});

export const { set, unSet } = tokenSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;