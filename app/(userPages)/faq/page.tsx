'use client';

import React from 'react';
import cn from 'classnames';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { BannerSmall } from '@/widgets/Banner';
import { ArrowRight, ArrowRightShort, Body, Foods, Fridge, Home, Moped } from '@/shared/icons';

import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { BreadcrumbLink, Breadcrumbs, BreadcrumbText } from '@/shared/ui/Breadcrumbs';
import { FaqItem } from '@/entities/faq/ui';

const Faq = () => {
    return (
        <>
            <Breadcrumbs>
                <BreadcrumbLink href="/">
                    <Home />
                </BreadcrumbLink>

                <ArrowRightShort />

                <BreadcrumbLink href="/faq">Покупателю</BreadcrumbLink>

                <ArrowRightShort />

                <BreadcrumbText>Вопросы и ответы</BreadcrumbText>
            </Breadcrumbs>

            <div className={styles.faq}>
                <div className={base.container}>
                    <div className={styles.reviewpageInner}>
                        <Text variant="h2" upper>
                            FAQ
                        </Text>

                        <div className={styles.faqTitleInner}>
                            <div className={styles.faqTitleWrap}>
                                <Text variant="h2" upper>
                                    Ответы на часто задаваемые вопросы
                                </Text>

                                <p className={styles.faqText}>
                                    Наше меню разработано профессиональными диетологами, приготовлено только из
                                    натуральных продуктов и рассчитано на каждого человека под его цели.
                                </p>
                            </div>

                            <Button>
                                Задать вопрос
                                <ArrowRight />
                            </Button>
                        </div>

                        <div className={styles.faqCats}>
                            <button
                                className={cn(styles.faqCat, {
                                    [styles.active]: true,
                                })}
                            >
                                <Moped />
                                Доставка
                            </button>

                            <button
                                className={cn(styles.faqCat)}
                            >
                                <Fridge />
                                Оплата
                            </button>

                            <button
                                className={cn(styles.faqCat)}
                            >
                                <Foods />
                                Рационы
                            </button>

                            <button
                                className={cn(styles.faqCat)}
                            >
                                <Fridge />
                                Хранение
                            </button>

                            <button
                                className={cn(styles.faqCat)}
                            >
                                <Body />
                                Похудение
                            </button>
                        </div>

                        <div className={styles.faqContent}>
                            <FaqItem />
                        </div>
                    </div>
                </div>
            </div>

            <BannerSmall />
        </>
    );
};

export default Faq;
