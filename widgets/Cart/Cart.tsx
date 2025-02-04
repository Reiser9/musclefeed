'use client';

import React from 'react';
import cn from 'classnames';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { ArrowRight } from '@/shared/icons';

import { Button } from '@/shared/ui/Button';

type Props = {
    active?: boolean;
};

const Cart: React.FC<Props> = ({ active = false }) => {
    return (
        <section
            className={cn(styles.cart, {
                [styles.active]: active,
            })}
        >
            <div className={base.container}>
                <div className={styles.cartInner}>
                    <div className={styles.cartTitleInner}>
                        <p className={styles.cartTitle}>Cкидка! не упускай возможность</p>

                        <p className={styles.cartText}>
                            Рацион на 2 дня <span>(5 приемов пищи в день)</span>
                        </p>
                    </div>

                    <div className={styles.cartPriceInner}>
                        <div className={styles.cartPriceWrap}>
                            <p className={styles.cartPriceOld}>345 ₪</p>

                            <p className={styles.cartPrice}>Итого: 145 ₪ / день</p>
                        </div>

                        <Button className={styles.cartButton}>
                            Оформить заказ за <span className={styles.orderPrice}>2 345</span> ₪
                            <ArrowRight />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cart;
