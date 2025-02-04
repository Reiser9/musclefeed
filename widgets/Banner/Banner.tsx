'use client';

import React from 'react';
import cn from 'classnames';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { ArrowRight } from '@/shared/icons';

import { Button } from '@/shared/ui/Button';

type Props = {
    innerClass?: string
}

const Banner: React.FC<Props> = ({innerClass}) => {
    return (
        <section className={styles.banner}>
            <div className={base.container}>
                <div className={cn(styles.bannerInner, innerClass)}>
                    <img src="img/foods.png" alt="img" className={styles.bannerFood} />
                    <p className={cn(styles.bannerSign, styles.bannerSign1)}>Сразу станет ясно!</p>
                    <p className={cn(styles.bannerSign, styles.bannerSign2)}>Пробный заказ за 500 ₽</p>

                    <div className={styles.bannerContent}>
                        <h2 className={styles.bannerTitle}>
                            <span>не можете</span>
                            <span>выбрать что вам нужно</span>
                            <span className={styles.green}>просто попробуйте наши блюда</span>
                        </h2>

                        <p className={styles.bannerText}>
                            Меню с КБЖУ: креветки, авокадо, свежие ягоды и другие премиальные продукты.
                        </p>

                        <Button className={styles.bannerLink}>
                            Сделать пробный заказ
                            <ArrowRight />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;
