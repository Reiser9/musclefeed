'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import type { RegisterDTO, RegisterResponse } from '@/entities/user/auth';
import useRequest from '@/shared/hooks/useRequest';

const useAuth = () => {
    const [authIsLoading, setAuthIsLoading] = React.useState(false);

    const { request, catchRequestError, errorController } = useRequest();
    const router = useRouter();

    const register = async (data: RegisterDTO, successCallback = () => {}) => {
        setAuthIsLoading(true);
        const response = await request<RegisterResponse>({ url: '/auth/register', method: 'POST', data }).finally(
            () => {
                setAuthIsLoading(false);
            },
        );

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            // dispatch(setIsAuth(true));
            localStorage.setItem('accessToken', response.data.accessToken);
        }

        console.log('Вы зарегистрировались');
        successCallback();

        router.push('/');
    };

    return {
        authIsLoading,
        register,
    };
};

export default useAuth;
