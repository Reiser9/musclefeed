'use client';

import React from 'react';

import { useCheckAuth } from '@/features/user';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/useRedux';

import { Preloader } from '@/shared/ui/Preloader';
import { setLanguage } from '@/store/slices/app';

const InitialWrapper = ({ children }: { children: React.ReactNode }) => {
    const authIsLoading = useAppSelector((state) => state.app.authIsLoading);
    const dispatch = useAppDispatch();

    useCheckAuth();

    React.useEffect(() => {
        const currentLanguage = (localStorage.getItem('language') as 'ru') || 'he';

        if (!currentLanguage) {
            localStorage.setItem('language', 'ru');
            dispatch(setLanguage('ru'));
        } else {
            dispatch(setLanguage(currentLanguage));
        }
    }, []);

    if (authIsLoading) {
        return <Preloader fill />;
    }

    return children;
};

export default InitialWrapper;
