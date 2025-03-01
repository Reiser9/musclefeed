'use client';

import React from 'react';
import cn from 'classnames';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import styles from './index.module.scss';

import { useAppSelector } from '@/shared/hooks/useRedux';

import { Preloader } from '@/shared/ui/Preloader';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { NotContent } from '@/shared/ui/NotContent';
import { ReviewsAdminItem } from '@/entities/review/ui';
import { useReviews } from '@/features/reviews';
import { PrivateWrapper } from '@/shared/wrappers/PrivateWrapper';

const AdminReviews = () => {
    const [page, setPage] = React.useState(1);
    const queryClient = useQueryClient();

    const revalidateRequest = () => {
        queryClient.invalidateQueries({ queryKey: ['admin_reviews'] });
    };

    const language = useAppSelector((state) => state.app.language);

    const { getAdminReviews, deleteReview } = useReviews();

    const { data, isPending, isError } = useQuery({
        queryKey: ['admin_reviews', page],
        queryFn: () => getAdminReviews(page),
    });

    if (isPending) {
        return <Preloader page />;
    }

    if (isError) {
        return <NotContent />;
    }

    return (
        <PrivateWrapper haveRole="ADMIN">
            <div className={styles.adminTeam}>
                <div className={styles.adminTeamWrapper}>
                    <div className={styles.titleWrap}>
                        <Text>Отзывы {!!data && !!data.totalCount && `(${data.totalCount})`}</Text>

                        <Button href={`/${language}/admin/reviews/create`} small>
                            Создать
                        </Button>
                    </div>

                    {!!data && !!data?.reviews.length ? (
                        <div className={styles.adminTeamItems}>
                            {data?.reviews.map((review) => (
                                <ReviewsAdminItem
                                    key={review.id}
                                    data={review}
                                    deleteCallback={() => deleteReview(review.id, revalidateRequest)}
                                />
                            ))}
                        </div>
                    ) : (
                        <NotContent text="Нет отзывов" />
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
        </PrivateWrapper>
    );
};

export default AdminReviews;
