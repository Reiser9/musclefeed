'use client';

import React from 'react';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { ArrowRight } from '@/shared/icons';

import { Button } from '@/shared/ui/Button';

const Delivery = () => {
    return (
        <section className={styles.map}>
            <div className={base.container}>
                <div className={styles.mapInner}>
                    <div className={styles.mapContent}>
                        <div className={styles.mapTextInner}>
                            <p className={styles.mapTextTitle}>Бесплатно доставим</p>

                            <p className={styles.mapTextText}>в выделенной области</p>
                        </div>

                        <div className={styles.mapPoints}>
                            <div className={styles.mapPoint}>
                                <div className={styles.mapPointIcon}>
                                    <img src="img/map1.svg" alt="icon" />
                                </div>

                                <p className={styles.mapPointText}>Доставка каждые два дня с 6 до 12</p>
                            </div>

                            <div className={styles.mapPoint}>
                                <div className={styles.mapPointIcon}>
                                    <img src="img/map2.svg" alt="icon" />
                                </div>

                                <p className={styles.mapPointText}>Доставим еду прямо к завтраку</p>
                            </div>

                            <div className={styles.mapPoint}>
                                <div className={styles.mapPointIcon}>
                                    <img src="img/map3.svg" alt="icon" />
                                </div>

                                <p className={styles.mapPointText}>Бесплатная замена блюд в меню</p>
                            </div>

                            <div className={styles.mapPoint}>
                                <div className={styles.mapPointIcon}>
                                    <img src="img/map4.svg" alt="icon" />
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
                        <img src="img/map.png" alt="map" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Delivery;
