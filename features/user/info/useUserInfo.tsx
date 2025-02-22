'use client';

import type { UserShortInfo, UserShortInfoDTO } from '@/entities/user/auth';
import type { UserAddress, UserAddressDTO, UserAddresses } from '@/entities/user/info';
import useRequest from '@/shared/hooks/useRequest';
import { useAppDispatch } from '@/shared/hooks/useRedux';
import { setAuthIsLoading, setIsAuth, setIsVerified } from '@/store/slices/app';
import useAlert from '@/shared/hooks/useAlert';

const useUserInfo = () => {
    const { request, catchRequestError, errorController } = useRequest();
    const { alertNotify } = useAlert();
    const dispatch = useAppDispatch();

    const getShortInfo = async () => {
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
            dispatch(setAuthIsLoading(false));
            return '';
        }

        const response = await request<{ user: UserShortInfo }>({
            url: '/user',
            method: 'GET',
            isAuth: true,
        }).finally(() => dispatch(setAuthIsLoading(false)));

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        dispatch(setIsAuth(true));

        if ('data' in response) {
            dispatch(setIsVerified(response.data.user.isVerified));
            return response.data.user;
        }
    };

    const updateUserInfo = async (data: UserShortInfoDTO, successCallback = () => {}) => {
        const response = await request<{ user: UserShortInfo }>({
            url: '/user',
            method: 'PATCH',
            data,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        successCallback();
        alertNotify('Успешно', 'Данные обновлены');

        if ('data' in response) {
            return response.data;
        }
    };

    const getUserAddresses = async () => {
        const response = await request<UserAddresses>({
            url: '/user/address',
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

    const createUserAddress = async (data: UserAddressDTO, successCallback = () => {}) => {
        const response = await request<{ address: UserAddress }>({
            url: '/user/address',
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
            return response.data.address;
        }
    };

    const updateUserAddress = async (addressId: number | string, data: UserAddressDTO, successCallback = () => {}) => {
        const response = await request<{ address: UserAddress }>({
            url: `/user/address/${addressId}`,
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
            return response.data.address;
        }
    };

    const deleteUserAddress = async (addressId: number | string, successCallback = () => {}) => {
        const response = await request<{ address: UserAddress }>({
            url: `/user/address/${addressId}`,
            method: 'DELETE',
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        successCallback();

        if ('data' in response) {
            return response.data.address;
        }
    };

    const togglePrimaryAddress = async (addressId: number | string, successCallback = () => {}) => {
        const response = await request<{ address: UserAddress }>({
            url: `/user/address/${addressId}/toggle-primary`,
            method: 'PATCH',
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        successCallback();

        if ('data' in response) {
            return response.data.address;
        }
    };

    return {
        getShortInfo,
        updateUserInfo,
        getUserAddresses,
        createUserAddress,
        updateUserAddress,
        deleteUserAddress,
        togglePrimaryAddress,
    };
};

export default useUserInfo;
