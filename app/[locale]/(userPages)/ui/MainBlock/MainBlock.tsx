'use client';

import React from 'react';
import cn from 'classnames';
import Image from 'next/image';
import { Link as ScrollLink } from 'react-scroll';
import { useTranslations } from 'next-intl';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { ArrowRight, Broccoli, Foods, Moped, Switch, Vegetables } from '@/shared/icons';

import { Button } from '@/shared/ui/Button';

const MainBlock = () => {
    const t = useTranslations('MainBlock');

    return (
        <main className={styles.main}>
            <div className={base.container}>
                <div className={styles.mainWrapper}>
                    <div className={styles.mainInner}>
                        <div className={styles.mainBg}>
                            <Image src="/img/main-bg.png" alt="bg" fill />
                        </div>

                        <div className="mainImg">
                            <Image src="/img/main-food.png" alt="food" fill />
                        </div>

                        <div className={styles.mainContent}>
                            <h1 className={styles.mainTitleInner}>
                                <span className={styles.mainTitle}>{t('title1')}</span>
                                <span className={cn(styles.mainTitle, styles.green)}>{t('title2')}</span>
                                <span className={styles.mainTitle}>{t('title3')}</span>
                            </h1>

                            <div className={styles.mainTextInner}>
                                <p className={styles.mainText}>{t('text')}</p>

                                <p className={styles.mainSubtext}>{t('subtext')}</p>
                            </div>

                            <ScrollLink to="menu" smooth={true} duration={400}>
                                <Button className={styles.mainLink}>
                                    {t('button')}
                                    <ArrowRight />
                                </Button>
                            </ScrollLink>

                            <p className="mainDelivery">{t('abs_text')}</p>
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
