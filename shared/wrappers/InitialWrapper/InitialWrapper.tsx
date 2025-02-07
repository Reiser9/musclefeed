'use client';

import React from 'react';

import { useCheckAuth } from '@/features/user';
import { useAppSelector } from '@/shared/hooks/useRedux';

import { Preloader } from '@/shared/ui/Preloader';

const InitialWrapper = ({ children }: { children: React.ReactNode }) => {
    const authIsLoading = useAppSelector(state => state.app.authIsLoading);

    useCheckAuth();

    if(authIsLoading){
        return <Preloader fill />
    }

    return children;
};

export default InitialWrapper;
