import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type AppStateType = {
    authIsLoading: boolean;
    isAuth: boolean;
    isVerified: boolean;
};

const initialState: AppStateType = {
    authIsLoading: true,
    isAuth: false,
    isVerified: false,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAuthIsLoading: (state, action: PayloadAction<boolean>) => {
            state.authIsLoading = action.payload;
        },
        setIsAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        },
        setIsVerified: (state, action: PayloadAction<boolean>) => {
            state.isVerified = action.payload;
        },
    },
});

export const { setIsAuth, setIsVerified, setAuthIsLoading } = appSlice.actions;

export default appSlice.reducer;
