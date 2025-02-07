'use client';

import React from 'react';

import type { RegisterDTO, AuthResponse, LoginDTO, ChangePasswordDTO } from '@/entities/user/auth';
import useRequest from '@/shared/hooks/useRequest';
import useAlert from '@/shared/hooks/useAlert';
import { useAppDispatch } from '@/shared/hooks/useRedux';
import { setIsAuth, setIsVerified } from '@/store/slices/app';

const useAuth = () => {
    const [authIsLoading, setAuthIsLoading] = React.useState(false);

    const { request, catchRequestError, errorController } = useRequest();
    const dispatch = useAppDispatch();
    const { alertNotify } = useAlert();

    const register = async (data: RegisterDTO, successCallback = () => {}) => {
        setAuthIsLoading(true);
        const response = await request<AuthResponse>({ url: '/auth/register', method: 'POST', data }).finally(() => {
            setAuthIsLoading(false);
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            dispatch(setIsAuth(true));
            dispatch(setIsVerified(response.data.user.isVerified));
            localStorage.setItem('accessToken', response.data.accessToken);
        }

        alertNotify('Успешно', 'Вы зарегистрировались');
        successCallback();
    };

    const login = async (data: LoginDTO, successCallback = () => {}) => {
        setAuthIsLoading(true);
        const response = await request<AuthResponse>({ url: '/auth/login', method: 'POST', data }).finally(() => {
            setAuthIsLoading(false);
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            dispatch(setIsAuth(true));
            dispatch(setIsVerified(response.data.user.isVerified));
            localStorage.setItem('accessToken', response.data.accessToken);
        }

        alertNotify('Успешно', 'Вы авторизовались');
        successCallback();
    };

    const verifyEmail = async (code: string, successCallback = () => {}) => {
        setAuthIsLoading(true);
        const response = await request({
            url: '/auth/verify-email',
            method: 'POST',
            data: { code },
            isAuth: true,
        }).finally(() => {
            setAuthIsLoading(false);
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        dispatch(setIsVerified(true));
        alertNotify('Успешно', 'Вы верифицировали аккаунт');
        successCallback();
    };

    const logout = async (successCallback = () => {}) => {
        setAuthIsLoading(true);
        const response = await request<AuthResponse>({ url: '/auth/logout' }).finally(() => {
            setAuthIsLoading(false);
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        dispatch(setIsAuth(false));
        dispatch(setIsVerified(false));
        localStorage.removeItem('accessToken');
        alertNotify('Успешно', 'Вы вышли с аккаунта');
        successCallback();
    };

    const resendVerifyCode = async (successCallback = () => {}) => {
        const response = await request<AuthResponse>({ url: '/auth/resend-verification', isAuth: true });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        alertNotify('Успешно', 'Код верификации выслан повторно');
        successCallback();
    };

    const sendRecoveryCode = async (email: string, successCallback = () => {}) => {
        const response = await request({
            url: '/auth/send-recovery',
            method: 'POST',
            data: {
                email,
            },
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        alertNotify('Успешно', 'Код для восстановления пароля отправлен');
        successCallback();
    };

    const verifyRecoveryCode = async (email: string, code: string, successCallback = () => {}) => {
        const response = await request<{ code: string }>({
            url: '/auth/verify-recovery',
            method: 'POST',
            data: {
                email,
                code,
            },
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        alertNotify('Успешно', 'Код для восстановления пароля подтвержден');
        successCallback();

        if ('data' in response) {
            return response.data.code;
        }
    };

    const changeRecoveryPassword = async (
        email: string,
        code: string,
        password: string,
        successCallback = () => {},
    ) => {
        const response = await request({
            url: '/auth/recovery-password',
            method: 'POST',
            data: {
                email,
                code,
                password,
            },
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        alertNotify('Успешно', 'Пароль успешно изменен');
        successCallback();
    };

    const changePassword = async (data: ChangePasswordDTO, successCallback = () => {}) => {
        const response = await request({
            url: '/auth/change-password',
            method: 'POST',
            data,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        alertNotify('Успешно', 'Пароль успешно изменен');
        successCallback();
    };

    return {
        authIsLoading,
        register,
        login,
        verifyEmail,
        logout,
        resendVerifyCode,
        sendRecoveryCode,
        verifyRecoveryCode,
        changeRecoveryPassword,
        changePassword,
    };
};

export default useAuth;
