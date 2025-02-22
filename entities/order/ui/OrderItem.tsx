'use client';

import React from 'react';
import Image from 'next/image';

import styles from './index.module.scss';

import type { Order } from '../model';
import { Calendar, Fire } from '@/shared/icons';

import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';

type Props = {
    data?: Order;
};

const OrderItem: React.FC<Props> = ({ data }) => {
    const {} = data || {};

    return (
        <div className={styles.ordersItem}>
            <div className={styles.ordersItemImg}>
                <Image src="/img/review1.png" alt="order" fill />

                <p className={styles.ordersItemSign}>
                    <Calendar />
                    Осталось 3 дня
                </p>
            </div>

            <div className={styles.ordersItemContent}>
                <div className={styles.ordersItemTextInner}>
                    <Text variant="h3" upper>
                        Правильное питание
                    </Text>

                    <p className={styles.ordersItemDesc}>
                        Сбалансированная программа питания, рассчитанная на калории, белки, жиры и углеводы. Идеально
                        подойдет для вашей цели
                    </p>
                </div>

                <div className={styles.ordersItemPoints}>
                    <p className={styles.ordersItemPoint}>
                        <Fire className={styles.ordersItemPointRed} />
                        Ккал 2000
                    </p>

                    <p className={styles.ordersItemPoint}>
                        <Calendar />
                        24 дня
                    </p>
                </div>

                <Button full small>
                    Подробнее о меню
                </Button>

                <Button full small color="green">
                    Замена блюд
                </Button>

                <div className={styles.ordersItemFreeze}>
                    <div className={styles.ordersItemFreezeSwitch}>
                        <div className={styles.ordersItemFreezeCircle}></div>
                    </div>

                    <div className={styles.ordersItemFreezeTextInner}>
                        <p className={styles.ordersItemFreezeTitle}>Заморозить</p>

                        <p className={styles.ordersItemFreezeText}>
                            Мы приостановим доставку вам еды до тех пор пока вы не активируете рацион
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderItem;
