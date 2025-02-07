'use client';

import React from 'react';
import Link from 'next/link';

import styles from './index.module.scss';

type Props = {
    href: string;
    children: React.ReactNode;
};

const BreadcrumbLink: React.FC<Props> = ({ href, children }) => {
    return (
        <Link href={href} className={styles.breadcrumbsLink}>
            {children}
        </Link>
    );
};

export default BreadcrumbLink;
