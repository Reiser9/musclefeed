import { configureStore } from '@reduxjs/toolkit';

import notifySlice from './slices/notify';
import appSlice from './slices/app';

const store = configureStore({
    reducer: {
        notify: notifySlice,
        app: appSlice,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
