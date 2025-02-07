'use client';

import type { UserShortInfo } from '@/entities/user/auth';
import useRequest from '@/shared/hooks/useRequest';
import { useAppDispatch } from '@/shared/hooks/useRedux';
import { setAuthIsLoading, setIsAuth, setIsVerified } from '@/store/slices/app';

const useUserInfo = () => {
    const { request, catchRequestError, errorController } = useRequest();
    const dispatch = useAppDispatch();

    const getShortInfo = async () => {
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) return dispatch(setAuthIsLoading(false));

        const response = await request<{ user: UserShortInfo }>({
            url: '/user',
            method: 'GET',
            isAuth: true,
        }).finally(() => dispatch(setAuthIsLoading(false)));

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            dispatch(setIsVerified(response.data.user.isVerified));
        }

        dispatch(setIsAuth(true));
    };

    return {
        getShortInfo,
    };
};

export default useUserInfo;
