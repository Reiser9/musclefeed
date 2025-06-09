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
                        {menu ? (
                            <>
                                <p className={styles.dishListItemTitle}>{menu.name.ru}</p>

                                <p className={styles.dishListItemText}>{menu.description.ru}</p>
                            </>
                        ) : (
                            <p className={styles.dishListItemTitle}>Индивидуальный заказ</p>
                        )}
                    </div>

                    <div className={styles.dishListPoints}>
                        {dishes.map((dish, index) => {
                            const { id, count, name, calories, proteins, fats, carbohydrates, description } = dish || {};

                            return (
                                <div key={id} className={styles.dishListPoint}>
                                    <Text upper fontWeight={600}>
                                        {index + 1}. {name.ru} {count && count > 1 && `x${count}`}
                                    </Text>

                                    <div className={styles.dishListPointItems}>
                                        <div className={styles.dishListPointItem}>
                                            <p>Калории</p>
                                            <p>{calories}</p>
                                        </div>

                                        <div className={styles.dishListPointItem}>
                                            <p>Белки</p>
                                            <p>{proteins}</p>
                                        </div>

                                        <div className={styles.dishListPointItem}>
                                            <p>Жиры</p>
                                            <p>{fats}</p>
                                        </div>

                                        <div className={styles.dishListPointItem}>
                                            <p>Углеводы</p>
                                            <p>{carbohydrates}</p>
                                        </div>
                                    </div>

                                    <Text variant="text2">{description.ru}</Text>
                                </div>
                            );
                        })}

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
                        {menu ? (
                            <>
                                <p className={styles.dishListItemTitle}>{menu.name.he}</p>

                                <p className={styles.dishListItemText}>{menu.description.he}</p>
                            </>
                        ) : (
                            <p className={styles.dishListItemTitle}>הזמנה אישית</p>
                        )}
                    </div>

                    <div className={styles.dishListPoints}>
                        {dishes.map((dish, index) => {
                            const { id, count, name, calories, proteins, fats, carbohydrates, description } = dish || {};

                            return (
                                <div key={id} className={styles.dishListPoint}>
                                    <Text upper fontWeight={600}>
                                        {index + 1}. {name.he} {count && count > 1 && `x${count}`}
                                    </Text>

                                    <div className={styles.dishListPointItems}>
                                        <div className={styles.dishListPointItem}>
                                            <p>קלוריות</p>
                                            <p>{calories}</p>
                                        </div>

                                        <div className={styles.dishListPointItem}>
                                            <p>חלבונים</p>
                                            <p>{proteins}</p>
                                        </div>

                                        <div className={styles.dishListPointItem}>
                                            <p>שומנים</p>
                                            <p>{fats}</p>
                                        </div>

                                        <div className={styles.dishListPointItem}>
                                            <p>פחמימות</p>
                                            <p>{carbohydrates}</p>
                                        </div>
                                    </div>

                                    <Text variant="text2">{description.he}</Text>
                                </div>
                            );
                        })}

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
