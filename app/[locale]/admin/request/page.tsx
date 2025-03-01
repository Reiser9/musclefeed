'use client';

import React from 'react';
import cn from 'classnames';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import styles from './index.module.scss';

import { RequestAdminItem } from '@/entities/order/ui';
import { useOrder } from '@/features/order';

import { Text } from '@/shared/ui/Text';
import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';

const AdminRequests = () => {
    const [page, setPage] = React.useState(1);

    const { getAdminChangeRequests } = useOrder();

    const { data, isPending, isError } = useQuery({
        queryKey: ['admin_dishs', page],
        queryFn: () => getAdminChangeRequests(page, 12),
        placeholderData: keepPreviousData,
    });

    if (isPending) {
        return <Preloader page />;
    }

    if (isError) {
        return <NotContent />;
    }

    return (
        <div className={styles.adminDish}>
            <div className={styles.titleWrapper}>
                <Text>Запросы {!!data && !!data?.totalCount && `(${data?.totalCount})`}</Text>
            </div>

            {!!data && !!data.orderChangeRequests?.length ? (
                <div className={styles.adminDishItems}>
                    {data.orderChangeRequests.map((request) => (
                        <RequestAdminItem key={request.id} data={request} />
                    ))}
                </div>
            ) : (
                <NotContent text="Запросов на изменения нет" />
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
    );
};

export default AdminRequests;
