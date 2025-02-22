'use client';

import React from 'react';

import styles from './index.module.scss';

import type { Order } from '../model';
import { useAppSelector } from '@/shared/hooks/useRedux';

import { Text } from '@/shared/ui/Text';
import Link from 'next/link';

type Props = {
    data: Order;
};

const OrderAdminItem: React.FC<Props> = ({ data }) => {
    const language = useAppSelector((state) => state.app.language);
    const { id, allergies, comment, daysCount, daysLeft, email, paymentMethod } = data || {};

    return (
        <div className={styles.orderAdminItem}>
            <Link href={`/${language}/admin/order/edit/${id}`} className={styles.orderAdminItemNumber}>
                Заказ #{id}
            </Link>

            <Text variant="text2">Аллергии: {allergies ?? 'Нет'}</Text>
            <Text variant="text2">Комментарий: {comment ?? 'Нет'}</Text>
            <Text variant="text2">Метод оплаты: {paymentMethod.name.ru}</Text>
            <Text variant="text2">Почта: {email}</Text>
            <Text variant="text2">Всего дней: {daysCount}</Text>
            <Text variant="text2">Осталось дней: {daysLeft}</Text>
        </div>
    );
};

export default OrderAdminItem;
