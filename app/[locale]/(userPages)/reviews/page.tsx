'use client';

import React from 'react';
import cn from 'classnames';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { ArrowRightShort, Home } from '@/shared/icons';
import { BreadcrumbLink, Breadcrumbs, BreadcrumbText } from '@/shared/ui/Breadcrumbs';
import { BannerSmall } from '@/widgets/Banner';
import { ReviewItem } from '@/entities/review/ui';
import ReviewForm from './ui/ReviewForm';
import { useReviews } from '@/features/reviews';

import { Text } from '@/shared/ui/Text';
import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';

const ReviewsPage = () => {
    const [page, setPage] = React.useState(1);

    const { getReviews } = useReviews();
    const t = useTranslations('Reviews');

    const { data, isPending, isError } = useQuery({
        queryKey: ['reviews', page],
        queryFn: () => getReviews(page),
        placeholderData: keepPreviousData,
    });

    return (
        <>
            <Breadcrumbs>
                <BreadcrumbLink href="/">
                    <Home />
                </BreadcrumbLink>

                <ArrowRightShort />

                <BreadcrumbText>{t('reviews')}</BreadcrumbText>
            </Breadcrumbs>

            <div className={styles.reviewpage}>
                <div className={base.container}>
                    <div className={styles.reviewpageInner}>
                        <Text variant="h2" upper>
                            {t('reviews_subtitle')}
                        </Text>

                        <div className={styles.reviewpageTitleInner}>
                            <div className={styles.reviewsTitleWrap}>
                                <Text variant="h1" upper>
                                    {t('reviews_title')}
                                </Text>

                                <p className={styles.reviewsText}>{t('reviews_text')}</p>
                            </div>

                            {/* <Button>
                                Оставить отзыв
                                <ArrowRight />
                            </Button> */}
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

                        {!!data && data.totalPages > 1 && (
                            <div className={styles.pagination}>
                                {[...Array(data.totalPages)].map((_, id) => (
                                    <button
                                        key={id}
                                        className={cn(styles.paginationButton, {
                                            [styles.active]: id + 1 === data.page,
                                        })}
                                        onClick={() => setPage(id + 1)}
                                    >
                                        {id + 1}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <ReviewForm />

            <BannerSmall />
        </>
    );
};

export default ReviewsPage;
