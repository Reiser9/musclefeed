'use client';

import React from 'react';

import type { RegisterDTO, AuthResponse, LoginDTO, ChangePasswordDTO } from '@/entities/user/auth';
import useRequest from '@/shared/hooks/useRequest';
import useAlert from '@/shared/hooks/useAlert';
import { useAppDispatch } from '@/shared/hooks/useRedux';
import { setIsAuth, setIsVerified } from '@/store/slices/app';

const successTitleRu = "Успешно";
const successTitleHe = "בהצלחה";

const useAuth = () => {
    const [authIsLoading, setAuthIsLoading] = React.useState(false);

    const { request, catchRequestError, errorController } = useRequest();
    const dispatch = useAppDispatch();
    const { alertNotify } = useAlert();

    const register = async (lang: "ru" | "he" = "ru", data: RegisterDTO, successCallback = () => {}) => {
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

        const title = lang === "ru" ? successTitleRu : successTitleHe;
        const message = lang === "ru" ? "Вы зарегистрировались" : "נרשמת";

        alertNotify(title, message);
        successCallback();
    };

    const login = async (lang: "ru" | "he" = "ru", data: LoginDTO, successCallback = () => {}) => {
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

        const title = lang === "ru" ? successTitleRu : successTitleHe;
        const message = lang === "ru" ? "Вы авторизовались" : "אתה מחובר";

        alertNotify(title, message);
        successCallback();
    };

    const verifyEmail = async (lang: "ru" | "he" = "ru", code: string, successCallback = () => {}) => {
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

        const title = lang === "ru" ? successTitleRu : successTitleHe;
        const message = lang === "ru" ? "Вы верифицировали аккаунт" : "אימתת את החשבון";

        alertNotify(title, message);
        successCallback();
    };

    const logout = async (lang: "ru" | "he" = "ru", successCallback = () => {}) => {
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
        const title = lang === "ru" ? successTitleRu : successTitleHe;
        const message = lang === "ru" ? "Вы вышли с аккаунта" : "יצאת מהחשבון";

        alertNotify(title, message);
        successCallback();
    };

    const resendVerifyCode = async (lang: "ru" | "he" = "ru", successCallback = () => {}) => {
        const response = await request<AuthResponse>({ url: '/auth/resend-verification', isAuth: true });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        const title = lang === "ru" ? successTitleRu : successTitleHe;
        const message = lang === "ru" ? "Код верификации выслан повторно" : "קוד האימות נשלח שוב";

        alertNotify(title, message);
        successCallback();
    };

    const sendRecoveryCode = async (lang: "ru" | "he" = "ru", email: string, successCallback = () => {}) => {
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

        const title = lang === "ru" ? successTitleRu : successTitleHe;
        const message = lang === "ru" ? "Код для восстановления пароля отправлен" : "קוד לשחזור סיסמה נשלח";

        alertNotify(title, message);
        successCallback();
    };

    const verifyRecoveryCode = async (lang: "ru" | "he" = "ru", email: string, code: string, successCallback = () => {}) => {
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

        const title = lang === "ru" ? successTitleRu : successTitleHe;
        const message = lang === "ru" ? "Код для восстановления пароля подтвержден" : "קוד לשחזור סיסמה אושר";

        alertNotify(title, message);
        successCallback();

        if ('data' in response) {
            return response.data.code;
        }
    };

    const changeRecoveryPassword = async (
        lang: "ru" | "he" = "ru",
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

        const title = lang === "ru" ? successTitleRu : successTitleHe;
        const message = lang === "ru" ? "Пароль успешно изменен" : "הסיסמה שונתה בהצלחה";

        alertNotify(title, message);
        successCallback();
    };

    const changePassword = async (lang: "ru" | "he" = "ru", data: ChangePasswordDTO, successCallback = () => {}) => {
        const response = await request({
            url: '/auth/change-password',
            method: 'POST',
            data,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        const title = lang === "ru" ? successTitleRu : successTitleHe;
        const message = lang === "ru" ? "Пароль успешно изменен" : "הסיסמה שונתה בהצלחה";

        alertNotify(title, message);
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
