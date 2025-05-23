'use client';

import type { Settings } from '@/entities/settings';
import useAlert from '@/shared/hooks/useAlert';
import useRequest from '@/shared/hooks/useRequest';

const useAdminSettings = () => {
    const { request, catchRequestError, errorController } = useRequest();
    const { alertNotify } = useAlert();

    const getSettings = async () => {
        const response = await request<{ settings: Settings }>({
            url: '/settings',
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        if ('data' in response) {
            return response.data.settings;
        }
    };

    const updateCycleDate = async (cycleStartDate: string, successCallback = () => {}) => {
        const response = await request<{ settings: Settings }>({
            url: `/admin/settings/cycle-start-date`,
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

    const updateContacts = async (
        phoneNumber: string,
        email: string,
        socials: { name: string; link: string; icon: string }[],
        successCallback = () => {},
    ) => {
        const response = await request<{ settings: Settings }>({
            url: `/admin/settings/contact`,
            method: 'PATCH',
            data: {
                phoneNumber,
                email,
                socials,
            },
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        successCallback();
        alertNotify('Успешно', 'Данные сохранены');

        if ('data' in response) {
            return response.data.settings;
        }
    };

    return {
        getSettings,
        updateCycleDate,
        updateContacts,
    };
};

export default useAdminSettings;
