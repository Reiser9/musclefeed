'use client';

import React from 'react';
import cn from 'classnames';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link as ScrollLink } from 'react-scroll';

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
                    <div className="bannerFood">
                        <Image src="/img/foods.png" alt="img" fill />
                    </div>

                    <p className={cn("bannerSign", "bannerSign1")}>{t('abs_text1')}</p>
                    <p className={cn("bannerSign", "bannerSign2")}>{t('abs_text2')}</p>

                    <div className={styles.bannerContent}>
                        <h2 className={styles.bannerTitle}>
                            <span>{t('title1')}</span>
                            <span>{t('title2')}</span>
                            <span className={styles.green}>{t('title3')}</span>
                        </h2>

                        <p className={styles.bannerText}>{t('text')}</p>

                        <ScrollLink to="menu" smooth={true} duration={400}>
                            <Button className={styles.bannerLink} color="green">
                                {t('button')}
                                <ArrowRight />
                            </Button>
                        </ScrollLink>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;
