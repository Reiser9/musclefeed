'use client';

import useRequest from '@/shared/hooks/useRequest';

import type { Team } from '@/entities/team';

const useTeam = () => {
    const { request, catchRequestError, errorController } = useRequest();

    const getTeam = async () => {
        const response = await request<{ team: Team[] }>({
            url: '/team',
            method: 'GET',
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        if ('data' in response) {
            return response.data.team;
        }
    };

    return {
        getTeam,
    };
};

export default useTeam;
