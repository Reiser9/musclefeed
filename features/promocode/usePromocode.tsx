'use client';

import { Promocode, PromocodePagination } from '@/entities/promocode';
import useRequest from '@/shared/hooks/useRequest';

const usePromocode = () => {
    const { request, catchRequestError, errorController } = useRequest();

    const getPromocodes = async (page: number, limit = 10) => {
        const response = await request<PromocodePagination>({
            url: `/admin/promocode?page=${page}&limit=${limit}`,
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

    const getPromocodeById = async (promocodeId: number | string) => {
        const response = await request<{ promcode: Promocode }>({
            url: `/admin/promocode/${promocodeId}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        if ('data' in response) {
            return response.data.promcode;
        }
    };

    const createPromocode = async (code: string, discount: string, successCallback = () => {}) => {
        const response = await request<{ promcode: Promocode }>({
            url: `/admin/promocode`,
            method: 'POST',
            data: {
                code,
                discount,
            },
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        successCallback();

        if ('data' in response) {
            return response.data.promcode;
        }
    };

    const updatePromocode = async (
        promocodeId: string | number,
        code: string,
        discount: string,
        successCallback = () => {},
    ) => {
        const response = await request<{ promcode: Promocode }>({
            url: `/admin/promocode/${promocodeId}`,
            method: 'PATCH',
            data: {
                code,
                discount,
            },
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        successCallback();

        if ('data' in response) {
            return response.data.promcode;
        }
    };

    const deletePromocode = async (promocodeId: string | number, successCallback = () => {}) => {
        const response = await request<{ promcode: Promocode }>({
            url: `/admin/promocode/${promocodeId}`,
            method: 'DELETE',
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        successCallback();

        if ('data' in response) {
            return response.data.promcode;
        }
    };

    const applyPromocode = async (promocode: string, price: string, successCallback = () => {}) => {
        const response = await request<{ promocode: Promocode; finalPrice: number }>({
            url: `/promocode/${promocode}?price=${price}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        successCallback();

        if ('data' in response) {
            return response.data;
        }
    };

    return {
        getPromocodes,
        getPromocodeById,
        createPromocode,
        updatePromocode,
        deletePromocode,
        applyPromocode,
    };
};

export default usePromocode;
