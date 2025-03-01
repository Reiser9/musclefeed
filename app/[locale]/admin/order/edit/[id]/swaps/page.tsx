'use client';

import React from 'react';
import cn from 'classnames';
import dayjs from 'dayjs';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import 'swiper/css';

import styles from '../../../index.module.scss';

import type { Day } from '@/entities/order';
import { useOrder } from '@/features/order';
import DishAdminItem from '@/app/[locale]/(userPages)/account/orders/[id]/swaps/DishAdminItem';

import { NotContent } from '@/shared/ui/NotContent';
import { Preloader } from '@/shared/ui/Preloader';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { useAppSelector } from '@/shared/hooks/useRedux';

const AdminOrderSwap = () => {
    const { id } = useParams();

    const language = useAppSelector((state) => state.app.language);
    const [activeDate, setActiveDate] = React.useState<Day | null>(null);

    const { getAdminOrderDays, getAdminDayDishes } = useOrder();

    const {
        data: days,
        isPending: daysIsPending,
        isError: daysIsError,
    } = useQuery({
        queryKey: ['admin_order_days_by_id', id],
        queryFn: () => getAdminOrderDays(String(id)),
        enabled: !!id,
    });

    const {
        data: dishes,
        isLoading: dishesIsPending,
        isError: dishesIsError,
    } = useQuery({
        queryKey: ['admin_order_dishes_by_day', activeDate?.id],
        queryFn: () => getAdminDayDishes(String(activeDate?.id)),
        enabled: !!activeDate?.id,
    });

    const today = dayjs().startOf('day');

    React.useEffect(() => {
        if (days && !!days.length) {
            let activeDay: Day | null = null;

            const sortedDays = [...days].sort((a, b) => dayjs(a.date).diff(dayjs(b.date)));

            for (const day of sortedDays) {
                const isToday = dayjs(day.date).startOf('day').isSame(today);
                const isFuture = dayjs(day.date).startOf('day').isAfter(today);

                if (!day.isSkipped) {
                    if (isToday || (!activeDay && isFuture)) {
                        activeDay = day;
                        break;
                    }
                }
            }

            if (activeDay) {
                setActiveDate(activeDay);
            }
        }
    }, [days]);

    return (
        <div className={styles.orderSwap}>
            <div className={styles.orderSwapContent}>
                <Button small href={`/${language}/admin/order/edit/${id}`}>
                    Назад
                </Button>

                <Text>Замены блюд у заказа #{id}</Text>

                {daysIsPending ? (
                    <Preloader page small />
                ) : daysIsError ? (
                    <NotContent />
                ) : (
                    <div className={styles.orderSwapButtons}>
                        {!!days &&
                            days.map((day) => (
                                <button
                                    key={day.id}
                                    onClick={() => {
                                        if (day.isSkipped) return;

                                        setActiveDate(day);
                                    }}
                                    className={cn(styles.orderSwapButton, {
                                        [styles.active]: activeDate?.id === day.id,
                                        [styles.disabled]: day.isSkipped,
                                    })}
                                >
                                    {dayjs(day.date).format('DD.MM.YYYY')}
                                </button>
                            ))}
                    </div>
                )}

                {dishesIsPending ? (
                    <Preloader page small />
                ) : dishesIsError ? (
                    <NotContent />
                ) : !!dishes && !!dishes.dishes ? (
                    <div className={styles.swapItems}>
                        {dishes.dishes.map((dish) => (
                            <DishAdminItem key={dish.id} data={dish} dayId={activeDate?.id} day={activeDate} />
                        ))}
                    </div>
                ) : (
                    <NotContent text="Блюда не найдены" />
                )}
            </div>
        </div>
    );
};

export default AdminOrderSwap;
