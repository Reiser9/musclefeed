'use client';

import React from 'react';

import styles from './index.module.scss';
import { Swap } from '@/shared/icons';
import { Button } from '@/shared/ui/Button';

type Props = {};

const DishItem: React.FC<Props> = ({}) => {
    return (
        <div className={styles.foodItem}>
            <div className={styles.foodItemImg}>
                <img src="/img/food.png" alt="food" />
            </div>

            <div className={styles.foodItemTextInner}>
                <p className={styles.foodItemTag}>Завтрак</p>

                <p className={styles.foodItemName}>Овощное рагу с фрикадельками</p>

                <p className={styles.foodItemText}>
                    Филе телятины, кабачок, лук репчатый, томатная паста, морковь, перец болгарский, масло (оливковое /
                    растительное), зелень по вкусу, соль/специи, картофель, вода
                </p>

                <div className={styles.foodItemParams}>
                    <p className={styles.foodItemParam}>
                        <span>Ккал</span> 200
                    </p>
                    <p className={styles.foodItemParam}>
                        <span>Б</span> 20
                    </p>
                    <p className={styles.foodItemParam}>
                        <span>Ж</span> 20
                    </p>
                    <p className={styles.foodItemParam}>
                        <span>У</span> 200
                    </p>
                </div>

                <Button full className={styles.foodButton}>
                    <Swap />
                    Заменить блюдо
                </Button>
            </div>
        </div>
    );
};

export default DishItem;
