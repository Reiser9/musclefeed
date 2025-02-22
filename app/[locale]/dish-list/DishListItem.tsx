'use client';

import React from 'react';

import styles from './index.module.scss';

import type { OrderDishList } from '@/entities/order';
import Image from 'next/image';
import { Text } from '@/shared/ui/Text';

type Props = {
    data: OrderDishList;
};

const DishListItem: React.FC<Props> = ({ data }) => {
    const { dishes, menu, total, id } = data || {};

    return (
        <div className={styles.dishListWrapper}>
            <div className={styles.dishListItem}>
                <p className={styles.dishListItemNumber}>#{id}</p>

                <div className={styles.dishListItemContent}>
                    <div className={styles.dishListItemLogo}>
                        <Image src="/img/logo.png" alt="logo" fill />
                    </div>

                    <div className={styles.dishListItemTexts}>
                        <p className={styles.dishListItemTitle}>{menu.name.ru}</p>

                        <p className={styles.dishListItemText}>{menu.description.ru}</p>
                    </div>

                    <div className={styles.dishListPoints}>
                        {dishes.map((dish, index) => (
                            <div key={dish.id} className={styles.dishListPoint}>
                                <Text upper fontWeight={600}>
                                    {index + 1}. {dish.name.ru}
                                </Text>

                                <div className={styles.dishListPointItems}>
                                    <div className={styles.dishListPointItem}>
                                        <p>Калории</p>
                                        <p>{dish.calories}</p>
                                    </div>

                                    <div className={styles.dishListPointItem}>
                                        <p>Белки</p>
                                        <p>{dish.proteins}</p>
                                    </div>

                                    <div className={styles.dishListPointItem}>
                                        <p>Жиры</p>
                                        <p>{dish.fats}</p>
                                    </div>

                                    <div className={styles.dishListPointItem}>
                                        <p>Углеводы</p>
                                        <p>{dish.carbohydrates}</p>
                                    </div>
                                </div>

                                <Text variant="text2">{dish.description.ru}</Text>
                            </div>
                        ))}

                        <div className={styles.dishListPoint}>
                            <Text upper fontWeight={600}>
                                Всего за день
                            </Text>

                            <div className={styles.dishListPointItems}>
                                <div className={styles.dishListPointItem}>
                                    <p>Калории</p>
                                    <p>{total.calories}</p>
                                </div>

                                <div className={styles.dishListPointItem}>
                                    <p>Белки</p>
                                    <p>{total.proteins}</p>
                                </div>

                                <div className={styles.dishListPointItem}>
                                    <p>Жиры</p>
                                    <p>{total.fats}</p>
                                </div>

                                <div className={styles.dishListPointItem}>
                                    <p>Углеводы</p>
                                    <p>{total.carbohydrates}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.dishListItem}>
                <p className={styles.dishListItemNumber}>#{id}</p>

                <div className={styles.dishListItemContent}>
                    <div className={styles.dishListItemLogo}>
                        <Image src="/img/logo.png" alt="logo" fill />
                    </div>

                    <div className={styles.dishListItemTexts}>
                        <p className={styles.dishListItemTitle}>{menu.name.he}</p>

                        <p className={styles.dishListItemText}>{menu.description.he}</p>
                    </div>

                    <div className={styles.dishListPoints}>
                        {dishes.map((dish, index) => (
                            <div key={dish.id} className={styles.dishListPoint}>
                                <Text upper fontWeight={600}>
                                    {index + 1}. {dish.name.he}
                                </Text>

                                <div className={styles.dishListPointItems}>
                                    <div className={styles.dishListPointItem}>
                                        <p>קלוריות</p>
                                        <p>{dish.calories}</p>
                                    </div>

                                    <div className={styles.dishListPointItem}>
                                        <p>חלבונים</p>
                                        <p>{dish.proteins}</p>
                                    </div>

                                    <div className={styles.dishListPointItem}>
                                        <p>שומנים</p>
                                        <p>{dish.fats}</p>
                                    </div>

                                    <div className={styles.dishListPointItem}>
                                        <p>פחמימות</p>
                                        <p>{dish.carbohydrates}</p>
                                    </div>
                                </div>

                                <Text variant="text2">{dish.description.he}</Text>
                            </div>
                        ))}

                        <div className={styles.dishListPoint}>
                            <Text upper fontWeight={600}>
                                רק ביום
                            </Text>

                            <div className={styles.dishListPointItems}>
                                <div className={styles.dishListPointItem}>
                                    <p>קלוריות</p>
                                    <p>{total.calories}</p>
                                </div>

                                <div className={styles.dishListPointItem}>
                                    <p>חלבונים</p>
                                    <p>{total.proteins}</p>
                                </div>

                                <div className={styles.dishListPointItem}>
                                    <p>שומנים</p>
                                    <p>{total.fats}</p>
                                </div>

                                <div className={styles.dishListPointItem}>
                                    <p>פחמימות</p>
                                    <p>{total.carbohydrates}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DishListItem;
