'use client';

import React from 'react';
import cn from 'classnames';
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';

import styles from './index.module.scss';

import { useAppSelector } from '@/shared/hooks/useRedux';
import { OrderAdminItem } from '@/entities/order/ui';
import { useOrder } from '@/features/order';

import { Preloader } from '@/shared/ui/Preloader';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { NotContent } from '@/shared/ui/NotContent';

const AdminMain = () => {
    const [status, setStatus] = React.useState('all');
    const [page, setPage] = React.useState(1);

    const queryClient = useQueryClient();
    const language = useAppSelector((state) => state.app.language);

    const revalidateRequests = () => {
        queryClient.invalidateQueries({ queryKey: ['admin_orders'] });
        queryClient.invalidateQueries({ queryKey: ['admin_orders_stats'] });
    };

    const { getAdminOrders, getOrderStats, deleteOrder } = useOrder();

    const { data, isPending, isError } = useQuery({
        queryKey: ['admin_orders', page, 12, status],
        queryFn: () => getAdminOrders(page, 12, status),
        placeholderData: keepPreviousData,
    });

    const { data: orderStats } = useQuery({
        queryKey: ['admin_orders_stats'],
        queryFn: getOrderStats,
    });

    const {
        activeCount,
        allCount,
        completedCount,
        frozenCount,
        pendingCount,
        terminatingCount,
        unpaidCount,
        unprocessedCount,
        individualCount,
    } = orderStats || {};

    React.useEffect(() => {
        if(status){
            setPage(1);
        }
    }, [status]);

    if (isPending) {
        return <Preloader page />;
    }

    if (isError) {
        return <NotContent />;
    }

    return (
        <div className={styles.adminTeam}>
            <div className={styles.adminTeamWrapper}>
                <div className={styles.adminOrdersTabs}>
                    <button
                        className={cn(styles.adminOrdersTab, {
                            [styles.active]: status === 'all',
                        })}
                        onClick={() => setStatus('all')}
                    >
                        Все заказы ({allCount || 0})
                    </button>

                    <button
                        className={cn(styles.adminOrdersTab, {
                            [styles.active]: status === 'individual',
                        })}
                        onClick={() => setStatus('individual')}
                    >
                        Индивидуальные ({individualCount || 0})
                    </button>

                    <button
                        className={cn(styles.adminOrdersTab, {
                            [styles.active]: status === 'active',
                        })}
                        onClick={() => setStatus('active')}
                    >
                        Активные ({activeCount || 0})
                    </button>

                    <button
                        className={cn(styles.adminOrdersTab, {
                            [styles.active]: status === 'frozen',
                        })}
                        onClick={() => setStatus('frozen')}
                    >
                        Замороженные ({frozenCount || 0})
                    </button>

                    <button
                        className={cn(styles.adminOrdersTab, {
                            [styles.active]: status === 'unpaid',
                        })}
                        onClick={() => setStatus('unpaid')}
                    >
                        Неоплаченные ({unpaidCount || 0})
                    </button>

                    <button
                        className={cn(styles.adminOrdersTab, {
                            [styles.active]: status === 'completed',
                        })}
                        onClick={() => setStatus('completed')}
                    >
                        Завершенные ({completedCount || 0})
                    </button>

                    <button
                        className={cn(styles.adminOrdersTab, {
                            [styles.active]: status === 'pending',
                        })}
                        onClick={() => setStatus('pending')}
                    >
                        Ожидающие ({pendingCount || 0})
                    </button>

                    <button
                        className={cn(styles.adminOrdersTab, {
                            [styles.active]: status === 'terminating',
                        })}
                        onClick={() => setStatus('terminating')}
                    >
                        Завершающиеся ({terminatingCount || 0})
                    </button>

                    <button
                        className={cn(styles.adminOrdersTab, {
                            [styles.active]: status === 'unprocessed',
                        })}
                        onClick={() => setStatus('unprocessed')}
                    >
                        Необработанные ({unprocessedCount || 0})
                    </button>
                </div>

                <div className={styles.titleWrap}>
                    <Text>Заказы {!!data && !!data.totalCount && `(${data.totalCount})`}</Text>

                    <Button href={`/${language}/admin/order/create`} small>
                        Создать
                    </Button>
                </div>

                {!!data && !!data.orders.length ? (
                    <div className={styles.adminTeamItems}>
                        {data?.orders.map((order) => (
                            <OrderAdminItem
                                key={order.id}
                                data={order}
                                deleteCallback={() => deleteOrder(order.id, revalidateRequests)}
                            />
                        ))}
                    </div>
                ) : (
                    <NotContent text="Нет заказов с таким параметром" />
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
    );
};

export default AdminMain;
