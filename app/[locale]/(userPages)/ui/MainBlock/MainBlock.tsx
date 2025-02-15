'use client';

import React from 'react';
import cn from 'classnames';
import { useTranslations } from 'next-intl';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { ArrowRight, Broccoli, Foods, Moped, Switch, Vegetables } from '@/shared/icons';

import { Button } from '@/shared/ui/Button';

const MainBlock = () => {
    const t = useTranslations("MainBlock");

    return (
        <main className={styles.main}>
            <div className={base.container}>
                <div className={styles.mainWrapper}>
                    <div className={styles.mainInner}>
                        <img src="/img/main-bg.png" alt="bg" className={styles.mainBg} />
                        <img src="/img/main-food.png" alt="food" className={styles.mainImg} />

                        <div className={styles.mainContent}>
                            <h1 className={styles.mainTitleInner}>
                                <span className={styles.mainTitle}>{t('title1')}</span>
                                <span className={cn(styles.mainTitle, styles.green)}>{t('title2')}</span>
                                <span className={styles.mainTitle}>{t('title3')}</span>
                            </h1>

                            <div className={styles.mainTextInner}>
                                <p className={styles.mainText}>
                                    {t('text')}
                                </p>

                                <p className={styles.mainSubtext}>{t('subtext')}</p>
                            </div>

                            <Button className={styles.mainLink}>
                                {t('button')}
                                <ArrowRight />
                            </Button>

                            <p className={styles.mainDelivery}>{t('abs_text')}</p>
                        </div>
                    </div>

                    <div className={styles.mainPoints}>
                        <div className={styles.mainPoint}>
                            <div className={styles.mapPointIcon}>
                                <Moped />
                            </div>

                            <p className={styles.mapPointText}>{t('point1')}</p>
                        </div>

                        <div className={styles.mainPoint}>
                            <div className={styles.mapPointIcon}>
                                <Broccoli />
                            </div>

                            <p className={styles.mapPointText}>{t('point2')}</p>
                        </div>

                        <div className={styles.mainPoint}>
                            <div className={styles.mapPointIcon}>
                                <Foods />
                            </div>

                            <p className={styles.mapPointText}>{t('point3')}</p>
                        </div>

                        <div className={styles.mainPoint}>
                            <div className={styles.mapPointIcon}>
                                <Switch />
                            </div>

                            <p className={styles.mapPointText}>{t('point4')}</p>
                        </div>

                        <div className={styles.mainPoint}>
                            <div className={styles.mapPointIcon}>
                                <Vegetables />
                            </div>

                            <p className={styles.mapPointText}>{t('point5')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default MainBlock;
