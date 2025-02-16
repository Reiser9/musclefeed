'use client';

import type { Review, ReviewDTO, ReviewPagination, ReviewSend, ReviewSendDTO } from '@/entities/review';

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

    const getAdminReviews = async (page: number, limit = 9) => {
        const response = await request<ReviewPagination>({
            url: `/admin/review?page=${page}&limit=${limit}`,
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

    const createReview = async (data: ReviewDTO, successCallback = () => {}) => {
        const response = await request<{ review: Review }>({
            url: '/admin/review/',
            method: 'POST',
            data,
            isAuth: true,
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

    const updateReview = async (reviewId: number | string, data: ReviewDTO, successCallback = () => {}) => {
        const response = await request<{ review: Review }>({
            url: `/admin/review/${reviewId}`,
            method: 'PATCH',
            data,
            isAuth: true,
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

    const getReviewById = async (reviewId: number | string) => {
        const response = await request<{ review: Review }>({
            url: `/admin/review/${reviewId}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        if ('data' in response) {
            return response.data.review;
        }
    };

    const deleteReview = async (reviewId: number | string, successCallback = () => {}) => {
        const response = await request<{ review: Review }>({
            url: `/admin/review/${reviewId}`,
            method: 'DELETE',
            isAuth: true,
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

    return {
        sendReview,
        getReviews,
        getAdminReviews,
        createReview,
        updateReview,
        getReviewById,
        deleteReview,
    };
};

export default useReviews;
