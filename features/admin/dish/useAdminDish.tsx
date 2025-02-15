'use client';

import type { Dish, DishDTO, DishPagination, DishType } from '@/entities/dish';
import useRequest from '@/shared/hooks/useRequest';

const useAdminDish = () => {
    const { request, catchRequestError, errorController } = useRequest();

    const getDishTypes = async () => {
        const response = await request<{ dishTypes: DishType[] }>({
            url: '/dish/type',
            method: 'GET',
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        if ('data' in response) {
            return response.data.dishTypes;
        }
    };

    const createDish = async (data: DishDTO, successCallback = () => {}) => {
        const response = await request<{ dish: Dish }>({
            url: '/admin/dish',
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
            return response.data.dish;
        }
    };

    const updateDish = async (dishId: string | number, data: DishDTO, successCallback = () => {}) => {
        const response = await request<{ dish: Dish }>({
            url: `/admin/dish/${dishId}`,
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
            return response.data.dish;
        }
    };

    const getDishById = async (dishId: string | number) => {
        const response = await request<{ dish: Dish }>({
            url: `/admin/dish/${dishId}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        if ('data' in response) {
            return response.data.dish;
        }
    };

    const getDishsPagination = async (page: number, limit = 10, search: string) => {
        const response = await request<DishPagination>({
            url: `/admin/dish?page=${page}&limit=${limit}&search=${search}`,
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

    const copyDish = async (dishId: number | string, successCallback = () => {}) => {
        const response = await request<{ dish: Dish }>({
            url: `/admin/dish/${dishId}/copy`,
            method: 'POST',
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        successCallback();

        if ('data' in response) {
            return response.data.dish;
        }
    };

    const deleteDish = async (dishId: number | string, successCallback = () => {}) => {
        const response = await request<{ dish: Dish }>({
            url: `/admin/dish/${dishId}`,
            method: 'DELETE',
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        successCallback();

        if ('data' in response) {
            return response.data.dish;
        }
    };

    return {
        getDishTypes,
        createDish,
        updateDish,
        getDishById,
        getDishsPagination,
        copyDish,
        deleteDish,
    };
};

export default useAdminDish;
