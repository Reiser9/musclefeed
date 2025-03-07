'use client';

import React from 'react';
import cn from 'classnames';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { ArrowRight } from '@/shared/icons';

import { Button } from '@/shared/ui/Button';
import { useAppSelector } from '@/shared/hooks/useRedux';

const BannerSmall = () => {
    const t = useTranslations('Banner2');

    const language = useAppSelector((state) => state.app.language);

    return (
        <section className={styles.banner}>
            <div className={base.container}>
                <div className={styles.banner2Inner}>
                    <div className={cn('bannerFood', 'small')}>
                        <Image src="/img/foods.png" alt="img" fill />
                    </div>

                    <div className={styles.bannerContent}>
                        <h2 className={styles.bannerTitle}>
                            <span>{t('title1')}</span>
                            <span>
                                {t('title2')} <span className={styles.green}>{t('title3')}</span>
                            </span>
                        </h2>

                        <p className={styles.bannerText}>{t('text')}</p>

                        <Button color="green" href={`/${language}`} className={styles.bannerLinkSmall}>
                            {t('button')}
                            <ArrowRight />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BannerSmall;
