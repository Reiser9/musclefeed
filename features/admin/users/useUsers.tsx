'use client';

import { UserPaginations } from '@/entities/user/admin';
import { UserShortInfo } from '@/entities/user/auth';
import useRequest from '@/shared/hooks/useRequest';

const useUsers = () => {
    const { request, catchRequestError, errorController } = useRequest();

    const getUsers = async (page: number, limit = 10) => {
        const response = await request<UserPaginations>({
            url: `/admin/user?page=${page}&limit=${limit}`,
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

    const getUserById = async (userId: string | number) => {
        const response = await request<{ user: UserShortInfo }>({
            url: `/admin/user/${userId}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        if ('data' in response) {
            return response.data.user;
        }
    };

    const updateUserInfo = async (
        userId: string | number,
        roles: string[],
        isVerified: boolean,
        successCallback = () => {},
    ) => {
        const response = await request<{ user: UserShortInfo }>({
            url: `/admin/user/${userId}`,
            isAuth: true,
            method: 'PATCH',
            data: {
                isVerified,
                roles,
            },
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        successCallback();

        if ('data' in response) {
            return response.data.user;
        }
    };

    const deleteUser = async (userId: string | number, successCallback = () => {}) => {
        const response = await request<{ user: UserShortInfo }>({
            url: `/admin/user/${userId}`,
            isAuth: true,
            method: 'DELETE',
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        successCallback();

        if ('data' in response) {
            return response.data.user;
        }
    };

    return {
        getUsers,
        getUserById,
        updateUserInfo,
        deleteUser,
    };
};

export default useUsers;
