'use client';

import React from 'react';
import Image from 'next/image';

import styles from './index.module.scss';

import type { Order } from '../model';
import { Calendar, Fire } from '@/shared/icons';
import { useAppSelector } from '@/shared/hooks/useRedux';

import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import dayjs from 'dayjs';

type Props = {
    data: Order;
    freezeCallback: () => void;
};

const OrderItem: React.FC<Props> = ({ data, freezeCallback = () => {} }) => {
    const language = useAppSelector((state) => state.app.language);

    const { daysLeft, daysCount, menu, id, isIndividual, startDate } = data || {};

    return (
        <div className={styles.ordersItem}>
            <div className={styles.ordersItemImg}>
                <Image
                    src={isIndividual ? '/img/review1.png' : menu.backgroundPicture || '/img/review1.png'}
                    alt="order"
                    fill
                />

                {!isIndividual && (
                    <p className={styles.ordersItemSign}>
                        <Calendar />
                        Осталось дней: {daysLeft}
                    </p>
                )}
            </div>

            <div className={styles.ordersItemContent}>
                <div className={styles.ordersItemTextInner}>
                    <Text variant="h3" upper>
                        {isIndividual ? 'Персональный заказ' : menu?.name[language]}
                    </Text>

                    {!isIndividual && <p className={styles.ordersItemDesc}>{menu?.description[language]}</p>}
                </div>

                <div className={styles.ordersItemPoints}>
                    {!isIndividual && (
                        <p className="ordersItemPoint">
                            <Fire className={styles.ordersItemPointRed} />
                            Ккал {menu?.calories}
                        </p>
                    )}

                    <p className="ordersItemPoint">
                        <Calendar />
                        {isIndividual ? dayjs(startDate).format('DD.MM.YYYY') : `${daysCount} дня`}
                    </p>
                </div>

                <Button full small href={`/${language}/account/orders/${id}`}>
                    Подробнее о меню
                </Button>

                <Button full small color="green" href={`/${language}/account/orders/${id}/swaps`}>
                    Замена блюд
                </Button>

                {!isIndividual && (
                    <div className={styles.ordersItemFreeze} onClick={freezeCallback}>
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
                )}
            </div>
        </div>
    );
};

export default OrderItem;
