'use client';

import type { City, CityDTO } from '@/entities/city';
import useRequest from '@/shared/hooks/useRequest';

const useCities = () => {
    const { request, catchRequestError, errorController } = useRequest();

    const getCities = async () => {
        const response = await request<{ cities: City[] }>({
            url: '/city',
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        if ('data' in response) {
            return response.data.cities;
        }
    };

    const getCityById = async (cityId: number | string) => {
        const response = await request<{ city: City }>({
            url: `/admin/city/${cityId}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        if ('data' in response) {
            return response.data.city;
        }
    };

    const createCity = async (data: CityDTO, successCallback = () => {}) => {
        const response = await request<{ city: City }>({
            url: '/admin/city',
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
            return response.data.city;
        }
    };

    const updateCity = async (cityId: number | string, data: CityDTO, successCallback = () => {}) => {
        const response = await request<{ city: City }>({
            url: `/admin/city/${cityId}`,
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
            return response.data.city;
        }
    };

    const deleteCity = async (cityId: number | string, successCallback = () => {}) => {
        const response = await request<{ city: City }>({
            url: `/admin/city/${cityId}`,
            method: 'DELETE',
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        successCallback();

        if ('data' in response) {
            return response.data.city;
        }
    };

    return {
        getCities,
        getCityById,
        createCity,
        updateCity,
        deleteCity,
    };
};

export default useCities;
