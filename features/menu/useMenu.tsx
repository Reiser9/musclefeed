'use client';

import { Dish, DishPagination } from '@/entities/dish';
import type { Menu, MenuDTO, MenuPagination, MenuType, MenuTypeDTO, MenuUserPagination } from '@/entities/menu';
import useRequest from '@/shared/hooks/useRequest';

const useMenu = () => {
    const { request, catchRequestError, errorController } = useRequest();

    const getTypesmenuUser = async () => {
        const response = await request<{ menuTypes: MenuType[] }>({
            url: '/menu/type',
            method: 'GET',
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        if ('data' in response) {
            return response.data.menuTypes;
        }
    };

    const getMenuUser = async (menuTypeId: string | number | null) => {
        const response = await request<MenuUserPagination>({
            url: `/menu?page=${1}&limit=10&menu_type_id=${menuTypeId}`,
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

    const getMenuDishesUser = async (menuId: number | string | null, date: string | null) => {
        const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];
        const response = await request<DishPagination>({
            url: `/menu/${menuId}?date=${date ? date : tomorrow}`,
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

    const getSwapMenuDishesUser = async (
        menuId: number | string | null,
        date: string | null,
        dishTypeId: number | string | null,
    ) => {
        const response = await request<{ dishes: Dish[] }>({
            url: `/menu/${menuId}/replacement?date=${date}&dish_type_id=${dishTypeId}`,
            method: 'GET',
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        if ('data' in response) {
            return response.data.dishes;
        }
    };

    const getTypesmenu = async () => {
        const response = await request<{ menuTypes: MenuType[] }>({
            url: '/admin/menu/type',
            method: 'GET',
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        if ('data' in response) {
            return response.data.menuTypes;
        }
    };

    const createTypemenu = async (data: MenuTypeDTO, successCallback = () => {}) => {
        const response = await request<{ menuType: MenuType }>({
            url: '/admin/menu/type',
            method: 'POST',
            isAuth: true,
            data,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        successCallback();

        if ('data' in response) {
            return response.data.menuType;
        }
    };

    const updateTypemenu = async (menutypeId: string | number, data: MenuTypeDTO, successCallback = () => {}) => {
        const response = await request<{ menuType: MenuType }>({
            url: `/admin/menu/type/${menutypeId}`,
            method: 'PATCH',
            isAuth: true,
            data,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        successCallback();

        if ('data' in response) {
            return response.data.menuType;
        }
    };

    const getTypemenuById = async (typemenuId: string | number) => {
        const response = await request<{ menuType: MenuType }>({
            url: `/admin/menu/type/${typemenuId}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        if ('data' in response) {
            return response.data.menuType;
        }
    };

    const deleteTypemenu = async (typemenuId: string | number, successCallback = () => {}) => {
        const response = await request<{ menuType: MenuType }>({
            url: `/admin/menu/type/${typemenuId}`,
            method: 'DELETE',
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        successCallback();

        if ('data' in response) {
            return response.data.menuType;
        }
    };

    const getMenus = async (page: number, limit = 10, search: string) => {
        const response = await request<MenuPagination>({
            url: `/admin/menu?page=${page}&limit=${limit}&search=${search}`,
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

    const createMenu = async (data: MenuDTO, successCallback = () => {}) => {
        const response = await request<{ menu: Menu }>({
            url: '/admin/menu',
            method: 'POST',
            isAuth: true,
            data,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        successCallback();

        if ('data' in response) {
            return response.data.menu;
        }
    };

    const updateMenu = async (menuId: string | number, data: MenuDTO, successCallback = () => {}) => {
        const response = await request<{ menu: Menu }>({
            url: `/admin/menu/${menuId}`,
            method: 'PATCH',
            isAuth: true,
            data,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        successCallback();

        if ('data' in response) {
            return response.data.menu;
        }
    };

    const getMenuById = async (menuId: string | number) => {
        const response = await request<{ menu: Menu }>({
            url: `/admin/menu/${menuId}`,
            method: 'GET',
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        if ('data' in response) {
            return response.data.menu;
        }
    };

    const deleteMenu = async (menuId: string | number, successCallback = () => {}) => {
        const response = await request<{ menu: Menu }>({
            url: `/admin/menu/${menuId}`,
            method: 'DELETE',
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        successCallback();

        if ('data' in response) {
            return response.data.menu;
        }
    };

    return {
        getTypesmenuUser,
        getMenuUser,
        getMenuDishesUser,
        getSwapMenuDishesUser,
        getTypesmenu,
        createTypemenu,
        updateTypemenu,
        getTypemenuById,
        deleteTypemenu,
        getMenus,
        createMenu,
        updateMenu,
        getMenuById,
        deleteMenu,
    };
};

export default useMenu;
