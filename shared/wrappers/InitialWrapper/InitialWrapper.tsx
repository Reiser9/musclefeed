'use client';

import React from 'react';

import { useCheckAuth } from '@/features/user';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/useRedux';

import { Preloader } from '@/shared/ui/Preloader';
import { setLanguage } from '@/store/slices/app';

const InitialWrapper = ({ children, lang }: { children: React.ReactNode; lang: 'ru' | 'he' }) => {
    const authIsLoading = useAppSelector((state) => state.app.authIsLoading);
    const dispatch = useAppDispatch();

    useCheckAuth();

    React.useEffect(() => {
        dispatch(setLanguage(lang || 'ru'));
    }, []);

    if (authIsLoading) {
        return <Preloader fill />;
    }

    return children;
};

export default InitialWrapper;
