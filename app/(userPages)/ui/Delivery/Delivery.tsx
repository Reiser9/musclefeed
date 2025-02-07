'use client';

import React from 'react';
import Image from 'next/image';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { ArrowRight, Foods, Moped, Switch, Vegetables } from '@/shared/icons';

import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';

const Delivery = () => {
    return (
        <section className={styles.map}>
            <div className={base.container}>
                <div className={styles.mapInner}>
                    <div className={styles.mapContent}>
                        <div className={styles.mapTextInner}>
                            <Text variant='h1' upper>Бесплатно доставим</Text>

                            <p className={styles.mapTextText}>в выделенной области</p>
                        </div>

                        <div className={styles.mapPoints}>
                            <div className={styles.mapPoint}>
                                <div className={styles.mapPointIcon}>
                                    <Moped />
                                </div>

                                <p className={styles.mapPointText}>Доставка каждые два дня с 6 до 12</p>
                            </div>

                            <div className={styles.mapPoint}>
                                <div className={styles.mapPointIcon}>
                                    <Foods />
                                </div>

                                <p className={styles.mapPointText}>Доставим еду прямо к завтраку</p>
                            </div>

                            <div className={styles.mapPoint}>
                                <div className={styles.mapPointIcon}>
                                    <Switch />
                                </div>

                                <p className={styles.mapPointText}>Бесплатная замена блюд в меню</p>
                            </div>

                            <div className={styles.mapPoint}>
                                <div className={styles.mapPointIcon}>
                                    <Vegetables />
                                </div>

                                <p className={styles.mapPointText}>Готовим из натуральных продуктов</p>
                            </div>
                        </div>

                        <div className={styles.mapButtons}>
                            <Button>
                                Сделать заказ
                                <ArrowRight />
                            </Button>

                            <Button color="green">
                                Узнать больше о доставке
                                <ArrowRight />
                            </Button>
                        </div>
                    </div>

                    <div className={styles.mapImg}>
                        <Image src="/img/map.png" alt="map" fill />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Delivery;
