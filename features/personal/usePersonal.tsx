'use client';

import { Dish } from '@/entities/dish';
import type { Order, OrderIndiDTO, OrderPagination } from '@/entities/order';
import useRequest from '@/shared/hooks/useRequest';

const usePersonal = () => {
    const { request, catchRequestError, errorController } = useRequest();

    const getDishesIndi = async (date: string, search: string) => {
        const response = await request<{dishes: Dish[]}>({
            url: `/menu/personal?date=${date}&search=${search}`,
            method: 'GET',
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        if ('data' in response) {
            return response.data.dishes;
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
