'use client';

import React from 'react';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

type Props = {
    children: React.ReactNode;
};

const Breadcrumbs: React.FC<Props> = ({ children }) => {
    return (
        <div className={styles.breadcrumbs}>
            <div className={base.container}>
                <div className={styles.breadcrumbsInner}>{children}</div>
            </div>
        </div>
    );
};

export default Breadcrumbs;
