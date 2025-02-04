'use client';

import axios, { AxiosInstance, isAxiosError } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    timeout: 15000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    async (req) => {
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
            return req;
        }

        try {
            // Проверить токен на срок жизни

            return req;
        } catch (error) {
            console.log(error);
            
            // Обработка тухлого токена
        }

        return req;
    },
    (error) => {
        console.log('Request interceptor error:', error);
        return Promise.reject(error);
    },
);

export default axiosInstance;
