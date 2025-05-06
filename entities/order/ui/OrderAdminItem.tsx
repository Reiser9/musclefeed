'use client';

import React from 'react';
import dayjs from 'dayjs';
import Link from 'next/link';

import styles from './index.module.scss';

import type { Order } from '../model';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { Delete } from '@/shared/icons';

import { Text } from '@/shared/ui/Text';
import { ConfirmModal } from '@/shared/ui/Modal';
import { Button } from '@/shared/ui/Button';

type Props = {
    data: Order;
    deleteCallback: () => void;
};

const OrderAdminItem: React.FC<Props> = ({ data, deleteCallback = () => {} }) => {
    const [deleteModal, setDeleteModal] = React.useState(false);
    const [show, setShow] = React.useState(false);

    const language = useAppSelector((state) => state.app.language);
    const {
        id,
        allergies,
        comment,
        daysCount,
        daysLeft,
        email,
        paymentMethod,
        startDate,
        endDate,
        apartment,
        city,
        floor,
        fullName,
        house,
        street,
        finalPrice,
        phone,
        createdAt,
        menu,
        isIndividual
    } = data || {};

    const { name } = menu || {};

    return (
        <>
            <div className={styles.orderAdminItem}>
                <Link href={`/${language}/admin/order/edit/${id}`} className={styles.orderAdminItemNumber}>
                    Заказ #{id}
                </Link>

                <Text variant="text2">Программа: {isIndividual ? 'Индивидуальный заказ' : name?.ru}</Text>
                <Text variant="text2">Дата создания: {dayjs(createdAt).format('DD.MM.YYYY')}</Text>
                <Text variant="text2">Заказчик: {fullName}</Text>
                <Text variant="text2">Телефон: {phone}</Text>
                {show && (
                    <>
                        <Text variant="text2">Цена: {finalPrice} ₪</Text>
                        <Text variant="text2">Метод оплаты: {paymentMethod.name.ru}</Text>
                        <Text variant="text2">Email: {email}</Text>
                        <Text variant="text2">
                            Адрес: {`${city.name.ru}, ${street}, ${house}, ${floor}, ${apartment}`}
                        </Text>
                        <Text variant="text2">Комментарий: {comment ?? 'Нет'}</Text>
                        <Text variant="text2">Дата начала: {dayjs(startDate).format('DD.MM.YYYY')}</Text>
                        <Text variant="text2">Дата окончания: {dayjs(endDate).format('DD.MM.YYYY')}</Text>
                        <Text variant="text2">Всего дней: {daysCount}</Text>
                        <Text variant="text2">Осталось дней: {daysLeft}</Text>
                        <Text variant="text2">Аллергии: {allergies ?? 'Нет'}</Text>
                    </>
                )}

                <Button full small onClick={() => setShow((prev) => !prev)}>
                    {show ? 'Скрыть' : 'Показать'}
                </Button>

                <Button color='green' full small>
                    Продлить
                </Button>

                <button className={styles.teamAdminDelete} onClick={() => setDeleteModal(true)}>
                    <Delete />
                </button>
            </div>

            <ConfirmModal
                value={deleteModal}
                setValue={setDeleteModal}
                callback={deleteCallback}
                title={`Вы действительно хотите удалить заказ #${id}?`}
            />
        </>
    );
};

export default OrderAdminItem;
