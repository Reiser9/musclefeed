'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { AuthWrapper } from '@/shared/wrappers/InitialWrapper';
import { ArrowRightShort, Home, Safe, Order } from '@/shared/icons';
import { useAppSelector } from '@/shared/hooks/useRedux';

import { BreadcrumbLink, Breadcrumbs, BreadcrumbText } from '@/shared/ui/Breadcrumbs';
import { Text } from '@/shared/ui/Text';

const Account = () => {
    const language = useAppSelector((state) => state.app.language);

    const t = useTranslations('Account');

    return (
        <AuthWrapper>
            <Breadcrumbs>
                <BreadcrumbLink href={`/${language}`}>
                    <Home />
                </BreadcrumbLink>

                <ArrowRightShort />

                <BreadcrumbText>{t('account')}</BreadcrumbText>
            </Breadcrumbs>

            <div className={styles.account}>
                <div className={base.container}>
                    <div className={styles.accountInner}>
                        <Text variant="h2" upper>
                            {t('account')}
                        </Text>

                        <div className={styles.cabinetContent}>
                            <Link href={`/${language}/account/profile`} className={styles.cabinetLink}>
                                <Safe />
                                <span>{t('profile_title')}</span>
                                {t('profile_text')}
                            </Link>

                            <Link href={`/${language}/account/orders`} className={styles.cabinetLink}>
                                <Order />
                                <span>{t('orders_title')}</span>
                                {t('orders_text')}
                            </Link>

                            <Link href={`/${language}/account/safe`} className={styles.cabinetLink}>
                                <Safe />
                                <span>{t('safe_title')}</span>
                                {t('safe_text')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthWrapper>
    );
};

export default Account;
