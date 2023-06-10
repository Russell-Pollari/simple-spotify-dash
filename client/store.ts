import { createSlice, configureStore } from '@reduxjs/toolkit';

export type Token = string | null;

const initialState: Token = null;

const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        set: (state, action) => {
            state = action.payload;
        },
        unSet: state => {
            state = null;
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