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
import { Button } from '@/shared/ui/Button';
import { Modal } from '@/shared/ui/Modal';
import { Input } from '@/shared/ui/Input';

const AccountOrders = () => {
    const [page, setPage] = React.useState(1);
    const [status, setStatus] = React.useState('all');
    const [changeModal, setChangeModal] = React.useState(false);
    const [comment, setComment] = React.useState('');
    const [orderId, setOrderId] = React.useState<number | null>(null);

    const t = useTranslations('Orders');
    const language = useAppSelector((state) => state.app.language);

    const { getUserOrders, createOrderRequest } = useOrder();

    const { data, isPending, isError } = useQuery({
        queryKey: ['admin_menus', page, 10, status],
        queryFn: () => getUserOrders(page, 10, status),
        placeholderData: keepPreviousData,
    });

    const createRequestHandler = () => {
        if (!orderId) return;

        createOrderRequest(language, orderId, 'FREEZE', comment, () => {
            setComment('');
            setChangeModal(false);
        });
    };

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
                                    data.orders.map((data) => (
                                        <OrderItem
                                            key={data.id}
                                            data={data}
                                            freezeCallback={() => {
                                                setOrderId(data.id);
                                                setChangeModal(true);
                                            }}
                                        />
                                    ))
                                ) : (
                                    <NotContent text={t('orders_empty')}>
                                        <Button href="/">{t('make_order')}</Button>
                                    </NotContent>
                                )}

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
            </div>

            <Modal value={changeModal} setValue={setChangeModal}>
                <Text upper fontWeight={600}>
                    {t("request_title")}
                </Text>

                <div className={styles.changeModal}>
                    <Input value={comment} setValue={setComment} component="textarea" full title={t("request_comment")} />

                    <Button full small onClick={createRequestHandler}>
                        {t("send_request")}
                    </Button>
                </div>
            </Modal>
        </AuthWrapper>
    );
};

export default AccountOrders;
