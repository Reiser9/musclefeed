'use client';

import React from 'react';
import cn from 'classnames';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { DatePicker } from 'antd';
import { useRouter } from 'next/navigation';
import dayjs, { Dayjs } from 'dayjs';

import styles from './index.module.scss';

import { useAppSelector } from '@/shared/hooks/useRedux';
import { OrderAdminItem } from '@/entities/order/ui';
import { useOrder } from '@/features/order';

import { Preloader } from '@/shared/ui/Preloader';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { NotContent } from '@/shared/ui/NotContent';

const { RangePicker } = DatePicker;

const AdminMain = () => {
    const [status, setStatus] = React.useState('all');
    const [page, setPage] = React.useState(1);

    const [routeStartDate, setRouteStartDate] = React.useState<Dayjs | null>(null);
    const [routeEndDate, setRouteEndDate] = React.useState<Dayjs | null>(null);

    const [dishListDate, setDishListDate] = React.useState('');

    const language = useAppSelector((state) => state.app.language);
    const router = useRouter();

    const { getAdminOrders, getOrderStats, createOrderRoute } = useOrder();

    const { data, isPending, isError } = useQuery({
        queryKey: ['admin_orders', page, 12, status],
        queryFn: () => getAdminOrders(page, 12, status),
        placeholderData: keepPreviousData,
    });

    const { data: orderStats } = useQuery({
        queryKey: ['admin_orders_stats'],
        queryFn: getOrderStats,
    });

    const handleRouteList = () => {
        if (!routeStartDate || !routeEndDate) return;

        const dateStart = routeStartDate.toISOString().split('T')[0];
        const dateEnd = routeEndDate.toISOString().split('T')[0];

        createOrderRoute(dateStart, dateEnd);
    };

    const handleDishList = () => {
        if (!dishListDate) return;

        router.push(`/${language}/dish-list?date=${dishListDate}`);
    };

    const {
        activeCount,
        allCount,
        completedCount,
        frozenCount,
        pendingCount,
        terminatingCount,
        unpaidCount,
        unprocessedCount,
    } = orderStats || {};

    if (isPending) {
        return <Preloader page />;
    }

    if (isError) {
        return <NotContent />;
    }

    return (
        <div className={styles.adminTeam}>
            <div className={styles.adminTeamWrapper}>
                <div className={styles.adminOrdersRoute}>
                    <RangePicker
                        className={styles.adminOrdersRoutePicker}
                        value={[routeStartDate, routeEndDate]}
                        onChange={(dates) => {
                            if (!dates) {
                                setRouteStartDate(null);
                                setRouteEndDate(null);
                                return;
                            }

                            setRouteStartDate(dates[0]);
                            setRouteEndDate(dates[1]);
                        }}
                    />

                    <Button disabled={!routeStartDate || !routeEndDate} onClick={handleRouteList}>
                        Сформировать
                    </Button>
                </div>

                <div className={styles.adminOrdersRoute}>
                    <DatePicker
                        className={styles.adminOrdersRoutePicker}
                        value={dishListDate ? dayjs(dishListDate) : null}
                        onChange={(date) => setDishListDate(date.format('YYYY-MM-DD'))}
                    />

                    <Button disabled={!dishListDate} onClick={handleDishList}>
                        Печать
                    </Button>
                </div>

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
                    <Text>Заказы {!!data && !!data.orders.length && `(${data.orders.length})`}</Text>

                    <Button href={`/${language}/admin/order/create`} small>
                        Создать
                    </Button>
                </div>

                {!!data && !!data.orders.length ? (
                    <div className={styles.adminTeamItems}>
                        {data?.orders.map((team) => (
                            <OrderAdminItem key={team.id} data={team} />
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
