'use client';

import React from 'react';
import cn from 'classnames';
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';

import styles from './index.module.scss';

import { useAppSelector } from '@/shared/hooks/useRedux';
import { OrderAdminItem } from '@/entities/order/ui';
import { useOrder } from '@/features/order';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { useUserInfo } from '@/features/user';

import { Preloader } from '@/shared/ui/Preloader';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { NotContent } from '@/shared/ui/NotContent';
import { Input } from '@/shared/ui/Input';

const AdminMain = () => {
    const [status, setStatus] = React.useState('all');
    const [page, setPage] = React.useState(1);
    const [search, setSearch] = React.useState('');

    const searchDebounce = useDebounce(search, 500);

    const queryClient = useQueryClient();
    const language = useAppSelector((state) => state.app.language);
    const router = useRouter();

    const searchParams = useSearchParams();
    const pageParam = searchParams.get('page');
    const searchParam = searchParams.get('search');
    const statusParam = searchParams.get('status');

    const revalidateRequests = () => {
        queryClient.invalidateQueries({ queryKey: ['admin_orders'] });
        queryClient.invalidateQueries({ queryKey: ['admin_orders_stats'] });
    };

    const { getAdminOrders, getOrderStats, deleteOrder, adminProlongationOrder } = useOrder();
    const { getShortInfo } = useUserInfo();

    const { data, isPending, isError } = useQuery({
        queryKey: ['admin_orders', page, 12, status, searchDebounce],
        queryFn: () => getAdminOrders(page, 12, status, searchDebounce),
        placeholderData: keepPreviousData,
    });

    const { data: orderStats } = useQuery({
        queryKey: ['admin_orders_stats'],
        queryFn: getOrderStats,
    });

    const { data: userInfo } = useQuery({
        queryKey: ['user_info'],
        queryFn: getShortInfo,
    });

    const { roles } = userInfo || {};

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

    const setStatusHadler = (status: string) => {
        setStatus(status);
        setPage(1);
    }

    React.useEffect(() => {
        setPage(1);
    }, [searchDebounce]);

    React.useEffect(() => {
        router.replace(`?status=${status}&page=${page}&search=${searchDebounce}`);
    }, [status, page, searchDebounce]);

    React.useEffect(() => {
        if (searchParam) {
            setSearch(searchParam);
        }
    }, [searchParam]);

    React.useEffect(() => {
        if (statusParam) {
            setStatus(statusParam);
        }
    }, [statusParam]);

    React.useEffect(() => {
        if (pageParam) {
            setPage(+pageParam);
        }
    }, [pageParam]);

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
                        onClick={() => setStatusHadler('all')}
                    >
                        Все заказы ({allCount || 0})
                    </button>

                    <button
                        className={cn(styles.adminOrdersTab, {
                            [styles.active]: status === 'individual',
                        })}
                        onClick={() => setStatusHadler('individual')}
                    >
                        Индивидуальные ({individualCount || 0})
                    </button>

                    <button
                        className={cn(styles.adminOrdersTab, {
                            [styles.active]: status === 'active',
                        })}
                        onClick={() => setStatusHadler('active')}
                    >
                        Активные ({activeCount || 0})
                    </button>

                    <button
                        className={cn(styles.adminOrdersTab, {
                            [styles.active]: status === 'frozen',
                        })}
                        onClick={() => setStatusHadler('frozen')}
                    >
                        Замороженные ({frozenCount || 0})
                    </button>

                    <button
                        className={cn(styles.adminOrdersTab, {
                            [styles.active]: status === 'unpaid',
                        })}
                        onClick={() => setStatusHadler('unpaid')}
                    >
                        Неоплаченные ({unpaidCount || 0})
                    </button>

                    <button
                        className={cn(styles.adminOrdersTab, {
                            [styles.active]: status === 'completed',
                        })}
                        onClick={() => setStatusHadler('completed')}
                    >
                        Завершенные ({completedCount || 0})
                    </button>

                    <button
                        className={cn(styles.adminOrdersTab, {
                            [styles.active]: status === 'pending',
                        })}
                        onClick={() => setStatusHadler('pending')}
                    >
                        Ожидающие ({pendingCount || 0})
                    </button>

                    <button
                        className={cn(styles.adminOrdersTab, {
                            [styles.active]: status === 'terminating',
                        })}
                        onClick={() => setStatusHadler('terminating')}
                    >
                        Завершающиеся ({terminatingCount || 0})
                    </button>

                    <button
                        className={cn(styles.adminOrdersTab, {
                            [styles.active]: status === 'unprocessed',
                        })}
                        onClick={() => setStatusHadler('unprocessed')}
                    >
                        Необработанные ({unprocessedCount || 0})
                    </button>
                </div>

                <div className={styles.titleWrap}>
                    <Text>Заказы {!!data && !!data.totalCount && `(${data.totalCount})`}</Text>

                    <div className={styles.adminDishSearch}>
                        <Input placeholder="Поиск" value={search} setValue={setSearch} full />
                    </div>

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
                                prolongCallback={() => adminProlongationOrder(order.id, revalidateRequests)}
                                isAdmin={roles?.includes('ADMIN')}
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
