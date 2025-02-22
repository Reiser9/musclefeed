'use client';

import React from 'react';
import cn from 'classnames';
import { useTranslations } from 'next-intl';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { AuthWrapper } from '@/shared/wrappers/InitialWrapper';
import { ArrowRightShort, Home } from '@/shared/icons';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { OrderItem } from '@/entities/order/ui';
import { useOrder } from '@/features/order';

import { BreadcrumbLink, Breadcrumbs, BreadcrumbText } from '@/shared/ui/Breadcrumbs';
import { Text } from '@/shared/ui/Text';
import { BackLink } from '@/shared/ui/BackLink';
import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';

const AccountOrders = () => {
    const [page, setPage] = React.useState(1);
    const [status, setStatus] = React.useState('all');

    const t = useTranslations('Orders');
    const language = useAppSelector((state) => state.app.language);

    const { getUserOrders } = useOrder();

    const { data, isPending, isError } = useQuery({
        queryKey: ['admin_menus', page, 10, status],
        queryFn: () => getUserOrders(page, 10, status),
        placeholderData: keepPreviousData,
    });

    if (isPending) {
        return <Preloader page />;
    }

    if (isError) {
        return <NotContent />;
    }

    return (
        <AuthWrapper>
            <Breadcrumbs>
                <BreadcrumbLink href={`/${language}`}>
                    <Home />
                </BreadcrumbLink>

                <ArrowRightShort />

                <BreadcrumbLink href={`/${language}/account`}>{t('account')}</BreadcrumbLink>

                <ArrowRightShort />

                <BreadcrumbText>{t('title')}</BreadcrumbText>
            </Breadcrumbs>

            <div className={styles.orders}>
                <div className={base.container}>
                    <div className={styles.ordersInner}>
                        <Text variant="h2" upper>
                            {t('title2')}
                        </Text>

                        <BackLink href={`/${language}/account`} text={t('back_text')} />

                        <div className={styles.ordersContent}>
                            <div className={styles.ordersSidebar}>
                                <button
                                    className={cn(styles.ordersTab, {
                                        [styles.active]: status === 'all',
                                    })}
                                    onClick={() => setStatus('all')}
                                >
                                    {t('all_orders')}
                                </button>

                                <button
                                    className={cn(styles.ordersTab, {
                                        [styles.active]: status === 'active',
                                    })}
                                    onClick={() => setStatus('active')}
                                >
                                    {t('active_orders')}
                                </button>

                                <button
                                    className={cn(styles.ordersTab, {
                                        [styles.active]: status === 'frozen',
                                    })}
                                    onClick={() => setStatus('frozen')}
                                >
                                    {t('freeze_orders')}
                                </button>

                                <button
                                    className={cn(styles.ordersTab, {
                                        [styles.active]: status === 'unpaid',
                                    })}
                                    onClick={() => setStatus('unpaid')}
                                >
                                    {t('nopay_orders')}
                                </button>

                                <button
                                    className={cn(styles.ordersTab, {
                                        [styles.active]: status === 'completed',
                                    })}
                                    onClick={() => setStatus('completed')}
                                >
                                    {t('ended_orders')}
                                </button>
                            </div>

                            <div className={styles.ordersList}>
                                {isPending ? (
                                    <Preloader small page />
                                ) : isError ? (
                                    <NotContent />
                                ) : !!data && !!data.orders.length ? (
                                    <OrderItem />
                                ) : (
                                    <NotContent text="У вас еще нет заказов" />
                                )}
                            </div>

                            {!!data && data.totalPages > 1 && (
                                <div className={styles.pagination}>
                                    {[...Array(data.totalPages)].map((_, id) => (
                                        <button
                                            key={id}
                                            className={cn(styles.paginationButton, {
                                                [styles.active]: id + 1 === data.page,
                                            })}
                                            onClick={() => setPage(id + 1)}
                                        >
                                            {id + 1}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthWrapper>
    );
};

export default AccountOrders;
