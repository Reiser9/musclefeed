'use client';

import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import type { Error } from '@/api/types';
import axiosInstance from '@/api/axios';

type requestProps = {
    url?: string;
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    isAuth?: boolean;
    data?: object;
    headers?: object;
    baseURL?: string;
    callback?: () => void;
};

type RequestResult<T> = AxiosResponse<T> | AxiosError<Error>;

const useRequest = () => {
    const errorController = async (
        response: AxiosResponse | AxiosError<Error>,
        errorMessage = '',
        customLogic?: () => void,
    ) => {
        if ('data' in response) {
            return;
        }

        switch (response.response?.status) {
            case 500:
                throw new Error('Сервер временно не работает');
            case 403:
                alert('Доступ ограничен');
                throw new Error('Доступ ограничен');
            default:
                if (customLogic) {
                    customLogic();
                } else {
                    alert(
                        errorMessage
                            ? errorMessage
                            : response.response?.data.message || 'Что-то поломалось, скоро починим',
                    );
                }
                throw new Error('Что-то поломалось, скоро починим');
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
