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

    const updateWeekDays = async (deliveryWeekdays: number[], successCallback = () => {}) => {
        const response = await request<{ settings: Settings }>({
            url: `/admin/settings/delivery-config`,
            method: 'PATCH',
            data: {
                deliveryWeekdays,
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
        updateWeekDays,
        updateContacts,
    };
};

export default useAdminSettings;
