'use client';

import React from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';

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

const DishAdminItem: React.FC<Props> = ({ data, dayId }) => {
    const [swapsShowed, setSwapsShowed] = React.useState(false);

    const language = useAppSelector((state) => state.app.language);
    const { picture, name, description, calories, carbohydrates, fats, dishType, proteins } = data || {};

    const { getAdminReplacementDishes } = useOrder();

    const {
        data: swaps,
        isLoading: swapsIsPending,
        isError: swapsIsError,
    } = useQuery({
        queryKey: ['admin_order_swaps_by_dishes', dayId, dishType.id],
        queryFn: () => getAdminReplacementDishes(String(dayId), dishType.id),
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

                        <p className={styles.swapItemName}>{name[language]}</p>

                        <p className={styles.swapItemText}>{description[language]}</p>

                        <div className={styles.swapItemParams}>
                            <p className={styles.swapItemParam}>Ккал {calories}</p>

                            <p className={styles.swapItemParam}>Б {proteins}</p>

                            <p className={styles.swapItemParam}>Ж {fats}</p>

                            <p className={styles.swapItemParam}>У {carbohydrates}</p>
                        </div>
                    </div>

                    <Button small className={styles.swapItemButton} onClick={() => setSwapsShowed((prev) => !prev)}>
                        Заменить блюдо
                    </Button>
                </div>
            </div>

            {swapsShowed && (
                <div className={styles.swapElems}>
                    {swapsIsPending ? (
                        <Preloader small page />
                    ) : swapsIsError ? (
                        <NotContent />
                    ) : !!swaps && !!swaps.length ? (
                        swaps.map((swap) => <SwapItem isAdmin key={swap.id} data={swap} dayId={dayId} />)
                    ) : (
                        <NotContent text="Замен нет" />
                    )}
                </div>
            )}
        </>
    );
};

export default DishAdminItem;
