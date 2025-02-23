'use client';

import type {
    AdminOrder,
    Order,
    OrderAdminDTO,
    OrderDishList,
    OrderDTO,
    OrderPagination,
    PaymentMethod,
} from '@/entities/order';
import useAlert from '@/shared/hooks/useAlert';
import useRequest from '@/shared/hooks/useRequest';

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

    const createOrder = async (data: OrderDTO, successCallback = () => {}) => {
        const response = await request<{ order: Order }>({
            url: `/order`,
            method: 'POST',
            data,
            isAuth: true
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        successCallback();
        alertNotify('Успешно', 'Заказ оформлен');

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

    const getAdminOrders = async (page: number, limit = 10, status: string) => {
        const response = await request<OrderPagination>({
            url: `/admin/order?page=${page}&limit=${limit}&status=${status}`,
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
            url: `/admin/order/route-list?start_date=${startDate}&end_date=${endDate}`,
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
            const a = document.createElement('a');
            a.href = url;
            a.download = 'routes.xlsx';
            a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            window.URL.revokeObjectURL(url);
        }
    };

    const createOrderDishList = async (date: string, successCallback = () => {}) => {
        const response = await request<{ orders: OrderDishList[] }>({
            url: `/admin/order/dish-list?date=${date}`,
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
    };
};

export default useOrder;
