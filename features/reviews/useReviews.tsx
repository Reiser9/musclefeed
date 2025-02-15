'use client';

import type { ReviewPagination, ReviewSend, ReviewSendDTO } from '@/entities/review';

import useRequest from '@/shared/hooks/useRequest';

const useReviews = () => {
    const { request, catchRequestError, errorController } = useRequest();

    const sendReview = async (data: ReviewSendDTO, successCallback = () => {}) => {
        const response = await request<{ review: ReviewSend }>({
            url: '/review',
            method: 'POST',
            data,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        successCallback();

        if ('data' in response) {
            return response.data.review;
        }
    };

    const getReviews = async (page: number, limit = 9) => {
        const response = await request<ReviewPagination>({
            url: `/review?page=${page}&limit=${limit}`,
            method: 'GET',
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const getAdminReviews = async (page: number, limit = 9, published = false) => {
        const response = await request<ReviewPagination>({
            url: `/admin/review?page=${page}&limit=${limit}&published=${published}`,
            method: 'GET',
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        if ('data' in response) {
            return response.data;
        }
    };

    return {
        sendReview,
        getReviews,
        getAdminReviews,
    };
};

export default useReviews;
