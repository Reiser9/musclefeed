'use client';

import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import type { Error } from '@/api/types';
import axiosInstance from '@/api/axios';
import useAlert from './useAlert';
import { useAppSelector } from './useRedux';

type requestProps = {
    url?: string;
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    isAuth?: boolean;
    data?: object;
    headers?: object;
    baseURL?: string;
    isBlob?: boolean;
    callback?: () => void;
};

type RequestResult<T> = AxiosResponse<T> | AxiosError<Error>;

const useRequest = () => {
    const { alertNotify } = useAlert();
    const language = useAppSelector((state) => state.app.language);

    const errorController = async (
        response: AxiosResponse | AxiosError<Error>,
        errorMessage = '',
        customLogic?: () => void,
    ) => {
        if ('data' in response) {
            return;
        }

        const defaultErrorTitle = language === "ru" ? 'Ошибка' : "שגיאה";
        const defaultErrorText = language === "ru" ? 'Что-то поломалось, скоро починим': "משהו נשבר, נתקן אותו בקרוב";
        const networkErrorText = language === "ru" ? 'Сервер временно не работает' : "השרת מושבת באופן זמני";
        const accessErrorText = language === "ru" ? 'Доступ ограничен' : "הגישה מוגבלת";
        const notauthErrorText = language === "ru" ? 'Пользователь неавторизован' : "המשתמש אינו מורשה";

        switch (response.response?.status) {
            case 500:
                throw new Error(networkErrorText);
            case 403:
                alertNotify(defaultErrorTitle, accessErrorText, 'error');
                throw new Error(accessErrorText);
            case 401:
                throw new Error(notauthErrorText);
            default:
                if (customLogic) {
                    customLogic();
                } else {
                    alertNotify(
                        defaultErrorTitle,
                        errorMessage
                            ? errorMessage
                            : typeof response.response?.data.message === 'object'
                            ? response.response?.data.message[language] || defaultErrorText
                            : response.response?.data.message || defaultErrorText,
                        'error',
                    );
                }
                throw new Error(defaultErrorText);
        }
    };

    const catchRequestError = (response: AxiosResponse | AxiosError<Error>) => {
        if (!('data' in response)) {
            return true;
        }

        return false;
    };

    const request = async <T>({
        url,
        method = 'GET',
        isAuth = false,
        data = {},
        headers = {},
        baseURL = '',
        isBlob = false,
    }: requestProps): Promise<RequestResult<T>> => {
        const accessToken = isAuth ? localStorage.getItem('accessToken') : null;

        const reqHeaders: AxiosRequestConfig['headers'] = {
            'Content-Type': 'application/json',
            ...(isAuth ? { Authorization: `Bearer ${accessToken}` } : {}),
            ...headers,
        };

        try {
            const response = await axiosInstance.request({
                method,
                url,
                headers: reqHeaders,
                data,
                ...(baseURL && { baseURL }),
                ...(isBlob && { responseType: 'blob' }),
            });

            return response;
        } catch (error: any) {
            return error;
        }
    };

    return {
        request,
        errorController,
        catchRequestError,
    };
};

export default useRequest;
