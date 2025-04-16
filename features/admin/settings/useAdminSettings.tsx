'use client';

import useRequest from '@/shared/hooks/useRequest';

const useAdminSettings = () => {
    const { request, catchRequestError, errorController } = useRequest();

    const getCycleDate = async () => {
        const response = await request<{ cycleStartDate: string }>({
            url: '/settings/cycle-start-date',
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        if ('data' in response) {
            return response.data.cycleStartDate;
        }
    };

    const updateCycleDate = async (cycleStartDate: string, successCallback = () => {}) => {
        const response = await request<{ settings: { id: number; cycleStartDate: string } }>({
            url: `/admin/settings/`,
            method: 'PATCH',
            data: {
                cycleStartDate,
            },
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        successCallback();

        if ('data' in response) {
            return response.data.settings;
        }
    };

    return {
        getCycleDate,
        updateCycleDate,
    };
};

export default useAdminSettings;
