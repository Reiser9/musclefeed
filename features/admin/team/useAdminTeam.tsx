'use client';

import type { Team, TeamDTO } from '@/entities/team';
import useRequest from '@/shared/hooks/useRequest';

const useAdminTeam = () => {
    const { request, catchRequestError, errorController } = useRequest();

    const createTeam = async (data: TeamDTO, successCallback = () => {}) => {
        const response = await request<{ employee: Team }>({
            url: '/admin/team',
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
            return response.data.employee;
        }
    };

    const updateTeam = async (teamId: string | number, data: TeamDTO, successCallback = () => {}) => {
        const response = await request<{ employee: Team }>({
            url: `/admin/team/${teamId}`,
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
            return response.data.employee;
        }
    };

    const getMemberById = async (memberId: string | number) => {
        const response = await request<{ employee: Team }>({
            url: `/admin/team/${memberId}`,
            method: 'GET',
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        if ('data' in response) {
            return response.data.employee;
        }
    };

    const deleteMember = async (memberId: string | number, successCallback = () => {}) => {
        const response = await request<{ employee: Team }>({
            url: `/admin/team/${memberId}`,
            method: 'DELETE',
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        successCallback();

        if ('data' in response) {
            return response.data.employee;
        }
    };

    return {
        createTeam,
        updateTeam,
        getMemberById,
        deleteMember,
    };
};

export default useAdminTeam;
