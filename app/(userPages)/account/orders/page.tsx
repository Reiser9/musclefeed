'use client';

import React from 'react';
import cn from 'classnames';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { AuthWrapper } from '@/shared/wrappers/InitialWrapper';
import { BreadcrumbLink, Breadcrumbs, BreadcrumbText } from '@/shared/ui/Breadcrumbs';
import { ArrowRightShort, Calendar, Fire, Home } from '@/shared/icons';
import { Text } from '@/shared/ui/Text';
import { BackLink } from '@/shared/ui/BackLink';
import { Button } from '@/shared/ui/Button';
import Image from 'next/image';

const AccountOrders = () => {
    return (
        <AuthWrapper>
            <Breadcrumbs>
                <BreadcrumbLink href="/">
                    <Home />
                </BreadcrumbLink>

                <ArrowRightShort />

                <BreadcrumbLink href="/account">Личный кабинет</BreadcrumbLink>

                <ArrowRightShort />

                <BreadcrumbText>Заказы</BreadcrumbText>
            </Breadcrumbs>

            <div className={styles.orders}>
                <div className={base.container}>
                    <div className={styles.ordersInner}>
                        <Text variant="h2" upper>
                            Ваши заказы
                        </Text>

                        <BackLink href="/account" text="Назад в Личный кабинет" />

                        <div className={styles.ordersContent}>
                            <div className={styles.ordersSidebar}>
                                <button className={cn(styles.ordersTab, styles.active)}>Все заказы</button>

                                <button className={styles.ordersTab}>Активные</button>

                                <button className={styles.ordersTab}>Замороженные</button>

                                <button className={styles.ordersTab}>Не оплаченные</button>

                                <button className={styles.ordersTab}>Завершенные</button>
                            </div>

                            <div className={styles.ordersList}>
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
                                                Сбалансированная программа питания, рассчитанная на калории, белки, жиры
                                                и углеводы. Идеально подойдет для вашей цели
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
                                                    Мы приостановим доставку вам еды до тех пор пока вы не активируете
                                                    рацион
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthWrapper>
    );
};

export default AccountOrders;
