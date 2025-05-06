'use client';

import { Dish, DishPagination } from '@/entities/dish';
import type {
    AdminOrder,
    Day,
    Order,
    ORDER_CHANGE_TYPES,
    OrderAdminDTO,
    OrderDishList,
    OrderDTO,
    OrderPagination,
    OrderRequest,
    OrderRequestPagination,
    PaymentMethod,
} from '@/entities/order';
import useAlert from '@/shared/hooks/useAlert';
import useRequest from '@/shared/hooks/useRequest';

const successTitleRu = 'Успешно';
const successTitleHe = 'בהצלחה';

const useOrder = () => {
    const { request, catchRequestError, errorController } = useRequest();
    const { alertNotify } = useAlert();

    const getPaymentMethods = async () => {
        const response = await request<{ paymentMethods: PaymentMethod[] }>({
            url: `/order/payment-method`,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        if ('data' in response) {
            return response.data.paymentMethods;
        }
    };

    const createOrder = async (data: OrderDTO, promocodeId: number | null, successCallback = () => {}) => {
        const response = await request<{ order: Order }>({
            url: `/order`,
            method: 'POST',
            data: {
                ...data,
                ...(promocodeId && { promocodeId }),
            },
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        successCallback();

        if ('data' in response) {
            return response.data.order;
        }
    };

    const createAdminOrder = async (data: OrderAdminDTO, successCallback = () => {}) => {
        const response = await request<{ order: Order }>({
            url: `/admin/order`,
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
            return response.data.order;
        }
    };

    const deleteOrder = async (orderId: number | string, successCallback = () => {}) => {
        const response = await request<{ order: Order }>({
            url: `/admin/order/${orderId}`,
            method: 'DELETE',
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        successCallback();

        if ('data' in response) {
            return response.data.order;
        }
    };

    const updateAdminOrder = async (orderId: number | string, data: OrderAdminDTO, successCallback = () => {}) => {
        const response = await request<{ order: Order }>({
            url: `/admin/order/${orderId}`,
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
            return response.data.order;
        }
    };

    const getAdminOrderById = async (orderId: number | string, successCallback = () => {}) => {
        const response = await request<{ order: AdminOrder }>({
            url: `/admin/order/${orderId}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        successCallback();

        if ('data' in response) {
            return response.data.order;
        }
    };

    const getUserOrders = async (page: number, limit = 10, status = 'all') => {
        const response = await request<OrderPagination>({
            url: `/order?page=${page}&limit=${limit}&status=${status}`,
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

    const getAdminOrders = async (page: number, limit = 10, status: string, search = '') => {
        const response = await request<OrderPagination>({
            url: `/admin/order?page=${page}&limit=${limit}&status=${status}&search=${search}`,
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

    const getOrderStats = async () => {
        const response = await request<{
            stats: {
                allCount: number;
                activeCount: number;
                frozenCount: number;
                unpaidCount: number;
                completedCount: number;
                pendingCount: number;
                terminatingCount: number;
                unprocessedCount: number;
                individualCount: number;
            };
        }>({
            url: `/admin/order/stats`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        if ('data' in response) {
            return response.data.stats;
        }
    };

    const createOrderRoute = async (startDate: string, endDate: string, successCallback = () => {}) => {
        const response = await request({
            url: `/admin/report/route-list?start_date=${startDate}&end_date=${endDate}`,
            isAuth: true,
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            },
            isBlob: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        successCallback();

        if ('data' in response) {
            const blob = new Blob([response.data as BlobPart], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });

            const url = window.URL.createObjectURL(blob);

            const newTab = window.open(url, '_blank');
            if (newTab) {
                newTab.focus();
            } else {
                console.error('Не удалось открыть новую вкладку. Возможно, браузер блокирует pop-up.');
            }

            setTimeout(() => window.URL.revokeObjectURL(url), 5000);
        }
    };

    const createOrderDishList = async (date: string, successCallback = () => {}) => {
        const response = await request<{ orders: OrderDishList[] }>({
            url: `/admin/report/insert?date=${date}`,
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

    const createOrderDish = async (startDate: string, endDate: string, successCallback = () => {}) => {
        const response = await request({
            url: `/admin/report/dish?start_date=${startDate}&end_date=${endDate}`,
            isAuth: true,
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            },
            isBlob: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        successCallback();

        if ('data' in response) {
            const blob = new Blob([response.data as BlobPart], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });

            const url = window.URL.createObjectURL(blob);

            const newTab = window.open(url, '_blank');
            if (newTab) {
                newTab.focus();
            } else {
                console.error('Не удалось открыть новую вкладку. Возможно, браузер блокирует pop-up.');
            }

            setTimeout(() => window.URL.revokeObjectURL(url), 5000);
        }
    };

    const getOrderDays = async (orderId: number | string) => {
        const response = await request<{ days: Day[] }>({
            url: `/order/${orderId}/day`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        if ('data' in response) {
            return response.data.days;
        }
    };

    const getAdminOrderDays = async (orderId: number | string) => {
        const response = await request<{ days: Day[] }>({
            url: `/admin/order/${orderId}/day`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        if ('data' in response) {
            return response.data.days;
        }
    };

    const getDayDishes = async (dayId: number | string) => {
        const response = await request<{
            dishes: Dish[];
            total: {
                calories: number;
                carbohydrates: number;
                fats: number;
                proteins: number;
            };
        }>({
            url: `/order/day/${dayId}`,
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

    const getAdminDayDishes = async (dayId: number | string) => {
        const response = await request<DishPagination>({
            url: `/admin/order/day/${dayId}`,
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

    const getReplacementDishes = async (dayId: number | string, dishTypeId: number | string) => {
        const response = await request<{ dishes: Dish[] }>({
            url: `/order/day/${dayId}/replacement?dish_type_id=${dishTypeId}`,
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

    const getAdminReplacementDishes = async (dayId: number | string, dishTypeId: number | string) => {
        const response = await request<{ dishes: Dish[] }>({
            url: `/admin/order/day/${dayId}/replacement?dish_type_id=${dishTypeId}`,
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

    const replaceDish = async (
        lang: 'ru' | 'he' = 'ru',
        dayId: number | string,
        dishTypeId: number | string,
        dishId: number | string,
        successCallback = () => {},
    ) => {
        const response = await request<{ dish: Dish }>({
            url: `/order/select`,
            isAuth: true,
            method: 'POST',
            data: {
                dayId,
                dishTypeId,
                dishId,
            },
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        successCallback();
        const title = lang === 'ru' ? successTitleRu : successTitleHe;
        const message = lang === 'ru' ? 'Блюдо заменено' : 'המנה הוחלפה';

        alertNotify(title, message);

        if ('data' in response) {
            return response.data.dish;
        }
    };

    const adminReplaceDish = async (
        lang: 'ru' | 'he' = 'ru',
        dayId: number | string,
        dishTypeId: number | string,
        dishId: number | string,
        successCallback = () => {},
    ) => {
        const response = await request<{ dish: Dish }>({
            url: `/admin/order/select`,
            isAuth: true,
            method: 'POST',
            data: {
                dayId,
                dishTypeId,
                dishId,
            },
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        successCallback();

        const title = lang === 'ru' ? successTitleRu : successTitleHe;
        const message = lang === 'ru' ? 'Блюдо заменено' : 'המנה הוחלפה';

        alertNotify(title, message);

        if ('data' in response) {
            return response.data.dish;
        }
    };

    const getUserOrderById = async (orderId: number | string) => {
        const response = await request<{ order: Order }>({
            url: `/order/${orderId}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        if ('data' in response) {
            return response.data.order;
        }
    };

    const getAdminChangeRequests = async (page: number, limit = 12) => {
        const response = await request<OrderRequestPagination>({
            url: `/admin/order/change-request?page=${page}&limit=${limit}`,
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

    const getAdminChangeRequestById = async (requestId: number | string) => {
        const response = await request<{ orderChangeRequest: OrderRequest }>({
            url: `/admin/order/change-request/${requestId}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        if ('data' in response) {
            return response.data.orderChangeRequest;
        }
    };

    const updateChangeRequest = async (
        lang: 'ru' | 'he' = 'ru',
        requestId: number | string,
        isProcessed: boolean,
        successCallback = () => {},
    ) => {
        const response = await request<{ orderChangeRequest: OrderRequest }>({
            url: `/admin/order/change-request/${requestId}`,
            isAuth: true,
            method: 'PATCH',
            data: {
                isProcessed,
            },
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        const title = lang === 'ru' ? successTitleRu : successTitleHe;
        const message = lang === 'ru' ? 'Заявка сохранена' : 'הבקשה נשמרה';

        alertNotify(title, message);

        successCallback();

        if ('data' in response) {
            return response.data.orderChangeRequest;
        }
    };

    const createOrderRequest = async (
        lang: 'ru' | 'he' = 'ru',
        orderId: number | string,
        orderChangeType: ORDER_CHANGE_TYPES,
        comment: string,
        successCallback = () => {},
    ) => {
        const response = await request<{ orderChangeRequest: OrderRequest }>({
            url: `/order/${orderId}/change-request`,
            isAuth: true,
            method: 'POST',
            data: {
                orderChangeType,
                comment,
            },
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        const title = lang === 'ru' ? successTitleRu : successTitleHe;
        const message =
            lang === 'ru'
                ? 'Запрос на изменение отправлен, с вами свяжется администратор'
                : 'בקשת שינוי נשלחה, מנהל המערכת יצור איתך קשר';

        alertNotify(title, message);
        successCallback();

        if ('data' in response) {
            return response.data.orderChangeRequest;
        }
    };

    const getUnprocessedCount = async () => {
        const response = await request<{ count: number }>({
            url: `/admin/order/change-request/unprocessed-count`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        if ('data' in response) {
            return response.data.count;
        }
    };

    return {
        getPaymentMethods,
        createOrder,
        createAdminOrder,
        updateAdminOrder,
        getUserOrders,
        getAdminOrders,
        getAdminOrderById,
        getOrderStats,
        createOrderRoute,
        createOrderDishList,
        createOrderDish,
        getOrderDays,
        getDayDishes,
        getReplacementDishes,
        replaceDish,
        getUserOrderById,
        getAdminChangeRequests,
        getAdminChangeRequestById,
        updateChangeRequest,
        createOrderRequest,
        deleteOrder,
        getAdminOrderDays,
        getAdminDayDishes,
        getAdminReplacementDishes,
        adminReplaceDish,
        getUnprocessedCount,
    };
};

export default useOrder;
