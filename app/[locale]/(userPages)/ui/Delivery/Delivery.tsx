'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link as ScrollLink } from 'react-scroll';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { ArrowRight, Foods, Moped, Switch, Vegetables } from '@/shared/icons';

import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';

const Delivery = () => {
    const t = useTranslations('Delivery');

    return (
        <section className={styles.map}>
            <div className={base.container}>
                <div className={styles.mapInner}>
                    <div className={styles.mapContent}>
                        <div className={styles.mapTextInner}>
                            <Text variant="h1" upper>
                                {t('delivery_title')}
                            </Text>

                            <p className={styles.mapTextText}>{t('delivery_text')}</p>
                        </div>

                        <div className={styles.mapPoints}>
                            <div className={styles.mapPoint}>
                                <div className={styles.mapPointIcon}>
                                    <Moped />
                                </div>

                                <p className={styles.mapPointText}>{t('delivery_point1')}</p>
                            </div>

                            <div className={styles.mapPoint}>
                                <div className={styles.mapPointIcon}>
                                    <Foods />
                                </div>

                                <p className={styles.mapPointText}>{t('delivery_point2')}</p>
                            </div>

                            <div className={styles.mapPoint}>
                                <div className={styles.mapPointIcon}>
                                    <Switch />
                                </div>

                                <p className={styles.mapPointText}>{t('delivery_point3')}</p>
                            </div>

                            <div className={styles.mapPoint}>
                                <div className={styles.mapPointIcon}>
                                    <Vegetables />
                                </div>

                                <p className={styles.mapPointText}>{t('delivery_point4')}</p>
                            </div>
                        </div>

                        <div className={styles.mapButtons}>
                            <ScrollLink to="menu" smooth={true} duration={400}>
                                <Button>
                                    {t('delivery_button1')}
                                    <ArrowRight />
                                </Button>
                            </ScrollLink>

                            <Button color="green">
                                {t('delivery_button2')}
                                <ArrowRight />
                            </Button>
                        </div>
                    </div>

                    <div className={styles.mapImg}>
                        <Image src={`${process.env.NEXT_PUBLIC_BASE_MAP}static/map.png`} alt="map" fill />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Delivery;
