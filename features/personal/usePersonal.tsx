'use client';

import { DishPagination } from '@/entities/dish';
import type { Order, OrderIndiDTO, OrderPagination } from '@/entities/order';
import useRequest from '@/shared/hooks/useRequest';

const usePersonal = () => {
    const { request, catchRequestError, errorController } = useRequest();

    const getDishesIndi = async (date: string, page: number, limit = 10, search: string, dishTypeId?: number | string) => {
        const response = await request<DishPagination>({
            url: `/dish?individual_order_date=${date}&page=${page}&limit=${limit}&search=${search}&dish_type_id=${dishTypeId}`,
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

    const getIndividualOrders = async (page: number, limit = 10, status = 'all') => {
        const response = await request<OrderPagination>({
            url: `/order/individual?page=${page}&limit=${limit}&status=${status}`,
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

    const createIndividualOrder = async (
        data: OrderIndiDTO,
        promocodeId: number | null,
        successCallback = () => {},
    ) => {
        const response = await request<{ order: Order }>({
            url: `/order/individual`,
            isAuth: true,
            data: {
                ...data,
                ...(promocodeId && { promocodeId }),
            },
            method: 'POST',
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
        getDishesIndi,
        getIndividualOrders,
        createIndividualOrder,
    };
};

export default usePersonal;
