'use client';

import React from 'react';
import cn from 'classnames';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { ArrowRight } from '@/shared/icons';

import { Button } from '@/shared/ui/Button';

const BannerSmall = () => {
    return (
        <section className={styles.banner}>
            <div className={base.container}>
                <div className={styles.banner2Inner}>
                    <img src="/img/foods.png" alt="img" className={cn(styles.bannerFood, styles.small)} />

                    <div className={styles.bannerContent}>
                        <h2 className={styles.bannerTitle}>
                            <span>Заказать еду легко Выбирайте</span>
                            <span>
                                программу <span className={styles.green}>и достигайте цели</span>
                            </span>
                        </h2>

                        <p className={styles.bannerText}>
                            Меню с КБЖУ: креветки, авокадо, свежие ягоды и другие премиальные продукты.
                        </p>

                        <Button color="green" className={styles.bannerLinkSmall}>
                            Узнать подробнее
                            <ArrowRight />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BannerSmall;
