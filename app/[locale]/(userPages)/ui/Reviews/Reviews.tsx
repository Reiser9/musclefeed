'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { ArrowRight } from '@/shared/icons';
import { ReviewItem } from '@/entities/review/ui';
import { useReviews } from '@/features/reviews';

import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';
import { useAppSelector } from '@/shared/hooks/useRedux';

const Reviews = () => {
    const { getReviews } = useReviews();
    const t = useTranslations('Reviews');
    const language = useAppSelector((state) => state.app.language);

    const { data, isPending, isError } = useQuery({
        queryKey: ['reviews', 1],
        queryFn: () => getReviews(1),
        placeholderData: keepPreviousData,
    });

    return (
        <section className={styles.reviews}>
            <div className={base.container}>
                <div className={styles.reviewsInner}>
                    <div className={styles.reviewsTitleInner}>
                        <div className={styles.reviewsTitleWrap}>
                            <Text variant="h1" upper>
                                {t('reviews_title')}
                            </Text>

                            <p className={styles.reviewsText}>{t('reviews_text')}</p>
                        </div>

                        <Button href={`/${language}/reviews`} color="green">
                            {t('reviews_all')}
                            <ArrowRight />
                        </Button>
                    </div>

                    {isPending ? (
                        <Preloader small page />
                    ) : isError ? (
                        <NotContent />
                    ) : !!data && !!data.reviews.length ? (
                        <div className={styles.reviewsContent}>
                            {data.reviews.map((review) => (
                                <ReviewItem key={review.id} data={review} />
                            ))}
                        </div>
                    ) : (
                        <NotContent text={t('reviews_empty')} />
                    )}
                </div>
            </div>
        </section>
    );
};

export default Reviews;
