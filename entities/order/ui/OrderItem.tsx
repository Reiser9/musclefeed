'use client';

import React from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';

import styles from './index.module.scss';

import type { Order } from '../model';
import { Calendar, Fire } from '@/shared/icons';
import { useAppSelector } from '@/shared/hooks/useRedux';

import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';

type Props = {
    data: Order;
    freezeCallback: () => void;
};

const OrderItem: React.FC<Props> = ({ data, freezeCallback = () => {} }) => {
    const language = useAppSelector((state) => state.app.language);

    const { daysLeft, daysCount, menu, id, isIndividual, startDate } = data || {};

    const t = useTranslations('Orders');
    const m = useTranslations('Menu');

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
                        {t('days_left', { daysLeft })}
                    </p>
                )}
            </div>

            <div className={styles.ordersItemContent}>
                <div className={styles.ordersItemTextInner}>
                    <Text variant="h3" upper>
                        {isIndividual
                            ? language === 'ru'
                                ? 'Персональный заказ'
                                : 'הזמנה אישית'
                            : menu?.name[language]}
                    </Text>

                    {!isIndividual && <p className={styles.ordersItemDesc}>{menu?.description[language]}</p>}
                </div>

                <div className={styles.ordersItemPoints}>
                    {!isIndividual && (
                        <p className="ordersItemPoint">
                            <Fire className={styles.ordersItemPointRed} />
                            {m('ccal')} {menu?.calories}
                        </p>
                    )}

                    <p className="ordersItemPoint">
                        <Calendar />
                        {isIndividual ? dayjs(startDate).format('DD.MM.YYYY') : m('days_count', { count: daysCount })}
                    </p>
                </div>

                <Button full small href={`/${language}/account/orders/${id}`}>
                    {t('dishes_more')}
                </Button>

                <Button full small color="green" href={`/${language}/account/orders/${id}/swaps`}>
                    {t('dishes_swap')}
                </Button>

                {!isIndividual && (
                    <div className={styles.ordersItemFreeze} onClick={freezeCallback}>
                        <div className={styles.ordersItemFreezeSwitch}>
                            <div className={styles.ordersItemFreezeCircle}></div>
                        </div>

                        <div className={styles.ordersItemFreezeTextInner}>
                            <p className={styles.ordersItemFreezeTitle}>{t('freeze')}</p>

                            <p className={styles.ordersItemFreezeText}>{t('freeze_text')}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderItem;
