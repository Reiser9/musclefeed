'use client';

import React from 'react';
import cn from 'classnames';
import { useTranslations } from 'next-intl';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { ArrowRight } from '@/shared/icons';

import { Button } from '@/shared/ui/Button';

type Props = {
    innerClass?: string;
};

const Banner: React.FC<Props> = ({ innerClass }) => {
    const t = useTranslations('Banner1');

    return (
        <section className={styles.banner}>
            <div className={base.container}>
                <div className={cn(styles.bannerInner, innerClass)}>
                    <img src="/img/foods.png" alt="img" className={styles.bannerFood} />
                    <p className={cn(styles.bannerSign, styles.bannerSign1)}>{t('abs_text1')}</p>
                    <p className={cn(styles.bannerSign, styles.bannerSign2)}>{t('abs_text2')}</p>

                    <div className={styles.bannerContent}>
                        <h2 className={styles.bannerTitle}>
                            <span>{t('title1')}</span>
                            <span>{t('title2')}</span>
                            <span className={styles.green}>{t('title3')}</span>
                        </h2>

                        <p className={styles.bannerText}>{t('text')}</p>

                        <Button className={styles.bannerLink} color="green">
                            {t('button')}
                            <ArrowRight />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;
