'use client';

import React from 'react';
import Link from 'next/link';

import styles from './index.module.scss';

import { ArrowLeft } from '@/shared/icons';

type Props = {
    href: string;
    text?: string;
};

const BackLink: React.FC<Props> = ({ href, text }) => {
    return (
        <Link href={href} className={styles.profileBack}>
            <ArrowLeft />
            {text || 'Назад'}
        </Link>
    );
};

export default BackLink;
