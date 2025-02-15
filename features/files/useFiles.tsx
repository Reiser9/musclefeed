'use client';

import type { File } from '@/entities/files';
import useRequest from '@/shared/hooks/useRequest';

const useFiles = () => {
    const { request, catchRequestError, errorController } = useRequest();

    const uploadFile = async (data: FormData, isAdmin = false, successCallback = () => {}) => {
        const response = await request<{ files: File[] }>({
            url: isAdmin ? '/admin/upload' : '/upload',
            method: 'POST',
            data,
            isAuth: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (catchRequestError(response)) {
            errorController(response);
            return '';
        }

        successCallback();

        if ('data' in response) {
            return response.data.files;
        }
    };

    return {
        uploadFile,
    };
};

export default useFiles;
