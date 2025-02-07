'use client';

import React from 'react';

import useUserInfo from '../info/useUserInfo';

const useCheckAuth = () => {
    const { getShortInfo } = useUserInfo();

    React.useEffect(() => {
        getShortInfo();
    }, []);
};

export default useCheckAuth;
