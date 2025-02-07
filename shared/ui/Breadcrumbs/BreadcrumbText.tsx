'use client';

import React from 'react';

import styles from './index.module.scss';

type Props = {
    children: React.ReactNode;
};

const BreadcrumbText: React.FC<Props> = ({ children }) => {
    return <p className={styles.breadcrumbsText}>{children}</p>;
};

export default BreadcrumbText;
