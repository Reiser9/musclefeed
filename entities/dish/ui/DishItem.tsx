'use client';

import React from 'react';
import Image from 'next/image';

import styles from './index.module.scss';

import type { Dish } from '../model';
import { Swap } from '@/shared/icons';
import { useAppSelector } from '@/shared/hooks/useRedux';

import { Button } from '@/shared/ui/Button';

type Props = {
    data: Dish;
    buttonText?: string;
    buttonCallback?: () => void;
};

const DishItem: React.FC<Props> = ({ data, buttonText = 'Посмотреть замены', buttonCallback }) => {
    const { picture, name, description, proteins, fats, carbohydrates, calories, dishType } = data || {};

    const language = useAppSelector((state) => state.app.language);

    return (
        <div className={styles.foodItem}>
            <div className={styles.foodItemImg}>
                <Image src={picture} alt={name[language]} fill />
            </div>

            <div className={styles.foodItemTextInner}>
                <p className={styles.foodItemTag}>{dishType.name[language]}</p>

                <p className={styles.foodItemName}>{name[language]}</p>

                <p className={styles.foodItemText}>{description[language]}</p>

                <div className={styles.foodItemParams}>
                    <p className={styles.foodItemParam}>
                        <span>Ккал</span> {calories}
                    </p>
                    <p className={styles.foodItemParam}>
                        <span>Б</span> {proteins}
                    </p>
                    <p className={styles.foodItemParam}>
                        <span>Ж</span> {fats}
                    </p>
                    <p className={styles.foodItemParam}>
                        <span>У</span> {carbohydrates}
                    </p>
                </div>

                {buttonCallback && (
                    <Button full className={styles.foodButton} onClick={buttonCallback}>
                        <Swap />
                        {buttonText}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default DishItem;
