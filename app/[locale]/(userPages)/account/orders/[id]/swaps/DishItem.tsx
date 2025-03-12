'use client';

import React from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import styles from '../../index.module.scss';

import { useAppSelector } from '@/shared/hooks/useRedux';
import { Dish } from '@/entities/dish';
import { useOrder } from '@/features/order';
import { Day } from '@/entities/order';
import SwapItem from './SwapItem';

import { Button } from '@/shared/ui/Button';
import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';

type Props = {
    data: Dish;
    day: Day | null;
    dayId?: number;
};

const isPastOrToday = (days?: Date) => {
    if (!days) return;

    const inputDate = new Date(days);
    const today = new Date();

    // Обнуляем время, чтобы сравнивать только даты
    today.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);

    return inputDate <= today;
};

const DishItem: React.FC<Props> = ({ data, dayId, day }) => {
    const { date } = day || {};
    const [swapsShowed, setSwapsShowed] = React.useState(false);

    const language = useAppSelector((state) => state.app.language);
    const { picture, name, description, calories, carbohydrates, fats, dishType, proteins, count } = data || {};

    const t = useTranslations("Menu");

    const { getReplacementDishes } = useOrder();

    const {
        data: swaps,
        isLoading: swapsIsPending,
        isError: swapsIsError,
    } = useQuery({
        queryKey: ['order_swaps_by_dishes', dayId, dishType.id],
        queryFn: () => getReplacementDishes(String(dayId), dishType.id),
        enabled: !!dayId && !!dishType.id && swapsShowed,
    });

    return (
        <>
            <div className={styles.swapItem}>
                <div className={styles.swapItemImg}>
                    <Image src={picture} alt={name[language]} fill />
                </div>

                <div className={styles.swapItemContent}>
                    <div className={styles.swapItemWrapper}>
                        <p className={styles.foodItemTag}>{dishType.name[language]}</p>

                        <p className={styles.swapItemName}>
                            {name[language]} {count !== 1 ? `x${count}` : ''}
                        </p>

                        <p className={styles.swapItemText}>{description[language]}</p>

                        <div className={styles.swapItemParams}>
                            <p className={styles.swapItemParam}>{t("ccal")} {calories}</p>

                            <p className={styles.swapItemParam}>{t("b")} {proteins}</p>

                            <p className={styles.swapItemParam}>{t("j")} {fats}</p>

                            <p className={styles.swapItemParam}>{t("u")} {carbohydrates}</p>
                        </div>
                    </div>

                    <Button
                        small
                        disabled={isPastOrToday(date)}
                        className={styles.swapItemButton}
                        onClick={() => setSwapsShowed((prev) => !prev)}
                    >
                        {t("swap_dish")}
                    </Button>
                </div>
            </div>

            {!isPastOrToday(date) && swapsShowed && (
                <div className={styles.swapElems}>
                    {swapsIsPending ? (
                        <Preloader small page />
                    ) : swapsIsError ? (
                        <NotContent />
                    ) : !!swaps && !!swaps.length ? (
                        swaps.map((swap) => <SwapItem key={swap.id} data={swap} dayId={dayId} />)
                    ) : (
                        <NotContent text={t("swaps_empty")} />
                    )}
                </div>
            )}
        </>
    );
};

export default DishItem;
