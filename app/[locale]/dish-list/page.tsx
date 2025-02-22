'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import styles from './index.module.scss';

import { useOrder } from '@/features/order';
import { PrivateWrapper } from '@/shared/wrappers/PrivateWrapper';

import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';
import DishListItem from './DishListItem';

const AdminDishList = () => {
    const search = useSearchParams();
    const date = search.get('date');

    const { createOrderDishList } = useOrder();

    const { data, isPending, isError } = useQuery({
        queryKey: ['admin_dish_list', date],
        queryFn: () => createOrderDishList(date || ''),
        enabled: !!date,
    });

    if (isPending) {
        <Preloader page />;
    }

    if (isError) {
        <NotContent />;
    }

    return (
        <PrivateWrapper haveRole="ADMIN">
            <div className={styles.dishListContent} contentEditable suppressContentEditableWarning>
                {!!data && !!data.orders.length ? (
                    data.orders.map((order) => <DishListItem key={order.id} data={order} />)
                ) : (
                    <NotContent text="Заказов за данный период не обнаружено" />
                )}

                <button className={styles.printButton} onClick={() => window.print()}>
                    Печать
                </button>
            </div>
        </PrivateWrapper>
    );
};

export default AdminDishList;
