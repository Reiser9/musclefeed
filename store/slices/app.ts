import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type AppStateType = {
    authIsLoading: boolean;
    isAuth: boolean;
    isVerified: boolean;
    language: 'ru' | 'he';
};

const initialState: AppStateType = {
    authIsLoading: true,
    isAuth: false,
    isVerified: false,
    language: 'ru',
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
        setLanguage: (state, action: PayloadAction<'ru' | 'he'>) => {
            state.language = action.payload;
        },
    },
});

export const { setIsAuth, setIsVerified, setAuthIsLoading, setLanguage } = appSlice.actions;

export default appSlice.reducer;
