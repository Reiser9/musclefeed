'use client';

import type { FaqCategoryDTO, FaqCategoryItem, FaqDTO, FaqItem } from '@/entities/faq';
import useRequest from '@/shared/hooks/useRequest';

const useFaq = () => {
    const { request, catchRequestError, errorController } = useRequest();

    const getFaq = async (faqCategoryId?: number | string) => {
        const response = await request<{ faq: FaqItem[] }>({
            url: `/faq?faq_category_id=${faqCategoryId}`,
            method: 'GET',
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        if ('data' in response) {
            return response.data.faq;
        }
    };

    const getFaqCategories = async () => {
        const response = await request<{ faqCategories: FaqCategoryItem[] }>({
            url: '/faq/category',
            method: 'GET',
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        if ('data' in response) {
            return response.data.faqCategories;
        }
    };

    const createFaqCategory = async (data: FaqCategoryDTO, successCallback = () => {}) => {
        const response = await request<{ faqCategory: FaqCategoryItem }>({
            url: '/admin/faq/category',
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
            return response.data.faqCategory;
        }
    };

    const updateFaqCategory = async (faqId: number | string, data: FaqCategoryDTO, successCallback = () => {}) => {
        const response = await request<{ faqCategory: FaqCategoryItem }>({
            url: `/admin/faq/category/${faqId}`,
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
            return response.data.faqCategory;
        }
    };

    const deleteFaqCategory = async (faqId: number | string, successCallback = () => {}) => {
        const response = await request<{ faqCategory: FaqCategoryItem }>({
            url: `/admin/faq/category/${faqId}`,
            method: 'DELETE',
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        successCallback();

        if ('data' in response) {
            return response.data.faqCategory;
        }
    };

    const getFaqCategoryById = async (faqId: number | string) => {
        const response = await request<{ faqCategory: FaqCategoryItem }>({
            url: `/admin/faq/category/${faqId}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        if ('data' in response) {
            return response.data.faqCategory;
        }
    };

    const createFaq = async (data: FaqDTO, successCallback = () => {}) => {
        const response = await request<{ faq: FaqItem }>({
            url: '/admin/faq',
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
            return response.data.faq;
        }
    };

    const updateFaq = async (faqId: string | number, data: FaqDTO, successCallback = () => {}) => {
        const response = await request<{ faq: FaqItem }>({
            url: `/admin/faq/${faqId}`,
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
            return response.data.faq;
        }
    };

    const getFaqById = async (faqId: string | number) => {
        const response = await request<{ faq: FaqItem }>({
            url: `/admin/faq/${faqId}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        if ('data' in response) {
            return response.data.faq;
        }
    };

    const deleteFaqById = async (faqId: string | number, successCallback = () => {}) => {
        const response = await request<{ faq: FaqItem }>({
            url: `/admin/faq/${faqId}`,
            method: 'DELETE',
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        successCallback();

        if ('data' in response) {
            return response.data.faq;
        }
    };

    return {
        getFaq,
        getFaqCategories,
        createFaqCategory,
        updateFaqCategory,
        deleteFaqCategory,
        getFaqCategoryById,
        createFaq,
        updateFaq,
        getFaqById,
        deleteFaqById,
    };
};

export default useFaq;
